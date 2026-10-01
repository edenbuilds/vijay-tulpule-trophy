"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideTextReveal from "@/components/effects/slide-text-reveal";
import { MagneticButton } from "@/components/gems/MagneticButton";
import type { Photo } from "@/lib/photos";

gsap.registerPlugin(ScrollTrigger);

// Animmaster Awwwards Pack, Scroll Animation 58 ("abstract cards"): cards start stacked on the centre,
// tilted and oversize, and fly out to their places as the section scrolls in, with the headline waiting
// underneath. Ported from its JSX to TSX; the cards here are team photographs, so the motion says what the
// words say: sixteen teams arriving. Positions are fixed (the original randomised them, which would
// mismatch on hydrate), and the four extra cards only exist from the md breakpoint up.
const SPOTS = [
  "left-[5%] top-[4%] h-[26vw] w-[38vw] md:left-[5%] md:top-[8%] md:h-[12vw] md:w-[17vw]",
  "right-[4%] top-[13%] h-[24vw] w-[34vw] md:left-[1.5%] md:right-auto md:top-[34%] md:h-[10vw] md:w-[13vw]",
  "left-[3%] bottom-[14%] h-[28vw] w-[40vw] md:bottom-auto md:left-[6%] md:top-[63%] md:h-[13vw] md:w-[18vw]",
  "right-[5%] bottom-[6%] h-[26vw] w-[38vw] md:bottom-auto md:left-[27%] md:right-auto md:top-[80%] md:h-[11vw] md:w-[15vw]",
  "hidden md:block md:left-[69%] md:top-[6%] md:h-[11vw] md:w-[16vw]",
  "hidden md:block md:right-[1.5%] md:top-[33%] md:h-[11vw] md:w-[15vw]",
  "hidden md:block md:right-[5%] md:top-[61%] md:h-[13vw] md:w-[19vw]",
  "hidden md:block md:right-[27%] md:top-[80%] md:h-[10vw] md:w-[14vw]",
];
const TILT = [-14, 9, 18, -8, 12, -17, 7, -11];

export function Converge({ photos }: { photos: Photo[] }) {
  const root = React.useRef<HTMLElement>(null);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useLayoutEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", end: "top -10%", scrub: 1.3, invalidateOnRefresh: true },
      });
      cards.current.forEach((inner, i) => {
        const wrap = inner?.parentElement;
        if (!inner || !wrap || !wrap.offsetParent) return; // hidden on this breakpoint
        const offset = () => {
          const w = wrap.getBoundingClientRect();
          const s = section.getBoundingClientRect();
          return { x: s.left + s.width / 2 - (w.left + w.width / 2), y: s.top + s.height / 2 - (w.top + w.height / 2) };
        };
        wrap.style.zIndex = String(5 + ((i * 7) % 40));
        tl.fromTo(
          inner,
          { x: () => offset().x, y: () => offset().y, scale: 1.3, rotate: TILT[i] },
          { x: 0, y: 0, scale: 1, rotate: 0, ease: "back.inOut(2)" },
          0,
        );
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-x-clip bg-paper px-5 py-24 text-center">
      <SlideTextReveal className="display mx-auto max-w-[14ch] text-[3.25rem] leading-[0.95] sm:text-7xl lg:text-[7rem]">
        <h2>The teams</h2>
      </SlideTextReveal>
      <p className="mt-8 max-w-[28rem] text-lg text-ink/70 md:text-xl">
        16 teams of advocates from 15 High Courts and the Supreme Court of India.
      </p>
      <div className="mt-8">
        <MagneticButton href="/teams">Teams</MagneticButton>
      </div>
      {photos.slice(0, SPOTS.length).map((p, i) => (
        <div key={p.id} className={`absolute ${SPOTS[i]}`}>
          <div ref={(el) => { cards.current[i] = el; }} className="relative size-full overflow-hidden rounded-xl bg-sage will-change-transform">
            <Image src={p.small} alt={p.alt} fill sizes="(min-width: 768px) 19vw, 40vw" className="pointer-events-none select-none object-cover" draggable={false} />
          </div>
        </div>
      ))}
    </section>
  );
}
