"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SHOTS, type Shot } from "@/lib/gallery";

const TABS = [
  { key: "all", label: "All" },
  { key: "teams", label: "Teams" },
  { key: "trophies", label: "Trophies" },
  { key: "archive", label: "Archive" },
] as const;
type Tab = (typeof TABS)[number]["key"];

const LABEL: Record<Shot["cat"], string> = { teams: "Teams", trophies: "Trophies", archive: "Archive" };

// Filterable masonry over the supplied photographs. Tiles wipe open as they scroll in; a click opens the
// full-size photo in a native <dialog> (focus trap and Escape come with it), with arrow keys to step.
export function GalleryGrid() {
  const [tab, setTab] = React.useState<Tab>("all");
  const [open, setOpen] = React.useState<number | null>(null);
  const dlg = React.useRef<HTMLDialogElement>(null);
  const grid = React.useRef<HTMLDivElement>(null);
  const shots = React.useMemo(() => (tab === "all" ? SHOTS : SHOTS.filter((s) => s.cat === tab)), [tab]);

  React.useEffect(() => {
    const tiles = grid.current?.querySelectorAll<HTMLElement>(".reveal-clip");
    if (!tiles) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.setAttribute("data-in", ""), io.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px" },
    );
    tiles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [tab]);

  React.useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const step = React.useCallback((by: number) => setOpen((i) => (i === null ? i : (i + by + shots.length) % shots.length)), [shots.length]);
  const cur = open === null ? null : shots[open];

  return (
    <>
      <div role="tablist" aria-label="Photo category" className="mb-8 grid grid-cols-4 gap-2 sm:flex">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`press min-h-11 rounded-full px-2 text-sm sm:px-5 font-semibold transition-colors ${tab === t.key ? "bg-pitch text-paper" : "bg-mint text-ink hover:bg-sage"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div ref={grid} key={tab} className="columns-2 gap-2 lg:columns-3">
        {shots.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photograph ${i + 1} of ${shots.length}`}
            className="reveal-clip group relative mb-2 block w-full overflow-hidden rounded-xl bg-sage"
            style={{ aspectRatio: `${s.w} / ${s.h}`, transitionDelay: `${(i % 3) * 90}ms` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized 640px thumbnails from public/gallery */}
            <img src={`/gallery/${s.id}-s.jpg`} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
          </button>
        ))}
      </div>

      <dialog
        ref={dlg}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => (e.key === "ArrowRight" ? step(1) : e.key === "ArrowLeft" ? step(-1) : undefined)}
        onClick={(e) => e.target === dlg.current && setOpen(null)}
        aria-label="Photograph"
        className="m-auto size-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/90"
      >
        {cur && (
          <div className="grid size-full grid-rows-[1fr_auto] gap-3 p-3 md:p-8" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            <div className="relative min-h-0">
              {/* eslint-disable-next-line @next/next/no-img-element -- full-size file from public/gallery */}
              <img src={`/gallery/${cur.id}.jpg`} alt={`${LABEL[cur.cat]} photograph ${(open ?? 0) + 1} of ${shots.length}`} className="absolute inset-0 size-full object-contain" />
            </div>
            <div className="num flex items-center justify-between gap-4 text-paper">
              <p className="text-sm text-paper/70">{LABEL[cur.cat]} · {(open ?? 0) + 1} / {shots.length}</p>
              <div className="flex gap-2">
                <button type="button" aria-label="Previous photograph" onClick={() => step(-1)} className="press grid size-11 place-items-center rounded-full bg-paper/15 hover:bg-paper/25"><ChevronLeft className="size-5" /></button>
                <button type="button" aria-label="Next photograph" onClick={() => step(1)} className="press grid size-11 place-items-center rounded-full bg-paper/15 hover:bg-paper/25"><ChevronRight className="size-5" /></button>
                <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="press grid size-11 place-items-center rounded-full bg-paper text-ink"><X className="size-5" /></button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
