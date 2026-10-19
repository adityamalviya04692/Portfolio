import { useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

const current = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

/*
 * Day/night switch. index.html sets data-theme before first paint (saved choice, else the
 * system preference); this button flips it. Where the View Transitions API exists, night
 * spreads from the button as a growing circle; elsewhere colours cross-fade. The
 * "portfolio-theme" event lets the hero desk switch its lamp on as night falls.
 */
export default function ThemeToggle({ reduced }: { reduced: boolean }) {
  const [theme, setTheme] = useState<Theme>(current);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("portfolio-theme", next);
      } catch {
        /* private mode: the choice just isn't remembered */
      }
      setTheme(next);
      window.dispatchEvent(new CustomEvent("portfolio-theme", { detail: next }));
    };

    if (reduced) return apply();
    if (!document.startViewTransition) {
      root.classList.add("theme-fading");
      apply();
      window.setTimeout(() => root.classList.remove("theme-fading"), 900);
      return;
    }

    // Percentages of the viewport keep the circle centred on the button at any zoom level.
    const r = event.currentTarget.getBoundingClientRect();
    const at = `${(((r.left + r.width / 2) / innerWidth) * 100).toFixed(2)}% ${(((r.top + r.height / 2) / innerHeight) * 100).toFixed(2)}%`;
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0% at ${at})`, `circle(150% at ${at})`] },
          { duration: 1100, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => {});
  };

  return (
    <button
      className="theme-toggle"
      data-mode={theme}
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === "dark"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <mask id="theme-moon-cut">
          <rect width="24" height="24" fill="#fff" />
          <circle className="theme-cut" cx="25" cy="3" r="6.5" fill="#000" />
        </mask>
        <g className="theme-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="2.4" x2="12" y2="4.6" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
        <circle className="theme-core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#theme-moon-cut)" />
        <circle className="theme-star" cx="19.5" cy="5" r="0.9" fill="currentColor" />
        <circle className="theme-star theme-star-b" cx="17" cy="1.8" r="0.6" fill="currentColor" />
      </svg>
    </button>
  );
}
