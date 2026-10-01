import type { Metadata } from "next";
import Link from "next/link";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { Block } from "@/components/Sections";

export const metadata: Metadata = { title: "Trophy" };

export default function Trophy() {
  return (
    <>
      <section className="px-2 pt-2">
        <div className="rounded-2xl bg-mist px-4 pb-12 pt-24 md:px-10 md:pb-16 md:pt-32">
          <h1 className="display rise text-5xl md:text-8xl">The Vijay Tulpule Trophy</h1>
          <p className="rise mt-4 text-xl text-ink/65 md:text-2xl" style={{ animationDelay: "100ms" }}>
            Awarded to the winners of the 38th All India Advocates’ Cricket Tournament
          </p>
        </div>
      </section>

      <Block tone="paper">
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-20">
          <CurtainPortrait
            src="/img/tulpule-informal.jpg"
            alt="Vijay Tulpule, informal portrait in a white shirt and suspenders"
            caption="Vijay Tulpule"
            width={508}
            height={661}
          />
          <p className="max-w-xl text-xl leading-relaxed md:text-2xl">
            Advocate at the Bombay Bar. University cricketer. Bombay Ranji Trophy probable. Played with Sunil Gavaskar and
            Dilip Vengsarkar.
          </p>
        </div>
      </Block>

      <Block tone="cream">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_minmax(0,20rem)] md:gap-20">
          <p className="num order-2 max-w-xl text-xl leading-relaxed md:order-1 md:text-2xl">
            The Bombay High Court held a Full Court Reference in his memory on 17 November 2017.
          </p>
          <CurtainPortrait
            src="/img/tulpule-formal.jpg"
            alt="Vijay Tulpule, formal portrait in a check jacket and tie"
            caption="Vijay Tulpule"
            width={388}
            height={618}
            wipe="rl"
            className="order-1 max-w-[16rem] md:order-2 md:max-w-none"
          />
        </div>
      </Block>

      <Block title="Rizvi Shield/Plate" kicker="Also awarded" tone="paper">
        <p className="num max-w-2xl text-lg text-ink/75 md:text-xl">
          BACA has named a second award the Rizvi Shield/Plate. Who it goes to and how it is played for are still being
          confirmed and will be published here.
        </p>
      </Block>

      <Block title="Presentation" tone="cream">
        <p className="num max-w-2xl text-lg text-ink/75 md:text-xl">
          Presented on 24 October, straight after the final. The Head of the Association hands The Vijay Tulpule Trophy to the winning captain.
        </p>
        <Link href="/ceremonies#final" className="mt-8 inline-block text-base font-semibold underline decoration-pitch decoration-2 underline-offset-8 transition-colors hover:text-pitch">Trophy evening running order</Link>
      </Block>
    </>
  );
}
