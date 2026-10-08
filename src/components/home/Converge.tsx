import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Team } from "@/lib/teams";

// Two rows of team logos drifting in opposite directions (CSS marquee, pauses on hover/focus). The first copy of each row is the
// accessible one; the duplicate that closes the loop is aria-hidden and untabbable. Reduced motion: one static wrapped grid.
// Replaces the Stack Spread effect, which rendered as a single stacked card and an empty 400px gap on the live site (08-10-2026).
function Row({ teams, reverse }: { teams: Team[]; reverse?: boolean }) {
  const tile = (t: Team, hidden: boolean) => (
    <li key={`${t.slug}-${hidden}`} aria-hidden={hidden || undefined}>
      <Link href={`/teams#${t.slug}`} tabIndex={hidden ? -1 : undefined} className="wall-team press">
        <span className="wall-logo"><Image src={t.logo} alt={hidden ? "" : `${t.name} team logo`} fill sizes="96px" className="object-contain p-1.5" /></span>
        <span>{t.name}</span>
      </Link>
    </li>
  );
  return <ul className={`wall-row${reverse ? " wall-rev" : ""}`}>{teams.map((t) => tile(t, false))}{teams.map((t) => tile(t, true))}</ul>;
}

export function Converge({ teams }: { teams: Team[] }) {
  const half = Math.ceil(teams.length / 2);
  return (
    <section aria-labelledby="teams-home-title" className="wall">
      <div className="wall-head">
        <h2 id="teams-home-title" className="display-xl">The teams</h2>
        <p>15 High Courts and the Supreme Court of India. Groups will be announced after the draw.</p>
        <Link href="/teams" className="link-arrow">All 16 teams <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
      </div>
      <div className="wall-rows"><Row teams={teams.slice(0, half)} /><Row teams={teams.slice(half)} reverse /></div>
    </section>
  );
}
