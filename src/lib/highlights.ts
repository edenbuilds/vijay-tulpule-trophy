// Tournament highlight reel, newest first. To add a moment: drop the image in public/highlights/ and add one entry at the TOP.
// The first entry is shown large under the hero; the rest line up beside it as the tournament goes on.
// Captions come from BACA. Leave `date` out unless BACA gives it (DD-MM-YYYY).
export type Highlight = { src: string; w: number; h: number; caption: string; alt: string; date?: string };

export const HIGHLIGHTS: Highlight[] = [
  {
    src: "/highlights/01-cm-invitation.webp",
    w: 1254,
    h: 1254,
    caption: "Adv. Harshad Bhadbhade, representing BACA, presents a formal invitation to the Hon’ble Chief Minister of Maharashtra, Shri Eknath Shinde Ji.",
    alt: "Adv. Harshad Bhadbhade handing a formal invitation to Chief Minister Eknath Shinde, with a BACA member beside them",
  },
];
