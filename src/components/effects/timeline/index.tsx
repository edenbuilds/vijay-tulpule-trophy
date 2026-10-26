// Built using Hyperiux Vault: https://vault.hyperiux.com (timeline 1.0.0)
// Adapted for BACA: items come in as props, Lenis is already mounted site-wide in Motion.tsx so the vault's ReactLenis wrapper is dropped.
"use client";
import { type CSSProperties, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export type TimelineItem = { id: string; label: string; content: string; accent?: boolean };

type TimelineProps = {
  title: string;
  periodLabel: string;
  items: TimelineItem[];
  imageUrl: string;
  imageAlt: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
};

const ANIMATION_DURATION = 1.2;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const m = window.matchMedia(REDUCED_MOTION_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(REDUCED_MOTION_QUERY).matches, () => false);

export default function Timeline({
  title,
  periodLabel,
  items,
  imageUrl,
  imageAlt,
  textColor = "#16181B",
  mutedTextColor = "#4a4d52",
  activeColor = "#C8102E",
  backgroundColor = "#F6F4EF",
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<{ trigger: ScrollTrigger; widthFraction: number; slideTrigger?: ScrollTrigger; slidePercent: number } | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const top = items.filter((_, i) => i % 2 === 0);
  const bottom = items.filter((_, i) => i % 2 === 1);
  const activeStyle = { backgroundColor: activeColor } satisfies CSSProperties;
  const mutedTextStyle = { color: mutedTextColor } satisfies CSSProperties;

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const isTablet = window.innerWidth >= 642 && window.innerWidth <= 1024;
    const isMobile = window.innerWidth < 642;
    const slidePercent = isTablet ? -62 : isMobile ? -62 : -66;
    const lineWidth = isTablet ? "75%" : isMobile ? "70%" : "98%";
    const lineStart = isTablet ? "top 10%" : "top top";
    const slideEnd = isMobile ? "82% 50%" : "92% bottom";
    const lineEnd = isMobile ? "80% 50%" : isTablet ? "90% bottom" : "92% bottom";

    const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "2% top", end: slideEnd, scrub: true }, defaults: { ease: "none" } });
    tl.fromTo(wholeSliderRef.current, { xPercent: 0 }, { xPercent: slidePercent });

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }
    const lineTween = gsap.to(".journey-line", { width: lineWidth, ease: "none", scrollTrigger: { trigger: section, start: lineStart, end: lineEnd, scrub: true } });
    if (lineTween.scrollTrigger) {
      lineProgressRef.current = { trigger: lineTween.scrollTrigger, widthFraction: parseFloat(lineWidth) / 100, slideTrigger: tl.scrollTrigger, slidePercent };
    }
    return () => { lineProgressRef.current = null; };
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
      });
      return;
    }
    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, { scaleY: 0, transformOrigin: "bottom bottom" });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
    });
    const splits = items.map((item) => ({
      item,
      t: new SplitText(`.title-${item.id}`, { type: "lines", mask: "lines" }),
      d: new SplitText(`.description-${item.id}`, { type: "lines", mask: "lines" }),
    }));

    const getLineProgressAtItem = (item: TimelineItem) => {
      const slider = wholeSliderRef.current;
      const lineEl = section.querySelector<HTMLElement>(".journey-line");
      const itemLineEl = section.querySelector<HTMLElement>(`.jl-${item.id}`);
      const info = lineProgressRef.current;
      if (!slider || !lineEl || !itemLineEl || !info) return 0;
      const sliderLeft = slider.getBoundingClientRect().left;
      const lineLeft = lineEl.getBoundingClientRect().left - sliderLeft;
      const itemLeft = itemLineEl.getBoundingClientRect().left - sliderLeft;
      const max = (lineEl.parentElement?.clientWidth ?? 0) * info.widthFraction;
      return max <= 0 ? 0 : gsap.utils.clamp(0, 1, (itemLeft - lineLeft) / max);
    };

    const ITEM_SPAN = 0.12;
    const MAX_ITEM_DRIFT = window.innerWidth < 642 ? 0.2 : 0.35;

    splits.forEach(({ item, t, d }) => {
      if (!top.includes(item)) gsap.set(`.jl-${item.id}`, { transformOrigin: "top top" });
      const getRange = () => {
        const lt = lineProgressRef.current?.trigger;
        const ls = lt?.start ?? 0;
        const lr = (lt?.end ?? 0) - ls;
        let span = lr * ITEM_SPAN;
        const st = lineProgressRef.current?.slideTrigger;
        const ssr = st ? st.end - st.start : 0;
        const sw = wholeSliderRef.current?.offsetWidth ?? 0;
        const pps = ssr > 0 ? (Math.abs(lineProgressRef.current?.slidePercent ?? 0) / 100) * sw / ssr : 0;
        if (pps > 0) span = Math.min(span, (window.innerWidth * MAX_ITEM_DRIFT) / pps);
        const start = Math.min(ls + getLineProgressAtItem(item) * lr, ls + lr - span);
        return { start, end: start + span };
      };
      gsap.set([...t.lines, ...d.lines], { y: 100 });
      gsap.timeline({ scrollTrigger: { trigger: section, start: () => getRange().start, end: () => getRange().end, scrub: true } })
        .to(`.jl-${item.id}`, { scaleY: 1, duration: ANIMATION_DURATION * 0.4 })
        .to(`.jd-${item.id}`, { scale: 1, duration: ANIMATION_DURATION * 0.15 })
        .fromTo(t.lines, { y: 100 }, { y: 0, duration: ANIMATION_DURATION * 0.6, stagger: 0.02, ease: "power2.out" }, ">-0.05")
        .fromTo(d.lines, { y: 100 }, { y: 0, duration: ANIMATION_DURATION * 0.6, stagger: 0.02, ease: "power2.out" }, "<");
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      splits.forEach(({ t, d }) => { t.revert(); d.revert(); });
      window.removeEventListener("resize", onResize);
    };
  }, { dependencies: [reducedMotion, items], scope: sectionRef });

  const Entry = ({ item, pos }: { item: TimelineItem; pos: "top" | "bottom" }) => {
    const dot = <div className={`relative aspect-square size-[1vw] translate-x-[-50%] rounded-full max-[1025px]:size-[2vw] max-[1025px]:shrink-0 max-md:size-[2.5vw] jd-${item.id}`} style={activeStyle} />;
    const line = <div className={`h-[94%] w-px rounded-full max-[1025px]:h-auto max-[1025px]:min-h-0 max-[1025px]:flex-1 max-md:h-[94%] max-md:flex-none ${pos === "top" ? "origin-bottom" : "origin-top"} jl-${item.id}`} style={activeStyle} />;
    const text = (
      <>
        <h3 className={`display title-${item.id} text-[2.5vw] leading-none max-[1025px]:text-[5vw] max-md:text-[6.4vw] ${item.accent ? "text-red" : ""}`}>{item.label}</h3>
        <p className={`description-${item.id} w-[90%] text-[1.25vw] leading-[1.2] max-[1025px]:w-[70%] max-[1025px]:text-[3vw] max-md:w-[78%] max-md:text-[4vw]`} style={mutedTextStyle}>{item.content}</p>
      </>
    );
    return pos === "top" ? (
      <div className="relative h-full w-[30vw] px-[3vw] max-[1025px]:w-[50vw] max-[1025px]:px-[5vw] max-md:flex max-md:w-[70vw] max-md:flex-col max-md:px-[7vw]">
        <div className="absolute top-0 bottom-0 left-0 h-full w-full max-[1025px]:top-[1%] max-[1025px]:flex max-[1025px]:flex-col max-md:top-0 max-md:block">{dot}{line}</div>
        <div className="mt-[-1vw] space-y-[1vw] max-[1025px]:mt-[-1.5vw] max-md:mt-[-2vw]">{text}</div>
      </div>
    ) : (
      <div className="relative h-full w-[25vw] px-[3vw] max-[1025px]:flex max-[1025px]:w-[20%] max-[1025px]:flex-col max-[1025px]:justify-center max-[1025px]:px-[5vw] max-md:w-[70vw] max-md:px-[7vw]">
        <div className="absolute bottom-[-1%] left-0 h-full w-full max-[1025px]:flex max-[1025px]:flex-col max-md:block">{line}{dot}</div>
        <div className="flex h-full w-full flex-col justify-end space-y-[1vw]">{text}</div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} aria-label={title} className="relative h-[200vw] w-full max-[1025px]:h-[400vh] max-[1025px]:py-[7%]" style={{ color: textColor, backgroundColor }}>
      <div className="sticky top-0 flex h-screen w-screen items-center overflow-hidden pt-[5%] max-[1025px]:top-[10%] max-[1025px]:block max-md:top-[5%]">
        <div ref={wholeSliderRef} className="mr-[2vw] flex h-[30vw] w-[270vw] items-center gap-[5vw] px-[5vw] max-[1025px]:h-[70vh] max-[1025px]:w-[440vw] max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-[2vw] max-md:h-[80vh] max-md:w-[860vw] max-md:px-[7vw]">
          <div className="relative h-full w-[30vw] shrink-0 overflow-hidden rounded-[1vw] max-[1025px]:h-[40vw] max-[1025px]:w-[15%] max-[1025px]:rounded-[3vw] max-md:h-[65vw] max-md:w-[85vw] max-md:rounded-[5vw]">
            <img src={imageUrl} alt={imageAlt} width={900} height={900} className="h-full w-full object-cover" />
          </div>
          <div className="relative h-full w-full max-[1025px]:h-[50%]">
            <div className="absolute top-[49%] left-0 flex h-fit w-full items-center">
              <div className="size-[.8vw] shrink-0 rounded-full max-[1025px]:size-[1.5vw] max-md:size-[2vw]" style={activeStyle} />
              <div className="journey-line -mx-[.4vw] h-px w-[0%] rounded-full max-[1025px]:-mx-[1.125vw] max-md:-mx-[1.5vw]" style={activeStyle} />
              <div className="size-[.8vw] shrink-0 rounded-full max-[1025px]:size-[1.5vw] max-md:size-[2vw]" style={activeStyle} />
            </div>
            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[20%] shrink-0 pt-[2vw] max-md:h-fit max-md:pt-[5vw]">
                <h2 className="display w-[65%] text-[3vw] leading-[0.95] max-[1025px]:w-[75%] max-[1025px]:text-[7vw] max-md:text-[8.5vw]">{title}</h2>
              </div>
              <div className="flex h-full w-full gap-x-[15vw] max-md:gap-x-[40vw]">{top.map((item) => <Entry key={item.id} item={item} pos="top" />)}</div>
            </div>
            <div className="flex h-1/2 w-full items-center justify-start">
              <div className="h-full w-[34%] shrink-0 pt-[2vw] max-[1025px]:pt-[5vw] max-md:w-[30%] max-md:pt-[5vw]">
                <p className="text-[1.65vw] leading-none max-[1025px]:text-[3vw] max-md:text-[4.2vw]" style={mutedTextStyle}>{periodLabel}</p>
              </div>
              <div className="ml-[7vw] flex h-full w-full gap-x-[20vw] max-[1025px]:ml-0 max-md:ml-[7vw] max-md:gap-x-[40vw]">{bottom.map((item) => <Entry key={item.id} item={item} pos="bottom" />)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
