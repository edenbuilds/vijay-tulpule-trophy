import Link from "next/link";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { ScrollTimeline } from "@/components/gems/ScrollTimeline";
import { SpotlightCard } from "@/components/gems/SpotlightCard";
import { ScoreTicker, ScrubText, TextRotate } from "@/components/Motion";
import { Block, Hero, StatBar } from "@/components/Sections";
import { Tiers } from "@/components/Tiers";
import { GROUPS } from "@/lib/site";

const KNOCKOUT = [
  { n: "1", title: "Group stage", date: "18–20 Oct" },
  { n: "2", title: "Quarter-finals", date: "22 Oct" },
  { n: "3", title: "Semi-finals", date: "23 Oct" },
  { n: "4", title: "Final", date: "24 Oct" },
];

const arrow = "text-base font-semibold underline decoration-brass decoration-2 underline-offset-8 transition-colors hover:text-hover";

export default function Home() {
  return (
    <>
      <Hero eyebrow="Bombay Advocates’ Cricket Association" title="Vijay Tulpule Trophy 2026" sub={<TextRotate prefix="17–24 October" words={["16 teams", "4 groups", "32 matches", "Mumbai", "Navi Mumbai"]} />}
        tall
      >
        <MagneticButton href="/fixtures">Fixtures</MagneticButton>
        <Link
          href="/live"
          className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-7 font-semibold transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
        >
          Live
        </Link>
      </Hero>

      <ScoreTicker items={["Vijay Tulpule Trophy", "2026", "Mumbai", "Navi Mumbai"]} />

      <StatBar items={[["16", "teams"], ["4", "groups"], ["32", "matches"], ["17–24 Oct", "dates"]]} />

      <Block tone="paper">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <p className="font-semibold text-green">Next</p>
            <h2 className="display mt-3 text-3xl md:text-5xl">League starts 18 October</h2>
            <p className="mt-5 max-w-md text-lg text-ink/70">
              8 matches on day one. 09:00 session, then 14:30 if lights are confirmed.
            </p>
            <Link href="/fixtures" className={`mt-8 inline-block ${arrow}`}>All fixtures</Link>
          </div>
          <ul className="border-t border-ink/15 text-ink/80">
            {[
              ["17 Oct", "07:00", "Opening ceremony, Main Ground"],
              ["18 Oct", "09:00", "League, 8 matches"],
              ["21 Oct", "", "Reserve day"],
              ["24 Oct", "09:00", "Final"],
            ].map(([d, t, what]) => (
              <li key={d} className="row-line border-b border-ink/15">
                <Link href="/fixtures" className="num grid grid-cols-[5.5rem_1fr] items-baseline gap-4 py-5 md:grid-cols-[7rem_4rem_1fr]">
                  <span className="font-semibold text-ink">{d}</span>
                  <span className="hidden md:block">{t}</span>
                  <span>{what}</span>
                </Link>
              </li>
            ))}
            <li className="pt-4 text-sm text-ink/50">Grounds TBC</li>
          </ul>
        </div>
      </Block>

      <section className="bg-night py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-semibold text-brass">Live</p>
              <h2 className="display mt-3 text-4xl md:text-6xl">Watch</h2>
              <p className="mt-4 max-w-xl text-white/70">
                Stream starts 16 October. Coverage from 15 minutes before toss. Highlights after stumps.
              </p>
            </div>
            <MagneticButton href="/live">Live page</MagneticButton>
          </div>
          <div className="grid aspect-video place-items-center rounded-xl border border-white/10 bg-green/60">
            <p className="text-white/55">Stream URL TBC</p>
          </div>
        </div>
      </section>

      <Block title="Groups" tone="cream">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g, i) => (
            <SpotlightCard key={g.name} index={i} className="border-ink/10 bg-paper p-6">
              <h3 className="text-2xl font-bold">Group {g.name}</h3>
              <p className="num mt-4 text-lg">Teams {g.teams.join(" ")}</p>
              <p className="mt-1 text-sm text-ink/55">Names TBC</p>
            </SpotlightCard>
          ))}
        </div>
        <Link href="/teams" className={`mt-10 inline-block ${arrow}`}>All teams</Link>
      </Block>

      <section className="overflow-hidden bg-night py-16 text-white md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <h2 className="display mb-12 text-3xl md:mb-16 md:text-5xl">Knockout</h2>
          <ScrollTimeline steps={KNOCKOUT} />
          <p className="mt-14 text-white/70">Top two in each group. Reserve day 21 Oct.</p>
        </div>
      </section>

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
            <p className="font-semibold text-green">Trophy</p>
            <ScrubText className="mt-3 max-w-xl text-2xl font-semibold leading-snug md:text-4xl">
              Named after Vijay Tulpule, Bombay advocate and former Ranji Trophy probable.
            </ScrubText>
            <Link href="/trophy" className={`mt-8 inline-block ${arrow}`}>About the trophy</Link>
          </div>
        </div>
      </Block>

      <Block title="Sponsors" tone="cream">
        <Tiers />
      </Block>

      <section className="bg-green py-16 text-white md:py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-4 md:px-8">
          <div>
            <h2 className="display text-3xl md:text-5xl">Contact</h2>
            <p className="mt-4 text-lg text-white/75">Teams, media, sponsors — message the organisers.</p>
          </div>
          <MagneticButton href="/contact">Contact</MagneticButton>
        </div>
      </section>
    </>
  );
}
