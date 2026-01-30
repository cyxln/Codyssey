import NavBar from "@/components/elements/NavBar";
import FooterSection from "@/components/FooterSection";

const heroImage =
  "/figma_assets/our_stories/story3/12c6a7b13447d773ea8f83ac8042582b17fa2cee.png";

const galleryImages = [
  {
    src: "/figma_assets/our_stories/story3/ee249f9d5754020a00b284762b5a225f62b9a674.png",
    alt: "Homes along a river in Iloilo City",
  },
  {
    src: "/figma_assets/our_stories/story3/7eed61d93752c66f8910b161a37d95562c1d04e3.png",
    alt: "HPFPI members reviewing plans",
  },
  {
    src: "/figma_assets/our_stories/story3/80efc97b70454fca3dbfb16baf1ee5a8f44f5788.png",
    alt: "Neighborhood street in Iloilo",
  },
];

export default function EmpoweringTheUrbanPoorPage() {
  return (
    <main className="min-h-screen bg-[#fdf6e9] text-[#1e1e1e]">
      <section className="relative min-h-[520px] w-full overflow-hidden">
        <img
          src={heroImage}
          alt="Community street in Iloilo City"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(15,58,18,0.7)]" />

        <div className="relative z-10 flex min-h-[520px] flex-col items-center px-6 pb-12 pt-8">
          <div className="flex w-full justify-center">
            <NavBar />
          </div>
          <div className="mt-auto flex w-full max-w-6xl justify-start pb-6">
            <h1 className="max-w-5xl text-[clamp(2rem,4.8vw,4rem)] font-black text-[#fdf6e9]">
              Empowering the Urban Poor: HPFPI&apos;s Catalyst Role in Iloilo City&apos;s Resilience
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-16 pt-10">
        <h2 className="text-center text-[clamp(1.8rem,3.4vw,3rem)] font-bold text-[#1e1e1e]">
          Empowering the Urban Poor: HPFPI&apos;s Catalyst Role in Iloilo City&apos;s Resilience
        </h2>

        <p className="mt-10 max-w-5xl text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed text-[#1e1e1e]">
          The Homeless People&apos;s Federation of the Philippines, Inc. (HPFPI) was instrumental in
          redefining Iloilo City&apos;s approach to urban resilience by transitioning from traditional
          top-down resettlement to a community-led development model. At the core of HPFPI&apos;s strategy
          was the institutionalization of Community Savings Groups, which served as both a financial
          safety net and an organizational foundation. By mobilizing over 500 savings groups, the
          Federation enabled informal settler families, many of whom were previously excluded from
          formal credit, to co-finance their own resilient housing. This financial autonomy was
          leveraged to secure land within city limits through public land banking, ensuring that
          relocated families maintained vital proximity to their livelihoods and social networks rather
          than being displaced to the urban periphery.
        </p>

        <div className="group mt-12 grid w-full max-w-5xl gap-6 md:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              key={image.src}
              className="aspect-[4/3] w-full overflow-hidden transition-opacity duration-300 group-hover:opacity-40 group-focus-within:opacity-40 hover:opacity-100 focus-within:opacity-100"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover focus:outline-none"
                tabIndex={0}
              />
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-5xl text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed text-[#1e1e1e]">
          HPFPI&apos;s technical contribution was equally transformative, characterized by participatory
          site planning and architectural innovation. Instead of standardized government units, the
          Federation facilitated workshops where residents co-designed their homes, leading to the
          adoption of flood-resilient features such as elevated two-story structures and the use of
          Interlocking Compressed Earth Blocks (ICEB). These materials not only reduced construction
          costs but also provided better thermal insulation for the tropical climate. Beyond physical
          infrastructure, HPFPI bridged the gap between marginalized communities and formal
          governance; by leading citywide surveys to map housing vulnerabilities, they provided the
          critical data that shaped the city&apos;s Local Shelter Plan. Through these efforts, HPFPI
          ensured that the voices of the urban poor were not only heard but were integrated into the
          city&apos;s highest decision-making bodies, proving that inclusive disaster mitigation is the
          most sustainable path to urban stability.
        </p>
      </section>

      <FooterSection />
    </main>
  );
}
