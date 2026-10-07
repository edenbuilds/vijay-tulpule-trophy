import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Block, Hero } from "@/components/Sections";
import { Hosts } from "@/components/Hosts";
import { HISTORY, ORG, nb } from "@/lib/site";
import { PH } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About BACA",
  description: "The Bombay Advocates’ Cricket Association: a public trust and host of the 38th All India Advocates’ Cricket Tournament 2026.",
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

export default function About() {
  return (
    <>
      <Hero title="Where Mumbai’s Legal Fraternity Meets Cricket" sub="The Bombay Advocates’ Cricket Association brings members of the legal profession together through the game of cricket." />

      <Block title="About BACA" tone="white">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sky">
            <Image src={PH.about.src} alt={PH.about.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-xl leading-relaxed">BACA is a three-time All India champion and the host of the 38th All India Advocates’ Cricket Tournament in 2026.</p>
            <p className="mt-5 border-t border-navy/15 pt-4 text-base text-navy/70">Registered Public Trust since 1993<br />Registration No. 797/1993 / 4BBSD</p>
          </div>
        </div>
      </Block>

      <Block title="Cricket For Friendship" tone="sky">
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-[1fr_1fr]">
          <div>
            <h3 className="text-xl font-semibold">A Tournament Tradition Since 1989</h3>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy/75">The All India Advocates’ Cricket Tournament has been played since 1989 with one idea at its heart: <span className="font-semibold text-navy">Cricket for Friendship.</span> A different High Court hosts each edition, bringing members of the legal fraternity from across India together away from the courtroom.</p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-navy/75">Mumbai previously hosted the tournament in 1993 and 2005. In 2026, it welcomes the tournament once again.</p>
            <h3 className="mt-7 text-xl font-semibold">Mumbai 2026</h3>
            <p className="mt-3 text-lg leading-relaxed text-navy/75">From 17 to 24 October 2026, practising advocates representing 15 High Courts and the Supreme Court of India will compete across Mumbai and Navi Mumbai.</p>
            <p className="mt-3 text-base leading-relaxed text-navy/65">The tournament is about cricket. It is also about meeting old friends, forming new relationships and strengthening the bond between Bars across the country.</p>
          </div>
        </div>
        <dl className="mt-8 grid gap-x-7 border-t border-navy/15 sm:grid-cols-3">
          {[[`Since ${HISTORY.since}`, "Annual advocates’ cricket tradition"], ["16 Teams", "From India’s legal fraternity"], ["Mumbai 2026", "Hosted by BACA"]].map(([value, label]) => <div key={value} className="py-5"><dt className="display text-xl">{value}</dt><dd className="mt-1 text-sm text-navy/65">{label}</dd></div>)}
        </dl>
      </Block>

      <Block id="hosts" title="Hosted By" tone="white">
        <Hosts />
      </Block>

      <Block title="Past Host Cities" tone="snow">
        <p className="mb-5 max-w-2xl text-lg text-navy/75">Over the years, the tournament has travelled across India. Past host cities include:</p>
        <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-4">
          {HISTORY.hosts.map((city) => <li key={city} className="border-t border-navy/15 py-3 text-lg">{city}</li>)}
        </ul>
      </Block>

      <Block title="BACA Address" tone="navy">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <address className="not-italic text-lg leading-relaxed text-white/85">{ORG.address}</address>
          <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">Contact BACA <ArrowRight aria-hidden="true" className="size-4" /></Link>
        </div>
      </Block>

      <Block title="Committee" tone="white">
        <ul className="grid sm:grid-cols-2 sm:gap-x-12">
          {COMMITTEE.map(([name, role]) => <li key={name} className="flex min-h-14 flex-col justify-between gap-x-4 border-t border-navy/10 py-3 sm:flex-row sm:items-center"><span className="font-semibold">{name}</span><span className="text-sm text-navy/65 sm:text-right">{role}</span></li>)}
        </ul>
        <p className="mt-6 text-sm text-navy/65"><span className="font-semibold text-navy">Advisors:</span> {nb("Adv. Avinash Rana")}, {nb("Adv. Rohan Shah")}</p>
      </Block>
    </>
  );
}
