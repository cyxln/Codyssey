import Image from "next/image";

import NavBar from "@/components/elements/NavBar";
import FooterSection from "@/components/FooterSection";

const heroImage =
  "/figma_assets/our_stories/story4/a6f68e47355a1bb6889751b9214408afb8fdf308.png";

const galleryImages = [
  {
    src: "/figma_assets/our_stories/story4/cb92c82c6a0ee5fcf262122288b8a074754e9dd6.png",
    alt: "Child receiving a meal",
  },
  {
    src: "/figma_assets/our_stories/story4/fb9bc2b1d8b72eb63354b0328924f2955e9e3040.png",
    alt: "Community members with a child",
  },
  {
    src: "/figma_assets/our_stories/story4/8fe48ca8e153956bda582f02e836ba9bbec8efc6.png",
    alt: "Community event and registration table",
  },
];

export default function APlatformForLocalArtisansPage() {
  return (
    <main className="min-h-screen bg-[#fdf6e9] text-[#1e1e1e]">
      <section className="relative min-h-[520px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt="Local artisans event"
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
            <h1 className="max-w-4xl text-[clamp(2rem,4.8vw,4rem)] font-black text-[#fdf6e9]">
              A Platform for Local Artisans
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 pt-10">
        <h2 className="text-center text-[clamp(1.8rem,3.4vw,3rem)] font-bold text-[#1e1e1e]">
          A Platform for Local Artisans
        </h2>

        <p className="mt-10 max-w-5xl text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed text-[#1e1e1e]">
          The finished products will be showcased and sold at Park Inn by Radisson properties in both
          cities. This provides a direct marketplace for the artisans, with proceeds going back to the
          respective community organizations. In Bacolod, for instance, sales will support the NVC's
          Mingo Meals Nutrition Program, which combats malnutrition in children.
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
          "Tela Tales is SMHCC's way of giving back as we continue to grow," said Peggy Angeles,
          SMHCC Executive Vice President. "Business growth and social development must go hand in
          hand. This project is a testament to our commitment to the welfare of the communities where
          we operate."
        </p>
      </section>

      <FooterSection />
    </main>
  );
}
