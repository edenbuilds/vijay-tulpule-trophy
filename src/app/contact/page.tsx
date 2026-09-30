import type { Metadata } from "next";
import { PHOTOS } from "@/lib/site";
import { Block, Hero } from "@/components/Sections";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <Hero title="Contact" sub="Write to the organisers about teams, media or sponsorship." photo={PHOTOS.tent} />
      <Block tone="paper">
        <ContactForm />
      </Block>
      <Block title="Travel" tone="cream">
        <p className="num max-w-3xl text-lg text-ink/75 md:text-xl">
          Matches are in Mumbai and Navi Mumbai. The organisers book hotel rooms for every team. Captains collect the keys on
          16 October with photo ID and the 15-player list. The room list is not published.
        </p>
      </Block>
    </>
  );
}
