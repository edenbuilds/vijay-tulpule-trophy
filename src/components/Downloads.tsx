import { ArrowDown, CalendarPlus, FileText } from "lucide-react";
import { DOWNLOADS } from "@/lib/site";

// Columns follow the number of tiles (a lone last tile on its own row reads as a mistake).
const COLS: Record<number, string> = { 1: "max-w-md", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

// Phones get a dashed list of tap rows; sm and up keep the tiles (the arrow drops on hover like a file into a tray).
export function Downloads({ only }: { only?: string[] }) {
  const items = only ? DOWNLOADS.filter((d) => only.includes(d.label)) : DOWNLOADS;
  return (
    <>
      <ul className="rule sm:hidden">
        {items.map((d) => (
          <li key={d.href} className="row-line border-b border-dashed border-navy/15">
            <a href={d.href} download className="press flex min-h-16 items-center justify-between gap-4 py-4">
              <span>
                <span className="block text-lg font-semibold">{d.label}</span>
                <span className="text-sm text-navy/70">{d.line}</span>
              </span>
              <span className="num flex items-center gap-2 text-sm font-semibold text-royal">
                {d.kind}
                <ArrowDown aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <ul className={`hidden gap-2 sm:grid ${COLS[items.length] ?? "sm:grid-cols-2"}`}>
        {items.map((d) => {
          const Icon = d.kind === "ICS" ? CalendarPlus : FileText;
          return (
            <li key={d.href}>
              <a
                href={d.href}
                download
                className="lift press group flex h-full min-h-44 flex-col justify-between gap-8 rounded-2xl bg-sky p-6 hover:bg-sky-deep md:p-8"
              >
                <span className="flex items-start justify-between">
                  <Icon aria-hidden="true" className="size-7 text-royal transition-transform duration-300 group-hover:-rotate-6" strokeWidth={1.6} />
                  <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-white">
                    <ArrowDown aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-y-0.5 group-active:translate-y-2" strokeWidth={1.8} />
                  </span>
                </span>
                <span>
                  <span className="display block text-2xl md:text-3xl">{d.label}</span>
                  <span className="mt-1 block text-navy/70">{d.line}</span>
                  <span className="num mt-3 block text-base font-semibold">{d.kind}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
