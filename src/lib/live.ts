import { TEAMS } from "./teams";
import { MATCHES } from "./schedule";

// Live scores from the match centre feed (match.baca-cricket.com/api/live, CricHeroes underneath).
export const FEED = "https://match.baca-cricket.com/api/live";

// Desk team id -> site slug. The desk numbers the 16 teams team-01..16 in the same alphabetical order as TEAMS.
export const DESK: Record<string, string> = {
  "team-01": "allahabad", "team-02": "andhra-pradesh", "team-03": "aurangabad", "team-04": "bombay",
  "team-05": "calcutta", "team-06": "chhattisgarh", "team-07": "delhi", "team-08": "gujarat",
  "team-09": "gwalior", "team-10": "indore", "team-11": "karnataka", "team-12": "lucknow",
  "team-13": "orissa", "team-14": "punjab-haryana", "team-15": "supreme-court", "team-16": "telangana",
};

export type Side = { teamId: string | null; name: string; score: string; overs: string };
export type Status = "live" | "upcoming" | "past";
export type LiveMatch = { id: number; status: Status; start: string; ground: string; a: Side; b: Side; summary: string; winnerId?: string | null; winBy?: string };
export type Feed = { matches: LiveMatch[]; fetchedAt: string | null };

export const teamOf = (s: Side) => TEAMS.find((t) => t.slug === DESK[s.teamId ?? ""]);
export const nameOf = (s: Side) => teamOf(s)?.name ?? s.name;
export const istDay = (d: Date | string) => new Date(d).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
export const dayOffset = (n: number) => istDay(new Date(Date.now() + n * 864e5));

/** "Day 1" for 18-10-2026: position among the dates that have fixtures. */
export const dayNumber = (date: string) => [...new Set(MATCHES.map((m) => m.date))].sort().indexOf(date) + 1;

/** "Bombay 67/1 beat Telangana 65/10". Falls back to CricHeroes' own line when the winner is unknown. */
export function resultLine(m: LiveMatch) {
  const [w, l] = m.winnerId === m.b.teamId ? [m.b, m.a] : [m.a, m.b];
  return m.winnerId ? `${nameOf(w)} ${w.score} beat ${nameOf(l)} ${l.score}` : `${nameOf(m.a)} v ${nameOf(m.b)}: ${m.summary}`;
}
