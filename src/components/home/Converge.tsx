"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import type { Team } from "@/lib/teams";

export function Converge({ teams }: { teams: Team[] }) {
  const grid = React.useRef<HTMLUListElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const marks = gsap.utils.toArray<HTMLElement>("[data-team-mark]", grid.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(marks, { autoAlpha: 0, y: 20, clipPath: "inset(100% 0 0 0)" });
    ScrollTrigger.batch(marks, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 0.72,
        stagger: 0.055,
        ease: "power3.out",
        clearProps: "clipPath",
      }),
    });
  }, { scope: grid });

  return (
    <section aria-labelledby="teams-home-title" className="border-y border-navy/10 bg-paper-light px-4 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl">
            <h2 id="teams-home-title" className="display text-3xl leading-tight sm:text-4xl md:text-5xl">Advocates From Across India. Together On One Field.</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/75">
              Sixteen teams representing advocates from 15 High Courts and the Supreme Court of India will compete in the 2026 tournament. The official groups and matchups will be announced after the draw.
            </p>
          </div>
          <Link href="/teams" className="inline-flex min-h-11 items-center gap-1 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">
            View All 16 Teams <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ul ref={grid} className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 sm:gap-x-8 md:gap-y-10">
          {teams.map((team) => (
            <li key={team.slug} className="flex min-w-0 flex-col items-start border-t border-navy/20 pt-3">
              <div data-team-mark className="relative aspect-[4/3] w-full overflow-hidden bg-white/70">
                <Image src={team.logo} alt={`${team.name} team logo`} fill sizes="(min-width: 768px) 22vw, 45vw" className="object-contain p-3 sm:p-5" />
              </div>
              <p className="mt-3 text-base font-semibold leading-snug sm:text-lg">{team.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
