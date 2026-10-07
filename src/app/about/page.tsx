import type { Metadata } from "next";
import { EVENT, HISTORY, ORG, nb, tie } from "@/lib/site";
import { PH } from "@/lib/photos";
import { Stanza } from "@/components/Poem";
import { Block, Hero, ParallaxPhoto } from "@/components/Sections";
import { Hosts } from "@/components/Hosts";
import { MagneticButton } from "@/components/gems/MagneticButton";

export const metadata: Metadata = {
  title: "About BACA",
  description: "The Bombay Advocates’ Cricket Association: a public trust of Bombay High Court advocates, host of the 38th All India Advocates’ Cricket Tournament 2026.",
};

const COMMITTEE = [
  [nb("Sr. Adv. Shirish Gupte"), "President"],
  [nb("Adv. Prasad Dhakephalkar"), "Vice President"],
  [nb("Adv. Balkrishna Joshi"), "Vice President"],
  [nb("Sr. Adv. Rajiv Patil"), "Hon. Secretary"],
  [nb("Adv. Rajan Jayakar"), "Treasurer"],
  [nb("Adv. Sanjeev Gorwadkar"), ""],
  [nb("Adv. Deepak Thakre"), ""],
  [nb("Adv. Sachindra Shetye"), ""],
  [nb("Adv. Meghashyam Kocharekar"), ""],
  [nb("Adv. Prashant Prabhu"), ""],
  [nb("Adv. Rahul Nerlekar"), ""],
];

// One dashed list in one tile: the same row on phone and desktop.
const row = "border-b border-dashed border-navy/15 py-4 last:border-0";

export default function About() {
  return (
    <>
      <Hero title="About BACA" sub="Bombay Advocates’ Cricket Association, hosts of the 2026 tournament" />
      <Block tone="snow">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16">
          <p className="display display-long text-3xl !leading-[1.15] md:text-5xl">
            Advocates, solicitors and legal professionals of the Bombay High Court. <span className="whitespace-nowrap">Three-time</span> All India champions.
          </p>
          <ul className="num rounded-2xl bg-white px-4 text-lg md:px-6">
            <li className={row}>Public trust, 1993</li>
            <li className={row}>Registration No. 797/1993 / 4BBSD</li>
            <li className={row}>{ORG.address}</li>
          </ul>
        </div>
        <ParallaxPhoto src={PH.about.src} alt={PH.about.alt} className="mt-10 aspect-[4/3] rounded-2xl md:mt-16 md:aspect-[21/9]" sizes="(min-width: 1280px) 1216px, 100vw" />
      </Block>
      <Block title="The tournament" tone="white">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div className="grid content-start gap-6">
            <p className="text-xl leading-relaxed md:text-2xl">
              The {EVENT.edition} is played under the {HISTORY.body}, on the motto “{HISTORY.motto}”. Held every year
              since {HISTORY.since}, hosted by a different High Court each time. Mumbai hosted it in {HISTORY.mumbai.slice(0, -1).join(", ")} and {HISTORY.mumbai.at(-1)}.
            </p>
            <p className="text-lg leading-relaxed text-navy/75">
              {tie("In 2026 practising advocates from 15 High Courts and the Supreme Court of India play at grounds in Mumbai and Navi Mumbai. The best players are picked for the Lawyers’ Cricket World Cup. The next one is in Cape Town.")}
            </p>
          </div>
          <div>
            <h3 className="display mb-4 text-2xl md:text-3xl">Past hosts</h3>
            <ul className="grid grid-cols-2 gap-x-6 rounded-2xl bg-snow px-4 md:px-6">
              {HISTORY.hosts.map((h) => (
                <li key={h} className={`${row} text-lg font-medium`}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </Block>
      <Block id="hosts" title="Hosted by" tone="sky">
        <Hosts />
      </Block>
      <Block id="poem" title="Cricket and court" kicker="Poem" tone="navy">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="max-w-md text-lg text-white/75">A Hindi poem shared by BACA about cricket and the courtroom.</p>
            <div className="mt-6">
              <MagneticButton href="/poem" tone="onDark">Read the poem</MagneticButton>
            </div>
          </div>
          <Stanza i={1} onDark />
        </div>
      </Block>
      <Block title="Committee" tone="snow">
        <ul className="grid rounded-2xl bg-white px-4 md:grid-cols-2 md:gap-x-12 md:px-8">
          {COMMITTEE.map(([name, role], i) => (
            <li key={name} className={`${row} row-line flex min-h-14 flex-col justify-between gap-x-4 sm:flex-row sm:items-baseline ${i === COMMITTEE.length - 1 && COMMITTEE.length % 2 ? "md:col-span-2" : ""}`}>
              <span className="text-lg font-semibold">{name}</span>
              <span className="text-navy/70 sm:text-right">{role}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-lg text-navy/75">
          <span className="font-semibold text-navy">Advisors:</span> {nb("Adv. Avinash Rana")}, {nb("Adv. Rohan Shah")}
        </p>
      </Block>
    </>
  );
}
