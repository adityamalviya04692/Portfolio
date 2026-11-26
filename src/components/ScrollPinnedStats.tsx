import { memo, useEffect, useId, useMemo, useRef } from "react";
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
const REVEAL_DURATION_MS = 1480;

// Cubic Bezier for the full-width 30–39° slanted exponential curve (viewBox 1440 × 460)
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
 * GPU-composited Attio-style exponential growth graph + leading progress pointer.
 *
 * Zero scroll-locking / zero wheel-hijacking:
 * - Never intercepts wheel/touch events or calls window.scrollTo(), keeping Chrome's
 *   threaded compositor scroll 100% native and flutter-free.
 * - Triggers automatically when the metrics band enters view and plays a silky,
 *   staggered 120fps odometer roll + exponential curve sweep (boosted gracefully if
 *   the visitor scrolls quickly so numbers always finish cleanly in view).
 */
function ScrollPinnedStats({ stats }: { stats: readonly StatItem[] }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const svgRevealRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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
    let bgW = bgRef.current?.clientWidth || window.innerWidth;
    let bgH = bgRef.current?.clientHeight || 360;
    let wasRolling = false;
    let wasVisible = false;
    let lastDrawnP = -1;

    const applyVisuals = (p: number, instant = false) => {
      const clamped = instant ? 1 : Math.max(0, Math.min(1, p));
      if (!instant && Math.abs(clamped - lastDrawnP) < 0.0001) return;
      lastDrawnP = clamped;

      const gridEl = gridRef.current;
      if (gridEl) {
        const rolling = !instant && clamped > 0.002 && clamped < 0.996;
        if (rolling !== wasRolling) {
          wasRolling = rolling;
          gridEl.classList.toggle("is-rolling", rolling);
        }
      }

      for (let i = 0; i < digitMetas.length; i++) {
        const stripEl = digitStripRefs.current[i];
        if (!stripEl) continue;
        const meta = digitMetas[i];

        if (instant) {
          stripEl.style.transform = `translate3d(0, ${-(meta.digit * CELL_HEIGHT_EM).toFixed(4)}em, 0)`;
          continue;
        }

        // Smooth staggered cascade across the 4 cards and individual digits
        const cardStart = meta.cardIdx * 0.075;
        const cardSpan = 1 - cardStart;
        const cardP = Math.max(0, Math.min(1, (clamped - cardStart) / cardSpan));

        const digitDelay = Math.min(0.16, meta.digitIndex * 0.05);
        const localP = Math.max(0, Math.min(1, (cardP - digitDelay) / (1 - digitDelay)));

        // Quartic ease-out for a silky, mechanical watch-like deceleration into the final digit
        const eased = 1 - Math.pow(1 - localP, 3.8);
        const rowOffset = meta.totalSteps * eased;
        stripEl.style.transform = `translate3d(0, ${-(rowOffset * CELL_HEIGHT_EM).toFixed(4)}em, 0)`;
      }

      // Evaluate exact tip (x, y) on the cubic Bezier
      const t = instant ? 1 : 1 - Math.pow(1 - clamped, 2.35);
      const pt = evalCurve(t);

      const xFrac = pt.x / VB_W;
      const yFrac = pt.y / VB_H;
      const rightInsetPct = Math.max(0, (1 - xFrac) * 100);

      const revealEl = svgRevealRef.current;
      if (revealEl) {
        revealEl.style.clipPath =
          rightInsetPct <= 0.05 ? "inset(0 0% 0 0)" : `inset(0 ${rightInsetPct.toFixed(3)}% 0 0)`;
      }

      const px = xFrac * bgW;
      const py = yFrac * bgH;
      const isVisible = clamped > 0.006;

      const dotEl = pointerDotRef.current;
      if (dotEl) {
        dotEl.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0) translate(-50%, -50%)`;
        if (isVisible !== wasVisible) dotEl.style.opacity = isVisible ? "1" : "0";
      }

      const lineEl = pointerLineRef.current;
      if (lineEl) {
        const lineScaleY = Math.max(0, 1 - yFrac);
        lineEl.style.transform = `translate3d(${px.toFixed(2)}px, 0, 0) translateX(-50%) scaleY(${lineScaleY.toFixed(4)})`;
        if (isVisible !== wasVisible) lineEl.style.opacity = isVisible ? "1" : "0";
      }
      wasVisible = isVisible;
    };

    const ro = new ResizeObserver(() => {
      if (bgRef.current) {
        bgW = bgRef.current.clientWidth || bgW;
        bgH = bgRef.current.clientHeight || bgH;
      }
      if (reduced || lastDrawnP >= 0.999) {
        lastDrawnP = -1;
        applyVisuals(1, true);
      } else if (lastDrawnP >= 0) {
        const prev = lastDrawnP;
        lastDrawnP = -1;
        applyVisuals(prev, false);
      }
    });
    if (bgRef.current) ro.observe(bgRef.current);

    if (reduced) {
      applyVisuals(1, true);
      return () => ro.disconnect();
    }

    let started = false;
    let finished = false;
    let startTime = 0;
    let rafId = 0;

    applyVisuals(0, false);

    const startReveal = () => {
      if (started || finished) return;
      started = true;
      startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / REVEAL_DURATION_MS);
        applyVisuals(p, false);

        if (p >= 1) {
          finished = true;
          rafId = 0;
          return;
        }
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    // If the visitor landed mid-page already past the metrics band, snap straight to final values
    const hostEl = hostRef.current;
    if (hostEl) {
      const rect = hostEl.getBoundingClientRect();
      if (rect.bottom < 0) {
        finished = true;
        applyVisuals(1, true);
        return () => ro.disconnect();
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startReveal();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (hostEl) io.observe(hostEl);

    return () => {
      io.disconnect();
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced, digitMetas]);

  const hatchId = `attio-hatch-${uid}`;
  const washId = `attio-wash-${uid}`;
  const areaClipId = `attio-area-clip-${uid}`;

  const curvePath = `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`;
  const areaPath = `${curvePath} L ${VB_W} ${VB_H} L 0 ${VB_H} Z`;

  return (
    <div
      ref={hostRef}
      className="stats-scroll-band"
      aria-label="Key production metrics"
    >
      {/* Full-width Attio-inspired exponential graph revealed via GPU-composited clip-path */}
      <div ref={bgRef} className="stats-attio-bg" aria-hidden="true">
        <div
          ref={svgRevealRef}
          className="stats-attio-reveal"
          style={{ clipPath: reduced ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
        >
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
            </defs>

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
          </svg>
        </div>

        {/* GPU-transformed vertical progress line + circular pointer on the front tip */}
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

export default memo(ScrollPinnedStats);
