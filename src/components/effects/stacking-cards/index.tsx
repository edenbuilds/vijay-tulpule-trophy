// Built using Hyperiux Vault: https://vault.hyperiux.com

import StackingCardComp from './StackingCardComp';

import { GROUPS, PHOTOS } from "@/lib/site";

// Demo data swapped for the four groups, with placeholder photos until the organisers supply their own.
const IMAGES = [PHOTOS.saturday, PHOTOS.whites, PHOTOS.casual, PHOTOS.crowd];
const data = GROUPS.map((g, i) => ({
  id: g.name,
  category: `Group ${g.name}`,
  title: g.teams.map((t) => `Team ${t}`).join(" · "),
  image: IMAGES[i].src,
  backgroundColor: i % 2 ? "bg-sage" : "bg-mint",
  description: "Team names to be announced. The top two reach the quarter-finals.",
}));

export default function StackingCards({
  imageZoomEnabled = true,
  tiltEnabled = true,
  cardCornerRadius = "1rem",
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
