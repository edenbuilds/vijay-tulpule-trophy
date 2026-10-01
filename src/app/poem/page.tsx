import type { Metadata } from "next";
import { PoemReader } from "@/components/PoemReader";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { POEM } from "@/lib/poem";

export const metadata: Metadata = {
  title: "Cricket and court",
  description: "क्रिकेट और कोर्ट: a Hindi poem shared by BACA on what the pitch and the courtroom ask of the same people.",
};

export default function PoemPage() {
  return (
    <>
      <section className="px-2 pt-2">
        <div className="rounded-2xl bg-mist px-4 pb-14 pt-24 text-center md:px-10 md:pb-20 md:pt-32">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink/60">Poem</p>
          <h1 lang="hi" className="deva rise mx-auto mt-4 max-w-[12ch] text-balance text-5xl font-semibold leading-[1.25] md:text-8xl md:leading-[1.2]">{POEM.title}</h1>
          <p lang="hi" className="deva rise mt-5 text-lg text-ink/70 md:text-xl" style={{ animationDelay: "120ms" }}>{POEM.by}©</p>
          <p className="rise mt-6 text-ink/60" style={{ animationDelay: "200ms" }}>Shared by BACA. Ten verses, in Hindi.</p>
        </div>
      </section>

      <PoemReader />

      <section className="px-2 pt-2">
        <div className="flex flex-wrap items-end justify-between gap-8 rounded-2xl bg-pitch px-6 py-14 text-paper md:px-12 md:py-20">
          <div>
            <h2 className="display text-3xl md:text-5xl">Back to the cricket</h2>
            <p className="mt-4 text-lg text-paper/75">Seventeen to twenty-four October, Mumbai and Navi Mumbai.</p>
          </div>
          <MagneticButton href="/fixtures" tone="onDark">Fixtures</MagneticButton>
        </div>
      </section>
    </>
  );
}
