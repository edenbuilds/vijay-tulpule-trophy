import type { Metadata } from "next";
import { Hero, StatBar } from "@/components/Sections";

export const metadata: Metadata = { title: "Live" };

export default function Live() {
  return (
    <>
      <Hero title="Live" sub="Stream from 16 October" />
      <section className="bg-night pb-16 text-white md:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid aspect-video place-items-center rounded-xl border border-white/10 bg-green/60">
            <p className="text-white/55">Stream URL TBC</p>
          </div>
        </div>
      </section>
      <StatBar
        items={[
          ["15 min", "live before toss"],
          ["Stumps", "highlights after"],
          ["Same day", "short clips"],
          ["21:30", "points table"],
        ]}
      />
    </>
  );
}
