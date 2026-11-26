import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Check,
  Copy,
  X,
  FileText,
  Play,
} from "lucide-react";
import data from "./data/portfolio.json";
import PortfolioCursor from "./components/PortfolioCursor";
import HeadingRipples, { RippleWord, RippleWords } from "./components/HeadingRipples";
import DeltaNavbar from "./components/DeltaNavbar";
import ExperienceTimeline from "./components/ExperienceTimeline";
import "./components/Footer.css";
import LivingDesk from "./components/LivingDesk";
import ProjectVideoDialog from "./components/ProjectVideoDialog";
import AboutEditorial from "./components/AboutEditorial";
import SkillsPanel from "./components/SkillsPanel";
import SkillsShowcase from "./components/SkillsShowcase";
import "./components/SkillsShowcase.css";
import ProjectGallery from "./components/ProjectGallery";
import { completePrewarmTask } from "./components/PrewarmManager";
import ScrollPinnedStats from "./components/ScrollPinnedStats";
import LiquidSectionWave from "./components/LiquidSectionWave";
import { SectionWatermarkCards, VaultSticker } from "./components/VaultSectionBadge";
import {
  Accordion,
  Counter,
  HeroFrame,
  MotionSystem,
  Reveal,
  Scramble,
  useMotionPreference,
} from "./components/MotionSystem";
const LOGO_ANGLES = Array.from({ length: 12 }, (_, index) => index * 30);

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const profile = data.profile,
  email = `mailto:${profile.social.email}`;
const moriveda = data.projects.find((project) => project.id === "moriveda")!;
const skillProjects = data.projects.filter((project) => project.id !== "moriveda");

function MorivedaTypewriter({ reduced }: { reduced: boolean }) {
  const fullText = "moriveda.in";
  const hostRef = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(reduced ? fullText.length : 0);
  const [runId, setRunId] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShown(fullText.length);
      return;
    }
    const el = hostRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !inView) return;
    setShown(0);
    let idx = 0;
    let timer = 0;
    const step = () => {
      idx += 1;
      setShown(idx);
      if (idx < fullText.length) {
        // Realistic website typing cadence with a tiny beat before the domain extension
        const delay = fullText[idx] === "." ? 190 : 95 + ((idx * 23) % 45);
        timer = window.setTimeout(step, delay);
      }
    };
    timer = window.setTimeout(step, 220);
    return () => window.clearTimeout(timer);
  }, [inView, runId, reduced]);

  const typed = fullText.slice(0, shown);
  const dotIdx = typed.indexOf(".");
  const base = dotIdx >= 0 ? typed.slice(0, dotIdx) : typed;
  const tld = dotIdx >= 0 ? typed.slice(dotIdx) : "";

  return (
    <h3
      ref={hostRef}
      className="moriveda-typewriter"
      aria-label="moriveda.in"
      onClick={() => !reduced && setRunId((n) => n + 1)}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse" && !reduced && shown === fullText.length) {
          setRunId((n) => n + 1);
        }
      }}
    >
      <span className="moriveda-ghost" aria-hidden="true">
        moriveda<span className="orange">.in</span>
      </span>
      <span className="moriveda-typed" aria-hidden="true">
        <span>
          {base}
          {tld && <span className="orange">{tld}</span>}
        </span>
        {!reduced && <span className="moriveda-caret" />}
      </span>
    </h3>
  );
}

function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Mount eagerly with zero lazy-chunk waterfall so the 3D Skills City bakes cleanly under the loader curtain
  return (
    <section id="skills" className="skills-showcase" ref={sectionRef} data-reduced="false" aria-label="Skills and capabilities">
      <SkillsShowcase sectionRef={sectionRef} />
    </section>
  );
}

function Portfolio() {
  const [activeVideo, setActiveVideo] = useState({ id: "", request: 0, explore: false });
  const videoTrigger = useRef<HTMLElement | null>(null);
  const playProject = (id: string, trigger?: HTMLElement) => {
    if (trigger) videoTrigger.current = trigger;
    setActiveVideo((previous) => ({ id, request: previous.request + 1, explore: previous.id === id && previous.explore }));
  };
  // Explore opens the project details with its walkthrough paused until the visitor presses play.
  const exploreProject = (id: string, trigger: HTMLElement) => {
    videoTrigger.current = trigger;
    setActiveVideo((previous) => ({ id, request: previous.request + 1, explore: true }));
  };
  // The 70-second profile intro plays in the same dialog as the project walkthroughs.
  const intro = { id: "intro", title: "Meet Aditya", link: "" };
  const videoProject =
    activeVideo.id === "intro" ? intro : skillProjects.find((project) => project.id === activeVideo.id);
  const [activeResearchNote, setActiveResearchNote] = useState<string | null>(null);
  useEffect(() => {
    if (!activeResearchNote) return;
    const timer = window.setTimeout(() => setActiveResearchNote(null), 2400);
    return () => window.clearTimeout(timer);
  }, [activeResearchNote]);
  const [active, setActive] = useState("home"),
    [copied, setCopied] = useState(false),
    [caseOpen, setCaseOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null),
    { reduced } = useMotionPreference();
  // Load 3D Moriveda monitor scripts immediately under the loader curtain so nothing loads after entering the landing page
  useEffect(() => {
    let cancelled = false;
    if (document.querySelector(`script[src="${asset("monitor/model.js")}"]`)) {
      completePrewarmTask("monitor");
      return;
    }
    const script = document.createElement("script");
    script.src = asset("monitor/model.js");
    script.async = true;
    script.onload = () => {
      if (cancelled) return;
      const controls = document.createElement("script");
      controls.src = asset("monitor/turn.js");
      controls.async = true;
      controls.onload = () => completePrewarmTask("monitor");
      controls.onerror = () => completePrewarmTask("monitor");
      document.body.append(controls);
    };
    script.onerror = () => completePrewarmTask("monitor");
    document.body.append(script);
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    const fragment = window.location.hash.slice(1);
    const target = document.getElementById(fragment === "profile" ? "about" : fragment);
    const frame = requestAnimationFrame(() =>
      target?.scrollIntoView({ behavior: "instant", block: "start" }),
    );
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main section[id]"),
    ];
    // Cache section document tops off the scroll path so scrolling triggers zero reflows
    let sectionTops: Array<{ id: string; top: number }> = [];
    let threshold = window.innerHeight * 0.35;
    const measureSections = () => {
      const y = window.scrollY;
      threshold = window.innerHeight * 0.35;
      sectionTops = sections.map((s) => ({
        id: s.id,
        top: s.getBoundingClientRect().top + y,
      }));
    };
    measureSections();
    let scheduled = 0;
    let lastActive = "home";
    const update = () => {
      scheduled = 0;
      const probe = window.scrollY + threshold;
      let current = "home";
      for (let i = 0; i < sectionTops.length; i++) {
        if (sectionTops[i].top <= probe) current = sectionTops[i].id;
      }
      if (current !== lastActive) {
        lastActive = current;
        setActive(current);
      }
    };
    const schedule = () => {
      if (!scheduled) scheduled = requestAnimationFrame(update);
    };
    const onLayout = () => {
      measureSections();
      schedule();
    };
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onLayout) : null;
    ro?.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onLayout, { passive: true });
    window.addEventListener("load", onLayout, { passive: true });
    update();
    return () => {
      ro?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onLayout);
      window.removeEventListener("load", onLayout);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scheduled);
    };
  }, []);

  useEffect(() => {
    if (caseOpen) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [caseOpen]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.social.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = email;
    }
  }
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <PortfolioCursor />
      <HeadingRipples />
      <DeltaNavbar
        active={active === "skills" || active === "education" ? "about" : active}
        email={email}
        onBlue={["about", "education", "experience", "contact"].includes(active)}
      />
      <main>
        {/* Top overscroll blue liquid reservoir: sits strictly above y = 0 with zero gap so pulling past the top reveals seamless blue */}
        <div className="top-overscroll-liquid" aria-hidden="true">
          <div className="top-overscroll-reservoir" />
        </div>
        <HeroFrame>
          <section className="hero" id="home">
            <div className="zero-flow-aura" aria-hidden="true">
              <span className="zero-orb zero-orb-a" />
              <span className="zero-orb zero-orb-b" />
            </div>
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" />
                <Scramble text="HELLO PARTITION_0, I'M" scrambleOnMount={false} />
              </div>
              <h1 aria-label={profile.name}>
                {["Aditya", "Malviya."].map((name) => (
                  <span className="name-line" aria-hidden="true" key={name}>
                    <RippleWord>
                      {name.split("").map((letter, index) => (
                        <span key={index} className="name-letter">{letter}</span>
                      ))}
                    </RippleWord>
                  </span>
                ))}
              </h1>
              <div className="role-sticker">
                <Scramble text="AZURE DATA" scrambleOnMount={false} />
                <br />
                <Scramble text="ENGINEER" scrambleOnMount={false} />
              </div>
              <p>{profile.tagline}</p>
              <div className="hero-links">
                <a className="text-link" href="#experience">
                  Explore my work <ArrowUpRight size={20} />
                </a>
                <button
                  className="text-link intro-link"
                  onClick={(event) => playProject("intro", event.currentTarget)}
                  aria-haspopup="dialog"
                >
                  <Play size={15} fill="currentColor" /> Watch my 70-sec intro
                </button>
              </div>
            </div>
            <motion.div
              className="hero-scene"
              initial={reduced ? false : { opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="desk-parallax">
                <LivingDesk
                  src={asset("assets/workspace-aditya.webp")}
                  alt="Personalized avatar of Aditya Malviya at his data engineering workspace"
                />
              </div>
              <div className="scene-note">
                <span className="status-dot" /> PIPELINES RUNNING. IDEAS
                FLOWING.
              </div>
            </motion.div>
            <div className="hero-bottom">
              <span>
                <MapPin size={14} /> MUMBAI, INDIA
              </span>
              <a href="#about" aria-label="Scroll to about">
                <ArrowDown size={23} />
              </a>
              <span>SCROLL TO EXPLORE</span>
            </div>
          </section>
        </HeroFrame>
        <section id="about" className="about blue-section">
          <SectionWatermarkCards section="about" tone="blue" />
          <AboutEditorial onIntro={(trigger) => playProject("intro", trigger)} />
          <ScrollPinnedStats stats={data.stats} />
        </section>
        {!reduced && <SkillsSection />}
        <section id={reduced ? "skills" : "education"} className="education-band blue-section" aria-label={reduced ? "Skills, education and certifications" : "Education and certifications"}>
          <div className="section-wrap">
            <div className="about-details">
              {reduced && (
                <Accordion title="Skills & capabilities" sheet>
                  <SkillsPanel />
                </Accordion>
              )}
              <Accordion title="Education & certifications" sheet>
                <div className="detail-content">
                  {data.certifications.map((c) => (
                    <p key={c.code}>
                      <strong>{c.code}</strong> — {c.name}
                    </p>
                  ))}
                  {data.education.map((e) => (
                    <div key={e.degree}>
                      <h3>{e.degree}</h3>
                      <p>
                        {e.institution} · {e.period} · {e.result}
                      </p>
                    </div>
                  ))}
                  <p>Languages: {data.languages.join(" · ")}</p>
                </div>
              </Accordion>
            </div>
          </div>
        </section>
        <ExperienceTimeline />
        <LiquidSectionWave edge="bottom" seed={3.7} />
        <section id="projects" className="projects showcase-section" aria-labelledby="projects-heading">
          <SectionWatermarkCards section="projects" tone="light" />
          <div className="section-wrap">
            <Reveal className="section-heading">
              <div>
                <VaultSticker text="PERSONAL PROJECTS" />
                <h2 id="projects-heading"><RippleWords text="Built to explore" suffix={<span className="orange">.</span>} /></h2>
              </div>
              <p>Tools I built to explore reel-first search, orchestration, <br />document AI, data quality, pipeline design, Spark diagnostics and SQL.</p>
            </Reveal>
            <ProjectGallery projects={skillProjects} onExplore={exploreProject} />
          </div>
        </section>
        <section id="research" className="research-section" aria-labelledby="research-heading" onMouseLeave={() => setActiveResearchNote(null)}>
          <SectionWatermarkCards section="research" tone="light" />
          <div className="section-wrap">
            <Reveal className="section-heading">
              <div><VaultSticker text="INDEPENDENT RESEARCH" /><h2 id="research-heading"><RippleWords text="Built on evidence" suffix={<span className="orange">.</span>} /></h2></div>
              <p>Testing the assumptions behind <br />Spark performance tuning.</p>
            </Reveal>
            <Reveal>
              <article className="research-feature">
                <div className="research-board" aria-label="Illustrated research evidence board">
                  <div className={`research-note research-note-skew${activeResearchNote === "skew" ? " is-open" : ""}`} role="button" tabIndex={0} aria-expanded={activeResearchNote === "skew"} onMouseEnter={() => setActiveResearchNote("skew")} onClick={() => setActiveResearchNote(activeResearchNote === "skew" ? null : "skew")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveResearchNote("skew"); } else if (event.key === "Escape") setActiveResearchNote(null); }}>
                    <span>FIELD NOTE / 01</span>
                    <strong>ONE HOT KEY.<br />TOO MUCH WORK.</strong>
                    <div className="research-skew-bars" aria-hidden="true"><i /><i /><i /><i /></div>
                    <p>Skewed partitions can dominate a join.</p>
                  </div>
                  <div className={`research-note research-note-aqe${activeResearchNote === "aqe" ? " is-open" : ""}`} role="button" tabIndex={0} aria-expanded={activeResearchNote === "aqe"} onMouseEnter={() => setActiveResearchNote("aqe")} onClick={() => setActiveResearchNote(activeResearchNote === "aqe" ? null : "aqe")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveResearchNote("aqe"); } else if (event.key === "Escape") setActiveResearchNote(null); }}>
                    <span>FIELD NOTE / 02</span>
                    <strong>CAN AQE SPLIT IT?</strong>
                    <div className="research-split-diagram" aria-hidden="true"><b />→<b /><b /><b /></div>
                    <p>Advisory partition size mattered in the measured probes.</p>
                  </div>
                  <div className={`research-note research-note-salt${activeResearchNote === "salt" ? " is-open" : ""}`} role="button" tabIndex={0} aria-expanded={activeResearchNote === "salt"} onMouseEnter={() => setActiveResearchNote("salt")} onClick={() => setActiveResearchNote(activeResearchNote === "salt" ? null : "salt")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveResearchNote("salt"); } else if (event.key === "Escape") setActiveResearchNote(null); }}>
                    <span>FIELD NOTE / 03</span>
                    <strong>SPREAD THE KEY</strong>
                    <div className="research-salt-diagram" aria-hidden="true">HOT KEY <em>→</em> #0 · #1 · #2 · #3</div>
                    <p>Balance reduced skew against replicated rows.</p>
                  </div>
                  <div className={`research-note research-note-trigger${activeResearchNote === "trigger" ? " is-open" : ""}`} role="button" tabIndex={0} aria-expanded={activeResearchNote === "trigger"} onMouseEnter={() => setActiveResearchNote("trigger")} onClick={() => setActiveResearchNote(activeResearchNote === "trigger" ? null : "trigger")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveResearchNote("trigger"); } else if (event.key === "Escape") setActiveResearchNote(null); }}>
                    <span>CONFIGURATION / TRIGGER</span><strong>101:1 SKEW<br />RULE DID NOT FIRE</strong>
                    <div className="research-pencil-line" aria-hidden="true">hot partition &lt; advisory size → no split</div>
                    <p>The final adaptive plan showed partition coalescing. Lowering the advisory size engaged the skew rule.</p>
                  </div>
                  <div className={`research-note research-note-replication${activeResearchNote === "replication" ? " is-open" : ""}`} role="button" tabIndex={0} aria-expanded={activeResearchNote === "replication"} onMouseEnter={() => setActiveResearchNote("replication")} onClick={() => setActiveResearchNote(activeResearchNote === "replication" ? null : "replication")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveResearchNote("replication"); } else if (event.key === "Escape") setActiveResearchNote(null); }}>
                    <span>SHUFFLE RECORDS / REPLICATION</span><strong>11 vs 20,000</strong>
                    <div className="research-mini-table"><span>Selective salting</span><b>11 / salt</b><span>Uniform salting</span><b>20,000</b></div>
                    <p>The measured row-count ratio was 1,818. Runtime cost remained unresolved.</p>
                  </div>
                  <div className={`research-note research-note-method${activeResearchNote === "method" ? " is-open" : ""}`} role="button" tabIndex={0} aria-expanded={activeResearchNote === "method"} onMouseEnter={() => setActiveResearchNote("method")} onClick={() => setActiveResearchNote(activeResearchNote === "method" ? null : "method")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveResearchNote("method"); } else if (event.key === "Escape") setActiveResearchNote(null); }}>
                    <span>BENCHMARK / SKEWBENCH</span><strong>CONTROL THE NOISE</strong>
                    <div className="research-pencil-line" aria-hidden="true">baseline ≈ selective salt k=1</div>
                    <p>Fixed-seed cell order and warmup address the cold-JVM effect. Small speedups are judged against the control floor.</p>
                  </div>
                  <div className={`research-note research-note-model${activeResearchNote === "model" ? " is-open" : ""}`} role="button" tabIndex={0} aria-expanded={activeResearchNote === "model"} onMouseEnter={() => setActiveResearchNote("model")} onClick={() => setActiveResearchNote(activeResearchNote === "model" ? null : "model")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveResearchNote("model"); } else if (event.key === "Escape") setActiveResearchNote(null); }}>
                    <span>COST MODEL / THEORY</span><strong>T(k) = aH/k + bP(k−1) + c</strong>
                    <div className="research-pencil-line" aria-hidden="true">less skew ↔ more replication</div>
                    <p>The predicted optimum is theoretical. This single-node study did not validate its runtime estimate.</p>
                  </div>
                  <div className={`research-figure research-paper${activeResearchNote ? " is-shifted" : ""}`}>
                    <span className="research-kicker">SKEWBENCH / {data.research.year}</span>
                    <h3>THE SKEW QUESTION</h3>
                    <a href={asset(data.research.document)} target="_blank" rel="noreferrer" aria-label="Read AQE vs Salting research paper"><img src={asset(data.research.image)} alt={data.research.imageAlt} width="1536" height="1024" loading="eager" decoding="async" /></a>
                    <p>A conceptual illustration of adaptive splitting and selective salting. Read the paper for measured results and limitations.</p>
                  </div>
                </div>
                <div className="research-copy">
                  <span className="showcase-category">RESEARCH PAPER / {data.research.pages}</span>
                  <h3>{data.research.title}</h3>
                  <p className="research-subtitle">{data.research.subtitle}</p>
                  <p>{data.research.description}</p>
                  <p>{data.research.finding}</p>
                  <p className="research-limit">{data.research.limitation}</p>
                  <div className="tags">{data.research.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className="showcase-links">
                    <a className="showcase-primary" href={asset(data.research.document)} target="_blank" rel="noreferrer"><FileText size={17} /> Read paper <span>PDF</span></a>
                    <a href={data.research.github} target="_blank" rel="noreferrer"><Github size={16} /> Research code <ArrowUpRight size={14} /></a>
                    <a href={asset(data.research.presentation)} download><Download size={16} /> Presentation <span>PPTX</span></a>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
        <section id="freelance" className="projects freelance-section">
          <SectionWatermarkCards section="freelance" tone="light" />
          <div className="monitor-scene" data-reduced={reduced}>
            <div className="monitor-sticky">
              <div className="monitor-heading section-heading"><div><VaultSticker text="INDEPENDENT WORK" /><h2><RippleWords text="Built end to end" suffix={<span className="orange">.</span>} /></h2></div><p>One brand. Every layer.<br/>From idea to a live storefront.</p></div>
              <div className="monitor-stage">
                <img className="monitor-poster" loading="eager" decoding="async" src={asset("monitor/turn/0.webp")} alt="Moriveda storefront monitor"/>
                <div className="monitor-screen-overlay" id="screen-mouse-layer" role="button" tabIndex={0} aria-label="Interactive Moriveda storefront preview — click to switch pages">
                  <div className="monitor-screen-sheen" aria-hidden="true" />
                  <div className="monitor-click-ripple" aria-hidden="true" />
                  <div className="monitor-cursor" data-shape="arrow" aria-hidden="true">
                    {/* Authentic macOS black pointer arrow with crisp white outline */}
                    <svg className="monitor-cursor-arrow" viewBox="0 0 28 28" width="24" height="24" fill="none">
                      <path
                        d="M5.2 2.4L5.2 21.8L9.9 17.3L13.1 24.4L16.2 23.0L13.0 16.0L19.4 16.0L5.2 2.4Z"
                        fill="#111111"
                        stroke="#FFFFFF"
                        strokeWidth="1.65"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Authentic macOS pointing hand cursor when hovering clickable button */}
                    <svg className="monitor-cursor-hand" viewBox="0 0 28 28" width="24" height="24" fill="none">
                      <path
                        d="M11.6 3.6C11.6 2.6 12.4 1.9 13.3 1.9C14.2 1.9 15.0 2.6 15.0 3.6V11.2C15.5 10.6 16.3 10.4 17.0 10.7C17.6 10.9 18.0 11.4 18.2 11.9C18.8 11.5 19.6 11.4 20.3 11.8C20.9 12.1 21.3 12.7 21.4 13.3C22.1 13.1 22.9 13.4 23.4 14.0C23.8 14.5 23.9 15.1 23.9 15.8L23.5 19.8C23.2 22.5 21.1 24.7 18.3 24.7H13.4C11.3 24.7 9.4 23.6 8.3 21.8L5.3 16.8C4.8 16.0 5.0 14.9 5.8 14.4C6.6 13.9 7.7 14.1 8.3 14.9L11.6 18.4V3.6Z"
                        fill="#FFFFFF"
                        stroke="#111111"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path d="M15.0 11.6V15.4M18.2 12.2V15.8M21.3 13.6V16.2" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="monitor-caption"><small id="hint">Scroll to reveal ↓</small></div>
            </div>
          </div>
          <div className="section-wrap"><Reveal><article className="freelance-feature">
                <div className="freelance-copy">
                  <div>
                    <div className="project-meta">
                      <span>SOLO FULL-STACK BUILD · MAY–JUN 2026</span>
                    </div>
                    <MorivedaTypewriter reduced={reduced} />
                    <p>
                      A pan-India D2C commerce platform, built freelance for a
                      friend's wellness brand. I owned research, design, code,
                      integrations, infrastructure, and launch.
                    </p>
                    <div className="tags">
                      {moriveda.stack.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      <button
                        className="button case-study-button"
                        onClick={() => setCaseOpen(true)}
                      >
                        Behind the build <ArrowUpRight size={17} />
                      </button>
                      <a
                        className="text-link"
                        href={moriveda.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit moriveda.in <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>
                  <div className="freelance-metrics">
                    <div>
                      <strong>
                        <Counter value="21" /> days
                      </strong>
                      <span>Concept to public launch</span>
                    </div>
                    <div>
                      <strong>17 Jun 2026</strong>
                      <span>First paid order · launch day</span>
                    </div>
                    <div>
                      <strong>100% solo</strong>
                      <span>Engineer, designer & integrator</span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
        <LiquidSectionWave edge="top" seed={5.2} />
        <section id="contact" className="contact blue-section">
          <SectionWatermarkCards section="contact" tone="blue" />
          <div className="section-wrap">
            <Reveal>
              <VaultSticker text="HAVE SOMETHING IN MIND?" light />
              <h2>
                <RippleWords text="Let's work" />
                <br />
                <RippleWord className="heading-accent">together<span className="orange">!</span></RippleWord>
              </h2>
            </Reveal>
            <Reveal className="contact-lower">
              <div>
                <p>Good things start with a conversation.</p>
                <a className="email-link" href={email}>
                  {profile.social.email} <ArrowUpRight size={22} />
                </a>
                <button className="copy-email" onClick={copyEmail}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
                  {copied ? "Email copied" : "Copy email"}
                </button>
                <span className="sr-only" role="status">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </div>
              <div className="social-links">
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin />
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github />
                </a>
                <a href={email} aria-label="Email">
                  <Mail />
                </a>
              </div>
            </Reveal>
            <div className="availability">
              <span className="status-dot" />
              {profile.availability} <span>·</span> Mumbai, India
            </div>
          </div>
          <div className="footer-ring" aria-hidden="true">
            <div className="footer-ring-plane">
              <svg className="footer-ring-wheel" viewBox="0 0 640 640">
                <defs>
                  <image id="footer-ring-logo" href={asset("am-monogram-v1.svg")} x="-59" y="21" width="118" height="118" />
                </defs>
                {LOGO_ANGLES.map((angle) => (
                  <use key={angle} href="#footer-ring-logo" transform={`rotate(${angle} 320 320) translate(320)`} />
                ))}
              </svg>
            </div>
          </div>
          <a href="#home" className="back-top">
            BACK TO TOP ↑
          </a>
        </section>
      </main>
      {videoProject && <ProjectVideoDialog key={videoProject.id} returnFocusTo={videoTrigger.current} project={videoProject} details={activeVideo.explore && videoProject.id !== "intro" ? skillProjects.find((project) => project.id === videoProject.id) : undefined} autoPlay={!activeVideo.explore} eyebrow={videoProject.id === "intro" ? "70-SECOND INTRO" : undefined} kind={videoProject.id === "intro" ? "Narrated profile video" : undefined} index={skillProjects.findIndex((project) => project.id === videoProject.id)} request={activeVideo.request} onClose={() => setActiveVideo((previous) => ({ id: "", request: previous.request, explore: false }))} />}
      <dialog
        ref={dialog}
        className="case-dialog"
        aria-labelledby="case-title"
        onCancel={(e) => {
          e.preventDefault();
          setCaseOpen(false);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setCaseOpen(false);
        }}
      >
        <AnimatePresence onExitComplete={() => dialog.current?.close()}>
          {caseOpen && (
            <motion.div
              className="case-panel"
              initial={{
                opacity: 0,
                y: reduced ? 0 : 70,
                scale: reduced ? 1 : 0.96,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduced ? 0 : 40 }}
              transition={{ duration: 0.35 }}
            >
              <button
                className="case-close"
                autoFocus
                onClick={() => setCaseOpen(false)}
                aria-label="Close Moriveda case study"
              >
                <X size={22} />
              </button>
              <img
                src={asset("assets/moriveda-live-1.webp")}
                alt="Moriveda live storefront artwork"
              />
              <div className="case-body">
                <Scramble className="label-sticker" text="FREELANCE · MAY–JUN 2026" />
                <h2 id="case-title">Moriveda</h2>
                <p>{moriveda.description}</p>
                <h3>What I built</h3>
                <ul>
                  <li>
                    Dual payment rails: Razorpay prepaid and Cash on Delivery,
                    webhook verification, and distinct failure handling.
                  </li>
                  <li>Phone OTP and Google OAuth 2.0 authentication.</li>
                  <li>
                    Automated courier dispatch, AWB generation, label printing,
                    and shipment cancellation through iThink Logistics.
                  </li>
                  <li>
                    Custom admin dashboard for orders, customers, coupons, and
                    fulfilment.
                  </li>
                  <li>
                    Coupon engine, transactional SMTP, newsletter, sitemap, and
                    robots configuration.
                  </li>
                  <li>
                    Seven-table normalized MySQL schema, foreign-key integrity,
                    product variants, and line-item order models.
                  </li>
                  <li>
                    Hostinger infrastructure, GoDaddy DNS, and .htaccess
                    protection for schema and logs.
                  </li>
                </ul>
                <h3>Delivered in 21 days</h3>
                <p>
                  Eight frontend pages, four external integrations, and the
                  first paid order on launch day: 17 June 2026. Sole engineer,
                  designer, and integrator.
                </p>
                <a
                  className="button case-study-button"
                  href={moriveda.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit the live store <ArrowUpRight size={17} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}
export default function App() {
  return (
    <MotionSystem>
      <Portfolio />
    </MotionSystem>
  );
}
