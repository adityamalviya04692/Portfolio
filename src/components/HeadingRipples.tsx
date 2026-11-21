import { Fragment, useEffect, type ReactNode } from "react";
import { useMotionPreference } from "./MotionSystem";

export function RippleWord({ children, className }: { children: ReactNode; className?: string }) {
  return <span data-ripple className={className}><span className="ripple-ink">{children}</span></span>;
}

export function RippleWords({ text, suffix }: { text: string; suffix?: ReactNode }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      <RippleWord>{word}{index === words.length - 1 && suffix}</RippleWord>
    </Fragment>
  ));
}

export default function HeadingRipples() {
  const { reduced } = useMotionPreference();
  useEffect(() => {
    if (reduced) return;

    let ink: HTMLElement | null = null;
    let slices: HTMLElement[] = [];
    let word: HTMLElement | null = null;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let centerX = 0;
    let centerY = 0;
    let intensity = 0;
    let hovering = false;
    let previousFrame = 0;

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousFrame = 0;
      intensity = 0;
      hovering = false;
      word?.removeAttribute("data-rippling");
      ink?.style.removeProperty("clip-path");
      slices.forEach((slice) => slice.remove());
      slices = [];
      ink = word = null;
    };

    const draw = (now: number) => {
      if (!word || !ink) return;
      frame = 0;
      const elapsed = previousFrame ? now - previousFrame : 16;
      previousFrame = now;
      const blend = 1 - Math.exp(-elapsed / 45);
      const targetIntensity = hovering ? 1 : 0;
      centerX += (pointerX - centerX) * blend;
      centerY += (pointerY - centerY) * blend;
      intensity += (targetIntensity - intensity) * blend;
      const settled = Math.abs(targetIntensity - intensity) < 0.005 &&
        Math.hypot(pointerX - centerX, pointerY - centerY) < 0.1;
      if (settled) {
        if (!hovering) {
          clear();
          return;
        }
        centerX = pointerX;
        centerY = pointerY;
        intensity = 1;
      }

      const box = word.getBoundingClientRect();
      const width = word.offsetWidth;
      const height = word.offsetHeight;
      const radius = Math.min(30, Math.max(5, height * 0.29));
      const x = (centerX - box.left) * width / box.width;
      const y = (centerY - box.top) * height / box.height;
      const top = y - radius;
      const step = radius * 2 / slices.length;
      const strength = radius * 0.23 * intensity;

      // Subtract the slice source rectangles from the stationary word.
      let cutout = `M-24,-24 H${width + 24} V${height + 24} H-24 Z`;
      slices.forEach((slice, index) => {
        const bandTop = top + index * step;
        const bandBottom = bandTop + step;
        const spread = Math.sqrt(1 - ((index + 0.5) / slices.length * 2 - 1) ** 2);
        const left = x - radius * spread;
        const right = x + radius * spread;
        cutout += ` M${left},${bandTop} H${right} V${bandBottom} H${left} Z`;
        slice.style.clipPath = `inset(${bandTop}px ${width - right}px ${height - bandBottom}px ${left}px)`;
        const offset = Math.sin((index + 0.5) / slices.length * Math.PI * 2 + x / radius * 0.8);
        slice.style.transform = `translateX(${offset * strength * spread}px)`;
      });
      ink.style.clipPath = `path(evenodd, "${cutout}")`;
      word.setAttribute("data-rippling", "");
      if (settled) previousFrame = 0;
      else frame = requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-ripple]")
        : null;
      if (event.pointerType !== "mouse" || !target) {
        if (word && hovering) {
          hovering = false;
          if (!frame) frame = requestAnimationFrame(draw);
        }
        return;
      }
      if (word !== target) {
        clear();
        word = target;
        centerX = event.clientX;
        centerY = event.clientY;
        ink = target.querySelector<HTMLElement>(":scope > .ripple-ink");
        if (!ink) {
          clear();
          return;
        }
        for (let index = 0; index < 28; index++) {
          const slice = ink.cloneNode(true) as HTMLElement;
          slice.className = "ripple-slice";
          slice.setAttribute("aria-hidden", "true");
          target.append(slice);
          slices.push(slice);
        }
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      hovering = true;
      if (!frame) frame = requestAnimationFrame(draw);
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", clear);
    window.addEventListener("scroll", clear, { passive: true });
    window.addEventListener("blur", clear);
    return () => {
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", clear);
      window.removeEventListener("scroll", clear);
      window.removeEventListener("blur", clear);
      clear();
    };
  }, [reduced]);

  return null;
}
