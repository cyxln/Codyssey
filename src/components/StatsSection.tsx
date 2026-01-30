const stats = [
  { value: "25K+", label: "Families Supported" },
  { value: "300+", label: "Communities Organized" },
  { value: "30", label: "Years of Impact" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#0f3a12] px-6 py-16 text-[#fdf6e9]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-10 text-center md:flex-row">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <div className="text-[clamp(2.4rem,4.5vw,4rem)] font-bold tracking-[-0.08em] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              {stat.value}
            </div>
            <div className="text-[clamp(1rem,2.4vw,1.5rem)] font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
