import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, Handshake, ListOrdered, Users } from "lucide-react";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { MagneticButton } from "@/components/gems/MagneticButton";
import SlideTextReveal from "@/components/effects/slide-text-reveal";
import { ScrubText } from "@/components/Motion";
import { Block, Hero, ParallaxPhoto } from "@/components/Sections";
import { Tiers } from "@/components/Tiers";
import { Contacts } from "@/components/Contacts";
import { Downloads } from "@/components/Downloads";
import { Stanza } from "@/components/Poem";
import { ArchiveReel } from "@/components/home/ArchiveReel";
import { Converge } from "@/components/home/Converge";
import { Faq } from "@/components/home/Faq";
import { GalleryZoom } from "@/components/home/GalleryZoom";
import { Programme, type Day } from "@/components/home/Programme";
import { ARCHIVE, CONVERGE, PH, ZOOM } from "@/lib/photos";
import { CONTACTS, EVENT, HISTORY } from "@/lib/site";

// Order of the page: the tournament (hero, where to go, the teams, the schedule), then the trophy it is played
// for, then the pictures and the history, then the practical end (poem, questions, sponsors, downloads, contacts).
// Each photograph is placed by src/lib/photos.ts for a stated reason. On phones the schedule, sponsors and
// downloads are plain lists, not stacks of cards.
const DAYS: Day[] = [
  { date: "17 Oct", day: "Saturday", title: "Opening", line: "Medals, team photographs and the anthem at the Main Ground, from 07:00.", href: "/ceremonies#opening", photo: PH.opening },
  { date: "18–20 Oct", day: "Sunday to Tuesday", title: "League", line: "Four groups of four. Four matches at 09:00 each day, and four at 14:30 if the lights are certified.", href: "/fixtures", photo: PH.league },
  { date: "21 Oct", day: "Wednesday", title: "Reserve day", line: "Held back in case the weather takes a day.", href: "/fixtures" },
  { date: "22 Oct", day: "Thursday", title: "Quarter-finals", line: "A1 v B2, B1 v A2, C1 v D2 and D1 v C2, from 09:00.", href: "/fixtures", photo: PH.quarter },
  { date: "23 Oct", day: "Friday", title: "Semi-finals", line: "Two matches from 09:00, at the Main Ground and Ground 2.", href: "/fixtures", photo: PH.semi },
  { date: "24 Oct", day: "Saturday", title: "Final", line: "First ball at 09:00 at the Main Ground. The trophy is presented at 17:15.", href: "/ceremonies#final", photo: PH.final },
];

const LINKS = [
  { href: "/fixtures", label: "Fixtures", line: "Every match by day", Icon: CalendarDays, bg: "md:bg-mint" },
  { href: "/teams", label: "Teams", line: "16 teams in four groups", Icon: Users, bg: "md:bg-mist" },
  { href: "/format", label: "Format", line: "Points, tie-breaks and awards", Icon: ListOrdered, bg: "md:bg-mist" },
  { href: "/sponsors", label: "Sponsors", line: "Tiers from ₹5 lakh", Icon: Handshake, bg: "md:bg-sage" },
];

const FAQ = [
  { q: "When and where is it played?", a: "From 17 to 24 October 2026, on 8 grounds in Mumbai and Navi Mumbai. The opening is at 07:00 on 17 October. Ground names will be announced shortly." },
  { q: "Who plays?", a: "Practising advocates from 15 High Courts and the Supreme Court of India, in 16 teams." },
  { q: "How do the teams progress?", a: "Four groups of four, and every team plays the other three in its group. The top two in each group go through to the quarter-finals, then the semi-finals and the final." },
  { q: "How long is a match?", a: `${EVENT.overs} overs a side. First ball is at 09:00.` },
  { q: "What if it rains?", a: "21 October is kept as a reserve day for the weather." },
  {
    q: "Who was Adv. Vijay Tulpule?",
    a: (
      <>
        A Bombay criminal lawyer who served as Government Pleader and Public Prosecutor in the High Court, and a Bombay Ranji Trophy probable before he joined the Bar. Read <Link href="/trophy" className="font-semibold underline decoration-pitch decoration-2 underline-offset-4">his story</Link>.
      </>
    ),
  },
  {
    q: "Who do I write to about teams, media or sponsorship?",
    a: (
      <>
        Use the <Link href="/contact" className="font-semibold underline decoration-pitch decoration-2 underline-offset-4">contact page</Link>, or call {CONTACTS[0].name}, {CONTACTS[0].role}, on {CONTACTS[0].phone}.
      </>
    ),
  },
];

const arrow = "text-base font-semibold underline decoration-pitch decoration-2 underline-offset-8 transition-colors hover:text-pitch";
const kicker = "text-xs font-medium uppercase tracking-[0.08em] text-ink/60";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="BACA invites you to the 38th"
        title="All India Advocates’ Cricket Tournament 2026"
        sub="Practising advocates from 15 High Courts and the Supreme Court of India play on 8 grounds in Mumbai and Navi Mumbai."
        photo={PH.hero}
        facts={["17–24 October 2026", "Hosted by BACA", `${EVENT.overs} overs a side`]}
        tall
      >
        <MagneticButton href="/fixtures" tone="onDark">Fixtures</MagneticButton>
        <MagneticButton href="/teams" tone="light">Teams</MagneticButton>
      </Hero>

      <nav aria-label="Sections" className="mx-2 mt-2 rounded-2xl bg-mist px-4 md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-4 md:rounded-none md:bg-transparent md:px-0">
        {LINKS.map(({ href, label, line, Icon, bg }) => (
          <Link
            key={href}
            href={href}
            className={`press group flex min-h-16 items-center justify-between gap-4 border-b border-dashed border-ink/15 py-4 last:border-0 md:lift md:min-h-48 md:flex-col md:items-stretch md:justify-between md:rounded-2xl md:border-0 md:p-8 md:hover:bg-sage ${bg}`}
          >
            <span className="hidden items-start justify-between md:flex">
              <Icon aria-hidden="true" className="size-6 text-pitch transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1.6} />
              <ArrowUpRight aria-hidden="true" className="size-5 text-ink/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </span>
            <span>
              <span className="display block text-xl md:text-3xl">{label}</span>
              <span className="mt-1 block text-sm text-ink/60">{line}</span>
            </span>
            <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-ink/40 md:hidden" />
          </Link>
        ))}
      </nav>

      <Converge photos={CONVERGE} />

      <Programme days={DAYS} />

      <section className="mx-2 mt-2 rounded-2xl bg-pitch py-16 text-paper md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-20 md:px-8">
          <CurtainPortrait
            src="/img/tulpule-informal.jpg"
            alt="Adv. Vijay Tulpule in a white shirt and suspenders"
            caption="Adv. Vijay Tulpule"
            width={508}
            height={661}
            className="max-w-[16rem] md:max-w-none [&_figcaption]:text-paper/70"
          />
          <div>
            <SlideTextReveal className="display text-4xl md:text-7xl">
              <h2>The Vijay Tulpule Trophy</h2>
            </SlideTextReveal>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-paper/85 md:text-2xl">
              The winning team receives it. It is named after Adv. Vijay Tulpule, a Bombay criminal lawyer, former Government Pleader and Public Prosecutor, and Bombay Ranji Trophy probable.
            </p>
            <p className="mt-4 max-w-xl text-paper/70 md:text-lg">BACA has also named the Rizvi Shield/Plate. Details are being confirmed.</p>
            <Link href="/trophy" className="mt-6 inline-flex min-h-11 items-center text-base font-semibold underline decoration-sage decoration-2 underline-offset-8 transition-colors hover:text-sage">About the trophy</Link>
          </div>
        </div>
      </section>

      <GalleryZoom photos={ZOOM} />

      <Block tone="paper">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16">
          <ParallaxPhoto {...PH.court} className="h-72 rounded-xl md:h-[30rem]" sizes="(min-width: 768px) 26rem, 100vw" />
          <div>
            <ScrubText className="display max-w-2xl text-2xl leading-snug md:text-4xl">
              {`Played every year since ${HISTORY.since} under the motto “${HISTORY.motto}”, hosted by a different High Court each time.`}
            </ScrubText>
            <p className="num mt-6 max-w-xl text-lg text-ink/70">Mumbai hosted it in {HISTORY.mumbai.slice(0, -1).join(", ")} and {HISTORY.mumbai.at(-1)}.</p>
            <Link href="/about" className={`mt-6 inline-flex min-h-11 items-center ${arrow}`}>About BACA</Link>
          </div>
        </div>
        <div className="mt-12 md:mt-16">
          <p className={`${kicker} mb-4`}>From the archive. Drag to scroll.</p>
          <ArchiveReel photos={ARCHIVE} />
        </div>
      </Block>

      <Block tone="cream">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SlideTextReveal className="display text-3xl md:text-5xl">
              <h2>Cricket and court</h2>
            </SlideTextReveal>
            <p className="mt-5 max-w-md text-lg text-ink/70">A Hindi poem shared by BACA about cricket and the courtroom.</p>
            <Link href="/poem" className={`mt-6 inline-flex min-h-11 items-center ${arrow}`}>Read the poem</Link>
          </div>
          <Stanza i={1} />
        </div>
      </Block>

      <Block title="Questions" tone="paper">
        <Faq items={FAQ} />
      </Block>

      <Block title="Sponsors" tone="cream">
        <Tiers />
      </Block>

      <Block title="Downloads" tone="paper">
        <Downloads />
      </Block>

      <Block title="Contact details" tone="cream">
        <Contacts />
      </Block>

      <section className="px-2 pt-2">
        <div className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink px-6 py-12 text-paper md:min-h-[32rem] md:px-12 md:py-16">
          <Image src={PH.cheer.src} alt={PH.cheer.alt} fill sizes="100vw" className="-z-10 object-cover object-[50%_30%]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_26_22/0.9)_10%,rgb(20_26_22/0.35)_70%)]" />
          <SlideTextReveal className="display max-w-[16ch] text-4xl md:text-7xl">
            <h2>Come and support the legal fraternity.</h2>
          </SlideTextReveal>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <MagneticButton href="/fixtures" tone="onDark">Fixtures</MagneticButton>
            <MagneticButton href="/contact" tone="light">Contact</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
