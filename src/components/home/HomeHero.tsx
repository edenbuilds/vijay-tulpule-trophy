"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/components/brand/Logo";
import { Stroke } from "@/components/brand/Stroke";
import { Countdown } from "@/components/Countdown";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { ORG } from "@/lib/site";
import { TOURNAMENT } from "@/lib/schedule";

gsap.registerPlugin(ScrollTrigger);

// BACA's own motto leads; the supplied tournament lockup keeps the event identity in view without an archive photograph.
// The logo mask and copy stagger form one short opening sequence. Reduced-motion users get the finished layout immediately.
export function HomeHero() {
  const root = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { overwrite: "auto" } });
      intro
        .fromTo(
          ".hero-logo",
          { clipPath: "inset(0 100% 0 0)", scale: 1.035 },
          { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.1, ease: "power3.inOut" },
          0.05,
        )
        .fromTo(".hero-accent", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, 0.24)
        .fromTo(".hero-copy > *", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.075, ease: "power2.out" }, 0.38);

      gsap.fromTo(
        ".g-drift",
        { yPercent: 0 },
        { yPercent: 12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-2 pt-2">
      <div className="relative isolate grid min-h-[calc(100svh-8.5rem)] overflow-hidden rounded-2xl bg-sky text-navy lg:grid-cols-[1.05fr_0.95fr]">
        <div aria-hidden="true" className="g-drift pointer-events-none absolute -right-16 -top-10 -z-10 w-[15rem] md:-right-24 md:-top-20 md:w-[32rem]">
          <Stroke className="w-full" />
        </div>
        <div className="hero-copy relative z-10 order-2 mx-auto flex w-full max-w-7xl flex-col items-start justify-center gap-5 px-5 pb-10 pt-5 sm:px-8 md:gap-6 md:pb-14 lg:order-1 lg:col-start-1 lg:row-start-1 lg:px-10 lg:pb-16 lg:pt-16">
          <span aria-hidden="true" className="hero-accent h-1 w-12 rounded-full bg-red" />
          <h1 className="display max-w-[12ch] text-5xl leading-[0.98] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">Cricket for Friendship</h1>
          <p className="max-w-xl text-lg leading-relaxed text-navy/75 md:text-xl">
            Sixteen teams of practising advocates from 15 High Courts and the Supreme Court of India.
          </p>
          <div className="flex flex-col gap-1">
            <p className="display text-2xl md:text-3xl">{TOURNAMENT.span}</p>
            <p className="text-lg font-semibold md:text-xl">Mumbai and Navi Mumbai</p>
          </div>
          <p className="max-w-lg text-base text-navy/65">Hosted by the {ORG.name}</p>
          <Countdown className="display num text-3xl text-royal md:text-4xl" />
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <MagneticButton href="/fixtures">View fixtures</MagneticButton>
            <MagneticButton href="/teams" tone="outline">Meet the teams</MagneticButton>
          </div>
        </div>

        <div className="relative order-1 mx-auto flex w-full max-w-7xl items-end justify-center px-5 pb-0 pt-20 sm:px-8 lg:order-2 lg:col-start-2 lg:row-start-1 lg:items-center lg:px-7 lg:pb-10 lg:pt-20">
          <div className="hero-logo relative w-full max-w-[18rem] sm:max-w-[24rem] lg:max-w-[34rem]">
            <Logo priority alt="38th All India Advocates’ Cricket Tournament, Mumbai 2026" sizes="(min-width: 1280px) 34rem, (min-width: 1024px) 42vw, 86vw" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
