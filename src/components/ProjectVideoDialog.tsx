import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, FileText, Github, X } from "lucide-react";
import ProjectVideo from "./ProjectVideo";
import { useMotionPreference } from "./MotionSystem";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export type ProjectDetails = {
  id: string;
  title: string;
  subtitle: string;
  cardSummary?: string;
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
  onClose: () => void;
};

export default function ProjectVideoDialog({ project, details, autoPlay = true, eyebrow = "PROJECT WALKTHROUGH", kind, index, request, returnFocusTo, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const { reduced } = useMotionPreference();
  const closeTimer = useRef<number>();
  const entranceAnimation = useRef<Animation>();
  const close = () => {
    if (closing) return;
    entranceAnimation.current?.cancel();
    dialog.current?.querySelector("video")?.pause();
    setClosing(true);
    setVisible(false);
    closeTimer.current = window.setTimeout(onClose, reduced ? 150 : 280);
  };
  useEffect(() => {
    const element = dialog.current;
    const trigger = returnFocusTo || document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const card = details && !reduced ? trigger?.querySelector<HTMLElement>(".carousel-face") : undefined;
    const from = card?.getBoundingClientRect();
    const cardAngle = card ? getComputedStyle(card).transform : "none";
    if (element && from?.width && from.height) element.dataset.cardFlip = "true";
    element?.showModal();

    let nextFrame = 0;
    let frame = 0;
    let ghost: HTMLElement | undefined;
    if (element && card && from?.width && from.height) {
      const to = element.getBoundingClientRect();
      ghost = card.cloneNode(true) as HTMLElement;
      ghost.className += " project-flip-ghost";
      ghost.setAttribute("aria-hidden", "true");
      Object.assign(ghost.style, {
        left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px`,
      });
      element.append(ghost);
      const matrix = new DOMMatrix(cardAngle === "none" ? undefined : cardAngle);
      const angle = Math.atan2(matrix.b, matrix.a);
      const move = `translate(${to.left - from.left}px, ${to.top - from.top}px)`;
      entranceAnimation.current = ghost.animate([
        { transform: `perspective(1400px) rotateZ(${angle * 0.35}rad)`, offset: 0 },
        { transform: `perspective(1400px) translate(${(to.left - from.left) * 0.38}px, ${(to.top - from.top) * 0.38 - 18}px) rotateY(20deg) scale(1.06)`, offset: 0.34 },
        { transform: `${move} perspective(1400px) scale(${to.width / from.width}, ${to.height / from.height}) rotateY(89deg)`, offset: 1 },
      ], { duration: 430, easing: "cubic-bezier(.25,.72,.3,1)", fill: "forwards" });
      entranceAnimation.current.onfinish = () => {
        ghost?.remove();
        delete element.dataset.cardFlip;
        setVisible(true);
        entranceAnimation.current = element.animate([
          { transform: "perspective(1400px) rotateY(-89deg)" },
          { transform: "perspective(1400px) rotateY(0deg)" },
        ], { duration: 280, easing: "cubic-bezier(.23,1,.32,1)" });
      };
    } else {
      if (element && trigger && trigger !== document.body) {
        const box = element.getBoundingClientRect(), triggerBox = trigger.getBoundingClientRect();
        element.style.transformOrigin = `${triggerBox.left + triggerBox.width / 2 - box.left}px ${triggerBox.top + triggerBox.height / 2 - box.top}px`;
      }
      frame = requestAnimationFrame(() => {
        nextFrame = requestAnimationFrame(() => setVisible(true));
      });
    }
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
      clearTimeout(closeTimer.current);
      entranceAnimation.current?.cancel();
      ghost?.remove();
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
      <ProjectVideo id={project.id} title={project.title} index={index} link={project.link} kind={kind} active request={request} autoPlay={autoPlay} />
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
