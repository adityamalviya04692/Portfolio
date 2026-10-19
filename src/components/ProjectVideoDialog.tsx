import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ProjectVideo from "./ProjectVideo";
import { useMotionPreference } from "./MotionSystem";

type Props = {
  project: { id: string; title: string; link?: string };
  eyebrow?: string;
  kind?: string;
  index: number;
  request: number;
  returnFocusTo: HTMLElement | null;
  onActivate: () => void;
  onClose: () => void;
};

export default function ProjectVideoDialog({ project, eyebrow = "PROJECT WALKTHROUGH", kind, index, request, returnFocusTo, onActivate, onClose }: Props) {
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
    closeTimer.current = window.setTimeout(onClose, reduced ? 150 : 250);
  };
  useEffect(() => {
    const element = dialog.current;
    const trigger = returnFocusTo || document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
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
    <dialog ref={dialog} className={`project-video-dialog showcase-${project.id}`} data-visible={visible} data-reduced={reduced} aria-labelledby="project-video-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
    }}>
      <header className="project-video-dialog-heading">
        <div><span>{eyebrow}</span><h2 id="project-video-title">{project.title}<span className="orange">.</span></h2></div>
        <button onClick={close} aria-label="Close video"><X size={21} /></button>
      </header>
      <ProjectVideo id={project.id} title={project.title} index={index} link={project.link} kind={kind} active request={request} onActivate={onActivate} />
    </dialog>
  );
}
