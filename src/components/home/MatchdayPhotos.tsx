import fs from "node:fs";
import path from "node:path";
import { PhotoCarousel } from "./PhotoCarousel";

// Lists public/matchday/<date>/*.jpg at build time, newest day first. Adding photos = scripts/add-photos.sh + deploy.
export function MatchdayPhotos() {
  const root = path.join(process.cwd(), "public/matchday");
  // "more" holds photos sent without a shoot date (pasted images carry no EXIF); they lead, with no date shown.
  const days = fs.existsSync(root) ? fs.readdirSync(root).filter((d) => d === "more" || /^\d{4}-\d{2}-\d{2}$/.test(d)).sort().reverse() : [];
  const photos = days.flatMap((d) =>
    fs.readdirSync(path.join(root, d)).filter((f) => f.endsWith(".jpg")).sort().map((f) => ({ src: `/matchday/${d}/${f}`, day: d })),
  );
  if (!photos.length) return null;
  return <PhotoCarousel photos={photos} />;
}
