"use client";
import Link from "next/link";
import * as React from "react";
// BYQ gem: magnetic-button-01. Motion values verbatim; skin is the BACA 2026 pill. Each tone sets the pill, the hover fill
// (--mb-hbg, --mb-hfg) and the focus ring (--mb-ring, royal; white on navy where royal would not show) used by globals.css.
//   dark / light  navy pill, white text: the default on white, snow and sky surfaces ("light" is the surface, kept for old callers)
//   outline       navy outline, fills navy on hover: a second button beside the default
//   onDark        white pill, navy text: on navy bands and photographs
//   outlineOnDark white outline, fills white on hover: a second button on navy
const PULL = 26;
const NAVY = "bg-navy text-white border-navy [--mb-hbg:var(--color-navy-deep)] [--mb-hfg:#fff]";
const TONES = {
  dark: NAVY,
  light: NAVY,
  outline: "bg-transparent text-navy border-navy [--mb-hbg:var(--color-navy)] [--mb-hfg:#fff]",
  onDark: "bg-white text-navy border-white [--mb-hbg:var(--color-sky)] [--mb-hfg:var(--color-navy)] [--mb-ring:#fff]",
  outlineOnDark: "bg-transparent text-white border-white/70 [--mb-hbg:#fff] [--mb-hfg:var(--color-navy)] [--mb-ring:#fff]",
};
type Props = { href: string; children: React.ReactNode; tone?: keyof typeof TONES };
export function MagneticButton({ href, children, tone = "dark" }: Props) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  React.useEffect(() => {
    const magnet = ref.current;
    if (!magnet) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMove = (e: PointerEvent) => {
      if (reduce.matches || e.pointerType !== "mouse") return;
      const r = magnet.getBoundingClientRect();
      const cx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      const cy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
      magnet.classList.add("mb-is-pulling");
      magnet.style.setProperty("--mx", `${cx * PULL}px`);
      magnet.style.setProperty("--my", `${cy * PULL}px`);
    };
    const reset = () => {
      magnet.classList.remove("mb-is-pulling");
      magnet.style.setProperty("--mx", "0px");
      magnet.style.setProperty("--my", "0px");
    };
    magnet.addEventListener("pointermove", onMove);
    magnet.addEventListener("pointerleave", reset);
    magnet.addEventListener("blur", reset);
    return () => {
      magnet.removeEventListener("pointermove", onMove);
      magnet.removeEventListener("pointerleave", reset);
      magnet.removeEventListener("blur", reset);
    };
  }, []);
  return (
    <Link
      ref={ref}
      href={href}
      className={`mb-magnet relative -m-2.5 inline-flex items-center justify-center px-[1.15rem] py-[1.35rem] outline-none [-webkit-tap-highlight-color:transparent]`}
    >
      <span
        className={`mb-label relative z-[1] inline-flex min-h-11 whitespace-nowrap items-center gap-2.5 rounded-full border px-7 py-3 text-base font-semibold ${TONES[tone]}`}
      >
        {children}
        <svg className="mb-arrow size-4 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
