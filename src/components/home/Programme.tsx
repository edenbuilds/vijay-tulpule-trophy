"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideTextReveal from "@/components/effects/slide-text-reveal";
import type { Photo } from "@/lib/photos";

gsap.registerPlugin(ScrollTrigger);

export type Day = { date: string; day: string; title: string; line: string; href: string; photo?: Photo };

// The schedule. From lg up the section pins and a row of photo cards slides sideways as you scroll (ScrollTrigger
// pin + scrub, the horizontal-scroll pattern from the Awwwards Pack's scroll demos). Below lg, and with reduced
// motion, it is one dashed list: six tall stacked cards on a phone was the clutter. A day with no fitting
// photograph shows none.
export function Programme({ days }: { days: Day[] }) {
  const root = React.useRef<HTMLElement>(null);
  const track = React.useRef<HTMLOListElement>(null);

  React.useLayoutEffect(() => {
    const el = root.current;
    const row = track.current;
    if (!el || !row) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => Math.max(0, row.scrollWidth - el.clientWidth + 32);
      gsap.to(row, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="programme" className="bg-paper lg:h-svh lg:overflow-hidden motion-reduce:lg:h-auto motion-reduce:lg:overflow-visible">
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-14 md:px-8 md:pb-8 md:pt-24 lg:pt-28">
        <SlideTextReveal className="display text-4xl md:text-6xl">
          <h2>Schedule</h2>
        </SlideTextReveal>
      </div>
      <ol ref={track} className="mx-2 mb-12 rounded-2xl bg-mist px-4 md:px-8 lg:mx-0 lg:mb-0 lg:flex lg:w-max lg:gap-3 lg:rounded-none lg:bg-transparent lg:px-4 motion-reduce:lg:w-auto motion-reduce:lg:flex-wrap motion-reduce:lg:pb-16">
        {days.map((d) => (
          <li key={d.date} className="border-b border-dashed border-ink/15 last:border-0 lg:w-[27vw] lg:border-0 xl:w-[23vw]">
            <Link
              href={d.href}
              className={`press group grid min-h-16 grid-cols-[6.5rem_1fr] gap-x-4 py-4 lg:lift lg:flex lg:h-[min(33rem,calc(100svh-16rem))] lg:flex-col lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:py-0 ${d.photo ? "lg:bg-mist" : "lg:bg-pitch lg:text-paper"}`}
            >
              {d.photo && (
                <span className="relative hidden shrink-0 overflow-hidden lg:block lg:h-[52%]">
                  <Image src={d.photo.small} alt={d.photo.alt} fill sizes="(min-width: 1280px) 23vw, 27vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                </span>
              )}
              <span className="contents lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:gap-6 lg:p-6">
                <span>
                  <span className={`num display block text-lg lg:text-5xl ${d.photo ? "" : "lg:text-sage"}`}>{d.date}</span>
                  <span className={`mt-1 hidden text-sm lg:block ${d.photo ? "text-ink/55" : "text-paper/70"}`}>{d.day}</span>
                </span>
                <span>
                  <span className="display block text-xl lg:text-3xl">{d.title}</span>
                  <span className={`mt-1 block text-base lg:mt-2 ${d.photo ? "text-ink/70" : "text-ink/70 lg:text-paper/80"}`}>{d.line}</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
