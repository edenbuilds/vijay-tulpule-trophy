import MaskTextReveal from "@/components/effects/mask-text-reveal";
import { NUM, POEM } from "@/lib/poem";

// One verse: Devanagari numeral beside four lines that wipe in with the Hyperiux mask reveal.
// The reveal splits by line, so conjuncts are never broken (a per-character split would break them).
export function Stanza({ i, tone = "light" }: { i: number; tone?: "light" | "dark" }) {
  return (
    <div lang="hi" className="grid grid-cols-[2.75rem_1fr] items-start gap-3">
      <span aria-hidden="true" className={`deva pt-0.5 text-2xl ${tone === "dark" ? "text-sage" : "text-pitch"}`}>{NUM[i]}</span>
      <MaskTextReveal duration={1.5} stagger={0.16}>
        {POEM.stanzas[i].map((line) => (
          <p key={line} className="deva text-xl leading-[1.9] md:text-2xl md:leading-[1.9]">{line}</p>
        ))}
      </MaskTextReveal>
    </div>
  );
}

export function Poem() {
  return (
    <div className="mx-2 mt-2 rounded-2xl bg-pitch px-5 py-16 text-paper md:px-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 lang="hi" className="deva text-5xl font-semibold leading-tight md:text-7xl">{POEM.title}</h2>
        <p lang="hi" className="deva mt-3 text-lg text-paper/75 md:text-xl">{POEM.by}©</p>
        <div className="mt-10 grid gap-x-16 gap-y-10 border-t border-dashed border-paper/25 pt-10 lg:grid-cols-2">
          {POEM.stanzas.map((_, i) => <Stanza key={i} i={i} tone="dark" />)}
        </div>
      </div>
    </div>
  );
}
