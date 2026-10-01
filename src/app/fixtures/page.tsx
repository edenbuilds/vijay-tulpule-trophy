import type { Metadata } from "next";
import { FixtureTabs } from "@/components/gems/FixtureTabs";
import { Downloads } from "@/components/Downloads";
import { Block, Hero } from "@/components/Sections";
import { FIXTURES } from "@/lib/site";
import { PH } from "@/lib/photos";

export const metadata: Metadata = { title: "Fixtures" };

export default function Fixtures() {
  return (
    <>
      <Hero title="Fixtures" sub="Every match by day. First ball at 09:00." photo={PH.fixtures} />
      <Block tone="paper">
        <FixtureTabs days={FIXTURES} />
      </Block>
      <Block title="Download" tone="cream">
        <Downloads only={["Fixtures", "Calendar"]} />
      </Block>
    </>
  );
}
