import type { Metadata, Viewport } from "next";
import { Archivo, Noto_Sans_Devanagari } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Stinger } from "@/components/Stinger";
import "./globals.css";

// Display: Archivo with its width axis, set condensed and heavy like a scoreboard (08-10-2026: owner asked for stronger type).
// Body: Satoshi, the site's own font (docs/REDESIGN.md section 0: "retain our website's font").
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });
const satoshi = localFont({ variable: "--font-satoshi", src: "./fonts/Satoshi-Variable.woff2", weight: "300 900", display: "swap" });

// Hindi poem on /about. Satoshi has no Devanagari, so the poem takes this one; it loads only where used.
const devanagari = Noto_Sans_Devanagari({ variable: "--font-deva", subsets: ["devanagari"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://baca-cricket.com"),
  title: { default: "BACA · 38th All India Advocates’ Cricket Tournament 2026", template: "%s · BACA 2026" },
  description:
    "Official site of the 38th All India Advocates’ Cricket Tournament, hosted by the Bombay Advocates’ Cricket Association. Mumbai and Navi Mumbai, 17–24 October 2026. Winners receive The Vijay Tulpule Trophy.",
};

export const viewport: Viewport = { themeColor: "#F5F7FA" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${satoshi.variable} ${devanagari.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{sessionStorage.getItem("baca-stinger")?document.documentElement.classList.add("stinger-seen"):sessionStorage.setItem("baca-stinger","1")}catch(e){}` }} />
      </head>
      <body>
        <Stinger />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
