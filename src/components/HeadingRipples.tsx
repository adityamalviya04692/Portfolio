import { useEffect, useRef } from "react";
import { useMotionPreference } from "./MotionSystem";

export default function HeadingRipples() {
  const { reduced } = useMotionPreference();
  const definitions = useRef<SVGDefsElement>(null);
  const template = useRef<SVGFilterElement>(null);

  useEffect(() => {
    const defs = definitions.current;
    const source = template.current;
    if (reduced || !defs || !source) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const entrance = new Map<HTMLElement, () => void>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio < 0.5) continue;
        const heading = entry.target as HTMLElement;
        entrance.get(heading)?.();
        observer.unobserve(heading);
      }
    }, { threshold: 0.5 });

    const cleanups = [...document.querySelectorAll<HTMLElement>("[data-ripple]")].map((element, index) => {
      const isNav = element.dataset.ripple === "nav";
      const filter = source.cloneNode(true) as SVGFilterElement;
      filter.id = `heading-ripple-${index}`;
      const animation = filter.querySelector("animate")!;
      const duration = isNav ? 180 : 480;
      animation.setAttribute("dur", `${duration}ms`);
      animation.setAttribute("values", isNav ? "0;2.5;-1.2;0" : "0;13;-6;0");
      defs.append(filter);

      let timeout = 0;
      const settle = () => {
        element.style.removeProperty("--heading-ripple");
        element.removeAttribute("data-rippling");
      };
      const play = () => {
        clearTimeout(timeout);
        element.style.setProperty("--heading-ripple", `url(#${filter.id})`);
        element.setAttribute("data-rippling", "");
        animation.beginElement();
        timeout = window.setTimeout(settle, duration);
      };
      const hover = () => {
        if (canHover.matches) play();
      };
      const target = isNav ? element.closest("a") ?? element : element;
      target.addEventListener("pointerenter", hover);
      if (!isNav) {
        entrance.set(element, play);
        observer.observe(element);
      }

      return () => {
        clearTimeout(timeout);
        target.removeEventListener("pointerenter", hover);
        settle();
        filter.remove();
      };
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [reduced]);

  return (
    <svg className="heading-ripple-definitions" width="0" height="0" aria-hidden="true">
      <defs ref={definitions}>
        <filter ref={template} x="-10%" y="-30%" width="120%" height="160%">
          <feTurbulence type="turbulence" baseFrequency=".018 .07" numOctaves="1" seed="7" result="waves" />
          <feDisplacementMap in="SourceGraphic" in2="waves" xChannelSelector="R" yChannelSelector="G" scale="0">
            <animate attributeName="scale" begin="indefinite" dur="480ms" keyTimes="0;.22;.52;1"
              calcMode="spline" keySplines=".23 1 .32 1;.23 1 .32 1;.23 1 .32 1" />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
}
