import type { Metadata } from "next";
import { Downloads } from "@/components/Downloads";
import { Block, Hero } from "@/components/Sections";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <>
      <Hero title="Tournament Resources" sub="Download fixtures, the tournament calendar, sponsorship information and BACA brand assets." />
      <Block tone="white">
        <Downloads />
      </Block>
    </>
  );
}
