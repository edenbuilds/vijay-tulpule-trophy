import type { Metadata } from "next";
import { Block, Hero, StatBar } from "@/components/Sections";

export const metadata: Metadata = { title: "Format" };

const COLS = [
  ["Group stage", "18–20 Oct. Four groups of four. 14:30 games only if lights are confirmed."],
  ["Knockout", "22 Oct quarter-finals. 23 Oct semi-finals. 24 Oct 3rd place and final, 09:00."],
  ["Reserve", "21 Oct if rain stops play."],
];

export default function Format() {
  return (
    <>
      <Hero title="Format" sub="16 teams · group stage · knockout · Mumbai, 17–24 October" />
      <StatBar items={[["16", "teams"], ["4", "groups"], ["32", "matches"], ["15", "player squads"]]} />
      <Block tone="paper">
        <div className="grid gap-px overflow-hidden rounded-xl bg-ink/10 md:grid-cols-3">
          {COLS.map(([h, p]) => (
            <div key={h} className="bg-cream p-6 md:p-8">
              <h2 className="text-2xl font-bold">{h}</h2>
              <p className="num mt-4 text-ink/70">{p}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Points" tone="cream">
        <p className="max-w-3xl text-lg text-ink/75 md:text-xl">
          Win 2. Tie or no result 1. Loss 0. Tie-break: NRR, then head-to-head, then fewest wickets lost per run scored.
        </p>
      </Block>
      <Block title="Awards" tone="paper">
        <p className="max-w-3xl text-lg text-ink/75 md:text-xl">
          Each match: Man of the Match, Best Batter, Best Bowler — given after the game. Final day: winners, runners-up, 3rd
          place, series awards. Participation medals at the 17 Oct opening only.
        </p>
      </Block>
    </>
  );
}
