export default function JoinNowSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#f6efe4] px-6 py-20 text-center text-[#1e1e1e]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <h2 className="font-playfair text-[clamp(2.6rem,6vw,5rem)] font-semibold tracking-tight">
          <span className="text-[#1e1e1e]">JOIN THE </span>
          <span className="text-[#0f3a12]">ALLIANCE.</span>
        </h2>
        <p className="max-w-3xl text-[clamp(1rem,2.3vw,1.5rem)] leading-relaxed text-[#1e1e1e]/90">
          Join the movement for community-led development. Whether you're a community leader,
          policymaker, NGO partner, or concerned citizen—there's a role for you.
        </p>
        <button className="glass-pill glass-pill--cta mt-4 flex items-center gap-3 px-10 py-3">
          <span className="text-[clamp(1rem,2.2vw,1.4rem)] font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
            Get Involved
          </span>
          <svg
            aria-hidden="true"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M5 12h13m0 0l-5-5m5 5l-5 5"
              stroke="#1f6b1c"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
