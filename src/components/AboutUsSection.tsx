import CascadingImageAbout from "./elements/CascadingImageAbout";

export default function AboutUsSection() {
  return (
    <section className="bg-[#f6efe4] px-6 py-20 text-[#1e1e1e]">
      <div className="mx-auto mb-12 flex w-full max-w-6xl items-center justify-center gap-6 text-center text-[#0f3a12]">
        <span className="h-[6px] w-28 rounded-full bg-gradient-to-b from-[#8dd55a] to-[#0f3a12] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
        <span className="text-[clamp(0.95rem,1.8vw,1.25rem)] font-semibold tracking-[0.2em]">
          WHO WE ARE
        </span>
        <span className="h-[6px] w-28 rounded-full bg-gradient-to-b from-[#8dd55a] to-[#0f3a12] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-start lg:gap-20">
        <div className="flex w-full flex-col gap-8 lg:max-w-xl lg:-translate-x-6">
          <h2 className="font-playfair text-[clamp(2.4rem,5.2vw,4.8rem)] font-semibold leading-[1.05] tracking-tight">
            From{" "}
            <span className="italic text-[#2e6a35]">victims</span> to{" "}
            <span className="italic text-[#c8a353]">agents</span>
            <br />
            of change
          </h2>
          <p className="text-[clamp(1rem,2vw,1.5rem)] leading-relaxed text-[#1e1e1e]">
            The Homeless People's Federation Philippines, Inc. (HPFPI) represents a paradigm shift
            in how we approach poverty, housing, and disaster resilience. We believe that the most
            vulnerable communities are not merely victims—they are essential agents of their own
            recovery and protection.
          </p>
          <p className="text-[clamp(1rem,2vw,1.5rem)] leading-relaxed text-[#1e1e1e]">
            Together with PACSII, we form the Philippine Alliance—a national network of urban poor
            savers and community associations driving sustainable development from the ground up.
          </p>
        </div>

        <div className="relative flex w-full max-w-[520px] items-start justify-center lg:ml-auto lg:justify-end lg:translate-x-6">
          <CascadingImageAbout
            topSrc="/figma_assets/about_us/about-top.png"
            topAlt="Community organizers speaking with residents"
            bottomSrc="/figma_assets/about_us/about-bottom.png"
            bottomAlt="Community members gathered in a neighborhood"
          />
        </div>
      </div>
    </section>
  );
}
