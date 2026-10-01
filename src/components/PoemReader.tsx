"use client";

import * as React from "react";
import MaskTextReveal from "@/components/effects/mask-text-reveal";
import { NUM, POEM } from "@/lib/poem";

// The poem as a slow read: one centred column, one verse at a time. The verse crossing the middle of the
// screen is lit and the others rest at a third of their strength, a thin line on the left fills as you
// go, and each verse's lines wipe in as it arrives. Every second line steps in a little, so the pair
// reads as call and answer the way the rhymes do. Without JS (or before mount) every verse is fully lit.
export function PoemReader() {
  const root = React.useRef<HTMLDivElement>(null);
  const fill = React.useRef<HTMLSpanElement>(null);
  const [active, setActive] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    setActive(0);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.verse))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    el.querySelectorAll("[data-verse]").forEach((v) => io.observe(v));

    let raf = 0;
    const draw = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.5 - r.top) / r.height));
      fill.current?.style.setProperty("transform", `scaleY(${p})`);
    };
    const onScroll = () => { raf ||= requestAnimationFrame(draw); };
    draw();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="relative mx-auto max-w-2xl px-8 py-8 md:py-16">
      <span aria-hidden="true" className="absolute inset-y-0 left-3 w-px bg-ink/10 md:left-0">
        <span ref={fill} className="block h-full origin-top scale-y-0 bg-pitch" />
      </span>
      {POEM.stanzas.map((lines, i) => (
        <article
          key={i}
          data-verse={i}
          lang="hi"
          aria-label={`Verse ${i + 1}`}
          className={`relative py-10 transition-opacity duration-700 motion-reduce:transition-none md:py-14 ${active === null || active === i ? "opacity-100" : "opacity-30"}`}
        >
          <span aria-hidden="true" className="deva pointer-events-none absolute -top-1 left-0 select-none text-[7rem] font-semibold leading-none text-mint md:-left-6 md:text-[10rem]">
            {NUM[i]}
          </span>
          <MaskTextReveal duration={1.2} stagger={0.14} className="relative">
            {lines.map((line, j) => (
              <p key={line} className={`deva text-balance text-[1.3rem] leading-[2] sm:text-2xl md:text-[1.75rem] md:leading-[2.05] ${j % 2 ? "sm:pl-10" : ""}`}>
                {line}
              </p>
            ))}
          </MaskTextReveal>
        </article>
      ))}
    </div>
  );
}
