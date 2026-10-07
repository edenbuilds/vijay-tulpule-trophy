"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Countdown } from "@/components/Countdown";

gsap.registerPlugin(ScrollTrigger);

const headingStyle = "display display-long";

// Inner pages use the same compact light-sky masthead so the title and useful detail stay ahead of decoration.
export function Hero({
  eyebrow,
  title,
  sub,
  children,
  tall = false,
  facts,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  /** Retired: the navy header carries no photograph. Kept so pages that still pass one compile. */
  photo?: { src: string; alt: string };
  children?: React.ReactNode;
  tall?: boolean;
  facts?: string[];
}) {
  return (
    <section className="px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-[1440px] rounded-2xl bg-sky px-5 py-8 sm:px-8 md:px-10 md:py-10">
        <div className="max-w-4xl">
          {eyebrow && <p className="mb-2 text-base font-semibold text-royal">{eyebrow}</p>}
          <h1 className={`${headingStyle} max-w-[18ch] text-[clamp(2.5rem,7vw,5.25rem)] !leading-[1.04]`}>{title}</h1>
          {sub && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-navy/75 md:text-xl">{sub}</p>}
          {tall && <Countdown className="display num mt-4 text-3xl md:text-4xl" />}
          {children && <div className="mt-5 flex flex-wrap items-center gap-3">{children}</div>}
          {facts && (
            <div className="mt-6 grid gap-x-6 gap-y-2 border-t border-navy/15 pt-4 sm:grid-cols-3">
              {facts.map((f) => <p key={f} className="num text-sm text-navy/70 md:text-base">{f}</p>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// A photograph that drifts inside its rounded frame on scroll (image overscaled, frame clips it).
export function ParallaxPhoto({ src, alt, className = "", priority = false, sizes = "(min-width: 768px) 50vw, 100vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  const frame = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("img", { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={frame} className={`relative overflow-hidden bg-sky-deep ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="scale-[1.14] object-cover" />
    </div>
  );
}

// Full-width surfaces distinguish chapters without turning every content group into another rounded card.
const BANDS = {
  snow: { box: "bg-snow", kicker: "text-royal" },
  white: { box: "bg-white", kicker: "text-royal" },
  sky: { box: "bg-sky", kicker: "text-royal" },
  navy: { box: "bg-navy text-white", kicker: "text-sky" },
};

export function Block({
  title,
  kicker,
  children,
  tone = "snow",
  id,
}: {
  title?: string;
  kicker?: string;
  children: React.ReactNode;
  tone?: keyof typeof BANDS;
  id?: string;
}) {
  const band = BANDS[tone];
  return (
    <section id={id} className={`${band.box} py-12 md:py-24`}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-12">
        {kicker && <p className={`mb-3 text-base font-semibold ${band.kicker}`}>{kicker}</p>}
        {title && (
          <h2 className={`${headingStyle} mb-6 text-3xl leading-tight sm:text-4xl md:mb-9 md:text-5xl`}>{title}</h2>
        )}
        {children}
      </div>
    </section>
  );
}

// Ceremony steps stay readable without requiring animation or JavaScript.
export function Timeline({ steps }: { steps: { time?: string; what: string }[] }) {
  return (
    <ol className="grid gap-1">
        {steps.map((s, i) => (
        <li key={i} className="border-t border-current/15 py-3">
          <span className="num grid gap-x-4 sm:grid-cols-[4rem_1fr]">
            <span className="font-semibold text-royal">{s.time ?? ""}</span>
            <span className="text-lg">{s.what}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
