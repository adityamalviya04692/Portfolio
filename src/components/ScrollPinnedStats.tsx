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
const TOTAL_SCROLL_BUDGET = 460; // px of downward scroll for full reveal

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
 * Chrome 120fps optimizations:
 * - Static pre-rasterized SVG revealed via compositor `clip-path: inset(...)` (zero SVG re-rasterization).
 * - Pointer dot & vertical guide line moved strictly via `translate3d` (zero Layout/Paint per frame).
 * - Non-passive `wheel`/`touchmove` capture is attached ONLY while this band is in the viewport
 *   so the rest of the page stays on Chrome's fast threaded compositor scroll path.
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

    const applyVisuals = (scrubP: number, entryP: number, instant = false) => {
      const gridEl = gridRef.current;
      if (gridEl) {
        const rolling = !instant && scrubP > 0.002 && scrubP < 0.996;
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

        const cardStart = meta.cardIdx * 0.065;
        const cardSpan = 1 - cardStart;
        const cardP = Math.max(0, Math.min(1, (scrubP - cardStart) / cardSpan));

        const digitDelay = Math.min(0.16, meta.digitIndex * 0.05);
        const localP = Math.max(0, Math.min(1, (cardP - digitDelay) / (1 - digitDelay)));

        const eased = 1 - Math.pow(1 - localP, 3.3);
        const rowOffset = meta.totalSteps * eased;
        stripEl.style.transform = `translate3d(0, ${-(rowOffset * CELL_HEIGHT_EM).toFixed(4)}em, 0)`;
      }

      // Evaluate exact tip (x, y) on the cubic Bezier
      const graphLinear = instant ? 1 : Math.min(1, entryP * 0.14 + scrubP * 0.86);
      const t = 1 - Math.pow(1 - graphLinear, 2.2);
      const pt = evalCurve(t);

      const xFrac = pt.x / VB_W;
      const yFrac = pt.y / VB_H;
      const rightInsetPct = Math.max(0, (1 - xFrac) * 100);

      const revealEl = svgRevealRef.current;
      if (revealEl) {
        revealEl.style.clipPath = rightInsetPct <= 0.05 ? "inset(0 0% 0 0)" : `inset(0 ${rightInsetPct.toFixed(3)}% 0 0)`;
      }

      const px = xFrac * bgW;
      const py = yFrac * bgH;
      const isVisible = graphLinear > 0.008;

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
      if (reduced) applyVisuals(1, 1, true);
    });
    if (bgRef.current) ro.observe(bgRef.current);

    if (reduced) {
      applyVisuals(1, 1, true);
      return () => ro.disconnect();
    }

    let completed = false;
    let captureAttached = false;
    let inViewport = false;
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
        detachCapture();
        window.removeEventListener("scroll", onScroll);
        return false;
      }
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (completed || e.deltaY <= 0) return;
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
      if (deltaY <= 0) return;
      if (advanceByDelta(deltaY * 1.45)) {
        e.preventDefault();
      }
    };

    const attachCapture = () => {
      if (captureAttached || completed) return;
      captureAttached = true;
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
    };

    const detachCapture = () => {
      if (!captureAttached) return;
      captureAttached = false;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };

    const onScroll = () => {
      if (!inViewport && !completed) {
        const el = hostRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < window.innerHeight * 0.14) {
          completed = true;
          targetScrub = 1;
          targetEntry = 1;
          displayScrub = 1;
          displayEntry = 1;
          applyVisuals(1, 1, false);
          detachCapture();
          window.removeEventListener("scroll", onScroll);
        }
        return;
      }
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
        detachCapture();
        window.removeEventListener("scroll", onScroll);
      }
    };

    // Scope non-passive wheel capture strictly to when the stats band is in view!
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport && !completed) {
          attachCapture();
          onScroll();
        } else {
          detachCapture();
        }
      },
      { rootMargin: "40px 0px" }
    );
    if (hostRef.current) io.observe(hostRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      ro.disconnect();
      detachCapture();
      window.removeEventListener("scroll", onScroll);
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
