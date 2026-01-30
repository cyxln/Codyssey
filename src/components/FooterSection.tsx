const exploreLinks = [
  "About Us",
  "Mission & Vision",
  "Partners & Collaborators",
  "Impact Stories",
];

const involveLinks = ["Partner With Us", "Contact"];
const resourceLinks = ["Case Studies", "Publications"];

export default function FooterSection() {
  return (
    <footer className="bg-[#26190f] px-6 py-16 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-md items-start gap-6">
            <img
              src="/figma_assets/footer/hpfpi-logo.png"
              alt="Homeless People's Federation Philippines logo"
              className="h-20 w-20 object-contain"
            />
            <div className="text-sm leading-relaxed text-white/85">
              <p>
                Homeless People's Federation Philippines, Inc. — building resilient communities
                through collective action, savings mobilization, and community-led disaster
                preparedness.
              </p>
              <p className="mt-4 text-sm">
                <span className="font-semibold text-white">Contact Us:</span>{" "}
                homeless.pilipinas@gmail.com
                <br />
                (02) 7001 7926
              </p>
            </div>
          </div>

          <div className="grid w-full gap-8 sm:grid-cols-3 lg:max-w-xl">
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ffeb51]">
                Explore
              </p>
              <ul className="space-y-1 text-sm text-white/90">
                {exploreLinks.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ffeb51]">
                Get Involved
              </p>
              <ul className="space-y-1 text-sm text-white/90">
                {involveLinks.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ffeb51]">
                Resources
              </p>
              <ul className="space-y-1 text-sm text-white/90">
                {resourceLinks.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] bg-[#1f130a] px-6 py-6 text-center text-sm text-white/85">
          <p>
            Homeless People's Federation Philippines, Inc. is a nonprofit organization registered
            in the Philippines.
          </p>
          <p className="mt-2 text-xs text-white/70">
            © 2026. HPFPI - Homeless People’s Federation Philippines, Inc. All rights reserved.
            | OpenJWL
          </p>
        </div>
      </div>
    </footer>
  );
}
