"use client";

import Link from "next/link";
import * as React from "react";
import { Ball } from "@/components/Motion";
import { FIXTURES, RESULTS } from "@/lib/site";

type Item = { key: string; head: string; text: string; ends: number };

const MONTHS: Record<string, string> = { Sep: "09", Oct: "10", Nov: "11" };
// Fixture dates are "18 Oct" in IST; a slot counts as upcoming until the end of its day.
const endOfDay = (date: string) => {
  const [d, m] = date.split(" ");
  return Date.parse(`2026-${MONTHS[m]}-${d.padStart(2, "0")}T23:59:59+05:30`);
};

const UPCOMING: Item[] = FIXTURES.flatMap((day) =>
  day.slots.flatMap((s, i) => {
    const head = `${day.day} ${day.date}${s.time ? `, ${s.time}` : ""}`;
    const texts = s.matches ?? (s.note ? [s.note] : []);
    return texts.map((text, j) => ({ key: `${day.date}-${i}-${j}`, head, text, ends: endOfDay(day.date) }));
  }),
);

const RESULT_ITEMS: Item[] = RESULTS.map((r, i) => ({
  key: `r${i}`,
  head: `Result, ${r.date}`,
  text: `${r.match}: ${r.line}`,
  ends: Infinity,
})).reverse();

export function NewsStrip() {
  // Render every fixture on the server, then drop the ones already played once the viewer's clock is known.
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => setNow(Date.now()), []);

  const upcoming = now === null ? UPCOMING : UPCOMING.filter((i) => i.ends >= now);
  const items = [...RESULT_ITEMS, ...upcoming];
  if (!items.length) return null;

  const label = RESULT_ITEMS.length ? "Latest" : "Coming up";
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((it) => (
        <li key={it.key} className="flex items-center">
          <Link
            href="/fixtures"
            tabIndex={hidden ? -1 : undefined}
            className="num flex min-h-10 items-center gap-2 whitespace-nowrap px-4 text-sm transition-colors hover:text-sage"
          >
            <span className="font-semibold">{it.head}</span>
            <span className="text-paper/75">{it.text}</span>
          </Link>
          <Ball className="strip-ball size-3.5 shrink-0" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Fixtures and results" className="strip flex bg-ink text-paper">
      <p className="z-[1] flex shrink-0 items-center bg-pitch px-4 text-xs font-semibold uppercase tracking-[0.08em]">{label}</p>
      <div className="strip-scroll min-w-0 flex-1 overflow-hidden">
        <div className="strip-track flex w-max" style={{ "--strip-dur": `${items.length * 5}s` } as React.CSSProperties}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
