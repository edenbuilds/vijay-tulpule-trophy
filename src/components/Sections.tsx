"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ball } from "@/components/Motion";
import { RollingWords } from "@/components/effects/rolling-text";
import SlideTextReveal from "@/components/effects/slide-text-reveal";
import { Countdown } from "@/components/Countdown";

gsap.registerPlugin(ScrollTrigger);

// Home hero ("tall"): a full tile of the team photograph under an ink wash, title bottom-left, the
// countdown to the opening bottom-right. The photo is lifted so the team's faces sit above the title, and fades
// into the ink tile; it drifts slower than the page as you scroll. On phones the photo is a band above the title
// instead of behind it, because a 390px crop of a team photo is all faces.
// Inner pages keep the quieter tile: title bottom-left beside a photo chosen for that page, on the
// drawn ground. The red cricket ball is the parallax accent on both: it drifts and spins as you scroll.
export function Hero({
  eyebrow,
  title,
  sub,
  photo,
  children,
  tall = false,
  facts,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
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
        { yPercent: 12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } },
      );
      gsap.fromTo(
        ".f-ball",
        { x: 0, y: 0, rotation: 0 },
        { x: tall ? -180 : -80, y: tall ? 360 : 140, rotation: 420, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } },
      );
    }, el);
    return () => ctx.revert();
  }, [tall]);

  const label = "text-xs font-medium uppercase tracking-[0.08em]";

  if (tall && photo) {
    return (
      <section ref={root} className="px-2 pt-2">
        <div className="relative isolate flex min-h-[calc(100svh-8.5rem)] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-paper">
          <div className="g-drift relative -mb-24 h-[42svh] md:absolute md:inset-x-0 md:-top-[24%] md:-z-10 md:mb-0 md:h-[112%] [mask-image:linear-gradient(to_bottom,black_70%,transparent_96%)]">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="object-cover object-[50%_35%]" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_26_22/0.94)_10%,rgb(20_26_22/0.7)_46%,rgb(20_26_22/0.08)_100%)]" />
          <div aria-hidden="true" className="f-ball pointer-events-none absolute right-[8%] top-6 z-[1] md:right-[12%] md:top-16">
            <Ball className="size-9 md:size-16" />
          </div>
          <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-5 pb-6 pt-28 md:gap-8 md:px-10 md:pb-10">
            {eyebrow && <p className={`rise ${label} text-sage`}>{eyebrow}</p>}
            <h1 aria-label={title} className="display rise max-w-[17ch] text-[2.5rem] !leading-[1.3] sm:text-6xl lg:text-[5.5rem]" style={{ animationDelay: "100ms" }}>
              <RollingWords text={title} />
            </h1>
            {sub && <p className="rise max-w-2xl text-lg text-paper/80 md:text-xl" style={{ animationDelay: "200ms" }}>{sub}</p>}
            <div className="rise flex flex-wrap items-end justify-between gap-x-10 gap-y-8" style={{ animationDelay: "400ms" }}>
              {children && <div className="flex flex-wrap items-center gap-4">{children}</div>}
              <Countdown />
            </div>
            {facts && (
              <div className="rise grid gap-2 border-t border-dashed border-paper/25 pt-5 md:grid-cols-3" style={{ animationDelay: "600ms" }}>
                {facts.map((f, i) => (
                  <p key={f} className={`num text-sm text-paper/75 md:text-base ${["md:text-left", "md:text-center", "md:text-right"][i]}`}>{f}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={root} className="px-2 pt-2">
      <div className="relative overflow-hidden rounded-2xl bg-mist">
        <Ground />
        <div aria-hidden="true" className="f-ball pointer-events-none absolute right-6 top-6 z-[1] md:right-[46%]">
          <Ball className="size-8 md:size-12" />
        </div>
        <div className="relative grid gap-6 p-4 pt-20 md:grid-cols-[1.15fr_1fr] md:gap-10 md:p-3 md:pl-10">
          <div className="flex flex-col items-start justify-end gap-5 md:pb-10">
            {eyebrow && <p className={`rise ${label} text-ink/60`}>{eyebrow}</p>}
            <h1 aria-label={title} className="display rise text-5xl !leading-[1.3] md:text-8xl" style={{ animationDelay: "100ms" }}>
              <RollingWords text={title} />
            </h1>
            {sub && <p className="num rise text-lg text-ink/70 md:text-2xl" style={{ animationDelay: "200ms" }}>{sub}</p>}
            {children && <div className="rise mt-3 flex flex-wrap items-center gap-4" style={{ animationDelay: "320ms" }}>{children}</div>}
          </div>
          {photo && <ParallaxPhoto {...photo} className="h-56 rounded-xl md:h-[26rem]" priority />}
        </div>
      </div>
    </section>
  );
}

// Hero background: a ground seen from above. Mowing stripes across the tile, then the boundary, the
// 30-yard circle and the pitch with its creases draw themselves in once, in pitch green at low contrast
// so the title stays readable. It drifts slower than the page as you scroll.
function Ground() {
  const line = "g-draw fill-none stroke-pitch";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="g-drift pointer-events-none absolute inset-0 size-full"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={i * 200} y="0" width="100" height="1000" className="fill-pitch/[0.035]" />
      ))}
      <g strokeWidth="2" opacity="0.28" vectorEffect="non-scaling-stroke">
        <ellipse pathLength={1} cx="800" cy="500" rx="740" ry="455" className={line} />
        <rect pathLength={1} x="530" y="250" width="540" height="500" rx="250" className={line} style={{ animationDelay: "300ms" }} />
        <rect pathLength={1} x="772" y="390" width="56" height="220" className={line} style={{ animationDelay: "600ms" }} />
        <path pathLength={1} d="M752 418 H848 M752 582 H848" className={line} style={{ animationDelay: "800ms" }} />
      </g>
      <rect x="772" y="390" width="56" height="220" className="fill-sage/50" />
    </svg>
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
    <div ref={frame} className={`relative overflow-hidden bg-sage ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="scale-[1.14] object-cover" />
    </div>
  );
}

export function Block({
  title,
  kicker,
  children,
  tone = "paper",
  id,
}: {
  title?: string;
  kicker?: string;
  children: React.ReactNode;
  tone?: "paper" | "cream" | "pitch";
  id?: string;
}) {
  // "cream" is a lifted Lab Mist panel, inset like the hero tile; the other tones sit on the canvas.
  const bg = tone === "cream" ? "mx-2 mt-2 rounded-2xl bg-mist" : tone === "pitch" ? "mx-2 mt-2 rounded-2xl bg-pitch text-paper" : "bg-paper";
  return (
    <section id={id} className={`${bg} py-12 md:py-24`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {kicker && <p className={`mb-3 text-xs font-medium uppercase tracking-[0.08em] ${tone === "pitch" ? "text-sage" : "text-ink/60"}`}>{kicker}</p>}
        {title && (
          <SlideTextReveal className="mb-6 md:mb-12">
            <h2 className="display text-4xl md:text-6xl">{title}</h2>
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

// Running order: a pitch-green rule draws down the left edge as the section scrolls in, and each step
// rises in behind it on a 70ms stagger.
export function Timeline({ steps }: { steps: { time?: string; what: string }[] }) {
  const [ref, seen] = useInView<HTMLOListElement>();
  return (
    <ol ref={ref} className="relative grid gap-1 pl-7">
      <span
        aria-hidden="true"
        className={`absolute bottom-3 left-[5px] top-3 w-0.5 origin-top bg-pitch transition-transform duration-[1200ms] ease-out motion-reduce:transition-none ${seen ? "scale-y-100" : "scale-y-0"}`}
      />
      {steps.map((s, i) => (
        <li
          key={i}
          className={`relative rounded-xl py-3 transition-all duration-500 ease-out motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ transitionDelay: `${i * 70}ms` }}
        >
          <span aria-hidden="true" className="absolute -left-[27px] top-[1.15rem] size-3 rounded-full border-2 border-pitch bg-paper" />
          <span className="num grid gap-x-4 sm:grid-cols-[4rem_1fr]">
            <span className="font-semibold text-pitch">{s.time ?? ""}</span>
            <span className="text-lg">{s.what}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
