import { FIXTURES } from "@/lib/site";

export const dynamic = "force-static";

const MONTH: Record<string, string> = { Oct: "10" };
const ymd = (date: string, add = 0) => {
  const [d, m] = date.split(" ");
  return `2026${MONTH[m]}${String(Number(d) + add).padStart(2, "0")}`;
};
// RFC 5545: escape commas and semicolons, fold nothing (lines stay short enough for every client we target).
const esc = (s: string) => s.replace(/[,;\\]/g, (c) => `\\${c}`);

// All-day events: the documents fix start times but not end times, so none are invented here.
export function GET() {
  const events = FIXTURES.map((day) => {
    const lines = day.slots.map((s) => `${s.time ?? "All day"}: ${(s.matches ?? [s.note]).join(" · ")}${s.venue ? ` (${s.venue})` : ""}`);
    return [
      "BEGIN:VEVENT",
      `UID:vtt-2026-${ymd(day.date)}@vijay-tulpule-trophy.vercel.app`,
      "DTSTAMP:20260930T000000Z",
      `DTSTART;VALUE=DATE:${ymd(day.date)}`,
      `DTEND;VALUE=DATE:${ymd(day.date, 1)}`,
      `SUMMARY:${esc(`BACA 2026: ${lines.length === 1 && !day.slots[0].matches ? day.slots[0].note : `${day.slots.reduce((n, s) => n + (s.matches?.length ?? 0), 0)} matches`}`)}`,
      `DESCRIPTION:${lines.map(esc).join("\\n")}`,
      "LOCATION:Mumbai and Navi Mumbai",
      "END:VEVENT",
    ].join("\r\n");
  });
  const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//BACA//AIACT 2026//EN", "CALSCALE:GREGORIAN", "X-WR-CALNAME:38th All India Advocates’ Cricket Tournament 2026", ...events, "END:VCALENDAR", ""].join("\r\n");
  return new Response(body, {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="vtt-2026.ics"' },
  });
}
