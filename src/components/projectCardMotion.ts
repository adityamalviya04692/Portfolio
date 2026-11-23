const ease = "cubic-bezier(.2, .8, .2, 1)";

export function prepareProjectDeck(trigger: HTMLElement, reduced: boolean) {
  const selected = trigger.closest<HTMLElement>(".carousel-card");
  const grid = selected?.closest<HTMLElement>(".project-card-grid");
  if (!selected || !grid) return;
  const cards = [...grid.querySelectorAll<HTMLElement>(".carousel-card")];
  const remaining = cards.filter((card) => card !== selected);
  const animations: Animation[] = [];
  const stop = () => animations.splice(0).forEach((animation) => animation.cancel());

  const reflow = (compact: boolean) => {
    const before = remaining.map((card) => {
      const face = card.querySelector<HTMLElement>(".carousel-face")!;
      return { card, face, x: card.getBoundingClientRect().left, pose: getComputedStyle(face).transform };
    });
    stop();
    grid.dispatchEvent(new Event("project-deck-reset"));
    grid.toggleAttribute("data-deck-compact", compact);
    selected.style.display = compact ? "none" : "";
    selected.style.visibility = "hidden";
    const positions = compact ? remaining : cards;
    grid.style.setProperty("--deck-size", String(positions.length));
    positions.forEach((card, index) => {
      card.style.setProperty("--fan-position", String(positions.length > 1 ? 2 * index / (positions.length - 1) - 1 : 0));
      card.style.setProperty("--fan-layer", String(Math.min(index, positions.length - 1 - index)));
    });
    if (reduced) return;

    const duration = compact ? 430 : 520;
    for (const { card, face, x, pose } of before) {
      const shift = x - card.getBoundingClientRect().left;
      const nextPose = getComputedStyle(face).transform;
      animations.push(
        card.animate({ translate: [`${shift}px 0`, "0px 0"] }, { duration, easing: ease }),
        face.animate({ transform: [pose, nextPose] }, { duration, easing: ease }),
      );
    }
  };

  reflow(true);
  return {
    openSlot: () => {
      if (grid.hasAttribute("data-deck-compact")) reflow(false);
    },
    restore: () => {
      if (grid.hasAttribute("data-deck-compact")) reflow(false);
      stop();
      grid.style.removeProperty("--deck-size");
      selected.style.removeProperty("display");
      selected.style.removeProperty("visibility");
    },
  };
}
