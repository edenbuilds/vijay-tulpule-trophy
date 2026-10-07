"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { TransitionRouter } from "next-transition-router";
import { Ball } from "@/components/brand/Ball";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Smooth scroll from the Nexus template: Lenis driven by the GSAP ticker so scrubbed ScrollTriggers stay in sync.
export function SmoothScroll() {
  React.useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis();
    // The gallery reel pauses Lenis while its snap runs (effects/parallax-gallery).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);
  return null;
}

// One ball for the whole site: the brand-kit ball lives in brand/Ball.tsx. Kept exported here so existing imports still work.
export { Ball };

// Scoreboard band: two rows of display type pushed in opposite directions by scroll.
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
            <span className={`display text-6xl md:text-8xl ${outline ? "text-outline" : "text-navy"}`}>{t}</span>
            <Ball className="size-8 shrink-0 md:size-12" />
          </React.Fragment>
        )),
      )}
    </div>
  );

  return (
    <div ref={root} aria-hidden="true" className="flex flex-col gap-3 overflow-hidden bg-snow py-8 md:py-12">
      {row("tk-a", false)}
      {row("tk-b", true)}
    </div>
  );
}

// Nexus about-section reveal: characters fill in one by one as the paragraph scrolls through.
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

// Four BACA-coloured panels adapt the supplied GSAP transition concept without pinning or replacing the page scroll surface.
const TRANSITION_PANELS = 4;

export function PageSweep({ children }: { children: React.ReactNode }) {
  const panel = React.useRef<HTMLDivElement>(null);
  const strips = React.useRef<(HTMLDivElement | null)[]>([]);
  const ball = React.useRef<HTMLDivElement>(null);
  return (
    <TransitionRouter
      auto
      leave={(next) => {
        if (reduced()) return next();
        const tw = gsap
          .timeline({ onComplete: next })
          .fromTo(strips.current, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.42, ease: "power4.inOut", stagger: 0.055 })
          .fromTo(ball.current, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "power2.out" }, 0.2);
        return () => tw.kill();
      }}
      enter={(next) => {
        if (reduced()) return next();
        const tl = gsap
          .timeline({ onComplete: () => (ScrollTrigger.refresh(), next()) })
          .fromTo(
            strips.current,
            { scaleX: 1, transformOrigin: "right center" },
            { scaleX: 0, duration: 0.42, ease: "power4.inOut", stagger: 0.055 },
          )
          .to(ball.current, { autoAlpha: 0, scale: 0.8, duration: 0.18, ease: "power2.in" }, 0)
          .fromTo("main", { y: 24 }, { y: 0, duration: 0.55, ease: "power3.out", clearProps: "transform" }, 0);
        return () => tl.kill();
      }}
    >
      {children}
      <div ref={panel} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] flex overflow-hidden">
        {Array.from({ length: TRANSITION_PANELS }, (_, i) => (
          <div
            key={i}
            ref={(el) => { strips.current[i] = el; }}
            className="h-full min-w-0 flex-1 bg-navy"
            style={{ transform: "scaleX(0)" }}
          />
        ))}
        <div ref={ball} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0">
          <Ball className="size-14" />
        </div>
      </div>
    </TransitionRouter>
  );
}
