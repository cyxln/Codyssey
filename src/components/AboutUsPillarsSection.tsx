import type { ReactNode } from "react";

import NavBar from "./elements/NavBar";

type Pillar = {
  title: ReactNode;
  highlight: string;
  body: string;
  image: string;
  alt: string;
  imageClassName?: string;
};

const pillars: Pillar[] = [
  {
    title: (
      <>
        Disaster Management & <span className="block">Preparedness</span>
      </>
    ),
    highlight: "From Relief to Resilience.",
    body:
      "We shift the focus from reactive \"disaster relief\" to proactive \"risk reduction.\" By integrating technical geohazard assessments with local knowledge, we empower families to build flood-resistant homes and establish early-warning systems that save lives before the storm hits.",
    image: "/figma_assets/about_us/pillars/disaster-management-preparedness.png",
    alt: "Residents walking through a tight neighborhood passage",
  },
  {
    title: "Community Empowerment",
    highlight: "Owning the Solution.",
    body:
      "Empowerment begins with the Savings Group. When communities manage their own funds, they gain the agency to negotiate with government officials and private landowners. We transform \"informal settlers\" into organized citizens who lead their own development agendas.",
    image: "/figma_assets/about_us/pillars/community-empowerment.png",
    alt: "Community members greeting each other at an event",
    imageClassName: "object-[center_top]",
  },
  {
    title: "Advocacy & Awareness",
    highlight: "Making the Invisible Visible.",
    body:
      "Through community-led enumeration and documentation, we bring the realities of urban poverty to the forefront of national policy. We raise awareness that the urban poor are not a \"problem\" to be moved, but a vital resource of local knowledge and labor essential to city growth.",
    image: "/figma_assets/about_us/pillars/advocacy-awareness.png",
    alt: "Facilitator presenting notes to a group",
    imageClassName: "object-[35%_center] scale-110",
  },
  {
    title: "Societal Innovation",
    highlight: "New Models for Urban Living.",
    body:
      "We pioneer \"Societal Innovations\" like land-sharing, community-managed revolving funds, and decentralized housing finance (CMP). These models challenge traditional top-down urban planning, proving that decentralized, people-led systems are more sustainable and inclusive.",
    image: "/figma_assets/about_us/pillars/societal-innovation.png",
    alt: "Community members writing on a planning board",
    imageClassName: "object-[60%_center] scale-105",
  },
];

export default function AboutUsPillarsSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f6efe4]">
      <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2">
        <NavBar />
      </div>

      <div className="pillars-grid w-full">
        {pillars.map((pillar) => (
          <article
            key={pillar.image}
            className="relative flex min-h-[240px] flex-1 items-end overflow-hidden"
          >
            <img
              src={pillar.image}
              alt={pillar.alt}
              className={`absolute inset-0 h-full w-full object-cover ${pillar.imageClassName ?? ""}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d5a27] via-[#2d5a27]/70 to-transparent" />
            <div className="relative z-10 w-full px-6 pb-8 pt-16 text-white">
              <h3 className="text-[clamp(1.05rem,1.8vw,1.4rem)] font-extrabold leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {pillar.title}
              </h3>
              <div className="mt-3 flex max-w-[22rem] gap-3">
                <span className="mt-1 h-16 w-1.5 rounded-[2px] bg-[#f8ff94]" />
                <p className="text-[clamp(0.78rem,1.2vw,0.98rem)] leading-relaxed text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                  <span className="font-bold text-white">{pillar.highlight} </span>
                  {pillar.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
