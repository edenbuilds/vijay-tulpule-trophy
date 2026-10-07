import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Photo } from "@/lib/photos";

export function GalleryZoom({ photos }: { photos: Photo[] }) {
  const picks = photos.slice(0, 6);
  return (
    <section aria-labelledby="gallery-home-title" className="border-y border-navy/10 bg-paper-light px-4 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 id="gallery-home-title" className="display text-3xl leading-tight sm:text-4xl md:text-5xl">The Matches End. The Memories Stay.</h2>
            <p className="mt-3 max-w-2xl text-lg text-navy/70">Explore photographs of teams, tournaments, ceremonies and moments from the history of Advocates’ cricket.</p>
          </div>
          <Link href="/gallery" className="inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">
            Explore The Gallery <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {picks.map((photo, index) => (
            <Link key={photo.id} href="/gallery" aria-label={`Explore the gallery: ${photo.alt}`} className={`group relative block overflow-hidden rounded-sm bg-sky-deep ${index === 0 || index === 5 ? "aspect-[4/3]" : "aspect-[3/2]"}`}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
