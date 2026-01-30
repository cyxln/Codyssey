"use client";

import { useEffect, useRef, useState } from "react";
import NavBar from "@/components/elements/NavBar";

type ToastState = {
  message: string;
  tone: "error" | "info";
};

type RiskAssessmentResult = {
  score: number;
  score_description:
    | "MINIMAL_RISK"
    | "LOW_RISK"
    | "MODERATE_RISK"
    | "HIGH_RISK"
    | "SEVERE_RISK";
  location_overview: string;
  vulnerabilities: string;
  precautionary_steps: string[];
  is_area_allowed_to_visit: "YES" | "REROUTE" | "AVOID";
  sources?: string[];
};

export default function RiskAssessmentPage() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const [locationInput, setLocationInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [riskResult, setRiskResult] = useState<RiskAssessmentResult | null>(
    null
  );
  const cardBaseClass =
    "rounded-[26px] border border-black/25 bg-white p-5 shadow-[0_16px_35px_rgba(0,0,0,0.08)]";
  const cardTitleClass =
    "text-xs font-semibold uppercase tracking-[0.12em] text-[#5f5f5f]";

  const getAdaptiveTextClass = (
    content: string,
    options?: { short?: number; long?: number }
  ) => {
    const shortLimit = options?.short ?? 140;
    const longLimit = options?.long ?? 360;
    const length = content.trim().length;

    if (!length) {
      return "text-sm leading-relaxed";
    }
    if (length <= shortLimit) {
      return "text-base leading-relaxed";
    }
    if (length <= longLimit) {
      return "text-sm leading-relaxed";
    }
    return "text-xs leading-relaxed";
  };

  const showToast = (message: string, tone: ToastState["tone"] = "error") => {
    setToast({ message, tone });
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 5000);
  };

  const parseRiskResult = (
    payload: unknown
  ): RiskAssessmentResult | null => {
    if (!payload) {
      return null;
    }
    if (typeof payload === "string") {
      try {
        return JSON.parse(payload) as RiskAssessmentResult;
      } catch {
        return null;
      }
    }
    if (typeof payload === "object") {
      return payload as RiskAssessmentResult;
    }
    return null;
  };

  const handleSubmitLocation = async () => {
    const trimmed = locationInput.trim();
    if (!trimmed) {
      showToast("Please enter a location.");
      return;
    }

    setIsLoading(true);
    setRiskResult(null);

    try {
      const response = await fetch("/.netlify/functions/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userLocation: trimmed }),
      });

      if (!response.ok) {
        let errorMessage = "Something went wrong.";
        try {
          const errorPayload = await response.json();
          if (errorPayload?.error) {
            errorMessage = String(errorPayload.error);
          }
        } catch {
          // ignore parsing errors
        }
        showToast(errorMessage);
        return;
      }

      const data = await response.json();
      const parsed = parseRiskResult(
        data?.synthesizedResponse ?? data?.risk ?? data
      );
      if (!parsed) {
        showToast("Unable to parse risk assessment response.");
        return;
      }
      setRiskResult(parsed);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Network error occurred.";
      showToast(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      showToast("Geolocation is not supported on this device.");
      return;
    }

    setIsLoading(true);
    setRiskResult(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Current location:", { latitude, longitude });

        try {
          const response = await fetch("/.netlify/functions/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              detectedCoordinates: { latitude, longitude },
            }),
          });

          if (!response.ok) {
            let errorMessage = "Something went wrong.";
            try {
              const errorPayload = await response.json();
              if (errorPayload?.error) {
                errorMessage = String(errorPayload.error);
              }
            } catch {
              // ignore parsing errors
            }
            showToast(errorMessage);
            return;
          }

          const data = await response.json();
          const parsed = parseRiskResult(
            data?.synthesizedResponse ?? data?.risk ?? data
          );
          if (!parsed) {
            showToast("Unable to parse risk assessment response.");
            return;
          }
          setRiskResult(parsed);
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Network error occurred.";
          showToast(message);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          showToast("Location permission denied.");
          setIsLoading(false);
          return;
        }
        showToast("Unable to access location.");
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f6efe4] text-[#1c1c1c] font-sans">
      {toast ? (
        <div
          className={`fixed left-6 top-6 z-50 rounded-xl px-4 py-3 text-sm text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] ${
            toast.tone === "error" ? "bg-[#d9342b]" : "bg-[#1c1c1c]"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center px-6 py-10">
        <NavBar />
        <section className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 py-10 text-center">
          <h1 className="text-balance text-[clamp(1.8rem,3.1vw,3rem)] font-semibold text-[#1a1a1a] font-playfair">
            Type your location to see if its safe and take action
          </h1>
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#3b76ff] border-t-transparent" />
              <div className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-[#1c1c1c] shadow-[0_16px_35px_rgba(0,0,0,0.12)]">
                Please wait
              </div>
            </div>
          ) : (
            <>
              <input
                className="w-full rounded-full border border-black/20 bg-white px-6 py-4 text-[clamp(1rem,1.1vw,1.1rem)] text-[#2a2a2a] shadow-[0_14px_30px_rgba(0,0,0,0.08)] outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#4c7fff]"
                placeholder="Type your Philippine location and press enter to generate query"
                type="text"
                value={locationInput}
                onChange={(event) => setLocationInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSubmitLocation();
                  }
                }}
              />
              <button
                className="rounded-full bg-gradient-to-r from-[#0b8bff] via-[#3b76ff] to-[#7b4bff] px-8 py-3 text-[clamp(1rem,1.1vw,1.15rem)] font-medium text-white shadow-[0_16px_35px_rgba(59,118,255,0.35)] transition hover:scale-[1.02] active:scale-[0.99]"
                onClick={handleUseLocation}
                type="button"
              >
                Use my current location
              </button>
            </>
          )}
          {riskResult ? (
            <div className="risk-result mt-6 w-full text-left">
              <div className="grid gap-4 md:grid-cols-[minmax(190px,240px)_minmax(0,1fr)_minmax(0,1fr)]">
                <div className="flex flex-col gap-4">
                  <div className={`${cardBaseClass} bg-[#e2eefb]`}>
                    <p className={cardTitleClass}>Risk score</p>
                    <p className="mt-3 text-[clamp(2.2rem,3.4vw,3.2rem)] font-semibold text-[#0f1c2b]">
                      {riskResult.score}
                    </p>
                  </div>
                  <div className={`${cardBaseClass} bg-[#f7cdb3]`}>
                    <p className={cardTitleClass}>Risk level</p>
                    <p className="mt-3 text-[clamp(1.4rem,2.4vw,2rem)] font-semibold text-[#3c2418]">
                      {riskResult.score_description.replace("_", " ")}
                    </p>
                  </div>
                  <div className={`${cardBaseClass} bg-[#c9f4cd]`}>
                    <p className={cardTitleClass}>Route guidance</p>
                    <p className="mt-3 text-[clamp(1.1rem,2vw,1.45rem)] font-semibold text-[#1f3b27]">
                      {riskResult.is_area_allowed_to_visit.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <div className={cardBaseClass}>
                  <p className={cardTitleClass}>Location overview</p>
                  <p
                    className={`mt-3 text-[#1f1f1f] ${getAdaptiveTextClass(
                      riskResult.location_overview,
                      { short: 120, long: 360 }
                    )}`}
                  >
                    {riskResult.location_overview}
                  </p>
                </div>
                <div className={cardBaseClass}>
                  <p className={cardTitleClass}>Vulnerabilities</p>
                  <p
                    className={`mt-3 text-[#1f1f1f] ${getAdaptiveTextClass(
                      riskResult.vulnerabilities,
                      { short: 140, long: 420 }
                    )}`}
                  >
                    {riskResult.vulnerabilities}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-4">
                <div className={cardBaseClass}>
                  <p className={cardTitleClass}>Precautionary / Next steps</p>
                  <ul
                    className={`mt-3 list-disc space-y-2 pl-5 text-[#1f1f1f] ${getAdaptiveTextClass(
                      riskResult.precautionary_steps.join(" "),
                      { short: 200, long: 520 }
                    )}`}
                  >
                    {riskResult.precautionary_steps.map((step, index) => (
                      <li key={`${step}-${index}`}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className={cardBaseClass}>
                  <p className={cardTitleClass}>Sources</p>
                  <ul
                    className={`mt-3 list-disc space-y-2 pl-5 text-[#1f1f1f] ${getAdaptiveTextClass(
                      (riskResult.sources ?? []).join(" "),
                      { short: 160, long: 460 }
                    )}`}
                  >
                    {(riskResult.sources ?? []).length > 0 ? (
                      riskResult.sources?.map((source, index) => (
                        <li key={`${source}-${index}`}>{source}</li>
                      ))
                    ) : (
                      <li>No sources provided.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </section>
        <footer className="mt-auto w-full max-w-3xl text-center text-[0.7rem] text-[#6b6b6b]">
          <p>
            It uses Exa Search API and GPT-5 Mini to synthesize information,
            please double check and should be used for reference only.
          </p>
          <p className="mt-2">
            &quot;Use my current location&quot; uses your network&#39;s
            approximate location and OpenStreetMaps API, this may affect how
            GPT shapes it&#39;s responses.
          </p>
        </footer>
      </div>
      <style jsx>{`
        .risk-result {
          animation: riskFadeIn 420ms ease-in;
        }

        @keyframes riskFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
