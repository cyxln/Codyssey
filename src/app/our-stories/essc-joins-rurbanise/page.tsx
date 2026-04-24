import Image from "next/image";

import NavBar from "@/components/elements/NavBar";
import FooterSection from "@/components/FooterSection";

const heroImage =
  "/figma_assets/our_stories/story2/8b383505cc986eb6d8b80be8bac3754314616dba.png";

const galleryImages = [
  {
    src: "/figma_assets/our_stories/story2/4c297b99c675a9cd084f2967784d08a5068f0fc9.png",
    alt: "Community member tending to plants",
  },
  {
    src: "/figma_assets/our_stories/story2/c4a6bae91d34d491d9195841171143303c835276.png",
    alt: "Community members working together outdoors",
  },
  {
    src: "/figma_assets/our_stories/story2/bce7c0141ba6c5eb082128ffbe0b097867b8eaa6.png",
    alt: "Residents gathered in an informal settlement",
  },
];

export default function EsscJoinsRurbanisePage() {
  return (
    <main className="min-h-screen bg-[#fdf6e9] text-[#1e1e1e]">
      <section className="relative min-h-[520px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt="Urban settlement beside water"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(15,58,18,0.7)]" />

        <div className="relative z-10 flex min-h-[520px] flex-col items-center px-6 pb-12 pt-8">
          <div className="flex w-full justify-center">
            <NavBar />
          </div>
          <div className="mt-auto flex w-full max-w-6xl justify-start pb-6">
            <h1 className="max-w-4xl text-[clamp(2rem,5vw,4rem)] font-black text-[#fdf6e9]">
              ESSC Joins RURBANISE on Urban Vulnerability
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 pt-10">
        <h2 className="mt-10 text-center text-[clamp(1.8rem,3.4vw,3rem)] font-bold text-[#1e1e1e]">
          ESSC Joins RURBANISE on Urban Vulnerability
        </h2>

        <p className="mt-10 max-w-5xl text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed text-[#1e1e1e]">
          The Environmental Science for Social Change (ESSC) has formally integrated into a six-member
          research consortium to implement the project titled "Building Resilience in the Context of
          Rapid Urbanization: A View for Informal Communities" (RURBANISE). Initiated in 2023 and
          spanning three and a half years, this multidisciplinary endeavor seeks to investigate how
          evolving urbanization patterns influence differential vulnerabilities within human
          settlements, specifically focusing on informal communities in the Philippines. By examining
          the intersection of socio-economic, political, and environmental factors, ESSC aims to
          document the underlying drivers of uneven climate exposure among marginalized populations
          residing in high-risk areas prone to flooding and landslides. Led by the Technical Assistance
          Movement for People and Environment, Inc. (TAMPEI), the research focuses on nine diverse
          communities from the Homeless People's Federation of the Philippines, Inc. (HPFPI) across
          Luzon, Visayas, and Mindanao, encompassing urban, rural, and peri-urban landscapes.
        </p>

        <div className="group mt-12 grid w-full max-w-5xl gap-6 md:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/3] w-full overflow-hidden transition-opacity duration-300 group-hover:opacity-40 group-focus-within:opacity-40 hover:opacity-100 focus-within:opacity-100"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 90vw"
                className="object-cover focus:outline-none"
                tabIndex={0}
              />
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-5xl text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed text-[#1e1e1e]">
          The consortium brings together a robust network of academic and research institutions,
          including the University of the Philippines' Resilience Institute and School of Urban and
          Regional Planning, as well as the University of Sheffield's Urban Institute. This collaboration
          builds upon ESSC's established history of technical engagement with TAMPEI and HPFPI in site
          assessments, social housing design, and multi-sectoral policy dialogues. As a key component
          of the Climate Adaptation and Resilience (CLARE) initiative - co-funded by the UK's Foreign,
          Commonwealth & Development Office and Canada's International Development Research Centre -
          the RURBANISE project is dedicated to fostering socially inclusive and sustainable resilience.
          The initiative is distinguished by its transformative methodology, which prioritizes the
          lived experiences and inherent coping strategies of informal settlers, positioning these
          communities as central actors in the development of practical, inclusive, and climate-resilient
          adaptation solutions.
        </p>

      </section>

      <FooterSection />
    </main>
  );
}
