import type { Metadata } from "next";
import { FixtureTabs } from "@/components/gems/FixtureTabs";
import { Downloads } from "@/components/Downloads";
import { Block, Hero } from "@/components/Sections";
import Image from "next/image";
import { GROUND_DAYS, GROUPS } from "@/lib/schedule";
import { TEAMS } from "@/lib/teams";
import { nb } from "@/lib/site";

export const metadata: Metadata = { title: "Fixtures" };

// "18, 19, 20 Oct" from the days a ground hosts; the sheet is all October, the month is read from the data anyway.
const dayList = (days: { short: string }[]) => `${days.map((d) => d.short.split(" ")[0]).join(", ")} ${days[days.length - 1].short.split(" ")[1]}`;

export default function Fixtures() {
  return (
    <>
      <Hero title="Fixtures" sub="Every match, group and ground, from the league on 18 October to the finals on 24 October." />
      <Block title="Eight days of tournament cricket" tone="white">
        <FixtureTabs />
      </Block>
      <Block title="Groups" tone="sky">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.keys(GROUPS).sort().map((k) => (
            <div key={k}>
              <h3 className="display border-b border-navy/20 pb-2 text-3xl">Group {k}</h3>
              <ul>
                {GROUPS[k].map((slug) => {
                  const t = TEAMS.find((x) => x.slug === slug)!;
                  return (
                    <li key={slug} className="flex items-center gap-3 border-b border-dashed border-navy/15 py-3">
                      <Image src={t.logo} alt="" width={32} height={32} className="size-8 rounded-full object-contain" />
                      <span className="text-lg font-semibold">{nb(t.name)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base text-navy/70">The top two in each group go through to the quarter-finals on 22 October.</p>
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
