"use client";

import * as React from "react";

// BYQ gem: spotlight-glow-cards-01. Motion values verbatim; neon lime toned down to pitch.
export function SpotlightCard({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`sg-card group relative overflow-hidden rounded-2xl border ${className}`}
      style={{ animationDelay: `${0.05 + index * 0.1}s` }}
    >
      <span aria-hidden="true" className="sg-light pointer-events-none absolute inset-0" />
      <div className="relative">{children}</div>
    </div>
  );
}
