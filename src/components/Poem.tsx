import MaskTextReveal from "@/components/effects/mask-text-reveal";
import { NUM, POEM } from "@/lib/poem";

// One verse: Devanagari numeral beside four lines that wipe in with the Hyperiux mask reveal.
// The reveal splits by line, so conjuncts are never broken (a per-character split would break them).
// Used for the home and About teasers; the full poem is read on /poem (PoemReader). `onDark` is for a navy band, where the
// numeral takes sky because royal does not read on navy.
export function Stanza({ i, onDark = false }: { i: number; onDark?: boolean }) {
  return (
    <div lang="hi" className="grid grid-cols-[2.75rem_1fr] items-start gap-3">
      <span aria-hidden="true" className={`deva pt-0.5 text-2xl ${onDark ? "text-sky" : "text-royal"}`}>{NUM[i]}</span>
      <MaskTextReveal duration={1.5} stagger={0.16}>
        {POEM.stanzas[i].map((line) => (
          <p key={line} className="deva text-xl leading-[1.9] md:text-2xl md:leading-[1.9]">{line}</p>
        ))}
      </MaskTextReveal>
    </div>
  );
}
