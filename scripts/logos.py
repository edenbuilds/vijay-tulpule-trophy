"""Builds the partner logos and the BACA light/dark seals in public/brand from the sources in scripts/logo-source.

Run:  python3 scripts/logos.py     (needs numpy, opencv-python, Pillow)

Why this exists (03-10-2026): the four partner bodies sent logos as JPEGs on white or photo backgrounds, and BACA only
had a dark seal. Each logo is cut out to a transparent PNG so it sits on any tile, without redrawing or recolouring it.
The source resolution is the limit: AIA 512px, BILS 200px, CAAI about 230px (cropped from a screenshot), BBA 1600px.
Ask each body for a vector file and drop it into public/brand/partners when it arrives.
"""
import cv2
import numpy as np
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts/logo-source"
OUT = ROOT / "public/brand"
PARTNERS = OUT / "partners"
PARTNERS.mkdir(parents=True, exist_ok=True)


def save(rgb, alpha, path, size=None):
    im = Image.fromarray(np.dstack([rgb, alpha]).astype(np.uint8), "RGBA")
    if size:
        im = im.resize((size, int(size * im.height / im.width)), Image.LANCZOS)
    im.save(path, optimize=True)
    print(path.relative_to(ROOT), im.size)


def pad_square(rgb, alpha, margin=0.02, square=True):
    ys, xs = np.nonzero(alpha > 8)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    rgb, alpha = rgb[y0:y1, x0:x1], alpha[y0:y1, x0:x1]
    if not square:
        m = int(max(rgb.shape[:2]) * margin)
        return np.pad(rgb, ((m, m), (m, m), (0, 0))), np.pad(alpha, m)
    s = int(max(rgb.shape[:2]) * (1 + margin * 2))
    R = np.zeros((s, s, 3), np.uint8)
    A = np.zeros((s, s), np.uint8)
    oy, ox = (s - rgb.shape[0]) // 2, (s - rgb.shape[1]) // 2
    R[oy:oy + rgb.shape[0], ox:ox + rgb.shape[1]] = rgb
    A[oy:oy + rgb.shape[0], ox:ox + rgb.shape[1]] = alpha
    return R, A


def aia():
    # Colour crest on white. Colour-to-alpha against white keeps the pale gold rays; the shield and ribbon are then
    # made fully opaque so the white lettering inside the shield does not turn transparent.
    o = np.array(Image.open(SRC / "aia.jpg").convert("RGB")).astype(np.float32)
    a = np.clip((255 - o.min(axis=2)) / 255, 0, 1)
    a = np.clip((a - 0.05) / 0.95, 0, 1)
    safe = np.maximum(a, 1e-3)[..., None]
    col = np.clip((o - 255 * (1 - safe)) / safe, 0, 255)
    solid = (a > 0.5).astype(np.uint8)
    solid = cv2.morphologyEx(solid, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(solid)
    big = np.isin(lab, [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] > 3000]).astype(np.uint8)
    inv = 1 - big
    ff = inv.copy()
    cv2.floodFill(ff, np.zeros((big.shape[0] + 2, big.shape[1] + 2), np.uint8), (0, 0), 2)
    filled = ((big == 1) | (ff != 2)).astype(np.uint8)
    core = cv2.erode(filled, np.ones((3, 3), np.uint8))[..., None].astype(bool)
    rgb = np.where(core, o, col)
    alpha = np.where(core[..., 0], 1.0, a)
    R, A = pad_square(rgb.astype(np.uint8), (alpha * 255).astype(np.uint8), square=False)
    save(R, A, PARTNERS / "aia.png", 1280)


def disc(img, lo_mask):
    """Largest blob of the mask, holes filled, edge pulled in 3px and feathered; returns an 8-bit alpha."""
    m = lo_mask.astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((9, 9), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    k = 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA]))
    m = (lab == k).astype(np.uint8)
    ff = (1 - m).astype(np.uint8)
    cv2.floodFill(ff, np.zeros((m.shape[0] + 2, m.shape[1] + 2), np.uint8), (0, 0), 2)
    m = ((m == 1) | (ff != 2)).astype(np.uint8)
    m = cv2.erode(m, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))
    return (cv2.GaussianBlur(m.astype(np.float32), (0, 0), 1.6) * 255).astype(np.uint8)


def bba():
    # Wooden disc photographed on a blue field: keep what is not blue.
    o = np.array(Image.open(SRC / "bba.jpg").convert("RGB")).astype(int)
    not_blue = o[..., 0] > o[..., 2] - 6
    A = disc(o, not_blue)
    R, A = pad_square(o.astype(np.uint8), A)
    save(R, A, PARTNERS / "bba.png", 1024)


def bils():
    # Single blue ink on white at 200px: scale up 8x, then re-threshold so the edges are crisp, not soft.
    o = Image.open(SRC / "bils.jpg").convert("RGB")
    big = np.array(o.resize((1600, 1600), Image.BICUBIC)).astype(np.float32)
    d = 1 - big[..., 0] / 255
    d = cv2.GaussianBlur(d, (0, 0), 3.0)
    d = d / np.percentile(d, 99.5)
    a = np.clip((d - 0.38) / 0.24, 0, 1)
    a = a * a * (3 - 2 * a)
    ink = np.median(big[d > 0.9].reshape(-1, 3), axis=0)
    rgb = np.tile(ink, (1600, 1600, 1)).astype(np.uint8)
    R, A = pad_square(rgb, (a * 255).astype(np.uint8))
    save(R, A, PARTNERS / "bils.png", 1024)
    print("bils ink", ink)


def caai():
    # No separate file was supplied: the disc is cropped from the co-hosts screenshot (about 230px across).
    s = np.array(Image.open(SRC / "cohosts-screenshot.jpg").convert("RGB"))
    y0, y1, x0, x1 = 676, 936, 330, 604
    c = s[y0:y1, x0:x1]
    m = ((c[..., 0] > 170) & (c[..., 1] > 150) & (c[..., 2] > 90)).astype(np.uint8)
    # The cream margin and the red ring split the disc into separate blobs, so take every sizeable blob.
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    keep = [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] > 150]
    ys, xs = np.nonzero(np.isin(lab, keep))
    (cx, cy), r = cv2.minEnclosingCircle(np.column_stack([xs, ys]).astype(np.float32))
    print("caai disc", round(cx, 1) + x0, round(cy, 1) + y0, "r", round(r, 1))
    big = Image.fromarray(c).resize((c.shape[1] * 4, c.shape[0] * 4), Image.LANCZOS)
    big = np.array(big).astype(np.uint8)
    yy, xx = np.mgrid[0:big.shape[0], 0:big.shape[1]]
    dist = np.hypot(xx - (cx + 0.5) * 4, yy - (cy + 0.5) * 4)
    A = (np.clip((r - 0.5) * 4 - dist, 0, 3) / 3 * 255).astype(np.uint8)
    R, A = pad_square(big, A)
    save(R, A, PARTNERS / "caai.png", 720)


def baca():
    # The original seal is a dark disc with gold line art. The light twin swaps the disc for paper and the gold for ink,
    # using the same silhouette, so the two are interchangeable.
    o = Image.open(OUT / "baca-seal.png").convert("RGBA")
    if not (OUT / "baca-seal-dark.png").exists():
        o.save(OUT / "baca-seal-dark.png", optimize=True)
    a = np.array(Image.open(OUT / "baca-seal-dark.png").convert("RGBA")).astype(np.float32)
    y = 0.5 * a[..., 0] + 0.4 * a[..., 1] + 0.1 * a[..., 2]
    art = np.clip((y - 26) / 118, 0, 1) ** 0.8
    paper, ink = np.array([241, 244, 234], np.float32), np.array([20, 26, 22], np.float32)
    rgb = paper * (1 - art[..., None]) + ink * art[..., None]
    save(rgb.astype(np.uint8), a[..., 3].astype(np.uint8), OUT / "baca-seal-light.png")


if __name__ == "__main__":
    aia(); bba(); bils(); caai(); baca()
