import type { Metadata } from "next";
import { Downloads } from "@/components/Downloads";
import { Block, Hero } from "@/components/Sections";
import { Tiers } from "@/components/Tiers";
import { ORG, PARTNERS, PHOTOS, TERMS } from "@/lib/site";

export const metadata: Metadata = { title: "Sponsors" };

const RIGHTS = [
  ["Title sponsor", "Event name and main board."],
  ["Streaming partner", "Pre-roll."],
  ["Live picture", "Max two logos."],
];

const MOMENTS = ["Opening", "End of the league", "Final", "Every venue"];

export default function Sponsors() {
  return (
    <>
      <Hero title="Sponsors" sub="Ground boards, programme, stream" photo={PHOTOS.crowd} />
      <Block tone="cream">
        <Tiers cta="Contact" />
        <p className="mt-8 max-w-3xl text-lg text-ink/70">
          Every sponsor is named, by tier, at these moments. Sizes and placings follow the tier.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {MOMENTS.map((m) => (
            <li key={m} className="lift rounded-full bg-mint px-4 py-2 font-medium">{m}</li>
          ))}
        </ul>
      </Block>
      <Block title="Partner roles" tone="paper">
        <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map(([k, v]) => (
            <div key={k} className="lift rounded-2xl bg-mist p-6 hover:bg-mint md:p-8">
              <dt className="text-xl font-bold">{k}</dt>
              <dd className="mt-3 text-ink/70">{v}</dd>
            </div>
          ))}
        </dl>
      </Block>
      <Block title="Rights" tone="paper">
        <dl className="grid gap-2 md:grid-cols-3">
          {RIGHTS.map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-mist p-6 md:p-8">
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
            <p className="mt-4 text-ink/60">NEFT, RTGS, UPI or net banking. Receipt issued.</p>
          </div>
          <div>
            <h2 className="display text-3xl md:text-4xl">Contact</h2>
            <address className="mt-6 flex flex-col gap-2 not-italic text-ink/75">
              <span className="font-semibold text-ink">Rajiv Patil, Secretary, BACA</span>
              <span>{ORG.address}</span>
              <a className="w-fit underline decoration-pitch underline-offset-4" href={`mailto:${ORG.email}`}>{ORG.email}</a>
              <a className="num w-fit underline decoration-pitch underline-offset-4" href={ORG.phoneHref}>{ORG.phone}</a>
            </address>
          </div>
        </div>
      </Block>
      <Block title="Terms" tone="paper">
        <ol className="grid max-w-3xl gap-4 text-lg text-ink/75">
          {TERMS.map((t, i) => (
            <li key={i} className="num grid grid-cols-[2rem_1fr]"><span className="font-semibold text-pitch">{i + 1}</span>{t}</li>
          ))}
        </ol>
      </Block>
      <Block title="Sponsorship brief" tone="cream">
        <Downloads only={["Sponsorship"]} />
      </Block>
    </>
  );
}
