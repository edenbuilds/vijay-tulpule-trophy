"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Ball } from "@/components/Motion";
import { NAV } from "@/lib/site";

// Human Intelligence navbar: frosted white bar on a dashed rule, pill links, one pill CTA.
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [path]);

  const link = (href: string) =>
    `inline-flex min-h-9 items-center rounded-full px-3.5 transition-colors duration-200 ${
      path === href ? "bg-mint text-ink" : "text-ink/70 hover:bg-mist hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-dashed border-ink/15 bg-paper/80 pt-[env(safe-area-inset-top)] text-ink backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-8">
        <Link href="/" className="num mr-auto flex items-center gap-2 text-lg font-bold tracking-tight">
          <Ball className="size-5" />
          VTT 2026
        </Link>
        <ul className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className={link(n.href)} aria-current={path === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="hidden min-h-11 items-center rounded-full bg-pitch px-5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-hover sm:inline-flex"
        >
          Contact
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>
      </nav>
      <div id="mobile-menu" hidden={!open} className="border-t border-dashed border-ink/15 bg-paper px-4 pb-6 lg:hidden">
        <ul className="flex flex-col pt-2">
          {[...NAV, { href: "/baca", label: "BACA" }, { href: "/contact", label: "Contact" }].map((n) => (
            <li key={n.href} className="border-b border-dashed border-ink/15">
              <Link
                href={n.href}
                aria-current={path === n.href ? "page" : undefined}
                className={`flex min-h-12 items-center text-lg font-semibold ${path === n.href ? "text-pitch" : "text-ink"}`}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
