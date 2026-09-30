import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { Block, Hero, Timeline } from "@/components/Sections";
import { CEREMONIES, PHOTOS } from "@/lib/site";

export const metadata: Metadata = { title: "Ceremonies" };

export default function Ceremonies() {
  return (
    <>
      <Hero title="Ceremonies" sub="Opening, ceremonial sitting, trophy evening" photo={PHOTOS.crowd} />
      <nav aria-label="Ceremonies" className="grid grid-cols-3 gap-2 px-2 pt-2">
        {CEREMONIES.map((c, i) => (
          <a key={c.id} href={`#${c.id}`} className={`lift press flex min-h-28 flex-col justify-between rounded-2xl p-4 hover:bg-sage md:min-h-36 md:p-8 ${i === 1 ? "bg-mist" : "bg-mint"}`}>
            <span className="num text-sm text-ink/55">0{i + 1}</span>
            <span className="display text-lg md:text-3xl">{c.title}</span>
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
            </div>
            <Timeline steps={c.steps} />
          </div>
        </Block>
      ))}
    </>
  );
}
