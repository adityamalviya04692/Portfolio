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

    const measureMetrics = () => {
      const rect = rail.getBoundingClientRect();
      railDocTop = rect.top + window.scrollY;
      railHeight = rect.height;
      rowTops = rows.map((row) => row.offsetTop);
    };
    measureMetrics();

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
        const reached = distance >= rowTop;
        if (reached !== row.hasAttribute("data-rail-reached")) {
          row.toggleAttribute("data-rail-reached", reached);
        }
        if (reached) count = i + 1;

        // Each vertical line segment only flows downward AFTER its calendar pages finish turning!
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

    const schedule = () => {
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
          schedule();
        }
      },
      { rootMargin: "220px 0px" },
    );
    sectionGate.observe(rail);

    const onResize = () => {
      measureMetrics();
      if (inViewport) schedule();
    };
    const resize = new ResizeObserver(onResize);
    resize.observe(rail);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    drawRail();

    return () => {
      drawRailRef.current = null;
      sectionGate.disconnect();
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
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
