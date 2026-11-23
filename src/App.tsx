import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
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
import ExperienceTimeline from "./components/ExperienceTimeline";
import LivingDesk from "./components/LivingDesk";
import ProjectVideoDialog from "./components/ProjectVideoDialog";
import AboutEditorial from "./components/AboutEditorial";
import SkillsPanel from "./components/SkillsPanel";
import ProjectGallery from "./components/ProjectGallery";
import {
  Accordion,
  AvatarPortal,
  Counter,
  HeroFrame,
  MotionSystem,
  Reveal,
  Scramble,
  Tilt,
  useMotionPreference,
} from "./components/MotionSystem";
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const profile = data.profile,
  email = `mailto:${profile.social.email}`;
const moriveda = data.projects.find((project) => project.id === "moriveda")!;
const skillProjects = data.projects.filter((project) => project.id !== "moriveda");

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
  const [active, setActive] = useState("home"),
    [copied, setCopied] = useState(false),
    [slide, setSlide] = useState(0),
    [caseOpen, setCaseOpen] = useState(false);
  const navigation = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null),
    { reduced } = useMotionPreference();
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    const frame = requestAnimationFrame(() =>
      target?.scrollIntoView({ behavior: "instant", block: "start" }),
    );
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main section[id]"),
    ];
    let scheduled = 0;
    const update = () => {
      scheduled = 0;
      let current = "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35)
          current = section.id;
      }
      setActive(current === "profile" ? "about" : current);
    };
    const schedule = () => {
      if (!scheduled) scheduled = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scheduled);
    };
  }, []);
  useEffect(() => {
    const nav = navigation.current;
    if (!nav || nav.scrollWidth <= nav.clientWidth) return;
    const link = nav.querySelector('[aria-current="location"]');
    const navBox = nav.getBoundingClientRect();
    const linkBox = link?.getBoundingClientRect();
    nav.scrollTo({
      left: linkBox
        ? nav.scrollLeft + linkBox.left - navBox.left + (linkBox.width - nav.clientWidth) / 2
        : 0,
      behavior: reduced ? "instant" : "smooth",
    });
  }, [active, reduced]);
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
      <header
        className={`site-header ${["about", "experience", "contact"].includes(active) ? "on-blue" : ""}`}
      >
        <a className="monogram" href="#home" aria-label="Aditya Malviya home">
          <RippleWord>a<span className="monogram-accent">m.</span></RippleWord>
        </a>
        <motion.nav ref={navigation} layoutScroll aria-label="Main navigation">
          {["about", "experience", "projects", "research", "freelance", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={active === id ? "active" : ""}
            >
              {active === id && (
                <motion.span
                  className="nav-indicator"
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <RippleWord>{id}</RippleWord>
            </a>
          ))}
        </motion.nav>
        <a className="contact-pill" href={email}>
          <span><RippleWords text="Get in touch" /></span> <ArrowUpRight size={17} />
        </a>
      </header>
      <main>
        <HeroFrame>
          <section className="hero" id="home">
            <div className="hero-copy">
              <Reveal>
                <div className="eyebrow">
                  <span className="status-dot" />
                  <Scramble text="HELLO PARTITION_0, I'M" />
                </div>
              </Reveal>
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
              <Reveal delay={0.3}>
                <div className="role-sticker">
                  <Scramble text="AZURE DATA" />
                  <br />
                  <Scramble text="ENGINEER" />
                </div>
              </Reveal>
              <Reveal delay={0.4}>
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
              </Reveal>
            </div>
            <motion.div
              className="hero-scene"
              initial={reduced ? false : { opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="desk-parallax">
                <LivingDesk
                  src={asset("assets/workspace-aditya.png")}
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
        <AvatarPortal />
        <section id="profile" className="about blue-section">
          <AboutEditorial onIntro={(trigger) => playProject("intro", trigger)} />
          <div className="section-wrap">
            <div className="stats">
              {data.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <strong>
                    <Counter value={stat.value} />
                  </strong>
                  <span>{stat.label}</span>
                </Reveal>
              ))}
            </div>
            <div id="skills" className="about-details">
              <Accordion title="Skills & capabilities" sheet>
                <SkillsPanel />
              </Accordion>
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
        <section id="projects" className="projects showcase-section" aria-labelledby="projects-heading">
          <div className="section-wrap">
            <Reveal className="section-heading">
              <div>
                <span className="label-sticker">PERSONAL PROJECTS</span>
                <h2 id="projects-heading"><RippleWords text="Built to explore" suffix={<span className="orange">.</span>} /></h2>
              </div>
              <p>Tools I built to explore reel-first search, orchestration, <br />document AI, data quality, pipeline design, Spark diagnostics and SQL.</p>
            </Reveal>
            <ProjectGallery projects={skillProjects} onExplore={exploreProject} />
          </div>
        </section>
        <section id="research" className="research-section" aria-labelledby="research-heading">
          <div className="section-wrap">
            <Reveal className="section-heading">
              <div><span className="label-sticker">INDEPENDENT RESEARCH</span><h2 id="research-heading"><RippleWords text="Built on evidence" suffix={<span className="orange">.</span>} /></h2></div>
              <p>Testing the assumptions behind <br />Spark performance tuning.</p>
            </Reveal>
            <Reveal>
              <article className="research-feature">
                <div className="research-figure">
                  <span className="research-kicker">SKEWBENCH / {data.research.year}</span>
                  <a href={asset(data.research.document)} target="_blank" rel="noreferrer" aria-label="Read AQE vs Salting research paper"><img src={asset(data.research.image)} alt={data.research.imageAlt} width="1536" height="1024" loading="lazy" /></a>
                  <p>A conceptual illustration of adaptive splitting and selective salting. Read the paper for measured results and limitations.</p>
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
          <div className="section-wrap">
            <Reveal className="section-heading">
              <div>
                <span className="label-sticker">
                  <Scramble text="INDEPENDENT WORK" />
                </span>
                <h2>
                  <RippleWords text="Built end to end" suffix={<span className="orange">.</span>} />
                </h2>
              </div>
              <p>
                One brand. Every layer.
                <br />
                From idea to a live storefront.
              </p>
            </Reveal>
            <Reveal>
              <article className="freelance-feature">
                <Tilt className="moriveda-preview">
                  <div className="live-browser-bar">
                    <span>● ● ●</span>
                    <span>moriveda.in</span>
                    <a
                      href={moriveda.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Visit live Moriveda website"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                  <div className="live-image-stage">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={slide}
                        src={asset(`assets/moriveda-live-${slide + 1}.webp`)}
                        alt={`Original Moriveda storefront hero artwork, slide ${slide + 1}`}
                        initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </AnimatePresence>
                    <button
                      className="preview-open"
                      onClick={() => setCaseOpen(true)}
                    >
                      Explore the build <ArrowUpRight size={20} />
                    </button>
                  </div>
                  <div className="carousel-controls">
                    <span>ORIGINAL ARTWORK FROM THE LIVE STOREFRONT</span>
                    <div>
                      <button
                        aria-label="Previous Moriveda image"
                        onClick={() => setSlide((slide + 2) % 3)}
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <span>{slide + 1} / 3</span>
                      <button
                        aria-label="Next Moriveda image"
                        onClick={() => setSlide((slide + 1) % 3)}
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </Tilt>
                <div className="freelance-copy">
                  <div>
                    <div className="project-meta">
                      <span>SOLO FULL-STACK BUILD · MAY–JUN 2026</span>
                    </div>
                    <h3>
                      Moriveda<span className="orange">.</span>
                    </h3>
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
        <section id="contact" className="contact blue-section">
          <div className="section-wrap">
            <Reveal>
              <span className="label-sticker light">
                <Scramble text="HAVE SOMETHING IN MIND?" />
              </span>
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
                <span className="label-sticker">FREELANCE · MAY–JUN 2026</span>
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
