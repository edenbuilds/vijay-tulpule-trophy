import { Logo } from "@/components/brand/Logo";

// Loading stinger, styled on the replay wipe a cricket telecast plays between deliveries: red and royal bars sweep across,
// the logo punches in on navy, then the panel slides away. Pure CSS (.stinger in globals.css) so it paints with the first frame
// and clears itself. The inline script in layout.tsx adds `stinger-seen` to <html> on repeat visits in a session, which hides it
// before paint. Reduced motion hides it too.
export function Stinger() {
  return (
    <div className="stinger" aria-hidden="true">
      <span className="stinger-bar stinger-red" /><span className="stinger-bar stinger-royal" />
      <div className="stinger-panel"><div className="stinger-logo"><Logo variant="barReversed" priority className="w-full" sizes="420px" alt="" /></div></div>
    </div>
  );
}
