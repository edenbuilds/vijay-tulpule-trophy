import type { Metadata } from "next";
import { FixtureTabs } from "@/components/gems/FixtureTabs";
import { Block, Hero, StatBar } from "@/components/Sections";
import { FIXTURES, PHOTOS } from "@/lib/site";

export const metadata: Metadata = { title: "Fixtures" };

export default function Fixtures() {
  return (
    <>
      <Hero title="Fixtures" sub="17–24 October 2026 · venues TBC" photo={PHOTOS.saturday} />
      <StatBar items={[["32", "matches"], ["4", "venues TBC"], ["21 Oct", "reserve day"], ["24 Oct", "final"]]} />
      <Block tone="paper">
        <FixtureTabs days={FIXTURES} />
      </Block>
    </>
  );
}
