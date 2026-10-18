"use client";

import Image from "next/image";
import * as React from "react";
import { TEAMS } from "@/lib/teams";
import { GROUNDS, MATCHES, groundLabel } from "@/lib/schedule";
import { FEED, dayOffset, istDay, matchNo, shortDate, teamOf, type Feed, type LiveMatch } from "@/lib/live";

// Live scores from the match centre feed, polled every 30 s. Renders nothing until there is something to show.
const MATCH_CENTRE = "https://match.baca-cricket.com/tournament/matches";

type Tab = "live" | "past" | "upcoming" | "yesterday" | "tomorrow";
// Tabs carry the date, not "yesterday/today", so they never read wrong.
const label = (k: Tab, d: Record<string, string>) => ({ live: "Live", past: `Results ${d.today}`, upcoming: `Up next ${d.today}`, yesterday: `Results ${d.yday}`, tomorrow: `Fixtures ${d.tmrw}` })[k];
const TABS: Tab[] = ["live", "past", "upcoming", "yesterday", "tomorrow"];
// CricHeroes sends team names in capitals ("LUCKNOW ADVOCATES won the toss"); soften them for reading.
const soft = (t: string) => t.replace(/\b[A-Z]{3,}\b/g, (w) => w[0] + w.slice(1).toLowerCase());
const istTime = (iso: string) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
const card = "sc-in flex h-full flex-col gap-3 rounded-[12px] border border-white bg-white p-4 text-navy shadow-[0_8px_24px_rgb(0_0_0/.18)] transition-transform duration-200 hover:-translate-y-0.5 sm:p-5";

function Score({ m }: { m: LiveMatch }) {
  return (
    <>
      {[m.a, m.b].map((s, i) => {
        const t = teamOf(s);
        const lost = m.status === "past" && m.winnerId && s.teamId !== m.winnerId;
        const yet = s.score === "Yet to bat";
        return (
          <span key={i} className={`flex items-center gap-3 transition-opacity duration-500 ${lost ? "opacity-50" : ""}`}>
            {t && <Image src={t.logo} alt="" width={28} height={28} className="size-7 flex-none rounded-full bg-white object-contain" />}
            <span className="min-w-0 flex-1 truncate font-semibold leading-tight">{t?.name ?? soft(s.name)}</span>
            <span className="num flex-none overflow-hidden text-right">
              {/* Re-keyed on every change so a new score rolls in. */}
              <span key={s.score} className="inline-flex text-lg font-bold">{yet ? "" : <Odo v={s.score} />}</span>
              <span className="ml-1.5 text-xs text-navy/55">{yet ? "Yet to bat" : s.overs}</span>
            </span>
          </span>
        );
      })}
    </>
  );
}

/* Odometer digits, borrowed from BYQ's odometer-counter gem: each digit is a 0-9 reel that spins
   to its value, settling left to right. CSS only (no GSAP), and re-keyed with the score so it spins again on change. */
function Odo({ v }: { v: string }) {
  return (
    <span aria-label={v} className="inline-flex">
      {[...v].map((c, i) =>
        /\d/.test(c) ? (
          <span key={i} aria-hidden className="odo">
            <span className="odo-reel" style={{ "--d": c, "--i": i } as React.CSSProperties}>
              {"0123456789".split("").map((n) => <span key={n}>{n}</span>)}
            </span>
          </span>
        ) : <span key={i} aria-hidden>{c}</span>,
      )}
    </span>
  );
}

export function HomeLive() {
  const [tab, setTab] = React.useState<Tab | null>(null);
  const [feed, setFeed] = React.useState<Feed | null>(null);
  const row = React.useRef<HTMLUListElement>(null);
  React.useEffect(() => {
    let on = true;
    const load = () => fetch(FEED).then((r) => r.json()).then((d) => on && setFeed(d)).catch(() => {});
    load();
    const t = setInterval(load, 30_000);
    return () => { on = false; clearInterval(t); };
  }, []);

  const [yday, today, tmrw] = [dayOffset(-1), dayOffset(0), dayOffset(1)];
  const all = [...(feed?.matches ?? [])].sort((x, y) => x.start.localeCompare(y.start) || (matchNo(x) ?? 99) - (matchNo(y) ?? 99));
  const todays = all.filter((m) => m.status === "live" || istDay(m.start) === today);
  const groups: Record<Tab, LiveMatch[]> = {
    live: todays.filter((m) => m.status === "live"),
    past: todays.filter((m) => m.status === "past"),
    upcoming: todays.filter((m) => m.status === "upcoming"),
    yesterday: all.filter((m) => m.status === "past" && istDay(m.start) === yday),
    tomorrow: [],
  };
  // Tomorrow comes from the organisers' fixtures, not CricHeroes (scorers only create matches on the day).
  const next = MATCHES.filter((m) => m.date === tmrw);
  const count = (k: Tab) => (k === "tomorrow" ? next.length : groups[k].length);
  const d = { today: shortDate(today), yday: shortDate(yday), tmrw: shortDate(tmrw) };
  const tabs = TABS.filter((k) => count(k)).map((k): [Tab, string] => [k, label(k, d)]);
  if (!tabs.length) return null;
  const active = tab && count(tab) ? tab : tabs[0][0];
  const live = groups.live.length > 0;
  const postDay = groups.past.length ? today : groups.yesterday.length ? yday : null;
  const time = feed?.fetchedAt && istTime(feed.fetchedAt);
  const nudge = (d: number) => row.current?.scrollBy({ left: d * row.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section aria-labelledby="live-title" className="live-shell bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hl-live mb-3">{live && <span aria-hidden="true" />}{live ? "Live now" : "Scores"}</p>
            <h2 id="live-title" className="display text-5xl uppercase md:text-6xl">Match centre</h2>
          </div>
          <p className="text-sm text-white/60">
            Via CricHeroes{time && `, updated ${time}`}. Refreshes every 30 seconds.
            {postDay && <> <a href={`/social/results/${postDay}`} className="font-semibold text-white underline underline-offset-4">Results post</a></>}
          </p>
        </div>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div role="tablist" aria-label="Matches" className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
            {tabs.map(([k, label]) => (
              <button key={k} role="tab" aria-selected={k === active} onClick={() => setTab(k)}
                className={`flex-none rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 active:scale-[.97] ${k === active ? "border-white bg-white text-navy-deep" : "border-white/20 text-white/75 hover:border-white/50"}`}>
                {label} <span className="num opacity-60">{count(k)}</span>
              </button>
            ))}
          </div>
          <div className="hidden flex-none gap-2 md:flex">
            {[-1, 1].map((d) => (
              <button key={d} type="button" onClick={() => nudge(d)} aria-label={d < 0 ? "Previous matches" : "More matches"} className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors duration-200 hover:border-white/60 active:scale-[.96]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={d < 0 ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} /></svg>
              </button>
            ))}
          </div>
        </div>
        {/* A swipeable row at every width: one card on phones, two to four on wider screens. Re-keyed per tab so cards stagger in. */}
        <ul key={active} ref={row} className="-mx-4 flex sc-row snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] md:mx-0 md:gap-4 md:px-0">
          {active === "tomorrow"
            ? next.map((m, i) => (
                <li key={i} className="sc-cell w-[84%] flex-none snap-start sm:w-[calc(50%-.5rem)] lg:w-[calc(25%-.75rem)]">
                  <a href="/fixtures" className={card} style={{ "--i": i } as React.CSSProperties}>
                    <span className="flex items-center justify-between gap-2 text-xs text-navy/55">
                      <span className="font-semibold uppercase tracking-[.14em]">{m.no ? `Match ${m.no}` : m.stage}</span>
                      <span>{shortDate(m.date)}{m.no ? ` · ${m.stage}` : ""}</span>
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
                    <span className="mt-auto border-t border-navy/10 pt-3 text-sm leading-snug text-navy/70">{GROUNDS[m.ground] ? groundLabel(GROUNDS[m.ground]) : m.ground}</span>
                  </a>
                </li>
              ))
            : groups[active].map((m, i) => (
                <li key={m.id} className="sc-cell w-[84%] flex-none snap-start sm:w-[calc(50%-.5rem)] lg:w-[calc(25%-.75rem)]">
                  <a href={MATCH_CENTRE} className={`${card} ${m.status === "live" ? "sc-live" : ""}`} style={{ "--i": i } as React.CSSProperties}>
                    <span className="flex items-center justify-between gap-2 text-xs text-navy/55">
                      <span className={`flex items-center gap-2 font-semibold uppercase tracking-[.14em] ${m.status === "live" ? "text-red" : ""}`}>
                        {m.status === "live" && <span aria-hidden="true" className="sc-dot" />}
                        {matchNo(m) ? `Match ${matchNo(m)}` : m.status === "live" ? "Live" : "Match"}
                      </span>
                      <span className="truncate">{shortDate(m.start)} · {m.status === "upcoming" ? istTime(m.start) : m.ground}</span>
                    </span>
                    <Score m={m} />
                    {m.summary && <span className="mt-auto border-t border-navy/10 pt-3 text-sm leading-snug text-navy/70">{soft(m.summary)}</span>}
                  </a>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
