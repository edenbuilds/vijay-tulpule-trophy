import { MagneticButton } from "@/components/gems/MagneticButton";
import { SpotlightCard } from "@/components/gems/SpotlightCard";
import { TIERS } from "@/lib/site";

// Phones get one dashed list (a stack of four tall cards was the clutter); sm and up keep the cards.
export function Tiers({ cta = "Sponsor the event" }: { cta?: string }) {
  return (
    <>
      <div className="sm:hidden">
        <ul className="rule">
          {TIERS.map((t) => (
            <li key={t.name} className="row-line flex min-h-16 items-baseline justify-between gap-4 border-b border-dashed border-ink/15 py-4">
              <span>
                <span className="block text-lg font-semibold">{t.name}</span>
                <span className="text-sm text-ink/60">{t.line}</span>
              </span>
              <span className="num font-semibold">{t.price}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <MagneticButton href="/contact">{cta}</MagneticButton>
        </div>
      </div>
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4">
        {TIERS.map((t, i) => {
          const top = t.name === "Platinum";
          return (
            <SpotlightCard
              key={t.name}
              index={i}
              className={`flex flex-col p-6 md:p-7 ${top ? "border-pitch bg-pitch text-paper" : "border-ink/10 bg-paper"}`}
            >
              <h3 className="text-xl font-bold">{t.name}</h3>
              <p className="num mt-6 text-3xl font-bold [font-stretch:112%]">{t.price}</p>
              <p className={`mt-3 ${top ? "text-paper/75" : "text-ink/60"}`}>{t.line}</p>
              {top && (
                <div className="mt-6">
                  <MagneticButton href="/contact" tone="onDark">{cta}</MagneticButton>
                </div>
              )}
            </SpotlightCard>
          );
        })}
      </div>
    </>
  );
}
