import type { Metadata } from "next";
import { PoemReader } from "@/components/PoemReader";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { Stroke } from "@/components/brand/Stroke";
import { POEM } from "@/lib/poem";

export const metadata: Metadata = {
  title: "Cricket and court",
  description: "क्रिकेट और कोर्ट: a Hindi poem shared by BACA on what the pitch and the courtroom ask of the same people.",
};

export default function PoemPage() {
  return (
    <>
      {/* Own header instead of the shared Hero: the title is Devanagari, which Satoshi cannot set, and heavy negative tracking would break its conjuncts. */}
      <section className="px-2 pt-2">
        <div className="relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-2xl bg-navy text-white md:min-h-[26rem]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-6 -z-10 w-[15rem] md:-bottom-16 md:-right-16 md:top-auto md:w-[40rem]">
            <Stroke className="w-full" />
          </div>
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-20 md:px-8 md:pb-12">
            <p className="rise text-base font-semibold text-sky">Poem</p>
            <h1 lang="hi" className="deva rise mt-3 max-w-[14ch] text-5xl !leading-[1.25] !tracking-normal md:text-8xl md:!leading-[1.2]">{POEM.title}</h1>
            <p lang="hi" className="deva rise mt-5 text-lg text-white/80 md:text-xl" style={{ animationDelay: "120ms" }}>{POEM.by}©</p>
            <p className="rise mt-3 text-white/75" style={{ animationDelay: "200ms" }}>Shared by BACA. Ten verses, in Hindi.</p>
          </div>
        </div>
      </section>

      <section className="mx-2 mt-2 rounded-2xl bg-white">
        <PoemReader />
      </section>

      <section className="mx-2 mt-2 rounded-2xl bg-sky">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
          <div>
            <h2 className="display text-3xl md:text-5xl">Back to the cricket</h2>
            <p className="mt-4 text-lg text-navy/75">17 to 24 October 2026, Mumbai.</p>
          </div>
          <MagneticButton href="/fixtures">Fixtures</MagneticButton>
        </div>
      </section>
    </>
  );
}
