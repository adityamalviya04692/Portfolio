import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useMotionPreference } from "./MotionSystem";
import scene from "../data/livingDesk.json";

/*
 * Brings the hero workspace illustration to life without redrawing it.
 * Moving parts are cut-outs of the same PNG (identical texture). Beneath them a
 * transparent "plate" (scripts/make_living_plate.py) holds inpainted background, so a
 * part can tilt, hop or slide without revealing a second copy of itself. Idle motion is
 * CSS; hovering a hotspot plays a one-shot reaction with the Web Animations API.
 * Hair and leaves are cut with pixel-traced masks (public/assets/living/*.png) so no
 * stray strand or leaf tip is left behind when they move.
 * Coordinates are pixels in the 1536×1024 source image (src/data/livingDesk.json).
 */

const W = 1536;
const H = 1024;
const pct = (x: number, y: number) => `${((x / W) * 100).toFixed(2)}% ${((y / H) * 100).toFixed(2)}%`;
const poly = (pts: number[][]) => `polygon(${pts.map(([x, y]) => pct(x, y)).join(", ")})`;
const points = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
const move = (x: number, y: number) => `translate(${((x / W) * 100).toFixed(3)}%, ${((y / H) * 100).toFixed(3)}%)`;

type Frames = Keyframe[];
const turn = (degs: number[]): Frames => degs.map((d) => ({ transform: `rotate(${d}deg)` }));
const rustle = (a: number) => turn([0, a, -0.8 * a, 0.55 * a, -0.3 * a, 0.12 * a, 0]);
const hop = (h: number, tilt: number): Frames => [
  { transform: "none" },
  { transform: `${move(0, -h)} rotate(${tilt}deg)`, offset: 0.3 },
  { transform: "none", offset: 0.55 },
  { transform: `${move(0, -h * 0.35)} rotate(${-tilt / 2}deg)`, offset: 0.75 },
  { transform: "none" },
];
const slideOut: Frames = [
  { transform: "none" },
  { transform: move(-6, 1.5), offset: 0.35 },
  { transform: move(-6, 1.5), offset: 0.65 },
  { transform: "none" },
];

// One-shot reactions per part id: keyframes and duration (ms).
const reactions: Record<string, [Frames, number]> = {
  pothos: [rustle(3.5), 1200],
  plant: [rustle(3), 1300],
  "note-1": [rustle(-6), 1200],
  "note-2": [rustle(-8), 1200],
  "note-3": [rustle(-5), 1200],
  elephant: [hop(9, -4), 700],
  sheep: [hop(8, 5), 700],
  frame: [turn([0, -4, 3, -1.5, 0.5, 0]), 900],
  "shelf-books": [turn([0, 3, -2, 1, 0]), 600],
  "desk-books": [turn([0, -2.5, 2, -1, 0]), 600],
  pencils: [turn([0, 6, -5, 3, -2, 1, 0]), 700],
  mug: [turn([0, -5, 4, -2.5, 1, 0]), 800],
  mouse: [
    [
      { transform: "none" },
      { transform: `${move(3, -1)} rotate(4deg)` },
      { transform: `${move(-2, 1)} rotate(-3deg)` },
      { transform: `${move(2, 0)} rotate(2deg)` },
      { transform: "none" },
    ],
    600,
  ],
  "drawer-1": [slideOut, 1300],
  "drawer-2": [slideOut, 1300],
  "drawer-3": [slideOut, 1300],
  foot: [turn([0, -7, 0, -7, 0, -7, 0, -7, 0]), 1300],
  head: [
    [
      { transform: "none" },
      { transform: `${move(0, 2.2)} rotate(0.8deg)`, offset: 0.3 },
      { transform: "none", offset: 0.55 },
      { transform: `${move(0, 1.4)} rotate(0.5deg)`, offset: 0.78 },
      { transform: "none" },
    ],
    1000,
  ],
};

const idleClass: Record<string, string> = {
  breeze: "ld-breeze",
  breathe: "ld-torso",
  head: "ld-head",
  type: "ld-hand",
  tap: "ld-tap",
  bob: "ld-bob",
  wiggle: "ld-wiggle",
};

// Data paths through the pipeline diagram on the right monitor, into the cloud.
const pipes = [
  "M985 342 L1016 346 Q1026 348 1026 358 L1026 380 Q1026 389 1034 390 L1042 391",
  "M985 342 L997 344 Q1004 345 1004 352 L1004 376 Q1004 383 1011 383 L1022 385 Q1028 388 1034 390 L1042 391",
  "M980 408 L997 409 Q1002 408 1002 400 L1002 392 Q1002 384 1010 383 L1022 385 Q1028 388 1034 390 L1042 391",
  "M980 410 L1016 416 Q1024 416 1026 408 L1026 396 Q1027 390 1034 390 L1042 391",
];
// Night-only dressing, in source-image pixels.
// Moonlight from an unseen window: a 2×2 pane grid thrown onto the back wall, its
// horizontals following the wall's perspective (same slope as the shelf).
const panes = [0, 1].flatMap((i) =>
  [0, 1].map((j) => {
    const x = 175 + i * 92;
    const y = 58 + j * 108 + i * 92 * 0.12;
    return [[x, y], [x + 82, y + 9.8], [x + 82, y + 107.8], [x, y + 98]];
  }),
);
// Fairy lights swagged over the shelf and the corkboard (two quadratic curves).
const swags: number[][][] = [
  [[596, 10], [822, 74], [1040, 38]],
  [[1040, 38], [1182, 122], [1306, 92]],
];
const quad = ([a, c, b]: number[][], t: number) =>
  [0, 1].map((k) => (1 - t) ** 2 * a[k] + 2 * (1 - t) * t * c[k] + t * t * b[k]);
const bulbColors = ["#ffd27a", "#ff9e6e", "#9fe3ff", "#c9a7ff", "#ffe9a8"];
const bulbs = swags.flatMap((sw, s) => {
  const n = s === 0 ? 15 : 8;
  return Array.from({ length: n }, (_, i) => quad(sw, (i + 0.5) / n));
});
// Dust drifting through the lamp's beam.
const motes = [
  [438, 352, 0], [462, 392, 1.6], [489, 340, 3.1], [452, 420, 0.8],
  [505, 405, 2.3], [425, 385, 3.9], [478, 372, 4.6],
];

const screenLeft = [[688, 223], [887, 250], [886, 415], [683, 378]];
const screenRight = [[905, 267], [1105, 312], [1104, 477], [901, 425]];

export default function LivingDesk({ src, alt }: { src: string; alt: string }) {
  const { reduced } = useMotionPreference();
  const root = useRef<HTMLDivElement>(null);
  const busy = useRef(new Set<string>());
  const plate = src.replace(/\.png$/, "-plate.webp");
  const maskUrl = (id: string) => src.replace(/[^/]+\.png$/, `living/${id}.png`);

  // Swap in the moving parts only once the plate and every traced mask have loaded;
  // if any fails, the untouched illustration stays on screen instead of a gap.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const urls = [plate, ...scene.parts.filter((p) => "auto" in p).map((p) => maskUrl(p.id))];
    Promise.all(
      urls.map((url) => {
        const img = new Image();
        img.src = url;
        return img.decode();
      }),
    )
      .then(() => alive && setReady(true))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [plate]); // eslint-disable-line react-hooks/exhaustive-deps

  // When night falls, the desk lamp flickers on.
  useEffect(() => {
    const onTheme = (e: Event) => {
      if ((e as CustomEvent).detail !== "dark") return;
      root.current?.querySelectorAll(".ld-night-light").forEach((el) =>
        el.animate(
          [
            { opacity: 0 },
            { opacity: 0, offset: 0.35 },
            { opacity: 0.9, offset: 0.42 },
            { opacity: 0.15, offset: 0.5 },
            { opacity: 1, offset: 0.6 },
            { opacity: 0.55, offset: 0.66 },
            { opacity: 1 },
          ],
          { duration: 1500 },
        ),
      );
    };
    window.addEventListener("portfolio-theme", onTheme);
    return () => window.removeEventListener("portfolio-theme", onTheme);
  }, []);

  if (reduced) return <img src={src} alt={alt} loading="eager" />;

  const $ = <T extends Element = Element>(sel: string) => [...(root.current?.querySelectorAll<T>(sel) ?? [])];

  // Run an effect once; ignore re-entry while it is still playing.
  const once = (key: string, ms: number, run: () => void) => {
    if (busy.current.has(key)) return;
    busy.current.add(key);
    run();
    window.setTimeout(() => busy.current.delete(key), ms);
  };

  // Temporarily speed up the CSS idle loops on the given elements.
  const hurry = (sel: string, rate: number, ms: number) => {
    const anims = $(sel).flatMap((el) => el.getAnimations());
    anims.forEach((a) => (a.playbackRate = rate));
    window.setTimeout(() => anims.forEach((a) => (a.playbackRate = 1)), ms);
  };

  const flash = (sel: string, peak = 0.14) =>
    $(sel).forEach((el) =>
      el.animate([{ opacity: 0 }, { opacity: peak }, { opacity: 0 }], { duration: 700, easing: "ease-out" }),
    );

  const effects: Record<string, () => void> = {
    code: () =>
      once("code", 2400, () => {
        flash(".ld-flash-left");
        hurry(".ld-type-cover, .ld-cursor, .ld-hand", 3, 2400);
      }),
    data: () =>
      once("data", 2600, () => {
        flash(".ld-flash-right");
        hurry(".ld-pulse", 3, 2600);
      }),
    lamp: () =>
      once("lamp", 1100, () => {
        // Bulb goes dark twice, then comes back a touch brighter.
        $(".ld-lamp-off").forEach((el) =>
          el.animate(
            [
              { opacity: 0 },
              { opacity: 1, offset: 0.12 },
              { opacity: 0, offset: 0.3 },
              { opacity: 1, offset: 0.45 },
              { opacity: 0, offset: 0.62 },
              { opacity: 0 },
            ],
            { duration: 1000 },
          ),
        );
        $(".ld-lamp").forEach((el) =>
          el.animate(
            [
              { opacity: 0.45 },
              { opacity: 0, offset: 0.12 },
              { opacity: 0.6, offset: 0.3 },
              { opacity: 0, offset: 0.45 },
              { opacity: 0.85, offset: 0.62 },
              { opacity: 0.45 },
            ],
            { duration: 1000 },
          ),
        );
      }),
    webcam: () =>
      once("webcam", 1600, () =>
        $(".ld-led").forEach((el) =>
          el.animate(
            [
              { fill: "#ff5b4f", opacity: 1 },
              { fill: "#ff5b4f", opacity: 0.2 },
              { fill: "#ff5b4f", opacity: 1 },
              { fill: "#ff5b4f", opacity: 0.2 },
              { fill: "#ff5b4f", opacity: 1 },
            ],
            { duration: 1500 },
          ),
        ),
      ),
    steam: () =>
      once("steam", 3000, () => {
        hurry(".ld-steam", 2.2, 3000);
        $(".ld-steam-puff").forEach((el) =>
          el.animate([{ transform: "scale(1)" }, { transform: "scale(1.35, 1.25)" }, { transform: "scale(1)" }], {
            duration: 3000,
            easing: "ease-in-out",
          }),
        );
      }),
  };

  const react = (id: string) => {
    if (effects[id]) return effects[id]();
    const r = reactions[id];
    if (!r) return;
    once(id, r[1], () =>
      $<HTMLElement>(`[data-part="${id}"]`).forEach((el) => el.animate(r[0], { duration: r[1], easing: "ease-in-out" })),
    );
  };

  return (
    <div className={`living-desk${ready ? " ld-ready" : ""}`} ref={root} role="img" aria-label={alt}>
      <img src={src} alt="" aria-hidden="true" loading="eager" />
      <img className="ld-plate" src={plate} alt="" aria-hidden="true" />

      {scene.parts.map((p) => {
        const idle = "idle" in p && p.idle ? idleClass[p.idle] : "";
        const vars =
          "amp" in p ? ({ "--amp": p.amp, animationDelay: `${p.delay}s` } as CSSProperties) : undefined;
        // Hair and leaves use a pixel-traced alpha mask; everything else its polygon.
        const traced = `url(${maskUrl(p.id)})`;
        const cut: CSSProperties =
          "auto" in p
            ? { maskImage: traced, WebkitMaskImage: traced, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }
            : { clipPath: poly(p.shape) };
        return (
          <div key={p.id} className="ld-part" data-part={p.id} style={{ transformOrigin: pct(p.origin[0], p.origin[1]) }}>
            <div
              className={`ld-cut ${idle}`}
              style={{
                backgroundImage: `url(${src})`,
                ...cut,
                transformOrigin: pct(p.origin[0], p.origin[1]),
                ...vars,
              }}
            />
          </div>
        );
      })}

      {/* Night: the room dims to blue except where the lamp and screens light it. */}
      <div className="ld-night" aria-hidden="true" />
      <div className="ld-night-light" aria-hidden="true" />

      <svg className="ld-overlay" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <filter id="ld-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.6" />
          </filter>
          <filter id="ld-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="ld-warm">
            <stop offset="0" stopColor="#fff1c4" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffc85a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ld-bulb-off">
            <stop offset="0" stopColor="#e4ddcf" />
            <stop offset="0.7" stopColor="#e2c891" />
            <stop offset="1" stopColor="#e7b45c" stopOpacity="0" />
          </radialGradient>
          <filter id="ld-bloom" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <linearGradient id="ld-moon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dfe8ff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#9fb6ff" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="ld-cool">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#9fe3ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ld-screen" x1="0" x2="1">
            <stop offset="0" stopColor="#2f3844" />
            <stop offset="1" stopColor="#2c3541" />
          </linearGradient>
        </defs>

        {/* Desk lamp: breathing light, and a dimmed bulb used when it blinks */}
        <ellipse className="ld-lamp-off" cx="455" cy="301" rx="21" ry="10" fill="url(#ld-bulb-off)" opacity="0" />
        <circle className="ld-lamp" cx="455" cy="302" r="58" fill="url(#ld-warm)" />

        {/* Left monitor: the last line of code types itself out, cursor riding the edge */}
        <g transform="matrix(1 0.21 0 1 0 0)">
          <rect className="ld-type-cover" x="740" y="206" width="117" height="15" fill="url(#ld-screen)" />
          <rect className="ld-cursor" x="741" y="208.5" width="3.2" height="10" rx="1" fill="#f4efe4" />
        </g>
        <polygon className="ld-flash ld-flash-left" points={points(screenLeft)} />

        {/* Right monitor: packets flow through the pipeline into the cloud */}
        <ellipse className="ld-pulse" cx="958" cy="324" rx="22" ry="30" fill="url(#ld-cool)" />
        <ellipse className="ld-pulse ld-pulse-b" cx="957" cy="394" rx="22" ry="30" fill="url(#ld-cool)" />
        <ellipse className="ld-pulse ld-pulse-c" cx="1062" cy="392" rx="30" ry="24" fill="url(#ld-cool)" />
        {pipes.flatMap((d, i) =>
          [0, 1].map((k) => {
            const begin = `${-(i * 0.65 + k * 1.3)}s`;
            return (
              <circle key={`${i}-${k}`} r="2.6" fill="#dffaff" filter="url(#ld-glow)" opacity="0">
                <animateMotion dur="2.6s" repeatCount="indefinite" begin={begin} path={d} />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.12;0.85;1"
                  dur="2.6s"
                  repeatCount="indefinite"
                  begin={begin}
                />
              </circle>
            );
          }),
        )}
        <polygon className="ld-flash ld-flash-right" points={points(screenRight)} />

        {/* Night-only: moonlight on the wall, string lights, dust in the lamp light */}
        <g className="ld-nightonly">
          <g className="ld-moonlight" filter="url(#ld-soft)">
            {panes.map((pane, i) => (
              <polygon key={i} points={points(pane)} fill="url(#ld-moon)" />
            ))}
          </g>
          {swags.map(([a, c, b], i) => (
            <path
              key={i}
              d={`M${a[0]} ${a[1]} Q${c[0]} ${c[1]} ${b[0]} ${b[1]}`}
              fill="none"
              stroke="#262a3d"
              strokeWidth="1.3"
              opacity="0.85"
            />
          ))}
          {bulbs.map(([x, y], i) => (
            <g key={i} className="ld-bulb" style={{ animationDelay: `${-((i * 0.73) % 3.2)}s` }}>
              <circle cx={x} cy={y + 4} r="7" fill={bulbColors[i % bulbColors.length]} opacity="0.35" filter="url(#ld-bloom)" />
              <rect x={x - 1.6} y={y - 0.5} width="3.2" height="2.6" rx="0.8" fill="#2b2f42" />
              <ellipse cx={x} cy={y + 4.6} rx="2.6" ry="3.4" fill={bulbColors[i % bulbColors.length]} />
            </g>
          ))}
          {motes.map(([x, y, d], i) => (
            <circle key={i} className="ld-mote" cx={x} cy={y} r="1.6" fill="#ffe2ae" style={{ animationDelay: `${-d}s` }} />
          ))}
        </g>

        {/* Webcam status light */}
        <circle className="ld-led" cx="993" cy="272" r="1.7" fill="#62e59c" />

        {/* Warm air rising from the coffee */}
        <g transform="translate(982 517)" filter="url(#ld-soft)">
          <g className="ld-steam-puff">
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                className="ld-steam"
                style={{ animationDelay: `${-i * 1.4}s` }}
                d={i % 2 ? "M0 0 C 7 -10, -7 -20, 0 -30 S 7 -50, 0 -60" : "M0 0 C -7 -10, 7 -20, 0 -30 S -7 -50, 0 -60"}
                fill="none"
                stroke="#fffaf1"
                strokeWidth="7"
                strokeLinecap="round"
              />
            ))}
          </g>
        </g>
      </svg>

      {/* Invisible hover targets, drawn big-to-small so small things (webcam, mug, hand) win. */}
      <svg className="ld-hits" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {scene.hotspots.map((h) => (
          <polygon
            key={h.id}
            points={points(h.shape)}
            onPointerEnter={() => h.do.forEach(react)}
            onPointerDown={() => h.do.forEach(react)}
          />
        ))}
      </svg>
    </div>
  );
}
