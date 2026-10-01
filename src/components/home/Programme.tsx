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

// Eight days as a row of cards. From lg up the section pins and the row slides sideways as you scroll
// (ScrollTrigger pin + scrub, the horizontal-scroll pattern from the Awwwards Pack's scroll demos); below lg,
// and with reduced motion, it is an ordinary grid. A day with no fitting photograph shows none.
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
    <section ref={root} id="programme" className="bg-paper lg:h-svh lg:overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 md:px-8 md:pt-24 lg:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink/60">Programme</p>
        <SlideTextReveal className="display mt-3 text-4xl md:text-6xl">
          <h2>Eight days in October</h2>
        </SlideTextReveal>
      </div>
      <ol ref={track} className="grid gap-2 px-2 pb-16 md:grid-cols-2 lg:flex lg:w-max lg:gap-3 lg:px-4 lg:pb-0">
        {days.map((d) => (
          <li key={d.date} className="lg:w-[27vw] xl:w-[23vw]">
            <Link
              href={d.href}
              className={`lift press group flex h-full flex-col overflow-hidden rounded-2xl lg:h-[min(33rem,calc(100svh-16rem))] ${d.photo ? "bg-mist" : "bg-pitch text-paper"}`}
            >
              {d.photo && (
                <span className="relative block aspect-[4/3] shrink-0 overflow-hidden lg:aspect-auto lg:h-[52%]">
                  <Image src={d.photo.small} alt={d.photo.alt} fill sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 27vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                </span>
              )}
              <span className="flex flex-1 flex-col justify-between gap-6 p-5 md:p-6">
                <span>
                  <span className={`num display block text-4xl md:text-5xl ${d.photo ? "" : "text-sage"}`}>{d.date}</span>
                  <span className={`mt-1 block text-sm ${d.photo ? "text-ink/55" : "text-paper/70"}`}>{d.day}</span>
                </span>
                <span>
                  <span className="display block text-2xl md:text-3xl">{d.title}</span>
                  <span className={`mt-2 block text-base ${d.photo ? "text-ink/70" : "text-paper/80"}`}>{d.line}</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
