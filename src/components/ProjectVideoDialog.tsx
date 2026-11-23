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

const flipEase = "cubic-bezier(.23,1,.32,1)";
const panelFlip = [
  { transform: "perspective(1400px) rotateY(-89deg)" },
  { transform: "perspective(1400px) rotateY(0deg)" },
];

function makeCardFlight(card: HTMLElement, from: DOMRect, to: DOMRect) {
  const ghost = card.cloneNode(true) as HTMLElement;
  ghost.className += " project-flip-ghost";
  ghost.setAttribute("aria-hidden", "true");
  const style = getComputedStyle(card).transform;
  const matrix = new DOMMatrix(style === "none" ? undefined : style);
  const angle = Math.atan2(matrix.b, matrix.a);
  const width = card.offsetWidth;
  const height = card.offsetHeight;
  // Recover the rotated corner from the bounding box so the moving copy aligns with the deck.
  const left = from.left - Math.min(0, width * Math.cos(angle)) - Math.min(0, -height * Math.sin(angle));
  const top = from.top - Math.min(0, width * Math.sin(angle)) - Math.min(0, height * Math.cos(angle));
  Object.assign(ghost.style, {
    left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`,
  });
  const x = to.left - left;
  const y = to.top - top;
  const frames = [
    { transform: `perspective(1400px) rotateZ(${angle}rad)`, offset: 0 },
    { transform: `perspective(1400px) translate(${x * 0.38}px, ${y * 0.38 - 18}px) rotateY(20deg) scale(1.06)`, offset: 0.34 },
    { transform: `translate(${x}px, ${y}px) perspective(1400px) scale(${to.width / width}, ${to.height / height}) rotateY(89deg)`, offset: 1 },
  ];
  return { ghost, frames };
}

export default function ProjectVideoDialog({ project, details, autoPlay = true, eyebrow = "PROJECT WALKTHROUGH", kind, index, request, returnFocusTo, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const { reduced } = useMotionPreference();
  const closeTimer = useRef<number>();
  const flipAnimation = useRef<Animation>();
  const flipGhost = useRef<HTMLElement>();
  const close = () => {
    if (closing) return;
    const element = dialog.current;
    flipAnimation.current?.cancel();
    flipGhost.current?.remove();
    element?.querySelector("video")?.pause();
    setClosing(true);

    const card = details && !reduced && visible
      ? returnFocusTo?.querySelector<HTMLElement>(".carousel-face")
      : undefined;
    const destination = card?.getBoundingClientRect();
    if (element && card && destination?.width && destination.height) {
      const box = element.getBoundingClientRect();
      const scrollTop = element.scrollTop;
      const front = element.querySelector<HTMLElement>(".project-dialog-front");
      const { ghost } = makeCardFlight(card, destination, box);
      const width = card.offsetWidth;
      const height = card.offsetHeight;
      const dx = destination.left + destination.width / 2 - (box.left + box.width / 2);
      const dy = destination.top + destination.height / 2 - (box.top + box.height / 2);
      const style = getComputedStyle(card).transform;
      const matrix = new DOMMatrix(style === "none" ? undefined : style);
      const angle = Math.atan2(matrix.b, matrix.a);
      const background = getComputedStyle(element).backgroundColor;
      const duration = 620;

      const back = document.createElement("div");
      back.className = "project-dialog-back";
      back.setAttribute("aria-hidden", "true");
      Object.assign(ghost.style, {
        left: "0px", top: "0px",
        transform: `scale(${box.width / width}, ${box.height / height})`,
      });
      back.append(ghost);
      flipGhost.current = back;
      element.style.setProperty("--return-height", `${box.height}px`);
      element.style.setProperty("--return-background", background);
      element.style.setProperty("--return-duration", `${duration}ms`);
      element.append(back);
      element.dataset.cardReturn = "true";
      if (front) front.scrollTop = scrollTop;

      flipAnimation.current = element.animate([
        { transform: "perspective(1800px) translate(0px, 0px) rotateZ(0rad) scale(1, 1) rotateY(0deg)" },
        { transform: `perspective(1800px) translate(${dx}px, ${dy}px) rotateZ(${angle}rad) scale(${width / box.width}, ${height / box.height}) rotateY(180deg)` },
      ], { duration, easing: "cubic-bezier(.35,.05,.28,1)", fill: "forwards" });
      flipAnimation.current.onfinish = onClose;
      return;
    }

    if (element) delete element.dataset.cardFlip;
    setVisible(false);
    closeTimer.current = window.setTimeout(onClose, reduced ? 150 : 280);
  };
  useEffect(() => {
    const element = dialog.current;
    const trigger = returnFocusTo || document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const card = details && !reduced ? trigger?.querySelector<HTMLElement>(".carousel-face") : undefined;
    const from = card?.getBoundingClientRect();
    if (element && from?.width && from.height) element.dataset.cardFlip = "true";
    element?.showModal();

    let nextFrame = 0;
    let frame = 0;
    if (element && card && from?.width && from.height) {
      const { ghost, frames } = makeCardFlight(card, from, element.getBoundingClientRect());
      flipGhost.current = ghost;
      element.append(ghost);
      flipAnimation.current = ghost.animate(frames, {
        duration: 430, easing: "cubic-bezier(.25,.72,.3,1)", fill: "forwards",
      });
      flipAnimation.current.onfinish = () => {
        ghost.remove();
        flipGhost.current = undefined;
        delete element.dataset.cardFlip;
        setVisible(true);
        flipAnimation.current = element.animate(panelFlip, { duration: 280, easing: flipEase });
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
      flipAnimation.current?.cancel();
      flipGhost.current?.remove();
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
      <div className="project-dialog-front">
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
      </div>
    </dialog>
  );
}
