"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ball } from "@/components/Motion";
import { RollingWords } from "@/components/effects/rolling-text";

gsap.registerPlugin(ScrollTrigger);

// Human Intelligence hero: content sits in a 16px-radius green tile inset 8px from the page edge.
// Home keeps the stringer-hero-4 centred stack (label, rolling title, word marquee, facts on a dashed
// rule) with a wide placeholder photo under it; inner pages put the title bottom-left beside a photo.
// The red cricket ball is the parallax element: it drifts and spins as you scroll. No glows, no blur.
export function Hero({
  eyebrow,
  title,
  sub,
  marquee,
  row,
  photo,
  children,
  tall = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  marquee?: string[];
  row?: string[];
  photo?: { src: string; alt: string };
  children?: React.ReactNode;
  tall?: boolean;
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

  const label = "text-xs font-medium uppercase tracking-[0.08em] text-ink/60";

  return (
    <section ref={root} className="px-2 pt-2">
      <div className={`relative overflow-hidden rounded-2xl ${tall ? "bg-mint" : "bg-mist"}`}>
        <Ground />
        <div aria-hidden="true" className={`f-ball pointer-events-none absolute z-[1] ${tall ? "right-[8%] top-6 md:right-[12%] md:top-16" : "right-6 top-6 md:right-[46%]"}`}>
          <Ball className={tall ? "size-9 md:size-16" : "size-8 md:size-12"} />
        </div>

        {tall ? (
          <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-8 px-5 pt-20 text-center md:px-8 md:pt-28">
            {eyebrow && <p className={`rise ${label}`}>{eyebrow}</p>}
            <h1 aria-label={title} className="display rise max-w-[14ch] text-[2.75rem] !leading-[1.3] sm:text-7xl lg:text-[7rem]" style={{ animationDelay: "100ms" }}>
              <RollingWords text={title} />
            </h1>
            {sub && <p className="rise max-w-2xl text-lg text-ink/70 md:text-xl" style={{ animationDelay: "200ms" }}>{sub}</p>}
            {marquee && <Marquee words={marquee} />}
            {children && (
              <div className="rise flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "400ms" }}>
                {children}
              </div>
            )}
            {row && (
              <div className="rule rise mt-6 grid w-full gap-2 pt-6 md:mt-10 md:grid-cols-3" style={{ animationDelay: "700ms" }}>
                {row.map((r, i) => (
                  <p key={r} className={`num ${label} ${["md:text-left", "md:text-center", "md:text-right"][i]}`}>{r}</p>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative grid gap-6 p-4 pt-20 md:grid-cols-[1.15fr_1fr] md:gap-10 md:p-3 md:pl-10">
            <div className="flex flex-col items-start justify-end gap-5 md:pb-10">
              {eyebrow && <p className={`rise ${label}`}>{eyebrow}</p>}
              <h1 aria-label={title} className="display rise text-5xl !leading-[1.3] md:text-8xl" style={{ animationDelay: "100ms" }}>
                <RollingWords text={title} />
              </h1>
              {sub && <p className="num rise text-lg text-ink/70 md:text-2xl" style={{ animationDelay: "200ms" }}>{sub}</p>}
              {children && <div className="rise mt-3 flex flex-wrap items-center gap-4" style={{ animationDelay: "320ms" }}>{children}</div>}
            </div>
            {photo && <ParallaxPhoto {...photo} className="h-56 rounded-xl md:h-[26rem]" priority />}
          </div>
        )}

        {tall && photo && <ParallaxPhoto {...photo} className="m-2 mt-10 h-[44svh] rounded-xl md:m-3 md:mt-14 md:h-[62svh]" priority />}
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

// Placeholder photo that drifts inside its rounded frame on scroll (image overscaled, frame clips it).
export function ParallaxPhoto({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
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
      {/* eslint-disable-next-line @next/next/no-img-element -- hotlinked Commons placeholder; swap for next/image with local files */}
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className="absolute inset-0 size-full scale-[1.14] object-cover" />
    </div>
  );
}

// Human Intelligence stat cluster: separate green tiles instead of one ruled bar.
const TILES = ["bg-mint", "bg-mist", "bg-sage", "bg-mist"];
export function StatBar({ items }: { items: string[][] }) {
  return (
    <section className="px-2 pt-2">
      <dl className={`grid gap-2 ${items.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
        {items.map(([value, label], i) => (
          <div key={value + label} className={`lift flex min-h-36 flex-col-reverse justify-between gap-6 rounded-2xl p-5 md:min-h-44 md:p-8 ${TILES[i % 4]}`}>
            <dt className="text-ink/60">{label}</dt>
            <dd className="num display text-3xl md:text-5xl">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
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
  tone?: "paper" | "cream" | "night";
  id?: string;
}) {
  // "cream" is a lifted Lab Mist panel, inset like the hero tile; the other tones sit on the canvas.
  const bg = tone === "cream" ? "mx-2 mt-2 rounded-2xl bg-mist" : "bg-paper";
  return (
    <section id={id} className={`${bg} py-16 md:py-24`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {kicker && <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-ink/60">{kicker}</p>}
        {title && <h2 className="display mb-8 text-4xl md:mb-12 md:text-6xl">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

// stringer-hero-4 inline marquee: tripled word track scrolling a third of its width every 6s, with
// hard-to-soft fades in the tile colour at both edges.
function Marquee({ words }: { words: string[] }) {
  return (
    <div aria-hidden="true" className="rise relative w-full max-w-3xl overflow-hidden py-1" style={{ animationDelay: "250ms" }}>
      <div className="marquee-track flex w-max gap-[0.9em] whitespace-nowrap text-2xl font-medium text-ink/55 md:text-4xl">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="num">{w}</span>
        ))}
      </div>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-[30%] bg-[linear-gradient(90deg,var(--color-mint)_12%,transparent)]" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-[30%] bg-[linear-gradient(270deg,var(--color-mint)_12%,transparent)]" />
    </div>
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

// BYQ section babka-bento-3: label + heading over a 4-column grid (2x2 photo, wide fact tile, stat tile,
// place tile), each tile rising in on scroll with the section's 0/100/150/200ms stagger.
export function Bento({ photo }: { photo: { src: string; alt: string } }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const tile = (delay: number) => ({
    className: `transition-all duration-700 ease-out motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
    style: { transitionDelay: `${delay}ms` },
  });
  const label = "text-xs font-medium uppercase tracking-[0.08em]";
  const t = [tile(0), tile(0), tile(100), tile(150), tile(200)];
  return (
    <section className="bg-paper py-16 md:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-4 md:px-8">
        <div className={`mb-10 md:mb-12 ${t[0].className}`} style={t[0].style}>
          <p className={`${label} text-ink/60`}>In short</p>
          <h2 className="display mt-3 text-4xl md:text-6xl">The week at a glance</h2>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:[grid-auto-rows:200px] lg:grid-cols-4 lg:[grid-auto-rows:220px]">
          <div className={`min-h-[300px] overflow-hidden rounded-2xl md:col-span-2 lg:row-span-2 ${t[1].className}`} style={t[1].style}>
            <ParallaxPhoto {...photo} className="size-full min-h-[300px]" />
          </div>
          <div className={`flex min-h-44 flex-col justify-between gap-6 rounded-2xl bg-mint p-8 md:col-span-2 ${t[2].className}`} style={t[2].style}>
            <p className="display max-w-[24ch] text-2xl md:text-4xl">Four groups of four. The top two from each go through to the quarter-finals.</p>
            <p className={`${label} text-ink/60`}>Format</p>
          </div>
          <div className={`flex min-h-44 flex-col justify-end gap-1 rounded-2xl bg-pitch p-8 text-paper ${t[3].className}`} style={t[3].style}>
            <p className="display num text-5xl md:text-6xl">32</p>
            <p className="text-paper/75">matches, 17–24 October</p>
          </div>
          <div className={`flex min-h-44 flex-col justify-end gap-1 rounded-2xl bg-sage p-8 ${t[4].className}`} style={t[4].style}>
            <p className="display text-2xl">Third time in Mumbai</p>
            <p className="text-ink/65">After 1993 and 2005</p>
          </div>
        </div>
      </div>
    </section>
  );
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
