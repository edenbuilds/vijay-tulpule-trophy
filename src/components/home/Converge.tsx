import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Team } from "@/lib/teams";
import StackSpread from "@/components/effects/stack-spread";

export function Converge({ teams }: { teams: Team[] }) {
  return <section aria-labelledby="teams-home-title" className="teams-stage">
    <div className="teams-stage-heading"><div><p className="text-base font-semibold text-royal">15 High Courts. The Supreme Court of India.</p><h2 id="teams-home-title" className="display">THE LINE-UP.</h2></div><Link href="/teams" className="inline-flex min-h-11 items-center gap-3 font-semibold">Meet all 16 teams <ArrowUpRight aria-hidden="true" className="size-5" /></Link></div>
    <StackSpread teams={teams} />
    <p className="mt-8 text-center text-base text-navy/65">Groups and matchups will be announced after the draw.</p>
  </section>;
}
