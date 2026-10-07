import { useId } from "react";

// The red cricket ball from the brand kit (public/brand/t26/ball.svg), inline so it can roll, spin and be sized with className.
// This is the only ball on the site: Motion.tsx re-exports it. Use one per screen as the hot spot, plus the news strip.
export function Ball({ className = "" }: { className?: string }) {
  const clip = useId();
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      <clipPath id={clip}>
        <circle cx="100" cy="100" r="100" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <circle cx="100" cy="100" r="100" fill="#E21B2D" />
        <path d="M-20 -20H220V220H-20ZM188 84a100 100 0 1 0 -200 0a100 100 0 1 0 200 0Z" fill="#0B2A6B" opacity=".22" fillRule="evenodd" />
        <g stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeDasharray="7 8">
          <path d="M29 30C83 50 149 98 167 166" />
          <path d="M47 30C101 50 167 98 185 166" />
        </g>
        <ellipse cx="54" cy="50" rx="20" ry="11" transform="rotate(-38 54 50)" fill="#fff" opacity=".3" />
      </g>
    </svg>
  );
}
