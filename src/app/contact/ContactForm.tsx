"use client";

import * as React from "react";

const ROLES = ["Player", "Manager", "Umpire", "Sponsor", "Media", "Other"];
const field =
  "mt-2 block min-h-12 w-full rounded-xl border border-navy/55 bg-white px-4 text-base text-navy outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-royal/40";

export function ContactForm() {
  const [state, setState] = React.useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = React.useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    if (res?.ok) return setState("sent");
    setState("idle");
    setError((await res?.json().catch(() => null))?.error ?? "Could not send. Check your connection.");
  }

  if (state === "sent") {
    return <p role="status" className="display text-4xl md:text-5xl">Sent.</p>;
  }

  return (
    <form onSubmit={submit} className="grid max-w-3xl gap-5 sm:grid-cols-2">
      <label className="font-medium">
        Name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="font-medium">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="font-medium">
        Team / organisation
        <input name="org" autoComplete="organization" className={field} />
      </label>
      <label className="font-medium">
        Role
        <select name="role" required defaultValue="" className={field}>
          <option value="" disabled>Choose</option>
          {ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
      </label>
      <label className="font-medium sm:col-span-2">
        City
        <input name="city" autoComplete="address-level2" className={field} />
      </label>
      <label className="font-medium sm:col-span-2">
        Message
        <textarea name="message" required rows={5} className={`${field} py-3`} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="min-h-12 rounded-full bg-navy px-8 font-semibold text-white press hover:bg-navy-deep disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send"}
        </button>
        {error && <p role="alert" className="font-medium text-red">{error}</p>}
      </div>
    </form>
  );
}
