"use client";

import Link from "next/link";
import * as React from "react";

// BYQ gem: magnetic-button-01. Motion values verbatim; skin mapped to pitch.
const PULL = 26;

type Props = { href: string; children: React.ReactNode; tone?: "dark" | "light" };

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

  const rest =
    tone === "dark"
      ? "bg-pitch text-night border-pitch"
      : "bg-transparent text-ink border-ink/25";

  return (
    <Link
      ref={ref}
      href={href}
      className={`mb-magnet ${tone === "light" ? "mb-light" : ""} relative -m-2.5 inline-flex items-center justify-center px-[1.15rem] py-[1.35rem] outline-none [-webkit-tap-highlight-color:transparent]`}
    >
      <span
        aria-hidden="true"
        className="mb-halo pointer-events-none absolute left-1/2 top-1/2 h-[4.6rem] w-[10.5rem] opacity-0 blur-[14px]"
        style={{ background: "radial-gradient(60% 75% at 50% 50%, rgb(46 192 95 / 0.7), rgb(46 192 95 / 0) 72%)" }}
      />
      <span
        className={`mb-label relative z-[1] inline-flex min-h-11 items-center gap-2.5 border px-7 py-3 text-base font-semibold ${rest}`}
      >
        {children}
        <svg className="mb-arrow size-4 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
