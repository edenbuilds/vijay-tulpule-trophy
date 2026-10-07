import Image from "next/image";
import { HOSTS, tie, type Org } from "@/lib/site";

// Host, co-hosts, aegis. On a phone each group is a dashed list in one tile (logo left, name right). From md every logo stands
// in its own well (the partner artwork is drawn for light grounds) with the name under it. `tile` is the well colour: pass the
// one that contrasts with the band the block sits on (bg-white on snow or sky, bg-snow on white). On lg the three groups share
// two grid rows (subgrid) so the wells line up when "Under the aegis of" wraps to two lines.
const WELL = { "bg-white": "md:bg-white", "bg-snow": "md:bg-snow" } as const;

function Group({ title, orgs, cols, tile }: { title: string; orgs: Org[]; cols: string; tile: keyof typeof WELL }) {
  return (
    <div className="lg:row-span-2 lg:grid lg:grid-rows-subgrid">
      <h3 className="display text-2xl md:text-3xl">{title}</h3>
      <ul className={`mt-4 rounded-2xl px-4 md:mt-6 md:grid md:gap-3 md:rounded-none md:bg-transparent md:px-0 ${tile} ${cols}`}>
        {orgs.map((o) => (
          <li
            key={o.short}
            className={`flex items-center gap-4 border-b border-dashed border-navy/15 py-4 last:border-0 md:flex-col md:justify-between md:gap-5 md:rounded-2xl md:border-0 md:p-6 md:text-center ${WELL[tile]}`}
          >
            <span className="flex h-14 w-20 flex-none items-center justify-center md:h-28 md:w-full">
              <Image src={o.logo} alt={`${o.short} logo`} width={o.w} height={o.h} className="max-h-full w-auto max-w-full" />
            </span>
            <span>
              <span className="block text-lg font-semibold leading-snug">{tie(o.name)}</span>
              <span className="num block text-navy/70">{o.short}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hosts({ tile = "bg-white" }: { tile?: keyof typeof WELL }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_3fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-0">
      <Group title="Hosts" orgs={[HOSTS.host]} cols="" tile={tile} />
      <Group title="Co-hosts" orgs={HOSTS.cohosts} cols="md:grid-cols-3" tile={tile} />
      <Group title="Under the aegis of" orgs={[HOSTS.aegis]} cols="" tile={tile} />
    </div>
  );
}

// Footer row: the five marks side by side, each named for screen readers.
export function HostsStrip() {
  const all = [HOSTS.host, ...HOSTS.cohosts, HOSTS.aegis];
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-4 sm:gap-x-6">
      {all.map((o) => (
        <li key={o.short} className="flex h-10 items-center sm:h-12 md:h-14">
          <Image src={o.logo} alt={`${o.name} (${o.short})`} width={o.w} height={o.h} className="h-full w-auto" />
        </li>
      ))}
    </ul>
  );
}
