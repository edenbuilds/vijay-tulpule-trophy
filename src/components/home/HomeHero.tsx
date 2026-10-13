import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { TEAMS } from "@/lib/teams";

// 13-10-2026: owner supplied an illustrated match scene (public/venues/hero-match.webp) to replace the night stadium photo.
// Previously: night stadium photo (Pexels 36230651, by Shlok, Pexels licence, no credit required). It is
// Narendra Modi Stadium, Ahmedabad, not a tournament venue, so the page never captions it as one.
export function HomeHero() {
  const names = TEAMS.map((t) => t.name);
  return (
    <section className="hero ph" aria-labelledby="tournament-title">
      <div className="ph-media" aria-hidden="true">
        <Image src="/venues/hero-match.webp" alt="" fill priority sizes="100vw" className="ph-photo" />
      </div>
      <div className="ph-inner">
        <p className="hero-kicker hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>38th All India Advocates’ Cricket Tournament</p>
        <h1 id="tournament-title" className="ph-title">
          <span className="hero-line"><span style={{ "--d": "80ms" } as React.CSSProperties}>Sixteen courts.</span></span>
          <span className="hero-line hero-accent"><span style={{ "--d": "180ms" } as React.CSSProperties}>One trophy.</span></span>
        </h1>
        <div className="ph-foot hero-in" style={{ "--d": "360ms" } as React.CSSProperties}>
          <div className="hero-actions">
            <Link href="/fixtures" className="btn-red press">View fixtures <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
            <Link href="/teams" className="btn-ghost press">The teams <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
          </div>
          <div className="ph-when"><strong>17–24 October 2026</strong><span>Mumbai · <Countdown className="ph-count" /></span></div>
        </div>
      </div>
      <div className="hero-roll" aria-hidden="true">
        <div className="hero-roll-track">{[...names, ...names].map((n, i) => <span key={i}>{n}</span>)}</div>
      </div>
    </section>
  );
}
