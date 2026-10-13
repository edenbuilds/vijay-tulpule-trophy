"use client";
// Asks visitors to follow BACA on Instagram once per browser: after 5 seconds or half the page scrolled, whichever comes first.
// A small corner card rather than a blocking modal, so it never stands between someone and the fixtures.
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SOCIAL } from "@/components/Social";

const KEY = "baca-ig-popup-seen";

export function FollowPopup() {
  const [open, setOpen] = useState(false);
  const ig = SOCIAL[0];

  useEffect(() => {
    try { if (localStorage.getItem(KEY)) return; } catch { return; }
    const show = () => {
      setOpen(true);
      try { localStorage.setItem(KEY, "1"); } catch {}
      cleanup();
    };
    const onScroll = () => { if (scrollY > (document.body.scrollHeight - innerHeight) / 2) show(); };
    const t = setTimeout(show, 5000);
    addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => { clearTimeout(t); removeEventListener("scroll", onScroll); };
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  return (
    <div role="dialog" aria-labelledby="ig-pop-title" className="ig-pop fixed right-4 bottom-4 z-[60] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl bg-navy text-white shadow-2xl">
      <div className="h-1 bg-red" />
      <div className="p-5">
        <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="press absolute top-3 right-3 grid size-11 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white">
          <X aria-hidden="true" className="size-5" />
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">17–24 October, Mumbai</p>
        <h2 id="ig-pop-title" className="display mt-2 pr-10 text-4xl leading-none">Follow the tournament</h2>
        <p className="mt-3 text-sm text-white/75">BACA is on Instagram. Follow along through match week.</p>
        <a href={ig.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-red press mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg font-semibold">
          Follow {ig.handle}
        </a>
      </div>
    </div>
  );
}
