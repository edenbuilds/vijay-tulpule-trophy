import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { PageSweep, SmoothScroll } from "@/components/Motion";
import { Preloader } from "@/components/gems/Preloader";
import { Nav } from "@/components/Nav";
import { NewsStrip } from "@/components/NewsStrip";
import "./globals.css";

// The whole site runs on Satoshi, kept from the first build (Fontshare free licence, fonts/FFL.txt). Weights 300 to 900; headings are 900.
const satoshi = localFont({ variable: "--font-satoshi", src: "./fonts/Satoshi-Variable.woff2", weight: "300 900" });

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
    <html lang="en-IN" className={`${satoshi.variable} ${devanagari.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(c){c.add('js');try{c.add(sessionStorage.getItem('vtt-loaded')?'no-preload':'preloading')}catch(e){c.add('no-preload')}})(document.documentElement.classList)" }} />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <PageSweep>
          <Nav />
          <NewsStrip />
          <main>{children}</main>
          <Footer />
        </PageSweep>
      </body>
    </html>
  );
}
