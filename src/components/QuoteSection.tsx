export default function QuoteSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-[#f6efe4] px-6 py-20 text-center text-[#1e1e1e]">
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 text-[clamp(4rem,8vw,6rem)] font-semibold leading-none text-[#d9dc68]">
        “
      </div>
      <div className="flex w-full max-w-4xl flex-col items-center gap-8">
        <h2 className="font-playfair text-[clamp(2.1rem,5vw,4rem)] font-bold italic leading-tight">
          Savings is not just about money. It is about collecting people.
        </h2>
        <p className="max-w-3xl text-[clamp(1rem,2.2vw,1.5rem)] leading-relaxed text-[#2a2a2a]">
          In the Federation, every peso saved is a step toward trust, organization, and a voice in
          the city. We do not wait for handouts; we build our own financial backbone to upgrade our
          communities.
        </p>
        <p className="text-[clamp(1.1rem,2.4vw,2rem)] font-semibold text-[#2d5a27]">
          Homeless Peoples Federation Philippines, Inc.
        </p>
      </div>
    </section>
  );
}
