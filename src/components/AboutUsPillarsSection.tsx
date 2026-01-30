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

type PillarCard = {
  title: string;
  body: string;
  image: string;
  alt: string;
  gradientClassName: string;
  contentClassName: string;
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

const pillarCards: PillarCard[] = [
  {
    title: "Mission",
    body:
      "HPFPI empowers communities through community-led organizing, capacitybuilding, savings mobilization, youth engagement and development, and partnerships to advance housing security, decent living, disaster resilience, and inclusive development",
    image: "/figma_assets/about_us/pillars/mission.png",
    alt: "Community members gathered for a group photo",
    gradientClassName:
      "bg-gradient-to-l from-[#2d5a27] from-[30.288%] to-[rgba(94,94,94,0)]",
    contentClassName: "items-end text-right lg:pr-16 lg:pl-10",
  },
  {
    title: "Vision",
    body:
      "A safe, just, orderly, and peaceful society that is disaster-resilient and green, where security in housing and livelihoods are sustained for future generations.",
    image: "/figma_assets/about_us/pillars/vision.png",
    alt: "Community members smiling in a group photo",
    gradientClassName:
      "bg-gradient-to-r from-[#2d5a27] from-[33.654%] to-[rgba(94,94,94,0)]",
    contentClassName: "items-start text-left lg:pl-16 lg:pr-10",
  },
];

const journeyMilestones = [
  {
    year: "1996",
    title: "The Humble Beginning",
    body:
      "Inspired by global movements and leaders, VMSDFI began forming a national federation.",
  },
  {
    year: "1998",
    title: "Formal Consolidation",
    body:
      "Savings groups merged into a national movement, marking the first national assembly in Payatas, Quezon City.",
  },
  {
    year: "2000",
    title: "Institutional Recognition",
    body:
      "The federation signed a landmark MOU with the government and established a joint development fund to improve land and housing access.",
  },
  {
    year: "2001",
    title: "Rapid Scaling",
    body:
      "Membership reached a major milestone, expanding to over 20,000 families across multiple Philippine cities.",
  },
  {
    year: "2003",
    title: "Evolution and Expansion",
    body:
      "The movement expanded into disaster relief and emergency response, formalizing long-term partnerships under the Philippine Alliance.",
  },
];

export default function AboutUsPillarsSection() {
  return (
    <>
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
                <h3 className="min-h-[3.4rem] text-[clamp(1.05rem,1.8vw,1.4rem)] font-extrabold leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  {pillar.title}
                </h3>
                <div className="mt-3 flex max-w-[22rem] gap-3">
                  <span className="shrink-0 self-stretch w-2.5 rounded-[2px] bg-[#f8ff94]" />
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

      <section className="bg-[#f6efe4] px-6 pb-20 pt-16 text-[#1e1e1e]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <h2 className="font-playfair text-[clamp(2.4rem,5.6vw,4rem)] font-semibold leading-tight text-[#1e1e1e] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Meet The Pillars
          </h2>
          <p className="mt-3 max-w-2xl text-[clamp(1rem,2.2vw,1.25rem)] font-medium text-[#1e1e1e] drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
            Investing in the Social Infrastructure of Resilient Communities
          </p>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-10">
          {pillarCards.map((card) => (
            <article
              key={card.title}
              className="relative min-h-[280px] overflow-hidden rounded-[48px] shadow-[6px_9px_9.4px_rgba(0,0,0,0.25)] sm:min-h-[340px] lg:min-h-[397px]"
            >
              <img
                src={card.image}
                alt={card.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className={`absolute inset-0 ${card.gradientClassName}`} />
              <div
                className={`relative z-10 flex h-full w-full flex-col justify-center px-8 py-10 text-white sm:px-12 ${card.contentClassName}`}
              >
                <h3 className="text-[clamp(2.1rem,4.5vw,3rem)] font-black leading-tight">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-[22rem] text-[clamp(1rem,2.2vw,1.25rem)] leading-relaxed text-white/90">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f6efe4] px-6 pb-24 pt-8 text-[#1e1e1e]">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[920px] flex-col items-center justify-center">
          <h2 className="font-playfair text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-tight text-[#1e1e1e] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            Core Values
          </h2>

          <div className="mt-12 grid w-full grid-cols-1 gap-y-14 gap-x-10 text-center sm:grid-cols-2 md:grid-cols-6">
            <div className="mx-auto flex max-w-[260px] flex-col items-center gap-4 md:col-span-2">
              <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full">
                <img
                  src="/figma_assets/about_us/pillars/core_values/heart.png"
                  alt="Heart icon"
                  className="h-20 w-20 object-contain"
                />
              </div>
              <p className="text-[clamp(1rem,2.2vw,1.25rem)] font-semibold leading-snug text-[#1e1e1e] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <span className="text-[#8dd55a]">H</span>eartfelt service with accountability,
                transparency, and responsibility.
              </p>
            </div>

            <div className="mx-auto flex max-w-[260px] flex-col items-center gap-4 md:col-span-2">
              <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full">
                <img
                  src="/figma_assets/about_us/pillars/core_values/people-ring.png"
                  alt="People icon"
                  className="h-20 w-20 object-contain"
                />
              </div>
              <p className="text-[clamp(1rem,2.2vw,1.25rem)] font-semibold leading-snug text-[#1e1e1e] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <span className="text-[#8dd55a]">P</span>eople-oriented and empathetic
              </p>
            </div>

            <div className="mx-auto flex max-w-[260px] flex-col items-center gap-4 md:col-span-2">
              <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full">
                <img
                  src="/figma_assets/about_us/pillars/core_values/bamboo.png"
                  alt="Bamboo icon"
                  className="h-20 w-20 object-contain"
                />
              </div>
              <p className="text-[clamp(1rem,2.2vw,1.25rem)] font-semibold leading-snug text-[#1e1e1e] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <span className="text-[#8dd55a]">F</span>lexibility
              </p>
            </div>

            <div className="mx-auto flex max-w-[260px] flex-col items-center gap-4 md:col-start-2 md:col-span-2">
              <div className="flex h-[104px] w-[104px] items-center justify-center">
                <img
                  src="/figma_assets/about_us/pillars/core_values/handshake.png"
                  alt="Handshake icon"
                  className="h-[88px] w-[88px] object-contain"
                />
              </div>
              <p className="text-[clamp(1rem,2.2vw,1.25rem)] font-semibold leading-snug text-[#1e1e1e] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <span className="text-[#8dd55a]">P</span>artnership
              </p>
            </div>

            <div className="mx-auto flex max-w-[260px] flex-col items-center gap-4 md:col-start-4 md:col-span-2">
              <div className="flex h-[104px] w-[104px] items-center justify-center">
                <img
                  src="/figma_assets/about_us/pillars/core_values/shield.png"
                  alt="Shield icon"
                  className="h-[88px] w-[88px] object-contain"
                />
              </div>
              <p className="text-[clamp(1rem,2.2vw,1.25rem)] font-semibold leading-snug text-[#1e1e1e] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                <span className="text-[#8dd55a]">I</span>ntegrity and Initiative
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6efe4] px-6 pb-28 pt-6 text-[#1e1e1e]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <h2 className="font-playfair text-[clamp(2.4rem,5.6vw,4rem)] font-bold leading-tight text-[#1e1e1e] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Journey and Milestones
          </h2>
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-6xl">
          <div className="pointer-events-none absolute left-6 top-0 hidden h-full w-[3px] bg-[#1e1e1e] md:left-1/2 md:block md:-translate-x-1/2" />
          <div className="pointer-events-none absolute left-6 top-0 h-full w-[3px] bg-[#1e1e1e] md:hidden" />

          <ul className="flex flex-col gap-12 md:gap-16">
            {journeyMilestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <li
                  key={`${milestone.year}-${milestone.title}`}
                  className="relative grid grid-cols-[auto_1fr] items-start gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center"
                >
                  <div className="relative z-10 flex items-start justify-center md:col-start-2 md:row-start-1">
                    <img
                      src="/figma_assets/about_us/journey/timeline-dot.svg"
                      alt=""
                      className="h-7 w-7 md:h-8 md:w-8"
                    />
                  </div>
                  <div
                    className={`rounded-[14px] bg-white px-6 py-6 shadow-[0_10px_20px_rgba(0,0,0,0.08)] md:max-w-[28rem] ${
                      isLeft
                        ? "md:col-start-1 md:justify-self-end md:text-right"
                        : "md:col-start-3 md:justify-self-start md:text-left"
                    }`}
                  >
                    <p className="text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold text-[#0f3a12]">
                      {milestone.year}
                    </p>
                    <h3 className="mt-1 text-[clamp(1.35rem,2.8vw,1.8rem)] font-extrabold text-[#1e1e1e]">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-[clamp(0.98rem,2.2vw,1.2rem)] leading-relaxed text-[#0f3a12]">
                      {milestone.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
