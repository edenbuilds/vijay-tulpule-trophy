"use client";

import * as React from "react";
import gsap from "gsap";
import { Ball } from "@/components/Motion";

// BYQ gem iris-wipe-preloader-01, first visit per session only. The brief bans animated counters, so
// the 0-100% readout is swapped for the cricket ball rolling in over the same beat; every duration and
// ease below is the gem's. The head script in layout.tsx adds `preloading`, or `no-preload` on repeat
// visits, before paint, so the overlay never flashes and hero entrances wait for the wipe.
export function Preloader() {
  const overlay = React.useRef<HTMLDivElement>(null);
  const ball = React.useRef<HTMLDivElement>(null);

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
    tl.fromTo(ball.current, { x: "-40vw", rotation: -540 }, { x: 0, rotation: 0, duration: ROLL, ease: "power1.out" })
      .to(ball.current, { opacity: 0, scale: 0.85, duration: 0.4, ease: "power2.in" }, "+=0.1")
      .add(done, "-=0.15")
      .to(iris, { r: maxR, duration: WIPE, ease: "power2.inOut", onUpdate: () => el.style.setProperty("--iris-r", `${iris.r}px`) }, "<");
    return () => {
      tl.kill();
      if (root.classList.contains("preloading")) done();
    };
  }, []);

  return (
    <div ref={overlay} aria-hidden="true" className="preloader fixed inset-0 z-[200] grid place-items-center bg-pitch">
      <div ref={ball}>
        <Ball className="size-16 md:size-20" />
      </div>
    </div>
  );
}
