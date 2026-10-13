import type { Metadata } from "next";
import { Block, Hero } from "@/components/Sections";
import { GalleryGrid } from "./GalleryGrid";
import { UnfurlGallery } from "@/components/effects/unfurl-gallery";
import { ZOOM } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs from BACA’s archive and past All India Advocates’ Cricket Tournaments.",
};

export default function Gallery() {
  return (
    <>
      <Hero title="Gallery" sub="Decades Of Cricket. Friendships That Go Beyond The Game." />
      <Block title="The Matches End. The Memories Stay." kicker="From The Archive" tone="white">
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-navy/75">Every tournament leaves behind more than scores and results. It leaves behind team photographs, celebrations, trophies, friendships and moments remembered long after the last ball is bowled. Explore photographs from the BACA archive.</p>
        <UnfurlGallery photos={ZOOM} />
        <h3 className="display mt-14 mb-6 text-3xl md:text-4xl">The full archive</h3>
        <GalleryGrid />
        <p className="mt-10 max-w-xl text-sm text-navy/70">
          Photograph details, names and dates may be added as they are confirmed.
        </p>
      </Block>
    </>
  );
}
