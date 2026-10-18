"use client";

import Image from "next/image";
import * as React from "react";
import { TEAMS } from "@/lib/teams";
import { GROUNDS, MATCHES, groundLabel } from "@/lib/schedule";

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
type Status = "live" | "upcoming" | "past" | "tomorrow";
type Match = { id: number; status: Status; start: string; ground: string; a: Side; b: Side; summary: string; winnerId?: string | null };

const team = (s: Side) => TEAMS.find((t) => t.slug === DESK[s.teamId ?? ""]);
const TABS: [Status, string][] = [["live", "Live"], ["past", "Results"], ["upcoming", "Later"], ["tomorrow", "Tomorrow"]];
// CricHeroes sends team names in capitals ("LUCKNOW ADVOCATES won the toss"); soften them for reading.
const soft = (t: string) => t.replace(/\b[A-Z]{3,}\b/g, (w) => w[0] + w.slice(1).toLowerCase());
const istTime = (iso: string) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" }).format(new Date(iso));

export function HomeLive() {
  const [tab, setTab] = React.useState<Status | null>(null);
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
    .filter((m) => m.status === "live" || new Date(m.start).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }) === today);
  // Tomorrow comes from the organisers' fixtures, not CricHeroes (scorers only create matches on the day).
  const tomorrow = new Date(Date.now() + 864e5).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const next = MATCHES.filter((m) => m.date === tomorrow);
  if (!list.length && !next.length) return null;
  const tabs = TABS.filter(([k]) => (k === "tomorrow" ? next.length : list.some((m) => m.status === k)));
  const active = tab && tabs.some(([k]) => k === tab) ? tab : tabs[0][0];
  const shown = list.filter((m) => m.status === active);
  const live = list.some((m) => m.status === "live");
  const time = feed?.fetchedAt && new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }).format(new Date(feed.fetchedAt));

  return (
    <section aria-labelledby="live-title" className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hl-live mb-3">{live && <span aria-hidden="true" />}{live ? "Live now" : list.length ? "Today" : "Tomorrow"}</p>
            <h2 id="live-title" className="display text-5xl uppercase md:text-6xl">Scores</h2>
          </div>
          <p className="text-sm text-white/60">Via CricHeroes{time && `, updated ${time}`}. Refreshes every 30 seconds.</p>
        </div>
        {tabs.length > 1 && (
          <div role="tablist" aria-label="Match status" className="mb-5 flex gap-2">
            {tabs.map(([k, label]) => (
              <button key={k} role="tab" aria-selected={k === active} onClick={() => setTab(k)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 active:scale-[.97] ${k === active ? "border-white bg-white text-navy-deep" : "border-white/20 text-white/75 hover:border-white/50"}`}>
                {label} <span className="num opacity-60">{k === "tomorrow" ? next.length : list.filter((m) => m.status === k).length}</span>
              </button>
            ))}
          </div>
        )}
        {/* Phones swipe through one card at a time instead of scrolling past eight stacked cards. */}
        <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {active === "tomorrow" && next.map((m, i) => (
            <li key={i} className="w-[84%] flex-none snap-center sm:w-auto">
              <a href="/fixtures" className="flex h-full flex-col gap-3 rounded-2xl border border-white/12 bg-white/[.04] p-4 transition-colors duration-200 hover:border-white/35 sm:p-5">
                <span className="flex items-center justify-between gap-2 text-xs text-white/55">
                  <span className="font-semibold uppercase tracking-[.14em]">{m.no ? `Match ${m.no}` : m.stage}</span>
                  <span>{m.stage}</span>
                </span>
                {[m.a, m.b].map((slug) => {
                  const t = TEAMS.find((t) => t.slug === slug);
                  return (
                    <span key={slug} className="flex items-center gap-3">
                      {t && <Image src={t.logo} alt="" width={28} height={28} className="size-7 flex-none rounded-full bg-white object-contain" />}
                      <span className="min-w-0 flex-1 truncate font-semibold leading-tight">{t?.name ?? slug}</span>
                    </span>
                  );
                })}
                <span className="mt-auto border-t border-white/10 pt-3 text-sm leading-snug text-white/70">{GROUNDS[m.ground] ? groundLabel(GROUNDS[m.ground]) : m.ground}</span>
              </a>
            </li>
          ))}
          {active !== "tomorrow" && shown.map((m) => (
            <li key={m.id} className="w-[84%] flex-none snap-center sm:w-auto">
              <a href={MATCH_CENTRE} className="flex h-full flex-col gap-3 rounded-2xl border border-white/12 bg-white/[.04] p-4 transition-colors duration-200 hover:border-white/35 sm:p-5">
                <span className="flex items-center justify-between gap-2 text-xs text-white/55">
                  <span className={`font-semibold uppercase tracking-[.14em] ${m.status === "live" ? "text-red" : ""}`}>{m.status === "live" ? "Live" : m.status === "past" ? "Result" : istTime(m.start)}</span>
                  <span className="truncate">{m.ground}</span>
                </span>
                {[m.a, m.b].map((s, i) => {
                  const t = team(s);
                  const lost = m.status === "past" && m.winnerId && s.teamId !== m.winnerId;
                  return (
                    <span key={i} className={`flex items-center gap-3 ${lost ? "opacity-50" : ""}`}>
                      {t && <Image src={t.logo} alt="" width={28} height={28} className="size-7 flex-none rounded-full bg-white object-contain" />}
                      <span className="min-w-0 flex-1 truncate font-semibold leading-tight">{t?.name ?? soft(s.name)}</span>
                      <span className="num flex-none text-right">
                        <span className="text-lg font-bold">{s.score === "Yet to bat" ? "" : s.score}</span>
                        {s.overs && s.score !== "Yet to bat" && <span className="ml-1.5 text-xs text-white/55">{s.overs}</span>}
                        {s.score === "Yet to bat" && <span className="text-xs text-white/55">Yet to bat</span>}
                      </span>
                    </span>
                  );
                })}
                {m.summary && <span className="mt-auto border-t border-white/10 pt-3 text-sm leading-snug text-white/70">{soft(m.summary)}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
