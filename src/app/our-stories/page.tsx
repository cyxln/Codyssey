import Image from "next/image";

import NavBar from "@/components/elements/NavBar";
import FooterSection from "@/components/FooterSection";

const stories = [
  {
    title: "HPFPI National Youth Summit",
    description:
      "On June 13, 2025, youth leaders from various regions of the Philippines gathered at Antay's Inland Resort in Santa Barbara, Iloilo, participate in the HPFPI National Youth Summit. This assembly was organized by HPFPI Youth Iloilo in formal partnership with several organizations, including PACSII, SDI, TAMPEI, HPFPI, and DIInsider.",
    image: "/figma_assets/our_stories/3d88a60b22cd22980d849cfebfb77659b85e8d8c.png",
    imageAlt: "HPFPI National Youth Summit group photo",
    href: "/our-stories/national-youth-summit",
  },
  {
    title: "ESSC Joins RURBANISE on Urban Vulnerability",
    description:
      "The Environmental Science for Social Change (ESSC) has formally integrated into a six-member research consortium to implement the project titled \"Building Resilience in the Context of Rapid Urbanization: A View for Informal Communities\" (RURBANISE).",
    image: "/figma_assets/our_stories/418e73abd50b3e988f7ba779e65704dad76846a8.png",
    imageAlt: "RURBANISE event banner",
    href: "/our-stories/essc-joins-rurbanise",
  },
  {
    title:
      "Empowering the Urban Poor: HPFPI's Catalyst Role in Iloilo City's Resilience",
    description:
      "The Homeless People's Federation of the Philippines, Inc. (HPFPI) was instrumental in redefining Iloilo City's approach to urban resilience by transitioning from traditional top-down resettlement to a community-led development model.",
    image: "/figma_assets/our_stories/12c6a7b13447d773ea8f83ac8042582b17fa2cee.png",
    imageAlt: "Community members gathered in Iloilo City",
    href: "/our-stories/empowering-the-urban-poor",
  },
  {
    title: "A Platform for Local Artisans",
    description:
      "In the \"City of Love,\" Iloilo, the project collaborates with the Homeless People's Federation of the Philippines - Iloilo (HPFPI). Local artisans are trained to create unique designer products, with the initial collection featuring designs by renowned social entrepreneur and designer Zarah Juan.",
    image: "/figma_assets/our_stories/a6f68e47355a1bb6889751b9214408afb8fdf308.png",
    imageAlt: "Local artisans presenting their products",
    href: "/our-stories/a-platform-for-local-artisans",
  },
];

export default function OurStoriesPage() {
  return (
    <main className="min-h-screen bg-[#fdf6e9] text-[#1f130a]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 pb-12 pt-8">
        <div className="flex w-full justify-center">
          <NavBar />
        </div>

        <section className="flex w-full flex-1 items-center justify-center pb-8 pt-10">
          <div className="grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)]">
            <article className="relative rounded-[28px] border-4 border-[#8dd55a] bg-[#fffaf1] px-8 py-10 text-center shadow-[1px_4px_14px_9px_rgba(0,0,0,0.18)] lg:self-center">
              <div className="absolute left-0 top-8 h-[140px] w-[22px] bg-[#0f3a12]" />
              <h1 className="text-[clamp(2.6rem,3.6vw,4rem)] font-black leading-[1.05] text-black">
                Our Stories
              </h1>
              <div className="mx-auto my-6 h-px w-4/5 bg-black/50" />
              <p className="text-base font-normal text-[#2a2a2a]">
                Our stories are not just about houses; they are about the power of
                an organized people.
              </p>
            </article>

            <div className="flex flex-col gap-8">
              {stories.map((story) => (
                <article
                  key={story.title}
                  className="flex flex-col gap-6 rounded-[39px] bg-[rgba(141,213,90,0.44)] px-6 py-6 text-[#1f130a] shadow-[0_12px_30px_rgba(0,0,0,0.08)] md:flex-row md:items-center"
                >
                  <div className="relative h-[190px] w-full overflow-hidden rounded-[22px] md:h-[200px] md:w-[260px] lg:h-[243px] lg:w-[286px]">
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 286px, (min-width: 768px) 260px, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <h2 className="text-[clamp(1.2rem,2.2vw,2rem)] font-extrabold text-[#4b5b2b]">
                      {story.title}
                    </h2>
                    <p className="text-sm leading-[1.6] text-[#1f130a] md:text-[0.95rem]">
                      {story.description}
                    </p>
                    <a
                      href={story.href ?? "#"}
                      className="text-sm font-bold italic text-[#122620]"
                    >
                      &gt;&gt; Read Full Story
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
      <FooterSection />
    </main>
  );
}
