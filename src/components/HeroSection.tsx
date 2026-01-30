const navItems = [
  "Home",
  "About Us",
  "The Team",
  "Our Stories",
  "Savings",
  "Get Involved",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0d120c] text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="/figma_assets/hero-sunrise.png"
          alt="Sunrise over rolling hills"
          className="h-full w-full object-cover object-center scale-[1.05]"
        />
      </div>

      <div className="absolute inset-0 z-0">
        <img
          src="/figma_assets/hero-village.png"
          alt=""
          className="h-full w-full object-cover object-center blur-[2px]"
        />
      </div>

      <img
        src="/figma_assets/hero-plant.png"
        alt=""
        className="pointer-events-none absolute bottom-[-12%] left-1/2 z-[5] h-auto w-screen -translate-x-1/2 sm:bottom-[-10%] lg:bottom-[-8%]"
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pb-12 pt-8">
        <div className="flex w-full justify-center">
          <div className="glass-pill glass-pill--nav">
            <nav className="flex flex-wrap items-center justify-center gap-3 text-[clamp(0.9rem,1.4vw,1.15rem)] font-semibold text-[#4b4b4b]">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`rounded-full px-4 py-2 transition ${
                    item === "Home"
                      ? "font-black text-[#2f2f2f]"
                      : "hover:bg-white/40 hover:text-[#2c2c2c]"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="hero-title max-w-4xl text-[clamp(2.3rem,6vw,4.6rem)] font-black leading-[1.05] tracking-tight">
            <span className="text-white">Growing </span>
            <span className="bg-gradient-to-r from-[#071d39] via-[#0b5a33] to-[#189547] bg-clip-text text-transparent">
              Resilience
            </span>
            <span className="text-white"> Communities</span>
            <span className="block bg-gradient-to-r from-[#bff28d] via-[#8dd55a] to-[#4e8a2b] bg-clip-text text-transparent">
              Together
            </span>
          </h1>
          <p className="hero-subtitle mt-5 max-w-2xl text-[clamp(1rem,2.1vw,1.5rem)] text-white/90">
            Empowering the urban poor through community-driven disaster preparedness, sustainable
            housing, and collective action since 1995.
          </p>
        </div>

        <button className="glass-pill glass-pill--cta mt-6 flex items-center gap-3 px-8 py-3">
          <span className="bg-gradient-to-r from-[#8dd55a] via-[#15d518] to-[#0f3a12] bg-clip-text text-[clamp(1rem,2.2vw,1.4rem)] font-semibold text-transparent">
            Join the Movement
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
