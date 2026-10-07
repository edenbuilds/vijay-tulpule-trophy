import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Block, Hero } from "@/components/Sections";
import { Tiers } from "@/components/Tiers";
import { CONTACTS, ORG } from "@/lib/site";

export const metadata: Metadata = { title: "Sponsors" };

const WHY = [
  ["Reach", "Connect with members of India’s legal fraternity."],
  ["Visibility", "Appear across tournament grounds, events and communication."],
  ["Association", "Support a tournament with decades of history."],
];

const OPPORTUNITIES = [
  ["Title Partner", "Place your organisation at the highest level of tournament branding."],
  ["Presenting Partner", "Receive prominent tournament-wide visibility alongside the primary tournament identity."],
  ["Official Partner", "Partner with the tournament within an approved product or service category."],
  ["Awards Partner", "Associate your organisation with tournament or match awards."],
  ["Ground Partner", "Build visibility around a selected tournament venue."],
  ["Associate Partner", "Support the tournament through a flexible partnership suited to your organisation."],
];

const SPONSOR_VISIBILITY = ["Tournament branding", "Ground branding", "Opening ceremony presence", "Finals visibility", "Programme presence", "Streaming visibility", "Award partnerships", "Official tournament communication"];

const PAYMENT = [
  ["Payee", "Bombay Advocates Cricket Association"],
  ["Bank", "Bank of India, Main Branch"],
  ["IFSC", "BKID0000001"],
  ["Account Number", "000110210000057"],
];

const TERMS = [
  "Sponsorship amounts will not be refundable if tournament play is cancelled because of a natural calamity or a national or state emergency.",
  "If the organisers cancel the tournament for another unavoidable reason, the sponsorship amount will be refunded.",
  "Once sponsorship has been paid and confirmed, it will not be refundable if the sponsor chooses to withdraw.",
  "All final branding, placement and activation rights remain subject to organiser approval.",
];

export default function Sponsors() {
  return (
    <>
      <Hero title="Sponsor The 38th All India Advocates’ Cricket Tournament" sub="Put your organisation alongside one of the legal fraternity’s longest-running cricket traditions. The tournament brings advocates from across India together for eight days of cricket in Mumbai and Navi Mumbai. Sponsorship opportunities begin at ₹5,00,000.">
        <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-navy px-5 font-semibold text-white transition-colors hover:bg-royal">Enquire About Sponsorship <ArrowRight aria-hidden="true" className="size-4" /></Link>
      </Hero>

      <Block title="Why Partner" tone="white">
        <ul className="grid gap-x-8 sm:grid-cols-3">
          {WHY.map(([title, text]) => <li key={title} className="border-t border-navy/15 py-5"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 max-w-sm leading-relaxed text-navy/70">{text}</p></li>)}
        </ul>
      </Block>

      <Block title="Sponsorship Tiers" tone="sky">
        <Tiers />
      </Block>

      <Block title="Partnership Opportunities" tone="white">
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {OPPORTUNITIES.map(([title, text]) => <li key={title} className="border-t border-navy/15 py-5"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 max-w-lg leading-relaxed text-navy/70">{text}</p></li>)}
        </ul>
      </Block>

      <Block title="Sponsor Visibility" tone="snow">
        <p className="max-w-3xl text-lg text-navy/75">Depending on the selected partnership, sponsor visibility may include the following. Exact rights and placements depend on the agreed sponsorship tier.</p>
        <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
          {SPONSOR_VISIBILITY.map((item) => <li key={item} className="border-t border-navy/15 py-3 text-base">{item}</li>)}
        </ul>
      </Block>

      <Block title="Payment And Sponsorship Contact" tone="navy">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-xl font-semibold">Payment Details</h3>
            <dl className="mt-4">
              {PAYMENT.map(([label, value]) => <div key={label} className="grid grid-cols-[9rem_1fr] gap-3 border-t border-white/15 py-3"><dt className="text-sm text-white/65">{label}</dt><dd className="num break-all text-sm">{value}</dd></div>)}
            </dl>
            <p className="mt-3 text-sm text-white/70">Payment may be made through NEFT, RTGS, UPI or net banking. A receipt will be issued following payment.</p>
          </div>
          <address className="not-italic">
            <h3 className="text-xl font-semibold">{CONTACTS[0].name}</h3>
            <p className="mt-1 text-white/70">Hon. Secretary, BACA</p>
            <p className="mt-3 leading-relaxed text-white/80">{ORG.address}</p>
            <a href={`mailto:${ORG.email}`} className="mt-2 flex min-h-11 w-fit items-center underline decoration-white/40 underline-offset-4 hover:decoration-white">{ORG.email}</a>
            <a href={ORG.phoneHref} className="num flex min-h-11 w-fit items-center underline decoration-white/40 underline-offset-4 hover:decoration-white">{ORG.phone}</a>
            <Link href="/contact" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 font-semibold text-navy hover:bg-sky">Contact The Organisers <ArrowRight aria-hidden="true" className="size-4" /></Link>
          </address>
        </div>
      </Block>

      <Block title="Sponsorship Terms" tone="white">
        <ul className="max-w-4xl divide-y divide-navy/10 border-y border-navy/10">
          {TERMS.map((term) => <li key={term} className="py-4 text-base leading-relaxed text-navy/75">{term}</li>)}
        </ul>
      </Block>
    </>
  );
}
