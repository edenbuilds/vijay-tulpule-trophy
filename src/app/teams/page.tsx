import type { Metadata } from "next";
import { SpotlightCard } from "@/components/gems/SpotlightCard";
import { Block, Hero } from "@/components/Sections";
import { GROUPS, PHOTOS } from "@/lib/site";

export const metadata: Metadata = { title: "Teams" };

export default function Teams() {
  return (
    <>
      <Hero title="Teams" sub="Sixteen teams in four groups. The top two in each group reach the quarter-finals." photo={PHOTOS.casual} />
      {GROUPS.map((g, gi) => (
        <Block key={g.name} title={`Group ${g.name}`} tone={gi % 2 ? "cream" : "paper"}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {g.teams.map((t, i) => (
              <SpotlightCard key={t} index={i} className={`border-ink/10 p-6 ${gi % 2 ? "bg-paper" : "bg-mist"}`}>
                <h3 className="text-3xl font-bold">Team {t}</h3>
                <p className="mt-5 text-ink/60">Name to be announced</p>
                <p className="num text-ink/60">15-player squad</p>
              </SpotlightCard>
            ))}
          </div>
        </Block>
      ))}
      <Block title="Qualifying" tone="night">
        <p className="num max-w-3xl text-lg text-ink/75 md:text-xl">
          Top two from each group. Quarter-finals: A1 v B2, B1 v A2, C1 v D2, D1 v C2. No team plays twice on the same day.
        </p>
      </Block>
    </>
  );
}
