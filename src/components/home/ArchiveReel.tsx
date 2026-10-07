"use client";

import Image from "next/image";
import DraggableMarqueeComp from "@/components/effects/draggable-marquee/DraggableMarqueeComp";
import type { Photo } from "@/lib/photos";

// Hyperiux draggable-marquee: a strip of archive prints that drifts on its own, can be grabbed and thrown,
// and keeps looping. Items are rendered here (not by the effect's default <img>) so each print keeps its
// own proportions at one fixed height instead of being cropped to a card.
export function ArchiveReel({ photos }: { photos: Photo[] }) {
  return (
    <DraggableMarqueeComp
      items={photos.map((p) => ({ id: p.id }))}
      speed={0.6}
      gapClassName="gap-3"
      className="py-2"
      renderItem={(_, i) => {
        const p = photos[i];
        return (
          <div className="relative h-36 select-none overflow-hidden rounded-xl bg-sky-deep md:h-56" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
            <Image src={p.small} alt={p.alt} fill sizes="(min-width: 768px) 30rem, 20rem" draggable={false} className="pointer-events-none object-cover" />
          </div>
        );
      }}
    />
  );
}
