"use client";

import Image from "next/image";
import DraggableMarqueeComp from "@/components/effects/draggable-marquee/DraggableMarqueeComp";
import { MagneticButton } from "@/components/gems/MagneticButton";
import type { Photo } from "@/lib/photos";

// The archive stays available as supporting context. A compact, user-draggable strip keeps the tournament's teams,
// schedule and trophy in the foreground instead of turning the archive into a full-screen interlude.
export function GalleryZoom({ photos }: { photos: Photo[] }) {
  return (
    <section className="mx-2 my-12 overflow-hidden rounded-2xl bg-white py-12 md:my-20 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-end md:px-8">
        <div>
          <h2 className="display uppercase text-4xl md:text-6xl">Gallery</h2>
          <p className="mt-4 max-w-md text-lg text-navy/70">Photographs from BACA’s archive and past tournaments.</p>
        </div>
        <MagneticButton href="/gallery">Open the gallery</MagneticButton>
      </div>

      <DraggableMarqueeComp
        items={photos.map((photo) => ({ id: photo.id }))}
        speed={0.35}
        repeatCount={2}
        gapClassName="gap-3"
        className="mt-8 cursor-grab py-2 active:cursor-grabbing md:mt-10"
        pauseOnHover
        renderItem={(_, i) => {
          const photo = photos[i];
          return (
            <div
              className="relative h-32 w-48 select-none overflow-hidden rounded-xl bg-sky-deep md:h-44 md:w-64"
              style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
            >
              <Image
                src={photo.small}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 16rem, 12rem"
                draggable={false}
                className="pointer-events-none object-cover"
              />
            </div>
          );
        }}
      />
    </section>
  );
}
