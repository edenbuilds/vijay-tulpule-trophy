import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TEAMS } from "@/lib/teams";
import { HeroTicker } from "./HeroTicker";

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
        <p className="hero-kicker hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>Bombay Advocates’ Cricket Association</p>
        <h1 id="tournament-title" className="ph-title">
          <span className="hero-line"><span style={{ "--d": "80ms" } as React.CSSProperties}>Advocates.</span></span>
          <span className="hero-line hero-accent"><span style={{ "--d": "180ms" } as React.CSSProperties}>At the crease.</span></span>
        </h1>
        <h2 className="ph-sub hero-in" style={{ "--d": "300ms" } as React.CSSProperties}>Cricket for the Bombay Bar since 1993.</h2>
        <div className="ph-foot hero-in" style={{ "--d": "360ms" } as React.CSSProperties}>
          <div className="hero-actions">
            <Link href="/about" className="btn-red press">About BACA <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
            <Link href="#tribute" className="btn-ghost press">Mumbai 2026 <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
          </div>
          <div className="ph-when"><strong>Hosts of the 38th edition</strong><span>Mumbai, 17–24 October 2026</span></div>
        </div>
      </div>
      <HeroTicker fallback={names} />
    </section>
  );
}
