import type { Metadata } from "next";
import { Contacts } from "@/components/Contacts";
import { Block, Hero } from "@/components/Sections";
import { tie } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <Hero title="Contact" sub="Write to the organisers about teams, media or sponsorship." />
      <Block title="Call the organisers" tone="white">
        <Contacts />
      </Block>
      <Block title="Or write" tone="snow">
        <ContactForm />
      </Block>
      <Block title="Travel" tone="sky">
        <p className="num max-w-3xl text-lg md:text-xl">
          {tie("Matches are played in Mumbai and Navi Mumbai, and the days and grounds are on the Fixtures page. The organisers book hotel rooms for every team. Captains collect the keys on 16 October with photo ID and the 15-player list. The room list is not published.")}
        </p>
      </Block>
    </>
  );
}
