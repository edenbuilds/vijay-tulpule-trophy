"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import type { Team } from "@/lib/teams";

export function Converge({ teams }: { teams: Team[] }) {
  const grid = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const element = grid.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      element.dataset.motionIn = "true";
      return;
    }
    element.dataset.motionReady = "true";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.motionIn = "true";
      observer.disconnect();
    }, { threshold: 0.16 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="teams-home-title" className="bg-sky px-4 py-14 sm:px-8 md:py-20 lg:px-12">
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
        <ul ref={grid} className="team-grid mt-9 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6 md:gap-y-9 lg:grid-cols-4">
          {teams.map((team, index) => (
            <li key={team.slug} style={{ "--team-index": index } as React.CSSProperties} className="flex min-w-0 flex-col items-center text-center">
              <div className="relative size-20 overflow-hidden rounded-full bg-white sm:size-24 md:size-28">
                <Image src={team.logo} alt={`${team.name} team logo`} fill sizes="(min-width: 768px) 112px, 80px" className="object-contain p-3" />
              </div>
              <p className="mt-3 text-base font-semibold leading-snug sm:text-lg">{team.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
