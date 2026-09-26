import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { PageSweep, SmoothScroll } from "@/components/Motion";
import { Preloader } from "@/components/gems/Preloader";
import { Nav } from "@/components/Nav";
import { NewsStrip } from "@/components/NewsStrip";
import "./globals.css";

// Human Intelligence runs on one grotesque; Satoshi stands in (Fontshare free licence, fonts/FFL.txt).
const satoshi = localFont({ variable: "--font-satoshi", src: "./fonts/Satoshi-Variable.woff2", weight: "300 900" });

export const metadata: Metadata = {
  title: { default: "Late Vijay Tulpule Trophy 2026", template: "%s · Late Vijay Tulpule Trophy 2026" },
  description:
    "Official site of the Late Vijay Tulpule Trophy 2026. Hosted by the Bombay Advocates’ Cricket Association. 16 teams, Mumbai, 17–24 October.",
};

export const viewport: Viewport = { themeColor: "#f1f4ea" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={satoshi.variable} suppressHydrationWarning>
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
