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
      const response = await fetch("/api/v1/predict", {
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
          const response = await fetch("/api/v1/predict", {
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
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center gap-10 px-6 py-10">
        <NavBar />
        <section className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 text-center">
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
            <div className="mt-4 w-full rounded-[28px] border border-black/10 bg-white p-6 text-left shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#f1f4ff] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#2b3a83]">
                  Risk score {riskResult.score}
                </span>
                <span className="rounded-full bg-[#fdf3e7] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#9b4b16]">
                  {riskResult.score_description.replace("_", " ")}
                </span>
                <span className="rounded-full bg-[#e9f7f0] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#1d6b48]">
                  {riskResult.is_area_allowed_to_visit.replace("_", " ")}
                </span>
              </div>
              <div className="mt-4 space-y-3 text-sm text-[#2a2a2a]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">
                    Location overview
                  </p>
                  <p className="mt-1">{riskResult.location_overview}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">
                    Vulnerabilities
                  </p>
                  <p className="mt-1">{riskResult.vulnerabilities}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">
                    Precautionary steps
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {riskResult.precautionary_steps.map((step, index) => (
                      <li key={`${step}-${index}`}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <details className="mt-4 rounded-2xl border border-black/10 bg-[#faf7f2] px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold text-[#2b2b2b]">
                  View sources
                </summary>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#3a3a3a]">
                  {(riskResult.sources ?? []).length > 0 ? (
                    riskResult.sources?.map((source, index) => (
                      <li key={`${source}-${index}`}>{source}</li>
                    ))
                  ) : (
                    <li>No sources provided.</li>
                  )}
                </ul>
              </details>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
