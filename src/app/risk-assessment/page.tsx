"use client";

import { useEffect, useRef, useState } from "react";
import NavBar from "@/components/elements/NavBar";
import ResultsPresentation, {
  type MapsGroundingMetadata,
  type RiskAssessmentResult,
  type SearchGroundingMetadata,
} from "@/components/RiskAssessment/ResultsPresentation";

type ToastState = {
  message: string;
  tone: "error" | "info";
};

type PredictGrounding = {
  search?: SearchGroundingMetadata;
  maps?: MapsGroundingMetadata;
};

const loadingSteps = [
  {
    title: "Checking the location request",
    detail: "Running the guardrail before any map or search calls.",
  },
  {
    title: "Searching Google Maps context",
    detail: "Looking for local places, roads, waterways, and nearby features.",
  },
  {
    title: "Reviewing map signals",
    detail: "Checking whether the map insight matches the requested area.",
  },
  {
    title: "Searching current reports",
    detail: "Grounding the assessment with recent weather, hazards, and news.",
  },
  {
    title: "Preparing final analysis",
    detail: "Structuring the risk score, guidance, precautions, and sources.",
  },
];

function LoadingProgress({ activeStep }: { activeStep: number }) {
  return (
    <div className="w-full max-w-xl rounded-[22px] border border-black/15 bg-white p-5 text-left shadow-[0_16px_35px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3b76ff] border-t-transparent" />
        <div>
          <p className="text-sm font-semibold text-[#1c1c1c]">
            {loadingSteps[activeStep]?.title ?? "Preparing assessment"}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#5f5f5f]">
            {loadingSteps[activeStep]?.detail ??
              "Organizing grounded risk information."}
          </p>
        </div>
      </div>
      <ol className="mt-5 space-y-3">
        {loadingSteps.map((step, index) => {
          const isDone = index < activeStep;
          const isActive = index === activeStep;

          return (
            <li className="flex items-start gap-3" key={step.title}>
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-semibold ${
                  isDone
                    ? "border-[#16833a] bg-[#16833a] text-white"
                    : isActive
                    ? "border-[#3b76ff] bg-[#e2eefb] text-[#1f4fb8]"
                    : "border-black/20 bg-white text-[#777]"
                }`}
              >
                {isDone ? "✓" : index + 1}
              </span>
              <div>
                <p
                  className={`text-sm font-medium ${
                    isActive ? "text-[#1c1c1c]" : "text-[#5f5f5f]"
                  }`}
                >
                  {step.title}
                </p>
                {isActive ? (
                  <p className="mt-0.5 text-xs leading-relaxed text-[#6b6b6b]">
                    {step.detail}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function RiskAssessmentPage() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const loadingIntervalRef = useRef<number | null>(null);
  const [locationInput, setLocationInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [riskResult, setRiskResult] = useState<RiskAssessmentResult | null>(
    null
  );
  const [grounding, setGrounding] = useState<PredictGrounding | null>(null);

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

  const clearLoadingProgressTimer = () => {
    if (loadingIntervalRef.current) {
      window.clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    }
  };

  const beginLoadingProgress = (startStep = 0) => {
    clearLoadingProgressTimer();
    setLoadingStep(startStep);
    setIsLoading(true);

    loadingIntervalRef.current = window.setInterval(() => {
      setLoadingStep((current) =>
        current < loadingSteps.length - 1 ? current + 1 : current
      );
    }, 2200);
  };

  const finishLoadingProgress = () => {
    clearLoadingProgressTimer();
    setIsLoading(false);
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

    beginLoadingProgress(0);
    setRiskResult(null);
    setGrounding(null);

    try {
      const response = await fetch("/api/predict", {
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
      setGrounding(data?.grounding ?? null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Network error occurred.";
      showToast(message);
    } finally {
      finishLoadingProgress();
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      showToast("Geolocation is not supported on this device.");
      return;
    }

    beginLoadingProgress(0);
    setRiskResult(null);
    setGrounding(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Current location:", { latitude, longitude });
        beginLoadingProgress(1);

        try {
          const response = await fetch("/api/predict", {
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
          setGrounding(data?.grounding ?? null);
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Network error occurred.";
          showToast(message);
        } finally {
          finishLoadingProgress();
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          showToast("Location permission denied.");
          finishLoadingProgress();
          return;
        }
        showToast("Unable to access location.");
        finishLoadingProgress();
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
      clearLoadingProgressTimer();
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
            <LoadingProgress activeStep={loadingStep} />
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
            <ResultsPresentation
              mapsGrounding={grounding?.maps}
              result={riskResult}
              searchGrounding={grounding?.search}
            />
          ) : null}
        </section>
        <footer className="mt-auto w-full max-w-3xl text-center text-[0.7rem] text-[#6b6b6b]">
          <p>
            It uses Gemini API with Google Search and Google Maps grounding to
            synthesize information, please double check and use it for reference
            only.
          </p>
          <p className="mt-2">
            &quot;Use my current location&quot; uses your network&#39;s
            approximate location and OpenStreetMaps API, this may affect how the
            assessment is grounded.
          </p>
        </footer>
      </div>
      <style jsx>{`
        :global(.risk-result) {
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
