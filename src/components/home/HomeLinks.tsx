import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { href: "/fixtures", label: "Fixtures", line: "Dates, grounds and match information." },
  { href: "/teams", label: "Teams", line: "Sixteen teams from across India." },
  { href: "/format", label: "Format", line: "35 overs a side. How the tournament works." },
  { href: "/ceremonies", label: "Ceremonies", line: "Opening, formal events and prize presentation." },
];

export function HomeLinks() {
  return (
    <section aria-labelledby="at-a-glance-title" className="px-4 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 md:grid-cols-[0.82fr_1.18fr] md:gap-14">
          <div>
            <h2 id="at-a-glance-title" className="display max-w-[13ch] text-3xl leading-tight sm:text-4xl md:text-5xl">Sixteen Teams. One Shared Tradition.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-navy/75">Practising advocates from 15 High Courts and the Supreme Court of India meet in Mumbai for eight days of competition and fellowship.</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy/60">Different courts and cities, brought together by a long-running love of cricket.</p>
          </div>
        </div>
        <nav aria-label="Tournament information" className="mt-10 border-y border-navy/20">
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="group grid min-h-[5.5rem] grid-cols-[1fr_auto] items-center gap-3 border-b border-navy/15 py-4 last:border-0 sm:grid-cols-[0.8fr_1.2fr_auto] sm:gap-5 sm:py-5">
              <span className="display text-xl sm:text-2xl">{item.label}</span>
              <span className="hidden text-base text-navy/60 sm:block">{item.line}</span>
              <ArrowUpRight aria-hidden="true" className="size-5 text-navy/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
