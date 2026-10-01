import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /baca became /about when the site was rebuilt around the 38th tournament.
  async redirects() {
    return [{ source: "/baca", destination: "/about", permanent: true }];
  },
};

export default nextConfig;
