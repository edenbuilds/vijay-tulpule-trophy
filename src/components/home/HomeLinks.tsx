import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { href: "/fixtures", label: "Fixtures", line: "Dates and grounds for each day." },
  { href: "/teams", label: "Teams", line: "Meet all 16 participating teams." },
  { href: "/format", label: "Format", line: "35 overs per side. See how the tournament works." },
  { href: "/ceremonies", label: "Ceremonies", line: "Opening, formal events and prize presentation." },
];

export function HomeLinks() {
  return (
    <section aria-labelledby="at-a-glance-title" className="px-4 py-14 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <h2 id="at-a-glance-title" className="display text-3xl">Your tournament guide</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="group flex min-h-36 flex-col justify-between rounded-xl border border-navy/15 bg-white p-5 transition-colors hover:border-royal/50 hover:bg-sky focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal sm:p-6">
              <span className="flex items-start justify-between gap-4">
                <span className="display text-2xl">{item.label}</span>
                <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-royal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span>
                <span className="block text-base leading-relaxed text-navy/70">{item.line}</span>
                <span className="mt-4 inline-block text-sm font-semibold text-royal">View {item.label}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
