// Adapted from Hyperiux Vault Stack Spread: https://vault.hyperiux.com/demo/stack-spread
// BACA uses a natural scrolling grid, so every team remains reachable without a pinned scene.
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Team } from "@/lib/teams";

function TeamCard({ team, index, progress, active }: { team: Team; index: number; progress: MotionValue<number>; active: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement;
    if (!element || !parent) return;
    const measure = () => setOffset({ x: parent.clientWidth / 2 - element.offsetLeft - element.offsetWidth / 2, y: parent.clientHeight / 2 - element.offsetTop - element.offsetHeight / 2 });
    const observer = new ResizeObserver(measure);
    observer.observe(parent);
    measure();
    return () => observer.disconnect();
  }, []);
  const x = useTransform(progress, [0, 1], [offset.x, 0]);
  const y = useTransform(progress, [0, 1], [offset.y, 0]);
  const rotate = useTransform(progress, [0, 1], [((index * 7) % 25) - 12, 0]);
  const scale = useTransform(progress, [0, 1], [.76, 1]);
  return <motion.li ref={ref} style={active ? { x, y, rotate, scale } : undefined} className="spread-team">
    <Link href={`/teams#${team.slug}`} className="spread-team-link">
      <div className="spread-logo"><Image src={team.logo} alt={`${team.name} team logo`} fill sizes="(min-width: 900px) 112px, 80px" className="object-contain p-2" /></div>
      <span>{team.name}</span>
    </Link>
  </motion.li>;
}

export default function StackSpread({ teams }: { teams: Team[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const update = () => setDesktop(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const progress = useTransform(scrollYProgress, [0, .85], [0, 1]);
  return <ul ref={ref} className="spread-grid" onFocusCapture={() => setFocused(true)}>
    {teams.map((team, index) => <TeamCard key={team.slug} team={team} index={index} progress={progress} active={desktop && reduce === false && !focused} />)}
  </ul>;
}
