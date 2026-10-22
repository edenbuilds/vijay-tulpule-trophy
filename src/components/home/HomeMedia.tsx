import { ArrowUpRight } from "lucide-react";

// Press coverage found by web search on 22-10-2026. Add new pieces at the top; link out, never copy the text.
const PRESS = [
  {
    outlet: "VIE Stories",
    date: "22 Oct 2026",
    title: "38th All India Advocates Cricket Tournament enters quarter-finals in Mumbai as eight teams battle for championship",
    href: "https://viestories.com/press-release/38th-all-india-advocates-cricket-tournament-enters-quarter-finals-in-mumbai-as-eight-teams-battle-for-championship-12717041",
  },
  {
    outlet: "Hindustan Metro",
    date: "Oct 2026",
    title: "Mumbai to host the 38th All India Advocates Cricket Tournament, 17 to 24 October 2026",
    href: "https://hindustanmetro.com/mumbai-38th-all-india-advocates-cricket-tournament-october-2026",
  },
];

export function HomeMedia() {
  return (
    <section aria-labelledby="media-title" className="bg-snow pb-16 text-navy md:pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 id="media-title" className="display mb-8 text-5xl uppercase md:text-6xl">In the press</h2>
        <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
          {PRESS.map((p) => (
            <li key={p.href}>
              <a href={p.href} target="_blank" rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-6 rounded-[12px] border border-navy/10 bg-white p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-navy/30 active:scale-[.99] md:p-6">
                <span className="text-lg font-semibold leading-snug md:text-xl">{p.title}</span>
                <span className="flex items-center justify-between text-sm text-navy/60">
                  <span>{p.outlet} · {p.date}</span>
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
