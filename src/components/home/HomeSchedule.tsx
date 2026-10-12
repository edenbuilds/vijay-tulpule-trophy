import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SCHEDULE, GROUNDS } from "@/lib/schedule";

// 12-10-2026: owner said the day tabs plus red board repeated the same thing twice. Now one list, one row per day, adapted from
// BYQ Supply "Upcoming Events List" (cultureexchange-structured-data-2): date left, what happens in the middle, a line that fills
// on hover, and the row opens in place to show that day's grounds. Native <details>, so it works without JS.
export function HomeSchedule() {
  return (
    <section aria-labelledby="schedule-home-title" className="wk">
      <div className="wk-head">
        <h2 id="schedule-home-title" className="wk-title">Match week</h2>
        <Link href="/fixtures" className="link-arrow">Full fixtures <ArrowUpRight aria-hidden="true" className="size-5" /></Link>
      </div>
      <ul className="wk-list">
        {SCHEDULE.map((day, i) => {
          const title = i === 0 ? "Opening ceremony" : day.title === "Matches" ? `${day.grounds.length} grounds` : day.title;
          return (
            <li key={day.date} className="wk-row" style={{ "--i": i } as React.CSSProperties}>
              <details>
                <summary>
                  <span className="wk-date"><b className="num">{day.short.split(" ")[0]}</b> {day.weekday}</span>
                  <span className="wk-what">{title}</span>
                  <span className="wk-plus" aria-hidden="true" />
                </summary>
                <div className="wk-body">
                  {day.grounds.length
                    ? <ul>{day.grounds.map((id) => <li key={id}><strong>{GROUNDS[id].name}</strong> {GROUNDS[id].area}{day.finals?.includes(id) ? " · Final" : ""}</li>)}</ul>
                    : <p>{day.note}</p>}
                </div>
              </details>
            </li>
          );
        })}
      </ul>
      <p className="wk-note">Matchups and timings will be published when confirmed.</p>
    </section>
  );
}
