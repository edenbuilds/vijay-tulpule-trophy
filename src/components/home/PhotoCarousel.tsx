"use client";

import Image from "next/image";
import * as React from "react";

// Adapted from BYQ Supply "Centered Image Carousel" (cultureexchange-image-gallery-1): the active slide at full size,
// neighbours scaled back for depth. Autoplays, pauses on hover, swipes on phones, respects reduced motion.
const fmt = (d: string) => d.split("-").reverse().join("-");

export function PhotoCarousel({ photos }: { photos: { src: string; day: string }[] }) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const n = photos.length;
  const go = React.useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);
  React.useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [paused, go]);
  const touch = React.useRef(0);

  return (
    <section aria-labelledby="photos-title" className="overflow-hidden bg-snow py-16 text-navy md:py-24">
      <div className="mx-auto mb-10 flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 md:px-8">
        <div>
          <p className="hl-live mb-3 !text-navy/60"><span aria-hidden="true" />On the ground</p>
          <h2 id="photos-title" className="display text-5xl uppercase md:text-6xl">Matchday</h2>
        </div>
        <p className="num text-sm text-navy/60">{fmt(photos[i].day)} · {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</p>
      </div>
      <div
        className="relative mx-auto h-[15rem] max-w-[90rem] sm:h-[24rem] md:h-[30rem]"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; setPaused(true); }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}
        role="region" aria-roledescription="carousel" aria-label="Matchday photos"
      >
        {photos.map((p, k) => {
          let off = k - i;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const far = Math.abs(off) > 2;
          return (
            <button key={p.src} type="button" onClick={() => setI(k)} tabIndex={off === 0 ? -1 : 0} aria-label={`Photo ${k + 1}`}
              className="absolute left-1/2 top-0 h-full w-[78%] overflow-hidden rounded-2xl sm:w-[56%] md:w-[46%]"
              style={{
                transform: `translateX(calc(-50% + ${off * 62}%)) scale(${off === 0 ? 1 : Math.abs(off) === 1 ? 0.8 : 0.62})`,
                opacity: far ? 0 : off === 0 ? 1 : 0.55,
                zIndex: 10 - Math.abs(off),
                transition: "transform .6s cubic-bezier(.23,1,.32,1), opacity .6s ease",
                pointerEvents: far ? "none" : "auto",
              }}>
              <Image src={p.src} alt="" fill sizes="(min-width: 768px) 46vw, 78vw" className="object-cover" priority={k === 0} />
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="grid size-12 place-items-center rounded-full bg-navy text-white transition-transform duration-150 hover:bg-navy-deep active:scale-[.96]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="flex gap-1.5">
          {photos.map((_, k) => <span key={k} className={`h-0.5 rounded-full transition-all duration-300 ${k === i ? "w-8 bg-red" : "w-3 bg-navy/25"}`} />)}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next photo" className="grid size-12 place-items-center rounded-full bg-navy text-white transition-transform duration-150 hover:bg-navy-deep active:scale-[.96]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </section>
  );
}
