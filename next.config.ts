import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /baca became /about when the site was rebuilt around the 38th tournament.
  // 13-10-2026: photos showed up late because Vercel served public files with max-age=0, so every view re-checked each image.
  // A day of fresh cache plus a week of stale-while-revalidate keeps replaced photos (same filename) updating within a day.
  async headers() {
    return ["/gallery/:path*", "/img/:path*", "/venues/:path*", "/brand/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
    }));
  },
  async redirects() {
    return [{ source: "/baca", destination: "/about", permanent: true }];
  },
};

export default nextConfig;
