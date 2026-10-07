import Link from "next/link";
import Image from "next/image";
import { Shape } from "@/components/brand/Shape";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { MagneticButton } from "@/components/gems/MagneticButton";
import SlideTextReveal from "@/components/effects/slide-text-reveal";
import { ScrubText } from "@/components/Motion";
import { Block, ParallaxPhoto } from "@/components/Sections";
import { Tiers } from "@/components/Tiers";
import { Contacts } from "@/components/Contacts";
import { Downloads } from "@/components/Downloads";
import { Stanza } from "@/components/Poem";
import { ArchiveReel } from "@/components/home/ArchiveReel";
import { Converge } from "@/components/home/Converge";
import { Faq } from "@/components/home/Faq";
import { GalleryZoom } from "@/components/home/GalleryZoom";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeLinks } from "@/components/home/HomeLinks";
import { Programme } from "@/components/home/Programme";
import { ARCHIVE, PH, ZOOM } from "@/lib/photos";
import { TEAMS } from "@/lib/teams";
import { Hosts } from "@/components/Hosts";
import { CONTACTS, EVENT, HISTORY, tie } from "@/lib/site";

// Order of the page: the tournament (hero, where to go, the teams, the schedule), then the trophy it is played
// for, then the pictures and the history, then the practical end (poem, questions, sponsors, downloads, contacts).
// Bands alternate light and navy: sky hero, links, navy teams, snow schedule, navy trophy, light gallery wall, then light
// tiles to the closing navy photograph. The schedule comes from SCHEDULE (src/lib/schedule.ts) inside Programme; the
// teams from TEAMS. The sheet gives no times, stage names or groups, so none are printed on this page.
// Each photograph is placed by src/lib/photos.ts for a stated reason. On phones the schedule, questions, sponsors and
// downloads are plain lists, not stacks of cards.

// Answers follow the organisers' sheet of 06-10-2026 and the poster: dates and grounds only. No times, no stage names, and the
// groups are not drawn, so those answers say so instead of repeating the 25-09 working book.
const FAQ = [
  { q: "When and where is it played?", a: tie("From 17 to 24 October 2026, in Mumbai and Navi Mumbai. The schedule lists the grounds for each day. The venue and time of the opening on 17 October are to be announced.") },
  { q: "Who plays?", a: "Practising advocates from 15 High Courts and the Supreme Court of India, in 16 teams." },
  { q: "Who hosts it?", a: tie("The Bombay Advocates’ Cricket Association (BACA) hosts it. The co-hosts are the Advocates’ Association of Western India (AAWI), the Bombay Bar Association (BBA) and The Bombay Incorporated Law Society (BILS). It is played under the aegis of the Cricket Association of Advocates in India (CAAI).") },
  {
    q: "How are the groups made?",
    a: (
      <>
        Groups will be announced after the draw. Points and tie-breaks are on the format page.
        <Link href="/format" className="mt-2 flex min-h-11 w-fit items-center text-base font-semibold underline decoration-royal decoration-2 underline-offset-8 transition-colors hover:text-royal">Read the format</Link>
      </>
    ),
  },
  { q: "How long is a match?", a: `${EVENT.overs} overs a side. Match times are to be announced.` },
  { q: "What if it rains?", a: "21 October is a reserve day, held back in case the weather takes a day." },
  {
    q: "Who was the late Adv. Vijay Tulpule?",
    a: (
      <>
        A Bombay criminal lawyer who served as Government Pleader and Public Prosecutor in the High Court, and a Bombay Ranji Trophy probable before he joined the Bar.
        <Link href="/adv-vijay-tulpule" className="mt-2 flex min-h-11 w-fit items-center text-base font-semibold underline decoration-royal decoration-2 underline-offset-8 transition-colors hover:text-royal">Read his life</Link>
      </>
    ),
  },
  {
    q: "Who do I write to about teams, media or sponsorship?",
    a: (
      <>
        Call {CONTACTS[0].name}, {CONTACTS[0].role}, on {CONTACTS[0].phone}, or write through the contact page.
        <Link href="/contact" className="mt-2 flex min-h-11 w-fit items-center text-base font-semibold underline decoration-royal decoration-2 underline-offset-8 transition-colors hover:text-royal">Contact page</Link>
      </>
    ),
  },
];

const arrow = "text-base font-semibold underline decoration-royal decoration-2 underline-offset-8 transition-colors hover:text-royal";

export default function Home() {
  return (
    <>
      <HomeHero />

      <HomeLinks />

      <Converge teams={TEAMS} />

      <Programme />

      <section className="relative isolate mx-2 mt-2 overflow-hidden rounded-2xl bg-navy py-16 text-white md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-24 -z-10 hidden w-[26rem] xl:block">
          <Shape className="w-full" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-20 md:px-8">
          <CurtainPortrait
            src="/img/tulpule-informal.jpg"
            alt="The late Adv. Vijay Tulpule in a white shirt and suspenders"
            caption="The late Adv. Vijay Tulpule"
            width={508}
            height={661}
            className="max-w-[16rem] md:max-w-none [&_figcaption]:text-white/70"
          />
          <div>
            <SlideTextReveal className="display display-long text-4xl md:text-7xl">
              <h2>The Vijay Tulpule Trophy</h2>
            </SlideTextReveal>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/85 md:text-2xl">
              The winning team receives the trophy, named for the late Adv. Vijay Tulpule. He was a Bombay criminal lawyer, former Government Pleader and Public Prosecutor, and a Bombay Ranji Trophy probable.
            </p>
            <p className="mt-4 max-w-xl text-white/70 md:text-lg">Details of the Rizvi Shield/Plate are being confirmed.</p>
            <Link href="/trophy" className="mt-6 inline-flex min-h-11 items-center text-base font-semibold underline decoration-sky decoration-2 underline-offset-8 transition-colors hover:text-sky">About the trophy</Link>
          </div>
        </div>
      </section>

      <GalleryZoom photos={ZOOM} />

      <Block title="Hosted by" tone="white">
        <Hosts tile="bg-snow" />
      </Block>

      <Block tone="snow">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16">
          <ParallaxPhoto {...PH.court} className="h-72 rounded-xl md:h-[30rem]" sizes="(min-width: 768px) 26rem, 100vw" />
          <div>
            <ScrubText className="display max-w-2xl text-2xl leading-snug md:text-4xl">
              {`Played every year since ${HISTORY.since} under the motto “${HISTORY.motto}”, hosted by a different High Court each time.`}
            </ScrubText>
            <p className="num mt-6 max-w-xl text-lg text-navy/70">Mumbai hosted it in {HISTORY.mumbai.slice(0, -1).join(", ")} and {HISTORY.mumbai.at(-1)}.</p>
            <Link href="/about" className={`mt-6 inline-flex min-h-11 items-center ${arrow}`}>About BACA</Link>
          </div>
        </div>
        <div className="mt-12 md:mt-16">
          <p className="mb-4 text-base text-navy/70">From the archive. Drag to scroll.</p>
          <ArchiveReel photos={ARCHIVE} />
        </div>
      </Block>

      <Block tone="white">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SlideTextReveal className="display uppercase text-3xl md:text-5xl">
              <h2>Cricket and court</h2>
            </SlideTextReveal>
            <p className="mt-5 max-w-md text-lg text-navy/70">A Hindi poem on cricket and the courtroom, shared by BACA.</p>
            <Link href="/poem" className={`mt-6 inline-flex min-h-11 items-center ${arrow}`}>Read the poem</Link>
          </div>
          <Stanza i={1} />
        </div>
      </Block>

      <Block title="Questions" tone="snow">
        <Faq items={FAQ} />
      </Block>

      <Block title="Sponsors" tone="white">
        <Tiers />
      </Block>

      <Block title="Downloads" tone="snow">
        <Downloads />
      </Block>

      <Block title="Contact details" tone="white">
        <Contacts />
      </Block>

      <section className="px-2 pt-2">
        <div className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-2xl bg-navy px-6 py-12 text-white md:min-h-[32rem] md:px-12 md:py-16">
          <Image src={PH.cheer.src} alt={PH.cheer.alt} fill sizes="100vw" className="-z-10 object-cover object-[50%_30%]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/70" />
          <SlideTextReveal className="display display-long max-w-[16ch] text-4xl md:text-7xl">
            <h2>Eight days of cricket. One legal fraternity.</h2>
          </SlideTextReveal>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <MagneticButton href="/fixtures" tone="onDark">Fixtures</MagneticButton>
            <MagneticButton href="/contact" tone="outlineOnDark">Contact</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
