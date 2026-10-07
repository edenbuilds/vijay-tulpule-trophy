import type { Metadata } from "next";
import Link from "next/link";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { Stroke } from "@/components/brand/Stroke";
import { Block, Hero } from "@/components/Sections";
import { TULPULE, tie } from "@/lib/site";
import { cta, glance, hero, legacy, nav, sections, sourceNote, timeline, tributes } from "./content";

export const metadata: Metadata = {
  title: "The late Adv. Vijay Tulpule",
  description:
    "The life of the late Adv. Vijay Tulpule (1943 to 2017): criminal trial lawyer at the Bombay Bar, Government Pleader and Public Prosecutor, and patron of Advocates’ cricket. From the Bombay High Court’s Full Court Reference.",
};

// Layout for content.ts, following WIREFRAME.md. Every section is a white tile on the page. On phones every group of three or more
// is one dashed list inside its tile; from md the notable matters and the tributes become snow cards inside the tile.
// Section headings of three words or fewer are capitals, like the Block headings elsewhere.
const body = "text-base leading-relaxed text-navy/80 md:text-xl";
const item = "border-b border-dashed border-navy/15 py-4 last:border-0";
const card = "md:rounded-2xl md:border-0 md:p-6";
// Tiles alternate sky and white down the page, starting with sky because the profile block above is white. Cards and quotes inside take the other tone, and years take navy on sky
// (small royal text does not reach contrast on sky).
const TONES = {
  white: { box: "bg-white", card: "md:bg-snow", quote: "bg-sky", year: "text-royal" },
  sky: { box: "bg-sky", card: "md:bg-white", quote: "bg-white", year: "text-navy" },
};
const toneAt = (i: number) => TONES[i % 2 ? "white" : "sky"];
const caps = (t: string) => (t.trim().split(/\s+/).length <= 3 ? "uppercase" : "");

function Part({ id, title, i, children }: { id: string; title: string; i: number; children: React.ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-24 rounded-2xl px-5 py-8 md:px-10 md:py-12 ${toneAt(i).box}`}>
      <h2 className={`display mb-6 text-3xl !leading-[1.1] md:mb-8 md:text-5xl ${caps(title)}`}>{title}</h2>
      <div className="grid max-w-3xl gap-5">{children}</div>
    </section>
  );
}

function Quote({ text, by, bg }: { text: string; by: string; bg: string }) {
  return (
    <blockquote className={`rounded-2xl px-5 py-6 md:px-8 md:py-8 ${bg}`}>
      <p className="display display-long text-2xl !leading-[1.25] md:text-3xl">“{text}”</p>
      <footer className="mt-4 text-base text-navy/75">{tie(by)}</footer>
    </blockquote>
  );
}

export default function Page() {
  return (
    <>
      <Hero eyebrow={hero.kicker} title={`${hero.prefix} ${hero.name}`} sub={hero.dates} />

      <Block tone="white">
        <nav aria-label="Breadcrumb" className="mb-8 text-base text-navy/70">
          <Link href="/trophy" className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-navy hover:underline">Trophy</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page">Adv. Vijay Tulpule</span>
        </nav>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <CurtainPortrait src={hero.image} alt={hero.imageAlt} caption={hero.caption} width={hero.imageW} height={hero.imageH} className="max-w-[16rem] lg:max-w-none" />
          <div>
            <p className="display display-long max-w-3xl text-2xl !leading-[1.25] md:text-4xl">{tie(hero.descriptor)}</p>
            <p className="mt-4 text-base text-navy/70">From the Full Court Reference, Bombay High Court, 2017.</p>
            <dl className="mt-8 rounded-2xl bg-snow px-4 md:mt-10 md:grid md:grid-cols-2 md:gap-x-10 md:px-8">
              {glance.map((g) => (
                <div key={g.value} className={item}>
                  <dt className="num text-2xl font-extrabold text-navy">{g.value}</dt>
                  <dd className="mt-1 text-navy/75">{g.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Block>

      <div className="mx-2 mt-2 grid gap-2 lg:mx-auto lg:max-w-6xl lg:grid-cols-[14rem_1fr] lg:gap-8">
        <nav aria-label="On this page" className="hidden py-6 lg:block">
          <ul className="sticky top-28 grid">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="flex min-h-11 items-center text-navy/70 transition-colors hover:text-navy">{n.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid max-w-4xl gap-2">
          {sections.map((s, i) => (
            <Part key={s.id} id={s.id} title={s.title} i={i}>
              {s.paragraphs.map((p) => (
                <p key={p} className={body}>{tie(p)}</p>
              ))}
              {s.callout && <Quote text={s.callout.text} by={s.callout.by} bg={toneAt(i).quote} />}
              {s.cases && (
                <div className="mt-2 max-w-none">
                  <h3 className="display mb-3 text-2xl md:text-3xl">Notable matters</h3>
                  <ul className="md:grid md:grid-cols-2 md:gap-3">
                    {s.cases.map((c) => (
                      <li key={c.title} className={`${item} ${card} ${toneAt(i).card}`}>
                        <p className="text-lg font-semibold leading-snug">{c.title}</p>
                        <p className="mt-2 text-navy/75">{tie(c.body)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {s.afterCases?.map((p) => (
                <p key={p} className={body}>{tie(p)}</p>
              ))}
            </Part>
          ))}

          <Part id="timeline" title="Timeline" i={sections.length}>
            <ol className="rule max-w-none">
              {timeline.map((e) => (
                <li key={e.year} className="border-b border-dashed border-navy/15 py-5 last:border-0 md:grid md:grid-cols-[11rem_1fr] md:gap-x-10 md:py-6">
                  <span className={`num mb-1 block text-base font-semibold md:mb-0 md:text-lg ${toneAt(sections.length).year}`}>{e.year}</span>
                  <span className="text-base leading-relaxed text-navy/80 md:text-lg">{tie(e.text)}</span>
                </li>
              ))}
            </ol>
          </Part>

          <Part id="tributes" title="Tributes at the Full Court Reference" i={sections.length + 1}>
            <ul className="max-w-none md:grid md:grid-cols-2 md:gap-3">
              {tributes.map((t) => (
                <li key={t.by} className={`${item} ${card} ${toneAt(sections.length + 1).card}`}>
                  <blockquote className="text-xl leading-snug">“{t.quote}”</blockquote>
                  <p className="mt-3 font-semibold">{t.by}</p>
                  <p className="text-navy/70">{t.role}</p>
                </li>
              ))}
            </ul>
          </Part>

          <Part id={legacy.id} title={legacy.title} i={sections.length + 2}>
            {legacy.paragraphs.map((p) => (
              <p key={p} className={body}>{tie(p)}</p>
            ))}
            <Quote text={legacy.closing} by={legacy.closingBy} bg={toneAt(sections.length + 2).quote} />
          </Part>
        </div>
      </div>

      <section className="relative isolate mx-2 mt-2 overflow-hidden rounded-2xl bg-navy py-14 text-white md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-20 -z-10 w-[22rem] md:-right-24 md:w-[36rem]">
          <Stroke className="w-full" />
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 md:px-8">
          <div>
            <h2 className="display text-4xl md:text-6xl">{cta.title}</h2>
            <p className="mt-3 text-xl text-white/80">{cta.body}</p>
          </div>
          <MagneticButton href={cta.href} tone="onDark">{cta.label}</MagneticButton>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 text-base text-navy/70 md:px-8">
        <p>{tie(sourceNote)}</p>
        <a href={TULPULE.source.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-base font-semibold text-navy underline decoration-royal decoration-2 underline-offset-8 transition-colors hover:text-royal">{TULPULE.source.label}</a>
      </div>
    </>
  );
}
