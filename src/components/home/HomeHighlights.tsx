import Image from "next/image";
import { HIGHLIGHTS } from "@/lib/highlights";

// Words rise in one by one; the full sentence stays in the DOM so screen readers read it once.
const Words = ({ text, start = 0 }: { text: string; start?: number }) => (
  <>{text.split(" ").map((w, i) => <span key={i} className="hl-w" style={{ "--w": i + start } as React.CSSProperties}>{w}</span>).flatMap((s, i) => i ? [" ", s] : [s])}</>
);

// 16-10-2026: owner wanted a highlight reel right under the hero that catches the eye on arrival and grows through match week.
export function HomeHighlights() {
  if (!HIGHLIGHTS.length) return null;
  const [lead, ...rest] = HIGHLIGHTS;
  return (
    <section aria-labelledby="hl-title" className="hl px-4 py-14 sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="hl-head">
          <p className="hl-live"><span aria-hidden="true" />Highlights</p>
          <h2 id="hl-title" className="display text-5xl md:text-7xl">From the tournament</h2>
        </div>
        <div className={`hl-grid ${rest.length ? "has-rest" : ""}`}>
          <figure className="hl-lead">
            <div className="hl-frame">
              <div className="hl-photo hl-reveal">
                <Image src={lead.src} alt={lead.alt} width={lead.w} height={lead.h} priority sizes="(min-width: 1024px) 560px, 92vw" className="h-auto w-full" />
              </div>
            </div>
            <figcaption className="hl-cap">
              {lead.date && <span className="num">{lead.date}</span>}
              <p><Words text={lead.caption} /></p>
              {lead.tagline && <p className="hl-tag"><Words text={lead.tagline} start={lead.caption.split(" ").length + 2} /></p>}
            </figcaption>
          </figure>
          {rest.length > 0 && (
            <ul className="hl-rest">
              {rest.map((h, i) => (
                <li key={h.src} style={{ "--i": i } as React.CSSProperties}>
                  <Image src={h.src} alt={h.alt} width={h.w} height={h.h} sizes="(min-width: 1024px) 260px, 45vw" className="aspect-square h-auto w-full rounded-lg object-cover" />
                  <p>{h.caption}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
