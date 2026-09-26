// Built using Hyperiux Vault: https://vault.hyperiux.com

import StackingCardComp from './StackingCardComp';

import { GROUPS } from "@/lib/site";

// Demo data swapped for the four groups. No photography was supplied, so cards carry no image and
// StackingCardComp draws the group letter in its place.
const data = GROUPS.map((g, i) => ({
  id: g.name,
  category: `Group ${g.name}`,
  title: g.teams.map((t) => `Team ${t}`).join(" · "),
  backgroundColor: i % 2 ? "bg-iron" : "bg-green",
  description: "Team names TBC. Top two go through to the quarter-finals.",
}));

export default function StackingCards({
  imageZoomEnabled = true,
  tiltEnabled = true,
  cardCornerRadius = "0px",
  stackPerspective = 1200,
}) {
  return (
    <StackingCardComp
      data={data}
      imageZoomEnabled={imageZoomEnabled}
      tiltEnabled={tiltEnabled}
      cardCornerRadius={cardCornerRadius}
      stackPerspective={stackPerspective}
    />
  );
}
