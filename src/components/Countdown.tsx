"use client";

import * as React from "react";

// Opening ceremony starts 17 Oct 07:00 and the trophy evening ends 24 Oct 18:00, both Asia/Kolkata (src/lib/site.ts).
// Rendered after mount only: the server has no "now", and a stale server-rendered count would flash wrong.
const START = new Date("2026-10-17T07:00:00+05:30").getTime();
const END = new Date("2026-10-24T18:00:00+05:30").getTime();

export function Countdown() {
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <div aria-hidden="true" className="h-[7.25rem]" />;
  if (now >= END) return <p className="display text-2xl md:text-3xl">The tournament has ended. Thank you for coming.</p>;
  if (now >= START) return <p className="display text-2xl md:text-3xl">Under way until 24 October.</p>;

  const mins = Math.floor((START - now) / 60_000);
  const parts: [number, string][] = [
    [Math.floor(mins / 1440), "days"],
    [Math.floor((mins % 1440) / 60), "hours"],
    [mins % 60, "minutes"],
  ];
  return (
    <div>
      <p className="mb-3 text-sm text-paper/75 md:text-base">To the opening on 17 October, 07:00</p>
      <dl className="flex gap-2">
        {parts.map(([n, l]) => (
          <div key={l} className="flex min-w-[4.75rem] flex-col-reverse rounded-xl bg-ink/55 px-4 py-3 text-center backdrop-blur-sm md:min-w-24">
            <dt className="mt-1 text-xs text-paper/70 md:text-sm">{l}</dt>
            <dd className="display num text-3xl md:text-5xl">{String(n).padStart(2, "0")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
