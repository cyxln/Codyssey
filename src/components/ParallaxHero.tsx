"use client";

import Image from "next/image";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { useEffect, useRef } from "react";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const imageLayers = [
  {
    id: "sky",
    src: "/figma_assets/sky.png",
    className: "layer-sky",
    alt: "",
    priority: true,
  },
  {
    id: "medyoblue",
    src: "/figma_assets/medyoblue%20gradient.png",
    className: "layer-medyoblue parallax-hero__layer--soft",
    alt: "",
  },
  {
    id: "green-gradient",
    src: "/figma_assets/green%20gradient.png",
    className: "layer-green parallax-hero__layer--soft",
    alt: "",
  },
  {
    id: "side-gradient",
    src: "/figma_assets/sideways%20gradientna%20green.png",
    className: "layer-side parallax-hero__layer--soft",
    alt: "",
  },
  {
    id: "sun-rays",
    src: "/figma_assets/sun%20rays.png",
    className: "layer-rays parallax-hero__layer--soft",
    alt: "",
  },
  {
    id: "ray",
    src: "/figma_assets/ray.png",
    className: "layer-ray parallax-hero__layer--soft",
    alt: "",
  },
  {
    id: "light",
    src: "/figma_assets/light.png",
    className: "layer-light parallax-hero__layer--soft",
    alt: "",
  },
  {
    id: "village",
    src: "/figma_assets/poverty.png",
    className: "layer-village",
    alt: "",
    priority: true,
  },
  {
    id: "birds",
    src: "/figma_assets/birds.png",
    className: "layer-birds",
    alt: "",
  },
  {
    id: "soil",
    src: "/figma_assets/soil.png",
    className: "layer-soil parallax-hero__layer--bottom",
    alt: "",
    priority: true,
  },
  {
    id: "plant",
    src: "/figma_assets/plant.png",
    className: "layer-plant parallax-hero__layer--bottom",
    alt: "",
  },
  {
    id: "foreground-left",
    src: "/figma_assets/Mask%20group-4.png",
    className: "layer-foreground-left parallax-hero__layer--bottom",
    alt: "",
  },
  {
    id: "foreground-right",
    src: "/figma_assets/Mask%20group-5.png",
    className: "layer-foreground-right parallax-hero__layer--bottom",
    alt: "",
  },
];

export default function ParallaxHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      element.style.setProperty("--progress", "0");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const start = element.offsetTop;
      const total = element.offsetHeight - window.innerHeight;
      const raw = total > 0 ? (window.scrollY - start) / total : 0;
      const progress = Math.min(Math.max(raw, 0), 1);
      element.style.setProperty("--progress", progress.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`parallax-hero ${display.variable} ${body.variable}`}
    >
      <div className="parallax-hero__sticky">
        {imageLayers.map((layer) => (
          <div
            key={layer.id}
            className={`parallax-hero__layer ${layer.className}`}
            aria-hidden="true"
          >
            <Image
              src={layer.src}
              alt={layer.alt}
              fill
              priority={layer.priority}
              sizes="100vw"
              className="parallax-hero__image"
            />
          </div>
        ))}

        <div className="parallax-hero__layer layer-text parallax-hero__layer--text">
          <div className="parallax-hero__text">
            <p className="parallax-hero__eyebrow">Community Resilience</p>
            <h1 className="parallax-hero__title">
              Resilient Communities
              <br />
              Together
            </h1>
            <p className="parallax-hero__subtitle">
              Through community-driven disaster preparedness and collective
              efforts since 1995.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
