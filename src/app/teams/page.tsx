import type { Metadata } from "next";
import { Block, Hero } from "@/components/Sections";
import { GROUPS } from "@/lib/site";
import { PH } from "@/lib/photos";

export const metadata: Metadata = { title: "Teams" };

export default function Teams() {
  return (
    <>
      <Hero title="Teams" sub="16 teams in four groups. The top two in each group reach the quarter-finals." photo={PH.teams} />
      <Block tone="paper">
        <p className="num mb-8 max-w-2xl text-lg text-ink/70">Team names will be announced. Each team registers a 15-player squad.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g) => (
            <section key={g.name} className="rounded-2xl bg-mist p-5 md:p-6">
              <h2 className="display text-2xl">Group {g.name}</h2>
              <ul className="rule mt-4">
                {g.teams.map((t) => (
                  <li key={t} className="row-line flex min-h-12 items-center justify-between gap-4 border-b border-dashed border-ink/15 py-3 last:border-0">
                    <span className="font-semibold">Team {t}</span>
                    <span className="text-sm text-ink/55">To be announced</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Block>
      <Block title="Qualifying" tone="pitch">
        <p className="num max-w-3xl text-lg text-paper/80 md:text-xl">
          Top two from each group. Quarter-finals: A1 v B2, B1 v A2, C1 v D2, D1 v C2. No team plays twice on the same day.
        </p>
      </Block>
    </>
  );
}
