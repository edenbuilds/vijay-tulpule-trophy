"use client";

import Link from "next/link";
import * as React from "react";
import { Ball } from "@/components/brand/Ball";
import { GROUNDS, SCHEDULE } from "@/lib/schedule";
import { RESULTS } from "@/lib/site";

type Item = { key: string; head: string; text: string; ends: number };

// "CCI, Brabourne Stadium" -> "CCI", "Wankhede Stadium" -> "Wankhede": the strip only needs the name people say.
const shortName = (id: string) => GROUNDS[id].name.split(/[ ,]/)[0];
const and = (a: string[]) => (a.length > 1 ? `${a.slice(0, -1).join(", ")} and ${a.at(-1)}` : a[0]);

// One item per day of SCHEDULE: only what the organisers' sheet states (ground count, Final, reserve day). No times, no stages.
// A day counts as upcoming until the end of that day in IST.
const UPCOMING: Item[] = SCHEDULE.map((d) => ({
  key: d.date,
  head: `${d.short},`,
  text: d.finals?.length
    ? `Finals at ${and(d.finals.map(shortName))}`
    : d.grounds.length
      ? `${d.grounds.length} ground${d.grounds.length === 1 ? "" : "s"}`
      : d.title.toLowerCase(),
  ends: Date.parse(`${d.date}T23:59:59+05:30`),
}));

const RESULT_ITEMS: Item[] = RESULTS.map((r, i) => ({
  key: `r${i}`,
  head: `Result ${r.date}:`,
  text: `${r.match}, ${r.line}`,
  ends: Infinity,
})).reverse();

export function NewsStrip() {
  // Render every day on the server, then drop the ones already past once the viewer's clock is known.
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => setNow(Date.now()), []);

  const upcoming = now === null ? UPCOMING : UPCOMING.filter((i) => i.ends >= now);
  const items = [...RESULT_ITEMS, ...upcoming];
  if (!items.length) return null;

  // Two identical groups, each at least a screen wide, so the loop never shows a gap however few items remain.
  const group = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex min-w-[100vw] shrink-0 items-center justify-around">
      {items.map((it) => (
        <li key={it.key} className="flex items-center">
          <Link
            href="/fixtures"
            tabIndex={hidden ? -1 : undefined}
            className="num flex min-h-11 items-center gap-1.5 whitespace-nowrap px-4 text-sm transition-colors hover:text-sky"
          >
            <span className="font-semibold">{it.head}</span>
            <span className="text-white/75">{it.text}</span>
          </Link>
          <Ball className="strip-ball size-3.5 shrink-0" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Fixtures and results" className="strip bg-navy text-white">
      <div className="strip-scroll overflow-hidden">
        <div className="strip-track flex w-max" style={{ "--strip-dur": `${Math.max(items.length, 6) * 5}s` } as React.CSSProperties}>
          {group(false)}
          {group(true)}
        </div>
      </div>
    </section>
  );
}
