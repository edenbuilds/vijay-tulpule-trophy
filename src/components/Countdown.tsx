"use client";

import * as React from "react";

// Days only, counted to midnight at the start of 17 October 2026 in Asia/Kolkata (the first day of the tournament, TOURNAMENT in
// src/lib/schedule.ts). The last full day ends at midnight after 24 October. Rendered after mount only: the server has no
// "now", and a stale server-rendered count would flash wrong. Colour and size come from the parent; pass className to change them.
const START = Date.parse("2026-10-17T00:00:00+05:30");
const END = Date.parse("2026-10-25T00:00:00+05:30");
const DAY = 86_400_000;

export function Countdown({ className = "display num text-4xl md:text-6xl" }: { className?: string }) {
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  // Keeps the height while the clock is unknown, so nothing below jumps.
  if (now === null) return <p aria-hidden="true" className={`invisible ${className}`}>0 days to go</p>;
  if (now >= END) return <p className={className}>Concluded</p>;
  if (now >= START) return <p className={className}>Under way</p>;

  const days = Math.ceil((START - now) / DAY);
  return <p className={className}>{days} {days === 1 ? "day" : "days"} to go</p>;
}
