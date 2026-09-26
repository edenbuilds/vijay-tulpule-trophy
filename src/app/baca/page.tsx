import type { Metadata } from "next";
import { PHOTOS } from "@/lib/site";
import { Block, Hero, StatBar } from "@/components/Sections";

export const metadata: Metadata = { title: "BACA" };

const COMMITTEE = [
  ["Shirish Gupte", "President"],
  ["Prasad Dhakephalkar", "Vice President"],
  ["Balkrishna Joshi", "Vice President"],
  ["Rajiv Patil", "Secretary"],
  ["Rajan Jayakar", "Treasurer"],
  ["Sanjeev Gorwadkar", ""],
  ["Deepak Thakre", ""],
  ["Sachindra Shetye", ""],
  ["Meghashyam Kocharekar", ""],
  ["Prashant Prabhu", ""],
  ["Rahul Nerlekar", ""],
];

export default function Baca() {
  return (
    <>
      <Hero title="Bombay Advocates’ Cricket Association" sub="Host club" photo={PHOTOS.field} />
      <Block tone="paper">
        <div className="num grid max-w-4xl gap-4 text-lg text-ink/75 md:text-xl">
          <p>Public trust, 1993. Registration No. 797/1993 / 4BBSD.</p>
          <p>167/E, Poonawadi, Dr Ambedkar Road, Dadar, Mumbai 400 014.</p>
          <p>Cricket for advocates. Hosted this event in 1993, 2005 and 2026.</p>
        </div>
      </Block>
      <StatBar items={[["1993", "host"], ["2005", "host"], ["2026", "host"]]} />
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
