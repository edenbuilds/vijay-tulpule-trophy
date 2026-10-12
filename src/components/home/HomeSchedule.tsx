import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SCHEDULE, GROUNDS } from "@/lib/schedule";

// 12-10-2026: owner chose a row of day cards, everything visible without clicking. Scrolls sideways on phones.
export function HomeSchedule() {
  return (
    <section aria-labelledby="schedule-home-title" className="dc">
      <div className="dc-head">
        <div><p className="dc-kicker">17–24 October 2026</p><h2 id="schedule-home-title" className="display">Match week</h2></div>
        <Link href="/fixtures" className="link-arrow">Full fixtures <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
      </div>
      <ol className="dc-row">
        {SCHEDULE.map((day, i) => {
          const kind = i === 0 ? "open" : day.finals ? "final" : day.grounds.length ? "" : "rest";
          const title = i === 0 ? "Opening ceremony" : day.title === "Matches" ? "League matches" : day.title;
          return (
            <li key={day.date} className={`dc-card ${kind}`} style={{ "--i": i } as React.CSSProperties}>
              <p className="dc-day">{day.weekday}</p>
              <p className="dc-num num">{day.short.split(" ")[0]}</p>
              <p className="dc-what">{title}</p>
              {day.grounds.length
                ? <ul className="dc-grounds">{day.grounds.map((id) => <li key={id}>{GROUNDS[id].name}<span>{GROUNDS[id].area}</span></li>)}</ul>
                : <p className="dc-note">{i === 0 ? "Venue to be announced." : "Kept free in case of rain."}</p>}
            </li>
          );
        })}
      </ol>
      <p className="dc-foot">Matchups and timings will be published when confirmed.</p>
    </section>
  );
}
