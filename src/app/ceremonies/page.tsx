import type { Metadata } from "next";
import { ArrowDown, CalendarDays, MapPin } from "lucide-react";
import { Block, Hero, ParallaxPhoto } from "@/components/Sections";
import { CEREMONIES } from "@/lib/site";
import { PH } from "@/lib/photos";

export const metadata: Metadata = { title: "Ceremonies" };

const PHOTO = { opening: PH.ceremonyOpening, sitting: PH.ceremonySitting, final: PH.ceremonyTrophy } as Record<string, (typeof PH)["ceremonies"]>;

// White, navy, sky down the page. Royal reads on white and sky; on navy the icons and secondary text are sky and white (never royal).
const LOOK = [
  { tone: "white", text: "text-navy/75", icon: "text-royal" },
  { tone: "navy", text: "text-white/75", icon: "text-sky" },
  { tone: "sky", text: "text-navy/75", icon: "text-royal" },
] as const;

export default function Ceremonies() {
  return (
    <>
      <Hero title="Ceremonies" sub="The opening, a formal sitting and the prize presentation." />
      {/* Phones: one tile, one dashed list. From md: three tiles. */}
      <nav aria-label="Ceremonies" className="mx-2 mt-2 overflow-hidden rounded-none bg-white md:grid md:grid-cols-3 md:gap-2 md:overflow-visible md:rounded-none md:bg-transparent">
        {CEREMONIES.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`lift press flex min-h-14 items-center justify-between gap-4 px-4 hover:bg-sky md:min-h-36 md:items-end md:rounded-none md:p-8 md:hover:bg-sky-deep ${i ? "border-t border-dashed border-navy/15 md:border-t-0" : ""} ${i === 1 ? "md:bg-white" : "md:bg-sky"}`}
          >
            <span className="display text-lg leading-tight md:text-3xl">{c.title}</span>
            <ArrowDown aria-hidden="true" className="size-5 shrink-0 text-royal md:hidden" strokeWidth={1.8} />
          </a>
        ))}
      </nav>
      {CEREMONIES.map((c, i) => {
        const look = LOOK[i % LOOK.length];
        return (
          <Block key={c.id} id={c.id} tone={look.tone}>
            <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
              <div className="md:sticky md:top-28 md:self-start">
                <h2 className="display uppercase text-4xl md:text-6xl">{c.title}</h2>
                <p className="num mt-6 flex items-start gap-2 font-semibold">
                  <CalendarDays aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${look.icon}`} strokeWidth={1.6} />
                  {c.when}
                </p>
                <p className={`mt-2 flex items-start gap-2 ${look.text}`}>
                  <MapPin aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${look.icon}`} strokeWidth={1.6} />
                  {c.where}
                </p>
                <p className={`mt-6 max-w-md text-lg ${look.text}`}>{c.line}</p>
                {c.note && <p className={`mt-4 max-w-md ${look.text}`}>{c.note}</p>}
                {PHOTO[c.id] && <ParallaxPhoto {...PHOTO[c.id]} className="mt-8 h-56 max-w-md rounded-none md:h-72" />}
              </div>
              <div>
                <ol>
                  {c.steps.map((s, j) => (
                    <li key={s.what} className={`py-4 text-lg md:py-5 md:text-xl ${j ? "rule" : "pt-0"}`}>{s.what}</li>
                  ))}
                </ol>
                <p className={`mt-6 ${look.text}`}>Order of events as planned, to be confirmed.</p>
              </div>
            </div>
          </Block>
        );
      })}
    </>
  );
}
