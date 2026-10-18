/* eslint-disable @next/next/no-img-element -- satori renders plain <img>, next/image does not apply here */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { FEED, dayNumber, istDay, matchNo, nameOf, DESK, type Feed, type LiveMatch } from "@/lib/live";

// The day's results as a 1080x1350 Instagram post, built from the live feed, so each day's post exists as soon as
// its matches finish: /social/results/2026-10-18. Layout follows the owner's Day 1 reference (19-10-2026);
// the skyline is cropped from that reference. Overs are the real ones from CricHeroes, never assumed.
export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // cached at the edge by the response header instead

const A = path.join(process.cwd(), "src/app/social/assets");
const file = (f: string) => readFile(path.join(A, f));
const dataUrl = async (f: string) => `data:image/png;base64,${(await file(f)).toString("base64")}`;
const NAVY = "#0B2A6B", RED = "#D7192B", INK = "#071B45";

export async function GET(_: Request, { params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return new Response("Use /social/results/YYYY-MM-DD", { status: 400 });
  const feed: Feed = await fetch(FEED, { next: { revalidate: 300 } }).then((r) => r.json()).catch(() => ({ matches: [], fetchedAt: null }));
  const done = feed.matches.filter((m) => m.status === "past" && istDay(m.start) === date).sort((x, y) => (matchNo(x) ?? 99) - (matchNo(y) ?? 99) || x.start.localeCompare(y.start)).slice(0, 8);
  const [bebas, b6, b7, logo, sky] = await Promise.all([file("bebas.ttf"), file("barlow-600.ttf"), file("barlow-700.ttf"), dataUrl("logo.png"), dataUrl("skyline.png")]);
  const logos = Object.fromEntries(await Promise.all(Object.entries(DESK).map(async ([id, slug]) => [id, await dataUrl(`teams/${slug}.png`)])));
  const long = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date)).toUpperCase();
  const day = dayNumber(date);
  const overs = (s: string) => s.replace(/ ov$/, "");

  const side = (m: LiveMatch, s: LiveMatch["a"]) => {
    const lost = m.winnerId && s.teamId !== m.winnerId;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: lost ? 0.55 : 1 }}>
        {s.teamId && <img alt="" src={logos[s.teamId]} width={44} height={44} style={{ borderRadius: 22, background: "#fff", border: "2px solid #e3e8f1" }} />}
        <div style={{ display: "flex", flex: 1, fontFamily: "Bebas", fontSize: 32, color: lost ? "#5b6b8c" : INK, letterSpacing: 0.5 }}>{nameOf(s).toUpperCase()}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <div style={{ fontFamily: "Bebas", fontSize: 38, lineHeight: 1, color: lost ? "#5b6b8c" : INK }}>{s.score}</div>
          {s.overs && <div style={{ fontSize: 15, color: "#7a88a6" }}>{`(${overs(s.overs)})`}</div>}
        </div>
      </div>
    );
  };
  const line = (m: LiveMatch) => {
    const w = m.winnerId === m.b.teamId ? m.b : m.a;
    const no = matchNo(m);
    return `${no ? `MATCH ${no} · ` : ""}${(m.winnerId && m.winBy ? `${nameOf(w)} won by ${m.winBy}` : m.summary).toUpperCase()}`;
  };

  return new ImageResponse(
    (
      <div style={{ width: 1080, height: 1350, display: "flex", flexDirection: "column", alignItems: "center", background: "#f3f5f9", fontFamily: "Barlow", position: "relative", overflow: "hidden" }}>
        {/* Diagonal brand stripes, left and right. */}
        <div style={{ position: "absolute", left: -140, top: -60, width: 220, height: 900, background: NAVY, transform: "rotate(24deg)" }} />
        <div style={{ position: "absolute", left: 70, top: 110, width: 22, height: 220, background: RED, transform: "rotate(24deg)" }} />
        <div style={{ position: "absolute", right: -160, top: 260, width: 200, height: 900, background: "#dfe6f2", transform: "rotate(24deg)" }} />
        <div style={{ position: "absolute", right: 34, top: 330, width: 12, height: 260, background: NAVY, transform: "rotate(24deg)" }} />
        <img alt="" src={logo} width={230} style={{ position: "absolute", right: 46, top: 40 }} />

        <div style={{ display: "flex", marginTop: 56, gap: 10 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 9, height: 28, background: RED, transform: "skewX(-20deg)" }} />)}
        </div>
        <div style={{ display: "flex", fontFamily: "Bebas", fontSize: 136, lineHeight: 0.86, color: NAVY, marginTop: 12 }}>{day > 0 ? `DAY ${day}` : "MATCH DAY"}</div>
        <div style={{ display: "flex", fontFamily: "Bebas", fontSize: 136, lineHeight: 0.86, color: RED }}>RESULTS</div>
        <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 18 }}>
          <div style={{ width: 120, height: 2, background: NAVY }} />
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 9, color: INK }}>{long}</div>
          <div style={{ width: 120, height: 2, background: NAVY }} />
        </div>
        <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: 6, color: NAVY, marginTop: 10 }}>38TH ALL INDIA ADVOCATES’ CRICKET TOURNAMENT 2026</div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, width: 1000, marginTop: 22 }}>
          {done.length ? done.map((m) => (
            <div key={m.id} style={{ display: "flex", flexDirection: "column", gap: 6, width: 492, padding: "13px 22px 12px", background: "rgba(255,255,255,.94)", borderRadius: 16, border: "1px solid #e3e8f1", boxShadow: "0 6px 18px rgba(11,42,107,.08)" }}>
              {side(m, m.a)}
              {side(m, m.b)}
              <div style={{ display: "flex", borderTop: "1px solid #e3e8f1", paddingTop: 8, fontSize: 16, fontWeight: 600, letterSpacing: 2.5, color: INK }}>{line(m)}</div>
            </div>
          )) : <div style={{ display: "flex", fontSize: 30, color: NAVY, margin: "120px auto" }}>Results appear here as matches finish.</div>}
        </div>

        <img alt="" src={sky} width={1080} height={236} style={{ position: "absolute", left: 0, bottom: 0, objectFit: "cover", objectPosition: "bottom" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 50px", background: "linear-gradient(transparent, rgba(7,27,69,.92))", color: "#fff", fontSize: 24 }}>
          <div style={{ display: "flex" }}>Live scores at&nbsp;<b style={{ fontWeight: 700 }}>baca-cricket.com</b></div>
          <div style={{ display: "flex", opacity: 0.85 }}>Scores via CricHeroes</div>
        </div>
      </div>
    ),
    {
      width: 1080, height: 1350,
      fonts: [{ name: "Bebas", data: bebas, weight: 400 }, { name: "Barlow", data: b6, weight: 600 }, { name: "Barlow", data: b7, weight: 700 }],
      headers: { "content-disposition": `inline; filename="baca-results-${date}.png"`, "cache-control": "public, s-maxage=300, stale-while-revalidate=3600" },
    },
  );
}
