import Image from "next/image";

const impactItems = [
  {
    title: "Security Tenure",
    image: "/figma_assets/our_impact/impact-security-tenure.png",
    alt: "Residential homes representing security tenure",
  },
  {
    title: "Disaster Resilience",
    image: "/figma_assets/our_impact/impact-disaster-resilience.png",
    alt: "Hands joining together symbolizing resilience",
  },
  {
    title: "Policy Change",
    image: "/figma_assets/our_impact/impact-policy-change.png",
    alt: "Hands signing documents representing policy change",
  },
];

export default function OurImpactSection() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-[#f6efe4] px-6 py-20 text-[#1e1e1e]">
      <div className="mx-auto mb-12 flex w-full max-w-6xl flex-col items-start gap-6 text-[#0f3a12]">
        <div className="flex items-center gap-6 text-center text-[#0f3a12]">
          <span className="h-[6px] w-28 rounded-full bg-gradient-to-b from-[#8dd55a] to-[#0f3a12] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
          <span className="text-[clamp(0.95rem,1.8vw,1.25rem)] font-semibold tracking-[0.2em]">
            OUR IMPACT
          </span>
        </div>
        <h2 className="font-playfair text-[clamp(2.4rem,5.2vw,4.4rem)] font-semibold leading-[1.05] text-[#1e1e1e]">
          Transforming Lives
          <br />
          Through{" "}
          <span className="italic text-[#0f3a12]">Collective Action</span>
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        {impactItems.map((item) => (
          <div key={item.title} className="flex w-full flex-col items-center gap-6">
            <div className="relative aspect-[4/3] w-full max-w-[360px] overflow-hidden rounded-[32px] bg-white shadow-[5px_6px_6.6px_rgba(0,0,0,0.25)]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 360px, 90vw"
                className="object-cover"
              />
            </div>
            <p className="text-center text-[clamp(1.1rem,2.5vw,2.5rem)] font-normal text-[#1e1e1e]">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
