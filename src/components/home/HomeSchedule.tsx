"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SCHEDULE, GROUNDS } from "@/lib/schedule";
import { PH } from "@/lib/photos";

export function HomeSchedule() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const day = SCHEDULE[selected];
  const title = selected === 0 ? "Opening ceremony" : day.title === "Matches" ? "Tournament matches" : day.title;
  return <section aria-labelledby="schedule-home-title" className="match-week">
    <div className="match-week-heading"><div><p>17–24 October 2026</p><h2 id="schedule-home-title" className="display">THE MATCH WEEK.</h2></div><Link href="/fixtures">Full fixtures <ArrowUpRight aria-hidden="true" /></Link></div>
    <div role="tablist" aria-label="Tournament days" className="match-days">{SCHEDULE.map((item, index) => <button key={item.date} ref={el => { buttons.current[index] = el; }} type="button" role="tab" aria-selected={selected === index} aria-controls="match-day-panel" id={`match-day-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={e => {
      let next = index;
      if (e.key === "ArrowRight") next = (index + 1) % SCHEDULE.length;
      else if (e.key === "ArrowLeft") next = (index + SCHEDULE.length - 1) % SCHEDULE.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = SCHEDULE.length - 1;
      else return;
      e.preventDefault(); setSelected(next); buttons.current[next]?.focus();
    }}><span>{item.weekday.slice(0,3)}</span><strong>{item.short.split(' ')[0]}</strong><span>October</span></button>)}</div>
    <div role="tabpanel" id="match-day-panel" aria-labelledby={`match-day-${selected}`} tabIndex={0} className="match-day-panel">
      <div className="match-day-photo"><Image src={PH.fixtures.src} alt={PH.fixtures.alt} fill sizes="(min-width:900px) 45vw, 100vw" className="object-cover" /><span>BACA tournament archives</span></div>
      <div key={day.date} className="match-day-detail rise"><p className="text-sky">{day.weekday}, {day.short} 2026</p><h3>{title}</h3>
      {day.grounds.length ? <ul className="match-ground-list">{day.grounds.map(id => <li key={id}><strong>{GROUNDS[id].name}</strong><span>{GROUNDS[id].area}</span></li>)}</ul> : <p className="my-6 text-lg text-sky">{selected === 0 ? "Venue to be announced." : "No matches scheduled. Held in case weather affects play."}</p>}
      <Link href="/fixtures" className="inline-flex min-h-11 items-center gap-3 mt-5 font-semibold">Explore fixtures & grounds <ArrowUpRight aria-hidden="true" className="size-5" /></Link></div>
    </div>
    <p className="mt-5 text-sm text-white/70">Matchups and timings will be published when confirmed.</p>
  </section>;
}
