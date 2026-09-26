"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Smooth scroll from the Nexus template: Lenis driven by the GSAP ticker so scrubbed ScrollTriggers stay in sync.
export function SmoothScroll() {
  React.useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}

// White ball with brass stitching. Red is reserved for the LIVE badge.
export function Ball({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="30" fill="#FBF8F1" />
      <circle cx="32" cy="32" r="30" fill="url(#ball-shade)" />
      <path d="M14 8c8 14 8 34 0 48M50 8c-8 14-8 34 0 48" fill="none" stroke="#C4A36A" strokeWidth="1.6" />
      <path d="M17 12c6 12 6 28 0 40M47 12c-6 12-6 28 0 40" fill="none" stroke="#C4A36A" strokeWidth="1.4" strokeDasharray="1.5 3" />
      <defs>
        <radialGradient id="ball-shade" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// BYQ gem text-rotate-01, ported: letters of the outgoing word lift out while the next word rises in,
// staggered right to left; the brass pill eases its width to hug each word. Timings kept verbatim.
export function TextRotate({ words, prefix }: { words: string[]; prefix?: string }) {
  const [i, setI] = React.useState(0);
  const [prev, setPrev] = React.useState<number | null>(null);
  const [width, setWidth] = React.useState<number>();
  const measure = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setI((n) => {
        setPrev(n);
        return (n + 1) % words.length;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [words.length]);

  React.useLayoutEffect(() => {
    if (measure.current) setWidth(measure.current.getBoundingClientRect().width);
  }, [i]);

  const word = (w: string, state: string) => (
    <span key={w + state} className={`tr-word ${state}`} aria-hidden="true">
      {Array.from(w).map((ch, k, all) => (
        <span key={k} className="tr-char" style={{ "--i": all.length - 1 - k } as React.CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );

  return (
    <span className="num inline-flex flex-wrap items-center gap-x-3 gap-y-2">
      {prefix && <span>{prefix}</span>}
      <span className="tr-pill" style={{ width }}>
        <span ref={measure} className="tr-measure" aria-hidden="true">{words[i]}</span>
        {prev !== null && word(words[prev], "tr-out")}
        {word(words[i], "tr-in")}
        <span className="sr-only" aria-live="polite">{words[i]}</span>
      </span>
    </span>
  );
}

// Scoreboard band: two rows of wide italic type pushed in opposite directions by scroll.
export function ScoreTicker({ items }: { items: string[] }) {
  const root = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (reduced() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tk-a", { xPercent: 0 }, { xPercent: -25, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      gsap.fromTo(".tk-b", { xPercent: -25 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, root);
    return () => ctx.revert();
  }, []);

  const row = (cls: string, outline: boolean) => (
    <div className={`${cls} flex w-max items-center gap-8 whitespace-nowrap pr-8`}>
      {[0, 1, 2, 3].flatMap((r) =>
        items.map((t) => (
          <React.Fragment key={`${r}${t}`}>
            <span className={`display text-6xl md:text-8xl ${outline ? "text-outline" : "text-white"}`}>{t}</span>
            <Ball className="size-8 shrink-0 md:size-12" />
          </React.Fragment>
        )),
      )}
    </div>
  );

  return (
    <div ref={root} aria-hidden="true" className="flex flex-col gap-3 overflow-hidden border-y border-brass/40 bg-night py-8 md:py-12">
      {row("tk-a", false)}
      {row("tk-b", true)}
    </div>
  );
}

// Nexus about-section reveal: characters fill with ink one by one as the paragraph scrolls through.
export function ScrubText({ children, className = "" }: { children: string; className?: string }) {
  const root = React.useRef<HTMLParagraphElement>(null);
  React.useEffect(() => {
    if (reduced() || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sc",
        { opacity: 0.18 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 45%", scrub: 0.5 } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={root} className={className} aria-label={children}>
      {children.split(" ").map((w, k) => (
        <span key={k} aria-hidden="true" className="mr-[0.26em] inline-block whitespace-nowrap">
          {Array.from(w).map((ch, j) => <span key={j} className="sc">{ch}</span>)}
        </span>
      ))}
    </p>
  );
}
