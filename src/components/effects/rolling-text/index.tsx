// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);



interface RollingTextProps {
  text?: string;
  textColor?: string;
  /** Minimum whole letter-heights a character travels before landing. */
  minCycles?: number;
  /** Extra random cycles added on top of minCycles. */
  cycleVariance?: number;
  /** Base spin duration in seconds. */
  duration?: number;
  /** Extra random duration added per character, in seconds. */
  durationVariance?: number;
}

/** Deterministic PRNG so the server and client build identical reels. */
const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Reel = { copies: number; to: number; duration: number };
type ReelConfig = {
  minCycles: number;
  cycleVariance: number;
  duration: number;
  durationVariance: number;
};


const buildReel = (charIndex: number, config: ReelConfig): Reel => {
  const rand = mulberry32(charIndex * 1013 + 7);
  const cycles = config.minCycles + Math.floor(rand() * config.cycleVariance);

  return {
    copies: cycles + 1,
    to: cycles,
    duration: config.duration + rand() * config.durationVariance,
  };
};

const RollingText = ({
  text = "BACA",
  textColor = "#ffffff",
  minCycles = 3,
  cycleVariance = 3,
  duration = 2.4,
  durationVariance = 1.2,
}: RollingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const reels = gsap.utils.toArray<HTMLElement>("[data-reel]", containerRef.current);

      if (reduced) {
        reels.forEach((reel) => {
          reel.style.setProperty("--k", reel.dataset.to ?? "0");
        });
        const heading = containerRef.current?.querySelector("h3");
        if (heading) {
          gsap.fromTo(
            heading,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: "power1.out" },
          );
        }
        return;
      }

      reels.forEach((reel) => {
        const to = Number(reel.dataset.to);
        const scroll = { k: 0 };
        reel.style.setProperty("--k", "0");

        gsap.to(scroll, {
          k: to,
          duration: Number(reel.dataset.duration),
          ease: "expo.out",
          onUpdate: () => reel.style.setProperty("--k", String(scroll.k)),
        });
      });
    },
    {
      scope: containerRef,
      dependencies: [minCycles, cycleVariance, duration, durationVariance],
    },
  );

  return (
    <div
      ref={containerRef}
      className="relative grid place-items-center min-h-dvh bg-navy"
    >
      {/*
        globals.css sets h1 to h3 to Satoshi 800 to 900 with tight tracking in an UNLAYERED rule, which beats Tailwind's
        utilities, so only the line height needs `!` here. Colour is inline so a caller can still pick one.
      */}
      <h3
        aria-label={text}
        style={{ color: textColor }}
        className="relative z-10 m-0 text-9xl max-[1025px]:text-6xl max-md:text-5xl leading-[0.8]! whitespace-nowrap select-none"
      >
        {text.split("").map((char, charIndex) => {
          if (char === " ") {
            return (
              <span key={charIndex} className="inline-block" aria-hidden>
                &nbsp;
              </span>
            );
          }

          const reel = buildReel(charIndex, { minCycles, cycleVariance, duration, durationVariance });

          return (
            <span
              key={charIndex}
              className="relative inline-block align-top"
              aria-hidden
            >
              {/* Invisible copy of the letter: it alone sets the cell box, so
                  the landed word matches plain text exactly. */}
              <span className="block invisible">{char}</span>

              <span className="absolute inset-0 overflow-hidden">
                <span
                  data-reel=""
                  data-to={reel.to}
                  data-duration={reel.duration}
                  className="block will-change-transform [transform:translate3d(0,calc(-1em*0.8*var(--k,0)),0)]"
                >
                  {Array.from({ length: reel.copies }, (_, copy) => (
                    <span key={copy} className="block w-full h-[0.8em] text-center">
                      {char}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          );
        })}
      </h3>
    </div>
  );
};

export default RollingText;

/**
 * Same reels, same expo.out spin, rendered inline so a multi-word heading can wrap between words.
 * Cells are one line high (1lh), so the reel follows the heading's own line height (the page headers use !leading-[1.2]).
 */
export function RollingWords({
  text,
  minCycles = 3,
  cycleVariance = 3,
  duration = 1.4,
  durationVariance = 0.8,
}: { text: string } & Omit<RollingTextProps, "text" | "textColor">) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const roll = contextSafe!(() =>
        gsap.utils.toArray<HTMLElement>("[data-reel]", ref.current).forEach((reel) => {
          const state = { k: 0 };
          gsap.to(state, {
            k: Number(reel.dataset.to),
            duration: Number(reel.dataset.duration),
            ease: "expo.out",
            onUpdate: () => reel.style.setProperty("--k", String(state.k)),
          });
        }),
      );
      // First visit: hold the reels until the preloader opens, or they finish unseen behind it.
      if (!document.documentElement.classList.contains("preloading")) return roll();
      window.addEventListener("vtt:loaded", roll, { once: true });
      return () => window.removeEventListener("vtt:loaded", roll);
    },
    { scope: ref },
  );

  let charIndex = 0;
  return (
    <span ref={ref} aria-hidden className="inline">
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden className="mr-[0.22em] inline-block whitespace-nowrap">
          {Array.from(word).map((char) => {
            const reel = buildReel(charIndex++, { minCycles, cycleVariance, duration, durationVariance });
            return (
              <span key={charIndex} className="relative inline-block align-top">
                <span className="invisible block">{char}</span>
                <span className="absolute inset-0 overflow-hidden">
                  <span
                    data-reel=""
                    data-to={reel.to}
                    data-duration={reel.duration}
                    className="block will-change-transform [transform:translate3d(0,calc(-1lh*var(--k,0)),0)]"
                  >
                    {Array.from({ length: reel.copies }, (_, copy) => (
                      <span key={copy} className="block">{char}</span>
                    ))}
                  </span>
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
