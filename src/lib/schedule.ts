// Fixtures from the organisers' PDF "Fixtures" dated 18-10-2026 (38th All India Advocates' Cricket Tournament, 2026. At Mumbai).
// It replaces the 06-10-2026 "Grounds & Dates" sheet: match-ups, groups and grounds per match. Still no start times.
// The PDF reuses match numbers 25-28 for the semi-final and final days, so knockouts are identified by stage (SF-1, F-2), not number.
export type Ground = { id: string; name: string; area: string };

export const GROUNDS: Record<string, Ground> = {
  barc: { id: "barc", name: "BARC", area: "Trombay" },
  chereshwar: { id: "chereshwar", name: "Chereshwar", area: "Trombay" },
  "dv-mahul": { id: "dv-mahul", name: "Dilip Vengsarkar", area: "Mahul" },
  "dv-oval": { id: "dv-oval", name: "Dilip Vengsarkar", area: "Oval" }, // a different ground from the Mahul one, same name in the sheet
  "dadoji-kondev": { id: "dadoji-kondev", name: "Dadoji Kondev Stadium", area: "Thane" },
  "sb-bangar": { id: "sb-bangar", name: "S.B. Bangar", area: "Panvel" },
  "ashai-glass": { id: "ashai-glass", name: "Ashai Glass", area: "Taloja" },
  spj: { id: "spj", name: "SPJ", area: "Lonavala" },
  "shivaji-nagar": { id: "shivaji-nagar", name: "Shivaji Nagar Cricket Academy", area: "Ulwe" },
  "air-india": { id: "air-india", name: "Air India Ground", area: "Kalina, Santacruz" }, // the PDF prints "Ari India", a typo
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

export type Match = {
  /** Match number from the PDF; knockouts after the quarter-finals carry none (see top of file). */
  no?: number;
  date: string;
  /** "Group A" or "QF-1", "SF-3", "F-2" as printed. */
  stage: string;
  /** Team slug from TEAMS, or a placeholder such as "Group A Topper". */
  a: string;
  b: string;
  ground: string;
};

const g = (no: number, date: string, group: string, a: string, b: string, ground: string): Match => ({ no, date, stage: `Group ${group}`, a, b, ground });
const k = (no: number | undefined, date: string, stage: string, a: string, b: string, ground: string): Match => ({ no, date, stage, a, b, ground });

export const MATCHES: Match[] = [
  g(1, "2026-10-18", "B", "chhattisgarh", "andhra-pradesh", "barc"),
  g(2, "2026-10-18", "B", "punjab-haryana", "delhi", "chereshwar"),
  g(3, "2026-10-18", "D", "allahabad", "gujarat", "dv-mahul"),
  g(4, "2026-10-18", "C", "supreme-court", "lucknow", "dadoji-kondev"),
  g(5, "2026-10-18", "A", "indore", "calcutta", "dv-oval"),
  g(6, "2026-10-18", "D", "karnataka", "gwalior", "sb-bangar"),
  g(7, "2026-10-18", "C", "aurangabad", "orissa", "ashai-glass"),
  g(8, "2026-10-18", "A", "bombay", "telangana", "spj"),
  g(9, "2026-10-19", "A", "bombay", "indore", "barc"),
  g(10, "2026-10-19", "A", "calcutta", "telangana", "chereshwar"),
  g(11, "2026-10-19", "D", "karnataka", "gujarat", "dv-mahul"),
  g(12, "2026-10-19", "B", "chhattisgarh", "delhi", "dadoji-kondev"),
  g(13, "2026-10-19", "C", "lucknow", "aurangabad", "shivaji-nagar"),
  g(14, "2026-10-19", "D", "allahabad", "gwalior", "sb-bangar"),
  g(15, "2026-10-19", "C", "supreme-court", "orissa", "ashai-glass"),
  g(16, "2026-10-19", "B", "punjab-haryana", "andhra-pradesh", "air-india"),
  g(17, "2026-10-20", "C", "supreme-court", "aurangabad", "barc"),
  g(18, "2026-10-20", "D", "gwalior", "gujarat", "chereshwar"),
  g(19, "2026-10-20", "B", "delhi", "andhra-pradesh", "dv-mahul"),
  g(20, "2026-10-20", "A", "bombay", "calcutta", "dadoji-kondev"),
  g(21, "2026-10-20", "B", "chhattisgarh", "punjab-haryana", "shivaji-nagar"),
  g(22, "2026-10-20", "A", "indore", "telangana", "sb-bangar"),
  g(23, "2026-10-20", "C", "lucknow", "orissa", "ashai-glass"),
  g(24, "2026-10-20", "D", "allahabad", "karnataka", "air-india"),
  k(25, "2026-10-22", "QF-1", "Group A Topper", "Group D Second", "barc"),
  k(26, "2026-10-22", "QF-2", "Group B Topper", "Group C Second", "chereshwar"),
  k(27, "2026-10-22", "QF-3", "Group A Second", "Group D Topper", "dv-mahul"),
  k(28, "2026-10-22", "QF-4", "Group B Second", "Group C Topper", "dadoji-kondev"),
  k(undefined, "2026-10-23", "SF-1", "Winner of QF-1", "Winner of QF-4", "barc"),
  k(undefined, "2026-10-23", "SF-2", "Winner of QF-2", "Winner of QF-3", "chereshwar"),
  k(undefined, "2026-10-23", "SF-3", "Loser of QF-1", "Loser of QF-4", "dv-mahul"),
  k(undefined, "2026-10-23", "SF-4", "Loser of QF-2", "Loser of QF-3", "dadoji-kondev"),
  k(undefined, "2026-10-24", "F-1", "Winner of SF-3", "Winner of SF-4", "cci"),
  k(undefined, "2026-10-24", "F-2", "Winner of SF-1", "Winner of SF-2", "wankhede"),
];

/** Groups as drawn, read off the group matches. */
export const GROUPS: Record<string, string[]> = MATCHES.reduce<Record<string, string[]>>((acc, m) => {
  if (!m.stage.startsWith("Group ")) return acc;
  const list = (acc[m.stage.slice(6)] ??= []);
  for (const t of [m.a, m.b]) if (!list.includes(t)) list.push(t);
  return acc;
}, {});

const groundsOn = (date: string) => [...new Set(MATCHES.filter((m) => m.date === date).map((m) => m.ground))];

export const SCHEDULE: MatchDay[] = [
  { date: "2026-10-17", short: "17 Oct", weekday: "Saturday", title: "Opening", grounds: [], note: "Venue and time to be announced." },
  { date: "2026-10-18", short: "18 Oct", weekday: "Sunday", title: "League, round 1", grounds: groundsOn("2026-10-18") },
  { date: "2026-10-19", short: "19 Oct", weekday: "Monday", title: "League, round 2", grounds: groundsOn("2026-10-19") },
  { date: "2026-10-20", short: "20 Oct", weekday: "Tuesday", title: "League, round 3", grounds: groundsOn("2026-10-20") },
  { date: "2026-10-21", short: "21 Oct", weekday: "Wednesday", title: "Reserve day", grounds: [], note: "No matches are listed. Held back in case the weather takes a day." },
  { date: "2026-10-22", short: "22 Oct", weekday: "Thursday", title: "Quarter-finals", grounds: groundsOn("2026-10-22") },
  { date: "2026-10-23", short: "23 Oct", weekday: "Friday", title: "Semi-finals", grounds: groundsOn("2026-10-23") },
  { date: "2026-10-24", short: "24 Oct", weekday: "Saturday", title: "Finals", grounds: groundsOn("2026-10-24"), finals: ["cci", "wankhede"] },
];

/** Every ground with the days it hosts, for a by-ground view. Derived, never edited by hand. */
export const GROUND_DAYS: { ground: Ground; days: MatchDay[] }[] = Object.values(GROUNDS).map((ground) => ({
  ground,
  days: SCHEDULE.filter((d) => d.grounds.includes(ground.id)),
})).filter((x) => x.days.length);

export const TOURNAMENT = { start: "2026-10-17", end: "2026-10-24", startShort: "17 Oct", endShort: "24 Oct", span: "17 to 24 October 2026" } as const;
