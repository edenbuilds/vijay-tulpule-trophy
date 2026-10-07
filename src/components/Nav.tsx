"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Mark } from "@/components/brand/Mark";

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
    `press inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors hover:text-royal ${active(path, href) ? "text-royal" : "text-navy/75"}`;

  return (
    <header ref={root} className="sticky top-0 z-50 border-b border-navy/15 bg-paper/95 px-3 pt-[calc(0.35rem+env(safe-area-inset-top))] sm:px-5">
      <nav aria-label="Main" className="mx-auto flex min-h-16 max-w-[1440px] items-center gap-3 px-1 sm:px-2">
        <Link href="/" aria-label="BACA home" className="mr-auto flex min-h-11 shrink-0 items-center gap-2.5">
          <Mark priority className="size-9" />
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight">BACA</span>
            <span className="hidden text-xs text-navy/60 sm:block">38th All India Advocates’ Cricket</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 min-[1180px]:flex">
          <Link href="/" aria-current={path === "/" ? "page" : undefined} className={linkClass("/")}>Home</Link>
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
              <ul id="tournament-menu" className="absolute left-0 top-full z-20 mt-2 w-52 border border-navy/15 bg-paper-light p-2 shadow-lg">
                {TOURNAMENT.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={path === item.href ? "page" : undefined} className="press flex min-h-11 items-center border-b border-navy/10 px-3 text-sm text-navy/80 hover:bg-sky hover:text-navy last:border-0">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {PRIMARY.map((item) => (
            <Link key={item.href} href={item.href} aria-current={path === item.href ? "page" : undefined} className={linkClass(item.href)}>{item.label}</Link>
          ))}
        </div>

        <Link href="/fixtures" className="hidden min-h-11 shrink-0 items-center gap-2 border border-navy bg-navy px-4 text-sm font-semibold text-white transition-colors hover:bg-navy-deep min-[1180px]:inline-flex">
          View Fixtures <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
          className="press grid size-11 shrink-0 place-items-center border border-navy/20 bg-paper-light min-[1180px]:hidden"
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-5 bg-navy transition-transform ${mobileOpen ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-navy transition-transform ${mobileOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="absolute inset-x-3 top-full z-20 mx-auto max-h-[calc(100dvh-6rem)] max-w-[1440px] overflow-y-auto border border-t-0 border-navy/15 bg-paper-light px-4 pb-5 shadow-lg sm:inset-x-5 min-[1180px]:hidden">
          <Link href="/fixtures" className="mt-3 flex min-h-12 items-center justify-between border-b border-navy bg-navy px-4 font-semibold text-white">
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
