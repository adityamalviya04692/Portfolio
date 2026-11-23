import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import entries from "../data/experience.json";
import { RippleWord } from "./HeadingRipples";
import { Accordion, Scramble, useMotionPreference } from "./MotionSystem";
import "./ExperienceTimeline.css";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

function TimelineDate({ label, leadIn, reached, reduced }: {
  label: string;
  leadIn: readonly [string, string];
  reached: boolean;
  reduced: boolean;
}) {
  const rowHeight = 18;
  const offset = useMotionValue(-2 * rowHeight);
  const playback = useRef<{ stop: () => void } | null>(null);
  const replay = useCallback(() => {
    playback.current?.stop();
    offset.set(0);
    playback.current = animate(offset, -2 * rowHeight, {
      type: "spring",
      stiffness: 45,
      damping: 14,
      mass: 1.25,
      delay: 0.2,
      restDelta: 0.03,
      restSpeed: 0.08,
    });
  }, [offset]);

  useEffect(() => {
    if (reached && !reduced) replay();
    else offset.set(-2 * rowHeight);
    return () => playback.current?.stop();
  }, [offset, reached, reduced, replay]);

  return (
    <span
      className="experience-timeline-label"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && reached && !reduced) replay();
      }}
    >
      <span className="experience-date-measure">{label}</span>
      <span className="experience-date-window" aria-hidden="true">
        <motion.span className="experience-date-reel" style={{ y: offset }}>
          {[...leadIn, label].map((line) => <span key={line}>{line}</span>)}
        </motion.span>
      </span>
    </span>
  );
}

const dateLeadIns = [
  ["Calendar", "Today"],
  ["Present", "Rolls-Royce Digital"],
  ["Present", "2022"],
  ["January 2022", "2021"],
] as const;

export default function ExperienceTimeline() {
  const timeline = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const [reachedCount, setReachedCount] = useState(0);
  const today = new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }).format(new Date());

  useEffect(() => {
    const rail = timeline.current;
    if (!rail || reduced || !("IntersectionObserver" in window)) return;

    const rows = [...rail.querySelectorAll<HTMLElement>(".experience-entry")];
    rail.classList.add("experience-motion");
    const observer = new IntersectionObserver((changes) => {
      for (const { target, isIntersecting } of changes) {
        if (!isIntersecting) continue;
        target.classList.add("is-shown");
        observer.unobserve(target);
      }
    }, { threshold: 0.12 });
    rows.forEach((row) => observer.observe(row));

    let frame = 0;
    const drawRail = () => {
      frame = 0;
      const { top, height } = rail.getBoundingClientRect();
      const distance = Math.max(0, Math.min(height, window.innerHeight * 0.78 - top));
      rail.style.setProperty("--rail-progress", String(Math.max(0, (distance - 14) / Math.max(1, height - 14))));
      let count = 0;
      for (const row of rows) {
        const reached = distance >= row.offsetTop;
        row.toggleAttribute("data-rail-reached", reached);
        if (reached) count += 1;
      }
      setReachedCount(count);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(drawRail);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(rail);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    drawRail();

    return () => {
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      rail.classList.remove("experience-motion");
    };
  }, [reduced]);

  return (
    <section id="experience" className="experience blue-section" aria-labelledby="experience-heading">
      <div className="section-wrap experience-wrap">
        <div className="experience-header">
          <Scramble className="label-sticker light" text="PROFESSIONAL EXPERIENCE" />
          <h2 id="experience-heading">
            <RippleWord>Built</RippleWord>{" "}<RippleWord>in</RippleWord>{" "}
            <RippleWord><em>production</em></RippleWord><span className="orange">.</span>
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
              <TimelineDate
                label={index === 0 ? `${today} · Present` : entry.period}
                leadIn={dateLeadIns[index]}
                reached={index < reachedCount}
                reduced={reduced}
              />
              <div className="experience-entry-copy">
                <div className="experience-project-heading">
                  <img className={`experience-project-logo logo-${entry.logoAlt.toLowerCase().replace(/ /g, "-")}`} src={asset(entry.logo)} alt={entry.logoAlt} />
                  <h3>{entry.title}</h3>
                </div>
                <p className="experience-project-account">{entry.account}</p>
                <p className="experience-project-role">{entry.role}</p>
                <p>{entry.summary}</p>
                <Accordion title="View contributions">
                  <ul>{entry.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}</ul>
                </Accordion>
              </div>
              <div className="experience-entry-visual">
                <img src={asset(entry.image)} alt={entry.imageAlt} width="1200" height="770" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
