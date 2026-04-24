import Image from "next/image";

import NavBar from "./elements/NavBar";
import JoinUsBtn from "./elements/JoinUsBtn";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0d120c] text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/figma_assets/hero-sunrise.png"
          alt="Sunrise over rolling hills"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.05]"
        />
      </div>

      <div className="absolute inset-0 z-0">
        <Image
          src="/figma_assets/hero-village.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center blur-[2px]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] hero-contrast" />

      <Image
        src="/figma_assets/hero-plant.png"
        alt=""
        width={1920}
        height={900}
        priority
        sizes="100vw"
        className="pointer-events-none absolute bottom-[-12%] left-1/2 z-[5] h-auto w-screen -translate-x-1/2 sm:bottom-[-10%] lg:bottom-[-8%]"
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pb-12 pt-8">
        <div className="flex w-full justify-center">
          <NavBar />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="hero-title max-w-4xl text-[clamp(2.3rem,6vw,4.6rem)] font-black leading-[1.05] tracking-tight">
            <span className="text-white">Growing </span>
            <span className="bg-gradient-to-r from-[#071d39] via-[#0b5a33] to-[#189547] bg-clip-text text-transparent italic">
              Resilience
            </span>
            <span className="text-white"> Communities</span>
            <span className="block text-white">
              Together
            </span>
          </h1>
          <p className="hero-subtitle mt-5 max-w-2xl text-[clamp(1rem,2.1vw,1.5rem)] text-white/90">
            Empowering the urban poor through community-driven disaster preparedness, sustainable
            housing, and collective action since 1995.
          </p>
        </div>

        <div className="mt-6">
          <JoinUsBtn buttonText="Join the Movement" />
        </div>
      </div>
    </section>
  );
}
