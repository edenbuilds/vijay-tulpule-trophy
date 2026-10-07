import { MagneticButton } from "@/components/gems/MagneticButton";
import { SpotlightCard } from "@/components/gems/SpotlightCard";
import { TIERS } from "@/lib/site";

// Phones get one dashed list (a stack of four tall cards was the clutter); sm and up keep the cards. The top tier is the navy
// one among sky tiles. One button under both layouts, so the cards stay the same height and none of them carries a lone CTA.
export function Tiers({ cta = "Sponsor the event" }: { cta?: string }) {
  return (
    <>
      <ul className="rule sm:hidden">
        {TIERS.map((t) => (
          <li key={t.name} className="row-line flex min-h-16 items-baseline justify-between gap-4 border-b border-dashed border-navy/15 py-4">
            <span>
              <span className="block text-lg font-semibold">{t.name}</span>
              <span className="text-sm text-navy/70">{t.line}</span>
            </span>
            <span className="num font-semibold">{t.price}</span>
          </li>
        ))}
      </ul>
      <div className="hidden gap-2 sm:grid sm:grid-cols-2 xl:grid-cols-4">
        {TIERS.map((t, i) => {
          const top = t.name === "Platinum";
          return (
            <SpotlightCard
              key={t.name}
              index={i}
              className={`flex min-h-52 flex-col p-6 md:p-7 [&>div:last-child]:flex [&>div:last-child]:grow [&>div:last-child]:flex-col [&>div:last-child]:justify-between ${top ? "border-navy bg-navy text-white" : "border-transparent bg-sky"}`}
            >
              <h3 className="display text-2xl">{t.name}</h3>
              <div>
                <p className="display num text-3xl md:text-4xl">{t.price}</p>
                <p className={`mt-2 ${top ? "text-white/75" : "text-navy/70"}`}>{t.line}</p>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
      <div className="mt-6 md:mt-10">
        <MagneticButton href="/contact">{cta}</MagneticButton>
      </div>
    </>
  );
}
