import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: "Vijay Tulpule Trophy 2026", template: "%s · Vijay Tulpule Trophy 2026" },
  description:
    "Official site of the Vijay Tulpule Trophy 2026. Hosted by the Bombay Advocates’ Cricket Association. 16 teams, Mumbai, 17–24 October.",
};

export const viewport: Viewport = { themeColor: "#0e1a12" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
