"use client";

import Image from "next/image";
import * as React from "react";
import { TEAMS } from "@/lib/teams";

// Live scores from the match centre feed (match.baca-cricket.com/api/live, CricHeroes underneath), polled every 30 s.
// Renders nothing until there is at least one match, and nothing if the feed is down.
const FEED = "https://match.baca-cricket.com/api/live";
const MATCH_CENTRE = "https://match.baca-cricket.com/tournament/matches";

// Desk team id -> site slug. The desk numbers the 16 teams team-01..16 in the same alphabetical order as TEAMS.
const DESK: Record<string, string> = {
  "team-01": "allahabad", "team-02": "andhra-pradesh", "team-03": "aurangabad", "team-04": "bombay",
  "team-05": "calcutta", "team-06": "chhattisgarh", "team-07": "delhi", "team-08": "gujarat",
  "team-09": "gwalior", "team-10": "indore", "team-11": "karnataka", "team-12": "lucknow",
  "team-13": "orissa", "team-14": "punjab-haryana", "team-15": "supreme-court", "team-16": "telangana",
};

type Side = { teamId: string | null; name: string; score: string; overs: string };
type Match = { id: number; status: "live" | "upcoming" | "past"; start: string; a: Side; b: Side; summary: string };

const team = (s: Side) => TEAMS.find((t) => t.slug === DESK[s.teamId ?? ""]);
const ORDER = { live: 0, past: 1, upcoming: 2 };

export function HomeLive() {
  const [feed, setFeed] = React.useState<{ matches: Match[]; fetchedAt: string | null } | null>(null);
  React.useEffect(() => {
    let on = true;
    const load = () => fetch(FEED).then((r) => r.json()).then((d) => on && setFeed(d)).catch(() => {});
    load();
    const t = setInterval(load, 30_000);
    return () => { on = false; clearInterval(t); };
  }, []);

  // Today's matches first (IST), then anything live; past days drop off the home page.
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const list = (feed?.matches ?? [])
    .filter((m) => m.status === "live" || new Date(m.start).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }) === today)
    .sort((x, y) => ORDER[x.status] - ORDER[y.status]);
  if (!list.length) return null;
  const live = list.some((m) => m.status === "live");
  const time = feed?.fetchedAt && new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }).format(new Date(feed.fetchedAt));

  return (
    <section aria-labelledby="live-title" className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hl-live mb-3">{live && <span aria-hidden="true" />}{live ? "Live now" : "Today"}</p>
            <h2 id="live-title" className="display text-5xl uppercase md:text-6xl">Scores</h2>
          </div>
          <p className="text-sm text-white/60">Via CricHeroes{time && `, updated ${time}`}. Refreshes every 30 seconds.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((m) => (
            <li key={m.id}>
              <a href={MATCH_CENTRE} className="flex h-full flex-col gap-3 rounded-2xl border border-white/12 bg-white/[.04] p-5 transition-colors duration-200 hover:border-white/35">
                <span className={`text-xs font-semibold uppercase tracking-[.14em] ${m.status === "live" ? "text-red" : "text-white/55"}`}>{m.status === "live" ? "Live" : m.status === "past" ? "Result" : "Upcoming"}</span>
                {[m.a, m.b].map((s, i) => {
                  const t = team(s);
                  return (
                    <span key={i} className="flex items-center gap-3">
                      {t && <Image src={t.logo} alt="" width={32} height={32} className="size-8 flex-none rounded-full bg-white object-contain" />}
                      <span className="display min-w-0 flex-1 text-xl leading-tight">{t?.name ?? s.name}</span>
                      <span className="num text-right font-semibold">
                        {s.score}
                        {s.overs && s.score !== "Yet to bat" && <span className="block text-xs font-normal text-white/55">{s.overs}</span>}
                      </span>
                    </span>
                  );
                })}
                {m.summary && <span className="mt-auto text-sm leading-snug text-white/65">{m.summary}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
