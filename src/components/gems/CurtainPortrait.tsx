"use client";

import Image from "next/image";
import * as React from "react";

// BYQ gem: curtain-image-reveal-01, one frame per portrait. Motion values in globals.css. The caption follows the text colour of
// the tile it sits on (navy on light tiles, white on navy ones); navy at 60% failed contrast on sky and white.
const CLOSED = {
  lr: "inset(0 100% 0 0)",
  tb: "inset(0 0 100% 0)",
  rl: "inset(0 0 0 100%)",
};

type Props = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  wipe?: keyof typeof CLOSED;
  delay?: number;
  className?: string;
};

export function CurtainPortrait({ src, alt, caption, width, height, wipe = "lr", delay = 0, className }: Props) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.setAttribute("data-revealed", "true");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return reveal();
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        reveal();
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      data-revealed="false"
      className={`cir-item m-0 ${className ?? ""}`}
      style={{ "--d": `${delay}s` } as React.CSSProperties}
    >
      <div className="cir-frame" style={{ clipPath: CLOSED[wipe], aspectRatio: `${width} / ${height}` }}>
        <Image className="cir-img" src={src} alt={alt} width={width} height={height} sizes="(max-width: 768px) 90vw, 420px" />
      </div>
      <figcaption className="cir-caption mt-3 text-sm text-current/75">{caption}</figcaption>
    </figure>
  );
}
