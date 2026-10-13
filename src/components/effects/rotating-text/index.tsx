"use client";
// After React Bits "Rotating Text" (reactbits.dev/text-animations/rotating-text): letters of each word stagger up, old word leaves upward.
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function RotatingText({ texts, interval = 2200, className = "" }: { texts: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % texts.length), interval);
    return () => clearInterval(id);
  }, [texts.length, interval]);
  const word = texts[i];
  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
      <span className="sr-only">{texts.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={word} aria-hidden="true" className="inline-flex" exit={reduce ? { opacity: 0 } : { y: "-120%", opacity: 0 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
          {[...word].map((ch, k) => (
            <motion.span key={k} className="inline-block whitespace-pre" initial={reduce ? { opacity: 0 } : { y: "100%" }} animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 30, stiffness: 400, delay: reduce ? 0 : k * 0.025 }}>{ch}</motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
