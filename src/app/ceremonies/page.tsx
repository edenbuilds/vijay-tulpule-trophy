import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { Block, Hero, ParallaxPhoto, Timeline } from "@/components/Sections";
import { CEREMONIES } from "@/lib/site";
import { PH } from "@/lib/photos";

export const metadata: Metadata = { title: "Ceremonies" };

const PHOTO = { opening: PH.ceremonyOpening, sitting: PH.ceremonySitting, final: PH.ceremonyTrophy } as Record<string, (typeof PH)["ceremonies"]>;

export default function Ceremonies() {
  return (
    <>
      <Hero title="Ceremonies" sub="The opening, a formal sitting and the trophy evening." photo={PH.ceremonies} />
      <nav aria-label="Ceremonies" className="grid grid-cols-3 gap-2 px-2 pt-2">
        {CEREMONIES.map((c, i) => (
          <a key={c.id} href={`#${c.id}`} className={`lift press flex min-h-16 items-center rounded-2xl p-4 hover:bg-sage md:min-h-36 md:items-end md:p-8 ${i === 1 ? "bg-mist" : "bg-mint"}`}>
            <span className="display text-base leading-tight md:text-3xl">{c.title}</span>
          </a>
        ))}
      </nav>
      {CEREMONIES.map((c, i) => (
        <Block key={c.id} id={c.id} tone={i % 2 ? "cream" : "paper"}>
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <h2 className="display text-4xl md:text-6xl">{c.title}</h2>
              <p className="num mt-6 flex items-center gap-2 font-semibold"><CalendarDays aria-hidden="true" className="size-5 text-pitch" strokeWidth={1.6} />{c.when}</p>
              <p className="mt-2 flex items-center gap-2 text-ink/70"><MapPin aria-hidden="true" className="size-5 text-pitch" strokeWidth={1.6} />{c.where}</p>
              <p className="mt-6 max-w-md text-lg text-ink/70">{c.line}</p>
              {c.note && <p className="mt-4 max-w-md text-ink/55">{c.note}</p>}
              {PHOTO[c.id] && <ParallaxPhoto {...PHOTO[c.id]} className="mt-8 h-56 max-w-md rounded-xl md:h-72" />}
            </div>
            <Timeline steps={c.steps} />
          </div>
        </Block>
      ))}
    </>
  );
}
