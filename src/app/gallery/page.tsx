import type { Metadata } from "next";
import ParallaxGallery from "@/components/effects/parallax-gallery";
import { Block, Hero } from "@/components/Sections";
import { PHOTOS } from "@/lib/site";
import { SHOTS } from "@/lib/gallery";
import { GalleryGrid } from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs from BACA’s archive and past All India Advocates’ Cricket Tournaments.",
};

// Landscape team photographs for the pinned reel; the grid below holds every photograph.
const REEL = [85, 20, 56, 57, 72, 86, 28, 15].map((id, i) => ({ src: `/gallery/${id}.jpg`, alt: `Team photograph ${i + 1} of 8` }));

export default function Gallery() {
  return (
    <>
      <Hero title="Gallery" sub={`${SHOTS.length} photographs from BACA’s archive and past tournaments.`} photo={PHOTOS.saturday} />
      <div className="mt-2 bg-ink">
        <ParallaxGallery images={REEL} bgColor="#141a16" borderColor="rgba(241,244,234,0.5)" rotationDeg={5} />
      </div>
      <Block title="All photographs" tone="paper">
        <GalleryGrid />
        <p className="mt-10 max-w-xl text-sm text-ink/55">
          Supplied by BACA. Names, grounds and years will be added as they are confirmed.
        </p>
      </Block>
    </>
  );
}
