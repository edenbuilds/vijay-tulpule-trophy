"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { TransitionRouter } from "next-transition-router";

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

// Red leather cricket ball: straight seam with a stitch row either side, drawn in three-quarter view.
export function Ball({ className = "" }: { className?: string }) {
  const id = React.useId();
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={id} cx="0.36" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#c0262e" />
          <stop offset="1" stopColor="#6e1016" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${id})`} />
      <path d="M24 3 Q42 32 24 61" fill="none" stroke="#4a090d" strokeWidth="1.4" />
      <path d="M20 4.5 Q37.5 32 20 59.5" fill="none" stroke="#f3e6da" strokeWidth="1.5" strokeDasharray="1.6 2.4" />
      <path d="M28 2.5 Q46.5 32 28 61.5" fill="none" stroke="#f3e6da" strokeWidth="1.5" strokeDasharray="1.6 2.4" />
      <ellipse cx="19" cy="17" rx="6" ry="3.5" fill="#fff" opacity="0.14" transform="rotate(-35 19 17)" />
    </svg>
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
    <div ref={root} aria-hidden="true" className="flex flex-col gap-3 overflow-hidden border-y border-white/10 bg-night py-8 md:py-12">
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

// Hyperiux sweep-lift-transition, adapted: the vendored version pins the whole site in a fixed
// overflow-hidden frame, which breaks window scroll, Lenis, the sticky nav and every ScrollTrigger.
// Same clip polygons and power4.inOut, run on an overlay panel instead, with shorter legs so a
// navigation doesn't take 2.6s.
const HIDDEN_CLIP = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
const VISIBLE_CLIP = "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)";
const LIFTED_CLIP = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

export function PageSweep({ children }: { children: React.ReactNode }) {
  const panel = React.useRef<HTMLDivElement>(null);
  return (
    <TransitionRouter
      auto
      leave={(next) => {
        if (reduced()) return next();
        const tw = gsap.fromTo(panel.current, { clipPath: HIDDEN_CLIP }, { clipPath: VISIBLE_CLIP, duration: 0.7, ease: "power4.inOut", onComplete: next });
        return () => tw.kill();
      }}
      enter={(next) => {
        if (reduced()) return next();
        const tl = gsap
          .timeline({ onComplete: () => (ScrollTrigger.refresh(), next()) })
          .to(panel.current, { clipPath: LIFTED_CLIP, duration: 0.8, ease: "power4.inOut" })
          .from("main", { y: 50, duration: 0.8, ease: "power4.inOut", clearProps: "transform" }, 0);
        return () => tl.kill();
      }}
    >
      {children}
      <div ref={panel} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-green" style={{ clipPath: HIDDEN_CLIP }}>
        <Ball className="size-14" />
      </div>
    </TransitionRouter>
  );
}
