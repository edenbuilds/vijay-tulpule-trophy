export const NAV = [
  { href: "/fixtures", label: "Fixtures" },
  { href: "/teams", label: "Teams" },
  { href: "/format", label: "Format" },
  { href: "/trophy", label: "Trophy" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About BACA" },
  { href: "/sponsors", label: "Sponsors" },
];

export const FOOTER_LINKS = [
  { href: "/fixtures", label: "Fixtures" },
  { href: "/teams", label: "Teams" },
  { href: "/format", label: "Format" },
  { href: "/trophy", label: "Trophy" },
  { href: "/gallery", label: "Gallery" },
  { href: "/ceremonies", label: "Ceremonies" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/downloads", label: "Downloads" },
  { href: "/about", label: "About BACA" },
  { href: "/poem", label: "Poem" },
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

// Contact details printed on the tournament poster (BACA, 2026). Numbers are the ones on the poster, unchanged.
export const CONTACTS = [
  { name: "Rajiv Patil", role: "Sr. Adv. & Hon. Secretary", phone: "98210 24059", tel: "+919821024059" },
  { name: "Deepak Thakre", role: "Adv.", phone: "96193 56926", tel: "+919619356926" },
  { name: "Meghashyam Kocharekar", role: "Adv.", phone: "98211 43570", tel: "+919821143570" },
  { name: "Harshad Bhadbhade", role: "Adv.", phone: "98203 00135", tel: "+919820300135" },
];

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

export type Slot = { time?: string; code?: string; venue?: string; matches?: string[]; note?: string };
export type Day = { date: string; day: string; slots: Slot[] };

// Confirmed results only, oldest first, e.g. { date: "18 Oct", match: "A v B", line: "A won by 20 runs" }.
// The news strip shows them newest first, ahead of the fixtures still to come.
export type Result = { date: string; match: string; line: string };
export const RESULTS: Result[] = [];

// Fixture grid from the Organising Committee's combined working book (25-09-2026). Grounds are numbered
// until the venues are named; the 14:30 sessions run only if the lights are certified by 16 Oct.
const LEAGUE = "Grounds to be announced";
export const FIXTURES: Day[] = [
  { date: "17 Oct", day: "Sat", slots: [{ time: "07:00", venue: "Main Ground", note: "Opening: medals, team photographs, anthem" }] },
  {
    date: "18 Oct",
    day: "Sun",
    slots: [
      { time: "09:00", code: "M01–M04", venue: LEAGUE, matches: ["A v B", "E v F", "I v J", "M v N"] },
      { time: "14:30", code: "M05–M08", venue: LEAGUE, matches: ["C v D", "G v H", "K v L", "O v P"] },
    ],
  },
  {
    date: "19 Oct",
    day: "Mon",
    slots: [
      { time: "09:00", code: "M09–M12", venue: LEAGUE, matches: ["A v C", "E v G", "I v K", "M v O"] },
      { time: "14:30", code: "M13–M16", venue: LEAGUE, matches: ["B v D", "F v H", "J v L", "N v P"] },
    ],
  },
  {
    date: "20 Oct",
    day: "Tue",
    slots: [
      { time: "09:00", code: "M17–M20", venue: LEAGUE, matches: ["A v D", "E v H", "I v L", "M v P"] },
      { time: "14:30", code: "M21–M24", venue: LEAGUE, matches: ["B v C", "F v G", "J v K", "N v O"] },
    ],
  },
  { date: "21 Oct", day: "Wed", slots: [{ note: "Reserve day for weather" }] },
  {
    date: "22 Oct",
    day: "Thu",
    slots: [{ time: "09:00", code: "QF1–QF4", venue: LEAGUE, matches: ["QF: A1 v B2", "QF: B1 v A2", "QF: C1 v D2", "QF: D1 v C2"] }],
  },
  {
    date: "23 Oct",
    day: "Fri",
    slots: [{ time: "09:00", code: "SF1–SF2", venue: "Main Ground and Ground 2", matches: ["SF: W QF1 v W QF2", "SF: W QF3 v W QF4"] }],
  },
  {
    date: "24 Oct",
    day: "Sat",
    slots: [
      { time: "09:00", venue: "Main Ground", matches: ["Final: W SF1 v W SF2"] },
      { time: "09:00", venue: "Ground 2", matches: ["3rd place: L SF1 v L SF2"] },
      { time: "17:15", venue: "Main Ground", note: "Trophy evening" },
    ],
  },
];

export const EVENT = {
  edition: "38th All India Advocates’ Cricket Tournament",
  host: "BACA",
  trophy: "The Vijay Tulpule Trophy",
  fixturesNote: "Details of fixtures will be announced shortly.",
  overs: "50",
  squad: "15",
};

// Appeal for Sponsorship (08-07-2026) and BACA's letter of 30-01-2026.
export const HISTORY = {
  since: "1989",
  body: "Cricket Association of Advocates in India",
  motto: "Cricket for Friendship",
  hosts: ["Gurgaon", "Delhi", "Lucknow", "Allahabad", "Kolkata", "Hyderabad", "Bangalore", "Mumbai"],
  mumbai: ["1993", "2005", "2026"],
};

export type Step = { time?: string; what: string };
export type Ceremony = { id: string; title: string; when: string; where: string; line: string; steps: Step[]; note?: string };

// Public running orders only. The committee's seating, speaker and protocol notes stay internal.
export const CEREMONIES: Ceremony[] = [
  {
    id: "opening",
    title: "Opening",
    when: "Sat 17 Oct, 07:00–08:40",
    where: "Main Ground",
    line: "All sixteen squads meet on the Main Ground the day before the league starts.",
    steps: [
      { time: "07:00", what: "Teams assemble" },
      { what: "National Anthem" },
      { what: "Participation medals for every registered player" },
      { what: "Team photographs" },
      { time: "08:40", what: "Close" },
    ],
    note: "Participation medals are presented here only.",
  },
  {
    id: "sitting",
    title: "Ceremonial sitting",
    when: "16:00–18:00, date to be announced",
    where: "D.Y. Patil Law College Auditorium",
    line: "A formal sitting for players, guests and sponsors. Entry with accreditation only.",
    steps: [
      { time: "16:00", what: "Doors open" },
      { time: "16:15", what: "Lighting of the lamp and National Anthem" },
      { time: "16:19", what: "Welcome and addresses" },
      { time: "17:40", what: "Vote of thanks" },
      { time: "17:45", what: "Official photograph" },
      { time: "18:00", what: "Close" },
    ],
  },
  {
    id: "final",
    title: "Trophy evening",
    when: "Sat 24 Oct, 17:15–18:00",
    where: "Main Ground",
    line: "Straight after the final. If the match runs late, the evening moves with it.",
    steps: [
      { time: "17:15", what: "Three sides line up" },
      { time: "17:20", what: "National Anthem" },
      { time: "17:22", what: "Result read by the referee" },
      { time: "17:25", what: "Third place, runners-up, then the Vijay Tulpule Trophy to the winning captain" },
      { time: "17:29", what: "Series awards" },
      { time: "17:32", what: "Runners-up captain, then winning captain" },
      { time: "17:39", what: "Head of the Association closes the season" },
      { time: "17:45", what: "Official photograph" },
      { time: "18:00", what: "Close" },
    ],
    note: "In rain or bad light the evening moves to the pavilion hall.",
  },
];

export const AWARDS = [
  ["96", "match awards"],
  ["6", "trophy evening cups"],
  ["240", "participation medals"],
];

export const PARTNERS = [
  ["Title", "Event name and the opening board."],
  ["Presenting", "Named with the title on every board."],
  ["Official partners", "Ball, drink, bank, auto and wear."],
  ["Awards", "A match award or a series cup."],
  ["Grounds", "One of the eight venues."],
  ["Associate", "Smaller firms and practices."],
];

export const TERMS = [
  "Sponsorship is not refunded if play is cancelled by natural calamity or a national or state emergency.",
  "If the organisers cancel for any other unavoidable reason, the amount is refunded.",
  "Once paid and confirmed, the amount is not refunded if the sponsor withdraws.",
  "Brand placements and activities are set by the organisers.",
];

export const DOWNLOADS = [
  { href: "/downloads/vtt-2026-fixtures.pdf", label: "Fixtures", line: "Every match, day and ground. A4 PDF.", kind: "PDF" },
  { href: "/vtt-2026.ics", label: "Calendar", line: "All eight days in your calendar app.", kind: "ICS" },
  { href: "/downloads/vtt-2026-sponsorship.pdf", label: "Sponsorship", line: "Tiers, rights, terms and payment. A4 PDF.", kind: "PDF" },
  { href: "/downloads/baca-logo-pack.zip", label: "BACA logo pack", line: "The seal in colour, gold, ink, green and white, plus lockups. PNG.", kind: "ZIP" },
];
