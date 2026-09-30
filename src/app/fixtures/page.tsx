import type { Metadata } from "next";
import { FixtureTabs } from "@/components/gems/FixtureTabs";
import { Downloads } from "@/components/Downloads";
import { Block, Hero, StatBar } from "@/components/Sections";
import { FIXTURES, PHOTOS } from "@/lib/site";

export const metadata: Metadata = { title: "Fixtures" };

export default function Fixtures() {
  return (
    <>
      <Hero title="Fixtures" sub="17–24 October 2026 · first ball 09:00 · ground names TBC" photo={PHOTOS.saturday} />
      <StatBar items={[["32", "matches"], ["4", "grounds"], ["21 Oct", "reserve day"], ["24 Oct", "final"]]} />
      <Block tone="paper">
        <FixtureTabs days={FIXTURES} />
      </Block>
      <Block title="Take it with you" tone="cream">
        <Downloads only={["Fixtures", "Calendar"]} />
      </Block>
    </>
  );
}
