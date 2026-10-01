"use client";

import { FAQContent, FAQGroup, FAQTitle, FAQWrapper } from "@/components/effects/animated-faq";

// Hyperiux animated-faq: one answer open at a time, height animated with GSAP. Answers come from facts
// already on the site (src/lib/site.ts), passed in so there is one place to correct them.
export function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <FAQGroup allowMultiple={false} defaultOpenItems={["0"]}>
      <div className="grid gap-2">
        {items.map((it, i) => (
          <FAQWrapper
            key={it.q}
            itemId={String(i)}
            className="rounded-2xl bg-mist px-5 py-5 transition-colors hover:bg-mint md:px-7"
            titleClassName="display text-xl md:text-2xl"
            iconSize={20}
            iconStrokeWidth={1.8}
            duration={0.5}
          >
            <FAQTitle className="pb-0">{it.q}</FAQTitle>
            <FAQContent className="pt-4 text-lg text-ink/70">{it.a}</FAQContent>
          </FAQWrapper>
        ))}
      </div>
    </FAQGroup>
  );
}
