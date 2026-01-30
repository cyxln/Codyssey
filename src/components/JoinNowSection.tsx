import JoinUsBtn from "./elements/JoinUsBtn";

export default function JoinNowSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#f6efe4] px-6 py-20 text-center text-[#1e1e1e]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
        <h2 className="font-playfair text-[clamp(2.6rem,6vw,5rem)] font-semibold tracking-tight">
          <span className="text-[#1e1e1e]">JOIN THE </span>
          <span className="text-[#0f3a12]">ALLIANCE.</span>
        </h2>
        <p className="max-w-3xl text-[clamp(1rem,2.3vw,1.5rem)] leading-relaxed text-[#1e1e1e]/90">
          Join the movement for community-led development. Whether you're a community leader,
          policymaker, NGO partner, or concerned citizen—there's a role for you.
        </p>
        <JoinUsBtn buttonText="Get Involved" />
      </div>
    </section>
  );
}
