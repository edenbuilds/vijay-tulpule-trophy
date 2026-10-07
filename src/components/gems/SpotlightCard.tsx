import type { ReactNode } from "react";

// BYQ gem: spotlight-glow-cards-01, reduced to its lift. The pointer-following glow is gone: it was a radial gradient the
// brand has no place for (flat tiles only), and globals.css never made it visible on hover anyway. The card still rises on
// hover and focus, and its entrance and hover lift are in globals.css (.sg-card). Name and props are kept for Tiers.
export function SpotlightCard({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={`sg-card group relative overflow-hidden rounded-2xl border ${className}`}
      // "backwards", not the stylesheet's "both": once the entrance has played it must let go of transform and opacity, or the
      // entrance animation and the hover transition both hold the same property.
      style={{ animationDelay: `${0.05 + index * 0.1}s`, animationFillMode: "backwards" }}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
