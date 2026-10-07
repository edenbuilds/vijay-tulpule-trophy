import type { Metadata, Viewport } from "next";
import { Geist, Inter, Noto_Sans_Devanagari } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/gems/Preloader";
import "./globals.css";

// The current tournament brief specifies Geist for headings and Inter for body and interface text.
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

// Hindi poem on /about. Satoshi has no Devanagari, so the poem takes this one; it loads only where used.
const devanagari = Noto_Sans_Devanagari({ variable: "--font-deva", subsets: ["devanagari"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://baca-cricket.com"),
  title: { default: "BACA · 38th All India Advocates’ Cricket Tournament 2026", template: "%s · BACA 2026" },
  description:
    "Official site of the 38th All India Advocates’ Cricket Tournament, hosted by the Bombay Advocates’ Cricket Association. Mumbai and Navi Mumbai, 17–24 October 2026. Winners receive The Vijay Tulpule Trophy.",
};

export const viewport: Viewport = { themeColor: "#F5F1E8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${inter.variable} ${devanagari.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');try{if(sessionStorage.getItem('vtt-loaded'))document.documentElement.classList.add('no-preload');else document.documentElement.classList.add('preloading')}catch{document.documentElement.classList.add('no-preload')}` }} />
      </head>
      <body>
        <Preloader />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
