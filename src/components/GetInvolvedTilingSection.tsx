import Image from "next/image";

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
                  <Image
                    src={tile.image}
                    alt={`${tile.title} photo`}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 410px, 90vw"
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
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1322px] flex-col items-center px-6 pb-24">
        <p className="font-playfair text-center text-[40px] leading-tight text-[#1e1e1e] sm:text-[48px] lg:text-[64px]">
          Thank you for supporting our cause!
        </p>
        <div className="mt-16 flex w-full flex-col items-center text-center">
          <h3 className="font-playfair text-[clamp(2.2rem,4vw,3rem)] leading-tight text-[#0f3a12] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            Have questions? Reach out to our team.
          </h3>
          <p className="mt-4 max-w-[977px] text-[clamp(1rem,2.2vw,1.5rem)] font-normal text-[#1e1e1e]">
            Whether you're curious about a specific program or want to discuss a partnership,
            we're here to help.
          </p>

          <form
            className="mt-10 w-full max-w-[1044px] rounded-[26px] border border-black bg-transparent px-[32px] pb-10 pt-8 text-left"
            method="get"
          >
            <div className="grid gap-y-8">
              <div className="grid gap-y-8 sm:grid-cols-[431px_476px] sm:gap-x-[49px] sm:gap-y-0">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="full-name"
                    className="text-[20px] font-semibold text-[#5c1a00] sm:text-[24px]"
                  >
                    Full Name:
                  </label>
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    className="h-[54px] w-full rounded-[10px] bg-[#d9d9d9] px-4 text-[18px] text-[#1e1e1e] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email-address"
                    className="text-[20px] font-semibold text-[#5c1a00] sm:text-[24px]"
                  >
                    Email Address:
                  </label>
                  <input
                    id="email-address"
                    name="email-address"
                    type="email"
                    className="h-[54px] w-full rounded-[10px] bg-[#d9d9d9] px-4 text-[18px] text-[#1e1e1e] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:ml-[12px] sm:max-w-[944px]">
                <label
                  htmlFor="interest"
                  className="text-[20px] font-semibold text-[#5c1a00] sm:text-[24px]"
                >
                  Interest:
                </label>
                <input
                  id="interest"
                  name="interest"
                  type="text"
                  className="h-[54px] w-full rounded-[10px] bg-[#d9d9d9] px-4 text-[18px] text-[#1e1e1e] outline-none"
                />
              </div>

              <div className="flex flex-col gap-3 sm:max-w-[956px]">
                <label
                  htmlFor="message"
                  className="text-[20px] font-semibold text-[#5c1a00] sm:text-[24px]"
                >
                  Your Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="h-[164px] w-full resize-none rounded-[10px] bg-[#d9d9d9] px-4 py-3 text-[18px] text-[#1e1e1e] outline-none"
                />
              </div>
            </div>
            <div className="mt-10 flex w-full justify-center">
              <button
                type="submit"
                className="h-[83px] w-[308px] rounded-[41.5px] bg-[#0f3a12] text-[24px] font-extrabold text-white"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
