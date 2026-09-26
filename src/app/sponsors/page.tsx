import type { Metadata } from "next";
import { Block, Hero } from "@/components/Sections";
import { Tiers } from "@/components/Tiers";
import { ORG } from "@/lib/site";

export const metadata: Metadata = { title: "Sponsors" };

const RIGHTS = [
  ["Title sponsor", "Event name and main board."],
  ["Streaming partner", "Pre-roll."],
  ["Live picture", "Max two logos."],
];

export default function Sponsors() {
  return (
    <>
      <Hero title="Sponsors" sub="Ground boards, programme, stream" />
      <Block tone="cream">
        <Tiers cta="Contact" />
      </Block>
      <Block title="Rights" tone="paper">
        <dl className="grid gap-px overflow-hidden rounded-xl bg-ink/10 md:grid-cols-3">
          {RIGHTS.map(([k, v]) => (
            <div key={k} className="bg-cream p-6 md:p-8">
              <dt className="text-xl font-bold">{k}</dt>
              <dd className="mt-3 text-ink/70">{v}</dd>
            </div>
          ))}
        </dl>
      </Block>
      <Block tone="cream">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="display text-3xl md:text-4xl">Payment</h2>
            <dl className="num mt-6 grid grid-cols-[6rem_1fr] gap-x-4 gap-y-2 text-ink/75">
              <dt className="text-ink/50">Payee</dt>
              <dd>Bombay Advocates Cricket Association</dd>
              <dt className="text-ink/50">Bank</dt>
              <dd>Bank of India, Main branch</dd>
              <dt className="text-ink/50">IFSC</dt>
              <dd>BKID0000001</dd>
              <dt className="text-ink/50">Account</dt>
              <dd>000110210000057</dd>
            </dl>
            <p className="mt-4 text-ink/60">Receipt issued.</p>
          </div>
          <div>
            <h2 className="display text-3xl md:text-4xl">Contact</h2>
            <address className="mt-6 flex flex-col gap-2 not-italic text-ink/75">
              <span className="font-semibold text-ink">Rajiv Patil, Secretary, BACA</span>
              <span>{ORG.address}</span>
              <a className="w-fit underline decoration-brass underline-offset-4" href={`mailto:${ORG.email}`}>{ORG.email}</a>
              <a className="num w-fit underline decoration-brass underline-offset-4" href={ORG.phoneHref}>{ORG.phone}</a>
            </address>
          </div>
        </div>
      </Block>
    </>
  );
}
