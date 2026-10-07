import type { Metadata } from "next";
import { EVENT, nb } from "@/lib/site";
import { GROUNDS, SCHEDULE } from "@/lib/schedule";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { Block, Hero } from "@/components/Sections";

export const metadata: Metadata = { title: "Format" };

// The groups are not drawn and the sheet gives dates and grounds only, so this page states what the poster, the sheet and the 25-09
// working book agree on (overs, squad, points, awards) and says "after the draw" for anything that depends on groups or stages.
// No times, no group letters, no stage names, no total number of grounds.
const day = (short: string) => SCHEDULE.find((d) => d.short === short)!;
// Non-breaking so a phone wraps "Brabourne Stadium" as a unit instead of leaving "Stadium" alone on the next line.
const finals = day("24 Oct").finals!.map((id) => nb(GROUNDS[id].name)).join(" and ");

type Row = [label: string, text: string];

const MATCHES: Row[] = [
  ["Length", `${EVENT.overs} overs a side.`],
  ["Squad", `${EVENT.squad} players.`],
  ["Teams", "16 teams. Groups will be announced after the draw."],
  ["Each day", "No team plays twice on the same day."],
];

const DAYS: Row[] = [
  ["17 Oct", "Opening. Venue and time to be announced."],
  ["18 to 20 Oct", `Matches on ${day("18 Oct").grounds.length} grounds a day.`],
  ["21 Oct", "No matches. Held as a reserve day."],
  ["22 and 23 Oct", `Matches on ${day("22 Oct").grounds.length} grounds a day.`],
  ["24 Oct", `Finals at ${finals}.`],
];

const POINTS: Row[] = [
  ["Win", "2 points"],
  ["Tie or no result", "1 point"],
  ["Loss", "0 points"],
  ["Tie-break", "Net run rate, then head-to-head, then fewest wickets lost per run scored, then lots."],
];

const AWARDS: Row[] = [
  ["Every match", "Man of the Match, Best Batter and Best Bowler, given on the day."],
  ["Prize presentation", "The winners and the runners-up, and the player, batter and bowler of the series."],
  ["Opening, 17 Oct", "Participation medals for every registered player."],
];

// One dashed list: label left, text right from md, stacked on phones.
function Rows({ rows, muted }: { rows: Row[]; muted: string }) {
  return (
    <dl>
      {rows.map(([k, v], i) => (
        <div key={k} className={`grid gap-1 py-5 md:grid-cols-[16rem_1fr] md:gap-8 md:py-6 ${i ? "rule" : "pt-0"}`}>
          <dt className="display text-xl md:text-2xl">{k}</dt>
          <dd className={`num max-w-2xl text-lg md:text-xl ${muted}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Format() {
  return (
    <>
      <Hero title="Format" sub={`${EVENT.overs} overs a side. Squads of ${EVENT.squad} players.`} />
      <Block title="Matches" tone="white">
        <Rows rows={MATCHES} muted="text-navy/75" />
      </Block>
      <Block title="Days" tone="sky">
        <Rows rows={DAYS} muted="text-navy/75" />
        <p className="mt-6 max-w-2xl text-lg text-navy/75">Match-ups will be published after the draw.</p>
        <div className="mt-6"><MagneticButton href="/fixtures">Fixtures</MagneticButton></div>
      </Block>
      <Block title="Points" tone="navy">
        <Rows rows={POINTS} muted="text-white/75" />
        <p className="mt-6 max-w-2xl text-lg text-white/75">Points and tie-breaks are to be confirmed after the draw.</p>
      </Block>
      <Block title="Awards" tone="white">
        <Rows rows={AWARDS} muted="text-navy/75" />
        <div className="mt-6"><MagneticButton href="/ceremonies">Ceremonies</MagneticButton></div>
      </Block>
    </>
  );
}
