"use client";

import * as React from "react";
import { Clock, MapPin } from "lucide-react";
import type { Day } from "@/lib/site";

// BYQ gem: tab-underline-01, carrying the fixture days. Motion values verbatim.
export function FixtureTabs({ days }: { days: Day[] }) {
  const [active, setActive] = React.useState(0);
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
        aria-label="Fixture days"
        onKeyDown={onKeyDown}
        className="relative flex overflow-x-auto border-b border-ink/15 [scrollbar-width:none]"
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
            className="num min-h-11 flex-none px-4 py-3 text-sm font-medium text-ink/45 transition-colors duration-200 hover:text-ink/75 aria-selected:text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--color-pitch)] focus-visible:outline-none motion-reduce:transition-none md:px-5"
          >
            {d.date} <span className="font-normal">{d.day}</span>
          </button>
        ))}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px left-0 h-0.5 bg-pitch transition-[transform,width] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ width: bar.width, transform: `translateX(${bar.x}px)` }}
        />
      </div>

      <div className="grid pt-8">
        {days.map((d, i) => (
          <div
            key={d.date}
            role="tabpanel"
            id={`panel-${i}`}
            aria-labelledby={`tab-${i}`}
            inert={active !== i}
            className={`col-start-1 row-start-1 transition-[opacity,transform] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              active === i ? "opacity-100" : "pointer-events-none translate-y-1.5 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-8">
              {d.slots.map((s, j) => (
                <div key={j}>
                  <p className="num mb-3 flex items-center gap-2 text-sm font-semibold text-pitch"><Clock aria-hidden="true" className="size-4" strokeWidth={1.8} />{s.time ?? "All day"}</p>
                  {s.note && <p className="text-xl font-semibold">{s.note}</p>}
                  {s.matches && (
                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {s.matches.map((m, k) => (
                        <li key={k} className="rounded-2xl bg-mist p-5">
                          <p className="text-lg font-semibold">{m}</p>
                          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/55"><MapPin aria-hidden="true" className="size-3.5" strokeWidth={1.8} />Venue TBC</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
