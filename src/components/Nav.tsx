"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { NAV } from "@/lib/site";

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [path]);

  const link = (href: string) =>
    `relative py-2 transition-colors duration-200 hover:text-[#6fae7c] ${
      path === href ? "text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-brass" : "text-white/75"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-brass bg-night pt-[env(safe-area-inset-top)] text-white">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 md:px-8">
        <Link href="/" className="num mr-auto text-lg font-bold tracking-tight [font-stretch:115%]">
          VTT 2026
        </Link>
        <ul className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className={link(n.href)} aria-current={path === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/live"
          className="inline-flex min-h-11 items-center rounded-full bg-brass px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-white"
        >
          Live
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="-mr-2 grid size-11 place-items-center lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>
      </nav>
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/10 bg-night px-4 pb-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {[...NAV, { href: "/baca", label: "BACA" }, { href: "/contact", label: "Contact" }].map((n) => (
            <li key={n.href} className="border-b border-white/10">
              <Link
                href={n.href}
                aria-current={path === n.href ? "page" : undefined}
                className={`flex min-h-12 items-center text-lg font-semibold ${path === n.href ? "text-brass" : "text-white"}`}
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
