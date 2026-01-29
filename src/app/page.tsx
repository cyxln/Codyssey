"use client";

import { useEffect, useRef } from "react";
import { DM_Serif_Display, Inter, Outfit } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const heroSky = "http://localhost:3845/assets/f9b82ee3e88a5ab6c6c726c309fc25d4524ca52d.png";
const heroVillage = "http://localhost:3845/assets/1f8ff4699d74bbb8bb0481b339fab4a47540cbaa.png";
const heroVillageShade = "http://localhost:3845/assets/50a53fc3f132191f60c689f5fbb7b584bdc7aa02.png";
const heroSoil = "http://localhost:3845/assets/ecb1da330424f1105cbd921106c0130ebc8d8c47.png";
const heroSoilShade = "http://localhost:3845/assets/9551f5a2555538d21c8a040ff4e166e888e7db28.png";
const heroPlants = "http://localhost:3845/assets/810566cf55331865abd419fd88d17b73bc45b72b.png";
const heroPlantsAlt = "http://localhost:3845/assets/bdac8eea58063ee5ef15b1537041eaf401079474.png";
const heroBirds = "http://localhost:3845/assets/f15102e3221fbaa567fd4a472c7a09387a67d1f2.svg";
const heroRays = "http://localhost:3845/assets/63a3880dfe6e2d7aeb4251d4bb1e8b9a898a12ae.svg";
const heroGreenOverlay = "http://localhost:3845/assets/d9101f9cf59f923200874e22ddc751efc83e9aac.svg";

const aboutPhotoTop = "http://localhost:3845/assets/7fbe164c69279111e42866dc03ae119639b5b83b.png";
const aboutPhotoBottom = "http://localhost:3845/assets/a3a8890728f77fcc1b35bf9c403f22baad5501e9.png";
const aboutRing = "http://localhost:3845/assets/c3f629a8c3dde96ae90cec2bba9d65a440482a7d.svg";

const navItems = [
  "Home",
  "About Us",
  "The Team",
  "Our Stories",
  "Savings",
  "Get Involved",
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      hero.style.setProperty("--hero-progress", "0");
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = hero.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
      const progress = Math.min(Math.max(raw, 0), 1);
      hero.style.setProperty("--hero-progress", progress.toString());
    };

    const onScroll = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main
      className={`${inter.className} bg-white text-[#0f3a12]`}
    >
      <section ref={heroRef} className="hero-scene relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              alt=""
              className="hero-layer hero-sky"
              src={heroSky}
              aria-hidden="true"
            />
            <img
              alt=""
              className="hero-layer hero-village"
              src={heroVillage}
              aria-hidden="true"
            />
            <img
              alt=""
              className="hero-layer hero-village hero-village--shade"
              src={heroVillageShade}
              aria-hidden="true"
            />
            <img
              alt=""
              className="hero-layer hero-birds"
              src={heroBirds}
              aria-hidden="true"
            />
            <img
              alt=""
              className="hero-layer hero-rays"
              src={heroRays}
              aria-hidden="true"
            />
            <img
              alt=""
              className="hero-layer hero-greenwash"
              src={heroGreenOverlay}
              aria-hidden="true"
            />
            <div className="hero-layer hero-colorwash" aria-hidden="true" />
          </div>

          <nav className="hero-nav absolute left-6 right-6 top-6 z-50 flex justify-end">
            <div className="rounded-full border border-[#c49bce]/60 bg-white/45 px-6 py-3 text-xs font-semibold tracking-wide text-[#525252] backdrop-blur-xl sm:text-sm">
              <ul className="flex flex-wrap items-center justify-end gap-4 sm:gap-6">
                {navItems.map((item) => (
                  <li key={item} className="font-semibold">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="hero-text absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="max-w-5xl text-balance font-black text-white drop-shadow-[0_6px_24px_rgba(15,58,18,0.4)] text-4xl sm:text-5xl lg:text-6xl xl:text-[70px]">
              Growing{" "}
              <span className="bg-gradient-to-r from-white via-[#8dd55a] to-white bg-clip-text text-transparent">
                <span className="bg-gradient-to-r from-[#071d39] to-[#189547] bg-clip-text text-transparent italic">
                  Resilience
                </span>{" "}
                Communities
              </span>{" "}
              Together
            </h1>
            <p
              className={`${outfit.className} mt-6 max-w-2xl text-base text-white/90 sm:text-lg`}
            >
              Empowering the urban poor through community-driven disaster
              preparedness, sustainable housing, and collective action since
              1995.
            </p>
          </div>

          <div className="hero-button absolute inset-x-0 bottom-20 z-50 flex items-center justify-center px-6">
            <button
              className="group relative flex items-center gap-3 rounded-full border border-[#c49bce]/60 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-0.5"
              type="button"
            >
              <span className="bg-gradient-to-r from-[#8dd55a] via-[#15d518] to-[#0f3a12] bg-clip-text text-transparent text-base normal-case">
                Join the Movement
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white">
                <svg
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          <div className="pointer-events-none absolute inset-0 z-30">
            <img
              alt=""
              className="hero-layer hero-soil"
              src={heroSoil}
              aria-hidden="true"
            />
            <img
              alt=""
              className="hero-layer hero-soil hero-soil--shade"
              src={heroSoilShade}
              aria-hidden="true"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-40">
            <img
              alt=""
              className="hero-layer hero-plants hero-plants-left"
              src={heroPlants}
              aria-hidden="true"
            />
            <img
              alt=""
              className="hero-layer hero-plants hero-plants-right"
              src={heroPlantsAlt}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#24170f] py-24 text-white">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          src={heroSoil}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
          <div className="h-2 w-48 rounded-full bg-gradient-to-r from-[#8dd55a] via-[#0f3a12] to-[#071d39]" />
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            A Movement Built on Community Savings and Action
          </h2>
          <p className={`${outfit.className} text-base text-white/90 sm:text-lg`}>
            The Philippines Homeless People’s Federation brings together
            low-income community organizations nationwide to address shared
            challenges in housing, land tenure, livelihoods, and resilience.
            We support these groups and encourage the formation of new ones.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0f3a12] py-24 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8dd55a]/50 via-[#2e6a35]/60 to-[#0f3a12] opacity-90" />
        <img
          alt=""
          className="absolute -right-40 top-10 size-[420px] opacity-40"
          src={aboutRing}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#0f3a12]">
              <span className="h-[2px] w-16 bg-[#8dd55a]" />
              <span className="text-white/80">Who We Are</span>
            </div>
            <h2
              className={`${dmSerif.className} text-balance text-4xl leading-tight sm:text-5xl lg:text-6xl`}
            >
              <span className="bg-gradient-to-r from-white to-[#f8ff94] bg-clip-text text-transparent">
                From{" "}
              </span>
              <span className="bg-gradient-to-r from-[#2e6a35] to-[#0f3a12] bg-clip-text text-transparent italic">
                victims
              </span>{" "}
              <span className="bg-gradient-to-r from-white to-[#f8ff94] bg-clip-text text-transparent">
                to agents of change
              </span>
            </h2>
            <p className={`${outfit.className} text-base text-white/85 sm:text-lg`}>
              The Homeless People&apos;s Federation Philippines, Inc. (HPFPI)
              represents a paradigm shift in how we approach poverty, housing,
              and disaster resilience. We believe that the most vulnerable
              communities are not merely victims—they are essential agents of
              their own recovery and protection.
            </p>
            <p className={`${outfit.className} text-base text-white/85 sm:text-lg`}>
              Together with PACSII, we form the Philippine Alliance—a national
              network of urban poor savers and community associations driving
              sustainable development from the ground up.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { value: "25K+", label: "Families Supported" },
                { value: "300+", label: "Communities Organized" },
                { value: "30", label: "Years of Impact" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className={`${dmSerif.className} text-3xl sm:text-4xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)]`}
                  >
                    {stat.value}
                  </div>
                  <div className={`${outfit.className} text-sm text-white/80`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex min-h-[360px] items-center justify-center">
            <div className="absolute right-0 top-0 h-[260px] w-[260px] overflow-hidden rounded-[48px] shadow-[0_24px_60px_rgba(7,29,57,0.45)] sm:h-[300px] sm:w-[300px]">
              <img
                alt="Community gathering"
                className="h-full w-full object-cover"
                src={aboutPhotoTop}
              />
            </div>
            <div className="absolute bottom-0 left-0 h-[240px] w-[280px] overflow-hidden rounded-[48px] shadow-[0_24px_60px_rgba(7,29,57,0.45)] sm:h-[280px] sm:w-[320px]">
              <img
                alt="Community leaders"
                className="h-full w-full object-cover"
                src={aboutPhotoBottom}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
