import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SCHEDULE, GROUNDS } from "@/lib/schedule";

const titleFor = (index: number, title: string) => {
  if (index === 0) return "Opening Ceremony";
  if (title === "Reserve day") return "Reserve Day";
  if (title === "Finals") return "Finals";
  return "Tournament Matches";
};

export function HomeSchedule() {
  return (
    <section aria-labelledby="schedule-home-title" className="px-4 py-14 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 id="schedule-home-title" className="display text-3xl leading-tight sm:text-4xl md:text-5xl">Eight Days Of Cricket Across Mumbai</h2>
            <p className="mt-3 max-w-2xl text-lg text-navy/70">Match timings and team matchups will be updated as they are confirmed.</p>
          </div>
          <Link href="/fixtures" className="inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">
            View Full Fixtures <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ol className="mt-8 grid gap-x-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCHEDULE.map((day, index) => {
            const sub = day.finals?.length
              ? day.finals.map((id) => GROUNDS[id].name).join(" and ")
              : index === 0
                ? "Venue to be announced"
                : day.title === "Reserve day"
                  ? "Held in case weather affects play"
                  : index < 4
                    ? `Matches across ${day.grounds.length} grounds`
                    : "Tournament matches";
            return (
              <li key={day.date} className="border-t border-navy/15 py-5">
                <time dateTime={day.date} className="num text-sm font-semibold text-royal">{day.short} <span className="text-navy/55">{day.weekday}</span></time>
                <h3 className="mt-2 text-xl font-semibold">{titleFor(index, day.title)}</h3>
                <p className="mt-1 text-base leading-relaxed text-navy/65">{sub}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
