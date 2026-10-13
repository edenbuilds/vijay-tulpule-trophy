// Only Instagram is confirmed (it was already in the footer). Add other accounts here once BACA sends the handles; nav and footer read this list.
export const SOCIAL = [
  { label: "Instagram", handle: "@bacacricket", href: "https://www.instagram.com/bacacricket/" },
];

function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// tone "light" sits on the white nav, "dark" on the navy footer.
export function SocialLinks({ tone = "light", showHandle = false, className = "" }: { tone?: "light" | "dark"; showHandle?: boolean; className?: string }) {
  const look = tone === "light" ? "bg-sky text-navy hover:bg-red hover:text-white" : "bg-white/10 text-white hover:bg-red";
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {SOCIAL.map((s) => (
        <li key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`BACA on ${s.label} (opens in a new tab)`}
            className={`press group inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg px-3 font-semibold transition-colors ${look}`}>
            <InstagramGlyph className="size-5 transition-transform duration-200 ease-out group-hover:-rotate-12 group-hover:scale-110" />
            {showHandle && <span className="text-sm">{s.handle}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
