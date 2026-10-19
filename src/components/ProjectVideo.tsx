import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Captions, Maximize2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const clock = (seconds: number) => `0:${Math.floor(seconds || 0).toString().padStart(2, "0")}`;

type Props = {
  id: string;
  title: string;
  index: number;
  link: string;
  active: boolean;
  request: number;
  onActivate: () => void;
};

export default function ProjectVideo({ id, title, index, link, active, request, onActivate }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const media = video.current;
    if (!media) return;
    if (!active) { media.pause(); return; }
    setStarted(true);
    setError("");
    if (media.ended) media.currentTime = 0;
    void media.play().catch(() => setError("Playback could not start. Try again or open the video below."));
  }, [active, request]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.current?.pause();
    });
    if (player.current) observer.observe(player.current);
    const pauseWhenHidden = () => { if (document.hidden) video.current?.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pauseWhenHidden); };
  }, []);

  const togglePlayback = () => {
    if (video.current?.paused) onActivate();
    else video.current?.pause();
  };
  const toggleCaptions = () => {
    const next = !captions;
    const track = video.current?.textTracks[0];
    if (track) track.mode = next ? "showing" : "hidden";
    setCaptions(next);
  };
  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (player.current?.requestFullscreen) await player.current.requestFullscreen();
      else (video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null)?.webkitEnterFullscreen?.();
    } catch { setError("Full screen is unavailable in this browser. You can open the video below."); }
  };

  return (
    <div className="project-player" ref={player} id={`video-${id}`} role="region" aria-label={`${title} video walkthrough`}>
      <div className="showcase-browser">
        <span>{String(index + 1).padStart(2, "0")} / {title}</span>
        <a href={link} target="_blank" rel="noreferrer" aria-label={`Open ${title} live demo`}>OPEN APP <ArrowUpRight size={14} /></a>
      </div>
      <div className="project-player-screen">
        <video
          ref={video}
          src={asset(`assets/videos/${id}.mp4`)}
          poster={asset(`assets/videos/${id}-poster.jpg`)}
          preload="none"
          playsInline
          muted={muted}
          aria-label={`${title} narrated walkthrough`}
          onPlay={() => { setPlaying(true); setStarted(true); setEnded(false); setError(""); }}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setEnded(true); }}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onError={() => setError("This video could not load. Please try again or open it below.")}
          onClick={togglePlayback}
        >
          <track kind="captions" src={asset(`assets/videos/${id}.vtt`)} srcLang="en" label="English" />
        </video>
        {!playing && (
          <button className={`project-play-cover${started ? " is-paused" : ""}`} onClick={onActivate} aria-label={`${ended ? "Replay" : started ? "Resume" : "Play"} ${title} walkthrough`}>
            <span className="project-play-stamp">{ended ? <RotateCcw size={25} /> : <Play size={25} fill="currentColor" />}</span>
            <span className="project-play-label">{ended ? "WATCH AGAIN" : started ? "CONTINUE WATCHING" : "SEE IT IN ACTION"}<span>Narrated walkthrough</span></span>
          </button>
        )}
      </div>
      <div className="project-player-controls" aria-label={`${title} playback controls`}>
        <button onClick={togglePlayback} aria-label={`${playing ? "Pause" : ended ? "Replay" : "Play"} ${title}`} title={playing ? "Pause" : ended ? "Replay" : "Play"}>
          {playing ? <Pause size={17} fill="currentColor" /> : ended ? <RotateCcw size={17} /> : <Play size={17} fill="currentColor" />}
        </button>
        <span className="project-player-time" aria-hidden="true">{clock(time)}</span>
        <input className="project-player-seek" type="range" min="0" max={duration || 1} step="0.05" value={time} disabled={!duration} aria-label={`Seek ${title} video`} aria-valuetext={`${clock(time)} of ${clock(duration)}`} style={{ "--progress": `${duration ? time / duration * 100 : 0}%` } as React.CSSProperties} onChange={(event) => { if (video.current) { video.current.currentTime = Number(event.target.value); setTime(Number(event.target.value)); } }} />
        <span className="project-player-time" aria-hidden="true">{duration ? clock(duration) : "—:—"}</span>
        <button onClick={() => setMuted(!muted)} aria-label={`${muted ? "Unmute" : "Mute"} ${title}`} aria-pressed={muted} title={muted ? "Unmute" : "Mute"}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
        <button className="project-player-cc" onClick={toggleCaptions} aria-label={`English captions for ${title}`} aria-pressed={captions} title="English captions"><Captions size={18} /></button>
        <button onClick={() => void fullscreen()} aria-label={`Full screen ${title}`} title="Full screen"><Maximize2 size={17} /></button>
      </div>
      {error && <p className="project-player-error" role="status">{error} <a href={asset(`assets/videos/${id}.mp4`)} target="_blank" rel="noreferrer">Open video <ArrowUpRight size={13} /></a></p>}
    </div>
  );
}
