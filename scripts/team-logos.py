"""Rebuilds public/teams/<slug>.png (512x512 RGBA) and public/brand/partners/caai.png from scripts/brand-source/teams.

Run:  uv run --with pillow --with numpy --with opencv-python-headless python3 scripts/team-logos.py [slug ...]

Why this exists (07-10-2026): the 15 team logos arrived as WhatsApp JPEGs on a mix of backgrounds (white, grey, light blue,
near-black, tan paper) and one phone screenshot. The site shows them in a round white well, so each is cut out to a transparent
PNG and fitted to one canvas. Nothing is recoloured, sharpened or redrawn; small sources are only Lanczos-upscaled.
Source resolution is the limit: Lucknow is 500px, Aurangabad 600px, Gujarat is a soft artwork. Ask for vectors.
"""
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts/brand-source"
OUT = ROOT / "public/teams"
OUT.mkdir(parents=True, exist_ok=True)
SIZE, PAD = 512, 2  # canvas, and the transparent margin kept so the antialiased edge is never clipped


def load(name):
    p = next((SRC / "teams").glob(name + "-*.jpg"), None) or SRC / name
    return cv2.imread(str(p))


def biggest(m):
    n, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8))
    return (lab == 1 + np.argmax(st[1:, 4])).astype(np.uint8) if n > 1 else m.astype(np.uint8)


def fill_holes(m):
    inv = (1 - m).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(inv)
    outside = set(lab[0].tolist() + lab[-1].tolist() + lab[:, 0].tolist() + lab[:, -1].tolist())
    return (~np.isin(lab, list(outside))).astype(np.uint8) | m


def flat(im, tol=30, pockets=0.0):
    """Foreground = everything not connected to the border colour. Works for the flat white, grey and light-blue canvases;
    the logo's own white interior stays because the ring around it is closed."""
    # 8px band, not 1px: Telangana has a grey hairline on the very edge that would otherwise be read as the canvas colour
    b = np.concatenate([im[:8].reshape(-1, 3), im[-8:].reshape(-1, 3), im[:, :8].reshape(-1, 3), im[:, -8:].reshape(-1, 3)])
    d = np.linalg.norm(im.astype(float) - np.median(b, 0), axis=2)
    n, lab, _, _ = cv2.connectedComponentsWithStats((d < tol).astype(np.uint8))
    border = set(np.unique(np.r_[lab[:8].ravel(), lab[-8:].ravel(), lab[:, :8].ravel(), lab[:, -8:].ravel()]).tolist()) - {0}
    keep = ~np.isin(lab, list(border))
    if pockets:  # Orissa: two canvas-coloured slivers are trapped between ray tips and the ring; knock out enclosed pockets that small
        sizes = np.bincount(lab.ravel())
        keep &= ~np.isin(lab, [i for i in np.flatnonzero(sizes < pockets * keep.sum()) if i])
    return biggest(keep)


def gold(im):
    """Delhi: gold badge on a near-black vignette that is brighter top-right. Plain luminance either floods into the vignette or
    drops the shaded lower petals; saturation separates them. The closed rim keeps the cream and navy centre in."""
    h = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
    m = (((h[..., 1] > 120) & (h[..., 2] > 45)) | (h[..., 2] > 150)).astype(np.uint8)
    return fill_holes(biggest(cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))))


def peel_dark(m, im, vmax=110, passes=14):
    """Delhi: the near-black vignette leaves a ragged dark brown fringe along the upper petal edges and brown pockets in the notches
    (07-10-2026: the ring just outside the mask has V near 23, and 43 to 46% of the upper edge pixels were darker than the interior).
    Peels dark boundary pixels one per pass, as peel() does for the pale ramp of a white canvas."""
    v = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)[..., 2]
    k = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
    for _ in range(passes):
        m = m & ~((m & (cv2.erode(m, k) == 0)).astype(bool) & (v < vmax)).astype(np.uint8)
    return fill_holes(biggest(m))


def parts(m, min_px=600):
    """Every component of at least min_px: a sunburst's teeth fall apart into separate pieces once their shaded flanks drop out."""
    n, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8))
    return np.isin(lab, [i for i in range(1, n) if st[i, 4] >= min_px]).astype(np.uint8)


def gold_badge(im, hlo=12, smin=100, vmin=110, pale=False, flank=None, close=3):
    """Gwalior and Indore: a gold sunburst rim round a navy field, on a backdrop that is not flat (navy gradient, beige paper with a
    cast shadow). Keying on gold keeps the teeth and leaves the backdrop out, including the canvas pockets between teeth that a
    flood fill from the border cannot reach (07-10-2026: Gwalior showed navy pockets, Indore a grey shadow haze). Only the
    pocket-free interior is filled, and only inside the hull of the big holes (at least 10% of the largest), so letter counters and
    the dark groove between rim and field fill but tooth pockets stay open.
    pale = also take the pale gold highlights; flank = (dilate px, min V) to win back darker gold sides of teeth next to the core.
    07-10-2026 (Indore): the groove between the gold collar and the blue field is a second big hole, and the hull of the single biggest
    hole left it see-through (a pale ring on white, the logo in two pieces). The shaded flanks of the teeth are brownish gold (hue 8 to
    12, saturation 80 and up), so the flank rule starts at hue 8. Paper shadow is the same hue but pale (saturation under 120 with V
    110 and up), whereas shaded gold is deeper, so that pale-brown band stays out or tan crusts cling to the upper-left teeth."""
    h, s, v = [c.astype(int) for c in cv2.split(cv2.cvtColor(im, cv2.COLOR_BGR2HSV))]
    ell = lambda r: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1,) * 2)
    g = (h >= hlo) & (h <= 38) & (s >= smin) & (v >= vmin)
    if pale:
        g |= (h >= 22) & (h <= 34) & (s >= 70) & (v >= 190)
    g = parts(cv2.morphologyEx(g.astype(np.uint8), cv2.MORPH_CLOSE, ell(close)))
    if flank:
        near = cv2.dilate(g, ell(flank[0])) > 0
        g = parts(cv2.morphologyEx(g | (near & (h >= 8) & (h <= 40) & (s >= 80) & (v >= flank[1]) & ~((s < 120) & (v >= 110))).astype(np.uint8), cv2.MORPH_CLOSE, ell(2)))
    holes = fill_holes(g) & (1 - g)
    n, lab, st, _ = cv2.connectedComponentsWithStats(holes)
    keep = [i + 1 for i, a in enumerate(st[1:, 4]) if a >= 0.1 * st[1:, 4].max()]
    rim = np.argwhere(np.isin(lab, keep))[:, ::-1].astype(np.int32)
    hull = np.zeros_like(g)
    cv2.fillConvexPoly(hull, cv2.convexHull(rim), 1)
    return g | (holes & hull)


def peel(m, im, passes=3, pale=None):
    """Andhra Pradesh: drops the pale antialiased ramp of the white canvas from the edge of a mask, one boundary pixel per pass.
    A fitted circle (disc) clipped the rope that sticks out of the rim; the real silhouette keeps it. pale = own test for what to drop."""
    pale = im.min(2) > 185 if pale is None else pale
    k = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
    for _ in range(passes):
        m = m & ~((m & (cv2.erode(m, k) == 0)).astype(bool) & pale).astype(np.uint8)
    return m


def red(im):
    """Calcutta: the outer ring is the only big red shape; its outline gives the circle."""
    b, g, r = [im[..., i].astype(int) for i in range(3)]
    return fill_holes(biggest(cv2.morphologyEx(((r > 120) & (g < 110) & (b < 110)).astype(np.uint8), cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))))


def disc(m, inset):
    """Replace a rough mask by the least-squares circle through its outline, pulled in a little so no halo survives."""
    c = max(cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[0], key=cv2.contourArea)[:, 0, :].astype(float)
    a = np.c_[2 * c, np.ones(len(c))]
    cx, cy, k = np.linalg.lstsq(a, (c ** 2).sum(1), rcond=None)[0]
    r = np.sqrt(k + cx ** 2 + cy ** 2) - inset
    out = np.zeros(m.shape, np.uint8)
    cv2.circle(out, (round(cx), round(cy)), round(r), 1, -1)
    return out


def finish(im, m, tile=None, erode=2, size=SIZE, pad=PAD):
    """Crop to the mask, pull the edge in by `erode` source px, fit to the canvas with Lanczos and a clean antialiased alpha.
    tile = corner radius as a fraction of the side, for artwork that is a square tile rather than a disc."""
    m = (cv2.GaussianBlur(m.astype(np.float32), (0, 0), 1.5) > 0.5).astype(np.uint8)  # smooths JPEG staircase on the outline
    m = cv2.erode(m, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * erode + 1,) * 2)) if erode else m
    ys, xs = np.nonzero(m)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    im, m = im[y0:y1, x0:x1], m[y0:y1, x0:x1]
    # Paint the background pixels with the nearest logo colour first, so resizing cannot drag white or black into the rim.
    _, lab = cv2.distanceTransformWithLabels(1 - m, cv2.DIST_L2, 5, labelType=cv2.DIST_LABEL_PIXEL)
    zero = np.flatnonzero(m == 1)
    ids = np.zeros(lab.max() + 1, np.int64)
    ids[lab.ravel()[zero]] = zero
    im = im.reshape(-1, 3)[ids[lab.ravel()]].reshape(im.shape)
    s = (size - 2 * pad) / max(m.shape)
    w, h = round(m.shape[1] * s), round(m.shape[0] * s)
    rgb = Image.fromarray(cv2.cvtColor(im, cv2.COLOR_BGR2RGB)).resize((w, h), Image.LANCZOS)
    a = cv2.GaussianBlur(m.astype(np.float32), (0, 0), 0.5 / s)
    a = cv2.resize(a, (w, h), interpolation=cv2.INTER_AREA if s < 1 else cv2.INTER_CUBIC)
    if tile:  # rounded square, drawn 4x and averaged down for a smooth corner
        k = 4
        rr = np.zeros((h * k, w * k), np.uint8)
        rad = int(tile * min(w, h) * k)
        cv2.rectangle(rr, (rad, 0), (w * k - 1 - rad, h * k - 1), 255, -1)
        cv2.rectangle(rr, (0, rad), (w * k - 1, h * k - 1 - rad), 255, -1)
        for cx, cy in [(rad, rad), (w * k - 1 - rad, rad), (rad, h * k - 1 - rad), (w * k - 1 - rad, h * k - 1 - rad)]:
            cv2.circle(rr, (cx, cy), rad, 255, -1)
        a = np.minimum(a, cv2.resize(rr, (w, h), interpolation=cv2.INTER_AREA) / 255.0)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(Image.merge("RGBA", (*rgb.split(), Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)))), ((size - w) // 2, (size - h) // 2))
    return out


def save(img, path):
    img.save(path, optimize=True)
    if path.stat().st_size > 180_000:  # keeps the 16 logos light; 256 colours is invisible on 3D gold artwork at this size
        img.quantize(256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(path, optimize=True)
    print(path.relative_to(ROOT), img.size, path.stat().st_size // 1024, "KB")


def calcutta():
    """A phone screenshot: black bars and status text around a white band holding the round group icon. The icon's red ring is
    clipped by the black bar under the band, so the contour fit (bar excluded) gives the centre. A disc fitted to the clipped outline
    sat off-centre and left a black sliver on the bottom rim (07-10-2026). The same day the mask stopped just inside the ring and
    the logo read as lettering on a pale disc: the ring (radius 340 to 354) is the emblem's own rim and stays. Two arcs of it are
    missing from the screenshot (about 26 degrees under the bar, and the outer 6px at the far left past the image edge), so the crop
    is padded with the band white, the bar is painted over with the same white, and the two arcs are redrawn in the ring's own median
    colour, which is the ring continuing along its own circle and not new artwork."""
    P = 24
    im = load("00003025")[500:1220]
    bar = int(np.argmax(im.mean((1, 2)) < 40))
    ring = red(im)
    c = max(cv2.findContours(ring, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[0], key=cv2.contourArea)[:, 0, :].astype(float)
    c = c[(c[:, 1] < bar - 15) & (c[:, 0] > 20)]
    cx, cy, _ = np.linalg.lstsq(np.c_[2 * c, np.ones(len(c))], (c ** 2).sum(1), rcond=None)[0]
    yy, xx = np.mgrid[:im.shape[0], :im.shape[1]]
    rr = np.hypot(xx - cx, yy - cy)
    col = tuple(int(v) for v in np.median(im[(rr > 342) & (rr < 352) & (ring > 0) & (yy < bar - 30)], 0))
    im = cv2.copyMakeBorder(im, P, P, P, P, cv2.BORDER_CONSTANT, value=(250, 250, 250))
    im[bar + P:] = (247, 248, 244)
    k = 16  # sub-pixel ellipse so the redrawn arcs are antialiased like the rest of the ring
    for a0, a1 in [(70, 110), (150, 215)]:
        cv2.ellipse(im, (round((cx + P) * k), round((cy + P) * k)), (347 * k, 347 * k), 0, a0, a1, col, 14, cv2.LINE_AA, 4)
    # the source rim is pale-fringed on its outer 1.5px from 150 to 360 degrees; a full-circle stroke puts the mask edge on solid ring colour
    cv2.ellipse(im, (round((cx + P) * k), round((cy + P) * k)), (352 * k, 352 * k), 0, 0, 360, col, 10, cv2.LINE_AA, 4)
    m = np.zeros(im.shape[:2], np.uint8)
    cv2.circle(m, (round(cx + P), round(cy + P)), 356, 1, -1)
    return m, im


def karnataka():
    """The emblem (state arms, KACA, HIGH COURT OF KARNATAKA) sits on a black rounded tile on a white canvas. The tile is not part
    of the emblem (owner, 07-10-2026), and a circle fitted round the content only turned it into a black disc, so the mask keys the
    backdrop out and keeps the emblem's own pixels (the arms have no ring of their own). The arms were cut out with a 3 to 4px white
    keyline that survives as a halo round every figure and fills the pockets (tail loops, between the legs), and its blend with the
    black is grey, so the backdrop is everything unsaturated or black that connects to the tile's black; the emblem's own white
    (the bird on the shield, the muzzles) is enclosed by saturated colour and stays. Black pockets enclosed by the artwork (beside
    the shield, under the leaves) are backdrop too; the arms' own black linework is under 4px thick, the pockets are not."""
    im = load("00003019")
    g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    tile = fill_holes(biggest((g < 40).astype(np.uint8)))
    ys, xs = np.nonzero(tile)
    inner = np.zeros_like(tile)
    inner[ys.min() + 3:ys.max() - 2, xs.min() + 3:xs.max() - 2] = 1  # keeps the tile's antialiased edge out
    hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
    low = ((hsv[..., 1] < 70) | (hsv[..., 2] < 45)).astype(np.uint8)
    _, lab = cv2.connectedComponents(low)
    black = (hsv[..., 2] < 45).astype(np.uint8)
    pocket = cv2.dilate(cv2.erode(black, np.ones((5, 5), np.uint8)), np.ones((7, 7), np.uint8)) & black
    pocket = cv2.dilate(pocket, np.ones((11, 11), np.uint8)) & low  # and the keyline round it
    bg = lab[ys.min() + 6, xs.min() + 6]
    # white keyline pockets enclosed by the arms (under each lion's hind leg, between the legs) hold black slivers and showed as white
    # blobs on navy and sky (review 07-10-2026): any enclosed low-saturation component with a real share of black is backdrop
    bc = np.bincount(lab[black > 0], minlength=lab.max() + 1)
    area = np.bincount(lab.ravel(), minlength=lab.max() + 1)
    trapped = np.isin(lab, [i for i in range(1, len(bc)) if i != bg and area[i] >= 150 and bc[i] >= 0.08 * area[i]])
    m = ((lab != bg) & (inner > 0) & (pocket == 0) & ~trapped).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))))
    return np.isin(lab, [i for i in range(1, n) if st[i, 4] >= 40]).astype(np.uint8), im


def aurangabad():
    """A tan and blue gear with a pale cyan glow round it, on white, 600px. Keying by distance from the canvas colour (the old flat at
    tol 120) read the tan segments as canvas and left a chewed, jagged outline (07-10-2026). The glow and its antialiased blends with
    white and tan are all light and unsaturated (S under 75, V over 190) while tan (S 100 and up) and blue (S near 200) are not, so
    the canvas is whatever light unsaturated pixels touch the border; the enclosed cyan centre stays."""
    im = load("00003012")
    h = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
    n, lab = cv2.connectedComponents(((h[..., 1] < 75) & (h[..., 2] > 190)).astype(np.uint8))
    border = set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]]).tolist()) - {0}
    return fill_holes(biggest(~np.isin(lab, list(border)))), im


def bombay():
    """The real BACA seal (brown and cream), supplied as 1254px RGB on a plain white square. The cream rim is warmer than the canvas
    (saturation 50-70 against under 5), so the canvas is whatever white-ish pixels touch the border; the thin dark outline that
    closes the seal keeps the white pocket-free inside. The seal is not a perfect circle (the whole artwork, field and rim alike,
    wobbles by up to 6px of 1226 and the cream rim stays 18px wide throughout), so the mask follows its own silhouette instead of
    a fitted circle: a circle cut inside the narrowest point would shave the rim unevenly. main() pulls the edge in 1px, not the
    usual 2: that is already past the antialiased fringe (no light pixel survives) and keeps the cream rim whole, where 2px
    bites into it."""
    im = cv2.imread(str(SRC / "teams/bombay-baca-brown.png"))
    h = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
    n, lab = cv2.connectedComponents(((h[..., 1] < 30) & (h[..., 2] > 200)).astype(np.uint8))
    border = set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]]).tolist()) - {0}
    return biggest(~np.isin(lab, list(border))), im


def caai():
    """CAAI logo (the aegis body, not a team): black ring on white, so the white inside the ring stays. The source is clipped a few
    px at the bottom and has a black hairline on the bottom edge; the circle is fitted to the ring without that stretch."""
    im = load("00003041")
    h = im.shape[0]
    dark = (cv2.cvtColor(im, cv2.COLOR_BGR2GRAY) < 90).astype(np.uint8)
    dark[:6], dark[-6:], dark[:, :6], dark[:, -6:] = 0, 0, 0, 0
    c = max(cv2.findContours(biggest(dark), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[0], key=cv2.contourArea)[:, 0, :].astype(float)
    c = c[c[:, 1] < h - 20]
    cx, cy, k = np.linalg.lstsq(np.c_[2 * c, np.ones(len(c))], (c ** 2).sum(1), rcond=None)[0]
    m = np.zeros(im.shape[:2], np.uint8)
    cv2.circle(m, (round(cx), round(cy)), round(np.sqrt(k + cx ** 2 + cy ** 2)) - 1, 1, -1)
    m[h - 4:] = 0  # the hairline
    return m, im


# slug: (source number, mask builder, optional circle inset, optional tile radius)
TEAMS = {
    "allahabad": ("00003010", lambda im: flat(im, 30)),
    "andhra-pradesh": ("00003011", lambda im: peel(flat(im, 30), im)),
    "chhattisgarh": ("00003014", lambda im: flat(im, 30)),
    "delhi": ("00003015", lambda im: peel_dark(gold(im), im)),
    "gujarat": ("00003017", lambda im: disc(flat(im, 30), 2)),
    "gwalior": ("00003016", lambda im: gold_badge(im)),
    "indore": ("00003018", lambda im: gold_badge(im, 18, 130, 115, True, (14, 45), 10)),
    "lucknow": ("00003020", lambda im: flat(im, 30)),
    "orissa": ("00003021", lambda im: flat(im, 60, 0.015)),
    "punjab-haryana": ("00003022", lambda im: disc(flat(im, 30), 3)),
    "supreme-court": ("00003023", lambda im: flat(im, 30)),
    "telangana": ("00003024", lambda im: disc(flat(im, 30), 3)),
}


def main(only):
    for slug, (num, fn) in TEAMS.items():
        if only and slug not in only:
            continue
        im = load(num)
        save(finish(im, fn(im)), OUT / f"{slug}.png")
    for slug, fn, tile in [("calcutta", calcutta, None), ("karnataka", karnataka, None), ("aurangabad", aurangabad, None)]:
        if only and slug not in only:
            continue
        m, im = fn()
        save(finish(im, m, tile, erode=1 if slug == "karnataka" else 2), OUT / f"{slug}.png")
    if not only or "bombay" in only:
        m, im = bombay()
        save(finish(im, m, erode=1), OUT / "bombay.png")
    if not only or "caai" in only:
        m, im = caai()
        save(finish(im, m, size=800, pad=3, erode=1), ROOT / "public/brand/partners/caai.png")


if __name__ == "__main__":
    main(set(sys.argv[1:]))
