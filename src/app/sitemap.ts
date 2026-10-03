import type { MetadataRoute } from "next";
import { FOOTER_LINKS } from "@/lib/site";

// Every page the footer links to, once each. The Hosts anchor is the same page as About.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vijay-tulpule-trophy.vercel.app";
  return [...new Set(FOOTER_LINKS.map((l) => l.href.split("#")[0]))].map((path) => ({ url: `${base}${path === "/" ? "" : path}` }));
}
