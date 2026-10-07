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
  { href: "/", label: "Home" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/teams", label: "Teams" },
  { href: "/format", label: "Format" },
  { href: "/trophy", label: "Trophy" },
  { href: "/gallery", label: "Gallery" },
  { href: "/ceremonies", label: "Ceremonies" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/downloads", label: "Downloads" },
  { href: "/about", label: "About BACA" },
  { href: "/about#hosts", label: "Hosts" },
  { href: "/adv-vijay-tulpule", label: "Adv. Vijay Tulpule" },
  { href: "/poem", label: "Poem" },
  { href: "/contact", label: "Contact" },
];

export const ORG = {
  name: "Bombay Advocates’ Cricket Association",
  trust: "Registered Public Trust, 1993. No. 797/1993 / 4BBSD",
  address: "Krishna Kunj, 36\u00a0Shivaji\u00a0Park, Mumbai\u00a0400\u00a0028",
  email: "advrajivpatil@gmail.com",
  phone: "+91 98210 24059",
  phoneHref: "tel:+919821024059",
};

// Host, co-hosts and the body the tournament is played under, as set out in BACA's co-host graphic (03-10-2026).
// Logos are cut out by scripts/logos.py. The AAWI crest reads "AIA", which is how the Association's own mark is lettered.
export type Org = { name: string; short: string; logo: string; w: number; h: number };
export const HOSTS: { host: Org; cohosts: Org[]; aegis: Org } = {
  host: { name: "Bombay Advocates’ Cricket Association", short: "BACA", logo: "/brand/baca-seal-dark.png", w: 1024, h: 1024 },
  cohosts: [
    { name: "Advocates’ Association of Western India", short: "AAWI", logo: "/brand/partners/aia.png", w: 1280, h: 791 },
    { name: "Bombay Bar Association", short: "BBA", logo: "/brand/partners/bba.png", w: 1024, h: 1024 },
    { name: "Bombay Incorporated Law Society", short: "BILS", logo: "/brand/partners/bils.png", w: 1024, h: 1024 },
  ],
  aegis: { name: "Cricket Association of Advocates in India", short: "CAAI", logo: "/brand/partners/caai.png", w: 800, h: 800 },
};
export const HOSTS_LINE = "Hosted by BACA, with the AAWI, the BBA and BILS as co-hosts, under the aegis of the CAAI.";

// Contact details printed on the tournament poster (BACA, 2026). Numbers are the ones on the poster, unchanged.
// Non-breaking spaces keep a name or an address together, so it wraps as a unit instead of leaving a lone word.
export const nb = (s: string) => s.replace(/ /g, "\u00a0");
// Long paragraphs run past the six lines Chrome will balance, so the last two words are tied instead.
export const tie = (s: string) => s.replace(/ (\S+)$/, "\u00a0$1");

export const CONTACTS = [
  { name: nb("Sr. Adv. Rajiv Patil"), role: "Hon. Secretary", phone: "98210 24059", tel: "+919821024059" },
  { name: nb("Adv. Deepak Thakre"), role: "", phone: "96193 56926", tel: "+919619356926" },
  { name: nb("Adv. Meghashyam Kocharekar"), role: "", phone: "98211 43570", tel: "+919821143570" },
  { name: nb("Adv. Harshad Bhadbhade"), role: "", phone: "98203 00135", tel: "+919820300135" },
];

export const TIERS = [
  { name: "Elite", price: "₹5,00,000+", line: "Ground logo" },
  { name: "Silver", price: "₹10,00,000+", line: "Programme" },
  { name: "Gold", price: "₹12,50,000+", line: "Stream" },
  { name: "Platinum", price: "₹15,00,000+", line: "Title rights" },
];

// Confirmed results only, oldest first, e.g. { date: "18 Oct", match: "A v B", line: "A won by 20 runs" }.
// The news strip shows them newest first, ahead of the fixtures still to come.
export type Result = { date: string; match: string; line: string };
export const RESULTS: Result[] = [];

export const EVENT = {
  edition: "38th All India Advocates’ Cricket Tournament",
  host: "BACA",
  trophy: "The Vijay Tulpule Trophy",
  overs: "35", // 35 per the site owner, 07-10-2026; the 25-09 working book said 50
  squad: "15",
};

// Adv. Vijay Tulpule, from the Full Court Reference held in his memory at the Bombay High Court on 17-11-2017: the
// Chief Justice's address and tributes by the Advocate General, the Additional Solicitor General and the presidents of
// the Bombay Bar Association, the Advocates' Association of Western India and the Bombay Incorporated Law Society.
// Nothing here goes beyond that document. Its speakers spell his middle name Traymbak, Trimbak and Tryambak; the
// Chief Justice's spelling is used. Where only one speaker says a thing, the copy names the speaker's role or the
// person who recalled it. Family members are left out on purpose.
export const TULPULE = {
  name: "Adv. Vijay Traymbak Tulpule",
  source: {
    href: "https://bombayhighcourt.gov.in/bhc/libweb/references/TulpuleVT.pdf",
    label: "Read the Full Court Reference (PDF)",
  },
  life: [
    { when: "1943", what: "Born in Mumbai on 22 September, the son of the cardiologist Traymbak Hari Tulpule. The family home in Dadar was a meeting place for freedom-movement activists." },
    { when: "1959", what: "Finished school at King George High School, Dadar. Studied at Elphinstone College, then St. Xavier’s College, where he graduated in 1964." },
    { when: "1967", what: "Graduated in law from Government Law College, Mumbai." },
    { when: "1968", what: "Enrolled as an advocate on 27 March with the Bar Council of Maharashtra and Goa. Joined the chamber of Adv. Ramrao Adik, then practised at the Dadar Court, mostly on the criminal side." },
    { when: "1992 to 1994", what: "Went on a six-day hunger strike for the City Civil Court to be given the jurisdiction of a district court. It ended when the Law Minister called on him and promised action." },
    { when: "1994 to 1999", what: "President and Patron of the Indian Advocates Cricket Association. Known as Guruji in Advocates Cricket." },
    { when: "1998 to 2000", what: "Government Pleader and Public Prosecutor for the State of Maharashtra in the High Court." },
    { when: "2017", what: "Died in Mumbai on 29 September, aged 74. The Bombay High Court held a Full Court Reference in his memory on 17 November." },
  ],
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
// The poster and the organisers' sheet (06-10-2026) give no ceremony time or venue, and the 25-09 working book is older than the
// sheet, so every time, "Main Ground" and the sitting venue from the book are left out. What stays is the order of events from
// the book, shown on the page as "as planned, to be confirmed". 17 Oct is the first day on the poster; 24 Oct has both finals
// grounds (CCI and Wankhede) in the sheet, which does not say where the prizes are presented.
export const CEREMONIES: Ceremony[] = [
  {
    id: "opening",
    title: "Opening",
    when: "17 Oct, time to be announced",
    where: "Venue to be announced",
    line: "The 16 squads gather the day before the first matches.",
    steps: [
      { what: "Teams assemble" },
      { what: "National Anthem" },
      { what: "Participation medals for every registered player" },
      { what: "Team photographs" },
    ],
    note: "Participation medals are presented here only.",
  },
  {
    id: "sitting",
    title: "Ceremonial sitting",
    when: "Date and time to be announced",
    where: "Venue to be announced",
    line: "A formal sitting for players, guests and sponsors. Entry with accreditation only.",
    steps: [
      { what: "Doors open" },
      { what: "Lighting of the lamp and National Anthem" },
      { what: "Welcome and addresses" },
      { what: "Vote of thanks" },
      { what: "Official photograph" },
    ],
  },
  {
    id: "final",
    // Called "Trophy evening" in the 25-09 working book, which put it at 17:15 on the Main Ground. No source now gives a time, so the
    // name no longer promises an evening.
    title: "Prize presentation",
    when: "24 Oct, time to be announced",
    where: "Venue to be announced",
    line: "The finals on 24 Oct are at CCI and Wankhede. Where the prizes are presented has not been stated.",
    steps: [
      { what: "Sides line up" },
      { what: "National Anthem" },
      { what: "Result read by the referee" },
      { what: "Runners-up, then the Vijay Tulpule Trophy to the winning captain" },
      { what: "Series awards" },
      { what: "Runners-up captain, then winning captain" },
      { what: "Head of the Association closes the season" },
      { what: "Official photograph" },
    ],
  },
];

export const PARTNERS = [
  ["Title", "Event name and the opening board."],
  ["Presenting", "Named with the title on every board."],
  ["Official partners", "Ball, drink, bank, auto and wear."],
  ["Awards", "A match award or a series cup."],
  ["Grounds", "Logo at a ground."],
  ["Associate", "Smaller firms and practices."],
];

export const TERMS = [
  "Sponsorship is not refunded if play is cancelled by natural calamity or a national or state emergency.",
  "If the organisers cancel for any other unavoidable reason, the amount is refunded.",
  "Once paid and confirmed, the amount is not refunded if the sponsor withdraws.",
  "Brand placements and activities are set by the organisers.",
];

export const DOWNLOADS = [
  { href: "/downloads/vtt-2026-fixtures.pdf", label: "Fixtures", line: "The days, the grounds and the 16 teams.", kind: "PDF" },
  { href: "/vtt-2026.ics", label: "Calendar", line: "Match days for your calendar app.", kind: "ICS" },
  { href: "/downloads/vtt-2026-sponsorship.pdf", label: "Sponsorship", line: "Tiers, rights, terms and payment.", kind: "PDF" },
  { href: "/downloads/baca-logo-pack.zip", label: "BACA logo pack", line: "The BACA seal in several colourways, with lockups for light and dark.", kind: "ZIP" },
];
