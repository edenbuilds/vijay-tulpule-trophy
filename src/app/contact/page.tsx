import type { Metadata } from "next";
import { Block, Hero } from "@/components/Sections";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <Hero title="Contact" sub="Teams, media, sponsors" />
      <Block tone="paper">
        <ContactForm />
      </Block>
      <Block title="Travel" tone="cream">
        <p className="num max-w-3xl text-lg text-ink/75 md:text-xl">
          Matches in Mumbai and Navi Mumbai. Organisers assign hotels. Captains collect keys on 16 October with photo ID and
          the 15-player list. Room list is not public.
        </p>
      </Block>
    </>
  );
}
