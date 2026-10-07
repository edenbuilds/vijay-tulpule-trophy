import type { Metadata } from "next";
import ParallaxGallery from "@/components/effects/parallax-gallery";
import { Block, Hero } from "@/components/Sections";
import { photo } from "@/lib/photos";
import { GalleryGrid } from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs from BACA’s archive and past All India Advocates’ Cricket Tournaments.",
};

// Landscape team photographs for the pinned reel; the grid below holds every photograph. Alt text comes from photos.ts,
// which says only what is visible.
const REEL = [85, 20, 56, 57, 72, 86, 28, 15].map((id) => {
  const p = photo(id);
  return { src: p.src, alt: p.alt };
});

export default function Gallery() {
  return (
    <>
      <Hero title="Gallery" sub="Photographs from BACA’s archive and past tournaments." />
      {/* A sky tile between the navy header and the footer so the page is not one navy block. overflow-clip (not hidden)
          keeps the reel's sticky pin working inside the rounded corners. */}
      <div className="mx-2 mt-2 overflow-clip rounded-2xl bg-sky">
        <ParallaxGallery images={REEL} bgColor="var(--color-sky)" borderColor="rgba(11, 42, 86, 0.55)" textColor="var(--color-navy)" rotationDeg={5} />
      </div>
      <Block title="All photographs" tone="snow">
        <GalleryGrid />
        <p className="mt-10 max-w-xl text-sm text-navy/70">
          Supplied by BACA. Names, grounds and years will be added as they are confirmed.
        </p>
      </Block>
    </>
  );
}
