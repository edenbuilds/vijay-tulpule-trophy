import Link from "next/link";
import { ArrowUpRight, CalendarDays, Handshake, ListOrdered, Users } from "lucide-react";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { StickyMediaSwap } from "@/components/gems/StickyMediaSwap";
import StackingCards from "@/components/effects/stacking-cards";
import { ScoreTicker, ScrubText } from "@/components/Motion";
import { Bento, Block, Hero, StatBar } from "@/components/Sections";
import { Tiers } from "@/components/Tiers";
import { Contacts } from "@/components/Contacts";
import { Stanza } from "@/components/Poem";
import { EVENT, PHOTOS } from "@/lib/site";
import { Downloads } from "@/components/Downloads";

const KNOCKOUT = [
  { num: "01", title: "Group stage", line: "18–20 October. Four groups of four. Top two go through.", photo: PHOTOS.saturday },
  { num: "02", title: "Quarter-finals", line: "22 October. A1 v B2, B1 v A2, C1 v D2, D1 v C2.", photo: PHOTOS.casual },
  { num: "03", title: "Semi-finals", line: "23 October, from 09:00.", photo: PHOTOS.tower },
  { num: "04", title: "Final", line: "24 October at 09:00. The trophy is presented at 17:15.", photo: PHOTOS.field },
];

const LINKS = [
  { href: "/fixtures", label: "Fixtures", line: "Every match, day by day", Icon: CalendarDays, bg: "bg-mint" },
  { href: "/teams", label: "Teams", line: "Sixteen teams in four groups", Icon: Users, bg: "bg-mist" },
  { href: "/format", label: "Format", line: "Points, tie-breaks and awards", Icon: ListOrdered, bg: "bg-mist" },
  { href: "/sponsors", label: "Sponsors", line: "Four tiers, from ₹5 lakh", Icon: Handshake, bg: "bg-sage" },
];

const arrow = "text-base font-semibold underline decoration-pitch decoration-2 underline-offset-8 transition-colors hover:text-pitch";
const kicker = "text-xs font-medium uppercase tracking-[0.08em] text-ink/60";

export default function Home() {
  return (
    <>
      <Hero eyebrow="BACA proudly invites you to the 38th" title="All India Advocates’ Cricket Tournament 2026"
        sub="Practising advocates from 15 High Courts and the Supreme Court of India battle it out on 8 cricket grounds in Mumbai and Navi Mumbai. Come, support the legal fraternity!"
        marquee={["16 teams", "8 grounds", `${EVENT.overs} overs`, "Mumbai", "Navi Mumbai"]}
        row={["17–24 October 2026", "Hosted by BACA", EVENT.fixturesNote]}
        photo={PHOTOS.whites}
        tall
      >
        <MagneticButton href="/fixtures">Fixtures</MagneticButton>
        <MagneticButton href="/teams" tone="light">Teams</MagneticButton>
      </Hero>

      <nav aria-label="Sections" className="grid grid-cols-2 gap-2 px-2 pt-2 lg:grid-cols-4">
        {LINKS.map(({ href, label, line, Icon, bg }) => (
          <Link key={href} href={href} className={`lift press group flex min-h-40 flex-col justify-between rounded-2xl p-5 hover:bg-sage md:min-h-48 md:p-8 ${bg}`}>
            <span className="flex items-start justify-between">
              <Icon aria-hidden="true" className="size-6 text-pitch transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1.6} />
              <ArrowUpRight aria-hidden="true" className="size-5 text-ink/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </span>
            <span>
              <span className="display block text-2xl md:text-3xl">{label}</span>
              <span className="mt-1 block text-sm text-ink/60">{line}</span>
            </span>
          </Link>
        ))}
      </nav>

      <ScoreTicker items={[EVENT.trophy, "BACA 2026", "Mumbai", "Navi Mumbai"]} />

      <StatBar items={[["16", "teams"], ["8", "grounds"], ["32", "matches"], ["17–24 Oct", "dates"]]} />

      <Bento photo={PHOTOS.tent} />

      <Block tone="cream">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <p className={kicker}>Next</p>
            <h2 className="display mt-3 text-3xl md:text-5xl">League starts 18 October</h2>
            <p className="mt-5 max-w-md text-lg text-ink/70">
              Eight matches on day one: four at 09:00, and four at 14:30 if the lights are certified.
            </p>
            <Link href="/fixtures" className={`mt-8 inline-block ${arrow}`}>All fixtures</Link>
          </div>
          <ul className="rule text-ink/80">
            {[
              ["17 Oct", "07:00", "Opening and medals, Main Ground"],
              ["18 Oct", "09:00", "League, 8 matches"],
              ["21 Oct", "", "Reserve day"],
              ["24 Oct", "09:00", "Final, trophy evening 17:15"],
            ].map(([d, t, what]) => (
              <li key={d} className="row-line border-b border-dashed border-ink/15">
                <Link href="/fixtures" className="num grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-5 md:grid-cols-[7rem_4rem_1fr]">
                  <span className="font-semibold text-ink">{d}</span>
                  <span className="hidden md:block">{t}</span>
                  <span>{what}</span>
                </Link>
              </li>
            ))}
            <li className="pt-4 text-sm text-ink/50">{EVENT.fixturesNote} Ground names to follow.</li>
          </ul>
        </div>
      </Block>

      <section className="bg-paper pt-16 md:pt-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className={kicker}>Road to the final</p>
          <h2 className="display mt-3 text-4xl md:text-6xl">Knockout</h2>
        </div>
        <StickyMediaSwap label="Tournament stages" entries={KNOCKOUT} />
      </section>

      <StackingCards />
      <div className="bg-paper px-4 pb-4 pt-10 md:px-8">
        <Link href="/teams" className={`mx-auto block max-w-7xl ${arrow}`}>All teams</Link>
      </div>

      <Block tone="paper">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
          <CurtainPortrait
            src="/img/tulpule-informal.jpg"
            alt="Vijay Tulpule in a white shirt and suspenders"
            caption="Vijay Tulpule"
            width={508}
            height={661}
            className="max-w-[16rem] md:max-w-none"
          />
          <div>
            <p className={kicker}>Trophy</p>
            <ScrubText className="display mt-3 max-w-xl text-2xl leading-snug md:text-4xl">
              The winners receive The Vijay Tulpule Trophy, named after the Bombay advocate and former Ranji Trophy probable.
            </ScrubText>
            <Link href="/trophy" className={`mt-8 inline-block ${arrow}`}>About the trophy</Link>
          </div>
        </div>
      </Block>

      <Block tone="cream">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className={kicker}>Poem</p>
            <h2 className="display mt-3 text-3xl md:text-5xl">Cricket and court</h2>
            <p className="mt-5 max-w-md text-lg text-ink/70">A Hindi poem shared by BACA on the pitch and the courtroom.</p>
            <Link href="/about#poem" className={`mt-8 inline-block ${arrow}`}>Read the poem</Link>
          </div>
          <Stanza i={1} />
        </div>
      </Block>

      <Block title="Sponsors" kicker="Partners" tone="paper">
        <Tiers />
      </Block>

      <Block title="Downloads" tone="cream">
        <Downloads />
      </Block>

      <Block title="Contact details" tone="paper">
        <Contacts />
      </Block>

      <section className="px-2 pt-2">
        <div className="flex flex-wrap items-end justify-between gap-8 rounded-2xl bg-pitch px-6 py-14 text-paper md:px-12 md:py-20">
          <div>
            <h2 className="display text-3xl md:text-5xl">Contact</h2>
            <p className="mt-4 text-lg text-paper/75">Write to the organisers about teams, media or sponsorship.</p>
          </div>
          <MagneticButton href="/contact" tone="onDark">Contact</MagneticButton>
        </div>
      </section>
    </>
  );
}
