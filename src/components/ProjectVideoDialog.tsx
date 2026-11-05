import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, FileText, Github, X } from "lucide-react";
import ProjectVideo from "./ProjectVideo";
import { useMotionPreference } from "./MotionSystem";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export type ProjectDetails = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  problem?: string;
  approach?: string;
  stack: string[];
  metrics?: { value: string; label: string }[];
  link: string;
  github?: string;
  document?: string;
  presentation?: string;
};

type Props = {
  project: { id: string; title: string; link?: string };
  /** When given, the dialog becomes a project explorer: details beside a paused video. */
  details?: ProjectDetails;
  autoPlay?: boolean;
  eyebrow?: string;
  kind?: string;
  index: number;
  request: number;
  returnFocusTo: HTMLElement | null;
  onActivate: () => void;
  onClose: () => void;
};

export default function ProjectVideoDialog({ project, details, autoPlay = true, eyebrow = "PROJECT WALKTHROUGH", kind, index, request, returnFocusTo, onActivate, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const { reduced } = useMotionPreference();
  const closeTimer = useRef<number>();
  const close = () => {
    if (closing) return;
    dialog.current?.querySelector("video")?.pause();
    setClosing(true);
    setVisible(false);
    closeTimer.current = window.setTimeout(onClose, reduced ? 150 : 280);
  };
  useEffect(() => {
    const element = dialog.current;
    const trigger = returnFocusTo || document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    // Grow out of the card that opened the dialog.
    if (element && trigger && trigger !== document.body) {
      const box = element.getBoundingClientRect(), from = trigger.getBoundingClientRect();
      element.style.transformOrigin = `${from.left + from.width / 2 - box.left}px ${from.top + from.height / 2 - box.top}px`;
    }
    // Two frames commit the starting style before transitioning the modal in.
    let nextFrame = 0;
    const frame = requestAnimationFrame(() => {
      nextFrame = requestAnimationFrame(() => setVisible(true));
    });
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
      clearTimeout(closeTimer.current);
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog ref={dialog} className={`project-video-dialog showcase-${project.id}${details ? " project-explorer" : ""}`} data-visible={visible} data-reduced={reduced} aria-labelledby="project-video-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
    }}>
      <header className="project-video-dialog-heading">
        <div><span>{details ? `${details.category} · ${details.year}` : eyebrow}</span><h2 id="project-video-title">{project.title}<span className="orange">.</span></h2></div>
        <button onClick={close} aria-label={details ? `Close ${project.title} details` : "Close video"}><X size={21} /></button>
      </header>
      <ProjectVideo id={project.id} title={project.title} index={index} link={project.link} kind={kind} active request={request} onActivate={onActivate} autoPlay={autoPlay} />
      {details && (
        <div className="project-explorer-body">
          <div className="project-explorer-summary">
            <p className="project-explorer-subtitle">{details.subtitle}</p>
            {!!details.metrics?.length && (
              <div className="project-explorer-metrics">
                {details.metrics.slice(0, 2).map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
              </div>
            )}
            <div className="tags">{details.stack.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="showcase-links">
              <a className="showcase-primary" href={details.link} target="_blank" rel="noreferrer">Open app <ArrowUpRight size={16} /></a>
              {details.github && <a href={details.github} target="_blank" rel="noreferrer"><Github size={16} /> Code <ArrowUpRight size={14} /></a>}
              {details.document && <a href={asset(details.document)} target="_blank" rel="noreferrer"><FileText size={16} /> Case study <span>PDF</span></a>}
              {details.presentation && <a href={asset(details.presentation)} download><Download size={16} /> Slides <span>PPTX</span></a>}
            </div>
          </div>
          <div className="project-explorer-text">
            <section><h3>About</h3><p>{details.description}</p></section>
            {details.problem && <section><h3>The problem</h3><p>{details.problem}</p></section>}
            {details.approach && <section><h3>What I built</h3><p>{details.approach}</p></section>}
          </div>
        </div>
      )}
    </dialog>
  );
}
