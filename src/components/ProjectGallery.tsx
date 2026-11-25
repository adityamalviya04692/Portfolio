import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { useMotionPreference } from "./MotionSystem";
import { attachProjectCardMotion } from "./projectCardMotion";
import type { ProjectDetails } from "./ProjectVideoDialog";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const pad = (value: number) => String(value).padStart(2, "0");

type Props = {
  projects: ProjectDetails[];
  onExplore: (id: string, trigger: HTMLElement) => void;
};

export default function ProjectGallery({ projects, onExplore }: Props) {
  const { reduced } = useMotionPreference();
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reduced && grid.current) return attachProjectCardMotion(grid.current);
  }, [reduced, projects.length]);

  return (
    <div role="region" aria-label="Personal projects">
      <div className="project-card-grid" ref={grid} style={{ "--project-count": projects.length } as CSSProperties}>
        {projects.map((project, index) => (
          <article key={project.id} style={{ "--fan-position": projects.length > 1 ? 2 * index / (projects.length - 1) - 1 : 0, "--fan-layer": Math.min(index, projects.length - 1 - index) } as CSSProperties} className={`carousel-card showcase-${project.id}`} id={`project-${project.id}`} aria-label={`${index + 1} of ${projects.length}: ${project.title}`}>
            <button
              type="button"
              className="carousel-thumb"
              onClick={(event) => onExplore(project.id, event.currentTarget)}
              aria-label={`Explore ${project.title}`}
              aria-haspopup="dialog"
            >
              <span className="carousel-face showcase-card">
                <span className="showcase-browser">
                  <span>{pad(index + 1)} / {project.title}</span>
                  {index === 0 && <em className="showcase-latest">LATEST</em>}
                </span>
                <span className="carousel-artwork">
                  <img src={asset(`assets/projects/${project.id}-portrait.png`)} alt="" width="880" height="980" loading="eager" decoding="async" />
                </span>
                <span className="carousel-caption">
                  <span className="showcase-category">{project.category}</span>
                  <strong>{project.title}</strong>
                  <span className="showcase-subtitle">{project.cardSummary ?? project.subtitle}</span>
                  <span className="carousel-thumb-chip" aria-hidden="true">Explore project <ArrowRight size={16} /></span>
                </span>
              </span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
