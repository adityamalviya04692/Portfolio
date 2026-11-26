import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import entries from "../data/experience.json";
import { RippleWord } from "./HeadingRipples";
import { Accordion, useMotionPreference } from "./MotionSystem";
import { SectionWatermarkCards, VaultSticker } from "./VaultSectionBadge";
import "./ExperienceTimeline.css";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

function CalendarDateBadge({
  label,
  leadIn,
  reached,
  reduced,
  onPagesTurned,
}: {
  label: string;
  leadIn: readonly [string, string];
  reached: boolean;
  reduced: boolean;
  onPagesTurned: () => void;
}) {
  const [flipSeq, setFlipSeq] = useState(0);
  const completedOnceRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const triggerTurn = useCallback(() => {
    if (reduced) {
      if (!completedOnceRef.current) {
        completedOnceRef.current = true;
        onPagesTurned();
      }
      return;
    }
    setFlipSeq((n) => n + 1);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (!completedOnceRef.current) {
        completedOnceRef.current = true;
        onPagesTurned();
      }
    }, 460);
  }, [onPagesTurned, reduced]);

  useEffect(() => {
    if (reached) {
      triggerTurn();
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [reached, triggerTurn]);

  const isTurning = reached && !reduced && flipSeq > 0;

  return (
    <span
      className={`experience-timeline-label experience-calendar-pill ${reached || reduced ? "is-reached" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && reached && !reduced) {
          setFlipSeq((n) => n + 1);
        }
      }}
    >
      {/* Two calendar binder rings sitting above the header bar */}
      <span className="exp-cal-rings" aria-hidden="true">
        <span className="exp-cal-ring" />
        <span className="exp-cal-ring" />
      </span>

      {/* Top colored calendar header bar */}
      <span className="exp-cal-header" aria-hidden="true">
        <span className="exp-cal-dots">
          <i />
          <i />
          <i />
        </span>
      </span>

      {/* Wide, compact-height 3D page-turning calendar body */}
      <span className="exp-cal-body">
        {/* Final settled date page (always readable underneath as pages turn away) */}
        <motion.span
          key={`base-${flipSeq}`}
          className="exp-cal-page exp-cal-page-final"
          initial={isTurning ? { scaleY: 0.94, opacity: 0.85 } : false}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: isTurning ? 0.34 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          {label}
        </motion.span>

        {/* Turning Page 2 (flips smoothly upward right after Page 1 starts, zero pause) */}
        {isTurning && (
          <motion.span
            key={`p2-${flipSeq}`}
            className="exp-cal-page exp-cal-page-turn"
            aria-hidden="true"
            initial={{ rotateX: 0, opacity: 1 }}
            animate={{ rotateX: -122, opacity: 0 }}
            transition={{
              rotateX: { duration: 0.34, delay: 0.16, ease: [0.36, 0, 0.2, 1] },
              opacity: { duration: 0.14, delay: 0.36, ease: "easeOut" },
            }}
          >
            {leadIn[1]}
          </motion.span>
        )}

        {/* Turning Page 1 (top sheet flips upward immediately on arrival) */}
        {isTurning && (
          <motion.span
            key={`p1-${flipSeq}`}
            className="exp-cal-page exp-cal-page-turn exp-cal-page-top"
            aria-hidden="true"
            initial={{ rotateX: 0, opacity: 1 }}
            animate={{ rotateX: -125, opacity: 0 }}
            transition={{
              rotateX: { duration: 0.3, delay: 0.02, ease: [0.36, 0, 0.2, 1] },
              opacity: { duration: 0.12, delay: 0.2, ease: "easeOut" },
            }}
          >
            {leadIn[0]}
          </motion.span>
        )}
      </span>
    </span>
  );
}

/**
 * Jitter "Bouncy Period" kinetic heading: words reveal cleanly upward in sequence,
 * followed by an orange period that drops from above with squash-and-stretch hops
 * and replays playfully on hover.
 */
function BouncyPeriodHeading({ title, active, reduced }: { title: string; active: boolean; reduced: boolean }) {
  const [hopSeq, setHopSeq] = useState(0);
  const words = title.split(" ");
  const periodDelay = Math.min(0.68, words.length * 0.13) + 0.12;

  return (
    <h3
      className="exp-bouncy-heading"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && active && !reduced) setHopSeq((n) => n + 1);
      }}
    >
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="exp-bouncy-word-mask">
          <motion.span
            className="exp-bouncy-word"
            initial={reduced ? false : { y: "115%", opacity: 0 }}
            animate={active || reduced ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 112, damping: 18, mass: 1.05, delay: idx * 0.13 }
            }
          >
            {word}
          </motion.span>
          {idx < words.length - 1 ? " " : ""}
        </span>
      ))}
      <motion.span
        key={`dot-${hopSeq}-${active ? 1 : 0}`}
        className="exp-bouncy-period"
        aria-hidden="true"
        initial={reduced ? false : { y: -30, scaleX: 0.72, scaleY: 1.32, opacity: 0 }}
        animate={
          active || reduced
            ? reduced
              ? { y: 0, scaleX: 1, scaleY: 1, opacity: 1 }
              : {
                  y: [-30, 2, -13, 1, -5, 0],
                  scaleX: [0.72, 1.32, 0.86, 1.16, 0.94, 1],
                  scaleY: [1.32, 0.68, 1.16, 0.84, 1.06, 1],
                  opacity: [0, 1, 1, 1, 1, 1],
                }
            : { y: -30, opacity: 0 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : {
                duration: 1.22,
                delay: hopSeq > 0 ? 0 : periodDelay,
                times: [0, 0.34, 0.56, 0.74, 0.88, 1],
                ease: [0.22, 1, 0.36, 1],
              }
        }
      >
        .
      </motion.span>
    </h3>
  );
}

const dateLeadIns = [
  ["Calendar", "Today"],
  ["Present", "Rolls-Royce Digital"],
  ["Present", "2022"],
  ["January 2022", "2021"],
] as const;

const ExperienceTimeline = memo(function ExperienceTimeline() {
  const timeline = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const drawRailRef = useRef<(() => void) | null>(null);
  const { reduced } = useMotionPreference();
  const [reachedCount, setReachedCount] = useState(0);
  const [turnedFlags, setTurnedFlags] = useState<boolean[]>(() => entries.map(() => false));
  const turnedRef = useRef<boolean[]>(entries.map(() => false));
  const today = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const markTurned = useCallback((idx: number) => {
    if (turnedRef.current[idx]) return;
    turnedRef.current[idx] = true;
    setTurnedFlags((prev) => {
      if (prev[idx]) return prev;
      const next = [...prev];
      next[idx] = true;
      return next;
    });
    drawRailRef.current?.();
  }, []);

  useEffect(() => {
    const rail = timeline.current;
    if (!rail || reduced || !("IntersectionObserver" in window)) return;

    const rows = [...rail.querySelectorAll<HTMLElement>(".experience-entry")];
    rail.classList.add("experience-motion");
    const observer = new IntersectionObserver(
      (changes) => {
        for (const { target, isIntersecting } of changes) {
          if (!isIntersecting) continue;
          target.classList.add("is-shown");
          observer.unobserve(target);
        }
      },
      { threshold: 0.12 },
    );
    rows.forEach((row) => observer.observe(row));

    let inViewport = false;
    let railDocTop = 0;
    let railHeight = 0;
    let rowTops: number[] = rows.map(() => 0);
    let rowStopYs: number[] = rows.map(() => 0);
    const pausedOnce = rows.map(() => false);
    let activePauseIdx = -1;
    let activePauseY = 0;
    let pauseTimer = 0;
    let pauseUnlockedAt = 0;
    let pausePushAccum = 0;
    let releaseRampUntil = 0;
    let captureAttached = false;
    let touchLastY = 0;
    let prevScrollY = window.scrollY;
    let anchorJumpUntil = 0;

    // High-physics critically-damped spring + weighted micro-resistance for each project detent
    let springActive = false;
    let springY = window.scrollY;
    let springVel = 0;
    let springTargetY = 0;
    let springRaf = 0;
    let springLastTime = 0;
    let detentTension = 0;
    let tensionRowEl: HTMLElement | null = null;

    const setRowTension = (el: HTMLElement | null, px: number) => {
      if (!el) return;
      if (Math.abs(px) < 0.08) {
        el.style.transform = "";
      } else {
        el.style.transform = `translate3d(0, ${(-px).toFixed(2)}px, 0)`;
      }
    };

    const startPhysicsLoop = () => {
      if (springRaf) return;
      springLastTime = performance.now();
      const tick = (now: number) => {
        const dt = Math.min(0.05, Math.max(0.001, (now - springLastTime) / 1000));
        springLastTime = now;

        let sDone = !springActive;
        if (springActive) {
          const stiffness = 128;
          const damping = 22.6;
          const acc = stiffness * (springTargetY - springY) - damping * springVel;
          springVel += acc * dt;
          springY += springVel * dt;
          if (Math.abs(springTargetY - springY) < 0.45 && Math.abs(springVel) < 4) {
            springY = springTargetY;
            springVel = 0;
            springActive = false;
            sDone = true;
          }
          window.scrollTo({ top: springY, behavior: "instant" });
          prevScrollY = springY;
        }

        detentTension *= Math.exp(-10.5 * dt);
        if (detentTension < 0.05) detentTension = 0;
        setRowTension(tensionRowEl, detentTension);
        const tDone = detentTension === 0;

        if (sDone && tDone) {
          springRaf = 0;
          return;
        }
        springRaf = requestAnimationFrame(tick);
      };
      springRaf = requestAnimationFrame(tick);
    };

    const measureMetrics = () => {
      const rect = rail.getBoundingClientRect();
      const y = window.scrollY;
      railDocTop = rect.top + y;
      railHeight = rect.height;
      rowTops = rows.map((row) => row.offsetTop);
      const navOffset = window.innerWidth <= 720 ? 84 : 104;
      const available = window.innerHeight - navOffset;
      rowStopYs = rows.map((row) => {
        const r = row.getBoundingClientRect();
        const docTop = r.top + y;
        const topPad = r.height < available ? navOffset + Math.min(48, (available - r.height) * 0.32) : navOffset;
        return Math.max(0, Math.round(docTop - topPad));
      });
    };
    measureMetrics();

    const releasePause = (withSmoothRamp = false) => {
      activePauseIdx = -1;
      pausePushAccum = 0;
      springActive = false;
      if (withSmoothRamp) {
        releaseRampUntil = performance.now() + 240;
      }
      if (pauseTimer) {
        window.clearTimeout(pauseTimer);
        pauseTimer = 0;
      }
    };

    const engageMagneticDetent = (idx: number, stopY: number, incomingVel = 0) => {
      pausedOnce[idx] = true;
      activePauseIdx = idx;
      activePauseY = stopY;
      pausePushAccum = 0;
      const now = performance.now();
      pauseUnlockedAt = now + 320;

      const row = rows[idx];
      if (row) {
        row.classList.add("is-shown");
        row.toggleAttribute("data-rail-reached", true);
        if (tensionRowEl && tensionRowEl !== row) setRowTension(tensionRowEl, 0);
        tensionRowEl = row;
      }
      setReachedCount((prev) => Math.max(prev, idx + 1));

      springTargetY = stopY;
      springY = window.scrollY;
      springVel = Math.max(-560, Math.min(560, incomingVel));
      springActive = Math.abs(springTargetY - springY) > 1;
      if (springActive) {
        startPhysicsLoop();
      } else {
        window.scrollTo({ top: stopY, behavior: "instant" });
        prevScrollY = stopY;
      }

      if (pauseTimer) window.clearTimeout(pauseTimer);
      pauseTimer = window.setTimeout(() => {
        releasePause(true);
      }, 820);
    };

    const handleDownwardDelta = (deltaY: number) => {
      if (performance.now() < anchorJumpUntil || deltaY <= 0) return false;

      const now = performance.now();

      if (activePauseIdx === -1 && now < releaseRampUntil) {
        const t = 1 - (releaseRampUntil - now) / 240;
        const easedGain = 0.24 + 0.76 * (t * t);
        window.scrollBy({ top: deltaY * easedGain, behavior: "instant" });
        prevScrollY = window.scrollY;
        return true;
      }

      if (activePauseIdx !== -1) {
        springTargetY = activePauseY;
        if (!springActive && Math.abs(window.scrollY - activePauseY) > 1) {
          springY = window.scrollY;
          springActive = true;
        }
        detentTension = Math.min(8.5, detentTension + Math.min(deltaY, 32) * 0.1);
        startPhysicsLoop();

        if (now >= pauseUnlockedAt) {
          pausePushAccum += Math.min(deltaY, 48);
          if (pausePushAccum >= 180) {
            releasePause(true);
            return true;
          }
        }
        return true;
      }

      const y = window.scrollY;
      for (let i = 0; i < rows.length; i++) {
        if (pausedOnce[i]) continue;
        const stopY = rowStopYs[i];
        const dist = stopY - y;

        if (dist > 0 && dist <= 180) {
          const approachP = 1 - dist / 180;
          if (approachP > 0.35) {
            const row = rows[i];
            if (row) {
              row.classList.add("is-shown");
              row.toggleAttribute("data-rail-reached", true);
            }
            setReachedCount((prev) => Math.max(prev, i + 1));
          }

          const dampingFactor = 0.22 + 0.78 * Math.pow(1 - approachP, 1.5);
          const dampedMove = Math.min(deltaY * dampingFactor, dist);

          if (dampedMove >= dist - 2 || dist <= 8) {
            engageMagneticDetent(i, stopY, Math.min(deltaY * 5, 380));
          } else {
            const nextY = y + dampedMove;
            window.scrollTo({ top: nextY, behavior: "instant" });
            prevScrollY = nextY;
          }
          return true;
        }

        if (y < stopY && y + deltaY >= stopY - 8) {
          engageMagneticDetent(i, stopY, 440);
          return true;
        }
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (performance.now() < anchorJumpUntil) return;
      if (e.deltaY < 0) {
        if (activePauseIdx !== -1) releasePause(false);
        return;
      }
      if (e.deltaY === 0) return;
      if (handleDownwardDelta(e.deltaY)) {
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
      const currentY = e.touches[0].clientY;
      const deltaY = touchLastY - currentY;
      touchLastY = currentY;
      if (deltaY < 0) {
        if (activePauseIdx !== -1) releasePause(false);
        return;
      }
      if (deltaY === 0) return;
      if (handleDownwardDelta(deltaY * 1.35)) {
        e.preventDefault();
      }
    };

    const attachCapture = () => {
      if (captureAttached) return;
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

    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('a[href^="#"]')) {
        anchorJumpUntil = performance.now() + 1000;
        releasePause(false);
      }
    };

    const onHashChange = () => {
      anchorJumpUntil = performance.now() + 1000;
      releasePause(false);
    };

    let frame = 0;
    const drawRail = () => {
      frame = 0;
      const top = railDocTop - window.scrollY;
      const height = railHeight;
      const distance = Math.max(0, Math.min(height, window.innerHeight * 0.78 - top));
      let count = 0;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowTop = rowTops[i];
        const reached = distance >= rowTop || pausedOnce[i];
        if (reached !== row.hasAttribute("data-rail-reached")) {
          row.toggleAttribute("data-rail-reached", reached);
        }
        if (reached) {
          row.classList.add("is-shown");
          count = i + 1;
        }

        const segEl = segmentRefs.current[i];
        if (segEl) {
          if (!turnedRef.current[i]) {
            segEl.style.setProperty("--seg-progress", "0");
          } else {
            const segStart = rowTop + 22;
            const segEnd = i < rows.length - 1 ? rowTops[i + 1] - 22 : height;
            const span = Math.max(1, segEnd - segStart);
            const segP = Math.max(0, Math.min(1, (distance - segStart) / span));
            segEl.style.setProperty("--seg-progress", segP.toFixed(4));
          }
        }
      }
      setReachedCount((prev) => (count > prev ? count : prev));
    };

    const onScroll = () => {
      const y = window.scrollY;
      const scrollingDown = y > prevScrollY;
      const prev = prevScrollY;
      prevScrollY = y;

      if (inViewport && performance.now() >= anchorJumpUntil) {
        if (activePauseIdx !== -1 && !springActive && y > activePauseY + 1) {
          springTargetY = activePauseY;
          springY = y;
          springVel = -240;
          springActive = true;
          startPhysicsLoop();
        } else if (activePauseIdx === -1 && scrollingDown) {
          for (let i = 0; i < rows.length; i++) {
            if (pausedOnce[i]) continue;
            const stopY = rowStopYs[i];
            if (prev <= stopY + 30 && y >= stopY) {
              engageMagneticDetent(i, stopY, -220);
              break;
            }
          }
        }
      }

      if (!inViewport) return;
      if (!frame) frame = requestAnimationFrame(drawRail);
    };

    drawRailRef.current = () => {
      if (!frame) frame = requestAnimationFrame(drawRail);
    };

    const sectionGate = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport) {
          measureMetrics();
          attachCapture();
          if (!frame) frame = requestAnimationFrame(drawRail);
        } else {
          detachCapture();
          releasePause(false);
        }
      },
      { rootMargin: "420px 0px" },
    );
    sectionGate.observe(rail);

    const onResize = () => {
      measureMetrics();
      if (inViewport && !frame) frame = requestAnimationFrame(drawRail);
    };
    const resize = new ResizeObserver(onResize);
    resize.observe(rail);
    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    drawRail();

    return () => {
      drawRailRef.current = null;
      sectionGate.disconnect();
      observer.disconnect();
      resize.disconnect();
      detachCapture();
      releasePause(false);
      setRowTension(tensionRowEl, 0);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(springRaf);
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      rail.classList.remove("experience-motion");
    };
  }, [reduced]);

  return (
    <section id="experience" className="experience blue-section" aria-labelledby="experience-heading">
      <SectionWatermarkCards section="experience" tone="blue" />
      <div className="section-wrap experience-wrap">
        <div className="experience-header">
          <VaultSticker text="PROFESSIONAL EXPERIENCE" light />
          <h2 id="experience-heading">
            <RippleWord>Built</RippleWord> <RippleWord>in</RippleWord>{" "}
            <RippleWord>
              <em>production</em>
            </RippleWord>
            <span className="orange">.</span>
          </h2>
          <p className="experience-employment">
            <img src={asset("experience-tcs.svg")} width="87" height="29" alt="Tata Consultancy Services" />
            <span>December 2021 – Present · Mumbai, India</span>
          </p>
          <p className="experience-employment">Senior Data Engineer &amp; Scrum Master · Mar 2026–present</p>
        </div>
        <div className="experience-timeline" ref={timeline}>
          {entries.map((entry, index) => (
            <article
              className="experience-entry"
              key={entry.title}
              onFocus={(event) => event.currentTarget.classList.add("is-shown")}
            >
              {/* Sequenced vertical timeline line that begins flowing downward right after the calendar pages turn */}
              <span
                ref={(el) => {
                  segmentRefs.current[index] = el;
                }}
                className={`experience-rail-segment ${turnedFlags[index] || reduced ? "is-unlocked" : ""} ${
                  index === entries.length - 1 ? "is-last" : ""
                }`}
                aria-hidden="true"
              />

              <CalendarDateBadge
                label={index === 0 ? `${today} · Present` : entry.period}
                leadIn={dateLeadIns[index]}
                reached={index < reachedCount}
                reduced={reduced}
                onPagesTurned={() => markTurned(index)}
              />

              <div className="experience-entry-copy">
                <div className="experience-project-heading">
                  <img
                    className={`experience-project-logo logo-${entry.logoAlt.toLowerCase().replace(/ /g, "-")}`}
                    src={asset(entry.logo)}
                    alt={entry.logoAlt}
                  />
                  <BouncyPeriodHeading title={entry.title} active={index < reachedCount} reduced={reduced} />
                </div>
                <motion.p
                  className="experience-project-account"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={index < reachedCount || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 112, damping: 20, mass: 1.0, delay: 0.36 }}
                >
                  {entry.account}
                  <motion.span
                    className="exp-sub-period"
                    aria-hidden="true"
                    initial={reduced ? false : { y: -12, scale: 0.5, opacity: 0 }}
                    animate={index < reachedCount || reduced ? { y: [-12, 1, -4, 0], scale: 1, opacity: 1 } : { opacity: 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.85, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  >
                    .
                  </motion.span>
                </motion.p>
                <motion.p
                  className="experience-project-role"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={index < reachedCount || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 108, damping: 20, mass: 1.0, delay: 0.52 }}
                >
                  {entry.role}
                </motion.p>
                <motion.p
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={index < reachedCount || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 104, damping: 21, mass: 1.0, delay: 0.68 }}
                >
                  {entry.summary}
                </motion.p>
                <Accordion title="View contributions">
                  <ul>
                    {entry.contributions.map((contribution) => (
                      <li key={contribution}>{contribution}</li>
                    ))}
                  </ul>
                </Accordion>
              </div>
              <div className="experience-entry-visual">
                <img src={asset(entry.image)} alt={entry.imageAlt} width="1200" height="770" loading="eager" decoding="async" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ExperienceTimeline;
