"use client";

import { FAQContent, FAQGroup, FAQTitle, FAQWrapper } from "@/components/effects/animated-faq";

// Hyperiux animated-faq: one answer open at a time, height animated with GSAP. Answers come from facts
// already on the site (src/lib/site.ts), passed in so there is one place to correct them.
// Phones: all questions share one white tile on a dashed rule (a stack of eight cards was the clutter). From md each is its own tile.
export function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <FAQGroup allowMultiple={false} defaultOpenItems={["0"]}>
      <div className="grid rounded-2xl bg-white px-4 md:gap-2 md:rounded-none md:bg-transparent md:px-0">
        {items.map((it, i) => (
          <FAQWrapper
            key={it.q}
            itemId={String(i)}
            className="border-b border-dashed border-navy/15 py-4 transition-colors last:border-0 md:rounded-2xl md:border-0 md:bg-white md:px-7 md:py-5 md:hover:bg-sky"
            titleClassName="display display-long text-xl md:text-2xl"
            iconSize={20}
            iconStrokeWidth={1.8}
            duration={0.5}
          >
            <FAQTitle className="pb-0">{it.q}</FAQTitle>
            <FAQContent className="pt-4 text-lg text-navy/70">{it.a}</FAQContent>
          </FAQWrapper>
        ))}
      </div>
    </FAQGroup>
  );
}
