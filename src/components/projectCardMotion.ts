const pointerQuery = "(hover: hover) and (pointer: fine)";
const ease = "cubic-bezier(.23, 1, .32, 1)";

export function attachProjectCardMotion(grid: HTMLDivElement) {
  const media = window.matchMedia(pointerQuery);
  const cards = new Map<HTMLElement, { face: HTMLElement; animation?: Animation }>();
  grid.querySelectorAll<HTMLElement>(".carousel-card").forEach((card) => {
    const face = card.querySelector<HTMLElement>(".carousel-face");
    if (face) cards.set(card, { face });
  });
  let active: HTMLElement | null = null;

  function move(card: HTMLElement, front: boolean) {
    const entry = cards.get(card);
    if (!entry) return;
    const { face } = entry;
    const from = getComputedStyle(face).transform;
    entry.animation?.cancel();

    const position = Number(card.style.getPropertyValue("--fan-position"));
    const side = position < 0 ? -1 : 1;
    const distance = Math.min(46, face.offsetWidth * 0.25);
    const pose = (x: number, y: number, angle = 1) =>
      `translate(${x}px, calc(var(--fan-drop) + ${y}px)) rotate(calc(var(--fan-angle) * ${angle}))`;

    const animate = (from: string, to: string, duration: number, done: () => void) => {
      const animation = face.animate({ transform: [from, to] }, { duration, easing: ease, fill: "forwards" });
      entry.animation = animation;
      animation.onfinish = () => {
        if (entry.animation !== animation) return;
        done();
        animation.cancel();
      };
    };

    const clearance = pose(side * distance, front ? -3 : -15);
    animate(from, clearance, 180, () => {
      if (front) card.style.zIndex = String(cards.size + 1);
      else card.style.removeProperty("z-index");
      animate(clearance, front ? pose(side * 14, -23, 0.75) : pose(0, 0), 310, () => {
        if (front) {
          face.style.transform = pose(side * 14, -23, 0.75);
        } else face.style.removeProperty("transform");
        entry.animation = undefined;
      });
    });
  }

  function setActive(next: HTMLElement | null) {
    if (next === active) return;
    if (active) move(active, false);
    active = next;
    if (next) move(next, true);
  }

  function onMove(event: PointerEvent) {
    if (!media.matches || event.pointerType !== "mouse") return;
    const target = event.target instanceof Element
      ? event.target.closest<HTMLElement>(".carousel-card")
      : null;
    setActive(target && cards.has(target) ? target : null);
  }

  function onLeave() { setActive(null); }
  function reset() {
    active = null;
    for (const [card, entry] of cards) {
      entry.animation?.cancel();
      entry.animation = undefined;
      entry.face.style.removeProperty("transform");
      card.style.removeProperty("z-index");
    }
  }

  grid.addEventListener("pointermove", onMove, { passive: true });
  grid.addEventListener("pointerleave", onLeave);
  media.addEventListener("change", reset);
  return () => {
    reset();
    grid.removeEventListener("pointermove", onMove);
    grid.removeEventListener("pointerleave", onLeave);
    media.removeEventListener("change", reset);
  };
}
