"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Mark } from "@/components/brand/Mark";
import { NAV } from "@/lib/site";

// Floating inset bar: a white tile 8px from the edges that hides while you scroll down and returns
// when you scroll up. A sky pill slides under whichever link you point at and settles back on the
// current page when you leave. On phones the same tile opens into a menu with large links.
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [pill, setPill] = React.useState<{ x: number; w: number } | null>(null);
  const list = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => setOpen(false), [path]);

  React.useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      // Lenis fires repeat events at rest; only a real move of a few pixels changes direction.
      const y = window.scrollY;
      if (Math.abs(y - last) < 4) return;
      setHidden(y > 240 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure the <li>: it is the positioned box inside the list, so its offsetLeft is relative to the pill's track.
  const moveTo = React.useCallback((el: HTMLElement | null | undefined) => {
    const li = el?.parentElement;
    setPill(li ? { x: li.offsetLeft, w: li.offsetWidth } : null);
  }, []);
  const toActive = React.useCallback(
    () => moveTo(list.current?.querySelector<HTMLElement>("[aria-current=page]")),
    [moveTo],
  );

  React.useEffect(() => {
    toActive();
    window.addEventListener("resize", toActive);
    return () => window.removeEventListener("resize", toActive);
  }, [path, toActive]);

  const extra = [{ href: "/downloads", label: "Downloads" }, { href: "/ceremonies", label: "Ceremonies" }, { href: "/poem", label: "Poem" }, { href: "/contact", label: "Contact" }];

  return (
    <header
      className={`sticky top-0 z-50 px-2 pt-[calc(0.5rem+env(safe-area-inset-top))] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        hidden && !open ? "-translate-y-[calc(100%+0.5rem)]" : ""
      }`}
    >
      <div className="rounded-2xl border border-navy/10 bg-white/90 text-navy backdrop-blur-md">
        <nav aria-label="Main" className="flex h-16 items-center gap-3 pl-4 pr-2 md:pl-5">
          <Link href="/" className="num mr-auto flex min-h-11 items-center gap-2.5">
            <Mark priority className="size-10" />
            <span className="leading-none">
              <span className="block text-xl font-black uppercase tracking-tight">BACA</span>
              <span className="mt-0.5 hidden text-xs font-medium text-navy/65 sm:block">38th All India Advocates’ Cricket</span>
            </span>
          </Link>

          <ul ref={list} onMouseLeave={toActive} className="relative hidden items-center text-sm font-medium xl:flex">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 rounded-full bg-sky transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              style={{ width: pill?.w ?? 0, transform: `translateX(${pill?.x ?? 0}px)`, opacity: pill ? 1 : 0 }}
            />
            {NAV.map((n) => (
              <li key={n.href} className="relative">
                <Link
                  href={n.href}
                  aria-current={path === n.href ? "page" : undefined}
                  onMouseEnter={(e) => moveTo(e.currentTarget)}
                  onFocus={(e) => moveTo(e.currentTarget)}
                  onBlur={toActive}
                  className={`press inline-flex min-h-10 items-center rounded-full px-3.5 transition-colors ${
                    path === n.href ? "text-navy" : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="press group hidden min-h-11 items-center gap-1.5 rounded-full bg-navy pl-5 pr-4 text-sm font-semibold text-white hover:bg-navy-deep sm:inline-flex xl:ml-2"
          >
            Contact
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="press grid size-11 place-items-center rounded-full bg-sky xl:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-navy transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-navy transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </nav>

        <div
          id="mobile-menu"
          inert={!open}
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none xl:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="border-t border-dashed border-navy/15 px-4 pb-4 pt-2">
              {[...NAV, ...extra].map((n, i) => (
                <li
                  key={n.href}
                  className={`border-b border-dashed border-navy/15 transition-all duration-500 ease-out motion-reduce:transition-none ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${80 + i * 35}ms` : "0ms" }}
                >
                  <Link
                    href={n.href}
                    aria-current={path === n.href ? "page" : undefined}
                    className={`display flex min-h-14 items-center justify-between text-2xl ${path === n.href ? "text-royal" : "text-navy"}`}
                  >
                    {n.label}
                    <ArrowUpRight aria-hidden="true" className="size-5 text-navy/35" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
