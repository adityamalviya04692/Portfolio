import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { RippleWord } from "./HeadingRipples";
import ThemeToggle from "./ThemeToggle";
import { useIntroState, useMotionPreference } from "./MotionSystem";
import "./DeltaNavbar.css";

const LEFT_NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
] as const;

const RIGHT_NAV = [
  { id: "research", label: "Research" },
  { id: "freelance", label: "Freelance" },
  { id: "contact", label: "Contact" },
] as const;

const ALL_NAV = [...LEFT_NAV, ...RIGHT_NAV];

/**
 * Decoupled two-axis cell-division / liquid-fusion physics icon (`curl` + `split`):
 * - `curl`  (0 = horizontal wave, 1 = 100% upright vertical `||` pause bars)
 * - `split` (0 = unified center, 0..0.54 = taut thinning liquid bridge, 0.54..1 = ruptured!)
 *
 * Behavior:
 * 1. Idle Playing (`!paused && !hovered`): `curl = 0, split = 0` -> smooth flowing harmonic wave.
 * 2. Hover Playing (`!paused && hovered`): `curl -> 0.96, split -> 0.44` -> wave immediately
 *    curls into two unmistakable upright `||` Pause bars still tethered at the waist by a
 *    trembling, razor-thin liquid filament — crystal-clear visual affordance for "Click to Pause".
 * 3. Click to Pause (`!paused -> paused`): `split` rockets past `0.54` -> RUPTURE! The filament
 *    snaps with an expanding shockwave ring + 6 micro-droplets while both upright `||` bars whip
 *    outward and ring like plucked strings before locking into solid Pause (`||`).
 * 4. Hover Paused (`paused && hovered`): `curl -> 0.18, split -> 0.58` -> the two bars bow
 *    magnetically inward and unfold into a living wave preview, telegraphing "Click to Resume".
 * 5. Click to Resume (`paused -> !paused`): bars accelerate sharply together, snap-fuse across
 *    a swelling liquid bridge with a fusion shockwave ring, and launch a big elastic ripple
 *    across the unified flowing wave.
 */
function WaveToPauseIcon({ paused, hovered }: { paused: boolean; hovered: boolean }) {
  const leftRef = useRef<SVGPathElement>(null);
  const rightRef = useRef<SVGPathElement>(null);
  const bridgeRef = useRef<SVGPathElement>(null);
  const shockRef = useRef<SVGCircleElement>(null);
  const dropRefs = [
    useRef<SVGCircleElement>(null),
    useRef<SVGCircleElement>(null),
    useRef<SVGCircleElement>(null),
    useRef<SVGCircleElement>(null),
    useRef<SVGCircleElement>(null),
    useRef<SVGCircleElement>(null),
  ];

  const stateRef = useRef({
    curl: paused ? 1 : 0,
    split: paused ? 1 : 0,
    paused,
    hovered,
    phase: 0,
    recoil: 0, // >0 = outward break whip, <0 = inward fusion splash
    recoilAge: 10,
    wasBroken: paused,
    lastTime: performance.now(),
  });

  useEffect(() => {
    const s = stateRef.current;
    s.paused = paused;
    s.hovered = hovered;
    s.lastTime = performance.now();

    let raf = 0;

    const buildSmoothPath = (pts: [number, number][]) => {
      if (pts.length < 2) return "";
      let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) * 0.5;
        const my = (pts[i][1] + pts[i + 1][1]) * 0.5;
        d += ` Q ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
      }
      const last = pts[pts.length - 1];
      d += ` L ${last[0].toFixed(2)} ${last[1].toFixed(2)}`;
      return d;
    };

    const CX = 19;
    const CY = 14;
    const SNAP_AT = 0.54;

    // 6 micro-droplets with varied angles and radii for a dramatic liquid snap
    const dropDirs: [number, number, number][] = [
      [-1.05, -1.85, 1.45],
      [1.1, -1.75, 1.25],
      [-0.35, -2.05, 1.0],
      [-1.0, 1.8, 1.2],
      [1.15, 1.7, 1.4],
      [0.4, 2.0, 0.95],
    ];

    const tick = (now: number) => {
      const dt = Math.min(0.04, Math.max(0.004, (now - s.lastTime) / 1000));
      s.lastTime = now;
      s.recoilAge += dt;

      // Decoupled targets:
      // - Playing idle:   curl = 0.00, split = 0.00  (pure live wave)
      // - Playing hover:  curl = 0.96, split = 0.44  (unmistakable upright || bars tethered by a trembling thread!)
      // - Paused idle:    curl = 1.00, split = 1.00  (crisp detached || bars)
      // - Paused hover:   curl = 0.22, split = 0.58  (bars lean & unfold into a live wave preview!)
      const targetCurl = s.paused !== s.hovered ? 1 : 0;
      const targetSplit = targetCurl;

      // Smooth springy curl solver
      const curlDiff = targetCurl - s.curl;
      if (Math.abs(curlDiff) > 0.0008) {
        s.curl += curlDiff * Math.min(1, dt * (s.paused && !s.hovered ? 12 : 9.5));
      } else {
        s.curl = targetCurl;
      }

      // Cell-division / magnetic-fusion split solver
      const splitDiff = targetSplit - s.split;
      if (Math.abs(splitDiff) > 0.0008) {
        if (s.paused && !s.wasBroken) {
          // BREAKING: tension resistance up to SNAP_AT, then explosive rupture!
          const speed =
            s.split < SNAP_AT
              ? 1.15 + Math.pow(s.split / SNAP_AT, 2) * 1.1
              : 3.6;
          s.split = Math.min(targetSplit, s.split + dt * speed);
          if (s.split >= SNAP_AT) {
            s.wasBroken = true;
            s.recoil = 1.0;
            s.recoilAge = 0;
          }
        } else if (!s.paused && s.wasBroken) {
          // JOINING: inverse-distance acceleration as the two cells approach!
          const closeness = 1 - s.split;
          const speed =
            s.split > SNAP_AT
              ? 1.05 + Math.pow(closeness / (1 - SNAP_AT), 1.85) * 4.2
              : 3.4;
          s.split = Math.max(targetSplit, s.split - dt * speed);
          if (s.split <= SNAP_AT) {
            s.wasBroken = false;
            s.recoil = -1.0;
            s.recoilAge = 0;
          }
        } else {
          // Hover preview or post-snap settle
          s.split += splitDiff * Math.min(1, dt * 10.5);
        }
      } else {
        s.split = targetSplit;
      }

      // Underdamped ringing decay for dramatic whip-back & fusion ripple
      s.recoil *= Math.exp(-dt * 4.4);
      if (Math.abs(s.recoil) < 0.002) s.recoil = 0;

      // Advance wave phase whenever wave has visible amplitude
      if (s.curl < 0.94) {
        const waveSpeed = s.paused && s.hovered ? 5.6 : 5.0;
        s.phase += dt * waveSpeed;
      }

      const curl = s.curl;
      const split = s.split;
      const easeCurl = curl * curl * (3 - 2 * curl);
      const t = s.phase;
      const waveAmp = Math.max(0, 1 - easeCurl * 1.08);

      // High-frequency tension tremor whenever the liquid thread is strained (hover-pause preview OR mid-tear!)
      const strain =
        split > 0.16 && split < SNAP_AT
          ? Math.pow((split - 0.16) / (SNAP_AT - 0.16), 1.35)
          : 0;
      const tremorY = strain * Math.sin(now * 0.072) * 1.25;

      // Explosive underdamped whip-back oscillation right after rupture (recoil > 0)
      const breakWhip = s.recoil > 0 ? s.recoil * Math.cos(s.recoilAge * 24) * 4.1 : 0;

      // Big elastic splash ripple across the wave right after fusion (recoil < 0)
      const fusionRipple =
        s.recoil < 0 ? Math.abs(s.recoil) * Math.cos(s.recoilAge * 19) * 4.6 : 0;

      const leftPts: [number, number][] = [];
      const rightPts: [number, number][] = [];
      const N = 10;

      for (let i = 0; i <= N; i++) {
        const u = i / N; // 0 = outer/top end, 1 = inner/bottom end
        const midWeight = Math.sin(u * Math.PI); // peaks at the center waist of each vertical bar

        // Horizontal wave coordinates (left: x 4 -> 19, right: x 34 -> 19)
        const wxL = 4 + u * 15;
        const wxR = 34 - u * 15;
        const envL = Math.sin(((wxL - 4) / 30) * Math.PI);
        const envR = Math.sin(((wxR - 4) / 30) * Math.PI);
        const wyL =
          CY +
          envL *
            (waveAmp *
              (Math.sin(u * 5.8 - t * 1.95) * 5.2 + Math.cos(u * 10.5 + t * 1.35) * 1.6) +
              fusionRipple * Math.sin(u * Math.PI * 1.5 + t * 3.5));
        const wyR =
          CY +
          envR *
            (waveAmp *
              (Math.sin((2 - u) * 5.8 - t * 1.95) * 5.2 +
                Math.cos((2 - u) * 10.5 + t * 1.35) * 1.6) +
              fusionRipple * Math.sin((2 - u) * Math.PI * 1.5 + t * 3.5));

        // Upright vertical pause bars (left at x=14.4, right at x=23.6; y: 7.4 -> 20.6)
        // Whip-back hits the middle of each bar hardest like a plucked string!
        const whipCurve = 0.42 + 0.58 * midWeight;
        // Cell-waist pull: while the liquid thread is still attached (split < SNAP_AT),
        // the middle of each upright bar bows slightly inward toward the taut thread!
        const waistPull =
          split < SNAP_AT
            ? Math.sin((split / SNAP_AT) * Math.PI * 0.85) * midWeight * 1.35
            : s.paused && s.hovered
              ? midWeight * (1.4 + Math.sin(now * 0.009) * 0.35)
              : 0;

        const pxL = 14.4 - breakWhip * whipCurve + waistPull;
        const pxR = 23.6 + breakWhip * whipCurve - waistPull;
        const py = 7.4 + u * 13.2;

        const xL = wxL + (pxL - wxL) * easeCurl;
        const yL = wyL + (py - wyL) * easeCurl + tremorY * midWeight * 0.65;

        const xR = wxR + (pxR - wxR) * easeCurl;
        const yR = wyR + (py - wyR) * easeCurl - tremorY * midWeight * 0.65;

        leftPts.push([xL, yL]);
        rightPts.push([xR, yR]);
      }

      if (leftRef.current) leftRef.current.setAttribute("d", buildSmoothPath(leftPts));
      if (rightRef.current) rightRef.current.setAttribute("d", buildSmoothPath(rightPts));

      // Concave liquid cell-bridge connecting the two halves while split < SNAP_AT
      if (bridgeRef.current) {
        if (split < SNAP_AT) {
          // Anchor smoothly transitions from inner wave tips (idx=N) to bar waists (idx=N/2)
          const anchorIdx = Math.round(N * (1 - easeCurl * 0.5));
          const tipL = leftPts[anchorIdx];
          const tipR = rightPts[anchorIdx];
          const midX = (tipL[0] + tipR[0]) * 0.5;
          const midY = (tipL[1] + tipR[1]) * 0.5 + tremorY;
          const neckFrac = Math.max(0, 1 - split / SNAP_AT);
          const halfThickEnd = 1.55 * (0.45 + 0.55 * neckFrac);
          // Pinches down to a razor-thin trembling filament right before SNAP_AT!
          const halfThickMid = 0.18 + 1.1 * Math.pow(neckFrac, 1.9);

          const neckPath = [
            `M ${tipL[0].toFixed(2)} ${(tipL[1] - halfThickEnd).toFixed(2)}`,
            `Q ${midX.toFixed(2)} ${(midY - halfThickMid).toFixed(2)} ${tipR[0].toFixed(2)} ${(tipR[1] - halfThickEnd).toFixed(2)}`,
            `L ${tipR[0].toFixed(2)} ${(tipR[1] + halfThickEnd).toFixed(2)}`,
            `Q ${midX.toFixed(2)} ${(midY + halfThickMid).toFixed(2)} ${tipL[0].toFixed(2)} ${(tipL[1] + halfThickEnd).toFixed(2)}`,
            "Z",
          ].join(" ");
          bridgeRef.current.setAttribute("d", neckPath);
          bridgeRef.current.setAttribute("opacity", Math.min(1, 0.35 + neckFrac * 1.6).toFixed(2));
        } else {
          bridgeRef.current.setAttribute("d", "");
          bridgeRef.current.setAttribute("opacity", "0");
        }
      }

      // Expanding micro-shockwave ring on rupture or fusion
      if (shockRef.current) {
        const age = s.recoilAge;
        if (age < 0.46) {
          const p = age / 0.46;
          const easeOut = 1 - Math.pow(1 - p, 3);
          const radius = 1.6 + easeOut * 10.6;
          shockRef.current.setAttribute("r", radius.toFixed(2));
          shockRef.current.setAttribute("opacity", ((1 - p) * 0.9).toFixed(2));
          shockRef.current.setAttribute("stroke-width", (1.75 * (1 - p * 0.65)).toFixed(2));
        } else {
          shockRef.current.setAttribute("opacity", "0");
        }
      }

      // 6 liquid micro-droplets bursting out on rupture
      const showDrops = s.wasBroken && s.recoilAge < 0.52;
      for (let k = 0; k < 6; k++) {
        const el = dropRefs[k].current;
        if (!el) continue;
        if (showDrops) {
          const p = s.recoilAge / 0.52;
          const ease = 1 - Math.pow(1 - p, 2.5);
          const [vx, vy, baseR] = dropDirs[k];
          const dx = CX + vx * ease * 7.2;
          const dy = CY + vy * ease * 6.0 + p * p * 1.6;
          const r = baseR * (1 - p * 0.88);
          el.setAttribute("cx", dx.toFixed(2));
          el.setAttribute("cy", dy.toFixed(2));
          el.setAttribute("r", Math.max(0.1, r).toFixed(2));
          el.setAttribute("opacity", ((1 - p) * 0.96).toFixed(2));
        } else {
          el.setAttribute("opacity", "0");
        }
      }

      const stillAnimating =
        !s.paused ||
        s.hovered ||
        Math.abs(targetCurl - s.curl) > 0.0008 ||
        Math.abs(targetSplit - s.split) > 0.0008 ||
        Math.abs(s.recoil) > 0.002 ||
        s.recoilAge < 0.55;
      if (stillAnimating) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, hovered]);

  return (
    <span className={`delta-wave-morph ${paused ? "is-paused" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 38 28" fill="none" className="delta-cell-svg">
        <circle
          ref={shockRef}
          cx="19"
          cy="14"
          r="2"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0"
        />
        {dropRefs.map((ref, idx) => (
          <circle key={idx} ref={ref} cx="19" cy="14" r="1" fill="currentColor" opacity="0" />
        ))}
        <path ref={bridgeRef} fill="currentColor" opacity="0" />
        <path
          ref={leftRef}
          d="M 4 14 L 19 14"
          stroke="currentColor"
          strokeWidth="2.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={rightRef}
          d="M 34 14 L 19 14"
          stroke="currentColor"
          strokeWidth="2.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

interface DeltaNavbarProps {
  active: string;
  email: string;
  onBlue: boolean;
}

export default function DeltaNavbar({ active, email, onBlue }: DeltaNavbarProps) {
  const { reduced, paused, togglePaused } = useMotionPreference();
  const { introPhase, dockReady } = useIntroState();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [burstKey, setBurstKey] = useState<{ id: string; count: number }>({ id: "", count: 0 });
  const [waveHovered, setWaveHovered] = useState(false);
  const [waveBouncing, setWaveBouncing] = useState(false);
  const [logoFlipCount, setLogoFlipCount] = useState(0);
  const bounceTimer = useRef<number | null>(null);
  const suppressWaveHoverRef = useRef(false);

  // Liquid-pipe scroll fill refs (section-precise across left & right wings + tethered center buoy)
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const leftBackRef = useRef<SVGPathElement>(null);
  const leftFrontRef = useRef<SVGPathElement>(null);
  const leftClipRef = useRef<SVGPathElement>(null);
  const leftInnerFrostRef = useRef<SVGPathElement>(null);
  const leftHaloRef = useRef<SVGPathElement>(null);
  const leftRimCyanRef = useRef<SVGPathElement>(null);
  const leftRimWhiteRef = useRef<SVGPathElement>(null);
  const leftSlashRef = useRef<SVGPathElement>(null);
  const leftDrop1Ref = useRef<SVGCircleElement>(null);
  const leftDrop2Ref = useRef<SVGCircleElement>(null);
  const leftSubmergedRef = useRef<HTMLDivElement>(null);

  const rightBackRef = useRef<SVGPathElement>(null);
  const rightFrontRef = useRef<SVGPathElement>(null);
  const rightClipRef = useRef<SVGPathElement>(null);
  const rightInnerFrostRef = useRef<SVGPathElement>(null);
  const rightHaloRef = useRef<SVGPathElement>(null);
  const rightRimCyanRef = useRef<SVGPathElement>(null);
  const rightRimWhiteRef = useRef<SVGPathElement>(null);
  const rightSlashRef = useRef<SVGPathElement>(null);
  const rightDrop1Ref = useRef<SVGCircleElement>(null);
  const rightDrop2Ref = useRef<SVGCircleElement>(null);
  const rightSubmergedRef = useRef<HTMLDivElement>(null);

  const logoBuoyRef = useRef<HTMLDivElement>(null);

  const triggerBurst = (id: string) => {
    setBurstKey((prev) => ({ id, count: prev.count + 1 }));
  };

  const handleWaveToggle = () => {
    suppressWaveHoverRef.current = true;
    setWaveHovered(false);
    triggerBurst("wave");
    setWaveBouncing(false);
    requestAnimationFrame(() => {
      setWaveBouncing(true);
      if (bounceTimer.current) window.clearTimeout(bounceTimer.current);
      bounceTimer.current = window.setTimeout(() => setWaveBouncing(false), 480);
    });
    togglePaused();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section-aligned liquid-pipe progress + bold shallow-water wave physics that settle calm when idle
  useEffect(() => {
    const measureLinkSpans = (wingEl: HTMLDivElement | null, count: number): Array<[number, number]> => {
      const fallback: Array<[number, number]> = Array.from({ length: count }, (_, i) => [i / count, (i + 1) / count]);
      if (!wingEl) return fallback;
      const wRect = wingEl.getBoundingClientRect();
      if (wRect.width < 20) return fallback;
      const links = Array.from(wingEl.querySelectorAll<HTMLAnchorElement>("a.delta-nav-link"));
      if (links.length !== count) return fallback;
      return links.map((a) => {
        const r = a.getBoundingClientRect();
        return [
          Math.max(0, Math.min(1, (r.left - wRect.left) / wRect.width)),
          Math.max(0, Math.min(1, (r.right - wRect.left) / wRect.width)),
        ];
      });
    };

    // Cache section tops, maxScroll, and wing link spans off the scroll hot path (zero forced reflow on scroll)
    const ids = ["about", "experience", "projects", "research", "freelance", "contact"];
    let cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let cachedTops: number[] | null = null;
    let cachedLeftSpans: Array<[number, number]> = [[0, 1 / 3], [1 / 3, 2 / 3], [2 / 3, 1]];
    let cachedRightSpans: Array<[number, number]> = [[0, 1 / 3], [1 / 3, 2 / 3], [2 / 3, 1]];

    const measureLayout = () => {
      const y = window.scrollY;
      cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const offset = window.innerHeight * 0.28;
      const rawTops = ids.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return Math.max(0, el.getBoundingClientRect().top + y - offset);
      });
      if (rawTops.some((t) => t === null)) {
        cachedTops = null;
      } else {
        const tops = rawTops as number[];
        for (let i = 1; i < tops.length; i++) {
          if (tops[i] <= tops[i - 1] + 20) tops[i] = tops[i - 1] + 20;
        }
        cachedTops = tops;
      }
      cachedLeftSpans = measureLinkSpans(leftWingRef.current, 3);
      cachedRightSpans = measureLinkSpans(rightWingRef.current, 3);
    };

    measureLayout();

    // Pure arithmetic mapping from cached layout metrics — zero DOM reads during scroll
    const getSectionAlignedFill = (): { left: number; right: number; overall: number } => {
      const y = window.scrollY;
      const maxScroll = cachedMaxScroll;
      const tops = cachedTops;

      if (!tops) {
        const p = Math.max(0, Math.min(1, y / maxScroll));
        return { left: Math.max(0, Math.min(1, p / 0.5)), right: Math.max(0, Math.min(1, (p - 0.5) / 0.5)), overall: p };
      }

      const endScroll = Math.max(maxScroll, tops[5] + 40);
      const leftSpans = cachedLeftSpans;
      const rightSpans = cachedRightSpans;

      let left = 0;
      let right = 0;
      const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t));

      if (y < tops[0]) {
        left = lerp(0, leftSpans[0][0], y / Math.max(1, tops[0]));
      } else if (y < tops[1]) {
        left = lerp(leftSpans[0][0], leftSpans[0][1], (y - tops[0]) / Math.max(1, tops[1] - tops[0]));
      } else if (y < tops[2]) {
        left = lerp(leftSpans[0][1], leftSpans[1][1], (y - tops[1]) / Math.max(1, tops[2] - tops[1]));
      } else if (y < tops[3]) {
        left = lerp(leftSpans[1][1], 1, (y - tops[2]) / Math.max(1, tops[3] - tops[2]));
      } else if (y < tops[4]) {
        left = 1;
        right = lerp(0, rightSpans[0][1], (y - tops[3]) / Math.max(1, tops[4] - tops[3]));
      } else if (y < tops[5]) {
        left = 1;
        right = lerp(rightSpans[0][1], rightSpans[1][1], (y - tops[4]) / Math.max(1, tops[5] - tops[4]));
      } else {
        left = 1;
        right = lerp(rightSpans[1][1], 1, (y - tops[5]) / Math.max(1, endScroll - tops[5]));
      }

      return { left, right, overall: (left + right) * 0.5 };
    };

    const N = 16; // 17 smooth surface nodes across the 46px pipe height
    const makeSurface = () => ({
      h: new Float32Array(N + 1),
      v: new Float32Array(N + 1),
    });
    const leftSurf = makeSurface();
    const rightSurf = makeSurface();
    const nextHBuffer = new Float32Array(N + 1);

    const init = getSectionAlignedFill();
    let targetLeft = init.left;
    let targetRight = init.right;
    let fillLeft = init.left;
    let fillRight = init.right;
    let velLeft = 0;
    let velRight = 0;
    let prevVelLeft = 0;
    let prevVelRight = 0;
    let surge = 0;
    let calmFactor = 0;
    let lastY = window.scrollY;
    let lastScrollTime = 0;
    let phase = 0;
    let lastTime = performance.now();
    let rafId = 0;

    const stepSurface = (
      surf: { h: Float32Array; v: Float32Array },
      dt: number,
      accelImpulse: number,
      activeEnergy: number,
      phaseOffset: number,
    ) => {
      const k = 34;
      const damping = activeEnergy < 0.03 ? 6.8 : 2.65;
      const spread = 130;
      const nextH = nextHBuffer;
      const ph = phase + phaseOffset;

      for (let i = 0; i <= N; i++) {
        const f = i / N;
        const sloshDrive = (0.5 - f) * accelImpulse * 2.4;
        const primaryWave = Math.sin(f * Math.PI * 2.15 - ph * 2.75) * activeEnergy * 4.4;
        const secondaryWave = Math.cos(f * Math.PI * 3.8 + ph * 1.9) * activeEnergy * 1.65;
        const left = i > 0 ? surf.h[i - 1] : surf.h[i];
        const right = i < N ? surf.h[i + 1] : surf.h[i];
        const laplacian = left + right - 2 * surf.h[i];

        const acc = -k * surf.h[i] + spread * laplacian + sloshDrive + (primaryWave + secondaryWave) * 14;
        surf.v[i] = (surf.v[i] + acc * dt) * Math.exp(-damping * dt);
        let next = surf.h[i] + surf.v[i] * dt;
        if (activeEnergy < 0.01 && Math.abs(next) < 0.03 && Math.abs(surf.v[i]) < 0.03) {
          next = 0;
          surf.v[i] = 0;
        }
        nextH[i] = Math.max(-8.8, Math.min(8.8, next));
      }
      surf.h.set(nextH);
    };

    const updateWing = (
      localP: number,
      surf: { h: Float32Array; v: Float32Array },
      backEl: SVGPathElement | null,
      frontEl: SVGPathElement | null,
      clipEl: SVGPathElement | null,
      innerFrostEl: SVGPathElement | null,
      haloEl: SVGPathElement | null,
      rimCyanEl: SVGPathElement | null,
      rimWhiteEl: SVGPathElement | null,
      slashEl: SVGPathElement | null,
      drop1El: SVGCircleElement | null,
      drop2El: SVGCircleElement | null,
      submergedEl: HTMLDivElement | null,
      phaseOffset: number,
      activeEnergy: number,
    ) => {
      const clamped = Math.max(0, Math.min(1, localP));
      if (clamped <= 0.001) {
        if (backEl) backEl.setAttribute("d", "");
        if (frontEl) frontEl.setAttribute("d", "");
        if (clipEl) clipEl.setAttribute("d", "");
        if (innerFrostEl) innerFrostEl.setAttribute("d", "");
        if (haloEl) haloEl.setAttribute("d", "");
        if (rimCyanEl) rimCyanEl.setAttribute("d", "");
        if (rimWhiteEl) rimWhiteEl.setAttribute("d", "");
        if (slashEl) slashEl.setAttribute("opacity", "0");
        if (drop1El) drop1El.setAttribute("opacity", "0");
        if (drop2El) drop2El.setAttribute("opacity", "0");
        if (submergedEl) submergedEl.style.clipPath = "inset(0 100% 0 0)";
        return;
      }
      if (clamped >= 0.999) {
        const full = "M 0 0 L 100 0 L 100 46 L 0 46 Z";
        if (backEl) backEl.setAttribute("d", full);
        if (frontEl) frontEl.setAttribute("d", full);
        if (clipEl) clipEl.setAttribute("d", full);
        if (innerFrostEl) innerFrostEl.setAttribute("d", "");
        if (haloEl) haloEl.setAttribute("d", "");
        if (rimCyanEl) rimCyanEl.setAttribute("d", "");
        if (rimWhiteEl) rimWhiteEl.setAttribute("d", "");
        if (slashEl) slashEl.setAttribute("opacity", "0");
        if (drop1El) drop1El.setAttribute("opacity", "0");
        if (drop2El) drop2El.setAttribute("opacity", "0");
        if (submergedEl) submergedEl.style.clipPath = "inset(0 0% 0 0)";
        return;
      }

      const baseX = clamped * 100;
      const edgeTaper = Math.sin(clamped * Math.PI);
      const scale = reduced ? 0 : 0.68 + 0.32 * edgeTaper;
      const ph = phase + phaseOffset;

      const frontPts: [number, number][] = [];
      const backPts: [number, number][] = [];
      for (let i = 0; i <= N; i++) {
        const f = i / N;
        const y = f * 46;
        // Realistic glass-tube capillary meniscus: liquid clings slightly ahead at top/bottom walls
        // and curves smoothly inward at the center, plus a living organic S-swell even at gentle speeds.
        const wallCapillary = Math.pow(Math.abs(2 * f - 1), 2.4) * 1.35 * edgeTaper;
        const restBelly = Math.sin(f * Math.PI) * -0.95 * edgeTaper;
        const gentleLivingWave =
          (Math.sin(f * Math.PI * 1.85 - ph * 2.2) * 1.15 +
            Math.cos(f * Math.PI * 3.1 + ph * 1.45) * 0.45) *
          Math.min(1, 0.28 + activeEnergy * 0.9);
        const liveCrest =
          (Math.sin(f * Math.PI * 2.15 - ph * 2.85) * 3.6 +
            Math.cos(f * Math.PI * 3.7 + ph * 2.05) * 1.4) *
          activeEnergy;
        const dxFront = (surf.h[i] * 0.85 + liveCrest + gentleLivingWave) * scale + restBelly + wallCapillary;
        const dxBack =
          (surf.h[i] * 0.62 + Math.sin(f * Math.PI * 1.95 - ph * 2.15 + 1.45) * (0.9 + activeEnergy * 4.6)) * scale +
          (0.6 + activeEnergy * 3.2) * edgeTaper +
          restBelly +
          wallCapillary;
        frontPts.push([Math.max(0, Math.min(100, baseX + dxFront)), y]);
        backPts.push([Math.max(0, Math.min(100, baseX + dxBack)), y]);
      }

      const buildSmoothRim = (pts: [number, number][]) => {
        let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const mx = (pts[i][0] + pts[i + 1][0]) * 0.5;
          const my = (pts[i][1] + pts[i + 1][1]) * 0.5;
          d += ` Q ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
        }
        const last = pts[pts.length - 1];
        d += ` L ${last[0].toFixed(2)} ${last[1].toFixed(2)}`;
        return d;
      };

      const buildSmoothArea = (pts: [number, number][]) => {
        let d = `M 0 0 L ${pts[0][0].toFixed(2)} 0`;
        for (let i = 0; i < pts.length - 1; i++) {
          const mx = (pts[i][0] + pts[i + 1][0]) * 0.5;
          const my = (pts[i][1] + pts[i + 1][1]) * 0.5;
          d += ` Q ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
        }
        const last = pts[pts.length - 1];
        d += ` L ${last[0].toFixed(2)} 46 L 0 46 Z`;
        return d;
      };

      const frontArea = buildSmoothArea(frontPts);
      const frontRim = buildSmoothRim(frontPts);
      const rimOp = Math.min(1, 0.76 + activeEnergy * 0.24) * Math.min(1, edgeTaper * 2.4);

      if (backEl) backEl.setAttribute("d", buildSmoothArea(backPts));
      if (frontEl) frontEl.setAttribute("d", frontArea);
      if (clipEl) clipEl.setAttribute("d", frontArea);
      if (innerFrostEl) {
        innerFrostEl.setAttribute("d", frontRim);
        innerFrostEl.setAttribute("opacity", (rimOp * 0.85).toFixed(2));
      }
      if (haloEl) {
        haloEl.setAttribute("d", frontRim);
        haloEl.setAttribute("opacity", (rimOp * 0.92).toFixed(2));
      }
      if (rimCyanEl) {
        rimCyanEl.setAttribute("d", frontRim);
        rimCyanEl.setAttribute("opacity", rimOp.toFixed(2));
      }
      if (rimWhiteEl) {
        rimWhiteEl.setAttribute("d", frontRim);
        rimWhiteEl.setAttribute("opacity", rimOp.toFixed(2));
      }

      if (slashEl) {
        const slashAlpha = reduced ? 0 : Math.min(0.62, activeEnergy * 0.52) * edgeTaper;
        if (slashAlpha > 0.015) {
          const sx = Math.max(4, baseX - 3.6 + Math.sin(ph * 1.5) * 1.8);
          const dSlash = `M ${(sx - 5.2).toFixed(1)} 46 L ${(sx + 1.8).toFixed(1)} 0 L ${(sx + 4.8).toFixed(1)} 0 L ${(sx - 2.2).toFixed(1)} 46 Z`;
          slashEl.setAttribute("d", dSlash);
          slashEl.setAttribute("opacity", slashAlpha.toFixed(2));
        } else {
          slashEl.setAttribute("opacity", "0");
        }
      }

      const dropAlpha = reduced ? 0 : Math.min(0.9, Math.max(0, (activeEnergy - 0.14) * 1.2)) * edgeTaper;
      if (drop1El) {
        drop1El.setAttribute("cx", Math.min(99, baseX + 2.8 + activeEnergy * 3.8).toFixed(2));
        drop1El.setAttribute("cy", (13 + Math.sin(ph * 2.5) * 5.5).toFixed(2));
        drop1El.setAttribute("r", (1.15 + activeEnergy * 0.68).toFixed(2));
        drop1El.setAttribute("opacity", dropAlpha.toFixed(2));
      }
      if (drop2El) {
        drop2El.setAttribute("cx", Math.min(99, baseX + 2.0 + activeEnergy * 2.9).toFixed(2));
        drop2El.setAttribute("cy", (31 + Math.cos(ph * 2.1) * 5.5).toFixed(2));
        drop2El.setAttribute("r", (0.95 + activeEnergy * 0.54).toFixed(2));
        drop2El.setAttribute("opacity", (dropAlpha * 0.78).toFixed(2));
      }

      if (submergedEl) {
        const poly = [
          "0% 0%",
          ...frontPts.map(([px, py]) => `${px.toFixed(2)}% ${((py / 46) * 100).toFixed(1)}%`),
          "0% 100%",
        ].join(", ");
        submergedEl.style.clipPath = `polygon(${poly})`;
      }
    };

    const onScrollLiquid = () => {
      if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      lastScrollTime = performance.now();
      const next = getSectionAlignedFill();
      targetLeft = next.left;
      targetRight = next.right;
      if (!reduced) {
        surge = Math.min(1.65, surge + Math.min(0.62, Math.abs(dy) * 0.014));
        calmFactor = 1;
      }
    };

    let measureRaf = 0;
    const onLayoutChange = () => {
      if (measureRaf) return;
      measureRaf = requestAnimationFrame(() => {
        measureRaf = 0;
        measureLayout();
        onScrollLiquid();
      });
    };
    const bodyResizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onLayoutChange) : null;
    bodyResizeObserver?.observe(document.body);
    window.addEventListener("scroll", onScrollLiquid, { passive: true });
    window.addEventListener("resize", onLayoutChange, { passive: true });
    window.addEventListener("load", onLayoutChange, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min(0.032, Math.max(0.004, (now - lastTime) / 1000));
      lastTime = now;

      let accelLeft = 0;
      let accelRight = 0;
      if (reduced) {
        fillLeft = targetLeft;
        fillRight = targetRight;
        velLeft = 0;
        velRight = 0;
        surge = 0;
        calmFactor = 0;
      } else {
        prevVelLeft = velLeft;
        prevVelRight = velRight;
        velLeft = (velLeft + (targetLeft - fillLeft) * 68 * dt) * Math.exp(-10.2 * dt);
        velRight = (velRight + (targetRight - fillRight) * 68 * dt) * Math.exp(-10.2 * dt);
        fillLeft = Math.max(0, Math.min(1, fillLeft + velLeft * dt));
        fillRight = Math.max(0, Math.min(1, fillRight + velRight * dt));
        accelLeft = Math.max(-36, Math.min(36, ((velLeft - prevVelLeft) / dt) * 0.7 + velLeft * 26));
        accelRight = Math.max(-36, Math.min(36, ((velRight - prevVelRight) / dt) * 0.7 + velRight * 26));
        surge = Math.max(0, surge * Math.exp(-2.6 * dt));

        const idleMs = now - lastScrollTime;
        if (idleMs > 450 && Math.abs(velLeft) < 0.004 && Math.abs(velRight) < 0.004) {
          calmFactor = Math.max(0, calmFactor * Math.exp(-2.8 * dt));
          if (calmFactor < 0.005) calmFactor = 0;
        }
        phase += dt * (2.4 + surge * 5.2) * Math.max(0.12, calmFactor);
      }

      const activeEnergy = Math.min(1.6, (surge + (Math.abs(velLeft) + Math.abs(velRight)) * 3.8) * calmFactor);
      if (!reduced) {
        stepSurface(leftSurf, dt, accelLeft, activeEnergy, 0);
        stepSurface(rightSurf, dt, accelRight, activeEnergy, 1.5);
      }

      updateWing(
        fillLeft,
        leftSurf,
        leftBackRef.current,
        leftFrontRef.current,
        leftClipRef.current,
        leftInnerFrostRef.current,
        leftHaloRef.current,
        leftRimCyanRef.current,
        leftRimWhiteRef.current,
        leftSlashRef.current,
        leftDrop1Ref.current,
        leftDrop2Ref.current,
        leftSubmergedRef.current,
        0,
        activeEnergy,
      );
      updateWing(
        fillRight,
        rightSurf,
        rightBackRef.current,
        rightFrontRef.current,
        rightClipRef.current,
        rightInnerFrostRef.current,
        rightHaloRef.current,
        rightRimCyanRef.current,
        rightRimWhiteRef.current,
        rightSlashRef.current,
        rightDrop1Ref.current,
        rightDrop2Ref.current,
        rightSubmergedRef.current,
        1.5,
        activeEnergy,
      );

      // Center am. logo moves ONLY when the liquid wave actually passes through the center from left to right
      if (logoBuoyRef.current) {
        const passingCenter = fillLeft >= 0.88 && fillRight <= 0.24;
        if (reduced || !passingCenter || activeEnergy < 0.02) {
          logoBuoyRef.current.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
        } else {
          // Smooth bell curve peaking right as fluid bridges left -> logo -> right
          const leftEntry = Math.min(1, (fillLeft - 0.88) / 0.12);
          const rightExit = Math.min(1, (0.24 - fillRight) / 0.24);
          const passStrength = Math.min(leftEntry, rightExit);
          const bobStrength = Math.min(1, activeEnergy * passStrength * 1.15);
          const bx = Math.sin(phase * 1.25) * 2.0 * bobStrength;
          const by = Math.cos(phase * 1.7) * -3.0 * bobStrength;
          const rot = Math.sin(phase * 1.4) * 3.8 * bobStrength;
          logoBuoyRef.current.style.transform = `translate3d(${bx.toFixed(2)}px, ${by.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
        }
      }

      const settled = calmFactor === 0 &&
        Math.abs(targetLeft - fillLeft) + Math.abs(targetRight - fillRight) < .00001 &&
        Math.abs(velLeft) + Math.abs(velRight) < .00001 &&
        leftSurf.h.every(h => h === 0) && rightSurf.h.every(h => h === 0);
      rafId = settled ? 0 : requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(measureRaf);
      bodyResizeObserver?.disconnect();
      window.removeEventListener("scroll", onScrollLiquid);
      window.removeEventListener("resize", onLayoutChange);
      window.removeEventListener("load", onLayoutChange);
    };
  }, [reduced]);

  useEffect(() => {
    return () => {
      if (bounceTimer.current) window.clearTimeout(bounceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // Scroll-velocity inertia physics: pure 2D GPU translateY avoids re-rasterizing fixed backdrop-filter blur
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 140, damping: 24, mass: 0.65 });
  const navInertiaY = useTransform(smoothVelocity, [-2400, 0, 2400], [4, 0, -4]);

  const isDocked = introPhase === "docking" || introPhase === "complete";
  const wingSpring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 150, damping: 22, mass: 0.9, delay: 0.56 };
  const pillSpring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 160, damping: 22, mass: 0.85, delay: 0.64 };

  return (
    <>
      <motion.header
        data-intro={introPhase}
        className={`delta-header ${onBlue ? "on-blue" : ""} ${scrolled ? "is-scrolled" : ""}`}
        style={reduced ? undefined : { y: navInertiaY }}
      >
        {/* Far-left Cell-Division Wave ↔ Pause Pill (decoupled curl + split physics) */}
        <div className="delta-left-slot">
          <motion.div
            initial={reduced ? false : { opacity: 0, transform: "translateX(-28px) scale(0.82)" }}
            animate={
              isDocked
                ? { opacity: 1, transform: "translateX(0px) scale(1)" }
                : { opacity: 0, transform: "translateX(-28px) scale(0.82)" }
            }
            transition={pillSpring}
          >
            <button
              type="button"
              className={`delta-pill-btn delta-wave-pill ${paused ? "is-paused" : ""} ${waveBouncing ? "is-bouncing" : ""}`}
              onClick={handleWaveToggle}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse" && !suppressWaveHoverRef.current) {
                  setWaveHovered(true);
                }
              }}
              onPointerLeave={() => {
                suppressWaveHoverRef.current = false;
                setWaveHovered(false);
              }}
              onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible")) setWaveHovered(true);
              }}
              onBlur={() => {
                suppressWaveHoverRef.current = false;
                setWaveHovered(false);
              }}
              aria-label={paused ? "Resume animations" : "Pause animations"}
              aria-pressed={paused}
            >
              {burstKey.id === "wave" && (
                <span key={burstKey.count} className="delta-click-burst" aria-hidden="true" />
              )}
              <WaveToPauseIcon paused={paused} hovered={waveHovered} />
            </button>
          </motion.div>
        </div>

        {/* Center Unified Split-Wing Assembly + Flush Circular "am." Logo Dock */}
        <nav className="delta-center-assembly" aria-label="Main navigation">
          {/* Left Glass Wing — section-aligned liquid-filling pipe with pixel-precise submerged text overlay */}
          <motion.div
            ref={leftWingRef}
            className="delta-wing delta-wing-left"
            initial={reduced ? false : { opacity: 0, transform: "translateX(56px) scaleX(0.58)" }}
            animate={
              isDocked
                ? { opacity: 1, transform: "translateX(0px) scaleX(1)" }
                : { opacity: 0, transform: "translateX(56px) scaleX(0.58)" }
            }
            transition={wingSpring}
          >
            <svg className="delta-pipe-svg" viewBox="0 0 100 46" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="delta-liquid-grad-l" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--delta-liquid-a)" />
                  <stop offset="100%" stopColor="var(--delta-liquid-b)" />
                </linearGradient>
                <linearGradient id="delta-glass-sheen-l" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(220, 240, 255, 0.30)" />
                  <stop offset="28%" stopColor="rgba(120, 188, 255, 0.06)" />
                  <stop offset="78%" stopColor="rgba(8, 28, 92, 0.05)" />
                  <stop offset="100%" stopColor="rgba(130, 198, 255, 0.18)" />
                </linearGradient>
                <linearGradient id="delta-rim-fade-l" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(230, 245, 255, 0.35)" />
                  <stop offset="22%" stopColor="rgba(255, 255, 255, 0.96)" />
                  <stop offset="52%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="80%" stopColor="rgba(235, 246, 255, 0.92)" />
                  <stop offset="100%" stopColor="rgba(220, 240, 255, 0.30)" />
                </linearGradient>
                <clipPath id="delta-liquid-clip-l">
                  <path ref={leftClipRef} />
                </clipPath>
                <filter id="delta-rim-halo-l" filterUnits="userSpaceOnUse" x="-16" y="-16" width="132" height="78">
                  <feGaussianBlur stdDeviation="1.5 2.4" />
                </filter>
                <filter id="delta-rim-glow-l" filterUnits="userSpaceOnUse" x="-16" y="-16" width="132" height="78">
                  <feGaussianBlur stdDeviation="0.55 1.1" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path ref={leftBackRef} className="delta-liquid-back" />
              <path ref={leftFrontRef} fill="url(#delta-liquid-grad-l)" className="delta-liquid-front" />
              <g clipPath="url(#delta-liquid-clip-l)">
                <rect x="0" y="0" width="100" height="46" fill="url(#delta-glass-sheen-l)" />
                <path ref={leftInnerFrostRef} className="delta-liquid-inner-frost" filter="url(#delta-rim-halo-l)" />
                <path ref={leftSlashRef} className="delta-liquid-slash" opacity="0" />
              </g>
              <path ref={leftHaloRef} className="delta-liquid-halo is-left" filter="url(#delta-rim-halo-l)" />
              <path ref={leftRimCyanRef} className="delta-liquid-rim-cyan is-left" filter="url(#delta-rim-glow-l)" />
              <path ref={leftRimWhiteRef} className="delta-liquid-rim-white" stroke="url(#delta-rim-fade-l)" filter="url(#delta-rim-glow-l)" />
              <circle ref={leftDrop1Ref} className="delta-liquid-drop" cx="0" cy="14" r="1.4" opacity="0" filter="url(#delta-rim-glow-l)" />
              <circle ref={leftDrop2Ref} className="delta-liquid-drop" cx="0" cy="30" r="1.1" opacity="0" filter="url(#delta-rim-glow-l)" />
            </svg>

            {LEFT_NAV.map((item, idx) => {
              const isActive = active === item.id;
              const staggerOrder = LEFT_NAV.length - 1 - idx;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`delta-nav-link ${isActive ? "is-active" : ""}`}
                  onClick={() => triggerBurst(item.id)}
                  initial={reduced ? false : { opacity: 0, transform: "translateX(16px)" }}
                  animate={isDocked ? { opacity: 1, transform: "translateX(0px)" } : { opacity: 0, transform: "translateX(16px)" }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 210,
                          damping: 22,
                          delay: 0.62 + staggerOrder * 0.045,
                        }
                  }
                >
                  {burstKey.id === item.id && (
                    <span key={burstKey.count} className="delta-click-burst" aria-hidden="true" />
                  )}
                  <span className="delta-roll-mask">
                    <span className="delta-roll-primary">{item.label}</span>
                    <span className="delta-roll-clone" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </motion.a>
              );
            })}

            {/* Pixel-aligned submerged text layer clipped to the exact live wavy liquid meniscus */}
            <div ref={leftSubmergedRef} className="delta-wing-submerged delta-wing-submerged-left" aria-hidden="true">
              {LEFT_NAV.map((item) => (
                <span key={item.id} className={`delta-nav-link-ghost ${active === item.id ? "is-active" : ""}`}>
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Center Circular "am." Logo Dock — tethered buoy that subtly rides emerging waves */}
          <div className="delta-logo-slot" id="delta-logo-dock">
            {dockReady && !reduced && (
              <motion.span
                className="delta-dock-ripple"
                aria-hidden="true"
                initial={{ scale: 0.78, opacity: 0 }}
                animate={{ scale: [0.78, 1.08, 2.05], opacity: [0, 0.72, 0] }}
                transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <div
              ref={logoBuoyRef}
              className="delta-logo-flight-wrap"
              style={{ opacity: dockReady || reduced ? 1 : 0 }}
            >
              <a
                href="#home"
                aria-label="Aditya Malviya home"
                className="delta-logo-btn"
                onClick={() => {
                  triggerBurst("logo");
                  setLogoFlipCount((c) => c + 1);
                }}
              >
                {burstKey.id === "logo" && (
                  <span key={burstKey.count} className="delta-click-burst is-round" aria-hidden="true" />
                )}
                <span className="delta-logo-ring" aria-hidden="true" />
                <motion.span
                  className="delta-logo-coin"
                  animate={reduced ? undefined : { rotateY: logoFlipCount * 360 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.64, ease: [0.22, 1, 0.36, 1] }
                  }
                >
                  <span className="delta-am-mark">
                    <RippleWord>
                      a<span className="monogram-accent">m.</span>
                    </RippleWord>
                  </span>
                </motion.span>
              </a>
            </div>
          </div>

          {/* Right Glass Wing — section-aligned liquid-filling pipe with pixel-precise submerged text overlay */}
          <motion.div
            ref={rightWingRef}
            className="delta-wing delta-wing-right"
            initial={reduced ? false : { opacity: 0, transform: "translateX(-56px) scaleX(0.58)" }}
            animate={
              isDocked
                ? { opacity: 1, transform: "translateX(0px) scaleX(1)" }
                : { opacity: 0, transform: "translateX(-56px) scaleX(0.58)" }
            }
            transition={wingSpring}
          >
            <svg className="delta-pipe-svg" viewBox="0 0 100 46" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="delta-liquid-grad-r" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--delta-liquid-b)" />
                  <stop offset="100%" stopColor="var(--delta-liquid-c)" />
                </linearGradient>
                <linearGradient id="delta-glass-sheen-r" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 242, 224, 0.30)" />
                  <stop offset="28%" stopColor="rgba(255, 200, 140, 0.06)" />
                  <stop offset="78%" stopColor="rgba(42, 22, 8, 0.05)" />
                  <stop offset="100%" stopColor="rgba(255, 214, 160, 0.18)" />
                </linearGradient>
                <linearGradient id="delta-rim-fade-r" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 238, 216, 0.35)" />
                  <stop offset="22%" stopColor="rgba(255, 250, 242, 0.96)" />
                  <stop offset="52%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="80%" stopColor="rgba(255, 244, 228, 0.92)" />
                  <stop offset="100%" stopColor="rgba(255, 230, 200, 0.30)" />
                </linearGradient>
                <clipPath id="delta-liquid-clip-r">
                  <path ref={rightClipRef} />
                </clipPath>
                <filter id="delta-rim-halo-r" filterUnits="userSpaceOnUse" x="-16" y="-16" width="132" height="78">
                  <feGaussianBlur stdDeviation="1.5 2.4" />
                </filter>
                <filter id="delta-rim-glow-r" filterUnits="userSpaceOnUse" x="-16" y="-16" width="132" height="78">
                  <feGaussianBlur stdDeviation="0.55 1.1" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path ref={rightBackRef} className="delta-liquid-back" />
              <path ref={rightFrontRef} fill="url(#delta-liquid-grad-r)" className="delta-liquid-front" />
              <g clipPath="url(#delta-liquid-clip-r)">
                <rect x="0" y="0" width="100" height="46" fill="url(#delta-glass-sheen-r)" />
                <path ref={rightInnerFrostRef} className="delta-liquid-inner-frost" filter="url(#delta-rim-halo-r)" />
                <path ref={rightSlashRef} className="delta-liquid-slash" opacity="0" />
              </g>
              <path ref={rightHaloRef} className="delta-liquid-halo is-right" filter="url(#delta-rim-halo-r)" />
              <path ref={rightRimCyanRef} className="delta-liquid-rim-cyan is-right" filter="url(#delta-rim-glow-r)" />
              <path ref={rightRimWhiteRef} className="delta-liquid-rim-white" stroke="url(#delta-rim-fade-r)" filter="url(#delta-rim-glow-r)" />
              <circle ref={rightDrop1Ref} className="delta-liquid-drop" cx="0" cy="14" r="1.4" opacity="0" filter="url(#delta-rim-glow-r)" />
              <circle ref={rightDrop2Ref} className="delta-liquid-drop" cx="0" cy="30" r="1.1" opacity="0" filter="url(#delta-rim-glow-r)" />
            </svg>

            {RIGHT_NAV.map((item, idx) => {
              const isActive = active === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`delta-nav-link ${isActive ? "is-active" : ""}`}
                  onClick={() => triggerBurst(item.id)}
                  initial={reduced ? false : { opacity: 0, transform: "translateX(-16px)" }}
                  animate={isDocked ? { opacity: 1, transform: "translateX(0px)" } : { opacity: 0, transform: "translateX(-16px)" }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 210,
                          damping: 22,
                          delay: 0.62 + idx * 0.045,
                        }
                  }
                >
                  {burstKey.id === item.id && (
                    <span key={burstKey.count} className="delta-click-burst" aria-hidden="true" />
                  )}
                  <span className="delta-roll-mask">
                    <span className="delta-roll-primary">{item.label}</span>
                    <span className="delta-roll-clone" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </motion.a>
              );
            })}

            {/* Pixel-aligned submerged text layer clipped to the exact live wavy liquid meniscus */}
            <div ref={rightSubmergedRef} className="delta-wing-submerged delta-wing-submerged-right" aria-hidden="true">
              {RIGHT_NAV.map((item) => (
                <span key={item.id} className={`delta-nav-link-ghost ${active === item.id ? "is-active" : ""}`}>
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>
        </nav>

        {/* Far-right Theme Pill (self-explanatory eclipse hover anticipation) + Get in Touch CTA */}
        <motion.div
          className="delta-right-slot"
          initial={reduced ? false : { opacity: 0, transform: "translateX(22px) scale(0.88)" }}
          animate={
            isDocked
              ? { opacity: 1, transform: "translateX(0px) scale(1)" }
              : { opacity: 0, transform: "translateX(22px) scale(0.88)" }
          }
          transition={pillSpring}
        >
          <div className="delta-theme-shell" onClick={() => triggerBurst("theme")}>
            {burstKey.id === "theme" && (
              <span key={burstKey.count} className="delta-click-burst is-round" aria-hidden="true" />
            )}
            <ThemeToggle reduced={reduced} />
          </div>

          <a
            href={email}
            className="delta-pill-btn delta-contact-pill"
            onClick={() => triggerBurst("cta")}
          >
            {burstKey.id === "cta" && (
              <span key={burstKey.count} className="delta-click-burst" aria-hidden="true" />
            )}
            <span className="delta-roll-mask">
              <span className="delta-roll-primary">Get in touch</span>
              <span className="delta-roll-clone" aria-hidden="true">
                Get in touch
              </span>
            </span>
            <span className="delta-arrow-track" aria-hidden="true">
              <ArrowUpRight size={15} className="delta-arrow-primary" />
              <ArrowUpRight size={15} className="delta-arrow-secondary" />
            </span>
          </a>

          <button
            type="button"
            className="delta-pill-btn delta-mobile-menu-btn"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile Glass Drawer with staggered spring physics */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="delta-mobile-drawer"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 210, damping: 26 }}
          >
            <div className="delta-mobile-links">
              {ALL_NAV.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={active === item.id ? "is-active" : ""}
                  onClick={() => setMobileOpen(false)}
                  initial={reduced ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                    delay: reduced ? 0 : idx * 0.045,
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={20} />
                </motion.a>
              ))}
            </div>
            <a
              href={email}
              className="delta-mobile-cta"
              onClick={() => setMobileOpen(false)}
            >
              Get in touch <ArrowUpRight size={17} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
