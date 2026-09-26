"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// BYQ gem sticky-media-swap-01: numbered stages pass on the left while a sticky frame wipes between
// their photos. Motion values verbatim; lime accent mapped to pitch green, dark skin to the light canvas.
const FULL_CLIP = "inset(0% 0% 0% 0%)";

export type Stage = { num: string; title: string; line: string; photo: { src: string; alt: string } };

export function StickyMediaSwap({ entries, label }: { entries: Stage[]; label: string }) {
  const root = React.useRef<HTMLElement>(null);
  const steps = React.useRef<(HTMLDivElement | null)[]>([]);
  const medias = React.useRef<(HTMLImageElement | null)[]>([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const imgs = medias.current.filter(Boolean) as HTMLImageElement[];
    const rows = steps.current.filter(Boolean) as HTMLDivElement[];
    if (imgs.length !== entries.length || rows.length !== entries.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let swaps = 0;

    imgs.forEach((img, i) => gsap.set(img, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0, clipPath: FULL_CLIP }));

    const swapTo = (index: number) => {
      if (index === current) return;
      const incoming = imgs[index];
      const outgoing = imgs[current];
      current = index;
      setActive(index);
      gsap.killTweensOf(imgs);

      if (reduce.matches) {
        imgs.forEach((img, i) => gsap.set(img, { autoAlpha: i === index ? 1 : 0, zIndex: i === index ? 1 : 0, clipPath: FULL_CLIP, yPercent: 0, scale: 1 }));
        return;
      }

      swaps += 1;
      const fromTop = swaps % 2 === 1;
      imgs.forEach((img) => {
        if (img !== incoming && img !== outgoing) gsap.set(img, { autoAlpha: 0, zIndex: 0, yPercent: 0, scale: 1 });
      });
      gsap.set(outgoing, { zIndex: 1, autoAlpha: 1, clipPath: FULL_CLIP });
      gsap.set(incoming, { zIndex: 2, autoAlpha: 1, yPercent: 0, scale: 1.12, clipPath: fromTop ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)" });
      gsap
        .timeline({ defaults: { duration: 0.85, ease: "power3.inOut" } })
        .to(incoming, { clipPath: FULL_CLIP }, 0)
        .to(incoming, { scale: 1, duration: 1.25, ease: "power2.out" }, 0)
        .to(outgoing, { yPercent: fromTop ? 7 : -7, scale: 1.05 }, 0)
        .set(outgoing, { autoAlpha: 0, zIndex: 0, yPercent: 0, scale: 1 });
    };

    const ctx = gsap.context(() => {
      rows.forEach((step, i) =>
        ScrollTrigger.create({ trigger: step, start: "top center", end: "bottom center", onToggle: (self) => self.isActive && swapTo(i) }),
      );
    }, root);
    return () => ctx.revert();
  }, [entries]);

  const go = (i: number) =>
    steps.current[i]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });

  return (
    <section ref={root} aria-label={label} className="relative mx-auto grid w-full max-w-7xl gap-x-[clamp(2rem,5vw,5rem)] px-4 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:px-8">
      <div>
        {entries.map((e, i) => (
          <div
            key={e.num}
            ref={(el) => { steps.current[i] = el; }}
            className="relative z-[1] grid min-h-[92vh] items-end pb-[9vh] md:min-h-screen md:items-center md:pb-0"
          >
            <button
              type="button"
              onClick={() => go(i)}
              className={`grid grid-cols-[auto_1fr] items-start gap-x-[clamp(1rem,2.4vw,1.75rem)] rounded-xl py-2 text-left transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-pitch max-md:bg-paper/90 max-md:p-4 max-md:backdrop-blur ${active === i ? "text-ink" : "text-ink/30 hover:text-ink/55"}`}
            >
              <span
                aria-hidden="true"
                className={`sms-num num inline-block pt-[0.55em] text-sm font-semibold [backface-visibility:hidden] ${active === i ? "text-pitch" : ""}`}
                style={{ animation: active === i ? "sms-num-flip 0.55s cubic-bezier(0.16, 1, 0.3, 1)" : "none" }}
              >
                {e.num}
              </span>
              <span className="block">
                <span className="display block text-[clamp(2.1rem,1.1rem+3.6vw,4.1rem)] leading-[1.02]">{e.title}</span>
                <span className="num mt-3.5 block max-w-[34ch] text-[0.95rem] leading-[1.55] opacity-75">{e.line}</span>
              </span>
            </button>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="max-md:absolute max-md:inset-0 max-md:px-4 md:relative">
        <div className="sticky top-20 h-[46vh] overflow-hidden rounded-2xl bg-mint [isolation:isolate] [transform:translateZ(0)] md:top-24 md:h-[calc(100vh-7.5rem)]">
          {entries.map((e, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- hotlinked Commons placeholder
            <img
              key={e.num}
              ref={(el) => { medias.current[i] = el; }}
              src={e.photo.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover will-change-[transform,clip-path,opacity]"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
