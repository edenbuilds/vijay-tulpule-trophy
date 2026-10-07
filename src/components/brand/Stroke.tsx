// The red and blue dry-brush motion stroke (public/brand/t26/stroke.svg). Decoration only: it is aria-hidden, takes no
// pointer events and is meant to be clipped by its tile (position it with className, e.g. "-right-16 -bottom-8 w-[40rem] -rotate-6").
// A plain <img> on purpose: it is an SVG, so next/image would not optimise it, and it never carries text.
export function Stroke({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/t26/stroke.svg" alt="" aria-hidden="true" draggable={false} decoding="async" className={`pointer-events-none h-auto select-none ${className}`} />;
}
