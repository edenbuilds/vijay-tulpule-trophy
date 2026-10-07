"use client";

import * as React from "react";
import gsap from "gsap";
import { Ball } from "@/components/brand/Ball";
import { Stroke } from "@/components/brand/Stroke";

// BYQ gem iris-wipe-preloader-01, first visit per session only. The brief bans animated counters, so
// the 0-100% readout is swapped for the red ball running up the brand stroke, which is drawn behind it, over the
// same beat; every duration and ease below is the gem's. The head script in layout.tsx adds `preloading`, or `no-preload` on repeat
// visits, before paint, so the overlay never flashes and hero entrances wait for the wipe.
export function Preloader() {
  const overlay = React.useRef<HTMLDivElement>(null);
  const ball = React.useRef<HTMLDivElement>(null);
  const trail = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = document.documentElement;
    const el = overlay.current;
    if (!el || root.classList.contains("no-preload")) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ROLL = reduce ? 0.3 : 1.2;
    const WIPE = reduce ? 0.3 : 1.0;
    const iris = { r: 0 };
    const maxR = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 8;

    const done = () => {
      root.classList.remove("preloading");
      try { sessionStorage.setItem("vtt-loaded", "1"); } catch {}
      window.dispatchEvent(new Event("vtt:loaded"));
    };

    const tl = gsap.timeline({ delay: 0.25, onComplete: () => (el.style.display = "none") });
    // The stroke runs lower left to upper right (stroke.svg is 600x400, tail near 8% / 85%, head near 92% / 12%). The ball
    // goes tail to head and the clip opens to the ball's x, so the stroke is what it leaves behind.
    tl.fromTo(trail.current, { clipPath: "inset(0 92% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: ROLL, ease: "power1.out" })
      .fromTo(ball.current, { left: "8%", top: "85%", xPercent: -50, yPercent: -50, rotation: -540 }, { left: "92%", top: "12%", rotation: 0, duration: ROLL, ease: "power1.out" }, "<")
      .to([ball.current, trail.current], { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.1")
      .add(done, "-=0.15")
      .to(iris, { r: maxR, duration: WIPE, ease: "power2.inOut", onUpdate: () => el.style.setProperty("--iris-r", `${iris.r}px`) }, "<");
    return () => {
      tl.kill();
      if (root.classList.contains("preloading")) done();
    };
  }, []);

  return (
    <div ref={overlay} aria-hidden="true" className="preloader fixed inset-0 z-[200] grid place-items-center bg-navy">
      <div className="relative aspect-[3/2] w-[min(78vw,36rem)]">
        <div ref={trail} className="absolute inset-0 [clip-path:inset(0_92%_0_0)]">
          <Stroke className="size-full" />
        </div>
        <div ref={ball} className="absolute left-[8%] top-[85%]">
          <Ball className="size-14 md:size-20" />
        </div>
      </div>
    </div>
  );
}
