// The 16 teams, in the order of the organisers' sheet (CAPTAINS tab, screenshot sent 07-10-2026): 15 High Courts and the Supreme Court.
// Logos are the ones the organisers sent on 06-10-2026 (public/teams/<slug>.png, cut to a round or square tile by scripts in the redesign).
// Groups are NOT drawn yet ("Groups are not yet drawn", Aaron Pinto, 06-10-2026), so there is no group field. Captains: the screenshot
// cut the column off, so no captain is listed. Add `captain` here only from the full sheet.
export type Team = {
  slug: string;
  /** Short name used in lists and on tiles. */
  name: string;
  /** Full name of the court. */
  court: string;
  logo: string;
};

export const TEAMS: Team[] = [
  { slug: "allahabad", name: "Allahabad", court: "Allahabad High Court", logo: "/teams/allahabad.png" },
  { slug: "andhra-pradesh", name: "Andhra Pradesh", court: "Andhra Pradesh High Court", logo: "/teams/andhra-pradesh.png" },
  { slug: "aurangabad", name: "Aurangabad", court: "Aurangabad High Court", logo: "/teams/aurangabad.png" },
  // The Bombay logo is the brown and cream B.A.C.A seal the organisers sent on 07-10-2026 (Team Logos/Bombay-BACA.PNG).
  { slug: "bombay", name: "Bombay", court: "Bombay High Court", logo: "/teams/bombay.png" },
  { slug: "calcutta", name: "Calcutta", court: "Calcutta High Court", logo: "/teams/calcutta.png" },
  { slug: "chhattisgarh", name: "Chhattisgarh", court: "Chhattisgarh High Court", logo: "/teams/chhattisgarh.png" },
  { slug: "delhi", name: "Delhi", court: "Delhi High Court", logo: "/teams/delhi.png" },
  { slug: "gujarat", name: "Gujarat", court: "Gujarat High Court", logo: "/teams/gujarat.png" },
  { slug: "gwalior", name: "Gwalior", court: "Gwalior High Court", logo: "/teams/gwalior.png" },
  { slug: "indore", name: "Indore", court: "Indore High Court", logo: "/teams/indore.png" },
  { slug: "karnataka", name: "Karnataka", court: "Karnataka High Court", logo: "/teams/karnataka.png" },
  { slug: "lucknow", name: "Lucknow", court: "Lucknow High Court", logo: "/teams/lucknow.png" },
  { slug: "orissa", name: "Orissa", court: "Orissa High Court", logo: "/teams/orissa.png" },
  // The sheet says "Punjab High Court"; the team's own logo reads "Punjab & Haryana High Court", which is the court's name.
  { slug: "punjab-haryana", name: "Punjab and Haryana", court: "Punjab and Haryana High Court", logo: "/teams/punjab-haryana.png" },
  { slug: "supreme-court", name: "Supreme Court", court: "Supreme Court of India", logo: "/teams/supreme-court.png" },
  { slug: "telangana", name: "Telangana", court: "Telangana High Court", logo: "/teams/telangana.png" },
];
