import { ArrowDown, CalendarPlus, FileText } from "lucide-react";
import { DOWNLOADS } from "@/lib/site";

// Download tiles: the arrow drops on hover like a file falling into the tray.
export function Downloads({ only }: { only?: string[] }) {
  const items = only ? DOWNLOADS.filter((d) => only.includes(d.label)) : DOWNLOADS;
  return (
    <ul className={`grid gap-2 ${items.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "max-w-md"}`}>
      {items.map((d) => {
        const Icon = d.kind === "ICS" ? CalendarPlus : FileText;
        return (
          <li key={d.href}>
            <a
              href={d.href}
              download
              className="lift press group flex min-h-44 flex-col justify-between gap-8 rounded-2xl bg-mint p-6 hover:bg-sage md:p-8"
            >
              <span className="flex items-start justify-between">
                <Icon aria-hidden="true" className="size-7 text-pitch transition-transform duration-300 group-hover:-rotate-6" strokeWidth={1.6} />
                <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-paper">
                  <ArrowDown aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-y-0.5 group-active:translate-y-2" strokeWidth={1.8} />
                </span>
              </span>
              <span>
                <span className="display block text-2xl md:text-3xl">{d.label}</span>
                <span className="mt-1 block text-ink/65">{d.line}</span>
                <span className="num mt-3 block text-sm font-semibold text-pitch">{d.kind}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
