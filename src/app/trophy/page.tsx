import type { Metadata } from "next";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { Block } from "@/components/Sections";

export const metadata: Metadata = { title: "Trophy" };

export default function Trophy() {
  return (
    <>
      <section className="px-2 pt-2">
        <div className="rounded-2xl bg-mist px-4 pb-12 pt-24 md:px-10 md:pb-16 md:pt-32">
          <h1 className="display rise text-5xl md:text-8xl">Vijay Tulpule</h1>
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
        <p className="num max-w-2xl text-lg text-ink/75 md:text-xl">
          Trophy presented on 24 October after the final. Winning captain receives it.
        </p>
      </Block>
    </>
  );
}
