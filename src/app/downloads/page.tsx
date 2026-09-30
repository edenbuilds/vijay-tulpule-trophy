import type { Metadata } from "next";
import { Downloads } from "@/components/Downloads";
import { Block, Hero } from "@/components/Sections";
import { PHOTOS } from "@/lib/site";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <>
      <Hero title="Downloads" sub="Fixtures, calendar and sponsorship" photo={PHOTOS.tent} />
      <Block tone="paper">
        <Downloads />
      </Block>
    </>
  );
}
