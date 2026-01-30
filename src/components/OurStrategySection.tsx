const strategies = [
  {
    title: "Community Savings",
    body:
      "We mobilize internal resources through the Urban Poor Development Fund. This isn't just for emergencies—it is capital for land purchase and housing repairs.",
    icon: "/figma_assets/our_strategy/icon-piggy.svg",
    alt: "Piggy bank icon",
  },
  {
    title: "People’s Mapping & Data",
    body:
      "\"Information is Power.\" We conduct our own enumerations and map our settlements. By identifying our own high-risk zones (flood/landslide areas), we generate the data needed to negotiate \"on-site upgrading\".",
    icon: "/figma_assets/our_strategy/icon-pin.svg",
    alt: "Map marker icon",
  },
  {
    title: "Participatory Governance",
    body:
      "We shift from protest to partnership. Federation leaders sit on Local Housing Boards, co-designing city plans to ensure that the poor are included.",
    icon: "/figma_assets/our_strategy/icon-house.svg",
    alt: "House icon",
  },
  {
    title: "Peer-to-Peer Exchange",
    body:
      "We use community-to-community exchanges where leaders from one city travel to another to teach savings, mapping, and negotiation.",
    icon: "/figma_assets/our_strategy/icon-stars.svg",
    alt: "Community exchange icon",
  },
];

export default function OurStrategySection() {
  return (
    <section className="bg-[#f6efe4] px-6 py-20 text-[#1e1e1e]">
      <div className="mx-auto mb-12 flex w-full max-w-6xl items-center justify-center gap-6 text-center text-[#0f3a12]">
        <span className="h-[6px] w-28 rounded-full bg-gradient-to-b from-[#8dd55a] to-[#0f3a12] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
        <span className="text-[clamp(0.95rem,1.8vw,1.25rem)] font-semibold tracking-[0.2em]">
          OUR STRATEGY
        </span>
        <span className="h-[6px] w-28 rounded-full bg-gradient-to-b from-[#8dd55a] to-[#0f3a12] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2">
        {strategies.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-4 rounded-[32px] bg-white p-8 shadow-[5px_6px_6.6px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1e1e1e]">
                <img src={item.icon} alt={item.alt} className="h-8 w-8" />
              </div>
              <h3 className="text-[clamp(1.25rem,2.4vw,2rem)] font-extrabold text-[#1e1e1e]">
                {item.title}
              </h3>
            </div>
            <p className="text-[clamp(1rem,2vw,1.25rem)] font-semibold text-[#515151]">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
