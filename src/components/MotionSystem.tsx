import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  AnimatePresence,
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
import { Pause, Play } from "lucide-react";

const MotionContext = createContext({ reduced: false });
export const useMotionPreference = () => useContext(MotionContext);
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function MotionSystem({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion();
  const [paused, setPaused] = useState(
    () => localStorage.getItem("portfolio-motion") === "paused",
  );
  const reduced = Boolean(systemReduced || paused);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "off" : "on";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reduced]);
  useEffect(() => {
    let alive = true;
    const timeout = window.setTimeout(() => {
      if (alive) setReady(true);
    }, 3500);
    const image = new Image();
    image.src = asset("workspace-aditya-headless.png");
    image
      .decode()
      .catch(() => {})
      .then(() => document.fonts.ready)
      .then(() => {
        if (alive) setReady(true);
      });
    return () => {
      alive = false;
      clearTimeout(timeout);
    };
  }, []);
  return (
    <MotionContext.Provider value={{ reduced }}>
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>
        <AnimatePresence>
          {!ready && (
            <motion.div
              className="page-loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: reduced ? 0 : "-100%" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              aria-label="Loading portfolio"
            >
              <div className="loader-cube">
                <span>a</span>
                <span>m</span>
              </div>
              <p>LOADING WORKSPACE</p>
              <div className="loader-line" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="reading-progress"
          style={{ scaleX: reduced ? scrollYProgress : progress }}
        />
        <div className="motion-controls">
          <button
            onClick={() => {
              setPaused(!paused);
              localStorage.setItem(
                "portfolio-motion",
                paused ? "on" : "paused",
              );
            }}
            aria-label={paused ? "Enable animations" : "Pause animations"}
            aria-pressed={paused}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
        {ready && children}
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
      initial={reduced ? false : { opacity: 0, y: 38, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
    { reduced } = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.65], [1, 0.82]),
    rotate = useTransform(scrollYProgress, [0, 0.65], [0, -3]),
    y = useTransform(scrollYProgress, [0, 0.65], [0, -100]),
    opacity = useTransform(scrollYProgress, [0.3, 0.8], [1, 0.15]),
    radius = useTransform(scrollYProgress, [0, 0.5], [0, 70]);
  return (
    <div className="hero-scroll" ref={ref}>
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
  const scan = useTransform(
    p,
    [0.2, 0.65],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
  );
  const scanY = useTransform(p, [0.2, 0.65], ["100%", "0%"]);
  const scale = useTransform(p, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.85]),
    rotate = useTransform(p, [0, 0.3, 0.7, 1], [-16, 0, 0, 12]);
  const left = useTransform(p, [0.22, 0.34], [0, 1]),
    right = useTransform(p, [0.4, 0.52], [0, 1]),
    bottom = useTransform(p, [0.5, 0.62], [0, 1]);
  const count = useTransform(p, (v) =>
    String(
      Math.round(Math.max(0, Math.min(1, (v - 0.2) / 0.45)) * 100),
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
          style={reduced ? {} : { scale, rotate }}
        >
          <img
            src={asset("aditya-standing.png")}
            alt="Aditya's personalized full-body avatar"
          />
          <motion.div
            className="avatar-hologram"
            style={reduced ? { opacity: 0 } : { clipPath: scan }}
          >
            <img src={asset("aditya-standing.png")} alt="" />
            <div
              className="holo-scanlines"
              style={{ maskImage: `url(${asset("aditya-standing.png")})` }}
            />
          </motion.div>
          <motion.div
            className="scan-beam"
            style={reduced ? { display: "none" } : { top: scanY }}
          />
        </motion.div>
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
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false),
    { reduced } = useMotionPreference();
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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
    <div className="motion-accordion">
      <h4>
        <button
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          {title}
          <motion.span animate={{ rotate: open ? 45 : 0 }}>+</motion.span>
        </button>
      </h4>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: reduced ? "auto" : 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: reduced ? "auto" : 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
            className="accordion-panel"
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
