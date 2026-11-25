import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { RippleWord } from "./HeadingRipples";
import ThemeToggle from "./ThemeToggle";
import { useMotionPreference } from "./MotionSystem";
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
      const targetCurl = s.paused ? (s.hovered ? 0.22 : 1) : s.hovered ? 0.96 : 0;
      const targetSplit = s.paused ? (s.hovered ? 0.58 : 1) : s.hovered ? 0.44 : 0;

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
  const { reduced, paused, togglePaused, introPhase, dockReady } = useMotionPreference();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [burstKey, setBurstKey] = useState<{ id: string; count: number }>({ id: "", count: 0 });
  const [waveHovered, setWaveHovered] = useState(false);
  const [waveBouncing, setWaveBouncing] = useState(false);
  const [logoFlipCount, setLogoFlipCount] = useState(0);
  const bounceTimer = useRef<number | null>(null);

  const triggerBurst = (id: string) => {
    setBurstKey((prev) => ({ id, count: prev.count + 1 }));
  };

  const handleWaveToggle = () => {
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

  useEffect(() => {
    return () => {
      if (bounceTimer.current) window.clearTimeout(bounceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Scroll-velocity inertia physics: the floating navbar subtly pitches and shifts with scroll momentum
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 140, damping: 24, mass: 0.65 });
  const navInertiaY = useTransform(smoothVelocity, [-2400, 0, 2400], [5, 0, -5]);
  const navInertiaTilt = useTransform(smoothVelocity, [-2400, 0, 2400], [4.5, 0, -4.5]);

  const isDocked = introPhase === "docking" || introPhase === "complete";
  const wingSpring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 138, damping: 20, mass: 0.95, delay: 0.22 };
  const pillSpring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 155, damping: 21, mass: 0.85, delay: 0.34 };

  return (
    <>
      <motion.header
        className={`delta-header ${onBlue ? "on-blue" : ""} ${scrolled ? "is-scrolled" : ""}`}
        style={
          reduced || introPhase !== "complete"
            ? undefined
            : { y: navInertiaY, rotateX: navInertiaTilt, transformPerspective: 900 }
        }
      >
        {/* Far-left Cell-Division Wave ↔ Pause Pill (decoupled curl + split physics) */}
        <div className="delta-left-slot">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28, scale: 0.82 }}
            animate={
              isDocked
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: -28, scale: 0.82 }
            }
            transition={pillSpring}
          >
            <button
              type="button"
              className={`delta-pill-btn delta-wave-pill ${paused ? "is-paused" : ""} ${waveBouncing ? "is-bouncing" : ""}`}
              onClick={handleWaveToggle}
              onMouseEnter={() => setWaveHovered(true)}
              onMouseLeave={() => setWaveHovered(false)}
              onFocus={() => setWaveHovered(true)}
              onBlur={() => setWaveHovered(false)}
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
          {/* Left Glass Wing unfurls outward from behind the docked circular am. logo */}
          <motion.div
            className="delta-wing delta-wing-left"
            initial={reduced ? false : { opacity: 0, x: 56, scaleX: 0.58 }}
            animate={
              isDocked
                ? { opacity: 1, x: 0, scaleX: 1 }
                : { opacity: 0, x: 56, scaleX: 0.58 }
            }
            transition={wingSpring}
          >
            {LEFT_NAV.map((item, idx) => {
              const isActive = active === item.id;
              // Radiate outward from center: Projects (0) -> Experience (1) -> About (2)
              const staggerOrder = LEFT_NAV.length - 1 - idx;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`delta-nav-link ${isActive ? "is-active" : ""}`}
                  onClick={() => triggerBurst(item.id)}
                  initial={reduced ? false : { opacity: 0, x: 16 }}
                  animate={isDocked ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 210,
                          damping: 22,
                          delay: 0.28 + staggerOrder * 0.055,
                        }
                  }
                >
                  {isActive && (
                    <motion.span
                      className="delta-nav-active-pill"
                      layoutId="delta-nav-pill"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 360, damping: 30, mass: 0.75 }
                      }
                    />
                  )}
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
          </motion.div>

          {/* Center Circular "am." Logo Dock — exact pixel landing target for the flying medallion */}
          <div className="delta-logo-slot" id="delta-logo-dock">
            {/* Kinetic landing halo right when the flying medallion docks in the navbar */}
            {introPhase === "docking" && !reduced && (
              <motion.span
                className="delta-dock-ripple"
                aria-hidden="true"
                initial={{ scale: 0.72, opacity: 0 }}
                animate={{ scale: [0.72, 1.05, 2.1], opacity: [0, 0.88, 0] }}
                transition={{ duration: 0.65, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <div
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

          {/* Right Glass Wing unfurls outward symmetrically from behind the circular am. logo */}
          <motion.div
            className="delta-wing delta-wing-right"
            initial={reduced ? false : { opacity: 0, x: -56, scaleX: 0.58 }}
            animate={
              isDocked
                ? { opacity: 1, x: 0, scaleX: 1 }
                : { opacity: 0, x: -56, scaleX: 0.58 }
            }
            transition={wingSpring}
          >
            {RIGHT_NAV.map((item, idx) => {
              const isActive = active === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`delta-nav-link ${isActive ? "is-active" : ""}`}
                  onClick={() => triggerBurst(item.id)}
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  animate={isDocked ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 210,
                          damping: 22,
                          delay: 0.28 + idx * 0.055,
                        }
                  }
                >
                  {isActive && (
                    <motion.span
                      className="delta-nav-active-pill"
                      layoutId="delta-nav-pill"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 360, damping: 30, mass: 0.75 }
                      }
                    />
                  )}
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
          </motion.div>
        </nav>

        {/* Far-right Theme Pill (self-explanatory eclipse hover anticipation) + Get in Touch CTA */}
        <motion.div
          className="delta-right-slot"
          initial={reduced ? false : { opacity: 0, x: 22, scale: 0.88 }}
          animate={
            isDocked
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: 22, scale: 0.88 }
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
