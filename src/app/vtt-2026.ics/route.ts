import { GROUNDS, MATCHES, SCHEDULE, groundLabel } from "@/lib/schedule";
import { TEAMS } from "@/lib/teams";

const name = (id: string) => TEAMS.find((t) => t.slug === id)?.name ?? id;

export const dynamic = "force-static";

const ymd = (iso: string, add = 0) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + add);
  return d.toISOString().slice(0, 10).replaceAll("-", "");
};
// RFC 5545: escape commas, semicolons and backslashes in text values. Lines are not folded (every client we target reads long lines).
const esc = (s: string) => s.replace(/[,;\\]/g, (c) => `\\${c}`);

// All-day events built from SCHEDULE. The sheet gives dates and grounds only, so no time is written anywhere.
// The UIDs match the earlier file (vtt-2026-<date>), and SEQUENCE:1 with a newer DTSTAMP lets a calendar that imported the
// old version replace it instead of keeping a second event.
export function GET() {
  const events = SCHEDULE.map((day) => {
    const lines = MATCHES.filter((m) => m.date === day.date).map((m) => `${m.stage}: ${name(m.a)} vs ${name(m.b)}, ${groundLabel(GROUNDS[m.ground])}`);
    if (day.date === "2026-10-17") lines.push("Venue and time to be announced.");
    if (day.date === "2026-10-21") lines.push("No matches.");
    const summary = day.date === "2026-10-17" ? `BACA Cricket Tournament, ${day.short}` : day.title;
    return [
      "BEGIN:VEVENT",
      `UID:vtt-2026-${ymd(day.date)}@vijay-tulpule-trophy.vercel.app`,
      "DTSTAMP:20261018T000000Z",
      "SEQUENCE:2",
      `DTSTART;VALUE=DATE:${ymd(day.date)}`,
      `DTEND;VALUE=DATE:${ymd(day.date, 1)}`,
      `SUMMARY:${esc(summary)}`,
      `DESCRIPTION:${lines.map(esc).join("\\n")}`,
      "END:VEVENT",
    ].join("\r\n");
  });
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BACA//AIACT 2026//EN",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:38th All India Advocates’ Cricket Tournament 2026",
    "X-WR-TIMEZONE:Asia/Kolkata",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  return new Response(body, {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="vtt-2026.ics"' },
  });
}
