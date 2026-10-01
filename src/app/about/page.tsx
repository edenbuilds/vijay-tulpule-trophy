import type { Metadata } from "next";
import { EVENT, HISTORY } from "@/lib/site";
import { PH } from "@/lib/photos";
import Link from "next/link";
import { Stanza } from "@/components/Poem";
import { Block, Hero, StatBar } from "@/components/Sections";

export const metadata: Metadata = {
  title: "About BACA",
  description: "The Bombay Advocates’ Cricket Association: a public trust of Bombay High Court advocates, host of the 38th All India Advocates’ Cricket Tournament 2026.",
};

const COMMITTEE = [
  ["Shirish Gupte", "Sr. Adv. & President"],
  ["Prasad Dhakephalkar", "Vice President"],
  ["Balkrishna Joshi", "Vice President"],
  ["Rajiv Patil", "Sr. Adv. & Hon. Secretary"],
  ["Rajan Jayakar", "Treasurer"],
  ["Sanjeev Gorwadkar", ""],
  ["Deepak Thakre", ""],
  ["Sachindra Shetye", ""],
  ["Meghashyam Kocharekar", ""],
  ["Prashant Prabhu", ""],
  ["Rahul Nerlekar", ""],
];

export default function About() {
  return (
    <>
      <Hero title="About BACA" sub="Bombay Advocates’ Cricket Association, hosts of the 2026 tournament" photo={PH.about} />
      <Block tone="paper">
        <div className="num grid max-w-4xl gap-4 text-lg text-ink/75 md:text-xl">
          <p>Public trust, 1993. Registration No. 797/1993 / 4BBSD.</p>
          <p>167/E, Poonawadi, Dr Ambedkar Road, Dadar, Mumbai 400 014.</p>
          <p>Advocates, solicitors and legal professionals of the Bombay High Court. Three-time All India champions.</p>
          <p>The 2026 tournament is held in association with BBA, The Bombay Incorporated Law Society and AIA.</p>
        </div>
      </Block>
      <StatBar items={HISTORY.mumbai.map((y) => [y, "Mumbai hosts"])} />
      <Block title="The tournament" tone="cream">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <p className="text-xl leading-relaxed md:text-2xl">
            The {EVENT.edition} is played under the {HISTORY.body}, on the motto “{HISTORY.motto}”. Held every year
            since {HISTORY.since}, hosted by a different High Court each time.
          </p>
          <div>
            <p className="text-ink/70">Past hosts include</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {HISTORY.hosts.map((h) => (
                <li key={h} className="lift rounded-full bg-paper px-4 py-2 font-medium">{h}</li>
              ))}
            </ul>
            <p className="mt-8 text-ink/70">
              In 2026 practising advocates from 15 High Courts and the Supreme Court of India play on 8 grounds in Mumbai and
              Navi Mumbai. The best players are picked for the Lawyers’ Cricket World Cup. The next one is in Cape Town.
            </p>
          </div>
        </div>
      </Block>
      <Block id="poem" title="Cricket and court" kicker="Poem" tone="cream">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="max-w-md text-lg text-ink/70">A Hindi poem shared by BACA on what the pitch and the courtroom ask of the same people.</p>
            <Link href="/poem" className="mt-8 inline-block text-base font-semibold underline decoration-pitch decoration-2 underline-offset-8 transition-colors hover:text-pitch">Read the poem</Link>
          </div>
          <Stanza i={1} />
        </div>
      </Block>
      <Block title="Committee" tone="paper">
        <ul className="rule grid md:grid-cols-2 md:gap-x-12">
          {COMMITTEE.map(([name, role]) => (
            <li key={name} className="row-line flex min-h-14 items-baseline justify-between gap-4 border-b border-dashed border-ink/15 py-4">
              <span className="text-lg font-semibold">{name}</span>
              <span className="text-ink/55">{role}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-ink/70">
          <span className="font-semibold text-ink">Advisors:</span> Avinash Rana, Rohan Shah
        </p>
      </Block>
    </>
  );
}
