import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Accordion } from "./MotionSystem";
import type { ProjectDetails } from "./ProjectVideoDialog";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const pad = (value: number) => String(value).padStart(2, "0");

type Props = {
  projects: ProjectDetails[];
  onExplore: (id: string, trigger: HTMLElement) => void;
};

/** Swipeable, snap-scrolling project cards; each opens the project explorer dialog. */
export default function ProjectCarousel({ projects, onExplore }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const step = () => {
    const cards = track.current?.children;
    return cards && cards.length > 1 ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft : 1;
  };
  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCurrent(Math.min(projects.length - 1, Math.round(el.scrollLeft / step())));
    setAtStart(el.scrollLeft < 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, [projects.length]);
  const goTo = (index: number) => {
    const el = track.current;
    const target = Math.max(0, Math.min(projects.length - 1, index));
    if (el) el.scrollTo({ left: target * step(), behavior: "smooth" });
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") { event.preventDefault(); goTo(current + 1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); goTo(current - 1); }
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  return (
    <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Personal projects">
      <div className="project-carousel-bar">
        <span className="project-carousel-count" aria-live="polite">{pad(current + 1)} / {pad(projects.length)}</span>
        <button onClick={() => goTo(current - 1)} disabled={atStart} aria-label="Previous project"><ArrowLeft size={18} /></button>
        <button onClick={() => goTo(current + 1)} disabled={atEnd} aria-label="Next project"><ArrowRight size={18} /></button>
      </div>
      <div className="project-carousel-track" ref={track} onScroll={sync} onKeyDown={onKey} tabIndex={0} aria-label="Project cards. Use the arrow keys to move between projects.">
        {projects.map((project, index) => (
          <article key={project.id} className={`showcase-card carousel-card showcase-${project.id}`} id={`project-${project.id}`} aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.title}`}>
            <div className="showcase-visual">
              <div className="showcase-browser"><span>{pad(index + 1)} / {project.title}{index === 0 && <em className="showcase-latest">LATEST</em>}</span><a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live demo`}>OPEN APP <ArrowUpRight size={14} /></a></div>
              <button className="carousel-thumb" onClick={(event) => onExplore(project.id, event.currentTarget)} aria-label={`Explore ${project.title}`} aria-haspopup="dialog">
                <img src={asset(`assets/projects/${project.id}-card.webp`)} alt="" width="1200" height="750" loading={index < 2 ? "eager" : "lazy"} />
                <span className="carousel-thumb-chip" aria-hidden="true">Explore project <ArrowRight size={14} /></span>
              </button>
            </div>
            <div className="showcase-copy">
              <span className="showcase-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p className="showcase-subtitle">{project.subtitle}</p>
              <div className="tags">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
              <div className="carousel-actions">
                <button className="carousel-explore" onClick={(event) => onExplore(project.id, event.currentTarget)} aria-haspopup="dialog">Explore project <ArrowRight size={16} /></button>
                <a href={project.link} target="_blank" rel="noreferrer">Open app <ArrowUpRight size={15} /></a>
              </div>
              <Accordion title="Read more" className="showcase-details">
                <p>{project.description}</p>
                {project.problem && <p><strong>The problem.</strong> {project.problem}</p>}
                {project.approach && <p><strong>What I built.</strong> {project.approach}</p>}
              </Accordion>
            </div>
          </article>
        ))}
      </div>
      <div className="project-carousel-dots">
        {projects.map((project, index) => (
          <button key={project.id} className={index === current ? "is-active" : ""} onClick={() => goTo(index)} aria-label={`Go to ${project.title}`} aria-current={index === current} />
        ))}
      </div>
    </div>
  );
}
