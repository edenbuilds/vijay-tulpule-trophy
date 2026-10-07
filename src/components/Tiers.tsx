import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TIERS } from "@/lib/site";

export function Tiers({ cta = "Enquire About Sponsorship" }: { cta?: string }) {
  return (
    <>
      <ul className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <li key={tier.name} className="border-t-2 border-navy py-5">
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="display mt-3 text-2xl md:text-3xl">{tier.price}</p>
            <p className="mt-2 text-sm text-navy/70">{tier.line}</p>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-navy px-5 font-semibold text-white transition-colors hover:bg-royal">
        {cta} <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </>
  );
}
