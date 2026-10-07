"use client";

import Image from "next/image";
import * as React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Team } from "@/lib/teams";

export function TeamRoster({ teams }: { teams: Team[] }) {
  const grid = React.useRef<HTMLUListElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const marks = gsap.utils.toArray<HTMLElement>("[data-roster-mark]", grid.current);
    gsap.set(marks, { autoAlpha: 0, y: 14, clipPath: "inset(100% 0 0 0)" });
    ScrollTrigger.batch(marks, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 0.62,
        stagger: 0.045,
        ease: "power3.out",
        clearProps: "clipPath",
      }),
    });
  }, { scope: grid });

  return (
    <ul ref={grid} className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-7 md:grid-cols-4 md:gap-x-8 md:gap-y-10">
      {teams.map((team) => (
        <li id={team.slug} key={team.slug} className="flex min-w-0 flex-col items-center border-t border-navy/15 pt-4 text-center">
          <div data-roster-mark className="relative size-20 overflow-hidden bg-paper-light sm:size-24 md:size-28">
            <Image src={team.logo} alt={`${team.name} team logo`} fill sizes="(min-width: 768px) 112px, 80px" className="object-contain p-3" />
          </div>
          <h2 className="mt-3 text-base font-semibold leading-snug sm:text-lg">{team.name}</h2>
          <p className="mt-1 text-sm leading-relaxed text-navy/65">{team.court}</p>
        </li>
      ))}
    </ul>
  );
}
