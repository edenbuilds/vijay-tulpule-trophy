import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACTS, FOOTER_LINKS, HOSTS_LINE, ORG, tie } from "@/lib/site";
import { HostsStrip } from "@/components/Hosts";
import { Ball } from "@/components/brand/Ball";
import { Logo } from "@/components/brand/Logo";
import { Stroke } from "@/components/brand/Stroke";

// Navy tile: reversed logo, contact and links in white, the five host marks on one white tile (their artwork is drawn for
// light grounds), one brand stroke clipped at the top right edge with the ball leading it. Dashed rules in white at 16%.
export function Footer() {
  return (
    <footer className="p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="relative isolate overflow-hidden rounded-2xl bg-navy-deep px-4 pb-10 pt-12 text-white md:px-8 md:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute right-1 top-5 -z-10 w-[13rem] md:right-2 md:top-8 md:w-[34rem]">
          <Stroke className="w-full" />
          <Ball className="absolute right-[1%] top-[-4%] size-10 md:size-[4.5rem]" />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 pb-10 md:pb-12">
            <Logo variant="reversed" className="w-44 md:w-72" sizes="(min-width: 768px) 288px, 176px" />
            <p className="text-lg text-white/70">{ORG.name}</p>
          </div>
          <div className="rule" />
          <div className="grid gap-10 py-12 md:grid-cols-[1fr_1fr]">
            <address className="flex flex-col gap-3 not-italic text-white/75">
              <span className="flex gap-3"><MapPin aria-hidden="true" className="mt-0.5 size-5 flex-none text-sky" strokeWidth={1.6} />{ORG.address}</span>
              <a className="flex min-h-11 w-fit items-center gap-3 transition-colors hover:text-white" href={`mailto:${ORG.email}`}><Mail aria-hidden="true" className="mt-0.5 size-5 flex-none text-sky" strokeWidth={1.6} /><span className="u-grow">{ORG.email}</span></a>
              {CONTACTS.map((c) => (
                <a key={c.tel} className="num flex min-h-11 w-fit items-center gap-3 transition-colors hover:text-white" href={`tel:${c.tel}`}><Phone aria-hidden="true" className="mt-0.5 size-5 flex-none text-sky" strokeWidth={1.6} /><span className="u-grow">{c.name}, <span className="whitespace-nowrap">{c.phone}</span></span></a>
              ))}
            </address>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-11 items-center font-medium text-white transition-colors hover:text-sky">
                    <span className="u-grow">{tie(l.label)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rule" />
          <div className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-fit rounded-2xl bg-white p-3 md:p-4">
              <HostsStrip />
            </div>
            <p className="max-w-md text-white/75 lg:text-right">{HOSTS_LINE}</p>
          </div>
          <div className="rule" />
          <p className="num pt-8 text-sm text-white/65">{ORG.trust}</p>
        </div>
      </div>
    </footer>
  );
}
