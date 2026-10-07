import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Block, Hero } from "@/components/Sections";
import { TEAMS } from "@/lib/teams";

export const metadata: Metadata = { title: "Teams" };

export default function Teams() {
  return (
    <>
      <Hero title="Sixteen Teams. One Legal Fraternity." sub="Advocates representing 15 High Courts and the Supreme Court of India will compete in Mumbai in October 2026. The official group allocations will be announced after the tournament draw." />
      <Block title="Participating Teams" tone="white">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-7 md:grid-cols-4 md:gap-x-8 md:gap-y-10">
          {TEAMS.map((team) => (
            <li key={team.slug} className="flex min-w-0 flex-col items-center text-center">
              <div className="relative size-20 overflow-hidden rounded-none bg-paper-light sm:size-24 md:size-28">
                <Image src={team.logo} alt={`${team.name} team logo`} fill sizes="(min-width: 768px) 112px, 80px" className="object-contain p-3" />
              </div>
              <h2 className="mt-3 text-base font-semibold leading-snug sm:text-lg">{team.name}</h2>
              <p className="mt-1 text-sm leading-relaxed text-navy/65">{team.court}</p>
            </li>
          ))}
        </ul>
      </Block>
      <Block title="The Draw Comes Next" tone="sky">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <p className="max-w-2xl text-lg text-navy/75">Groups and matchups will be published after the official tournament draw.</p>
          <Link href="/fixtures" className="inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">View Fixtures <ArrowRight aria-hidden="true" className="size-4" /></Link>
        </div>
      </Block>
    </>
  );
}
