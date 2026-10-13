"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Mark } from "@/components/brand/Mark";
import { motion, useScroll, useSpring } from "motion/react";

const TOURNAMENT = [
  { href: "/fixtures", label: "Fixtures" },
  { href: "/teams", label: "Teams" },
  { href: "/format", label: "Format" },
  { href: "/ceremonies", label: "Ceremonies" },
];

const PRIMARY = [
  { href: "/trophy", label: "The Trophy" },
  { href: "/about", label: "About BACA" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sponsors", label: "Sponsors" },
];

const active = (path: string, href: string) => path === href || (href !== "/" && path.startsWith(`${href}/`));

export function Nav() {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tournamentOpen, setTournamentOpen] = React.useState(false);
  const root = React.useRef<HTMLElement>(null);
  const hasTournamentPage = TOURNAMENT.some((item) => active(path, item.href));
  // After motion.dev "scroll highlight": one pill slides to the hovered link and rests on the current page; a red line tracks page scroll.
  const [hovered, setHovered] = React.useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const lit = hovered ?? [{ href: "/" }, ...PRIMARY].find((i) => i.href === "/" ? path === "/" : active(path, i.href))?.href;
  const pill = (href: string) => lit === href && <motion.span layoutId="nav-pill" aria-hidden="true" className="absolute inset-0 -z-10 rounded-md bg-sky" transition={{ type: "spring", bounce: 0.15, duration: 0.4 }} />;

  React.useEffect(() => {
    setMobileOpen(false);
    setTournamentOpen(false);
  }, [path]);

  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) {
        setMobileOpen(false);
        setTournamentOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setTournamentOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const linkClass = (href: string) =>
    `press relative isolate inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors hover:text-royal ${active(path, href) ? "text-royal" : "text-navy/75"}`;

  return (
    <header ref={root} className="sticky top-0 z-50 bg-snow/95 px-3 pt-[calc(0.5rem+env(safe-area-inset-top))] backdrop-blur-sm sm:px-5">
      <nav aria-label="Main" className="relative mx-auto flex min-h-16 max-w-[1440px] items-center gap-3 rounded-xl border border-navy/10 bg-white px-3 sm:px-4">
        <motion.span aria-hidden="true" style={{ scaleX: progress }} className="absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-full bg-red" />
        <Link href="/" aria-label="BACA home" className="mr-auto flex min-h-11 shrink-0 items-center gap-2.5">
          <Mark priority className="size-9" />
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight">BACA</span>
            <span className="hidden text-xs text-navy/60 sm:block">38th All India Advocates’ Cricket</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 min-[1180px]:flex">
          <Link href="/" aria-current={path === "/" ? "page" : undefined} className={linkClass("/")} onMouseEnter={() => setHovered("/")} onMouseLeave={() => setHovered(null)}>{pill("/")}Home</Link>
          <div className="relative">
            <button
              type="button"
              aria-expanded={tournamentOpen}
              aria-controls="tournament-menu"
              onClick={() => setTournamentOpen((open) => !open)}
              className={`press inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors hover:text-royal ${hasTournamentPage ? "text-royal" : "text-navy/75"}`}
            >
              Tournament
              <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${tournamentOpen ? "rotate-180" : ""}`} />
            </button>
            {tournamentOpen && (
              <ul id="tournament-menu" className="absolute left-0 top-full z-20 mt-2 w-52 rounded-xl border border-navy/10 bg-white p-2 shadow-lg">
                {TOURNAMENT.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={path === item.href ? "page" : undefined} className="press flex min-h-11 items-center rounded-lg px-3 text-sm text-navy/80 hover:bg-sky hover:text-navy">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {PRIMARY.map((item) => (
            <Link key={item.href} href={item.href} aria-current={path === item.href ? "page" : undefined} className={linkClass(item.href)} onMouseEnter={() => setHovered(item.href)} onMouseLeave={() => setHovered(null)}>{pill(item.href)}{item.label}</Link>
          ))}
        </div>

        <Link href="/fixtures" className="hidden min-h-11 shrink-0 items-center gap-2 rounded-lg bg-navy px-4 text-sm font-semibold text-white transition-colors hover:bg-royal min-[1180px]:inline-flex">
          View Fixtures <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
          className="press grid size-11 shrink-0 place-items-center rounded-lg bg-sky min-[1180px]:hidden"
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-5 bg-navy transition-transform ${mobileOpen ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-navy transition-transform ${mobileOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="absolute inset-x-3 top-[calc(100%-0.25rem)] z-20 mx-auto max-h-[calc(100dvh-6rem)] max-w-[1440px] overflow-y-auto rounded-b-xl border border-t-0 border-navy/10 bg-white px-4 pb-5 shadow-lg sm:inset-x-5 min-[1180px]:hidden">
          <Link href="/fixtures" className="mt-3 flex min-h-12 items-center justify-between rounded-lg bg-navy px-4 font-semibold text-white">
            View Fixtures <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
          <ul className="mt-3 divide-y divide-navy/10">
            <li><Link href="/" aria-current={path === "/" ? "page" : undefined} className="flex min-h-12 items-center text-lg font-medium">Home</Link></li>
            <li className="py-2">
              <button type="button" aria-expanded={tournamentOpen} aria-controls="mobile-tournament-menu" onClick={() => setTournamentOpen((open) => !open)} className="flex min-h-12 w-full items-center justify-between text-lg font-medium">
                Tournament <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${tournamentOpen ? "rotate-180" : ""}`} />
              </button>
              {tournamentOpen && (
                <ul id="mobile-tournament-menu" className="border-l border-navy/15 pl-4">
                  {TOURNAMENT.map((item) => <li key={item.href}><Link href={item.href} aria-current={path === item.href ? "page" : undefined} className="flex min-h-11 items-center text-base text-navy/75">{item.label}</Link></li>)}
                </ul>
              )}
            </li>
            {PRIMARY.map((item) => <li key={item.href}><Link href={item.href} aria-current={path === item.href ? "page" : undefined} className="flex min-h-12 items-center text-lg font-medium">{item.label}</Link></li>)}
            <li><Link href="/contact" className="flex min-h-12 items-center text-lg font-medium">Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
