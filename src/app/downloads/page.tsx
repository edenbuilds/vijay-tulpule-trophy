import type { Metadata } from "next";
import { Downloads } from "@/components/Downloads";
import { Block, Hero } from "@/components/Sections";
import { PHOTOS } from "@/lib/site";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <>
      <Hero title="Downloads" sub="The fixtures and the sponsorship brief as PDFs, and every match day for your calendar." photo={PHOTOS.tent} />
      <Block tone="paper">
        <Downloads />
      </Block>
    </>
  );
}
