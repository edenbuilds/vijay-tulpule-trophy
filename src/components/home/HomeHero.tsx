import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Countdown } from "@/components/Countdown";
import { EVENT } from "@/lib/site";
import { PH } from "@/lib/photos";

export function HomeHero() {
  return (
    <section className="match-hero" aria-labelledby="tournament-title">
      <div className="match-hero-top"><span>Mumbai & Navi Mumbai</span><span>17–24 October 2026</span></div>
      <div className="match-hero-grid">
        <div className="match-hero-copy">
          <p className="match-edition">38th All India Advocates’ Cricket Tournament</p>
          <h1 id="tournament-title" className="match-headline"><span>MUMBAI.</span><span>IT’S GAME</span><span className="match-outline">TIME.</span></h1>
          <p className="match-intro">Eight days of cricket. Sixteen teams.<br />The Vijay Tulpule Trophy.</p>
          <div className="match-actions"><Link href="/fixtures" className="match-cta">View fixtures <ArrowUpRight aria-hidden="true" /></Link><Link href="/teams" className="match-secondary">Meet the teams <ArrowUpRight aria-hidden="true" /></Link></div>
        </div>
        <div className="match-visual">
          <Image src={PH.format.src} alt={PH.format.alt} fill priority sizes="(min-width: 900px) 52vw, 100vw" className="match-photo" />
          <div className="match-logo"><Logo priority sizes="(min-width: 900px) 200px, 125px" /></div>
          <span className="match-photo-label">From the BACA archives</span>
          <div className="match-count"><Countdown className="display num" /><span>17–24 October 2026</span></div>
        </div>
      </div>
      <div className="match-scoreline"><p><strong>16</strong> teams</p><p><strong>08</strong> days</p><p><strong>{EVENT.overs}</strong> overs per side</p><p className="match-host">Hosted by the<br /><strong>Bombay Advocates’ Cricket Association</strong></p></div>
    </section>
  );
}
