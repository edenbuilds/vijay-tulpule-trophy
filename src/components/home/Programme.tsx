"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideTextReveal from "@/components/effects/slide-text-reveal";
import { GROUNDS, SCHEDULE, groundLabel, type MatchDay } from "@/lib/schedule";
import { tie } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

// The schedule, built from SCHEDULE (src/lib/schedule.ts): one tile per day with the date and that day's grounds, nothing else.
// The organisers' sheet gives no match times and no stage names, and the groups are not drawn, so none are printed here.
// From lg up the section pins and the eight tiles slide sideways as you scroll (ScrollTrigger pin + scrub, GSAP on the
// row only). Below lg, and with reduced motion, it is one dashed list in one white tile.
// Tone per day: navy for the opening and the finals, sky for the reserve day, white and sky between, so the row never
// reads as one colour. `muted` is the secondary-text colour that keeps 4.5:1 on that tile.
const NAVY = { box: "lg:bg-navy lg:text-white", muted: "text-navy/70 lg:text-white/75" };
const WHITE = { box: "lg:bg-white", muted: "text-navy/70" };
const SKY = { box: "lg:bg-sky", muted: "text-navy/70" };
const TONES: Record<string, { box: string; muted: string }> = {
  "2026-10-17": NAVY,
  "2026-10-18": WHITE,
  "2026-10-19": SKY,
  "2026-10-20": WHITE,
  "2026-10-21": { box: "lg:bg-sky-deep", muted: "text-navy/75" },
  "2026-10-22": WHITE,
  "2026-10-23": SKY,
  "2026-10-24": NAVY,
};

// Only the opening has a page of its own to open; every other day goes to the fixtures.
const hrefFor = (d: MatchDay) => (d.date === "2026-10-17" ? "/ceremonies#opening" : "/fixtures");
// Days with no ground listed: the opening (venue and time not given) and the reserve day.
const noGrounds = (d: MatchDay) => (d.date === "2026-10-17" ? "Venue and time to be announced." : "No matches. Held back in case the weather takes a day.");

function Grounds({ d, muted }: { d: MatchDay; muted: string }) {
  if (d.grounds.length === 0) return <p className={`text-base ${muted}`}>{noGrounds(d)}</p>;
  return (
    <ul>
      {d.grounds.map((id) => {
        const g = GROUNDS[id];
        return (
          <li key={id} className="flex items-baseline justify-between gap-3 border-t border-dashed border-current/15 py-1.5 text-base">
            <span className="font-medium">{g.name}</span>
            <span className={`text-sm ${muted}`}>{g.area}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function Programme() {
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
    <section ref={root} id="programme" className="bg-snow lg:h-svh lg:overflow-hidden motion-reduce:lg:h-auto motion-reduce:lg:overflow-visible">
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-14 md:px-8 md:pb-8 md:pt-24 lg:pt-28">
        <SlideTextReveal className="display uppercase text-4xl md:text-6xl">
          <h2>Schedule</h2>
        </SlideTextReveal>
        <p className="mt-3 max-w-xl text-lg text-navy/70">Match times and groups are to be announced.</p>
      </div>
      <ol ref={track} className="mx-2 mb-12 rounded-2xl bg-white px-4 md:px-8 lg:mx-0 lg:mb-0 lg:flex lg:w-max lg:gap-3 lg:rounded-none lg:bg-transparent lg:px-4 motion-reduce:lg:w-auto motion-reduce:lg:flex-wrap motion-reduce:lg:pb-16">
        {SCHEDULE.map((d) => {
          const tone = TONES[d.date];
          const finals = d.finals && d.finals.length > 0;
          return (
            <li key={d.date} className="border-b border-dashed border-navy/15 last:border-0 lg:w-[27vw] lg:border-0 xl:w-[23vw]">
              <Link
                href={hrefFor(d)}
                className={`press group grid min-h-16 grid-cols-[4.75rem_1fr] gap-x-4 py-4 lg:lift lg:flex lg:h-[min(34rem,calc(100svh-17rem))] lg:flex-col lg:justify-between lg:gap-6 lg:rounded-2xl lg:p-7 ${tone.box}`}
              >
                {/* Phone: date left, title and grounds right. lg: date on top, title and grounds at the foot of the tile. */}
                <span>
                  <span className="num display block text-xl lg:text-5xl">{d.short}</span>
                  <span className={`mt-1 hidden text-base lg:block ${tone.muted}`}>{d.weekday}</span>
                </span>
                <span className="block">
                  {finals && <span aria-hidden="true" className="mb-3 block h-1 w-10 rounded-full bg-red" />}
                  <span className="display block text-xl lg:mb-4 lg:text-3xl">{d.title}</span>
                  <span className="mt-1 block lg:hidden">
                    <span className={`block text-base ${tone.muted}`}>
                      {d.grounds.length === 0 ? noGrounds(d) : tie(d.grounds.map((id) => groundLabel(GROUNDS[id])).join(", "))}
                    </span>
                  </span>
                  <span className="hidden lg:block">
                    <Grounds d={d} muted={tone.muted} />
                  </span>
                  {finals && <span className={`mt-3 hidden text-sm lg:block ${tone.muted}`}>Both grounds are marked Final. Which final is played where is to be announced.</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
