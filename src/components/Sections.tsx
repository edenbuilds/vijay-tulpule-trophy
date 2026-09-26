"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Ball } from "@/components/Motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Structure from BYQ section babka-hero-1: bottom-left copy stack, staggered load.
// Layered field parallax (mown stripes, boundary rope, pitch, ball) scrubbed by GSAP, and the
// masked line reveal on the title from the Codegrid Steelworks template. Never blur-animate.
export function Hero({
  eyebrow,
  title,
  sub,
  children,
  tall = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  children?: React.ReactNode;
  tall?: boolean;
}) {
  const root = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const h1 = el.querySelector("h1")!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(h1, { autoAlpha: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      const split = SplitText.create(h1, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(h1, { autoAlpha: 1 });
          return gsap.from(self.lines, { yPercent: 125, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 });
        },
      });
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(".f-ground", { y: 80, ease: "none", scrollTrigger: st });
      gsap.to(".f-rope", { y: 140, scale: 1.08, ease: "none", scrollTrigger: st });
      gsap.to(".f-pitch", { y: 240, ease: "none", scrollTrigger: st });
      gsap.fromTo(".f-ball", { x: 0, y: 0, rotation: 0 }, { x: -140, y: 420, rotation: 540, ease: "none", scrollTrigger: st });
      return () => split.revert();
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className={`relative flex flex-col justify-end overflow-hidden bg-night text-white ${
        tall ? "min-h-[min(92dvh,58rem)]" : "min-h-[22rem] md:min-h-[30rem]"
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="f-ground ground absolute -inset-y-24 inset-x-0" />
        <svg className="f-rope absolute -right-[30%] top-[8%] h-[150%] w-auto opacity-40 md:-right-[12%]" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="396" fill="none" stroke="#FBF8F1" strokeWidth="2" strokeDasharray="2 10" />
          <circle cx="400" cy="400" r="210" fill="none" stroke="#FBF8F1" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="14 12" />
        </svg>
        <svg className="f-pitch absolute -top-[10%] right-[6%] h-[120%] w-[34%] min-w-40 opacity-70 md:right-[14%] md:w-[22%]" viewBox="0 0 200 1000" preserveAspectRatio="none">
          <polygon points="80,0 120,0 170,1000 30,1000" fill="#C4A36A" fillOpacity="0.22" />
          <g stroke="#FBF8F1" strokeOpacity="0.7" strokeWidth="2" fill="none">
            <line x1="68" y1="120" x2="132" y2="120" />
            <line x1="72" y1="90" x2="128" y2="90" />
            <line x1="22" y1="820" x2="178" y2="820" />
            <line x1="26" y1="900" x2="174" y2="900" />
          </g>
          <g fill="#FBF8F1">
            <rect x="94" y="78" width="2" height="12" /><rect x="99" y="78" width="2" height="12" /><rect x="104" y="78" width="2" height="12" />
            <rect x="88" y="870" width="4" height="30" /><rect x="98" y="870" width="4" height="30" /><rect x="108" y="870" width="4" height="30" />
          </g>
        </svg>
        <div className="f-ball absolute right-[18%] top-[16%] md:right-[26%] md:top-[14%]">
          <Ball className="size-10 drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)] md:size-16" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-24 md:px-8 md:pb-20">
        <div className="flex max-w-5xl flex-col items-start gap-5">
          {eyebrow && (
            <p className="rise text-sm font-semibold uppercase tracking-[0.14em] text-brass" style={{ animationDelay: "0ms" }}>
              {eyebrow}
            </p>
          )}
          <h1 className={`display split-h1 ${tall ? "text-[2.9rem] sm:text-7xl lg:text-[7.5rem]" : "text-5xl md:text-8xl"}`}>
            {title}
          </h1>
          {sub && (
            <p className="num rise text-lg text-white/80 md:text-2xl" style={{ animationDelay: "200ms" }}>
              {sub}
            </p>
          )}
          {children && (
            <div className="rise mt-3 flex flex-wrap items-center gap-4" style={{ animationDelay: "320ms" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function StatBar({ items, tone = "dark" }: { items: string[][]; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <section className={dark ? "bg-green" : "bg-cream"}>
      <dl className={`mx-auto grid max-w-7xl gap-px ${items.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"} ${dark ? "bg-white/10" : "bg-ink/10"}`}>
        {items.map(([value, label]) => (
          <div key={value + label} className={`flex flex-col-reverse gap-1 px-4 py-8 md:px-8 md:py-10 ${dark ? "bg-green text-white" : "bg-cream text-ink"}`}>
            <dt className={dark ? "text-white/60" : "text-ink/55"}>{label}</dt>
            <dd className="num text-3xl font-bold [font-stretch:112%] md:text-5xl">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Block({
  title,
  children,
  tone = "paper",
  id,
}: {
  title?: string;
  children: React.ReactNode;
  tone?: "paper" | "cream" | "night";
  id?: string;
}) {
  const bg = tone === "night" ? "bg-night text-white" : tone === "cream" ? "bg-cream" : "bg-paper";
  return (
    <section id={id} className={`${bg} py-16 md:py-24`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {title && <h2 className="display mb-8 text-4xl md:mb-12 md:text-6xl">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
