import type { Metadata } from "next";
import { EVENT } from "@/lib/site";
import { PH } from "@/lib/photos";
import { Block, Hero } from "@/components/Sections";

export const metadata: Metadata = { title: "Format" };

const COLS = [
  ["Group stage", "18–20 Oct. Four groups of four, one match against each side. 14:30 games only if the lights are certified."],
  ["Knockout", "22 Oct quarter-finals. 23 Oct semi-finals. 24 Oct 3rd place and final, 09:00."],
  ["Reserve", "21 Oct if rain stops play. No team plays twice on the same day."],
];

export default function Format() {
  return (
    <>
      <Hero title="Format" sub={`${EVENT.overs} overs a side. First ball at 09:00.`} photo={PH.format} />
      <Block tone="paper">
        <div className="grid gap-2 md:grid-cols-3">
          {COLS.map(([h, p]) => (
            <div key={h} className="rounded-2xl bg-mist p-6 md:p-8">
              <h2 className="text-2xl font-bold">{h}</h2>
              <p className="num mt-4 text-ink/70">{p}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Points" tone="cream">
        <p className="max-w-3xl text-lg text-ink/75 md:text-xl">
          Win 2. Tie or no result 1. Loss 0. Tie-break: NRR, then head-to-head, then fewest wickets lost per run scored, then lots.
        </p>
      </Block>
      <Block title="Awards" tone="paper">
        <p className="max-w-3xl text-lg text-ink/75 md:text-xl">
          Every match: Man of the Match, Best Batter and Best Bowler, given on the day. Trophy evening: winners,
          runners-up, 3rd place, and player, batter and bowler of the series. Participation medals at the 17 Oct opening only. In all: 96 match awards, 6 trophy evening cups and 240 participation medals.
        </p>
      </Block>
    </>
  );
}
