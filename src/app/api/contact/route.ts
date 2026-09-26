const ROLES = ["Player", "Manager", "Umpire", "Sponsor", "Media", "Other"];
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || body.website) return Response.json({ ok: true }); // honeypot

  const msg = {
    name: clean(body.name, 120),
    org: clean(body.org, 160),
    role: ROLES.includes(body.role) ? body.role : "",
    city: clean(body.city, 80),
    email: clean(body.email, 160),
    message: clean(body.message, 4000),
  };
  if (!msg.name || !msg.role || !msg.message || !/^\S+@\S+\.\S+$/.test(msg.email)) {
    return Response.json({ error: "Fill in name, email, role and message." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!key || !to || !from) {
    return Response.json(
      { error: "Form not connected yet. Email advrajivpatil@gmail.com." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(","),
      reply_to: msg.email,
      subject: `VTT 2026 · ${msg.role} · ${msg.name}`,
      text: `Name: ${msg.name}\nEmail: ${msg.email}\nTeam / organisation: ${msg.org}\nRole: ${msg.role}\nCity: ${msg.city}\n\n${msg.message}`,
    }),
  });
  if (!res.ok) return Response.json({ error: "Could not send. Try again or email the organisers." }, { status: 502 });
  return Response.json({ ok: true });
}
