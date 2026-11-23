import { useEffect, useRef } from "react";
import { Activity } from "lucide-react";
import entries from "../data/experience.json";
import { RippleWord } from "./HeadingRipples";
import { Accordion, useMotionPreference } from "./MotionSystem";
import "./ExperienceTimeline.css";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export default function ExperienceTimeline() {
  const timeline = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const today = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "Asia/Kolkata" }).format(new Date());

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
      for (const row of rows) {
        const markerTop = parseFloat(getComputedStyle(row, "::before").top);
        row.toggleAttribute("data-rail-reached", distance >= row.offsetTop + markerTop);
      }
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
          <span className="experience-date">Professional experience</span>
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
          <span className="experience-timeline-start">{today} · Present</span>
          {entries.map((entry, index) => (
            <article
              className="experience-entry"
              key={entry.title}
              onFocus={(event) => event.currentTarget.classList.add("is-shown")}
            >
              <div className="experience-entry-copy">
                <span className="experience-date">{index === 0 && <Activity size={16} aria-hidden="true" />}{entry.period}</span>
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
