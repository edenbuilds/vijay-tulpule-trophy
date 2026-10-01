import type { Metadata } from "next";
import Link from "next/link";
import { CurtainPortrait } from "@/components/gems/CurtainPortrait";
import { Block } from "@/components/Sections";
import { TULPULE, tie } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trophy",
  description: "The Vijay Tulpule Trophy and the man it is named after: a Bombay criminal lawyer, Government Pleader and Public Prosecutor, and Ranji Trophy probable.",
};

const body = "max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl";
const link = "inline-flex min-h-11 items-center text-base font-semibold underline decoration-pitch decoration-2 underline-offset-8 transition-colors hover:text-pitch";

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
            alt="Adv. Vijay Tulpule, informal portrait in a white shirt and suspenders"
            caption="Adv. Vijay Tulpule"
            width={508}
            height={661}
          />
          <div>
            <p className="max-w-xl text-xl leading-relaxed md:text-2xl">
              {tie(`${TULPULE.name} (22 September 1943 to 29 September 2017) was a criminal lawyer at the Bombay Bar. Before he joined it, he was a Bombay Ranji Trophy probable.`)}
            </p>
            <p className="mt-4 max-w-xl text-lg text-ink/70">
              {tie("The Bombay High Court held a Full Court Reference in his memory on 17 November 2017. This page draws on it.")}
            </p>
            <a href={TULPULE.source.href} target="_blank" rel="noopener noreferrer" className={`mt-4 ${link}`}>
              {TULPULE.source.label}
            </a>
          </div>
        </div>
      </Block>

      <Block title="His life" tone="cream">
        <ol className="rule max-w-4xl">
          {TULPULE.life.map((e) => (
            <li key={e.when} className="border-b border-dashed border-ink/15 py-5 md:grid md:grid-cols-[11rem_1fr] md:gap-x-10 md:py-6">
              <span className="num mb-1 block text-base font-semibold text-pitch md:mb-0 md:text-lg">{e.when}</span>
              <span className="text-base leading-relaxed text-ink/80 md:text-lg">{tie(e.what)}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Sport" tone="paper">
        <div className="grid gap-5">
          <p className={body}>
            {tie("Tributes at the reference describe him as a university champion who played alongside Sunil Gavaskar and Dilip Vengsarkar. He sponsored young players at Dadar Union Club and Matunga Gymkhana and led the Advocates’ team in the Indian High Courts Cricket Tournament.")}
          </p>
          <p className={body}>
            {tie("Adv. Deepak Thakre recalled an all India advocates’ final at the Chinnaswamy Stadium in Bangalore where he scored 90 and was given a standing ovation, among others by the then Chief Justice of India and the spinner Erapalli Prasanna.")}
          </p>
          <p className={body}>
            {tie("Off the cricket field he was president of volleyball, carrom and badminton associations, promoted table tennis, paid for tournaments and helped athletes with money.")}
          </p>
        </div>
      </Block>

      <Block title="At the Bar" tone="cream">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_minmax(0,20rem)] md:gap-20">
          <div className="grid gap-5 md:order-1">
            <p className={body}>
              {tie("He was a criminal trial lawyer and a noted cross-examiner, and also practised civil, industrial and constitutional law, up to the Supreme Court. As Government Pleader and Public Prosecutor he handled State appeals, confirmation cases and detention matters. He appeared before the Lentin and Srikrishna Commissions.")}
            </p>
            <p className={body}>
              {tie("In a murder appeal that reached the High Court after 13 years, he persuaded the Division Bench that the acquittal was wrong. Asked why he was not pressing for the death sentence, he said that as an officer of the Court he was asking only for life imprisonment, and insisted that his statement be recorded. The Supreme Court endorsed that stand.")}
            </p>
            <p className={body}>
              {tie("Almost 45 juniors trained in his chamber. Adv. Uma Wagle recalled that to join it you had to be a sportsman or an artist.")}
            </p>
          </div>
          <CurtainPortrait
            src="/img/tulpule-formal.jpg"
            alt="Adv. Vijay Tulpule, formal portrait in a check jacket and tie"
            caption="Adv. Vijay Tulpule"
            width={388}
            height={618}
            wipe="rl"
            className="max-w-[16rem] md:order-2 md:max-w-none"
          />
        </div>
      </Block>

      <Block title="In his name" tone="paper">
        <p className={body}>
          {tie("When the Full Court Reference was held in 2017, the Advocates’ Association of Western India was running a Vijay Tulpule Cricket Championship Trophy, and the Mumbai Cricket Association one for under-13 teams. In October 2026 the winners of the 38th All India Advocates’ Cricket Tournament receive The Vijay Tulpule Trophy.")}
        </p>
      </Block>

      <Block title="Rizvi Shield/Plate" tone="cream">
        <p className="num max-w-2xl text-lg text-ink/75 md:text-xl">
          BACA has named a second award the Rizvi Shield/Plate. Who it goes to and how it is played for are still being
          confirmed and will be published here.
        </p>
      </Block>

      <Block title="Presentation" tone="paper">
        <p className="num max-w-2xl text-lg text-ink/75 md:text-xl">
          Presented on 24 October, straight after the final. The Head of the Association hands The Vijay Tulpule Trophy to the winning captain.
        </p>
        <Link href="/ceremonies#final" className={`mt-6 ${link}`}>Trophy evening running order</Link>
      </Block>
    </>
  );
}
