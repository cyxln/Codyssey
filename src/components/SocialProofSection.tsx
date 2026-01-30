export default function SocialProofSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-[#1a120b] px-6 py-16 text-white">
      <img
        src="/figma_assets/our_impact/social-proof-soil.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
        <h2 className="text-[clamp(2rem,4.2vw,3rem)] font-extrabold">
          A Movement Built on Community Savings and Action
        </h2>
        <p className="text-[clamp(1rem,2.2vw,1.5rem)] leading-relaxed text-white/90">
          The Philippines Homeless People’s Federation was formed to bring together low-income
          community organizations from cities across the Philippines who are working together to
          address shared challenges such as securing land tenure, housing, livelihood,
          infrastructure, health, welfare and access to affordable credit. The federation supports
          these groups and encourages formation of new ones.
        </p>
      </div>
    </section>
  );
}
