import { useEffect, useId, useMemo, useRef } from "react";
import { useMotionPreference } from "./MotionSystem";
import "./ScrollPinnedStats.css";

interface StatItem {
  value: string;
  label: string;
}

type StatToken =
  | { kind: "digit"; digit: number; digitIndex: number; flatIndex: number }
  | { kind: "unit"; text: string }
  | { kind: "symbol"; text: string };

interface DigitMeta {
  cardIdx: number;
  digitIndex: number;
  digit: number;
  totalSteps: number;
}

const DIGIT_STRIP = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];

const CELL_HEIGHT_EM = 1.12;
const TOTAL_SCROLL_BUDGET = 480; // px of downward scroll for full reveal

// Cubic Bezier for the full-width 30–39° slanted exponential curve (viewBox 1440 × 460)
// Flows smoothly from bottom-left (0, 446) all the way to the far right edge (1440, 18) with zero top cut.
const VB_W = 1440;
const VB_H = 460;
const P0 = { x: 0, y: 446 };
const P1 = { x: 460, y: 444 };
const P2 = { x: 1020, y: 356 };
const P3 = { x: 1440, y: 18 };

function evalCurve(t: number) {
  const u = 1 - t;
  const u2 = u * u;
  const u3 = u2 * u;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: u3 * P0.x + 3 * u2 * t * P1.x + 3 * u * t2 * P2.x + t3 * P3.x,
    y: u3 * P0.y + 3 * u2 * t * P1.y + 3 * u * t2 * P2.y + t3 * P3.y,
  };
}

function tokenizeAllStats(stats: readonly StatItem[]) {
  const digitMetas: DigitMeta[] = [];
  const parsed = stats.map((stat, cardIdx) => {
    const tokens: StatToken[] = [];
    let digitIndex = 0;
    let i = 0;
    const raw = stat.value;

    while (i < raw.length) {
      const ch = raw[i];

      if (ch >= "0" && ch <= "9") {
        const digit = Number(ch);
        const totalSteps = digit === 0 || digitIndex > 0 ? 10 + digit : digit;
        const flatIndex = digitMetas.length;
        digitMetas.push({ cardIdx, digitIndex, digit, totalSteps });
        tokens.push({ kind: "digit", digit, digitIndex, flatIndex });
        digitIndex += 1;
        i += 1;
        continue;
      }

      if (/[A-Za-z]/.test(ch)) {
        let end = i + 1;
        while (end < raw.length && /[A-Za-z/]/.test(raw[end])) {
          end += 1;
        }
        tokens.push({ kind: "unit", text: raw.slice(i, end) });
        i = end;
        continue;
      }

      if (ch === " ") {
        i += 1;
        continue;
      }

      tokens.push({ kind: "symbol", text: ch });
      i += 1;
    }

    return { ...stat, tokens };
  });

  return { parsed, digitMetas };
}

/**
 * Compact Bilt-inspired rolling odometer metrics band with a full-width,
 * uncut Attio-style exponential growth graph + live leading pointer & vertical
 * progress guide line sweeping all the way to the right edge of the display.
 */
export default function ScrollPinnedStats({ stats }: { stats: readonly StatItem[] }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const pointerDotRef = useRef<HTMLSpanElement>(null);
  const pointerLineRef = useRef<HTMLSpanElement>(null);
  const digitStripRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { reduced } = useMotionPreference();
  const uid = useId().replace(/:/g, "");

  const { parsed: parsedStats, digitMetas } = useMemo(
    () => tokenizeAllStats(stats),
    [stats]
  );

  useEffect(() => {
    const applyVisuals = (scrubP: number, entryP: number, instant = false) => {
      const gridEl = gridRef.current;
      if (gridEl) {
        const rolling = !instant && scrubP > 0.002 && scrubP < 0.996;
        gridEl.classList.toggle("is-rolling", rolling);
      }

      // Update every digit reel directly on the GPU without React re-renders
      for (let i = 0; i < digitMetas.length; i++) {
        const stripEl = digitStripRefs.current[i];
        if (!stripEl) continue;
        const meta = digitMetas[i];

        if (instant) {
          stripEl.style.transform = `translate3d(0, ${-(meta.digit * CELL_HEIGHT_EM).toFixed(4)}em, 0)`;
          continue;
        }

        const cardStart = meta.cardIdx * 0.065;
        const cardSpan = 1 - cardStart;
        const cardP = Math.max(0, Math.min(1, (scrubP - cardStart) / cardSpan));

        const digitDelay = Math.min(0.16, meta.digitIndex * 0.05);
        const localP = Math.max(0, Math.min(1, (cardP - digitDelay) / (1 - digitDelay)));

        const eased = 1 - Math.pow(1 - localP, 3.3);
        const rowOffset = meta.totalSteps * eased;
        stripEl.style.transform = `translate3d(0, ${-(rowOffset * CELL_HEIGHT_EM).toFixed(4)}em, 0)`;
      }

      // Evaluate exact tip (x, y) on the cubic Bezier so the curve, hatch, vertical guide line,
      // and circular pointer stay 100% pixel-locked together all the way to the right edge.
      const graphLinear = instant ? 1 : Math.min(1, entryP * 0.14 + scrubP * 0.86);
      const t = 1 - Math.pow(1 - graphLinear, 2.2);
      const pt = evalCurve(t);

      const clipRect = clipRectRef.current;
      if (clipRect) {
        clipRect.setAttribute("width", pt.x.toFixed(2));
      }

      const xPct = (pt.x / VB_W) * 100;
      const yPct = (pt.y / VB_H) * 100;
      const visibleOpacity = graphLinear > 0.008 ? "1" : "0";

      const dotEl = pointerDotRef.current;
      if (dotEl) {
        dotEl.style.left = `${xPct.toFixed(3)}%`;
        dotEl.style.top = `${yPct.toFixed(3)}%`;
        dotEl.style.opacity = visibleOpacity;
      }

      const lineEl = pointerLineRef.current;
      if (lineEl) {
        lineEl.style.left = `${xPct.toFixed(3)}%`;
        lineEl.style.top = `${yPct.toFixed(3)}%`;
        lineEl.style.opacity = visibleOpacity;
      }
    };

    if (reduced) {
      applyVisuals(1, 1, true);
      return;
    }

    let completed = false;
    let targetScrub = 0;
    let displayScrub = 0;
    let targetEntry = 0;
    let displayEntry = 0;
    let rafId = 0;
    let lastTime = 0;
    let touchLastY = 0;

    applyVisuals(0, 0, false);

    const startLoop = () => {
      if (rafId) return;
      lastTime = performance.now();

      const tick = (now: number) => {
        const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
        lastTime = now;

        const scrubAlpha = 1 - Math.exp(-8.8 * dt);
        const entryAlpha = 1 - Math.exp(-9.5 * dt);

        displayScrub += (targetScrub - displayScrub) * scrubAlpha;
        displayEntry += (targetEntry - displayEntry) * entryAlpha;

        const scrubDone = Math.abs(targetScrub - displayScrub) < 0.0008;
        const entryDone = Math.abs(targetEntry - displayEntry) < 0.0008;

        if (scrubDone) displayScrub = targetScrub;
        if (entryDone) displayEntry = targetEntry;

        applyVisuals(displayScrub, displayEntry, false);

        if (scrubDone && entryDone) {
          rafId = 0;
          return;
        }
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    const isInHoldZone = () => {
      const el = hostRef.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return rect.top <= vh * 0.8 && rect.bottom >= vh * 0.18;
    };

    const advanceByDelta = (deltaY: number) => {
      if (completed || deltaY <= 0) return false;
      if (!isInHoldZone()) return false;

      const step = Math.min(deltaY, 56) / TOTAL_SCROLL_BUDGET;
      targetScrub = Math.min(1, targetScrub + step);
      startLoop();

      if (targetScrub >= 0.994) {
        completed = true;
        targetScrub = 1;
        targetEntry = 1;
        removeCaptureListeners();
        return false;
      }
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (completed) return;
      if (e.deltaY <= 0) return; // Never hold upward scrolling
      if (advanceByDelta(e.deltaY)) {
        e.preventDefault();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchLastY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (completed || e.touches.length !== 1) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchLastY - currentY;
      touchLastY = currentY;
      if (deltaY <= 0) return; // Never hold upward scrolling
      if (advanceByDelta(deltaY * 1.45)) {
        e.preventDefault();
      }
    };

    const onScroll = () => {
      const el = hostRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const rawEntry = (vh - rect.top) / (vh * 0.34);
      const nextEntry = Math.max(targetEntry, Math.max(0, Math.min(1, rawEntry)));
      if (nextEntry !== targetEntry) {
        targetEntry = nextEntry;
        startLoop();
      }

      if (!completed && rect.bottom < vh * 0.14) {
        completed = true;
        targetScrub = 1;
        targetEntry = 1;
        displayScrub = 1;
        displayEntry = 1;
        applyVisuals(1, 1, false);
        removeCaptureListeners();
      }
    };

    const removeCaptureListeners = () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      removeCaptureListeners();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced, digitMetas]);

  const hatchId = `attio-hatch-${uid}`;
  const washId = `attio-wash-${uid}`;
  const areaClipId = `attio-area-clip-${uid}`;
  const revealClipId = `attio-reveal-clip-${uid}`;

  const curvePath = `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`;
  const areaPath = `${curvePath} L ${VB_W} ${VB_H} L 0 ${VB_H} Z`;

  return (
    <div
      ref={hostRef}
      className="stats-scroll-band"
      aria-label="Key production metrics"
    >
      {/* Full-width Attio-inspired exponential graph extending cleanly to the far right edge */}
      <div className="stats-attio-bg" aria-hidden="true">
        <svg
          className="stats-attio-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <pattern
              id={hatchId}
              width="11"
              height="11"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="11"
                className="stats-attio-hatch-line"
              />
            </pattern>
            <linearGradient id={washId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className="stats-attio-wash-top" />
              <stop offset="100%" className="stats-attio-wash-bottom" />
            </linearGradient>
            <clipPath id={areaClipId}>
              <path d={areaPath} />
            </clipPath>
            <clipPath id={revealClipId}>
              <rect
                ref={clipRectRef}
                x="0"
                y="0"
                width={reduced ? VB_W : 0}
                height={VB_H}
              />
            </clipPath>
          </defs>

          <g clipPath={`url(#${revealClipId})`}>
            <g clipPath={`url(#${areaClipId})`}>
              <rect x="0" y="0" width={VB_W} height={VB_H} fill={`url(#${washId})`} />
              <rect x="0" y="0" width={VB_W} height={VB_H} fill={`url(#${hatchId})`} />
            </g>
            <path
              d={curvePath}
              fill="none"
              className="stats-attio-stroke"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {/* Leading vertical progress line + circular pointer riding on the front tip of the curve */}
        <span ref={pointerLineRef} className="stats-attio-pointer-line" />
        <span ref={pointerDotRef} className="stats-attio-pointer-dot" />
      </div>

      <div className="section-wrap stats-sticky-inner">
        <div ref={gridRef} className="stats-bilt-grid" role="list">
          {parsedStats.map((stat) => (
            <div key={stat.label} className="stats-bilt-card" role="listitem">
              <div className="stats-bilt-value" aria-label={stat.value}>
                {stat.tokens.map((token, tokIdx) => {
                  if (token.kind === "digit") {
                    return (
                      <span
                        key={tokIdx}
                        className="bilt-digit-viewport"
                        aria-hidden="true"
                      >
                        <span
                          ref={(el) => {
                            digitStripRefs.current[token.flatIndex] = el;
                          }}
                          className="bilt-digit-strip"
                          style={{
                            transform: `translate3d(0, ${
                              reduced ? -(token.digit * CELL_HEIGHT_EM) : 0
                            }em, 0)`,
                          }}
                        >
                          {DIGIT_STRIP.map((n, stripIdx) => (
                            <span key={stripIdx} className="bilt-digit-cell">
                              {n}
                            </span>
                          ))}
                        </span>
                      </span>
                    );
                  }

                  if (token.kind === "unit") {
                    return (
                      <span key={tokIdx} className="bilt-unit" aria-hidden="true">
                        {token.text}
                      </span>
                    );
                  }

                  return (
                    <span key={tokIdx} className="bilt-symbol" aria-hidden="true">
                      {token.text}
                    </span>
                  );
                })}
              </div>
              <p className="stats-bilt-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
