"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { TEAMS } from "@/lib/teams";

// 12-10-2026: owner said the logo-led hero "just repeats the logo 1:1". The hero now carries what the logo cannot: the 16
// teams. Adapted from BYQ Supply "Fullscreen Horizontal Name Slider Hero" (stringer-hero-10): oversized names slide so the
// active one sits centred, the team's logo card swaps under it. Auto-advances; stops on hover, focus and reduced motion.
const pad = (n: number) => String(n).padStart(2, "0");

export function HomeHero() {
  const [cur, setCur] = useState(0);
  const [x, setX] = useState(0);
  const [paused, setPaused] = useState(false);
  const line = useRef<HTMLDivElement>(null);
  const names = useRef<(HTMLButtonElement | null)[]>([]);
  const go = useCallback((i: number) => setCur(((i % TEAMS.length) + TEAMS.length) % TEAMS.length), []);

  useLayoutEffect(() => {
    const centre = () => {
      const el = names.current[cur];
      if (el && line.current) setX(line.current.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2));
    };
    centre();
    window.addEventListener("resize", centre);
    document.fonts?.ready.then(centre);
    return () => window.removeEventListener("resize", centre);
  }, [cur]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(cur + 1), 3200);
    return () => clearTimeout(t);
  }, [cur, paused, go]);

  const team = TEAMS[cur];
  return (
    <section className="hero sl" aria-labelledby="tournament-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="sl-top">
        <p>Mumbai · 17–24 October 2026</p>
        <p className="num" aria-hidden="true">{pad(cur + 1)} / {pad(TEAMS.length)}</p>
        <Countdown className="sl-count num" />
      </div>
      <h1 id="tournament-title" className="sl-title hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>Sixteen courts. <em>One trophy.</em></h1>
      <div ref={line} className="sl-line">
        <div className="sl-track" style={{ transform: `translateX(${x}px)` }}>
          {TEAMS.map((t, i) => (
            <button key={t.slug} ref={(el) => { names.current[i] = el; }} type="button" aria-current={i === cur} tabIndex={i === cur ? 0 : -1} onClick={() => go(i)} className="sl-name" style={{ "--len": t.name.length } as React.CSSProperties}>{t.name}</button>
          ))}
        </div>
      </div>
      <div className="sl-deck">
        <p className="sl-cap" aria-live="polite">{team.court}</p>
        <div className="sl-ctrl">
          <button type="button" aria-label="Previous team" onClick={() => go(cur - 1)} className="sl-arrow press"><ChevronLeft className="size-5" /></button>
          <Link href={`/teams#${team.slug}`} className="sl-card" aria-label={`${team.name} team`}>
            <Image key={team.slug} src={team.logo} alt="" width={160} height={160} className="sl-logo" />
          </Link>
          <button type="button" aria-label="Next team" onClick={() => go(cur + 1)} className="sl-arrow press"><ChevronRight className="size-5" /></button>
        </div>
        <div className="sl-cta">
          <Link href="/fixtures" className="btn-red press">View fixtures <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
        </div>
      </div>
    </section>
  );
}
