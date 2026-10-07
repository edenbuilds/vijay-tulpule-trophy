"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Ball } from "@/components/brand/Ball";
import { Stroke } from "@/components/brand/Stroke";

// Adapted from Hyperiux Lines Loader (Pro): a restrained field of rules opens the first visit.
export function Preloader() {
  const overlay = React.useRef<HTMLDivElement>(null);
  const ball = React.useRef<HTMLDivElement>(null);
  const trail = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = document.documentElement;
    const el = overlay.current;
    if (!el || root.classList.contains("no-preload")) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.remove("preloading");
      root.classList.add("no-preload");
      el.style.display = "none";
      return;
    }

    const done = () => {
      root.classList.remove("preloading");
      try { sessionStorage.setItem("vtt-loaded", "1"); } catch {}
      window.dispatchEvent(new Event("vtt:loaded"));
    };

    const rules = gsap.utils.toArray<HTMLElement>("[data-loader-rule]", el);
    const tl = gsap.timeline({ delay: 0.15, onComplete: () => { el.style.display = "none"; done(); } });
    tl.fromTo(trail.current, { clipPath: "inset(0 92% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.05, ease: "power1.out" })
      .fromTo(ball.current, { left: "8%", top: "85%", xPercent: -50, yPercent: -50, rotation: -540 }, { left: "92%", top: "12%", rotation: 0, duration: 1.05, ease: "power1.out" }, "<")
      .to(rules, { scaleX: 1, duration: 0.34, stagger: 0.035, ease: "power2.inOut", transformOrigin: "left center" }, "-=0.2")
      .to(el, { yPercent: -100, duration: 0.72, ease: "power3.inOut" }, "+=0.16");
    return () => {
      tl.kill();
      if (root.classList.contains("preloading")) {
        root.classList.remove("preloading");
        el.style.display = "none";
      }
    };
  }, { scope: overlay });

  return (
    <div ref={overlay} aria-hidden="true" className="preloader fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-paper px-6 py-8 text-navy sm:px-10 sm:py-10">
      <div className="flex items-center gap-3">
        <div className="size-9"><Ball className="size-full" /></div>
        <p className="text-sm font-semibold tracking-wide">Bombay Advocates’ Cricket Association</p>
      </div>
      <div className="mx-auto w-full max-w-[46rem]">
        <div className="relative mx-auto aspect-[3/2] w-[min(70vw,29rem)]">
          <div ref={trail} className="absolute inset-0 [clip-path:inset(0_92%_0_0)]">
            <Stroke className="size-full" />
          </div>
          <div ref={ball} className="absolute left-[8%] top-[85%]">
            <Ball className="size-12 sm:size-16" />
          </div>
        </div>
        <h1 className="display mt-1 text-center text-2xl leading-tight sm:text-4xl">38th All India Advocates’ Cricket Tournament</h1>
        <p className="mt-2 text-center text-sm text-navy/65">Mumbai and Navi Mumbai · 2026</p>
      </div>
      <div className="grid gap-[0.45rem]" aria-hidden="true">
        {Array.from({ length: 13 }, (_, index) => <span key={index} data-loader-rule className="block h-px origin-left scale-x-0 bg-navy/30" />)}
      </div>
      <span className="sr-only">Loading the BACA tournament website</span>
    </div>
  );
}
