import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeLinks } from "@/components/home/HomeLinks";
import { HomeSchedule } from "@/components/home/HomeSchedule";
import { Converge } from "@/components/home/Converge";
import { GalleryZoom } from "@/components/home/GalleryZoom";
import { Faq } from "@/components/home/Faq";
import { Downloads } from "@/components/Downloads";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { Stanza } from "@/components/Poem";
import { PH, ZOOM } from "@/lib/photos";
import { TEAMS } from "@/lib/teams";
import { EVENT, HISTORY } from "@/lib/site";

const FAQ = [
  { q: "When is the tournament?", a: "The tournament will be held from 17 to 24 October 2026." },
  { q: "Where will the tournament be played?", a: "Matches will be played across grounds in Mumbai and Navi Mumbai." },
  { q: "How many teams are participating?", a: "Sixteen teams representing advocates from 15 High Courts and the Supreme Court of India are participating." },
  { q: "What is the match format?", a: `Matches will be played over ${EVENT.overs} overs per side.` },
  { q: "Is there a reserve day?", a: "Yes. 21 October has been kept as a reserve day." },
  { q: "Where can I find the fixtures?", a: <>Confirmed tournament dates and grounds are available on the <Link href="/fixtures" className="font-semibold text-royal underline underline-offset-4">Fixtures page</Link>.</> },
];

const stats = [
  { value: `Since ${HISTORY.since}`, label: "An annual advocates’ cricket tradition" },
  { value: "16 Teams", label: "From across India’s legal fraternity" },
  { value: "Mumbai 2026", label: "Hosted by BACA" },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeLinks />
      <HomeSchedule />

      <section aria-labelledby="trophy-home-title" className="bg-navy px-4 py-14 text-white sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] items-center gap-9 md:grid-cols-[minmax(15rem,0.78fr)_1.22fr] md:gap-16">
          <figure className="mx-auto w-full max-w-[21rem]">
            <Image src="/img/tulpule-informal.jpg" alt="The late Adv. Vijay Tulpule in a white shirt and suspenders" width={508} height={661} className="h-auto w-full rounded-lg object-cover" />
            <figcaption className="mt-3 text-sm text-white/65">The late Adv. Vijay Tulpule</figcaption>
          </figure>
          <div>
            <h2 id="trophy-home-title" className="display max-w-[15ch] text-3xl leading-tight sm:text-4xl md:text-5xl">The Vijay Tulpule Trophy</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
              The winning team receives the trophy, named for the late Adv. Vijay Tulpule. He was a Bombay criminal lawyer, former Government Pleader and Public Prosecutor, and a Bombay Ranji Trophy probable.
            </p>
            <p className="mt-3 max-w-2xl text-base text-white/70">Details of the Rizvi Shield/Plate are being confirmed.</p>
            <Link href="/trophy" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white">
              Discover His Story <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Converge teams={TEAMS} />

      <section aria-labelledby="history-home-title" className="px-4 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] items-center gap-9 md:grid-cols-[1fr_1fr] md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sky-deep">
            <Image src={PH.court.src} alt={PH.court.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 id="history-home-title" className="display text-3xl leading-tight sm:text-4xl md:text-5xl">Cricket For Friendship Since 1989</h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/75">The All India Advocates’ Cricket Tournament has brought members of India’s legal fraternity together through cricket since 1989. A different High Court hosts each edition, giving advocates from across the country the chance to compete, reconnect and build friendships beyond the courtroom.</p>
            <p className="mt-3 text-lg leading-relaxed text-navy/75">Mumbai previously hosted the tournament in 1993 and 2005. In 2026, it returns once again.</p>
            <div className="mt-7 grid gap-x-6 gap-y-5 border-y border-navy/15 py-5 sm:grid-cols-3">
              {stats.map((stat) => <div key={stat.value}><p className="display text-xl">{stat.value}</p><p className="mt-1 text-sm leading-relaxed text-navy/65">{stat.label}</p></div>)}
            </div>
            <Link href="/about" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">
              About BACA <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <GalleryZoom photos={ZOOM} />

      <section aria-labelledby="poem-home-title" className="px-4 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] items-center gap-8 md:grid-cols-2 md:gap-14">
          <div>
            <h2 id="poem-home-title" className="display text-3xl leading-tight sm:text-4xl md:text-5xl">Two Different Fields. Many Of The Same Values.</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy/75">Preparation. Patience. Strategy. Discipline. Fair play.</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-navy/75">Read a Hindi poem shared by BACA that draws a thoughtful connection between the game of cricket and the practice of law.</p>
            <Link href="/poem" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">
              Read The Poem <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="rounded-xl bg-sky px-5 py-6 sm:px-8 sm:py-8"><Stanza i={1} /></div>
        </div>
      </section>

      <section aria-labelledby="sponsors-home-title" className="bg-sky px-4 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <h2 id="sponsors-home-title" className="display text-3xl leading-tight sm:text-4xl md:text-5xl">Support A Tournament That Brings India’s Legal Fraternity Together</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/75">Partner with the 38th All India Advocates’ Cricket Tournament and place your organisation alongside an event with decades of history. Sponsorship opportunities are available across tournament branding, grounds, programmes, streaming and event partnerships.</p>
          </div>
          <div className="shrink-0">
            <p className="display text-2xl sm:text-3xl">From ₹5,00,000</p>
            <Link href="/sponsors" className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">
              Explore Sponsorship Opportunities <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="downloads-home-title" className="px-4 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="downloads-home-title" className="display text-3xl leading-tight sm:text-4xl">Tournament Information In One Place</h2>
              <p className="mt-2 text-lg text-navy/70">Access tournament fixtures, calendar dates, sponsorship information and official BACA assets.</p>
            </div>
            <Link href="/downloads" className="inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal">
              View Downloads <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-6"><Downloads compact /></div>
        </div>
      </section>

      <section aria-labelledby="faq-home-title" className="bg-white px-4 py-14 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <h2 id="faq-home-title" className="display mb-7 text-3xl sm:text-4xl">Questions About The Tournament</h2>
          <Faq items={FAQ} />
        </div>
      </section>

      <section className="px-3 py-3 sm:px-5">
        <div className="relative mx-auto flex min-h-[22rem] max-w-[1440px] items-end overflow-hidden rounded-2xl bg-navy px-5 py-9 text-white sm:px-9 md:min-h-[27rem] md:px-12 md:py-12">
          <Image src={PH.cheer.src} alt={PH.cheer.alt} fill sizes="100vw" className="object-cover object-[50%_30%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-navy/70" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="display text-3xl leading-tight sm:text-4xl md:text-6xl">Come For The Cricket. Leave With New Friendships.</h2>
            <p className="mt-4 text-lg text-white/85">Join the legal fraternity in Mumbai from 17 to 24 October 2026.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href="/fixtures" tone="onDark">View Fixtures</MagneticButton>
              <MagneticButton href="/contact" tone="outlineOnDark">Contact BACA</MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
