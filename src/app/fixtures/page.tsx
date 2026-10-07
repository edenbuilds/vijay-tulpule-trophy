import type { Metadata } from "next";
import { FixtureTabs } from "@/components/gems/FixtureTabs";
import { Downloads } from "@/components/Downloads";
import { Block, Hero } from "@/components/Sections";
import { GROUND_DAYS } from "@/lib/schedule";
import { nb } from "@/lib/site";

export const metadata: Metadata = { title: "Fixtures" };

// "18, 19, 20 Oct" from the days a ground hosts; the sheet is all October, the month is read from the data anyway.
const dayList = (days: { short: string }[]) => `${days.map((d) => d.short.split(" ")[0]).join(", ")} ${days[days.length - 1].short.split(" ")[1]}`;

export default function Fixtures() {
  return (
    <>
      <Hero title="Fixtures" sub="Match-ups will be published after the draw." />
      <Block title="Schedule" tone="white">
        <FixtureTabs />
      </Block>
      <Block title="Grounds" tone="navy">
        {/* Name above days on every width up to xl so each row has the same shape; side by side only where a column is wide enough for both. */}
        <ul className="rule grid md:grid-cols-2 md:gap-x-10 lg:gap-x-16">
          {GROUND_DAYS.map(({ ground, days }) => (
            <li key={ground.id} className="flex flex-col gap-1 border-b border-dashed border-white/15 py-4 md:py-5 xl:flex-row xl:items-baseline xl:justify-between xl:gap-x-6">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="display text-2xl">{nb(ground.name)}</span>
                <span className="text-lg text-white/70">{ground.area}</span>
              </p>
              <p className="num text-lg text-white/85">
                {dayList(days)}
                {days.some((d) => d.finals?.includes(ground.id)) && ", Final"}
              </p>
            </li>
          ))}
        </ul>
      </Block>
      <Block title="Download" tone="white">
        <Downloads only={["Fixtures", "Calendar"]} />
      </Block>
    </>
  );
}
