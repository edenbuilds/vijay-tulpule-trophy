import type { Metadata } from "next";
import { FixtureTabs } from "@/components/gems/FixtureTabs";
import { Downloads } from "@/components/Downloads";
import { Block, Hero, StatBar } from "@/components/Sections";
import { FIXTURES } from "@/lib/site";
import { PH } from "@/lib/photos";

export const metadata: Metadata = { title: "Fixtures" };

export default function Fixtures() {
  return (
    <>
      <Hero title="Fixtures" sub="32 matches over eight days. First ball at 09:00." photo={PH.fixtures} />
      <StatBar items={[["32", "matches"], ["4", "grounds"], ["21 Oct", "reserve day"], ["24 Oct", "final"]]} />
      <Block tone="paper">
        <FixtureTabs days={FIXTURES} />
      </Block>
      <Block title="Download" tone="cream">
        <Downloads only={["Fixtures", "Calendar"]} />
      </Block>
    </>
  );
}
