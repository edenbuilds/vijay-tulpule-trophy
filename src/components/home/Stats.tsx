"use client";

import * as React from "react";
import NumberCounterOne from "@/components/effects/number-counter/NumberCounterOne";

// Hyperiux number-counter: each digit is a 0-9 column that rolls up to its value when the band scrolls in.
// One counter per figure so the labels sit under them; reduced motion gets plain numbers.
export function Stats({ items }: { items: [string, string][] }) {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);
  return (
    <section className="px-2 pt-2">
      <dl className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {items.map(([value, label], i) => (
          <div key={label} className={`flex min-h-44 flex-col-reverse justify-between gap-6 rounded-2xl p-5 md:min-h-56 md:p-8 ${["bg-mint", "bg-pitch text-paper", "bg-sage", "bg-mist"][i % 4]}`}>
            <dt className={`text-lg ${i % 4 === 1 ? "text-paper/80" : "text-ink/65"}`}>{label}</dt>
            <dd className="num display -ml-1 text-6xl md:text-8xl">
              <NumberCounterOne stats={[{ value }]} textColor="currentColor" textSize="text-6xl md:text-8xl" fontWeight="semibold" duration={1.6} stagger={0.12} reducedMotion={reduced} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
