// Dates and grounds from the organisers' sheet "Grounds & Dates" (WhatsApp, 06-10-2026, DOC-20261003-WA0044.xlsx). It gives a date and a ground
// per row and nothing else: no match-ups, no times, no stage names (the groups are not drawn). Only the two 24 October rows carry a label, "Final".
// So this file holds exactly that, plus 17 October (first day of the tournament on the poster) and 21 October (no rows in the sheet).
// Do not add times, stage names or match-ups here until the organisers send them.
export type Ground = { id: string; name: string; area: string };

export const GROUNDS: Record<string, Ground> = {
  khalsa: { id: "khalsa", name: "Khalsa", area: "Matunga" },
  chereshwar: { id: "chereshwar", name: "Chereshwar", area: "Trombay" }, // the 20 Oct row of the sheet omits "(Trombay)"; same ground name as 18 and 19 Oct
  "dv-mahul": { id: "dv-mahul", name: "Dilip Vengsarkar", area: "Mahul" },
  "dadoji-kondev": { id: "dadoji-kondev", name: "Dadoji Kondev", area: "Thane" },
  "central-maidan": { id: "central-maidan", name: "Central Maidan", area: "Thane" },
  "sb-bangar": { id: "sb-bangar", name: "SB Bangar", area: "Panvel" },
  "ashai-glass": { id: "ashai-glass", name: "Ashai Glass", area: "Taloja" },
  spj: { id: "spj", name: "SPJ", area: "Lonavla" },
  fatima: { id: "fatima", name: "Fatima", area: "Vidyavihar" },
  "parsee-gym": { id: "parsee-gym", name: "Parsee Gym", area: "Marine Lines" },
  "police-gym": { id: "police-gym", name: "Police Gym", area: "Marine Lines" },
  "dv-oval": { id: "dv-oval", name: "Dilip Vengsarkar", area: "Oval" }, // a different ground from the Mahul one, same name in the sheet
  cci: { id: "cci", name: "CCI, Brabourne Stadium", area: "Churchgate" },
  wankhede: { id: "wankhede", name: "Wankhede Stadium", area: "Churchgate" },
};

export const groundLabel = (g: Ground) => `${g.name} (${g.area})`;

export type MatchDay = {
  /** ISO date, Asia/Kolkata calendar day. */
  date: string;
  /** "18 Oct" */
  short: string;
  weekday: string;
  /** What the day is. Only what a source says. */
  title: string;
  /** Ground ids in the order of the sheet. Empty when no ground is listed. */
  grounds: string[];
  /** Ground ids from `grounds` that the sheet labels "Final". */
  finals?: string[];
  note?: string;
};

export const SCHEDULE: MatchDay[] = [
  { date: "2026-10-17", short: "17 Oct", weekday: "Saturday", title: "Opening", grounds: [], note: "Venue and time to be announced." },
  { date: "2026-10-18", short: "18 Oct", weekday: "Sunday", title: "Matches", grounds: ["khalsa", "chereshwar", "dv-mahul", "dadoji-kondev", "central-maidan", "sb-bangar", "ashai-glass", "spj"] },
  { date: "2026-10-19", short: "19 Oct", weekday: "Monday", title: "Matches", grounds: ["khalsa", "chereshwar", "dv-mahul", "dadoji-kondev", "central-maidan", "sb-bangar", "ashai-glass", "fatima"] },
  { date: "2026-10-20", short: "20 Oct", weekday: "Tuesday", title: "Matches", grounds: ["khalsa", "chereshwar", "dv-mahul", "dadoji-kondev", "central-maidan", "sb-bangar", "ashai-glass", "fatima"] },
  // The 25-09 working book called 21 October the reserve day; the sheet lists no ground for it, which agrees.
  { date: "2026-10-21", short: "21 Oct", weekday: "Wednesday", title: "Reserve day", grounds: [], note: "No matches are listed. Held back in case the weather takes a day." },
  { date: "2026-10-22", short: "22 Oct", weekday: "Thursday", title: "Matches", grounds: ["dv-mahul", "parsee-gym", "police-gym", "spj"] },
  { date: "2026-10-23", short: "23 Oct", weekday: "Friday", title: "Matches", grounds: ["dv-oval", "parsee-gym", "police-gym", "dv-mahul"] },
  { date: "2026-10-24", short: "24 Oct", weekday: "Saturday", title: "Finals", grounds: ["cci", "wankhede"], finals: ["cci", "wankhede"], note: "Both grounds are marked Final in the sheet. Which final is played where has not been stated." },
];

/** Every ground with the days it hosts, for a by-ground view. Derived, never edited by hand. */
export const GROUND_DAYS: { ground: Ground; days: MatchDay[] }[] = Object.values(GROUNDS).map((ground) => ({
  ground,
  days: SCHEDULE.filter((d) => d.grounds.includes(ground.id)),
}));

export const TOURNAMENT = { start: "2026-10-17", end: "2026-10-24", startShort: "17 Oct", endShort: "24 Oct", span: "17 to 24 October 2026" } as const;
