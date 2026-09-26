"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// BYQ gem: scroll-timeline-01. Motion values verbatim; lime mapped to brass.
const BRASS = "#c4a36a";

export type Step = { n: string; title: string; date: string };

export function ScrollTimeline({ steps }: { steps: Step[] }) {
  const root = React.useRef<HTMLDivElement>(null);
  const fill = React.useRef<HTMLDivElement>(null);
  const nodes = React.useRef<HTMLDivElement>(null);
  const dots = React.useRef<(HTMLDivElement | null)[]>([]);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const lit = (d: HTMLDivElement) => {
      d.style.background = BRASS;
      d.style.borderColor = BRASS;
      d.style.boxShadow = `0 0 0 4px ${BRASS}33`;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (fill.current) fill.current.style.transform = "scaleY(1)";
      dots.current.forEach((d) => d && (lit(d), (d.style.transform = "scale(1)")));
      cards.current.forEach((c) => c && ((c.style.opacity = "1"), (c.style.transform = "none")));
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(fill.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: nodes.current, start: "top 80%", end: "bottom 60%", scrub: 0.6 },
      });
      steps.forEach((_, i) => {
        const dot = dots.current[i];
        const card = cards.current[i];
        if (!dot || !card) return;
        const trigger = dot.closest("[data-node]");
        const fromX = i % 2 === 0 ? 32 : -32;
        gsap.set(card, { x: fromX, opacity: 0 });
        gsap.fromTo(
          dot,
          { scale: 0.6 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger, start: "top 75%", toggleActions: "play none none none" },
            onComplete: () => lit(dot),
          },
        );
        gsap.to(card, {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.05,
          scrollTrigger: { trigger, start: "top 75%", toggleActions: "play none none none" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [steps]);

  return (
    <div ref={root} className="relative">
      <div className="st-track absolute bottom-6 top-6 left-1/2 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-white/15">
        <div ref={fill} className="absolute inset-0 origin-top scale-y-0 bg-brass" />
      </div>
      <div ref={nodes} className="relative flex flex-col gap-14 md:gap-20">
        {steps.map((s, i) => (
          <div key={s.n} data-node data-side={i % 2 === 0 ? "right" : "left"} className="st-node">
            <div
              ref={(el) => { dots.current[i] = el; }}
              className="st-dot z-[1] size-3.5 scale-[0.6] rounded-full border-2 border-night bg-white/25"
            />
            <div
              ref={(el) => { cards.current[i] = el; }}
              className="st-card w-full max-w-[22rem] rounded-xl border border-white/10 bg-green p-6 opacity-0 md:p-7"
            >
              <p className="num text-sm font-semibold text-brass">{s.n}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{s.title}</h3>
              <p className="num mt-1 text-white/65">{s.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
