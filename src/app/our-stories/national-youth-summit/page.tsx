import Image from "next/image";

import NavBar from "@/components/elements/NavBar";
import FooterSection from "@/components/FooterSection";

const heroImage =
  "/figma_assets/our_stories/story1/3d88a60b22cd22980d849cfebfb77659b85e8d8c.png";

const galleryImages = [
  {
    src: "/figma_assets/our_stories/story1/cfbdf427ced071f024a32bde06424035b84aa584.png",
    alt: "Youth summit participants in discussion",
  },
  {
    src: "/figma_assets/our_stories/story1/4620787dc4acc74f47ca24db038e1a1ec7e9b114.png",
    alt: "HPFPI youth summit group photo",
  },
  {
    src: "/figma_assets/our_stories/story1/4c2ad6db28d9af2e9857d3ad57b77054d0db2811.png",
    alt: "Youth leaders outdoors during the summit",
  },
];

export default function NationalYouthSummitPage() {
  return (
    <main className="min-h-screen bg-[#fdf6e9] text-[#1e1e1e]">
      <section className="relative min-h-[520px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt="HPFPI National Youth Summit group photo"
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
          <div className="mt-auto flex w-full max-w-5xl justify-center pb-6 text-center">
            <h1 className="text-balance text-[clamp(2rem,5vw,4rem)] font-black text-[#fdf6e9]">
              HPFPI National Youth Summit
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 pt-10">
        <h2 className="mt-10 text-center text-[clamp(1.8rem,3.4vw,3rem)] font-bold text-[#1e1e1e]">
          HPFPI National Youth Summit
        </h2>
        <p className="mt-4 text-center text-[clamp(1rem,2vw,2rem)] italic text-[#1e1e1e]">
          Empowering Youth, Elevating Communities
        </p>

        <p className="mt-10 max-w-5xl text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed text-[#1e1e1e]">
          On June 13, 2025, youth leaders from various regions of the Philippines gathered at
          Antay's Inland Resort in Santa Barbara, Iloilo, to participate in the HPFPI National Youth
          Summit. This assembly was organized by HPFPI Youth Iloilo in formal partnership with
          several organizations, including PACSII, SDI, TAMPEI, HPFPI, and DIInsider. The summit was
          titled "Pagsiplat," a Hiligaynon term meaning "to take a glance," which served as a
          metaphor for the initial steps of the youth toward proactive engagement in community
          transformation. The morning proceedings began with interactive networking activities
          followed by opening remarks from Mrs. Sonia Cardonigara, the HPFPI Iloilo Regional
          Coordinator, and PACSII organizers Mr. Miguelangelo Gaddi and Ms. Ericka Nava. Their
          address established the foundational theme that information is a primary instrument of
          empowerment and literacy. This was expanded upon by Ms. Gladys Llanes, Co-founder and
          Head of Media at Diinsider, who delivered a session regarding the vital role of
          communication in the success of community storytelling. The curriculum then shifted toward
          the technical analysis of media, where participants examined how photography, video
          production, and written journalism collectively contribute to documenting social realities.
          This segment of the program concluded with a specialized workshop on scriptwriting and
          interview protocols, providing the youth with the necessary skills to prepare for field
          interviews and the capture of documentary filler clips.
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
          The afternoon sessions integrated these technical skills with broader social issues,
          beginning with a presentation by Mr. Arjay Rubinos, the National President of TAMPEI,
          regarding Disaster Risk Reduction and Climate Change Adaptation. His lecture emphasized
          the essential responsibility of the youth in developing resilient and secure communities in
          the face of environmental challenges. Following this, Mr. TJ Biasong, a Senior Content
          Producer, provided a comprehensive introduction to professional camera configurations,
          including a detailed exploration of framing and various angles to enhance creative visual
          storytelling. To ensure a complete understanding of the media production cycle, the
          workshop also included instruction on digital editing using accessible software tools. The
          summit culminated in a practical application phase, during which the participants utilized
          their acquired knowledge to create short video projects. This final exercise served as a
          demonstration of their ability to synthesize technical media proficiency with community
          advocacy, marking a successful conclusion to the collaborative event.
        </p>

      </section>

      <FooterSection />
    </main>
  );
}
