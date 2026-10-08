import Image from "next/image";

// Square icon: the High Court and ball from the logo on a white tile (public/brand/t26/icon.png, scripts/logo-2026.mjs). Size it with className, e.g. "size-9 rounded-xl".
// The SVG already carries its own rounded corners; an extra radius only matters when you want it rounder.
export function Mark({ className = "", priority = false, alt = "" }: { className?: string; priority?: boolean; alt?: string }) {
  return <Image src="/brand/t26/icon.png" alt={alt} width={512} height={512} priority={priority} className={className} />;
}
