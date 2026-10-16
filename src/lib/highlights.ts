// Tournament highlight reel, newest first. To add a moment: drop the image in public/highlights/ and add one entry at the TOP.
// The first entry is shown large under the hero; the rest line up beside it as the tournament goes on.
// Captions come from BACA. Leave `date` out unless BACA gives it (DD-MM-YYYY).
export type Highlight = { src: string; w: number; h: number; caption: string; tagline?: string; alt: string; date?: string };

export const HIGHLIGHTS: Highlight[] = [
  {
    src: "/highlights/01-cm-invitation.webp",
    w: 1254,
    h: 1254,
    caption: "Adv. Harshad Bhadbhade, representing BACA, presents a formal invitation to Shri Eknath Shinde Ji, Hon’ble Deputy Chief Minister of Maharashtra.",
    tagline: "All set for the 38th All India Advocates’ Cricket Tournament!",
    alt: "Adv. Harshad Bhadbhade handing a formal invitation to Deputy Chief Minister Eknath Shinde, with a BACA member beside them",
  },
];
