import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ParticleEngineer from "./ParticleEngineer";

export type IntroPhase = "loading" | "docking" | "complete";

const MotionContext = createContext<{
  reduced: boolean;
  paused: boolean;
  togglePaused: () => void;
  introPhase: IntroPhase;
  dockReady: boolean;
}>({
  reduced: false,
  paused: false,
  togglePaused: () => {},
  introPhase: "complete",
  dockReady: true,
});
export const useMotionPreference = () => useContext(MotionContext);
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function MotionSystem({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion();
  const [paused, setPaused] = useState(
    () => localStorage.getItem("portfolio-motion") === "paused",
  );
  const reduced = Boolean(systemReduced || paused);
  const [introPhase, setIntroPhase] = useState<IntroPhase>(() =>
    systemReduced || localStorage.getItem("portfolio-motion") === "paused"
      ? "complete"
      : "loading",
  );
  const [dockReady, setDockReady] = useState(() =>
    Boolean(systemReduced || localStorage.getItem("portfolio-motion") === "paused"),
  );
  const loadPct = useMotionValue(0);
  const progressText = useTransform(loadPct, value => String(Math.round(value)).padStart(3, "0") + "%");
  const progressScale = useTransform(loadPct, [0, 100], [0, 1]);
  const rimCircumference = 2 * Math.PI * 56;
  const rimOffset = useTransform(loadPct, [0, 100], [rimCircumference, 0]);
  const medallionRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const introDoneRef = useRef(false);
  const handoffStartedRef = useRef(false);
  const togglePaused = () => {
    setPaused((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("portfolio-motion", next ? "paused" : "on");
      } catch {
        /* ignore storage failures */
      }
      return next;
    });
  };

  useEffect(() => {
    delete document.documentElement.dataset.palette;
    document.documentElement.dataset.motion = reduced ? "off" : "on";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reduced]);

  const finishHandoff = () => {
    if (handoffStartedRef.current) return;
    handoffStartedRef.current = true;
    // Reveal the identical navbar logo first, then unmount the flying clone on the next frame (zero gap/blink)
    setDockReady(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        introDoneRef.current = true;
        setIntroPhase("complete");
      });
    });
  };

  // Hand the logo path to the compositor so page initialization cannot stall its flight.
  useEffect(() => {
    if (introDoneRef.current) return;
    if (reduced) {
      introDoneRef.current = true;
      loadPct.set(100);
      setDockReady(true);
      setIntroPhase("complete");
      return;
    }

    let alive = true;
    let dockingScheduled = false;
    const medallion = medallionRef.current;
    const trail = trailRef.current;
    if (!medallion || !trail) return;
    const animations: Animation[] = [];
    let x0 = 0;
    let y0 = 0;
    let rz0 = 0;
    let dx = 0;
    let dy = -320;
    let endScale = 1;
    const startedAt = performance.now();
    const START_SCALE_VAL = 118 / 54;
    const MIN_DRAW_MS = 1080;
    const FLIGHT_DURATION_MS = 1040;
    const timers: number[] = [];

    const pctCtrl = animate(loadPct, 100, {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    });

    // Smooth S-curve feather path starting from the exact idle float position (zero jump/chop)
    const featherAt = (u: number) => {
      // One velocity curve through the midpoint; flatten the sway at takeoff and landing.
      const ease = u * u * u * (u * (6 * u - 15) + 10);
      const env = Math.sin(u * Math.PI) ** 2;
      const swayAmp = Math.min(44, Math.max(24, Math.abs(dy) * 0.1));
      const x = x0 + (dx - x0) * ease + Math.sin(u * Math.PI * 2) * swayAmp * env;
      const y = y0 + (dy - y0) * ease + env * 14 * (1 - u);
      const sc = START_SCALE_VAL + (endScale - START_SCALE_VAL) * ease;
      const rz = rz0 * (1 - ease) + Math.cos(u * Math.PI * 2) * 10 * env;
      const rx = -12 * env;
      return { x, y, sc, rz, rx };
    };

    const transform = (x: number, y: number, scale: number, rx: number, rz: number) =>
      `perspective(900px) translate3d(${x}px, ${y}px, 0) scale(${scale}) rotateX(${rx}deg) rotateZ(${rz}deg)`;
    const idleAt = (t: number) => ({
      x: Math.sin(t * 2.1) * 3.2,
      y: Math.sin(t * 2.6) * -6.5,
      rz: Math.sin(t * 2.1) * 2.4,
      scale: START_SCALE_VAL * (1 - .12 * Math.pow(1 - Math.min(1, t / .38), 3)),
    });
    const idleDuration = 2400;
    const idle = medallion.animate(Array.from({ length: 73 }, (_, i) => {
      const p = idleAt(i / 72 * idleDuration / 1000);
      return { transform: transform(p.x, p.y, p.scale, 0, p.rz) };
    }), { duration: idleDuration, fill: "both" });
    animations.push(idle);

    const beginDocking = () => {
      if (!alive || dockingScheduled) return;
      dockingScheduled = true;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_DRAW_MS - elapsed);
      timers.push(
        window.setTimeout(() => {
          if (!alive) return;
          const dockEl = document.getElementById("delta-logo-dock");
          const btnEl = dockEl?.querySelector(".delta-logo-btn") ?? dockEl;
          if (btnEl) {
            const rect = btnEl.getBoundingClientRect();
            dx = rect.left + rect.width / 2 - window.innerWidth / 2;
            dy = rect.top + rect.height / 2 - window.innerHeight / 2;
            endScale = (rect.width || 54) / 54;
          }
          const takeoff = idleAt(Math.min(idleDuration, Number(idle.currentTime)) / 1000);
          x0 = takeoff.x;
          y0 = takeoff.y;
          rz0 = takeoff.rz;
          const flightFrames: Keyframe[] = [];
          const trailFrames: Keyframe[] = [];
          for (let i = 0; i <= 64; i++) {
            const u = i / 64;
            const p = featherAt(u);
            const tail = featherAt(Math.max(0, u - .08));
            flightFrames.push({ transform: transform(p.x, p.y, p.sc, p.rx, p.rz) });
            trailFrames.push({
              transform: `translate3d(${tail.x}px, ${tail.y}px, 0) scale(${tail.sc * 1.12})`,
              opacity: Math.sin(u * Math.PI) * .36 * (1 - u * .4),
            });
          }
          idle.cancel();
          const timing = { duration: FLIGHT_DURATION_MS, fill: "both" as const };
          const flight = medallion.animate(flightFrames, timing);
          animations.push(flight, trail.animate(trailFrames, timing));
          flight.onfinish = () => { if (alive) finishHandoff(); };
          loadPct.set(100);
          setIntroPhase("docking");
        }, wait),
      );
    };

    const failSafe = window.setTimeout(beginDocking, idleDuration);
    const image = new Image();
    image.src = asset("workspace-aditya.webp");
    image
      .decode()
      .catch(() => {})
      .then(() => document.fonts.ready)
      .then(beginDocking);

    return () => {
      alive = false;
      animations.forEach(animation => animation.cancel());
      pctCtrl.stop();
      clearTimeout(failSafe);
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  const isDocking = introPhase === "docking";

  return (
    <MotionContext.Provider value={{ reduced, paused, togglePaused, introPhase, dockReady }}>
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>
        <LayoutGroup id="delta-portfolio-stage">
          {/* Layer 1: Atmospheric loading curtain — fades away cleanly while the logo floats above it */}
          <AnimatePresence>
            {introPhase !== "complete" && (
              <motion.div
                className={`page-loader delta-classic-loader ${isDocking ? "is-docking" : ""}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: isDocking ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.62,
                  delay: isDocking ? 0.14 : 0,
                  ease: [0.65, 0, 0.35, 1],
                }}
                aria-label="Loading portfolio"
              >
                <div className="delta-loader-grid" aria-hidden="true" />
                <motion.div
                  className="delta-loader-spotlight"
                  aria-hidden="true"
                  animate={isDocking ? { scale: 2.1, opacity: 0 } : { scale: 1, opacity: 0.72 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className="delta-orbit-halo"
                  aria-hidden="true"
                  initial={{ scale: 0.78, opacity: 0, rotate: -24 }}
                  animate={
                    isDocking
                      ? { scale: 1.85, opacity: 0, rotate: 54 }
                      : { scale: 1, opacity: 0.55, rotate: 18 }
                  }
                  transition={{ type: "spring", stiffness: 78, damping: 18 }}
                />

                <motion.div
                  className="delta-classic-loader-meta"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isDocking ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>
                    LOADING WORKSPACE{" "}
                    <motion.span className="delta-loader-pct">{progressText}</motion.span>
                  </p>
                  <div className="loader-line">
                    <motion.span
                      className="delta-loader-fill"
                      style={{ scaleX: progressScale }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Layer 2: Dedicated Flying Logo Medallion — 100% pixel-identical 54px clone of navbar am. with feather-floating flight */}
          {introPhase !== "complete" && (
            <div className="delta-flying-stage" aria-hidden="true">
              <div className="delta-flight-trail" ref={trailRef} style={{ opacity: 0 }} />
              <motion.div
                ref={medallionRef}
                className={`delta-flying-medallion ${isDocking ? "is-flying" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { duration: 0.28, ease: "easeOut" } }}
              >
                <div className="delta-drawn-medallion">
                  {/* Exact same navbar am. typography — blooms in cleanly as the SVG stroke draw completes */}
                  <motion.span
                    className="delta-am-mark"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.34, delay: 0.52, ease: "easeOut" }}
                  >
                    a<span className="monogram-accent">m.</span>
                  </motion.span>

                  {/* SVG progress rim + initial stroke-draw outline — fades out cleanly before docking */}
                  <svg
                    viewBox="0 0 120 120"
                    className="delta-drawn-svg"
                    aria-hidden="true"
                  >
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="56"
                      className="delta-drawn-rim-arc"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      fill="none"
                      transform="rotate(-90 60 60)"
                      strokeDasharray={rimCircumference}
                      style={{ strokeDashoffset: rimOffset }}
                      animate={{
                        opacity: isDocking ? 0 : 1,
                      }}
                      transition={{
                        opacity: { duration: 0.28, ease: "easeOut" },
                      }}
                    />

                    {/* Tight-kerned stroke preview of "am." that traces first, then dissolves into the real mark */}
                    <motion.text
                      x="57"
                      y="78"
                      textAnchor="middle"
                      className="delta-draw-letter delta-draw-a"
                      initial={{ strokeDashoffset: 320, opacity: 1 }}
                      animate={{ strokeDashoffset: 0, opacity: 0 }}
                      transition={{
                        strokeDashoffset: { duration: 0.62, delay: 0.06, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.24, delay: 0.64, ease: "easeOut" },
                      }}
                    >
                      a<tspan className="delta-draw-m">m.</tspan>
                    </motion.text>
                  </svg>
                </div>
              </motion.div>
            </div>
          )}

          {children}
        </LayoutGroup>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { reduced } = useMotionPreference();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 30, scale: 0.96, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      style={reduced ? undefined : { transformPerspective: 1000 }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 118, damping: 20, mass: 0.95, delay }
      }
    >
      {children}
    </motion.div>
  );
}

export function Scramble({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null),
    visible = useInView(ref, { once: true, amount: 0.5 });
  const { reduced } = useMotionPreference(),
    [display, setDisplay] = useState(text),
    [replay, setReplay] = useState(0);
  useEffect(() => {
    if (!visible || reduced) {
      setDisplay(text);
      return;
    }
    let frame = 0,
      start = 0;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    function step(time: number) {
      if (!start) start = time;
      const fraction = Math.min((time - start) / 650, 1);
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            c === " " || i < text.length * fraction
              ? c
              : characters[(i * 7 + Math.floor(time / 45)) % characters.length],
          )
          .join(""),
      );
      if (fraction < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [visible, reduced, text, replay]);
  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      onMouseEnter={() => setReplay((n) => n + 1)}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

export function Tilt({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { reduced } = useMotionPreference();
  const x = useMotionValue(0),
    y = useMotionValue(0),
    sx = useSpring(x, { stiffness: 180, damping: 20 }),
    sy = useSpring(y, { stiffness: 180, damping: 20 });
  function move(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !window.matchMedia("(pointer:fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((-(e.clientY - r.top - r.height / 2) / r.height) * 7);
    y.set(((e.clientX - r.left - r.width / 2) / r.width) * 7);
  }
  return (
    <motion.div
      className={className}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: reduced ? 0 : sx,
        rotateY: reduced ? 0 : sy,
        transformPerspective: 1100,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null),
    inView = useInView(ref, { once: true }),
    { reduced } = useMotionPreference(),
    [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!inView || reduced) {
      setDisplay(value);
      return;
    }
    const parts = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!parts) {
      setDisplay(value);
      return;
    }
    const [, prefix, numeric, suffix] = parts,
      number = Number(numeric);
    const control = animate(0, number, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) =>
        setDisplay(
          prefix + (Number.isInteger(number) ? Math.round(v) : v.toFixed(1)) + suffix,
        ),
    });
    return () => control.stop();
  }, [inView, reduced, value]);
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

export function HeroFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null),
    { reduced, introPhase } = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.55,
  });
  const scale = useTransform(smoothProgress, [0, 0.65], [1, 0.82]),
    rotate = useTransform(smoothProgress, [0, 0.65], [0, -3]),
    y = useTransform(smoothProgress, [0, 0.65], [0, -100]),
    opacity = useTransform(smoothProgress, [0.3, 0.8], [1, 0.15]),
    radius = useTransform(smoothProgress, [0, 0.5], [0, 70]);
  return (
    <div className="hero-scroll" ref={ref} data-intro-loading={!reduced && introPhase === "loading" || undefined}>
      <motion.div
        className="hero-frame"
        style={
          reduced ? {} : { scale, rotate, y, opacity, borderRadius: radius }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

export function AvatarPortal() {
  const ref = useRef<HTMLElement>(null),
    { reduced } = useMotionPreference();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // ParticleEngineer assembles the figure between 0.14 and 0.5 of this progress.
  const scale = useTransform(p, [0, 0.3, 0.85, 1], [0.82, 1, 1, 0.9]),
    lift = useTransform(p, [0, 0.3], [40, 0]);
  const left = useTransform(p, [0.54, 0.6], [0, 1]),
    right = useTransform(p, [0.62, 0.68], [0, 1]),
    bottom = useTransform(p, [0.7, 0.76], [0, 1]);
  const count = useTransform(p, (v) =>
    String(
      Math.round(Math.max(0, Math.min(1, (v - 0.14) / 0.36)) * 100),
    ).padStart(3, "0"),
  );
  return (
    <section
      id="about"
      className="avatar-journey"
      ref={ref}
      aria-label="Meet Aditya: animated profile"
    >
      <div className="portal-sticky">
        <div className="portal-stars" />
        <div className="portal-grid" />
        <div className="portal-topline">
          MEET THE ENGINEER <span>SCROLL TO DISCOVER ↓</span>
        </div>
        <motion.div
          className="portal-avatar"
          style={reduced ? {} : { scale, y: lift }}
        >
          <ParticleEngineer
            progress={p}
            src={asset("aditya-standing.png")}
            alt="Aditya as a particle hologram"
            reduced={reduced}
          />
        </motion.div>
        <div className="eng-particles" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ left: `${8 + ((i * 37) % 84)}%`, animationDelay: `${-((i * 0.53) % 4)}s` }} />
          ))}
        </div>
        <div className="portal-base">
          <i />
          <i />
          <i />
          <motion.span>{reduced ? "100" : count}</motion.span>
        </div>
        <motion.div
          className="portal-callout callout-name"
          style={{ opacity: reduced ? 1 : left }}
        >
          <strong>
            <Scramble text="Aditya Malviya" />
          </strong>
          <span>Mumbai, India</span>
        </motion.div>
        <motion.div
          className="portal-callout callout-stack"
          style={{ opacity: reduced ? 1 : right }}
        >
          <strong>
            <Scramble text="MY TOOLKIT" />
          </strong>
          <span>PySpark · SQL / T-SQL</span>
          <span>Databricks · Azure Data Factory</span>
          <span>Unity Catalog · Delta Lake</span>
        </motion.div>
        <motion.div
          className="portal-callout callout-impact"
          style={{ opacity: reduced ? 1 : bottom }}
        >
          <strong>Build. Optimize. Ship.</strong>
          <span>
            Production data pipelines.
            <br />
            Reliable platforms. Measurable impact.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export function Accordion({
  title,
  children,
  className = "",
  sheet = false,
  expanded,
  onExpandedChange,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  sheet?: boolean;
  expanded?: boolean;
  onExpandedChange?: (open: boolean) => void;
}) {
  const [localOpen, setOpen] = useState(false),
    { reduced } = useMotionPreference();
  const open = expanded ?? localOpen;
  const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}${useId().replace(/:/g, "")}`;
  useEffect(() => {
    const syncHash = () => {
      if (
        title === "Skills & capabilities" &&
        window.location.hash === "#skills"
      )
        setOpen(true);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [title]);
  return (
    <div className={`motion-accordion ${className}`.trim()}>
      <h4>
        <button
          aria-expanded={open}
          aria-controls={id}
          onClick={() => (onExpandedChange ?? setOpen)(!open)}
        >
          {title}
          <motion.span aria-hidden="true" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: reduced ? 0 : 0.25 }}>+</motion.span>
        </button>
      </h4>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={sheet && !reduced
              ? { height: 0, "--sheet-pull": "16px" }
              : { height: reduced ? "auto" : 0, opacity: sheet ? 1 : 0 }}
            animate={sheet && !reduced
              ? { height: "auto", "--sheet-pull": "0px",
                  transition: { duration: 0.85, ease: [0.16, 0.7, 0.29, 1] } }
              : { height: "auto", opacity: 1 }}
            exit={sheet && !reduced
              ? { height: 0, "--sheet-pull": "16px",
                  transition: { duration: 0.7, ease: [0.62, 0, 0.87, 0.36] } }
              : { height: reduced ? "auto" : 0, opacity: sheet ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.23, 1, 0.32, 1] }}
            className={sheet ? "accordion-panel accordion-sheet" : "accordion-panel"}
          >
            {sheet ? (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }}
                transition={{ duration: reduced ? 0 : 0.34, ease: [0.23, 1, 0.32, 1] }}
              >
                {children}
              </motion.div>
            ) : <div>{children}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
