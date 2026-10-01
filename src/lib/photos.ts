import { SHOTS } from "./gallery";

// Every photograph the site places on purpose, and why it sits where it does. Pages import from here
// and never name a file, so a photo can only appear in a place this file gives it a reason for.
// Alt text says only what is visible: nobody has named the people, grounds or years yet.
// The files are BACA's own (public/gallery/N.jpg at 1400px, N-s.jpg at 640px); the full set lives in gallery.ts.
export type Photo = { id: number; src: string; small: string; alt: string; w: number; h: number };

const dims = new Map(SHOTS.map((s) => [s.id, s]));

const ALT: Record<number, string> = {
  6: "Players and guests in blazers seated on chairs at the edge of a ground",
  7: "A group jogging across a green lawn",
  8: "A team in blazers and white trousers in front of flags and a marquee",
  11: "A team in sky-blue kit standing in a line on a ground",
  12: "A team in red kit posed in front of a stadium stand",
  15: "A team in light-blue kit lined up on a ground",
  20: "Five players in blue Bombay shirts seated at a table under a tent",
  21: "Officials gathered around a gold cup on a table in a hall",
  22: "Three men with a tall gold cup on the grass",
  23: "A team in blue kit kneeling behind rows of trophies under a Champions banner",
  25: "A group of men standing together in an old photograph",
  26: "A batsman playing a shot in an old photograph",
  28: "A team in pink and navy kit with trophies and officials behind",
  35: "Four players in whites sitting on a bench",
  45: "Two batsmen walking on a bare ground in an old photograph",
  46: "A batsman playing a shot with the wicketkeeper behind him",
  52: "A team in whites and blue sweaters seated in rows in an old photograph",
  53: "A team in whites outside a hotel entrance in an old photograph",
  54: "Six men standing together in an old photograph",
  55: "A team in cream kit with officials on a ground",
  56: "A team in red shirts lined up on a ground",
  57: "A team in red kit cheering in a stadium, holding a cup",
  58: "A team in red kit with trophies in a stadium",
  63: "A team in red shirts, some kneeling in front",
  65: "Officials standing around a gold cup on a table in a hall",
  67: "A team in cream kit with officials on a ground",
  70: "A team in blue and pink kit lined up on a ground",
  71: "A team in blue kit holding a gold cup among rows of trophies",
  72: "A team in red kit in front of a stadium pavilion",
  78: "A team in whites seated and standing in rows",
  79: "Advocates in black court gowns standing behind a table with a gold cup",
  80: "A large gathering around a trophy on a table in a hall",
  81: "Players standing behind a row of seated officials in a hall",
  82: "A crowded team photograph in light-blue kit",
  85: "A team in blue kit lined up on a green ground",
  86: "A team in blue kit holding trophies behind a Champions banner",
  89: "A team in blue kit with arms raised at dusk",
  106: "A team in whites posed on a ground in an old photograph",
  109: "A squad in light-blue kit standing in a wide arc on a ground",
  112: "Four players in whites sitting outside a brick pavilion",
  125: "Two players and an official holding a gold cup labelled Winner",
  129: "Players standing behind a row of seated officials in a hall",
  75: "Players and an official holding a gold cup labelled Winner",
  128: "A team in sky-blue kit lined up on a ground with a man in a white shirt among them",
  32: "Players in navy and pink shirts seated on a bench behind a gold cup with a Runners-up plate",
  74: "A team in navy shirts standing behind seated men in suits in a hall",
};

export function photo(id: number, alt = ALT[id]): Photo {
  const d = dims.get(id);
  if (!d) throw new Error(`photo ${id} is not in gallery.ts`);
  return { id, src: `/gallery/${id}.jpg`, small: `/gallery/${id}-s.jpg`, alt: alt ?? `Photograph ${id}`, w: d.w, h: d.h };
}
const many = (ids: number[]) => ids.map((id) => photo(id));

export const PH = {
  // Home hero. The tournament is teams on a ground, so the first picture is a team on a ground.
  hero: photo(85),
  // Home intro, "advocates and cricket": the one picture of lawyers in court gowns with the cup.
  court: photo(79),
  // Programme. Each day gets a picture of what happens that day.
  opening: photo(109), // squads lined up: the opening ends with team photographs
  league: photo(56), // a team on a ground: league days are teams playing
  quarter: photo(63),
  semi: photo(82),
  final: photo(86), // trophies under a Champions banner: the final decides the champion
  // No photograph is placed as "the Vijay Tulpule Trophy": nobody has confirmed which cup is it. The trophy
  // band uses the portrait of Vijay Tulpule (public/img), which is certain.
  // Closing call to come and watch: a team cheering.
  cheer: photo(89),
  // Inner-page heroes, chosen for the page's subject.
  fixtures: photo(72), // a team at a stadium: where the matches are played
  teams: photo(11), // one team lined up
  format: photo(46), // a batsman and wicketkeeper: the game itself, 50 overs a side
  gallery: photo(23), // trophies laid out: the archive is mostly teams and trophies
  about: photo(8), // blazers and flags: the Association touring and hosting
  contact: photo(20), // people at a desk: the organisers
  sponsors: photo(80), // a hall gathering around a trophy: the community behind the event
  // Ceremonies page: one photo per ceremony.
  ceremonyOpening: photo(109),
  ceremonySitting: photo(81), // a formal sitting is officials seated in a hall
  ceremonyTrophy: photo(75), // the trophy evening: players and an official holding a cup
  ceremonies: photo(65), // page hero: officials around a cup in a hall, used nowhere else
};

// Home "sixteen teams" convergence: eight different team photographs, none used elsewhere on the page.
export const CONVERGE = many([11, 12, 28, 15, 57, 70, 71, 58]);

// Home gallery zoom: fifteen landscape photographs that appear nowhere else on the home page (so no picture
// repeats down the page). The middle one (index 7, blazers and flags) opens to fill the screen.
export const ZOOM = many([46, 20, 21, 6, 72, 23, 7, 8, 80, 74, 128, 32, 81, 65, 129]);

// Home "earlier years" reel: archive prints only, so the reel is a history and nothing else.
export const ARCHIVE = many([53, 54, 25, 45, 52, 55, 67, 78, 106, 112, 35, 26]);
