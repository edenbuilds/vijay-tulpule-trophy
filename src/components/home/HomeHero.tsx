import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EVENT, ORG } from "@/lib/site";
import { TOURNAMENT } from "@/lib/schedule";
import { PH } from "@/lib/photos";

const FACTS = [
  ["17—24 Oct", "2026"],
  ["16", "Teams"],
  [`${EVENT.overs}`, "Overs a side"],
  ["Mumbai", "and Navi Mumbai"],
];

export function HomeHero() {
  return (
    <section aria-labelledby="home-title" className="px-4 pb-8 pt-5 sm:px-8 lg:px-12 lg:pt-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid min-h-[34rem] items-stretch border-b border-navy/20 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-center py-10 sm:py-14 lg:py-16 lg:pr-12">
            <h1 id="home-title" className="display max-w-[17ch] text-[clamp(2.5rem,4.8vw,4.8rem)] leading-[1.01]">38th All India Advocates’ Cricket Tournament 2026</h1>
            <p className="mt-6 max-w-lg text-xl leading-relaxed text-navy/80 sm:text-2xl">Eight days of cricket. Sixteen teams. One legal fraternity.</p>
            <p className="mt-4 text-base font-medium text-navy/65">{TOURNAMENT.span} <span aria-hidden="true">·</span> Mumbai and Navi Mumbai</p>
            <p className="mt-1 text-sm text-navy/60">Hosted by the {ORG.name}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/fixtures" className="inline-flex min-h-12 items-center gap-3 border border-navy bg-navy px-5 font-semibold text-white transition-colors hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal">
                View Fixtures <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href="/teams" className="inline-flex min-h-12 items-center gap-2 border-b border-navy/35 font-semibold text-navy transition-colors hover:border-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal">
                Meet the Teams <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
          <figure className="relative min-h-[19rem] overflow-hidden bg-navy/10 lg:min-h-0">
            <Image src={PH.hero.src} alt={PH.hero.alt} fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-navy/90 px-5 py-4 text-sm text-white sm:px-7 sm:py-5">
              <span>India’s advocates, together on the field</span>
              <span className="shrink-0 text-white/70">Mumbai · 2026</span>
            </figcaption>
          </figure>
        </div>
        <dl className="grid grid-cols-2 border-b border-navy/20 sm:grid-cols-4">
          {FACTS.map(([value, label], index) => (
            <div key={label} className={`py-4 sm:py-5 ${index ? "border-l border-navy/15 pl-4 sm:pl-6" : ""}`}>
              <dt className="display text-xl sm:text-2xl">{value}</dt>
              <dd className="mt-1 text-sm text-navy/60">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
