"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/gems/MagneticButton";
import type { Photo } from "@/lib/photos";

gsap.registerPlugin(ScrollTrigger);

// Animmaster Awwwards Pack, Grid Animations 7: a wall of photographs pins, then the middle one scales up
// until it fills the screen and the call to open the gallery appears over it. The wall is a 5x3 grid, so the
// middle tile (index 7) is the one at the centre of the scale. Phones and reduced motion get a plain mosaic.
// The wall sits on snow, not navy, so it does not run into the navy trophy band above it; the navy only arrives as the flat
// photo-darkening veil that carries the call to open the gallery.
const MOSAIC = [7, 5, 6, 3, 8, 12];

export function GalleryZoom({ photos }: { photos: Photo[] }) {
  const pin = React.useRef<HTMLDivElement>(null);
  const grid = React.useRef<HTMLDivElement>(null);
  const veil = React.useRef<HTMLDivElement>(null);
  const copy = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const el = pin.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(copy.current, { autoAlpha: 0, y: 24 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=170%", pin: true, scrub: 0.6, anticipatePin: 1 } });
      tl.to(grid.current, { scale: 5.6, ease: "power2.inOut", duration: 1 }, 0)
        .to(veil.current, { opacity: 1, duration: 0.3 }, 0.7)
        .to(copy.current, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.8);
    });
    return () => mm.revert();
  }, []);

  // Over the navy veil on desktop the copy is white; on the phone mosaic it sits on snow in navy.
  const heading = (onDark: boolean) => (
    <>
      <h2 className="display uppercase text-4xl md:text-7xl">Gallery</h2>
      <p className={`max-w-md text-lg ${onDark ? "text-white/80" : "text-navy/70"}`}>Photographs from BACA’s archive and past tournaments.</p>
      <MagneticButton href="/gallery" tone={onDark ? "onDark" : "dark"}>Open the gallery</MagneticButton>
    </>
  );

  return (
    <section className="bg-snow">
      <div ref={pin} className="relative hidden h-svh overflow-hidden md:block motion-reduce:hidden">
        <div ref={grid} className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-2 p-2 will-change-transform">
          {photos.map((p, i) => (
            <div key={p.id} className="relative overflow-hidden rounded-lg bg-sky-deep">
              <Image src={i === 7 ? p.src : p.small} alt={p.alt} fill sizes={i === 7 ? "100vw" : "20vw"} className="object-cover" />
            </div>
          ))}
        </div>
        <div ref={veil} aria-hidden="true" className="absolute inset-0 bg-navy/70 opacity-0" />
        <div ref={copy} className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center text-white">{heading(true)}</div>
      </div>
      <div className="px-2 py-16 md:hidden motion-reduce:block">
        <div className="flex flex-col items-start gap-5 px-2 pb-8">{heading(false)}</div>
        <div className="grid grid-cols-2 gap-2">
          {MOSAIC.slice(0, 4).map((i) => (
            <div key={photos[i].id} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sky-deep">
              <Image src={photos[i].small} alt={photos[i].alt} fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
