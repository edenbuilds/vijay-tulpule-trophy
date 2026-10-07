import Link from "next/link";
import { ArrowUpRight, Camera, Mail, MapPin, Phone } from "lucide-react";
import { CONTACTS, HOSTS_LINE, ORG } from "@/lib/site";
import { HostsStrip } from "@/components/Hosts";
import { Logo } from "@/components/brand/Logo";

const GROUPS = [
  { title: "Tournament", links: [["Fixtures", "/fixtures"], ["Teams", "/teams"], ["Format", "/format"], ["Ceremonies", "/ceremonies"]] },
  { title: "BACA", links: [["About BACA", "/about"], ["The Trophy", "/trophy"], ["Gallery", "/gallery"], ["Poem", "/poem"]] },
  { title: "Information", links: [["Sponsors", "/sponsors"], ["Downloads", "/downloads"], ["Contact", "/contact"]] },
];

export function Footer() {
  return (
    <footer className="bg-navy px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-12 text-white sm:px-8 md:pt-16 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/20 pb-7">
          <div>
            <Link href="/" aria-label="BACA home" className="inline-flex min-h-11 items-center">
              <Logo variant="reversed" className="w-40" sizes="160px" />
            </Link>
            <p className="mt-2 text-sm text-white/65">{ORG.name}</p>
          </div>
          <a href="https://www.instagram.com/bacacricket/" target="_blank" rel="noopener noreferrer" className="flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
            <Camera aria-hidden="true" className="size-4" strokeWidth={1.7} /> Instagram <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="grid gap-8 border-b border-white/20 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold text-white/60">{group.title}</h2>
              <ul className="mt-2">
                {group.links.map(([label, href]) => (
                  <li key={href}><Link href={href} className="flex min-h-10 items-center text-sm text-white/85 underline-offset-4 hover:text-white hover:underline">{label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}

          <address className="not-italic">
            <h2 className="text-sm font-semibold text-white/60">Contact</h2>
            <p className="mt-2 flex gap-2 text-sm leading-relaxed text-white/85"><MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sky" />{ORG.address}</p>
            <a href={`mailto:${ORG.email}`} className="mt-2 flex min-h-10 items-center gap-2 text-sm text-white/85 hover:text-white"><Mail aria-hidden="true" className="size-4 shrink-0 text-sky" />{ORG.email}</a>
            <a href={ORG.phoneHref} className="flex min-h-10 items-center gap-2 text-sm text-white/85 hover:text-white"><Phone aria-hidden="true" className="size-4 shrink-0 text-sky" />{CONTACTS[0].name} · {CONTACTS[0].phone}</a>
          </address>
        </div>

        <div className="grid gap-5 border-b border-white/20 py-7 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
          <div className="w-fit rounded-lg bg-white p-2"><HostsStrip /></div>
          <p className="max-w-2xl text-sm leading-relaxed text-white/75">{HOSTS_LINE}</p>
        </div>
        <p className="num pt-6 text-xs text-white/60">{ORG.trust}</p>
      </div>
    </footer>
  );
}
