import NavBar from "./elements/NavBar";

const tiles = [
  {
    title: "Partner",
    description: "Partner with the Architects of Urban Change.",
    image: "/figma_assets/get_involved/partner.png",
    imageClassName:
      "absolute h-[161.28%] w-[203%] left-[-38.25%] top-[-36.96%] max-w-none",
  },
  {
    title: "Contribute",
    description: "Make a contribution to support\nour advocacies",
    image: "/figma_assets/get_involved/contribute.png",
    imageClassName:
      "absolute h-[109.64%] w-[138%] left-[-37.98%] top-[0.02%] max-w-none",
  },
  {
    title: "Volunteer",
    description: "Be a part of Community-Led\nSolidarity",
    image: "/figma_assets/get_involved/volunteer.png",
    imageClassName:
      "absolute h-[182%] w-[114.56%] left-[-7.01%] top-[-53.93%] max-w-none",
  },
];

export default function GetInvolvedTilingSection() {
  return (
    <section className="relative min-h-screen bg-[#f6efe4] text-[#1e1e1e]">
      <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2">
        <NavBar />
      </div>

      <div className="mx-auto flex min-h-screen w-full items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-[1322px] flex-col items-center">
          <div className="get-involved-tiles grid w-full gap-8 lg:grid-cols-3 lg:gap-[46px]">
            {tiles.map((tile) => (
              <article
                key={tile.title}
                className="get-involved-tile flex w-full max-w-[410px] flex-col items-center rounded-[43px] bg-[#ffead8] px-[21px] pb-10 pt-[22px] text-center shadow-[13px_21px_42.3px_rgba(0,0,0,0.25)] lg:h-[528px]"
              >
                <div className="relative h-[240px] w-full overflow-hidden rounded-[43px] sm:h-[280px] lg:h-[308px]">
                  <img
                    src={tile.image}
                    alt={`${tile.title} photo`}
                    className={tile.imageClassName}
                  />
                </div>
                <h2 className="mt-4 text-[32px] font-black leading-[normal] text-[#0f3a12] sm:text-[36px]">
                  {tile.title}
                </h2>
                <p className="mt-[27px] max-w-[380px] whitespace-pre-line text-[20px] font-medium leading-[normal] text-black sm:text-[24px]">
                  {tile.description}
                </p>
              </article>
            ))}
          </div>
          <p className="font-playfair mt-16 text-center text-[40px] leading-tight text-[#1e1e1e] sm:text-[48px] lg:text-[64px]">
            Thank you for supporting our cause!
          </p>
        </div>
      </div>
    </section>
  );
}
