import { MagneticButton } from "@/components/gems/MagneticButton";
import { SpotlightCard } from "@/components/gems/SpotlightCard";
import { TIERS } from "@/lib/site";

export function Tiers({ cta = "Sponsor the event" }: { cta?: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
  );
}
