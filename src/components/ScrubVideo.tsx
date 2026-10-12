import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "./MotionSystem";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const SENSITIVITY = 0.8;

export default function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const seeking = useRef(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const { reduced } = useMotionPreference();

  function seekTo(time: number) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    targetTime.current = Math.max(0, Math.min(time, video.duration));
    if (seeking.current || Math.abs(video.currentTime - targetTime.current) < 1 / 60)
      return;
    seeking.current = true;
    video.currentTime = targetTime.current;
  }

  function finishSeek() {
    const video = videoRef.current;
    if (!video) return;
    seeking.current = false;
    setPosition(video.currentTime);
    if (Math.abs(video.currentTime - targetTime.current) > 1 / 30)
      seekTo(targetTime.current);
  }

  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    let previousX: number | null = null;
    const onMove = (event: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0)
        return;
      if (previousX === null) {
        previousX = event.clientX;
        return;
      }
      const delta = event.clientX - previousX;
      previousX = event.clientX;
      targetTime.current = Math.max(
        0,
        Math.min(
          targetTime.current +
            (delta / window.innerWidth) * SENSITIVITY * video.duration,
          video.duration,
        ),
      );
      if (!seeking.current) seekTo(targetTime.current);
    };
    const reset = () => {
      previousX = null;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", reset);
      document.removeEventListener("mouseleave", reset);
    };
  }, [reduced]);

  return (
    <div className="scrub-video">
      <div className="scrub-video-frame">
        <video
          ref={videoRef}
          src={asset("aditya-scrub.mp4")}
          poster={asset("aditya-scrub-poster.png")}
          muted
          playsInline
          preload="auto"
          aria-label="Animated portrait of Aditya Malviya; move the mouse or use the slider to scrub"
          onLoadedMetadata={(event) =>
            setDuration(event.currentTarget.duration)
          }
          onSeeked={finishSeek}
        />
      </div>
      <div className="scrub-video-control">
        <span aria-hidden="true">01 / MOTION PORTRAIT</span>
        <label className="sr-only" htmlFor="portrait-scrub">
          Scrub portrait video
        </label>
        <input
          id="portrait-scrub"
          type="range"
          min="0"
          max={duration || 1}
          step="0.01"
          value={position}
          onChange={(event) => seekTo(Number(event.target.value))}
          disabled={!duration}
        />
        <span className="scrub-video-hint">MOVE CURSOR ↔</span>
      </div>
    </div>
  );
}
