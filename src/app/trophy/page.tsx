import type { Metadata } from "next";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { Block } from "@/components/Sections";

export const metadata: Metadata = { title: "Trophy" };

export default function Trophy() {
  return (
    <>
      <section className="bg-paper pb-4 pt-20 md:pt-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h1 className="rise text-5xl font-bold md:text-8xl">Vijay Tulpule</h1>
          <p className="rise mt-4 text-xl text-ink/65 md:text-2xl" style={{ animationDelay: "100ms" }}>
            Trophy named after him
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
            Bombay High Court Full Court Reference, 17 November 2017.
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

      <Block title="Presentation" tone="night">
        <p className="num max-w-2xl text-lg text-white/75 md:text-xl">
          Trophy presented on 24 October after the final. Winning captain receives it.
        </p>
      </Block>
    </>
  );
}
