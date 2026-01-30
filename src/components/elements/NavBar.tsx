"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Stories", href: "/our-stories" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Is my area at risk?", href: "/risk-assessment" },
];

const isActivePath = (href: string, pathname: string) => {
  if (!href || href === "#") {
    return false;
  }
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className="glass-pill glass-pill--nav">
      <nav className="flex flex-wrap items-center justify-center gap-3 text-[clamp(0.9rem,1.4vw,1.15rem)] font-semibold text-[#4b4b4b]">
        {navItems.map((item) => {
          const isActive = isActivePath(item.href, pathname);
          const className = `rounded-full px-4 py-2 transition ${
            isActive
              ? "font-black text-[#2f2f2f]"
              : "hover:bg-white/40 hover:text-[#2c2c2c]"
          }`;

          if (item.href === "#") {
            return (
              <a key={item.label} href={item.href} className={className}>
                {item.label}
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={className}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
