import type { Metadata } from "next";
import { Downloads } from "@/components/Downloads";
import { Block, Hero } from "@/components/Sections";
import { Tiers } from "@/components/Tiers";
import { CONTACTS, ORG, PARTNERS, TERMS, tie } from "@/lib/site";

export const metadata: Metadata = { title: "Sponsors" };

const RIGHTS = [
  ["Title sponsor", "Event name and main board."],
  ["Streaming partner", "Pre-roll."],
  ["Live picture", "Max two logos."],
];

const PAYMENT = [
  ["Payee", "Bombay Advocates Cricket Association"],
  ["Bank", "Bank of India, Main branch"],
  ["IFSC", "BKID0000001"],
  ["Account", "000110210000057"],
];

// One definition list per heading; the dashed rule and rows match the committee list used elsewhere on the site.
function Rows({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div>
      <h2 className="display uppercase text-3xl md:text-5xl">{title}</h2>
      <dl className="rule mt-6 md:mt-8">
        {rows.map(([k, v]) => (
          <div key={k} className="row-line border-b border-dashed border-navy/15 py-4">
            <dt className="text-lg font-semibold">{k}</dt>
            <dd className="mt-1 text-navy/70">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Sponsors() {
  return (
    <>
      <Hero title="Sponsors" sub="Sponsorship tiers start at ₹5,00,000." />
      <Block title="Tiers" tone="white">
        <Tiers cta="Contact" />
        <p className="mt-8 max-w-3xl text-lg text-navy/70">
          {tie("Every sponsor is named, by tier, at the opening, at the finals and at every ground. Sizes and placings follow the tier.")}
        </p>
      </Block>
      <Block tone="snow">
        <div className="grid gap-12 rounded-2xl bg-white p-5 md:grid-cols-2 md:gap-16 md:p-10">
          <Rows title="Partner roles" rows={PARTNERS} />
          <Rows title="Rights" rows={RIGHTS} />
        </div>
      </Block>
      <Block tone="navy">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="display uppercase text-3xl md:text-5xl">Payment</h2>
            <dl className="num rule mt-6 md:mt-8">
              {PAYMENT.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-x-4 border-b border-dashed border-white/20 py-3">
                  <dt className="text-white/70">{k}</dt>
                  <dd className="break-words">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-white/70">NEFT, RTGS, UPI or net banking. Receipt issued.</p>
          </div>
          <div>
            <h2 className="display uppercase text-3xl md:text-5xl">Contact</h2>
            <address className="mt-6 flex flex-col gap-2 not-italic md:mt-8">
              <span className="text-lg font-semibold">{CONTACTS[0].name}, {CONTACTS[0].role}, BACA</span>
              <span className="text-white/70">{ORG.address}</span>
              <a className="flex min-h-11 w-fit items-center underline decoration-white/40 underline-offset-4 hover:decoration-white" href={`mailto:${ORG.email}`}>{ORG.email}</a>
              <a className="num flex min-h-11 w-fit items-center underline decoration-white/40 underline-offset-4 hover:decoration-white" href={ORG.phoneHref}>{ORG.phone}</a>
            </address>
          </div>
        </div>
      </Block>
      <Block title="Terms" tone="sky">
        <ol className="rule grid max-w-3xl">
          {TERMS.map((t, i) => (
            <li key={i} className="num grid grid-cols-[2.5rem_1fr] border-b border-dashed border-navy/15 py-4 text-lg">
              <span className="font-semibold">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
      </Block>
      <Block title="Sponsorship brief" tone="snow">
        <Downloads only={["Sponsorship"]} />
      </Block>
    </>
  );
}
