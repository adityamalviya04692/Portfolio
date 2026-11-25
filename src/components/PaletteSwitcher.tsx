import { useEffect, useState } from "react";

export type PaletteId = "zero" | "forest" | "cobalt" | "plum" | "original";

const PALETTES: {
  id: PaletteId;
  short: string;
  label: string;
  primary: string;
  accent: string;
}[] = [
  { id: "zero", short: "Zero Flow", label: "Zero-Inspired: Pale Paper, Carbon & Mint Flow", primary: "#111214", accent: "#0f9f6e" },
  { id: "forest", short: "V1 Forest", label: "Version 1: Forest & Copper", primary: "#113b31", accent: "#c86432" },
  { id: "cobalt", short: "V2 Cobalt", label: "Version 2: Obsidian & Cobalt", primary: "#131829", accent: "#2d5bff" },
  { id: "plum", short: "V3 Plum", label: "Version 3: Plum & Amber", primary: "#2f1636", accent: "#d95843" },
  { id: "original", short: "Original", label: "Original (Navy & Tangerine)", primary: "#102b79", accent: "#ed8838" },
];

const ALIASES: Record<string, PaletteId> = {
  zero: "zero",
  v4: "zero",
  "4": "zero",
  original: "original",
  "0": "original",
  forest: "forest",
  v1: "forest",
  "1": "forest",
  cobalt: "cobalt",
  v2: "cobalt",
  "2": "cobalt",
  plum: "plum",
  v3: "plum",
  "3": "plum",
};

function readInitialPalette(): PaletteId {
  const fromDataset = document.documentElement.dataset.palette;
  if (fromDataset && ALIASES[fromDataset]) return ALIASES[fromDataset];
  try {
    const q = new URLSearchParams(window.location.search).get("palette")?.toLowerCase();
    if (q && ALIASES[q]) return ALIASES[q];
    const saved = localStorage.getItem("portfolio-palette")?.toLowerCase();
    if (saved && ALIASES[saved]) return ALIASES[saved];
  } catch {
    /* ignore storage errors */
  }
  return "zero";
}

export default function PaletteSwitcher({ reduced }: { reduced: boolean }) {
  const [palette, setPalette] = useState<PaletteId>(readInitialPalette);

  useEffect(() => {
    const root = document.documentElement;
    if (palette === "original") {
      delete root.dataset.palette;
    } else {
      root.dataset.palette = palette;
    }
  }, [palette]);

  const select = (next: PaletteId) => {
    if (next === palette) return;
    const root = document.documentElement;
    if (!reduced) {
      root.classList.add("palette-fading");
      window.setTimeout(() => root.classList.remove("palette-fading"), 500);
    }
    if (next === "original") {
      delete root.dataset.palette;
    } else {
      root.dataset.palette = next;
    }
    setPalette(next);
    try {
      localStorage.setItem("portfolio-palette", next);
      const url = new URL(window.location.href);
      url.searchParams.set("palette", next);
      window.history.replaceState({}, "", url.toString());
    } catch {
      /* ignore URL/storage errors */
    }
  };

  return (
    <aside className="palette-switcher" aria-label="Color theme versions">
      <span className="palette-switcher-label">Theme</span>
      {PALETTES.map((p) => (
        <button
          key={p.id}
          type="button"
          className="palette-chip"
          aria-pressed={palette === p.id}
          title={p.label}
          onClick={() => select(p.id)}
        >
          <span className="palette-swatch" aria-hidden="true">
            <i style={{ background: p.primary }} />
            <i style={{ background: p.accent }} />
          </span>
          <span>{p.short}</span>
        </button>
      ))}
    </aside>
  );
}
