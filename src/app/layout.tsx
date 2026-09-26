import type { Metadata, Viewport } from "next";
import { Oswald } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { PageSweep, SmoothScroll } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import "./globals.css";

// Fit Trainer type pair: Oswald display, Satoshi body (Fontshare free licence, fonts/FFL.txt).
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const satoshi = localFont({ variable: "--font-satoshi", src: "./fonts/Satoshi-Variable.woff2", weight: "300 900" });

export const metadata: Metadata = {
  title: { default: "Late Vijay Tulpule Trophy 2026", template: "%s · Late Vijay Tulpule Trophy 2026" },
  description:
    "Official site of the Late Vijay Tulpule Trophy 2026. Hosted by the Bombay Advocates’ Cricket Association. 16 teams, Mumbai, 17–24 October.",
};

export const viewport: Viewport = { themeColor: "#070908" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${oswald.variable} ${satoshi.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        <PageSweep>
          <Nav />
          <main>{children}</main>
          <Footer />
        </PageSweep>
      </body>
    </html>
  );
}
