"use client";

import { useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className,
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? "scroll-reveal--visible" : ""} ${
        className ?? ""
      }`.trim()}
    >
      {children}
    </div>
  );
}
