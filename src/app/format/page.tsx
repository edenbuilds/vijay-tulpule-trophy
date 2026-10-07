import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EVENT } from "@/lib/site";
import { Block, Hero } from "@/components/Sections";

export const metadata: Metadata = { title: "Tournament Format" };

const calendar = [
  ["17 October", "Opening Ceremony"],
  ["18 to 20 October", "League matches across multiple grounds"],
  ["21 October", "Reserve Day"],
  ["22 and 23 October", "Tournament matches continue"],
  ["24 October", "Finals at CCI, Brabourne Stadium and Wankhede Stadium"],
];

const awards = [
  { title: "Match Awards", items: ["Man of the Match", "Best Batter", "Best Bowler"] },
  { title: "Tournament Awards", items: ["Winners", "Runners-up", "Player of the Series", "Batter of the Series", "Bowler of the Series"] },
];

export default function Format() {
  return (
    <>
      <Hero title="Tournament Format" sub={`${EVENT.overs} Overs A Side. Sixteen Teams. Eight Days Of Cricket.`} />

      <Block title="Tournament Basics" tone="white">
        <dl className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["16 Teams", "Across the legal fraternity"],
            [`${EVENT.overs} Overs`, "Per side"],
            [`${EVENT.squad} Players`, "Per squad"],
            ["One Match", "Per team per day"],
          ].map(([label, detail]) => (
            <div key={label} className="border-t border-navy/15 py-5">
              <dt className="display text-2xl sm:text-3xl">{label}</dt>
              <dd className="mt-2 text-base text-navy/70">{detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-navy/65">Groups and matchups will be confirmed following the official draw.</p>
      </Block>

      <Block title="Tournament Calendar" tone="sky">
        <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {calendar.map(([date, event]) => (
            <li key={date} className="border-t border-navy/15 py-5">
              <p className="num text-sm font-semibold text-royal">{date}</p>
              <p className="mt-2 text-lg font-semibold">{event}</p>
            </li>
          ))}
        </ol>
        <Link href="/fixtures" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">View Fixtures <ArrowRight aria-hidden="true" className="size-4" /></Link>
      </Block>

      <Block title="Points" tone="white">
        <dl className="grid gap-4 sm:grid-cols-3">
          {[["Win", "2 points"], ["Tie Or No Result", "1 point"], ["Loss", "0 points"]].map(([label, value]) => (
            <div key={label} className="border-t-2 border-royal py-5">
              <dt className="text-lg font-semibold">{label}</dt>
              <dd className="display mt-2 text-3xl">{value}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="Tie-Break Rules" tone="snow">
        <p className="max-w-3xl text-lg text-navy/75">If teams finish level on points, the proposed order for determining their position is:</p>
        <ol className="mt-5 grid max-w-3xl gap-0">
          {["Net run rate", "Head-to-head result", "Fewest wickets lost per run scored", "Lots"].map((rule, i) => (
            <li key={rule} className="grid grid-cols-[2.5rem_1fr] border-t border-navy/15 py-4 text-lg"><span className="num font-semibold text-royal">{i + 1}</span>{rule}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-navy/65">Final tournament rules will apply as approved by the organisers.</p>
      </Block>

      <Block title="Awards" tone="white">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {awards.map((group) => (
            <div key={group.title}>
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <ul className="mt-3 border-t border-navy/15">
                {group.items.map((item) => <li key={item} className="border-b border-navy/10 py-3 text-base">{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-7 max-w-2xl text-base text-navy/70">Every registered player will receive a participation medal as part of the tournament.</p>
        <Link href="/ceremonies" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">View Ceremonies <ArrowRight aria-hidden="true" className="size-4" /></Link>
      </Block>
    </>
  );
}
