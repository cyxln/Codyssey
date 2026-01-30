const navItems = [
  "Home",
  "About Us",
  "The Team",
  "Our Stories",
  "Savings",
  "Get Involved",
];

export default function NavBar() {
  return (
    <div className="glass-pill glass-pill--nav">
      <nav className="flex flex-wrap items-center justify-center gap-3 text-[clamp(0.9rem,1.4vw,1.15rem)] font-semibold text-[#4b4b4b]">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            className={`rounded-full px-4 py-2 transition ${
              item === "Home"
                ? "font-black text-[#2f2f2f]"
                : "hover:bg-white/40 hover:text-[#2c2c2c]"
            }`}
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
}
