// Results from the CricHeroes feed (match.baca-cricket.com/api/live), finals played 24-10-2026.
// Next week this moves to its own tournament page; the home page keeps BACA first.
const FINALS = [
  { title: "Champions", team: "Supreme Court", line: "247/7 beat Allahabad 222 by 25 runs", ground: "Police Gymkhana" },
  { title: "Second final", team: "Aurangabad", line: "123/3 beat Andhra Pradesh 117 by 7 wickets", ground: "CCI" },
];

export function HomeTribute() {
  return (
    <section id="tribute" aria-labelledby="tribute-title" className="bg-navy px-4 py-14 text-white sm:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <h2 id="tribute-title" className="display-xl">Curtains down on Mumbai 2026</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
          Sixteen teams of advocates, eight days, a trophy lifted at Wankhede. BACA hosted the 38th All India Advocates’ Cricket Tournament for the Vijay Tulpule Trophy, and we thank every player, umpire, sponsor and supporter who made it.
        </p>
        <ul className="mt-9 grid gap-4 md:grid-cols-2">
          {FINALS.map((f) => (
            <li key={f.team} className="rounded-[12px] bg-white p-6 text-navy sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-royal">{f.title}</p>
              <p className="display-xl mt-2">{f.team}</p>
              <p className="mt-3 text-navy/70">Final, 24-10-2026, {f.ground}. {f.line}.</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
