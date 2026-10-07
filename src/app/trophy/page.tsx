import type { Metadata } from "next";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { MagneticButton } from "@/components/gems/MagneticButton";
import { Shape } from "@/components/brand/Shape";
import { Block } from "@/components/Sections";
import { TULPULE, tie } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trophy",
  description: "The Vijay Tulpule Trophy and the man it is named after: a Bombay criminal lawyer, Government Pleader and Public Prosecutor, and Ranji Trophy probable.",
};

const body = "text-base leading-relaxed text-navy/80 md:text-lg";
// Paragraph lists: one dashed list inside the tile on phones, side by side from md.
const item = "border-b border-dashed border-navy/15 py-5 last:border-0";

export default function Trophy() {
  return (
    <>
      {/* The page header is the navy band for the portrait. One brand shape sits behind the portrait and is clipped by the tile. */}
      <section className="px-2 pt-2">
        <div className="relative isolate overflow-hidden rounded-none bg-navy text-white">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-24 -z-10 w-[24rem] md:-bottom-28 md:-right-20 md:w-[46rem]">
            <Shape className="w-full" />
          </div>
          <div className="mx-auto grid max-w-7xl items-end gap-x-16 gap-y-8 px-4 pb-10 pt-24 md:grid-cols-[1fr_minmax(0,24rem)] md:px-8 md:pb-14 md:pt-32">
            <div>
              <h1 className="display display-long rise text-[clamp(2.5rem,11vw,4.5rem)] !leading-[1.1] md:text-[clamp(3.5rem,6.6vw,6.5rem)]">The Vijay Tulpule Trophy</h1>
              <p className="rise mt-5 max-w-xl text-lg text-white/80 md:text-2xl" style={{ animationDelay: "100ms" }}>
                Awarded to the winners of the 38th All India Advocates’ Cricket Tournament
              </p>
            </div>
            <CurtainPortrait
              src="/img/tulpule-informal.jpg"
              alt="The late Adv. Vijay Tulpule, informal portrait in a white shirt and suspenders"
              caption="The late Adv. Vijay Tulpule"
              width={508}
              height={661}
              className="max-w-[16rem] md:max-w-none [&_figcaption]:text-white"
            />
          </div>
        </div>
      </section>

      <Block tone="snow">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-16">
          <p className="display display-long max-w-4xl text-2xl !leading-[1.25] md:text-4xl">
            {tie("The late Adv. Vijay Traymbak Tulpule (1943 to 2017) was a criminal trial lawyer at the Bombay Bar and Government Pleader and Public Prosecutor for the State of Maharashtra. Before he enrolled as an advocate, he was a Bombay Ranji Trophy probable.")}
          </p>
          <div>
            <MagneticButton href="/adv-vijay-tulpule">Read his life</MagneticButton>
          </div>
        </div>
      </Block>

      <Block title="His life" tone="white">
        <ol className="rule max-w-4xl">
          {TULPULE.life.map((e) => (
            <li key={e.when} className="border-b border-dashed border-navy/15 py-5 last:border-0 md:grid md:grid-cols-[11rem_1fr] md:gap-x-10 md:py-6">
              <span className="num mb-1 block text-base font-semibold text-royal md:mb-0 md:text-lg">{e.when}</span>
              <span className="text-base leading-relaxed text-navy/80 md:text-lg">{tie(e.what)}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Sport" tone="sky">
        <div className="grid md:grid-cols-3 md:gap-10">
          {[
            "Tributes at the reference describe him as a university champion who played alongside Sunil Gavaskar and Dilip Vengsarkar. He sponsored young players at Dadar Union Club and Matunga Gymkhana and led the Advocates’ team in the Indian High Courts Cricket Tournament.",
            "Adv. Deepak Thakre recalled an all India advocates’ final at the Chinnaswamy Stadium in Bangalore where he scored 90 and was given a standing ovation, among others by the then Chief Justice of India and the spinner Erapalli Prasanna.",
            "Off the cricket field he was president of volleyball, carrom and badminton associations, promoted table tennis, paid for tournaments and helped athletes with money.",
          ].map((p) => (
            <p key={p} className={`${body} ${item} md:border-b-0 md:py-0`}>{tie(p)}</p>
          ))}
        </div>
      </Block>

      <Block title="At the Bar" tone="white">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_minmax(0,20rem)] md:gap-20">
          <div className="grid">
            {[
              "He was a criminal trial lawyer and a noted cross-examiner, and also practised civil, industrial and constitutional law, up to the Supreme Court. As Government Pleader and Public Prosecutor he handled State appeals, confirmation cases and detention matters. He appeared before the Lentin and Srikrishna Commissions.",
              "In a murder appeal that reached the High Court after 13 years, he persuaded the Division Bench that the acquittal was wrong. Asked why he was not pressing for the death sentence, he said that as an officer of the Court he was asking only for life imprisonment, and insisted that his statement be recorded. The Supreme Court endorsed that stand.",
              "Almost 45 juniors trained in his chamber. Adv. Uma Wagle recalled that to join it you had to be a sportsman or an artist.",
            ].map((p) => (
              <p key={p} className={`${body} ${item} max-w-2xl md:py-6`}>{tie(p)}</p>
            ))}
          </div>
          <CurtainPortrait
            src="/img/tulpule-formal.jpg"
            alt="The late Adv. Vijay Tulpule, formal portrait in a check jacket and tie"
            caption="The late Adv. Vijay Tulpule"
            width={388}
            height={618}
            wipe="rl"
            className="order-first max-w-[16rem] md:order-last md:max-w-none"
          />
        </div>
      </Block>

      <Block tone="navy">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <h2 className="display text-4xl uppercase md:text-6xl">In his name</h2>
          <div className="grid gap-8">
            <p className="text-lg leading-relaxed text-white/80 md:text-xl">
              {tie("When the Full Court Reference was held in 2017, the Advocates’ Association of Western India was running a Vijay Tulpule Cricket Championship Trophy, and the Mumbai Cricket Association one for under-13 teams.")}
            </p>
            <p className="display display-long text-2xl !leading-[1.25] md:text-4xl">
              {tie("In October 2026 the winners of the 38th All India Advocates’ Cricket Tournament receive The Vijay Tulpule Trophy.")}
            </p>
          </div>
        </div>
      </Block>

      <Block tone="snow">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="display mb-5 text-3xl uppercase md:text-5xl">Rizvi Shield/Plate</h2>
            <p className="max-w-xl text-lg leading-relaxed text-navy/80 md:text-xl">
              BACA has named a second award the Rizvi Shield/Plate. Who it goes to and how it is played for are still being
              confirmed and will be published here.
            </p>
          </div>
          <div className="border-t border-dashed border-navy/15 pt-10 md:border-0 md:pt-0">
            <h2 className="display mb-5 text-3xl uppercase md:text-5xl">Presentation</h2>
            <p className="max-w-xl text-lg leading-relaxed text-navy/80 md:text-xl">
              {tie("Presented on 24 October, the day of the finals. The time and the venue are to be announced. The Head of the Association hands The Vijay Tulpule Trophy to the winning captain.")}
            </p>
            <div className="mt-6">
              <MagneticButton href="/ceremonies#final" tone="outline">Prize presentation</MagneticButton>
            </div>
          </div>
        </div>
      </Block>
    </>
  );
}
