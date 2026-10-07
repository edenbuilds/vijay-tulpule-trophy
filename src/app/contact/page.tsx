import type { Metadata } from "next";
import { Contacts } from "@/components/Contacts";
import { Block, Hero } from "@/components/Sections";
import { tie } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <Hero title="Contact BACA" sub="Reach the organisers about the tournament, teams, media or sponsorship." />
      <Block tone="white">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="display text-3xl md:text-4xl">Write to the organisers</h2>
            <p className="mt-3 max-w-md text-navy/70">For tournament enquiries, team information and sponsorship conversations.</p>
            <div className="mt-8"><Contacts /></div>
          </div>
          <div>
            <h2 className="display mb-6 text-3xl md:text-4xl">Send an enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </Block>
      <Block title="Team travel and accommodation" tone="sky">
        <p className="max-w-3xl text-lg leading-relaxed">{tie("Matches are played in Mumbai and Navi Mumbai, and the days and grounds are on the Fixtures page. The organisers book hotel rooms for every team. Captains collect the keys on 16 October with photo ID and the 15-player list. The room list is not published.")}</p>
      </Block>
    </>
  );
}
