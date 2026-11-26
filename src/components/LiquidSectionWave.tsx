import { memo, useEffect, useId, useMemo, useRef, useState } from "react";
import { useMotionPreference } from "./MotionSystem";
import "./LiquidSectionWave.css";

interface LiquidSectionWaveProps {
  /** "top" = rising blue liquid glass flowing UP from bottom into a .blue-section; "bottom" = draining liquid glass receding UP out of the screen from a .blue-section */
  edge: "top" | "bottom";
  /** Optional phase/asymmetry seed so multiple waves on the page feel organically distinct */
  seed?: number;
}

const VB_W = 1440;
const VB_H = 160;
const DISP_W = 256;
const DISP_H = 128;
const SEGMENTS = 40;

/**
 * Generates a smooth, continuous liquid-glass optical refraction field (Snell's Law lens map).
 * Because it is continuous across the fluid volume (neutral RGB(128,128,128) at the section seam,
 * increasing smoothly toward the liquid surface), the dynamically morphing wave clipPath always
 * reveals realistic glass refraction at 120fps with zero texture re-uploads.
 */
function generateContinuousGlassMap(edge: "top" | "bottom"): string {
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  canvas.width = DISP_W;
  canvas.height = DISP_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const img = ctx.createImageData(DISP_W, DISP_H);
  const data = img.data;
  const signY = edge === "top" ? -1 : 1;

  for (let y = 0; y < DISP_H; y++) {
    const v = y / (DISP_H - 1);
    // 0 at the solid section seam -> 1 near the open meniscus side
    const surfaceProx = edge === "top" ? 1 - v : v;
    const lensCurve = Math.pow(surfaceProx, 1.35);

    for (let x = 0; x < DISP_W; x++) {
      const u = x / (DISP_W - 1);
      const idx = (y * DISP_W + x) * 4;

      // Smooth organic liquid-glass curvature field
      const nx = Math.cos(u * Math.PI * 2.2) * 0.55 + Math.cos(u * Math.PI * 4.5 + 0.8) * 0.22;
      const ny = signY * (0.78 + 0.22 * Math.sin(u * Math.PI));

      const pushX = nx * lensCurve * 72;
      const pushY = ny * lensCurve * 96;

      data[idx] = Math.max(0, Math.min(255, Math.round(128 + pushX)));
      data[idx + 1] = Math.max(0, Math.min(255, Math.round(128 + pushY)));
      data[idx + 2] = 128;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  try {
    return canvas.toDataURL("image/png");
  } catch {
    return "";
  }
}

function detectChromiumBackdropFilter(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    ("chrome" in window || /Chrome|Chromium|Edg\//.test(ua)) &&
    !/Firefox|FxiOS/.test(ua)
  );
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Builds ultra-smooth quadratic Bezier paths for both normalized clipPath (0..1)
 * and viewBox (1440×160) liquid layers from a live array of normalized meniscus heights.
 */
function buildDynamicPaths(heights: Float32Array, edge: "top" | "bottom") {
  const n = heights.length - 1;
  let normD = "";
  let vbD = "";

  const firstY = heights[0];
  normD = `M 0 ${firstY.toFixed(4)}`;
  vbD = `M 0 ${(firstY * VB_H).toFixed(1)}`;

  for (let i = 0; i < n; i++) {
    const u0 = i / n;
    const u1 = (i + 1) / n;
    const um = (u0 + u1) * 0.5;
    const ym = (heights[i] + heights[i + 1]) * 0.5;

    normD += ` Q ${u0.toFixed(4)} ${heights[i].toFixed(4)} ${um.toFixed(4)} ${ym.toFixed(4)}`;
    vbD += ` Q ${(u0 * VB_W).toFixed(1)} ${(heights[i] * VB_H).toFixed(1)} ${(um * VB_W).toFixed(1)} ${(ym * VB_H).toFixed(1)}`;
  }

  const lastY = heights[n];
  normD += ` L 1 ${lastY.toFixed(4)}`;
  vbD += ` L ${VB_W} ${(lastY * VB_H).toFixed(1)}`;

  const normFill = edge === "top" ? `${normD} L 1 1 L 0 1 Z` : `${normD} L 1 0 L 0 0 Z`;
  const vbFill = edge === "top" ? `${vbD} L ${VB_W} ${VB_H} L 0 ${VB_H} Z` : `${vbD} L ${VB_W} 0 L 0 0 Z`;

  return { normFill, vbFill, vbRim: vbD };
}

/**
 * Live-morphing Apple Liquid Glass + blue water scroll transition.
 *
 * Real-life shallow-water physics:
 * - On scroll, the actual curved meniscus geometry morphs dynamically at 60–120fps:
 *   1. `edge="top"` (Freelance → Contact): water surges dramatically UP from the bottom seam as
 *      you scroll down, with a rolling asymmetric dome travelling smoothly across the viewport,
 *      inertial crest overshoot, and gravity + capillary surface ripples that settle naturally.
 *   2. `edge="bottom"` (Experience → Projects): water starts full at the border and visibly
 *      drains/recedes UP off the top of the screen as Projects rises into view.
 * - All optical layers (live Snell backdrop refraction clipPath, seamless --section-blue water
 *   volume, contour-hugging frosted glass wall, outer cobalt aura, and specular ice-white crest)
 *   update in lockstep every frame and pause completely (`0%` CPU) when offscreen.
 */
function LiquidSectionWave({ edge, seed = 0 }: LiquidSectionWaveProps) {
  const { reduced } = useMotionPreference();
  const rawId = useId();
  const uid = useMemo(() => `lg-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`, [rawId]);

  const hostRef = useRef<HTMLDivElement>(null);
  const clipNormPathRef = useRef<SVGPathElement>(null);
  const clipVbPathRef = useRef<SVGPathElement>(null);
  const bodyFillPathRef = useRef<SVGPathElement>(null);
  const innerFrostPathRef = useRef<SVGPathElement>(null);
  const innerCobaltPathRef = useRef<SVGPathElement>(null);
  const outerHaloPathRef = useRef<SVGPathElement>(null);
  const midCyanPathRef = useRef<SVGPathElement>(null);
  const specularPathRef = useRef<SVGPathElement>(null);
  const rimPeakStopRef = useRef<SVGStopElement>(null);
  const causticGradRef = useRef<SVGRadialGradientElement>(null);

  const [dispUrl, setDispUrl] = useState<string>("");
  const [useSvgBackdrop, setUseSvgBackdrop] = useState<boolean>(false);

  useEffect(() => {
    const chromium = detectChromiumBackdropFilter();
    setUseSvgBackdrop(chromium);
    if (chromium) {
      setDispUrl(generateContinuousGlassMap(edge));
    }
  }, [edge]);

  useEffect(() => {
    const hostEl = hostRef.current;
    if (!hostEl) return;

    const heights = new Float32Array(SEGMENTS + 1);

    const writeWaveFrame = (
      surge: number,
      peakX: number,
      sloshTilt: number,
      waveEnergy: number,
      phase: number
    ) => {
      // Base edge sits tightly anchored to the .blue-section seam
      const clampedSurge = Math.max(0.08, Math.min(1.0, surge));
      const baseHeight = 0.08 + clampedSurge * 0.24;
      const domeHeight = 0.10 + clampedSurge * 0.56;
      const rippleAmp = 0.022 + clampedSurge * 0.036 + waveEnergy * 0.095;

      for (let i = 0; i <= SEGMENTS; i++) {
        const u = i / SEGMENTS;

        // Asymmetric rolling liquid dome whose crest travels smoothly with scroll
        const sigma = u < peakX ? 0.30 : 0.39;
        const z = (u - peakX) / sigma;
        const dome = Math.exp(-0.5 * z * z);

        // Linear inertial tilt across the width when scrolling accelerates/stops
        const tilt = (u - 0.5) * sloshTilt * 0.26;

        // Travelling gravity wave (mode 1) + fine capillary shimmer (mode 2)
        const edgeFade = 0.28 + 0.72 * Math.sin(u * Math.PI);
        const gravityWave =
          Math.sin(u * Math.PI * 2.15 - phase * 1.65 + seed) * rippleAmp * 0.72;
        const capillaryWave =
          Math.cos(u * Math.PI * 4.1 + phase * 2.45 + seed * 1.4) * rippleAmp * 0.28;

        // Total upward liquid thickness from the solid .blue-section seam [0.06 .. 0.92]
        const thickness = Math.max(
          0.06,
          Math.min(0.92, baseHeight + dome * domeHeight + tilt + edgeFade * (gravityWave + capillaryWave))
        );

        heights[i] = edge === "top" ? 1 - thickness : thickness;
      }

      const { normFill, vbFill, vbRim } = buildDynamicPaths(heights, edge);

      if (clipNormPathRef.current) clipNormPathRef.current.setAttribute("d", normFill);
      if (clipVbPathRef.current) clipVbPathRef.current.setAttribute("d", vbFill);
      if (bodyFillPathRef.current) bodyFillPathRef.current.setAttribute("d", vbFill);
      if (innerFrostPathRef.current) innerFrostPathRef.current.setAttribute("d", vbRim);
      if (innerCobaltPathRef.current) innerCobaltPathRef.current.setAttribute("d", vbRim);
      if (outerHaloPathRef.current) outerHaloPathRef.current.setAttribute("d", vbRim);
      if (midCyanPathRef.current) midCyanPathRef.current.setAttribute("d", vbRim);
      if (specularPathRef.current) {
        specularPathRef.current.setAttribute("d", vbRim);
        const op = Math.min(1, 0.84 + clampedSurge * 0.08 + waveEnergy * 0.14);
        specularPathRef.current.setAttribute("opacity", op.toFixed(3));
      }

      // Move the brightest white specular highlight & submerged caustic directly with the rolling crest
      const peakPct = `${Math.round(Math.max(18, Math.min(82, peakX * 100)))}%`;
      if (rimPeakStopRef.current) rimPeakStopRef.current.setAttribute("offset", peakPct);
      if (causticGradRef.current) causticGradRef.current.setAttribute("cx", peakPct);
    };

    if (reduced) {
      writeWaveFrame(0.62, 0.42, 0, 0, seed);
      return;
    }

    let inView = false;
    let rafId = 0;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let phase = seed * 1.7;

    // Coupled physical water state
    let surge = edge === "top" ? 0.18 : 0.88;
    let surgeVel = 0;
    let peakX = edge === "top" ? 0.30 : 0.56;
    let slosh = 0;
    let sloshVel = 0;
    let waveEnergy = 0;

    const computeScrollTargets = () => {
      const rect = hostEl.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      // 0 when seam enters bottom of viewport -> 1 when seam exits top of viewport
      const viewPos = Math.max(0, Math.min(1, (vh - rect.top) / vh));

      if (edge === "top") {
        // Approaching Contact from Freelance:
        // Water starts sleek at bottom, then surges strongly UP from the bottom of the screen
        // as you scroll down, while the crest rolls gracefully across the width!
        const rise = smoothstep(0.0, 0.62, viewPos);
        const relax = smoothstep(0.76, 1.0, viewPos);
        const targetSurge = 0.16 + rise * 0.82 - relax * 0.14;
        const targetPeakX = 0.24 + viewPos * 0.38;
        return { targetSurge, targetPeakX };
      }

      // Leaving Experience into Projects:
      // Water starts full & heavy at the border, then visibly drains & pulls UP off the screen
      // as Projects scrolls upward into view!
      const drain = smoothstep(0.14, 0.88, viewPos);
      const targetSurge = 0.94 - drain * 0.78;
      const targetPeakX = 0.62 - viewPos * 0.34;
      return { targetSurge, targetPeakX };
    };

    const tick = (now: number) => {
      const dt = Math.min(0.032, Math.max(0.004, (now - lastTime) / 1000));
      lastTime = now;

      const { targetSurge, targetPeakX } = computeScrollTargets();

      // 1. Vertical water surge spring-damper (underdamped ζ ≈ 0.62 so water visibly surges & settles!)
      const kY = 34;
      const cY = 7.2;
      const accY = kY * (targetSurge - surge) - cY * surgeVel;
      surgeVel += accY * dt;
      surge += surgeVel * dt;

      // 2. Smooth crest travel across the horizontal width
      peakX += (targetPeakX - peakX) * (1 - Math.exp(-5.5 * dt));

      // 3. Inertial slosh tilt oscillator (underdamped ζ ≈ 0.34 for genuine sloshing water feel)
      const kS = 22;
      const cS = 3.2;
      const accS = -kS * slosh - cS * sloshVel;
      sloshVel += accS * dt;
      slosh += sloshVel * dt;

      // 4. Travelling surface-wave energy decay
      waveEnergy *= Math.exp(-2.1 * dt);
      if (waveEnergy < 0.002) waveEnergy = 0;

      // Living water phase speed accelerates noticeably during scroll, then glides calmly at rest
      phase += dt * (1.35 + waveEnergy * 3.8);

      writeWaveFrame(surge, peakX, slosh, waveEnergy, phase);

      if (inView && !document.hidden) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const startLoop = () => {
      if (rafId || !inView || document.hidden) return;
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY;
      lastScrollY = y;
      if (!inView) return;

      const clampedDy = Math.max(-160, Math.min(160, dy));
      const absDy = Math.abs(clampedDy);
      const dirSign = edge === "top" ? 1 : -1;

      // Inject scroll momentum into upward surge, lateral slosh, and travelling ripples
      surgeVel = Math.max(-3.6, Math.min(3.6, surgeVel + clampedDy * 0.011 * dirSign));
      sloshVel = Math.max(-5.2, Math.min(5.2, sloshVel + clampedDy * 0.032 * dirSign));
      waveEnergy = Math.min(1.2, waveEnergy + Math.min(0.45, absDy * 0.012));

      startLoop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          const { targetSurge, targetPeakX } = computeScrollTargets();
          surge = targetSurge;
          peakX = targetPeakX;
          surgeVel = 0;
          lastScrollY = window.scrollY;
          startLoop();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { rootMargin: "240px 0px" }
    );
    io.observe(hostEl);

    const onVis = () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (!document.hidden && inView) {
        startLoop();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    const init = computeScrollTargets();
    surge = init.targetSurge;
    peakX = init.targetPeakX;
    writeWaveFrame(surge, peakX, 0, 0, phase);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [edge, seed, reduced]);

  const clipNormId = `${uid}-clip-norm`;
  const clipVbId = `${uid}-clip-vb`;
  const refractFilterId = `${uid}-refract`;
  const haloBlurId = `${uid}-halo`;
  const innerGlassBlurId = `${uid}-inner`;
  const rimGlowId = `${uid}-rimglow`;
  const bodyGradId = `${uid}-body`;
  const rimGradId = `${uid}-rim`;
  const causticGradId = `${uid}-caustic`;

  const backdropStyle =
    useSvgBackdrop && dispUrl
      ? {
          clipPath: `url(#${clipNormId})`,
          WebkitClipPath: `url(#${clipNormId})`,
          backdropFilter: `url(#${refractFilterId}) blur(6px) saturate(1.48) brightness(1.04)`,
          WebkitBackdropFilter: `url(#${refractFilterId}) blur(6px) saturate(1.48) brightness(1.04)`,
        }
      : {
          clipPath: `url(#${clipNormId})`,
          WebkitClipPath: `url(#${clipNormId})`,
          backdropFilter: "blur(12px) saturate(1.62) brightness(1.05)",
          WebkitBackdropFilter: "blur(12px) saturate(1.62) brightness(1.05)",
        };

  return (
    <div ref={hostRef} className={`liquid-seam is-${edge}`} aria-hidden="true">
      {/* Hidden non-display:none SVG defs for live objectBoundingBox clipPath + sRGB Snell refraction */}
      <svg className="liquid-defs-svg" focusable="false">
        <defs>
          <clipPath id={clipNormId} clipPathUnits="objectBoundingBox">
            <path ref={clipNormPathRef} />
          </clipPath>

          {dispUrl && (
            <filter
              id={refractFilterId}
              x="-4%"
              y="-8%"
              width="108%"
              height="116%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={dispUrl}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                result="dispMap"
              />
              {/* 3-channel chromatic prism dispersion (Apple Liquid Glass signature) */}
              <feDisplacementMap
                in="SourceGraphic"
                in2="dispMap"
                scale="24"
                xChannelSelector="R"
                yChannelSelector="G"
                result="dispR"
              />
              <feColorMatrix
                in="dispR"
                type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="rChan"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="dispMap"
                scale="20"
                xChannelSelector="R"
                yChannelSelector="G"
                result="dispG"
              />
              <feColorMatrix
                in="dispG"
                type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="gChan"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="dispMap"
                scale="16"
                xChannelSelector="R"
                yChannelSelector="G"
                result="dispB"
              />
              <feColorMatrix
                in="dispB"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="bChan"
              />
              <feBlend in="rChan" in2="gChan" mode="screen" result="rg" />
              <feBlend in="rg" in2="bChan" mode="screen" result="prism" />
              <feGaussianBlur in="prism" stdDeviation="1.05" />
            </filter>
          )}
        </defs>
      </svg>

      {/* Border-contained live fluid viewport */}
      <div className="liquid-seam-viewport">
        <div className="liquid-glass-stage">
          {/* Layer 1: Live DOM optical glass refraction & frosted water backdrop */}
          <div className="liquid-glass-backdrop" style={backdropStyle} />

          {/* Layer 2 & 3: Live-morphing translucent water volume, caustics, blue aura & specular crest */}
          <svg
            className="liquid-glass-svg"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            focusable="false"
          >
            <defs>
              <clipPath id={clipVbId}>
                <path ref={clipVbPathRef} />
              </clipPath>

              <filter id={haloBlurId} x="-6%" y="-45%" width="112%" height="190%">
                <feGaussianBlur stdDeviation="9.5" />
              </filter>

              <filter id={innerGlassBlurId} x="-6%" y="-45%" width="112%" height="190%">
                <feGaussianBlur stdDeviation="13" />
              </filter>

              <filter id={rimGlowId} x="-4%" y="-45%" width="108%" height="190%">
                <feGaussianBlur stdDeviation="2.1" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient
                id={bodyGradId}
                x1="0"
                y1={edge === "top" ? "0" : "1"}
                x2="0"
                y2={edge === "top" ? "1" : "0"}
              >
                <stop offset="0%" className="lg-stop-top" />
                <stop offset="20%" className="lg-stop-upper" />
                <stop offset="44%" className="lg-stop-mid" />
                <stop offset="68%" className="lg-stop-deep" />
                <stop offset="84%" className="lg-stop-seam" />
                <stop offset="100%" className="lg-stop-seam" />
              </linearGradient>

              <radialGradient
                ref={causticGradRef}
                id={causticGradId}
                cx="42%"
                cy={edge === "top" ? "44%" : "56%"}
                rx="42%"
                ry="30%"
              >
                <stop offset="0%" className="lg-caustic-core" />
                <stop offset="55%" className="lg-caustic-mid" />
                <stop offset="100%" stopColor="rgba(16, 43, 121, 0)" />
              </radialGradient>

              <linearGradient id={rimGradId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(135, 194, 255, 0.56)" />
                <stop offset="20%" stopColor="rgba(220, 240, 255, 0.94)" />
                <stop ref={rimPeakStopRef} offset="42%" stopColor="rgba(255, 255, 255, 1)" />
                <stop offset="78%" stopColor="rgba(210, 234, 255, 0.92)" />
                <stop offset="100%" stopColor="rgba(130, 188, 255, 0.54)" />
              </linearGradient>
            </defs>

            <path ref={bodyFillPathRef} fill={`url(#${bodyGradId})`} />

            <g clipPath={`url(#${clipVbId})`}>
              <rect x="0" y="0" width={VB_W} height={VB_H} fill={`url(#${causticGradId})`} />
              <path
                ref={innerFrostPathRef}
                className="lg-inner-frost-wall"
                filter={`url(#${innerGlassBlurId})`}
              />
              <path
                ref={innerCobaltPathRef}
                className="lg-inner-cobalt-band"
                filter={`url(#${haloBlurId})`}
              />
            </g>

            <path
              ref={outerHaloPathRef}
              className="lg-outer-halo"
              filter={`url(#${haloBlurId})`}
            />

            <path
              ref={midCyanPathRef}
              className="lg-mid-cyan-rim"
              filter={`url(#${rimGlowId})`}
            />

            <path
              ref={specularPathRef}
              className="lg-specular-crest"
              stroke={`url(#${rimGradId})`}
              filter={`url(#${rimGlowId})`}
            />
          </svg>
        </div>
      </div>

      {/* Zero-gap solid seam apron locking the base cleanly into .blue-section */}
      <div className="liquid-seam-apron" />
    </div>
  );
}

export default memo(LiquidSectionWave);
