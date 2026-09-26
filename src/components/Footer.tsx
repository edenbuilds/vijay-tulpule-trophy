import Link from "next/link";
import * as React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FOOTER_LINKS, ORG, PHOTO_CREDITS } from "@/lib/site";

// Layout from BYQ section kelvin-footer-4 (wordmark row, rule, contact + links, rule, base), set in a
// Human Intelligence inset green tile with dashed rules.
export function Footer() {
  return (
    <footer className="p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="rounded-2xl bg-mint px-4 pb-10 pt-16 text-ink md:px-8 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 pb-10 md:flex-row md:items-end md:justify-between">
            <p className="num display text-5xl md:text-7xl">VTT 2026</p>
            <p className="text-lg text-ink/70 md:text-right">{ORG.name}</p>
          </div>
          <div className="rule" />
          <div className="grid gap-10 py-12 md:grid-cols-[1fr_1fr]">
            <address className="flex flex-col gap-3 not-italic text-ink/70">
              <span className="flex gap-3"><MapPin aria-hidden="true" className="mt-0.5 size-5 flex-none text-pitch" strokeWidth={1.6} />{ORG.address}</span>
              <a className="flex w-fit gap-3 transition-colors hover:text-ink" href={`mailto:${ORG.email}`}><Mail aria-hidden="true" className="mt-0.5 size-5 flex-none text-pitch" strokeWidth={1.6} />{ORG.email}</a>
              <a className="num flex w-fit gap-3 transition-colors hover:text-ink" href={ORG.phoneHref}><Phone aria-hidden="true" className="mt-0.5 size-5 flex-none text-pitch" strokeWidth={1.6} />{ORG.phone}</a>
            </address>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-11 items-center text-ink/70 transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rule" />
          <p className="num pt-8 text-sm text-ink/55">{ORG.trust}</p>
          <p className="mt-3 text-xs leading-relaxed text-ink/50">
            Placeholder photos from Wikimedia Commons:{" "}
            {PHOTO_CREDITS.map((c, i) => (
              <React.Fragment key={c.href}>
                {i > 0 && ", "}
                <a href={c.href} className="underline underline-offset-2 hover:text-ink" target="_blank" rel="noopener noreferrer">{c.by}</a> ({c.licence})
              </React.Fragment>
            ))}
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
