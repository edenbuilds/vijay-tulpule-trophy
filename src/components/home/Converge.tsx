"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Stroke } from "@/components/brand/Stroke";
import SlideTextReveal from "@/components/effects/slide-text-reveal";
import { MagneticButton } from "@/components/gems/MagneticButton";
import type { Team } from "@/lib/teams";

gsap.registerPlugin(ScrollTrigger);

// The sixteen team logos in white wells on a navy tile. From md up they start as a loose pile at the middle of the grid,
// each tilted and a little oversize, and spread out into a 4 x 4 grid as the section scrolls in (the scroll idea of Animmaster
// Awwwards Pack, Scroll Animation 58, now carrying logos). The pile stays inside the grid's own box, so a well never passes
// over the heading. GSAP drives only the transform of each cell; nothing else animates it. Phones and reduced motion get the
// finished grid: three columns, with the sixteenth logo centred on the last row (a 6-column grid, two columns per logo).
const TILT = [-14, 9, 18, -8, 12, -17, 7, -11, 15, -6, 10, -13, 8, -16, 11, -9];

export function Converge({ teams }: { teams: Team[] }) {
  const grid = React.useRef<HTMLUListElement>(null);
  const cells = React.useRef<(HTMLLIElement | null)[]>([]);

  React.useLayoutEffect(() => {
    const box = grid.current;
    if (!box) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: box, start: "top 88%", end: "top 18%", scrub: 1, invalidateOnRefresh: true },
      });
      cells.current.forEach((cell, i) => {
        if (!cell) return;
        const offset = () => {
          const b = box.getBoundingClientRect();
          const c = cell.getBoundingClientRect();
          return { x: b.left + b.width / 2 - (c.left + c.width / 2), y: b.top + b.height / 2 - (c.top + c.height / 2) };
        };
        tl.fromTo(
          cell,
          { x: () => offset().x, y: () => offset().y, scale: 1.2, rotate: TILT[i % TILT.length] },
          { x: 0, y: 0, scale: 1, rotate: 0, ease: "power3.inOut", duration: 0.7 },
          i * 0.025,
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="relative isolate mx-2 mt-2 overflow-hidden rounded-2xl bg-navy py-16 text-white md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -left-24 -z-10 hidden w-[34rem] lg:block">
        <Stroke className="w-full" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div className="lg:pt-6">
          <SlideTextReveal className="display uppercase text-5xl md:text-7xl lg:text-8xl">
            <h2>The teams</h2>
          </SlideTextReveal>
          <p className="mt-6 max-w-md text-lg text-white/80 md:text-xl">
            16 teams of advocates from 15 High Courts and the Supreme Court of India. Groups will be announced after the draw.
          </p>
          <div className="mt-6">
            <MagneticButton href="/teams" tone="onDark">Teams</MagneticButton>
          </div>
        </div>

        <ul ref={grid} className="grid grid-cols-6 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-x-6 md:gap-y-9">
          {teams.map((t, i) => (
            <li
              key={t.slug}
              ref={(el) => { cells.current[i] = el; }}
              className="col-span-2 flex flex-col items-center gap-3 will-change-transform last:col-start-3 md:col-span-1 md:last:col-start-auto"
            >
              <span className="relative block aspect-square w-full max-w-[9.5rem] overflow-hidden rounded-full bg-white">
                <Image src={t.logo} alt={`${t.name} team logo`} fill sizes="(min-width: 1024px) 9rem, (min-width: 768px) 20vw, 30vw" className="object-contain p-[14%]" draggable={false} />
              </span>
              <span aria-hidden="true" className="text-center text-base font-medium text-white/80">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
