import { useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { useMotionPreference } from "./MotionSystem";
import { VaultSticker } from "./VaultSectionBadge";
import data from "../data/portfolio.json";

const asset = (path: string) => import.meta.env.BASE_URL + path;

export default function AboutEditorial({ onIntro }: { onIntro: (trigger: HTMLButtonElement) => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [waving, setWaving] = useState(false);
  const { reduced } = useMotionPreference();

  const playWave = () => {
    const clip = video.current;
    if (!clip || !clip.paused) return;
    clip.currentTime = 0;
    void clip.play().catch(() => setWaving(false));
  };

  return (
    <div className="about-editorial">
      <div className="about-editorial-inner">
        <header>
          <VaultSticker text="A LITTLE ABOUT ME" light />
          <h2>Big on data<span className="orange">.</span> Bigger on <em>impact</em><span className="orange">.</span></h2>
        </header>
        <div className="about-editorial-layout">
          <div className="about-editorial-identity">
            <h3>{data.profile.name}</h3>
            <p>Senior Data Engineer</p>
            <p>{data.profile.location}</p>
          </div>
          <figure className="about-editorial-photo">
            <button
              type="button"
              className="about-editorial-frame"
              data-waving={waving}
              onClick={playWave}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse" && !reduced) playWave();
              }}
              aria-label="Play Aditya’s welcome wave"
            >
              <img src={asset("assets/aditya-editorial-portrait.webp")} decoding="async" width="1254" height="1254" alt="Portrait of Aditya Malviya" />
              <video
                ref={video}
                src={asset("assets/videos/profile-wave.mp4")}
                muted playsInline preload="none" aria-hidden="true"
                onPlaying={() => setWaving(true)}
                onEnded={() => setWaving(false)}
                onPause={() => setWaving(false)}
              />
            </button>
            <div className="data-engineer-stamp" aria-hidden="true">
              <div className="data-engineer-bars"><i /><i /><i /><i /></div>
              Data Engineer
            </div>
            <figcaption>
              <button type="button" className="about-editorial-watch" aria-haspopup="dialog" onClick={(event) => {
                video.current?.pause();
                onIntro(event.currentTarget);
              }}>
                <span aria-hidden="true"><Play size={12} fill="currentColor" /></span>
                Watch my intro <small>1:10</small>
              </button>
            </figcaption>
          </figure>
          <div className="about-editorial-bio">
            <p>I’m a <em>Senior Data Engineer at TCS</em> with nearly five years of experience across <em>Rolls-Royce Digital</em> and <em>Avery Dennison (Smartrac)</em>. I lead a four-person team and build Azure lakehouse pipelines with PySpark, Databricks, and Data Factory.</p>
            <p>My favorite kind of fix? A <em>skewed join</em> that gives everyone their evening back.</p>
            <a href={asset(data.profile.resume)} target="_blank" rel="noreferrer">Download résumé <ArrowUpRight size={13} /></a>
            <a href={asset(data.profile.resumeDocx)} download>Download DOCX for applications</a>
          </div>
        </div>
      </div>
    </div>
  );
}
