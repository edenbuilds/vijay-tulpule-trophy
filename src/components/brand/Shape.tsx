// The blue and red geometric shape (public/brand/t26/shape.svg). Same rules as Stroke: decoration, aria-hidden, clipped by its tile.
export function Shape({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/t26/shape.svg" alt="" aria-hidden="true" draggable={false} decoding="async" className={`pointer-events-none h-auto select-none ${className}`} />;
}
