"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SHOTS, type Shot } from "@/lib/gallery";
import { photo } from "@/lib/photos";

const TABS = [
  { key: "all", label: "All" },
  { key: "teams", label: "Teams" },
  { key: "matches", label: "Matches" },
  { key: "ceremonies", label: "Ceremonies" },
  { key: "trophies", label: "Trophies" },
  { key: "archive", label: "Archive" },
] as const;
type Tab = (typeof TABS)[number]["key"];

const LABEL: Record<Shot["cat"], string> = { teams: "Teams", matches: "Matches", ceremonies: "Ceremonies", trophies: "Trophies", archive: "Archive" };

// A caption is only what photos.ts actually has for the id. It falls back to "Photograph N" when nobody has described the
// picture, and that fallback is not shown: no names, grounds or years are guessed.
const CAPTION = new Map<number, string | undefined>(
  SHOTS.map((s) => {
    const alt = photo(s.id).alt;
    return [s.id, alt === `Photograph ${s.id}` ? undefined : alt];
  }),
);

const ring = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";
const ringOnNavy = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// Filterable masonry with an accessible native dialog for full-size photographs.
export function GalleryGrid() {
  const [tab, setTab] = React.useState<Tab>("all");
  const [open, setOpen] = React.useState<number | null>(null);
  const dlg = React.useRef<HTMLDialogElement>(null);
  const shots = React.useMemo(() => (tab === "all" ? SHOTS : SHOTS.filter((s) => s.cat === tab)), [tab]);
  const isOpen = open !== null;
  React.useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  const step = React.useCallback((by: number) => setOpen((i) => (i === null ? i : (i + by + shots.length) % shots.length)), [shots.length]);
  const cur = open === null ? null : shots[open];
  const curCaption = cur ? CAPTION.get(cur.id) : undefined;

  return (
    <>
      <div role="group" aria-label="Photo category" className="mb-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`press min-h-11 rounded-md border px-4 text-sm font-semibold ${ring} ${tab === t.key ? "border-navy bg-navy text-white" : "border-navy/15 bg-white text-navy hover:bg-sky"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab} className="columns-2 gap-3 lg:columns-3">
        {shots.map((s, i) => {
          const cap = CAPTION.get(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={cap ? `Open photograph: ${cap}` : `Open photograph ${i + 1} of ${shots.length}`}
              className="group relative mb-3 block w-full overflow-hidden rounded-lg bg-sky-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
              style={{ aspectRatio: `${s.w} / ${s.h}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized 640px thumbnails from public/gallery */}
              <img src={`/gallery/${s.id}-s.jpg`} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none" />
            </button>
          );
        })}
      </div>

      <dialog
        ref={dlg}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => (e.key === "ArrowRight" ? step(1) : e.key === "ArrowLeft" ? step(-1) : undefined)}
        onClick={(e) => e.target === dlg.current && setOpen(null)}
        aria-label="Photograph"
        className="m-auto size-full max-h-none max-w-none touch-pinch-zoom overscroll-contain bg-transparent p-0 backdrop:bg-navy-deep/95"
      >
        {cur && (
          <div className="grid size-full grid-rows-[1fr_auto] gap-4 p-3 md:p-8" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            <div className="relative min-h-0">
              {/* eslint-disable-next-line @next/next/no-img-element -- full-size file from public/gallery */}
              <img src={`/gallery/${cur.id}.jpg`} alt={curCaption ?? `${LABEL[cur.cat]} photograph ${(open ?? 0) + 1} of ${shots.length}`} className="absolute inset-0 size-full object-contain" />
            </div>
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 text-white sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="min-w-0">
                {curCaption && <p className="mb-1 text-base md:text-lg">{curCaption}</p>}
                <p className="num text-sm text-white/70">{LABEL[cur.cat]}, {(open ?? 0) + 1} of {shots.length}</p>
              </div>
              <div className="flex shrink-0 justify-end gap-2">
                <button type="button" aria-label="Previous photograph" onClick={() => step(-1)} className={`press grid size-11 place-items-center rounded-full bg-white/15 hover:bg-white/25 ${ringOnNavy}`}><ChevronLeft className="size-5" /></button>
                <button type="button" aria-label="Next photograph" onClick={() => step(1)} className={`press grid size-11 place-items-center rounded-full bg-white/15 hover:bg-white/25 ${ringOnNavy}`}><ChevronRight className="size-5" /></button>
                <button type="button" aria-label="Close" onClick={() => setOpen(null)} className={`press grid size-11 place-items-center rounded-full bg-snow text-navy ${ringOnNavy}`}><X className="size-5" /></button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
