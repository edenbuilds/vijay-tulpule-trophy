import Image from "next/image";

// The tournament logo. Pixel sizes are those of public/brand/t26/*.png (scripts/logo-2026.mjs, cut from the 08-10-2026 artwork); next/image needs them to
// reserve the box, the page sets the displayed width with className. "bar" carries the "Hosted by the Bombay Advocates'
// Cricket Association" bar, "reversed" is the one for navy surfaces.
const FILES = {
  full: { src: "/brand/t26/logo.png", width: 1162, height: 791 },
  bar: { src: "/brand/t26/logo-bar.png", width: 1162, height: 895 },
  reversed: { src: "/brand/t26/logo-reversed.png", width: 1190, height: 819 },
  barReversed: { src: "/brand/t26/logo-bar-reversed.png", width: 1190, height: 923 },
} as const;

export function Logo({
  variant = "full",
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 40rem, 90vw",
  alt = "38th All India Advocates’ Cricket Tournament, Mumbai 2026",
}: {
  variant?: keyof typeof FILES;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Pass "" where the page already names the tournament next to the logo. */
  alt?: string;
}) {
  return <Image {...FILES[variant]} alt={alt} priority={priority} sizes={sizes} className={`h-auto ${className}`} />;
}
