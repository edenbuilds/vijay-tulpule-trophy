import { Logo } from "@/components/brand/Logo";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { EVENT, ORG } from "@/lib/site";
import { TOURNAMENT } from "@/lib/schedule";

const FACTS = [
  ["17 to 24 Oct", "Tournament dates"],
  ["16 Teams", "Across India"],
  [`${EVENT.overs} Overs`, "Per side"],
  ["Mumbai + Navi Mumbai", "Host cities"],
];

export function HomeHero() {
  return (
    <section className="px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-2xl bg-sky text-navy">
        <div className="grid items-center gap-4 px-5 pb-5 pt-7 sm:px-8 md:gap-8 md:px-10 md:pb-8 md:pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-14 lg:py-12">
          <div>
            <h1 className="display max-w-[14ch] text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.02]">38th All India Advocates’ Cricket Tournament 2026</h1>
            <p className="mt-5 max-w-xl text-xl font-semibold leading-snug sm:text-2xl">Eight days of cricket. Sixteen teams. One legal fraternity.</p>
            <p className="mt-4 text-lg text-navy/75">{TOURNAMENT.span}<span aria-hidden="true"> · </span><br className="sm:hidden" />Mumbai and Navi Mumbai</p>
            <p className="mt-2 text-base text-navy/65">Hosted by the {ORG.name}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href="/fixtures">View Fixtures</MagneticButton>
              <MagneticButton href="/teams" tone="outline">Meet the Teams</MagneticButton>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-navy/15 pt-5 sm:grid-cols-4 lg:mt-10">
              {FACTS.map(([value, label]) => (
                <div key={label} className="min-w-0">
                  <dt className="display text-lg leading-tight sm:text-xl">{value}</dt>
                  <dd className="mt-1 text-sm text-navy/65">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mx-auto flex w-full max-w-[32rem] items-center justify-center px-3 py-4 sm:px-8 lg:px-0 lg:py-0">
            <Logo priority alt="38th All India Advocates’ Cricket Tournament, Mumbai 2026" sizes="(min-width: 1280px) 32rem, (min-width: 1024px) 40vw, 84vw" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
