"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Handshake, ListOrdered, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: "/fixtures", label: "Fixtures", line: "Dates and grounds, day by day", Icon: CalendarDays, bg: "md:bg-white" },
  { href: "/teams", label: "Teams", line: "Sixteen teams from across India", Icon: Users, bg: "md:bg-sky-deep" },
  { href: "/format", label: "Format", line: "Points, tie-breaks and awards", Icon: ListOrdered, bg: "md:bg-white" },
  { href: "/sponsors", label: "Sponsors", line: "Tiers from ₹5 lakh", Icon: Handshake, bg: "md:bg-sky-deep" },
];

export function HomeLinks() {
  const list = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const root = list.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-stack-card]"));
      cards.slice(0, -1).forEach((card, index) => {
        gsap.to(card.querySelector("a"), {
          scale: 0.975,
          rotateX: -2.5,
          transformPerspective: 1200,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 92%",
            end: "top 11rem",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <nav ref={list} aria-label="Sections" className="mx-2 mt-2 rounded-2xl bg-white px-4 md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-1 lg:gap-0 md:rounded-none md:bg-transparent md:px-0">
      {LINKS.map(({ href, label, line, Icon, bg }, i) => (
        <div
          key={href}
          data-stack-card
          style={{ "--stack-top": `${6 + i * 5}rem`, zIndex: i + 1 } as React.CSSProperties}
          className="border-b border-dashed border-navy/15 last:border-0 focus-within:z-40 md:border-0 lg:sticky lg:top-[var(--stack-top)] motion-reduce:lg:static"
        >
          <Link
            href={href}
            className={`press group flex min-h-16 items-center justify-between gap-4 py-4 md:min-h-48 md:flex-col md:items-stretch md:justify-between md:rounded-2xl md:p-8 md:hover:bg-sky-deep lg:min-h-56 lg:flex-row lg:items-start lg:rounded-2xl ${bg} motion-reduce:lg:transform-none`}
          >
            <span className="hidden items-start justify-between md:flex">
              <Icon aria-hidden="true" className="size-6 text-royal transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1.6} />
              <ArrowUpRight aria-hidden="true" className="size-5 text-navy/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <span>
              <span className="display block text-xl md:text-3xl">{label}</span>
              <span className="mt-1 block text-sm text-navy/60">{line}</span>
            </span>
            <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-navy/40 md:hidden" />
          </Link>
        </div>
      ))}
    </nav>
  );
}
