import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Countdown } from "@/components/Countdown";
import { TEAMS } from "@/lib/teams";

// 12-10-2026: the drawn telecast pitch read as "too blue, too cartoony" to the owner. The hero is now light and typographic:
// navy condensed type on snow, the full-colour tournament logo as the one image, red only as an accent. Facts only.
export function HomeHero() {
  const names = TEAMS.map((t) => t.name);
  return (
    <section className="hero ed" aria-labelledby="tournament-title">
      <div className="ed-grid">
        <div>
          <p className="hero-kicker hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>Mumbai · 17–24 October 2026</p>
          <h1 id="tournament-title" className="hero-title">
            <span className="hero-line"><span style={{ "--d": "60ms" } as React.CSSProperties}>38th All India</span></span>
            <span className="hero-line"><span style={{ "--d": "140ms" } as React.CSSProperties}>Advocates’ <em>Cricket</em></span></span>
            <span className="hero-line"><span style={{ "--d": "220ms" } as React.CSSProperties}>Tournament</span></span>
          </h1>
          <div className="hero-actions hero-in" style={{ "--d": "380ms" } as React.CSSProperties}>
            <Link href="/fixtures" className="btn-red press">View fixtures <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
            <Link href="/teams" className="ed-ghost press">The teams <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
          </div>
        </div>
        <div className="ed-logo">
          <Logo variant="bar" priority className="w-full" sizes="(min-width: 900px) 520px, 80vw" alt="" />
        </div>
      </div>
      <div className="ed-facts hero-in" style={{ "--d": "520ms" } as React.CSSProperties}>
        <p>16 teams from 15 High Courts and the Supreme Court of India, playing for The Vijay Tulpule Trophy.</p>
        <Countdown className="ed-count num" />
      </div>
      <div className="hero-roll" aria-hidden="true">
        <div className="hero-roll-track">{[...names, ...names].map((n, i) => <span key={i}>{n}</span>)}</div>
      </div>
    </section>
  );
}
