import { useLayoutEffect, useRef, type ReactNode } from "react";

/** Keep each card in its own column without stretching the neighbouring card. */
export default function ProjectMasonry({ children }: { children: ReactNode }) {
  const grid = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const cards = Array.from(grid.current?.querySelectorAll<HTMLElement>(".showcase-card") || []);
    const measure = (card: HTMLElement) => {
      const item = card.parentElement;
      if (item) item.style.gridRowEnd = `span ${Math.ceil(card.offsetHeight + 32)}`;
    };
    cards.forEach(measure);
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => measure(entry.target as HTMLElement));
    });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  return <div ref={grid} className="showcase-grid">{children}</div>;
}
