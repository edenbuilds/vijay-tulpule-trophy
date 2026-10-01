import { Phone } from "lucide-react";
import { CONTACTS } from "@/lib/site";

// Poster contacts as tap-to-call rows on the same dashed rule the committee list uses.
export function Contacts() {
  return (
    <ul className="rule grid md:grid-cols-2 md:gap-x-12">
      {CONTACTS.map((c) => (
        <li key={c.tel} className="row-line border-b border-dashed border-ink/15">
          <a href={`tel:${c.tel}`} className="press flex min-h-16 items-center justify-between gap-4 py-4">
            <span>
              <span className="block text-lg font-semibold">{c.name}</span>
              <span className="text-sm text-ink/55">{c.role}</span>
            </span>
            <span className="num flex items-center gap-2 text-lg text-pitch">
              <Phone aria-hidden="true" className="size-4" strokeWidth={1.8} />
              {c.phone}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
