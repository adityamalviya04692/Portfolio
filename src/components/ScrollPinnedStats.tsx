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

    type LockState = "idle" | "locked" | "holding" | "done";
    let state: LockState = "idle";
    let captureAttached = false;
    let inZone = false;
    let targetScrub = 0;
    let displayScrub = 0;
    let targetEntry = 0;
    let displayEntry = 0;
    let rafId = 0;
    let releaseTimer = 0;
    let lastTime = 0;
    let touchLastY = 0;
    let prevScrollY = window.scrollY;
    let anchorJumpUntil = 0;

    // High-physics critically-damped spring + elastic resistance state
    let springActive = false;
    let springY = window.scrollY;
    let springVel = 0;
    let springTargetY = 0;
    let tension = 0; // subtle 0..9px weighted rubber-band feedback while scrubbing
    let releaseRampUntil = 0;

    applyVisuals(0, 0, false);

    // Exact scrollY that frames Aditya's name, portrait, intro, and all 4 stat cards cleanly:
    // anchors directly to the bottom of the 4 stat cards (not the padded band wrapper) + 32px breathing room.
    const getLockY = () => {
      const targetEl = gridRef.current ?? hostRef.current;
      if (!targetEl) return 0;
      const rect = targetEl.getBoundingClientRect();
      const cardsBottomDoc = rect.bottom + window.scrollY;
      return Math.max(0, Math.round(cardsBottomDoc + 32 - window.innerHeight));
    };

    const setElasticOffset = (px: number) => {
      const gridEl = gridRef.current;
      if (!gridEl) return;
      if (Math.abs(px) < 0.08) {
        gridEl.style.transform = "";
      } else {
        gridEl.style.transform = `translate3d(0, ${(-px).toFixed(2)}px, 0)`;
      }
    };

    const startLoop = () => {
      if (rafId) return;
      lastTime = performance.now();

      const tick = (now: number) => {
        const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
        lastTime = now;

        // 1. Critically-damped spring glide onto lockY (zero jarring instant snap)
        let springDone = !springActive;
        if (springActive) {
          const stiffness = 135;
          const damping = 23.2; // critically damped: 2 * sqrt(135) ≈ 23.24
          const acc = stiffness * (springTargetY - springY) - damping * springVel;
          springVel += acc * dt;
          springY += springVel * dt;
          if (Math.abs(springTargetY - springY) < 0.45 && Math.abs(springVel) < 4) {
            springY = springTargetY;
            springVel = 0;
            springActive = false;
            springDone = true;
          }
          window.scrollTo({ top: springY, behavior: "instant" });
          prevScrollY = springY;
        }

        // 2. Smooth exponential decay of weighted elastic micro-tension
        tension *= Math.exp(-11 * dt);
        if (tension < 0.05) tension = 0;
        setElasticOffset(tension);
        const tensionDone = tension === 0;

        // 3. Smooth odometer + exponential curve interpolation
        const scrubAlpha = 1 - Math.exp(-8.8 * dt);
        const entryAlpha = 1 - Math.exp(-9.5 * dt);

        displayScrub += (targetScrub - displayScrub) * scrubAlpha;
        displayEntry += (targetEntry - displayEntry) * entryAlpha;

        const scrubDone = Math.abs(targetScrub - displayScrub) < 0.0008;
        const entryDone = Math.abs(targetEntry - displayEntry) < 0.0008;

        if (scrubDone) displayScrub = targetScrub;
        if (entryDone) displayEntry = targetEntry;

        applyVisuals(displayScrub, displayEntry, false);

        if (scrubDone && entryDone && springDone && tensionDone) {
          rafId = 0;
          return;
        }
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    const finishInstant = () => {
      state = "done";
      springActive = false;
      tension = 0;
      setElasticOffset(0);
      if (releaseTimer) {
        window.clearTimeout(releaseTimer);
        releaseTimer = 0;
      }
      targetScrub = 1;
      targetEntry = 1;
      displayScrub = 1;
      displayEntry = 1;
      applyVisuals(1, 1, false);
      detachCapture();
      window.removeEventListener("scroll", onScroll);
    };

    const enterHoldingPhase = () => {
      if (state === "holding" || state === "done") return;
      state = "holding";
      targetScrub = 1;
      targetEntry = 1;
      startLoop();
      if (releaseTimer) window.clearTimeout(releaseTimer);
      // Gentle settle beat so all 4 odometers & growth curve finish in view, then smoothly ramp release
      releaseTimer = window.setTimeout(() => {
        releaseTimer = 0;
        state = "done";
        releaseRampUntil = performance.now() + 260;
        window.setTimeout(() => {
          detachCapture();
          window.removeEventListener("scroll", onScroll);
        }, 280);
      }, 420);
    };

    const engageMagneticLock = (lockY: number, incomingVel = 0) => {
      state = "locked";
      targetEntry = 1;
      springTargetY = lockY;
      springY = window.scrollY;
      // Seed gentle spring velocity so arrival decelerates organically onto lockY
      springVel = Math.max(-650, Math.min(650, incomingVel));
      springActive = Math.abs(springTargetY - springY) > 1;
      if (!springActive) {
        window.scrollTo({ top: lockY, behavior: "instant" });
        prevScrollY = lockY;
      }
      startLoop();
    };

    const advanceByDelta = (deltaY: number) => {
      if (deltaY <= 0) return false;

      // Smooth breakaway ramp right after completion so scroll doesn't jerk from 0% to 100%
      if (state === "done") {
        const now = performance.now();
        if (now < releaseRampUntil) {
          const t = 1 - (releaseRampUntil - now) / 260;
          const easedGain = 0.22 + 0.78 * (t * t);
          window.scrollBy({ top: deltaY * easedGain, behavior: "instant" });
          prevScrollY = window.scrollY;
          return true;
        }
        return false;
      }

      const lockY = getLockY();
      const y = window.scrollY;

      if (state === "holding") {
        springTargetY = lockY;
        if (!springActive && Math.abs(y - lockY) > 1) {
          springY = y;
          springActive = true;
        }
        tension = Math.min(7, tension + Math.min(deltaY, 24) * 0.08);
        startLoop();
        return true;
      }

      if (state === "idle") {
        const distToLock = lockY - y;

        // Viscous magnetic approach zone (220px before lockY):
        // 1) Pre-roll the numbers early (0 -> 0.24) as the band glides in
        // 2) Apply progressive magnetic braking so heavy flicks decelerate smoothly instead of hitting a wall
        if (distToLock > 0 && distToLock <= 220) {
          const approachP = 1 - distToLock / 220;
          const preScrub = approachP * 0.24;
          if (preScrub > targetScrub) targetScrub = preScrub;
          targetEntry = Math.max(targetEntry, Math.min(1, approachP * 1.15));

          const dampingFactor = 0.22 + 0.78 * Math.pow(1 - approachP, 1.5);
          const dampedMove = Math.min(deltaY * dampingFactor, distToLock);

          if (dampedMove >= distToLock - 2 || distToLock <= 8) {
            engageMagneticLock(lockY, Math.min(deltaY * 6, 420));
            const excess = Math.max(0, deltaY * dampingFactor - distToLock);
            if (excess > 0) {
              targetScrub = Math.min(1, targetScrub + Math.min(excess, 32) / TOTAL_SCROLL_BUDGET);
            }
          } else {
            const nextY = y + dampedMove;
            window.scrollTo({ top: nextY, behavior: "instant" });
            prevScrollY = nextY;
          }
          startLoop();
          return true;
        }

        // Catch mega flicks that jump from >220px away right across lockY in a single wheel tick
        if (y < lockY && y + deltaY >= lockY - 6) {
          engageMagneticLock(lockY, 520);
          targetScrub = Math.max(targetScrub, 0.24);
          startLoop();
          return true;
        }

        if (y >= lockY - 6 && y <= lockY + 140) {
          engageMagneticLock(lockY, 0);
        } else {
          return false;
        }
      }

      // Locked in magnetic detent: keep spring anchored at lockY + weighted elastic micro-give while scrubbing numbers
      springTargetY = lockY;
      if (!springActive && Math.abs(y - lockY) > 1) {
        springY = y;
        springActive = true;
      }

      const step = Math.min(deltaY, 44) / TOTAL_SCROLL_BUDGET;
      targetScrub = Math.min(1, targetScrub + step);
      tension = Math.min(9, tension + Math.min(deltaY, 34) * 0.11);
      startLoop();

      if (targetScrub >= 0.994) {
        enterHoldingPhase();
      }
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (performance.now() < anchorJumpUntil) return;
      if (state === "done" && performance.now() >= releaseRampUntil) return;
      if (e.deltaY < 0) {
        if (state === "locked" || state === "holding") {
          if (releaseTimer) {
            window.clearTimeout(releaseTimer);
            releaseTimer = 0;
          }
          state = "idle";
          springActive = false;
        }
        return;
      }
      if (e.deltaY === 0) return;
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
      if (performance.now() < anchorJumpUntil || e.touches.length !== 1) return;
      if (state === "done" && performance.now() >= releaseRampUntil) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchLastY - currentY;
      touchLastY = currentY;
      if (deltaY < 0) {
        if (state === "locked" || state === "holding") {
          if (releaseTimer) {
            window.clearTimeout(releaseTimer);
            releaseTimer = 0;
          }
          state = "idle";
          springActive = false;
        }
        return;
      }
      if (deltaY === 0) return;
      if (advanceByDelta(deltaY * 1.45)) {
        e.preventDefault();
      }
    };

    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor && anchor.getAttribute("href") !== "#about") {
        anchorJumpUntil = performance.now() + 1000;
        springActive = false;
        if (state === "locked" || state === "holding") {
          state = "idle";
          if (releaseTimer) {
            window.clearTimeout(releaseTimer);
            releaseTimer = 0;
          }
        }
      }
    };

    const onHashChange = () => {
      anchorJumpUntil = performance.now() + 1000;
      springActive = false;
    };

    const attachCapture = () => {
      if (captureAttached || (state === "done" && performance.now() >= releaseRampUntil)) return;
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
      const y = window.scrollY;
      const scrollingDown = y > prevScrollY;
      const prev = prevScrollY;
      prevScrollY = y;

      if (state === "done") return;

      const el = hostRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const lockY = getLockY();

      if (performance.now() < anchorJumpUntil) {
        if (y > lockY + 120) finishInstant();
        return;
      }

      if ((state === "locked" || state === "holding") && !springActive && y > lockY + 1) {
        engageMagneticLock(lockY, -280);
        return;
      }

      if (state === "idle" && scrollingDown && prev <= lockY + 60 && y >= lockY) {
        attachCapture();
        engageMagneticLock(lockY, -260);
        return;
      }

      // Early pre-roll as the stats band enters the viewport before reaching lockY
      if (inZone && state === "idle") {
        const distToLock = lockY - y;
        if (distToLock > 0 && distToLock <= 260) {
          const preP = (1 - distToLock / 260) * 0.24;
          if (preP > targetScrub) {
            targetScrub = preP;
            startLoop();
          }
        }
        const rawEntry = (vh - rect.top) / (vh * 0.34);
        const nextEntry = Math.max(targetEntry, Math.max(0, Math.min(1, rawEntry)));
        if (nextEntry !== targetEntry) {
          targetEntry = nextEntry;
          startLoop();
        }
      }

      if (state === "idle" && prev > lockY + 260 && rect.bottom < 0) {
        finishInstant();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inZone = entry.isIntersecting;
        if (inZone && state !== "done") {
          attachCapture();
          onScroll();
        } else if (!inZone && state === "idle") {
          detachCapture();
        }
      },
      { rootMargin: "650px 0px" }
    );
    if (hostRef.current) io.observe(hostRef.current);

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      ro.disconnect();
      detachCapture();
      setElasticOffset(0);
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
      if (releaseTimer) window.clearTimeout(releaseTimer);
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
