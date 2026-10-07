import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Block, Hero } from "@/components/Sections";
import { TeamRoster } from "@/components/TeamRoster";
import { TEAMS } from "@/lib/teams";

export const metadata: Metadata = { title: "Teams" };

export default function Teams() {
  return (
    <>
      <Hero title="Sixteen Teams. One Legal Fraternity." sub="Advocates representing 15 High Courts and the Supreme Court of India will compete in Mumbai in October 2026. The official group allocations will be announced after the tournament draw." />
      <Block title="Participating Teams" tone="white">
        <TeamRoster teams={TEAMS} />
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
