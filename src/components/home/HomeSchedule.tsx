import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Timeline, { type TimelineItem } from "@/components/effects/timeline";
import { SCHEDULE, GROUNDS } from "@/lib/schedule";

// 13-10-2026: owner asked for the Hyperiux timeline in place of the day cards. Facts only from SCHEDULE.
const items: TimelineItem[] = SCHEDULE.map((day, i) => ({
  id: `d${day.date.replaceAll("-", "")}`,
  label: `${day.weekday.slice(0, 3)} ${day.short}`,
  accent: Boolean(day.finals),
  content:
    i === 0 ? "Opening ceremony. Venue to be announced."
    : day.grounds.length ? `${day.finals ? "Finals" : "League matches"}: ${day.grounds.map((id) => GROUNDS[id].name).join(", ")}`
    : "Reserve day, kept free in case of rain.",
}));

export function HomeSchedule() {
  return (
    <>
      <Timeline title="Match week" periodLabel="17–24 October 2026" items={items} imageUrl="/img/bombay-champions-2025.jpg" imageAlt="The BACA team with the trophy after winning the 37th All India Advocates’ Cricket Championship, Colombo, 2025" />
      <div className="dc-head bg-snow"><p className="dc-foot">Matchups and timings will be published when confirmed.</p><Link href="/fixtures" className="link-arrow">Full fixtures <ArrowUpRight aria-hidden="true" className="size-5" /></Link></div>
    </>
  );
}
