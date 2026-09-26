import type { Metadata } from "next";
import { FixtureTabs } from "@/components/gems/FixtureTabs";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { Block, Hero, StatBar } from "@/components/Sections";
import { FIXTURES } from "@/lib/site";

export const metadata: Metadata = { title: "Fixtures" };

export default function Fixtures() {
  return (
    <>
      <Hero title="Fixtures" sub="17–24 October 2026 · venues TBC" />
      <StatBar items={[["32", "matches"], ["4", "venues TBC"], ["21 Oct", "reserve day"], ["24 Oct", "final"]]} />
      <Block tone="paper">
        <FixtureTabs days={FIXTURES} />
      </Block>
      <section className="bg-green py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 md:px-8">
          <p className="text-2xl font-semibold md:text-3xl">Watch from 16 October.</p>
          <MagneticButton href="/live">Live</MagneticButton>
        </div>
      </section>
    </>
  );
}
