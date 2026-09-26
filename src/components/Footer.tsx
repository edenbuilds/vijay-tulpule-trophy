import Link from "next/link";
import { FOOTER_LINKS, ORG } from "@/lib/site";

// Layout from BYQ section kelvin-footer-4: wordmark row, rule, contact + links, rule, base.
export function Footer() {
  return (
    <footer className="bg-night pb-[calc(3.5rem+env(safe-area-inset-bottom))] pt-16 text-white md:pt-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-4 pb-10 md:flex-row md:items-end md:justify-between">
          <p className="num text-4xl font-bold tracking-tight [font-stretch:115%] md:text-6xl">VTT 2026</p>
          <p className="text-lg text-white/70 md:text-right">{ORG.name}</p>
        </div>
        <div className="h-px bg-pitch/60" />
        <div className="grid gap-10 py-12 md:grid-cols-[1fr_1fr]">
          <address className="flex flex-col gap-3 not-italic text-white/65">
            <span>{ORG.address}</span>
            <a className="w-fit transition-colors duration-[400ms] hover:text-white" href={`mailto:${ORG.email}`}>{ORG.email}</a>
            <a className="num w-fit transition-colors duration-[400ms] hover:text-white" href={ORG.phoneHref}>{ORG.phone}</a>
          </address>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex min-h-11 items-center text-white/65 transition-colors duration-[400ms] hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-px bg-white/10" />
        <p className="num pt-8 text-sm text-white/50">{ORG.trust}</p>
      </div>
    </footer>
  );
}
