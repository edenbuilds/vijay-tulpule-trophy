import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Countdown } from "@/components/Countdown";
import { TEAMS } from "@/lib/teams";

// Telecast opening (08-10-2026: owner asked for no BACA photo here, and for a cricket-broadcast feel). The scene is drawn, not
// photographed: a floodlit pitch seen from the bowler's end, a delivery coming down it, the broadcast corner logo and a
// scorebug lower third that carries only sourced facts. All motion is CSS and stops under reduced motion.
function Pitch() {
  return (
    <svg className="tv-pitch" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id="tv-glow" cx="50%" cy="0%" r="75%"><stop offset="0" stopColor="#1E6BD6" stopOpacity=".55" /><stop offset="1" stopColor="#071B45" stopOpacity="0" /></radialGradient>
        <linearGradient id="tv-strip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9dcc0" stopOpacity=".35" /><stop offset="1" stopColor="#e9dcc0" stopOpacity=".9" /></linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#tv-glow)" />
      {/* outfield rings */}
      {[0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} cx="800" cy="980" rx={560 + i * 210} ry={330 + i * 95} fill="none" stroke="#ffffff" strokeOpacity={0.05 + (5 - i) * 0.012} strokeWidth="2" />)}
      {/* pitch strip in perspective, creases and stumps at both ends */}
      <polygon points="742,330 858,330 1010,900 590,900" fill="url(#tv-strip)" />
      <line x1="730" y1="372" x2="870" y2="372" stroke="#fff" strokeWidth="3" />
      <line x1="610" y1="820" x2="990" y2="820" stroke="#fff" strokeWidth="5" />
      <g fill="#fff">{[786, 798, 810].map((x) => <rect key={x} x={x} y="336" width="4" height="36" />)}</g>
      <g fill="#fff">{[770, 798, 826].map((x) => <rect key={x} x={x} y="742" width="7" height="80" />)}</g>
    </svg>
  );
}

export function HomeHero() {
  const names = TEAMS.map((t) => t.name);
  return (
    <section className="hero tv" aria-labelledby="tournament-title">
      <div className="tv-scene" aria-hidden="true">
        <Pitch />
        <span className="tv-light tv-light-l" /><span className="tv-light tv-light-r" />
        <span className="tv-ball" />
        <span className="tv-scan" />
      </div>
      <div className="tv-corner hero-in" style={{ "--d": "200ms" } as React.CSSProperties}>
        <Logo variant="reversed" priority className="w-full" sizes="(min-width: 900px) 220px, 120px" alt="" />
      </div>
      <div className="hero-inner">
        <p className="hero-kicker hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>Mumbai 2026 · 17–24 October</p>
        <h1 id="tournament-title" className="hero-title">
          <span className="hero-line"><span style={{ "--d": "60ms" } as React.CSSProperties}>38th All India</span></span>
          <span className="hero-line"><span style={{ "--d": "140ms" } as React.CSSProperties}>Advocates’</span></span>
          <span className="hero-line"><span style={{ "--d": "220ms" } as React.CSSProperties}>Cricket Tournament</span></span>
        </h1>
        <div className="hero-actions hero-in" style={{ "--d": "380ms" } as React.CSSProperties}>
          <Link href="/fixtures" className="btn-red press">View fixtures <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
          <Link href="/teams" className="btn-ghost press">The teams <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
        </div>
      </div>
      {/* Scorebug lower third: the broadcast strip. Facts only. */}
      <div className="tv-bug hero-in" style={{ "--d": "520ms" } as React.CSSProperties}>
        <span className="tv-bug-tag">BACA 2026</span>
        <p className="tv-bug-main">16 teams · 15 High Courts and the Supreme Court of India · Winners receive The Vijay Tulpule Trophy</p>
        <Countdown className="tv-bug-count num" />
      </div>
      <div className="hero-roll" aria-hidden="true">
        <div className="hero-roll-track">{[...names, ...names].map((n, i) => <span key={i}>{n}</span>)}</div>
      </div>
    </section>
  );
}
