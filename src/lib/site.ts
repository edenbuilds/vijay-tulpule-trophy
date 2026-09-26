export const NAV = [
  { href: "/fixtures", label: "Fixtures" },
  { href: "/teams", label: "Teams" },
  { href: "/format", label: "Format" },
  { href: "/trophy", label: "Trophy" },
  { href: "/sponsors", label: "Sponsors" },
];

export const FOOTER_LINKS = [
  { href: "/fixtures", label: "Fixtures" },
  { href: "/teams", label: "Teams" },
  { href: "/format", label: "Format" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

export const ORG = {
  name: "Bombay Advocates’ Cricket Association",
  trust: "Registered Public Trust, 1993. No. 797/1993 / 4BBSD",
  address: "Krishna Kunj, 36 Shivaji Park, Mumbai 400 028",
  email: "advrajivpatil@gmail.com",
  phone: "+91 98210 24059",
  phoneHref: "tel:+919821024059",
};

export const GROUPS = [
  { name: "A", teams: ["A", "B", "C", "D"] },
  { name: "B", teams: ["E", "F", "G", "H"] },
  { name: "C", teams: ["I", "J", "K", "L"] },
  { name: "D", teams: ["M", "N", "O", "P"] },
];

export const TIERS = [
  { name: "Elite", price: "₹5,00,000+", line: "Ground logo" },
  { name: "Silver", price: "₹10,00,000+", line: "Programme" },
  { name: "Gold", price: "₹12,50,000+", line: "Stream" },
  { name: "Platinum", price: "₹15,00,000+", line: "Title rights" },
];

export type Slot = { time?: string; matches?: string[]; note?: string };
export type Day = { date: string; day: string; slots: Slot[] };

export const FIXTURES: Day[] = [
  { date: "17 Oct", day: "Sat", slots: [{ time: "07:00", note: "Opening ceremony, Main Ground" }] },
  {
    date: "18 Oct",
    day: "Sun",
    slots: [
      { time: "09:00", matches: ["A v B", "E v F", "I v J", "M v N"] },
      { time: "14:30", matches: ["C v D", "G v H", "K v L", "O v P"] },
    ],
  },
  {
    date: "19 Oct",
    day: "Mon",
    slots: [
      { time: "09:00", matches: ["A v C", "E v G", "I v K", "M v O"] },
      { time: "14:30", matches: ["B v D", "F v H", "J v L", "N v P"] },
    ],
  },
  {
    date: "20 Oct",
    day: "Tue",
    slots: [
      { time: "09:00", matches: ["A v D", "E v H", "I v L", "M v P"] },
      { time: "14:30", matches: ["B v C", "F v G", "J v K", "N v O"] },
    ],
  },
  { date: "21 Oct", day: "Wed", slots: [{ note: "Reserve day" }] },
  {
    date: "22 Oct",
    day: "Thu",
    slots: [{ time: "09:00", matches: ["QF: A1 v B2", "QF: B1 v A2", "QF: C1 v D2", "QF: D1 v C2"] }],
  },
  { date: "23 Oct", day: "Fri", slots: [{ time: "09:00", matches: ["SF", "SF"] }] },
  {
    date: "24 Oct",
    day: "Sat",
    slots: [
      { time: "09:00", matches: ["3rd place", "Final"] },
      { time: "Evening", note: "Presentation" },
    ],
  },
];

// Placeholder photography until the organisers supply their own: generic club cricket in Mumbai from
// Wikimedia Commons (free licences, credited in the footer). None of these show a confirmed venue.
const wm = (path: string, w = 1280) => {
  const name = path.split("/").pop();
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${w}px-${name}`;
};
export const PHOTOS = {
  whites: { src: wm("5/59/A_Game_of_Cricket_in_Mumbai_%282133928156%29.jpg"), alt: "Cricketers in whites on a green maidan" },
  tower: { src: wm("4/45/A_Game_of_Cricket_in_Mumbai_%282133149871%29.jpg", 960), alt: "A batter on a dusty maidan under a clock tower" },
  tent: { src: "https://upload.wikimedia.org/wikipedia/commons/a/ad/A_break_from_cricket.jpg", alt: "A shade tent beside a cricket ground" },
  field: { src: wm("7/79/Oval_Maidan_%283101478304%29.jpg"), alt: "An empty cricket field in late light" },
  casual: { src: wm("3/32/Mumbai%2C_India%2C_Oval_Maidan%2C_Sports.jpg"), alt: "Players and a batter on an open ground" },
  saturday: { src: wm("5/5b/Saturday_Cricket_%2813968787199%29.jpg"), alt: "Several club matches on one maidan" },
  crowd: { src: wm("5/54/Crowds_watching_Sunday_Cricket_%2814011675873%29.jpg"), alt: "Spectators watching cricket through railings" },
};

export const PHOTO_CREDITS = [
  { by: "Tom Thai", licence: "CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:A_Game_of_Cricket_in_Mumbai_(2133928156).jpg" },
  { by: "Satish Krishnamurthy", licence: "CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:A_break_from_cricket.jpg" },
  { by: "Honza Soukup", licence: "CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:Oval_Maidan_(3101478304).jpg" },
  { by: "Vyacheslav Argenberg", licence: "CC BY 4.0", href: "https://commons.wikimedia.org/wiki/File:Mumbai,_India,_Oval_Maidan,_Sports.jpg" },
  { by: "David Brossard", licence: "CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:Saturday_Cricket_(13968787199).jpg" },
];
