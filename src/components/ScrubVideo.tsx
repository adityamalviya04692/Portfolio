import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "./MotionSystem";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const MOTION_START = 5;
const MOTION_END = 7;

export default function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetTime = useRef(MOTION_START);
  const seeking = useRef(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(MOTION_START);
  const { reduced } = useMotionPreference();

  function seekTo(time: number) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    targetTime.current = Math.max(
      MOTION_START,
      Math.min(time, MOTION_END, video.duration),
    );
    if (seeking.current || Math.abs(video.currentTime - targetTime.current) < 1 / 60)
      return;
    seeking.current = true;
    video.currentTime = targetTime.current;
  }

  function finishSeek() {
    const video = videoRef.current;
    if (!video) return;
    seeking.current = false;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (canvas && context && video.videoWidth) {
      const sourceHeight = Math.min(
        video.videoHeight,
        (video.videoWidth * canvas.height) / canvas.width,
      );
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        video,
        0,
        0,
        video.videoWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height,
      );
      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < frame.data.length; i += 4) {
        const white = Math.min(frame.data[i], frame.data[i + 1], frame.data[i + 2]);
        if (white > 225)
          frame.data[i + 3] *= Math.max(0, (242 - white) / 17);
      }
      context.putImageData(frame, 0, 0);
    }
    setPosition(video.currentTime);
    if (Math.abs(video.currentTime - targetTime.current) > 1 / 30)
      seekTo(targetTime.current);
  }

  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const onMove = (event: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0)
        return;
      if ((event.target as Element).closest(".scrub-head-control")) return;
      const fraction = Math.max(0, Math.min(event.clientX / window.innerWidth, 1));
      seekTo(MOTION_START + fraction * (Math.min(MOTION_END, video.duration) - MOTION_START));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  return (
    <div className="scrub-head">
      <div className="scrub-head-mask">
        <video
          ref={videoRef}
          src={asset("aditya-scrub.mp4")}
          poster={asset("aditya-scrub-poster.png")}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration);
            seekTo(MOTION_START);
          }}
          onSeeked={finishSeek}
        />
        <canvas
          ref={canvasRef}
          width="400"
          height="304"
          role="img"
          aria-label="Animated face of Aditya Malviya"
        />
      </div>
      <div className="scrub-head-control">
        <span aria-hidden="true">LOOK AROUND ↔</span>
        <label className="sr-only" htmlFor="portrait-scrub">
          Scrub animated face
        </label>
        <input
          id="portrait-scrub"
          type="range"
          min={MOTION_START}
          max={Math.max(MOTION_START, Math.min(MOTION_END, duration))}
          step="0.01"
          value={position}
          onChange={(event) => {
            const time = Number(event.target.value);
            setPosition(time);
            seekTo(time);
          }}
          disabled={!duration}
        />
      </div>
    </div>
  );
}
