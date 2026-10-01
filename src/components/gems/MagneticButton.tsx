"use client";
import Link from "next/link";
import * as React from "react";
// BYQ gem: magnetic-button-01. Motion values verbatim; skin is Human Intelligence pill buttons in green.
const PULL = 26;
const TONES = {
  dark: "bg-pitch text-paper border-pitch",
  light: "bg-paper text-ink border-ink/15",
  onDark: "bg-paper text-ink border-paper",
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
      className={`mb-magnet ${tone !== "dark" ? "mb-light" : ""} relative -m-2.5 inline-flex items-center justify-center px-[1.15rem] py-[1.35rem] outline-none [-webkit-tap-highlight-color:transparent]`}
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
