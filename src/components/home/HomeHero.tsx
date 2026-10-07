"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/components/brand/Logo";
import { Shape } from "@/components/brand/Shape";
import { Stroke } from "@/components/brand/Stroke";
import { Countdown } from "@/components/Countdown";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { ORG } from "@/lib/site";
import { TOURNAMENT } from "@/lib/schedule";

gsap.registerPlugin(ScrollTrigger);

// Home hero: a light tile on sky with the logo as the title (the h1 is the logo image, so its alt text is the page title).
// No photograph behind it. One stroke and the shape sit at the tile edge and are clipped by it; both drift slower than the
// page on scroll (GSAP on their wrappers only, the text uses the CSS .rise entrance, so no element has two animation systems).
// The text column is kept clear of both pieces of art: they live in the top corners, the text sits lower.
export function HomeHero() {
  const root = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".g-drift",
        { yPercent: 0 },
        { yPercent: 16, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-2 pt-2">
      <div className="relative isolate flex min-h-[calc(100svh-8.5rem)] flex-col justify-end overflow-hidden rounded-2xl bg-sky text-navy">
        <div aria-hidden="true" className="g-drift pointer-events-none absolute -right-14 -top-8 -z-10 w-[14rem] md:-right-28 md:-top-20 md:w-[32rem]">
          <Stroke className="w-full" />
        </div>
        <div aria-hidden="true" className="g-drift pointer-events-none absolute -left-8 -top-5 -z-10 w-[6.5rem] md:-left-20 md:-top-12 md:w-[16rem]">
          <Shape className="w-full" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl items-end gap-8 px-4 pb-10 pt-32 md:px-8 md:pb-16 md:pt-48 lg:grid-cols-[55fr_45fr] lg:gap-14 lg:pt-56">
          <h1 className="rise !leading-none">
            <Logo priority sizes="(min-width: 1280px) 42rem, (min-width: 1024px) 55vw, 92vw" className="w-full max-w-[34rem] lg:max-w-none" />
          </h1>

          <div className="rise flex flex-col items-start gap-5 lg:pb-6" style={{ animationDelay: "160ms" }}>
            <span aria-hidden="true" className="h-1 w-12 rounded-full bg-red" />
            <p className="display text-4xl md:text-6xl">{TOURNAMENT.span}</p>
            <p className="text-xl font-semibold md:text-2xl">Mumbai and Navi Mumbai</p>
            <p className="max-w-md text-lg text-navy/70">Hosted by the {ORG.name}</p>
            <Countdown className="display num text-3xl text-royal md:text-5xl" />
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <MagneticButton href="/fixtures">Fixtures</MagneticButton>
              <MagneticButton href="/teams" tone="outline">Teams</MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
