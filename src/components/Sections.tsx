"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ball } from "@/components/Motion";
import { RollingWords } from "@/components/effects/rolling-text";

gsap.registerPlugin(ScrollTrigger);

// Home: BYQ section stringer-hero-4 (centred label, oversized headline, inline word marquee with edge
// fades, three-column fact row on a hairline, staggered 0/100/700ms entrance). Inner pages keep the
// babka-hero-1 bottom-left stack. Titles roll in on Hyperiux rolling-text reels. The one cricket ball
// is the parallax element: it travels down the hero and spins as you scroll. No glows, no blur.
export function Hero({
  eyebrow,
  title,
  sub,
  marquee,
  row,
  children,
  tall = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  marquee?: string[];
  row?: string[];
  children?: React.ReactNode;
  tall?: boolean;
}) {
  const root = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".f-ball",
        { x: 0, y: 0, rotation: 0 },
        { x: tall ? -180 : -80, y: tall ? 360 : 140, rotation: 420, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } },
      );
    }, el);
    return () => ctx.revert();
  }, [tall]);

  const label = "text-xs font-medium uppercase tracking-[0.08em] text-white/60";

  return (
    <section ref={root} className={`relative overflow-hidden border-b border-white/10 bg-night text-white ${tall ? "" : "flex min-h-[20rem] flex-col justify-end md:min-h-[26rem]"}`}>
      <div aria-hidden="true" className={`f-ball pointer-events-none absolute ${tall ? "right-[8%] top-[4.25rem] md:right-[12%] md:top-28" : "right-[8%] top-20 md:right-[14%]"}`}>
        <Ball className={tall ? "size-9 md:size-20" : "size-9 md:size-14"} />
      </div>

      {tall ? (
        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-8 px-5 pb-12 pt-28 text-center md:px-8 md:pb-16 md:pt-40">
          {eyebrow && <p className={`rise ${label}`}>{eyebrow}</p>}
          <h1 aria-label={title} className="display rise max-w-[14ch] text-[2.75rem] leading-[0.95] sm:text-7xl lg:text-[7rem]" style={{ animationDelay: "100ms" }}>
            <RollingWords text={title} />
          </h1>
          {marquee && <Marquee words={marquee} />}
          {children && (
            <div className="rise flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "400ms" }}>
              {children}
            </div>
          )}
          {row && (
            <div className="rise mt-12 grid w-full gap-2 border-t border-white/10 pt-6 md:mt-20 md:grid-cols-3" style={{ animationDelay: "700ms" }}>
              {row.map((r, i) => (
                <p key={r} className={`num ${label} ${["md:text-left", "md:text-center", "md:text-right"][i]}`}>{r}</p>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-24 md:px-8 md:pb-16">
          <div className="flex max-w-5xl flex-col items-start gap-5">
            {eyebrow && <p className={`rise ${label}`}>{eyebrow}</p>}
            <h1 aria-label={title} className="display rise text-5xl leading-none md:text-8xl" style={{ animationDelay: "100ms" }}>
              <RollingWords text={title} />
            </h1>
            {sub && <p className="num rise text-lg text-white/70 md:text-2xl" style={{ animationDelay: "200ms" }}>{sub}</p>}
            {children && <div className="rise mt-3 flex flex-wrap items-center gap-4" style={{ animationDelay: "320ms" }}>{children}</div>}
          </div>
        </div>
      )}
    </section>
  );
}

// stringer-hero-4 inline marquee: tripled word track scrolling a third of its width every 6s, with
// hard-to-soft fades in the canvas colour at both edges.
function Marquee({ words }: { words: string[] }) {
  return (
    <div aria-hidden="true" className="rise relative w-full max-w-3xl overflow-hidden py-1" style={{ animationDelay: "250ms" }}>
      <div className="marquee-track flex w-max gap-[0.9em] whitespace-nowrap text-2xl font-medium text-white/55 md:text-4xl">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="num">{w}</span>
        ))}
      </div>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-[30%] bg-[linear-gradient(90deg,var(--color-night)_12%,transparent)]" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-[30%] bg-[linear-gradient(270deg,var(--color-night)_12%,transparent)]" />
    </div>
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
