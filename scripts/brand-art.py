"""Cut the tournament logo out of its white-sticker artwork.

Run from the repo root:
  uv run --with pillow --with numpy --with opencv-python-headless python3 scripts/brand-art.py

Source: scripts/brand-source/logo-with-bar.webp (1254px, white ground, logo plus navy "Hosted by" bar).
Chosen over poster.webp because the poster carries the same logo at about a third of the pixels.
Writes public/brand/t26/{logo,logo-bar,logo-reversed}.png.
"""
import numpy as np, cv2
from PIL import Image

SRC = 'scripts/brand-source/logo-with-bar.webp'
OUT = 'public/brand/t26/'
LOGO_BOTTOM = 981   # rows 972-992 are empty; the bar starts at 993
BAR_TOP = 993
BALL_STITCH_MAX_Y = 850  # stitches sit above this row; the red counters of "MUMBAI 2026" sit below it
WHITE_T = 24         # distance from white that still counts as "white ground"; ground is 254, WebP ringing reaches ~20

rgb = np.array(Image.open(SRC).convert('RGB')).astype(np.int32)
H, W = rgb.shape[:2]
dist = (255 - rgb).max(2)
white = (dist <= WHITE_T).astype(np.uint8)

# 4-connectivity: an 8-connected flood would leak through diagonal pixel gaps in the letter edges and
# connect closed counters to the outside, which would then be treated as ground by mistake.
n, lab, st, cen = cv2.connectedComponentsWithStats(white, connectivity=4)
edge_labels = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])))


def ring_class(i):
    m = (lab == i).astype(np.uint8)
    ring = (cv2.dilate(m, np.ones((7, 7), np.uint8)) - m) > 0
    ring &= white == 0
    if not ring.any():
        return 'other'
    r, g, b = rgb[ring].mean(0)
    mx = max(r, g, b)
    if b > r + 25 and mx < 128: return 'navy'
    if b > r + 40 and b > g + 20: return 'blue'
    if r > 140 and g < 110 and b < 110: return 'red'
    return 'other'


clear = np.isin(lab, list(edge_labels)) & (white > 0)  # exterior ground and the sticker outline
for i in range(1, n):
    if i in edge_labels or st[i, cv2.CC_STAT_AREA] < 3:
        continue
    cy = cen[i][1]
    if cy >= BAR_TOP:
        continue  # white lettering of the bar is artwork, not a counter
    c = ring_class(i)
    # Counters of navy and blue lettering and the helmet grille become transparent so the page shows through.
    # Red rings: keep the white stitches on the ball, clear the counters of the red "MUMBAI 2026" text.
    if c in ('navy', 'blue') or (c == 'red' and cy > BALL_STITCH_MAX_Y):
        clear |= lab == i

# Edge matte. Pixels within 3px of the cleared set are blends of artwork and white, so they carry a white
# halo on a tinted page. For each, look for a nearby artwork colour c such that p = a*c + (1-a)*white,
# keep c as the colour and a as the alpha.
near = cv2.dilate(clear.astype(np.uint8), np.ones((7, 7), np.uint8)) > 0
band = near & ~clear
alpha = np.where(clear, 0.0, 1.0)
out = rgb.astype(np.float64).copy()
ys, xs = np.nonzero(band)
p = rgb[ys, xs].astype(np.float64)
best_d = np.full(len(ys), -1.0)
best_c = p.copy()
best_a = np.ones(len(ys))
for dy in range(-3, 4):
    for dx in range(-3, 4):
        yy, xx = np.clip(ys + dy, 0, H - 1), np.clip(xs + dx, 0, W - 1)
        c = rgb[yy, xx].astype(np.float64)
        ok = ~clear[yy, xx]
        w = 255.0 - c
        den = (w * w).sum(1) + 1e-9
        a = np.clip(((255.0 - p) * w).sum(1) / den, 0, 1)
        resid = np.abs(p - (a[:, None] * c + (1 - a[:, None]) * 255.0)).max(1)
        good = ok & (resid < 10) & (w.max(1) > best_d) & (a > 0)
        best_d = np.where(good, w.max(1), best_d)
        best_c = np.where(good[:, None], c, best_c)
        best_a = np.where(good, a, best_a)
best_a = np.where(best_a < 0.08, 0.0, best_a)  # drop faint ringing instead of keeping a grey fringe
out[ys, xs] = best_c
alpha[ys, xs] = best_a

rgba = np.dstack([np.clip(out, 0, 255), alpha * 255]).astype(np.uint8)


def trim(a, pad=0.02):
    al = a[..., 3] > 8
    ys, xs = np.nonzero(al)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    p = int(round(pad * max(x1 - x0, y1 - y0)))
    y0, x0 = max(0, y0 - p), max(0, x0 - p)
    y1, x1 = min(a.shape[0], y1 + p), min(a.shape[1], x1 + p)
    return a[y0:y1, x0:x1]


def pad_to(a, pad=0.02):
    """Trim then pad back with transparent pixels so the 2% margin exists even when the art touches the crop."""
    t = trim(a, 0)
    p = int(round(pad * max(t.shape[:2])))
    return np.pad(t, ((p, p), (p, p), (0, 0)))


logo = pad_to(rgba[:LOGO_BOTTOM])
logo_bar = pad_to(rgba)
Image.fromarray(logo).save(OUT + 'logo.png', optimize=True)
Image.fromarray(logo_bar).save(OUT + 'logo-bar.png', optimize=True)

# Reversed: navy lettering and batsman to white, royal blue lightened, red ball and building untouched.
# The two blue inks differ mainly in value (navy V~60, royal V~177 of 255), so one blend factor t between
# them gives white for navy, light blue for royal and a clean in-between on the anti-aliased rim.
ROYAL_LIGHT = np.array([125, 181, 242.])  # contrast on #0B2A6B is about 6:1
hsv = cv2.cvtColor(logo[..., :3], cv2.COLOR_RGB2HSV).astype(np.float64)  # OpenCV hue is 0-179, both blues sit near 105-110
blue = (hsv[..., 0] >= 98) & (hsv[..., 0] <= 125) & (hsv[..., 1] > 110)
# Only large blue shapes (lettering, lines, batsman, strokes). Small dark detail inside the building is a different ink.
k, kl, kst, _ = cv2.connectedComponentsWithStats(cv2.dilate(blue.astype(np.uint8), np.ones((3, 3), np.uint8)), connectivity=8)
blue &= np.isin(kl, [i for i in range(1, k) if kst[i, cv2.CC_STAT_AREA] >= 300])
# The building facade has dark blue-grey windows that must stay as drawn; 38TH and the helmet start outside this box.
LH, LW = blue.shape
blue[: int(.485 * LH), int(.36 * LW): int(.72 * LW)] = False
blue[: int(.455 * LH), int(.72 * LW): int(.84 * LW)] = False  # the helmet crown starts lower on the right
t = np.clip((hsv[..., 2] - 100) / 60, 0, 1)[..., None]
target = 255.0 * (1 - t) + ROYAL_LIGHT * t
w = cv2.GaussianBlur(blue.astype(np.float64), (0, 0), 0.5)[..., None]  # soft gate so the rim does not stair-step
rev = logo.copy()
rev[..., :3] = np.clip(logo[..., :3] * (1 - w) + target * w, 0, 255).astype(np.uint8)
Image.fromarray(rev).save(OUT + 'logo-reversed.png', optimize=True)
print('logo', logo.shape[1], logo.shape[0], 'bar', logo_bar.shape[1], logo_bar.shape[0])
