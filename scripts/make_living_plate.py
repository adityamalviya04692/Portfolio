"""Build the cut-out masks and background plate for the animated hero desk
(src/components/LivingDesk.tsx).

Every moving part is drawn as a cut-out of the original illustration. Under them sits
the plate: each part's area inpainted (transparent elsewhere), so when a part tilts, hops
or slides the gap shows plausible background instead of a second copy of the part.

Most parts are cut with their hand-drawn polygon. Organic shapes (hair, leaves) carry an
"auto" block instead: the exact object pixels are traced from the image inside "region"
and written as an alpha mask (public/assets/living/<id>.png), so no stray hair or leaf
tip is left behind when the part moves.

Run from Portfolio_Website/:  python3 scripts/make_living_plate.py   (needs opencv-python)
"""

import json
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "assets" / "workspace-aditya.png"
OUT = ROOT / "public" / "assets" / "workspace-aditya-plate.webp"
MASKS = ROOT / "public" / "assets" / "living"
PARTS = json.loads((ROOT / "src" / "data" / "livingDesk.json").read_text())["parts"]

img = cv2.imread(str(SRC), cv2.IMREAD_COLOR)
h, w = img.shape[:2]
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
WALL = np.array([236, 244, 248], float)  # BGR of the cream wall, #f8f4ec
wallish = np.linalg.norm(img.astype(float) - WALL, axis=2) <= 18
disk = lambda r: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))


def poly_mask(pts) -> np.ndarray:
    m = np.zeros((h, w), np.uint8)
    cv2.fillPoly(m, [np.array(pts, np.int32)], 255)
    return m


def fill_holes(m: np.ndarray) -> np.ndarray:
    flood = m.copy()
    cv2.floodFill(flood, np.zeros((h + 2, w + 2), np.uint8), (0, 0), 255)
    return m | cv2.bitwise_not(flood)


def split_by_leaf(obj: np.ndarray, y: int, keep: str) -> np.ndarray:
    """Split one plant into two layers along stems, never through a leaf.

    Opening removes the thin stems so each leaf is its own blob; a leaf goes "above" or
    "below" by its centre. Stem pixels then join whichever side reaches them first.
    """
    leaves = cv2.morphologyEx(obj, cv2.MORPH_OPEN, disk(4))
    n, labels, _, centroids = cv2.connectedComponentsWithStats(leaves)
    above = np.zeros_like(obj)
    below = np.zeros_like(obj)
    for i in range(1, n):
        (above if centroids[i][1] < y else below)[labels == i] = 255
    rest = obj.copy()
    rest[(above | below) > 0] = 0
    while rest.any():
        grow_a = cv2.dilate(above, disk(1)) & rest
        grow_b = cv2.dilate(below, disk(1)) & rest & ~grow_a
        if not grow_a.any() and not grow_b.any():
            below |= rest  # unreachable specks: hang them on the vine
            break
        above |= grow_a
        below |= grow_b
        rest[(grow_a | grow_b) > 0] = 0
    return above if keep == "above" else below


def trace(part) -> tuple[np.ndarray, np.ndarray]:
    """Return (cut mask with a soft wall-only halo, area to inpaint) for an auto part."""
    auto = part["auto"]
    region = poly_mask(auto["region"]) > 0
    if auto["kind"] == "leaf":
        hue, sat, val = hsv[..., 0], hsv[..., 1], hsv[..., 2]
        obj = (hue >= 22) & (hue <= 62) & (sat > 38) & (val > 40)
    else:  # "skin": hair, face and beard are everything that is not wall
        obj = ~wallish
        if "excludeLampLeftOf" in auto:
            # The desk lamp touches the hair: tell them apart by colour, not by outline.
            # Lamp paint is bright and saturated; hair is dark.
            hue, sat, val = hsv[..., 0], hsv[..., 1], hsv[..., 2]
            lamp = (hue >= 8) & (hue <= 32) & (sat > 110) & (val > 140)
            lamp[:, auto["excludeLampLeftOf"]:] = False
            lamp = cv2.dilate(lamp.astype(np.uint8), disk(1)) > 0  # its anti-aliased rim too
            obj &= ~lamp
    obj = (obj & region).astype(np.uint8) * 255
    obj = cv2.morphologyEx(obj, cv2.MORPH_CLOSE, disk(2))
    obj = fill_holes(obj)
    if "split" in auto:
        obj = split_by_leaf(obj, auto["split"]["y"], auto["split"]["keep"])
    # Drop specks so stray pixels don't become floating cut-outs.
    n, labels, stats, _ = cv2.connectedComponentsWithStats(obj)
    for i in range(1, n):
        if stats[i, cv2.CC_STAT_AREA] < 40:
            obj[labels == i] = 0
    if auto["kind"] == "skin" and n > 1:  # a head is one piece: drop lamp-rim islands
        biggest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
        obj[labels != biggest] = 0
    # Halo of 3px for anti-aliased edges, but only into wall or the part's own region,
    # never into a neighbouring object (lamp, pot, monitor).
    allowed = (region | wallish) & ~(lamp if "excludeLampLeftOf" in auto else False)
    halo = cv2.dilate(obj, disk(3)) & ((allowed * 255).astype(np.uint8))
    # Keep only halo pieces that actually touch the object (no orphaned edge specks).
    n, labels = cv2.connectedComponents(halo)
    touching = set(np.unique(labels[obj > 0])) - {0}
    halo = np.isin(labels, list(touching)).astype(np.uint8) * 255
    # Inpaint the object plus any non-wall pixel caught in its halo (a stray leaf tip or
    # hair strand left in the plate would show as a dark speck once the part moves).
    inpaint = cv2.dilate(obj, disk(1)) | (halo & ((~wallish) * 255).astype(np.uint8))
    if "inpaintAbove" in auto:  # keep chin/collar original so the jaw seam stays invisible
        inpaint[auto["inpaintAbove"]:, :] = 0
    return halo, inpaint


MASKS.mkdir(parents=True, exist_ok=True)
inpaint_all = np.zeros((h, w), np.uint8)
opaque = np.zeros((h, w), np.uint8)
for part in PARTS:
    if "auto" in part:
        cut, area = trace(part)
        soft = cv2.GaussianBlur(cut, (3, 3), 0)
        rgba = np.dstack([np.full((h, w, 3), 255, np.uint8), soft])
        cv2.imwrite(str(MASKS / f"{part['id']}.png"), rgba, [cv2.IMWRITE_PNG_COMPRESSION, 9])
        opaque |= cut
        inpaint_all |= area
        print(f"traced {part['id']}: {int((cut > 0).sum())} px")
    else:
        shape = poly_mask(part["shape"])
        opaque |= shape
        # Parts that barely move ("plate": false) keep original pixels beneath. Elsewhere,
        # inpaint a pixel inside the outline so the plate stays original along the
        # anti-aliased edge; at rest the composite is pixel-identical to the source.
        if part.get("plate", True):
            inpaint_all |= cv2.erode(shape, disk(1))

plate = cv2.inpaint(img, inpaint_all, 7, cv2.INPAINT_TELEA)
# Only the part areas are opaque: everywhere else the original PNG shows through untouched.
cv2.imwrite(str(OUT), np.dstack([plate, opaque]), [cv2.IMWRITE_WEBP_QUALITY, 101])  # lossless
print(f"wrote {OUT.relative_to(ROOT)}  ({OUT.stat().st_size // 1024} KB)")
