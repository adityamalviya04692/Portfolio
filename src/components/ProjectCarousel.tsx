import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMotionPreference } from "./MotionSystem";
import type { ProjectDetails } from "./ProjectVideoDialog";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const pad = (value: number) => String(value).padStart(2, "0");

type Props = {
  projects: ProjectDetails[];
  onExplore: (id: string, trigger: HTMLElement) => void;
};

/** Swipeable, snap-scrolling project cards; each opens the project explorer dialog. */
export default function ProjectCarousel({ projects, onExplore }: Props) {
  const { reduced } = useMotionPreference();
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const step = useCallback(() => {
    const cards = track.current?.children;
    return cards && cards.length > 1 ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft : 1;
  }, []);
  const sync = useCallback(() => {
    const el = track.current;
    if (!el || !projects.length) return;
    setCurrent(Math.min(projects.length - 1, Math.round(el.scrollLeft / step())));
  }, [projects.length, step]);
  const goTo = (index: number) => {
    const el = track.current;
    const target = Math.max(0, Math.min(projects.length - 1, index));
    if (el) el.scrollTo({ left: target * step(), behavior: reduced ? "instant" : "smooth" });
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
        <button onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous project"><ArrowLeft size={18} /></button>
        <button onClick={() => goTo(current + 1)} disabled={current >= projects.length - 1} aria-label="Next project"><ArrowRight size={18} /></button>
      </div>
      <div className="project-carousel-track" ref={track} onScroll={sync} onKeyDown={onKey} tabIndex={0} aria-label="Project cards. Use the arrow keys to move between projects.">
        {projects.map((project, index) => (
          <article key={project.id} className={`showcase-card carousel-card showcase-${project.id}`} id={`project-${project.id}`} aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.title}`}>
            <button
              type="button"
              className="carousel-thumb"
              onClick={(event) => onExplore(project.id, event.currentTarget)}
              aria-label={`Explore ${project.title}`}
              aria-haspopup="dialog"
            >
              <span className="showcase-browser">
                <span>{pad(index + 1)} / {project.title}</span>
                {index === 0 && <em className="showcase-latest">LATEST</em>}
              </span>
              <span className="carousel-artwork">
                <img src={asset(`assets/projects/${project.id}-card.webp`)} alt="" width="1200" height="750" loading={index < 3 ? "eager" : "lazy"} />
              </span>
              <span className="carousel-caption">
                <span className="showcase-category">{project.category}</span>
                <strong>{project.title}</strong>
                <span className="showcase-subtitle">{project.subtitle}</span>
                <span className="carousel-thumb-chip" aria-hidden="true">Explore project <ArrowRight size={16} /></span>
              </span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
