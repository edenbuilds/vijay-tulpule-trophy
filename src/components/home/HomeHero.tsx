import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Ball } from "@/components/brand/Ball";
import { Countdown } from "@/components/Countdown";
import { PH } from "@/lib/photos";
import { TEAMS } from "@/lib/teams";

// Full-bleed archive photo, the tournament name as the headline, then the team names rolling past.
// Motion is CSS only (entrance, slow zoom, scroll parallax, marquee) so it runs off the main thread; all of it stops under reduced motion.
export function HomeHero() {
  const names = TEAMS.map((t) => t.name);
  return (
    <section className="hero" aria-labelledby="tournament-title">
      <div className="hero-media" aria-hidden="true">
        <Image src={PH.format.src} alt="" fill priority sizes="100vw" className="hero-photo" />
      </div>
      <div className="hero-inner">
        <p className="hero-kicker hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>Mumbai 2026 · 17–24 October</p>
        <h1 id="tournament-title" className="hero-title">
          <span className="hero-line"><span style={{ "--d": "60ms" } as React.CSSProperties}>38th All India</span></span>
          <span className="hero-line"><span style={{ "--d": "140ms" } as React.CSSProperties}>Advocates’</span></span>
          <span className="hero-line"><span style={{ "--d": "220ms" } as React.CSSProperties}>Cricket <span className="hero-ball-slot">Tournament<Ball className="hero-ball" /></span></span></span>
        </h1>
        <div className="hero-foot hero-in" style={{ "--d": "380ms" } as React.CSSProperties}>
          <p className="hero-lede">Sixteen teams of advocates from 15 High Courts and the Supreme Court of India play for The Vijay Tulpule Trophy in Mumbai and Navi Mumbai.</p>
          <div className="hero-actions">
            <Link href="/fixtures" className="btn-red press">View fixtures <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
            <Link href="/teams" className="btn-ghost press">The teams <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
          </div>
          <div className="hero-count"><Countdown className="hero-count-num num" /><span>Hosted by the Bombay Advocates’ Cricket Association</span></div>
        </div>
      </div>
      <p className="hero-credit">Photograph: BACA archive</p>
      <div className="hero-roll" aria-hidden="true">
        <div className="hero-roll-track">{[...names, ...names].map((n, i) => <span key={i}>{n}</span>)}</div>
      </div>
    </section>
  );
}
