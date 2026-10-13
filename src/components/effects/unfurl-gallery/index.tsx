"use client";
// Built after 21st.dev "3D Parallax Unfurling Gallery" (piyushxdev). The registry needs a 21st.dev login, so this is a local take:
// the grid unfurls from a tilted plane as it scrolls in, and alternate columns drift at different speeds.
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import type { Photo } from "@/lib/photos";

function Column({ photos, progress, shift }: { photos: Photo[]; progress: MotionValue<number>; shift: number }) {
  const y = useTransform(progress, [0, 1], [shift, -shift]);
  return (
    <motion.div style={{ y }} className="flex flex-col gap-3 md:gap-4">
      {photos.map((p) => (
        <div key={p.id} className="relative overflow-hidden rounded-lg bg-sky-deep" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
          <Image src={p.small} alt={p.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

export function UnfurlGallery({ photos }: { photos: Photo[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const rotateX = useTransform(enter, [0, 1], [reduce ? 0 : 38, 0]);
  const scale = useTransform(enter, [0, 1], [reduce ? 1 : 0.86, 1]);
  const cols = [0, 1, 2, 3].map((c) => photos.filter((_, i) => i % 4 === c));
  const shifts = reduce ? [0, 0, 0, 0] : [40, 110, 60, 140];
  return (
    <div ref={ref} className="overflow-hidden py-6" style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX, scale, transformOrigin: "50% 0%" }} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {cols.map((c, i) => <div key={i} className={i > 1 ? "hidden md:block" : ""}><Column photos={c} progress={scrollYProgress} shift={shifts[i]} /></div>)}
      </motion.div>
    </div>
  );
}
