"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Stroke } from "@/components/brand/Stroke";
import { RollingWords } from "@/components/effects/rolling-text";
import SlideTextReveal from "@/components/effects/slide-text-reveal";
import { Countdown } from "@/components/Countdown";

gsap.registerPlugin(ScrollTrigger);

// Short headings (three words or fewer) are set in capitals, like the wordmark in the logo; longer ones stay sentence case
// and take the lighter 800 so a two-line heading does not turn into a block.
const headingStyle = (t: string) => (t.trim().split(/\s+/).length <= 3 ? "display uppercase" : "display display-long");

// Page header (every inner page): a compact navy tile, the title in heavy white bottom-left, optional sub line, facts row and
// buttons, and one brand stroke crossing the corner (top right on phones, lower right from md) that drifts slower than the page
// as you scroll. `photo` is accepted so old callers still compile, but headers no longer show one. `tall` is the larger tile
// that also carries the days-to-go line; the home page now has its own light hero (home/HomeHero.tsx).
export function Hero({
  eyebrow,
  title,
  sub,
  children,
  tall = false,
  facts,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  /** Retired: the navy header carries no photograph. Kept so pages that still pass one compile. */
  photo?: { src: string; alt: string };
  children?: React.ReactNode;
  tall?: boolean;
  facts?: string[];
}) {
  const root = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".g-drift",
        { yPercent: 0 },
        { yPercent: 14, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-2 pt-2">
      <div className={`relative isolate overflow-hidden rounded-2xl bg-navy text-white ${tall ? "min-h-[calc(100svh-8.5rem)]" : "min-h-[20rem] md:min-h-[26rem]"} flex flex-col justify-end`}>
        <div aria-hidden="true" className="g-drift pointer-events-none absolute -right-12 -top-6 -z-10 w-[15rem] md:-bottom-16 md:-right-16 md:top-auto md:w-[40rem]">
          <Stroke className="w-full" />
        </div>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-4 pb-8 pt-20 md:px-8 md:pb-12">
          {eyebrow && <p className="rise text-base font-semibold text-sky">{eyebrow}</p>}
          <h1 aria-label={title} className={`${headingStyle(title)} rise text-[clamp(2.25rem,11.5vw,4.5rem)] !leading-[1.2] md:text-[clamp(4.5rem,9vw,8.5rem)]`} style={{ animationDelay: "100ms" }}>
            <RollingWords text={title} />
          </h1>
          {sub && <p className="num rise max-w-2xl text-lg text-white/80 md:text-2xl" style={{ animationDelay: "200ms" }}>{sub}</p>}
          {tall && <Countdown className="display num rise text-4xl md:text-6xl" />}
          {children && <div className="rise mt-3 flex flex-wrap items-center gap-4" style={{ animationDelay: "320ms" }}>{children}</div>}
          {facts && (
            <div className="rule rise mt-3 grid w-full gap-2 pt-5 md:grid-cols-3" style={{ animationDelay: "480ms" }}>
              {facts.map((f, i) => (
                <p key={f} className={`num text-sm text-white/80 md:text-base ${["md:text-left", "md:text-center", "md:text-right"][i]}`}>{f}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// A photograph that drifts inside its rounded frame on scroll (image overscaled, frame clips it).
export function ParallaxPhoto({ src, alt, className = "", priority = false, sizes = "(min-width: 768px) 50vw, 100vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  const frame = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("img", { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={frame} className={`relative overflow-hidden bg-sky-deep ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="scale-[1.14] object-cover" />
    </div>
  );
}

// Page bands. snow sits on the page; white, sky and navy are inset tiles like the header. Alternate light and navy down a page.
// Headings are heavy navy (white on navy); the kicker is a plain sentence-case line, not a letter-spaced caption.
const BANDS = {
  snow: { box: "bg-snow", kicker: "text-royal" },
  white: { box: "mx-2 mt-2 rounded-2xl bg-white", kicker: "text-royal" },
  sky: { box: "mx-2 mt-2 rounded-2xl bg-sky", kicker: "text-royal" },
  navy: { box: "mx-2 mt-2 rounded-2xl bg-navy text-white", kicker: "text-sky" },
};

export function Block({
  title,
  kicker,
  children,
  tone = "snow",
  id,
}: {
  title?: string;
  kicker?: string;
  children: React.ReactNode;
  tone?: keyof typeof BANDS;
  id?: string;
}) {
  const band = BANDS[tone];
  return (
    <section id={id} className={`${band.box} py-12 md:py-24`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {kicker && <p className={`mb-3 text-base font-semibold ${band.kicker}`}>{kicker}</p>}
        {title && (
          <SlideTextReveal className="mb-6 md:mb-12">
            <h2 className={`${headingStyle(title)} text-4xl md:text-6xl`}>{title}</h2>
          </SlideTextReveal>
        )}
        {children}
      </div>
    </section>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

// Running order: a royal rule draws down the left edge as the section scrolls in, and each step
// rises in behind it on a 70ms stagger.
export function Timeline({ steps }: { steps: { time?: string; what: string }[] }) {
  const [ref, seen] = useInView<HTMLOListElement>();
  return (
    <ol ref={ref} className="relative grid gap-1 pl-7">
      <span
        aria-hidden="true"
        className={`absolute bottom-3 left-[5px] top-3 w-0.5 origin-top bg-royal transition-transform duration-[1200ms] ease-out motion-reduce:transition-none ${seen ? "scale-y-100" : "scale-y-0"}`}
      />
      {steps.map((s, i) => (
        <li
          key={i}
          className={`relative rounded-xl py-3 transition-all duration-500 ease-out motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: `${i * 70}ms` }}
        >
          <span aria-hidden="true" className="absolute -left-[27px] top-[1.15rem] size-3 rounded-full border-2 border-royal bg-white" />
          <span className="num grid gap-x-4 sm:grid-cols-[4rem_1fr]">
            <span className="font-semibold text-royal">{s.time ?? ""}</span>
            <span className="text-lg">{s.what}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
