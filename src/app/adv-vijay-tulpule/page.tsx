import type { Metadata } from "next";
import Link from "next/link";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { TULPULE, tie } from "@/lib/site";
import { cta, glance, hero, legacy, nav, sections, sourceNote, timeline, tributes } from "./content";

export const metadata: Metadata = {
  title: "The late Adv. Vijay Tulpule",
  description:
    "The life of the late Adv. Vijay Tulpule (1943 to 2017): criminal trial lawyer at the Bombay Bar, Government Pleader and Public Prosecutor, and patron of Advocates’ cricket. From the Bombay High Court’s Full Court Reference.",
};

// Layout for content.ts, following WIREFRAME.md. On phones every group of three or more is one dashed list in a tile;
// the cards and the contents rail appear from md and lg. Facts are set as a plain list, not a big-number strip.
const body = "text-lg leading-relaxed text-ink/80 md:text-xl";
const tile = "rounded-2xl bg-mist px-4 md:bg-transparent md:px-0";
const item = "border-b border-dashed border-ink/15 py-4 last:border-0";

function Part({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-dashed border-ink/15 pt-10 first:border-0 first:pt-0 md:pt-14 md:first:pt-0">
      <h2 className="display mb-6 text-3xl md:text-5xl">{title}</h2>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <section className="px-2 pt-2">
        <div className="rounded-2xl bg-mist px-4 pb-12 pt-24 md:px-10 md:pb-16 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-8 text-base text-ink/60">
              <Link href="/trophy" className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-ink hover:underline">Trophy</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page">Adv. Vijay Tulpule</span>
            </nav>
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
              <CurtainPortrait src={hero.image} alt={hero.imageAlt} caption={hero.caption} width={hero.imageW} height={hero.imageH} className="max-w-[16rem] lg:max-w-none" />
              <div>
                <p className="rise text-sm font-medium uppercase tracking-[0.08em] text-ink/60">{hero.kicker}</p>
                <p className="rise mt-4 text-2xl text-ink/70 md:text-3xl" style={{ animationDelay: "60ms" }}>{hero.prefix}</p>
                <h1 className="display rise text-5xl md:text-6xl xl:text-7xl" style={{ animationDelay: "120ms" }}>{tie(hero.name)}</h1>
                <p className="num rise mt-4 text-xl text-ink/70" style={{ animationDelay: "200ms" }}>{hero.dates}</p>
                <p className="rise mt-6 max-w-xl text-lg text-ink/75 md:text-xl" style={{ animationDelay: "280ms" }}>{tie(hero.descriptor)}</p>
                <p className="rise mt-4 text-base text-ink/60" style={{ animationDelay: "340ms" }}>From the Full Court Reference, Bombay High Court, 2017.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <dl className={`${tile} md:grid md:grid-cols-2 md:gap-x-10 lg:grid-cols-4`}>
          {glance.map((g) => (
            <div key={g.value} className={`${item} md:border-b-0 md:border-t md:py-5`}>
              <dt className="num text-2xl font-semibold text-pitch">{g.value}</dt>
              <dd className="mt-1 text-ink/70">{g.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-16 md:mt-20 lg:grid-cols-[15rem_1fr] lg:gap-20">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-28 grid">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="flex min-h-11 items-center text-ink/60 transition-colors hover:text-ink">{n.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid max-w-3xl gap-14 md:gap-20">
            {sections.map((s) => (
              <Part key={s.id} id={s.id} title={s.title}>
                {s.paragraphs.map((p) => (
                  <p key={p} className={body}>{tie(p)}</p>
                ))}
                {s.callout && (
                  <blockquote className="border-l-2 border-pitch pl-5 md:pl-8">
                    <p className="display text-2xl leading-snug md:text-3xl">“{s.callout.text}”</p>
                    <footer className="mt-3 text-base text-ink/60">{tie(s.callout.by)}</footer>
                  </blockquote>
                )}
                {s.cases && (
                  <div className="mt-2">
                    <h3 className="display mb-4 text-2xl md:text-3xl">Notable matters</h3>
                    <ul className={`${tile} md:grid md:grid-cols-2 md:gap-3`}>
                      {s.cases.map((c) => (
                        <li key={c.title} className={`${item} md:lift md:rounded-2xl md:border-0 md:bg-mist md:p-6`}>
                          <p className="text-lg font-semibold leading-snug">{c.title}</p>
                          <p className="mt-2 text-ink/75">{tie(c.body)}</p>
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

            <Part id="timeline" title="Timeline">
              <ol className="rule">
                {timeline.map((e) => (
                  <li key={e.year} className="border-b border-dashed border-ink/15 py-5 md:grid md:grid-cols-[11rem_1fr] md:gap-x-10 md:py-6">
                    <span className="num mb-1 block text-base font-semibold text-pitch md:mb-0 md:text-lg">{e.year}</span>
                    <span className="text-base leading-relaxed text-ink/80 md:text-lg">{tie(e.text)}</span>
                  </li>
                ))}
              </ol>
            </Part>

            <Part id="tributes" title="Tributes at the Full Court Reference">
              <ul className={`${tile} md:grid md:grid-cols-2 md:gap-3`}>
                {tributes.map((t) => (
                  <li key={t.by} className={`${item} md:lift md:rounded-2xl md:border-0 md:bg-mist md:p-6`}>
                    <blockquote className="text-xl leading-snug">“{t.quote}”</blockquote>
                    <p className="mt-3 font-semibold">{t.by}</p>
                    <p className="text-ink/60">{t.role}</p>
                  </li>
                ))}
              </ul>
            </Part>

            <Part id={legacy.id} title={legacy.title}>
              {legacy.paragraphs.map((p) => (
                <p key={p} className={body}>{tie(p)}</p>
              ))}
              <blockquote className="border-l-2 border-pitch pl-5 md:pl-8">
                <p className="display text-2xl leading-snug md:text-3xl">“{legacy.closing}”</p>
                <footer className="mt-3 text-base text-ink/60">{tie(legacy.closingBy)}</footer>
              </blockquote>
            </Part>
          </div>
        </div>
      </div>

      <section className="mx-2 rounded-2xl bg-pitch py-14 text-paper md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <h2 className="display text-4xl md:text-6xl">{cta.title}</h2>
            <p className="mt-3 text-xl text-paper/80">{cta.body}</p>
          </div>
          <div className="flex-none">
            <MagneticButton href={cta.href} tone="onDark">{cta.label}</MagneticButton>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-ink/60 md:px-8">
        <p>{tie(sourceNote)}</p>
        <a href={TULPULE.source.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-base font-semibold text-ink underline decoration-pitch decoration-2 underline-offset-8 transition-colors hover:text-pitch">{TULPULE.source.label}</a>
      </div>
    </>
  );
}
