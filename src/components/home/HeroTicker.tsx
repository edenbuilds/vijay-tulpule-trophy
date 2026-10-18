"use client";

import * as React from "react";
import { MATCHES } from "@/lib/schedule";
import { TEAMS } from "@/lib/teams";
import { FEED, dayOffset, istDay, matchNo, nameOf, resultLine, shortDate, type Feed, type LiveMatch } from "@/lib/live";

const team = (slug: string) => TEAMS.find((t) => t.slug === slug)?.name ?? slug;

// The red hero strip: yesterday's results, today's live scores, tomorrow's fixtures. Team names until the feed loads.
export function HeroTicker({ fallback }: { fallback: string[] }) {
  const [items, setItems] = React.useState(fallback);
  React.useEffect(() => {
    const load = () =>
      fetch(FEED).then((r) => r.json()).then((f: Feed) => {
        const [yday, today, tmrw] = [dayOffset(-1), dayOffset(0), dayOffset(1)];
        const on = (d: string) => f.matches.filter((m) => istDay(m.start) === d);
        // "Match 9 · 19 Oct · ..." rather than "yesterday/today", which goes stale the moment the date turns.
        const tag = (m: LiveMatch) => `${matchNo(m) ? `Match ${matchNo(m)}` : "Match"} · ${shortDate(m.start)}`;
        const next = [
          ...on(yday).filter((m) => m.status === "past").map((m) => `${tag(m)} · ${resultLine(m)}`),
          ...on(today).map((m) =>
            m.status === "live" ? `Live · ${tag(m)} · ${nameOf(m.a)} ${m.a.score} v ${nameOf(m.b)} ${m.b.score}`
            : m.status === "past" ? `${tag(m)} · ${resultLine(m)}` : `${tag(m)} · ${nameOf(m.a)} v ${nameOf(m.b)}`),
          ...MATCHES.filter((m) => m.date === tmrw).map((m) => `Match ${m.no} · ${shortDate(m.date)} · ${team(m.a)} v ${team(m.b)}`),
        ];
        if (next.length) setItems(next);
      }).catch(() => {});
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hero-roll" aria-label="Scores and fixtures">
      <div className="hero-roll-track" style={{ animationDuration: `${Math.max(48, items.length * 7)}s` }}>
        {[...items, ...items].map((n, i) => <span key={i} aria-hidden={i >= items.length}>{n}</span>)}
      </div>
    </div>
  );
}
