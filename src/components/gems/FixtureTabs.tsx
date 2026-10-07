"use client";

import * as React from "react";
import { GROUNDS, SCHEDULE } from "@/lib/schedule";
import { nb } from "@/lib/site";

// What the sheet does not list for a day, in our words. Keyed by date so a day that gains grounds simply stops using its entry.
const NOTE: Record<string, string> = {
  "2026-10-17": "Venue and time to be announced.",
  "2026-10-21": "No matches.",
  "2026-10-24": "Which final is played where is to be announced.",
};

// First day with a ground listed, so the page opens on something to read (17 Oct has no venue yet).
const FIRST = Math.max(0, SCHEDULE.findIndex((d) => d.grounds.length > 0));

// BYQ gem: tab-underline-01, carrying the tournament days. Motion values verbatim.
export function FixtureTabs() {
  const days = SCHEDULE;
  const [active, setActive] = React.useState(FIRST);
  const [bar, setBar] = React.useState({ width: 0, x: 0 });
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const measure = React.useCallback((i: number) => {
    const t = tabs.current[i];
    // offsetLeft, not getBoundingClientRect: the tablist scrolls sideways on phones
    if (t) setBar({ width: t.offsetWidth, x: t.offsetLeft });
  }, []);

  const select = (i: number) => {
    setActive(i);
    measure(i);
    tabs.current[i]?.focus();
    tabs.current[i]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => measure(active));
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => measure(active), 50);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [active, measure]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = days.length;
    const next =
      e.key === "ArrowRight" ? (active + 1) % n
      : e.key === "ArrowLeft" ? (active - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Tournament days"
        onKeyDown={onKeyDown}
        className="relative flex overflow-x-auto border-b border-navy/15 [scrollbar-width:none]"
      >
        {days.map((d, i) => (
          <button
            key={d.date}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            id={`tab-${i}`}
            aria-controls={`panel-${i}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            className="num min-h-11 flex-none px-3 py-3 text-base font-semibold text-navy/65 transition-colors duration-200 hover:text-navy aria-selected:text-navy focus-visible:shadow-[inset_0_0_0_2px_var(--color-royal)] focus-visible:outline-none motion-reduce:transition-none md:px-6"
          >
            {/* Phones drop the weekday (the panel prints it) so four days and the edge of the fifth show, which tells a thumb the row scrolls. */}
            {d.short} <span className="hidden font-normal md:inline">{d.weekday.slice(0, 3)}</span>
          </button>
        ))}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px left-0 h-0.5 bg-royal transition-[transform,width] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ width: bar.width, transform: `translateX(${bar.x}px)` }}
        />
      </div>

      {/* Only the open panel takes space (a short day does not leave a tall empty tile); the rise keyframe replays on each open. */}
      {days.map((d, i) => (
        <div key={d.date} role="tabpanel" id={`panel-${i}`} aria-labelledby={`tab-${i}`} hidden={active !== i}>
          <div className="rise grid gap-6 pt-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:pt-12">
            <div>
              <p className="mb-2 text-base font-semibold text-royal">{d.weekday}, {d.short}</p>
              <h3 className="display text-4xl uppercase md:text-5xl lg:text-6xl">{d.title}</h3>
            </div>
            <div>
              {d.grounds.length > 0 && (
                <ul className="rule">
                  {d.grounds.map((id) => {
                    const g = GROUNDS[id];
                    return (
                      <li key={id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-dashed border-navy/15 py-4 md:py-5">
                        <span className="display text-2xl md:text-4xl">{nb(g.name)}</span>
                        <span className="text-lg text-navy/70">{g.area}</span>
                        {d.finals?.includes(id) && <span className="ml-auto text-lg font-bold text-red">Final</span>}
                      </li>
                    );
                  })}
                </ul>
              )}
              {NOTE[d.date] && <p className={`text-xl text-navy/80 md:text-2xl ${d.grounds.length ? "mt-5" : "rule pt-5"}`}>{NOTE[d.date]}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
