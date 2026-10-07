import type { Metadata } from "next";
import Image from "next/image";
import { Block, Hero } from "@/components/Sections";
import { TEAMS } from "@/lib/teams";
import { nb } from "@/lib/site";

export const metadata: Metadata = { title: "Teams" };

// One list for both widths: a dashed list in one white tile on phones, a four-column grid of logo wells from md.
// A column is 160px at 768 and 218px at 1024, so the well and the name step down there: "Punjab and Haryana" is tied with nb() and is 220px wide at 24px.
export default function Teams() {
  return (
    <>
      <Hero title="Teams" sub="Groups will be announced after the draw." />
      <Block tone="sky">
        <div className="rounded-2xl bg-white px-4 md:bg-transparent md:px-0">
          <ul className="grid md:grid-cols-4 md:gap-x-4 md:gap-y-12 lg:gap-x-6 lg:gap-y-14">
            {TEAMS.map((t) => (
              <li key={t.slug} className="flex items-center gap-4 border-b border-dashed border-navy/15 py-3 last:border-0 md:flex-col md:gap-5 md:border-0 md:py-0 md:text-center">
                <div className="relative size-14 flex-none overflow-hidden rounded-full bg-white ring-1 ring-navy/10 md:size-28 md:ring-0 lg:size-40">
                  <Image src={t.logo} alt={`${t.name} team logo`} fill sizes="(min-width: 1024px) 160px, (min-width: 768px) 112px, 56px" className="object-contain p-1.5 md:p-3 lg:p-4" />
                </div>
                <div>
                  <p className="display text-xl md:text-base lg:text-xl xl:text-2xl">{nb(t.name)}</p>
                  <p className="mt-1 text-base text-navy/70">{t.court}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Block>
    </>
  );
}
