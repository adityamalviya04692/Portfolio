const desktopPointer = "(min-width: 860px) and (hover: hover) and (pointer: fine)";
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

export function attachProjectCardMotion(track: HTMLDivElement) {
  const region = track.parentElement;
  if (!region) return;

  const media = window.matchMedia(desktopPointer);
  const cards = Array.from(track.querySelectorAll<HTMLElement>(".carousel-thumb"), (button) => ({
    button,
    face: button.querySelector<HTMLElement>(".carousel-face")!,
    x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0,
  }));
  let pointer: { x: number; y: number; time: number } | undefined;
  let frame = 0;
  let lastTime = 0;

  function animate(time: number) {
    const dt = Math.max(0, Math.min((time - lastTime) / 1000, 1 / 30));
    const decay = Math.exp(-9 * dt);
    lastTime = time;
    let moving = false;

    for (const card of cards) {
      // The input fades when the pointer stops. The spring carries the visible return.
      card.targetX *= decay;
      card.targetY *= decay;
      card.vx += ((card.targetX - card.x) * 240 - card.vx * 25) * dt;
      card.vy += ((card.targetY - card.y) * 240 - card.vy * 25) * dt;
      card.x += card.vx * dt;
      card.y += card.vy * dt;

      const settling = Math.max(
        Math.abs(card.targetX), Math.abs(card.targetY), Math.abs(card.x), Math.abs(card.y),
        Math.abs(card.vx) / 20, Math.abs(card.vy) / 20,
      ) > 0.04;
      if (settling) {
        card.face.style.translate = `${card.x.toFixed(2)}px ${card.y.toFixed(2)}px`;
        card.face.style.rotate = `${(card.x * 0.13).toFixed(2)}deg`;
        moving = true;
      } else {
        card.x = card.y = card.vx = card.vy = card.targetX = card.targetY = 0;
        card.face.style.removeProperty("translate");
        card.face.style.removeProperty("rotate");
      }
    }
    frame = moving ? requestAnimationFrame(animate) : 0;
  }

  function onMove(event: PointerEvent) {
    if (!media.matches || event.pointerType !== "mouse") return;

    const next = { x: event.clientX, y: event.clientY, time: event.timeStamp };
    const previous = pointer;
    pointer = next;
    if (!previous) return;

    const elapsed = Math.max(8, Math.min(80, next.time - previous.time));
    const impulseX = clamp((next.x - previous.x) / elapsed * 23, 33);
    const impulseY = clamp((next.y - previous.y) / elapsed * 19, 23);

    for (const card of cards) {
      const { x, y, width, height } = card.button.getBoundingClientRect();
      const dx = (next.x - x - width / 2) / (width * 1.2);
      const dy = (next.y - y - height / 2) / (height * 0.82);
      const proximity = Math.max(0, 1 - Math.hypot(dx, dy));
      const weight = proximity * proximity * (3 - 2 * proximity);
      card.targetX = impulseX * weight;
      card.targetY = impulseY * weight;
    }

    if (!frame && (impulseX || impulseY)) {
      lastTime = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }

  function forgetPointer() {
    pointer = undefined;
  }

  function reset() {
    forgetPointer();
    cancelAnimationFrame(frame);
    frame = 0;
    for (const card of cards) {
      card.x = card.y = card.vx = card.vy = card.targetX = card.targetY = 0;
      card.face.style.removeProperty("translate");
      card.face.style.removeProperty("rotate");
    }
  }

  region.addEventListener("pointermove", onMove, { passive: true });
  region.addEventListener("pointerleave", forgetPointer);
  media.addEventListener("change", reset);
  return () => {
    reset();
    region.removeEventListener("pointermove", onMove);
    region.removeEventListener("pointerleave", forgetPointer);
    media.removeEventListener("change", reset);
  };
}
