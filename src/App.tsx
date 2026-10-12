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
} from "lucide-react";
import data from "./data/portfolio.json";
import ProjectArt from "./components/ProjectArt";
import ScrubVideo from "./components/ScrubVideo";
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
const moriveda = data.projects[0];

function Portfolio() {
  const [active, setActive] = useState("home"),
    [copied, setCopied] = useState(false),
    [slide, setSlide] = useState(0),
    [caseOpen, setCaseOpen] = useState(false);
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
      <header
        className={`site-header ${["about", "experience", "contact"].includes(active) ? "on-blue" : ""}`}
      >
        <a className="monogram" href="#home" aria-label="Aditya Malviya home">
          a<span>m.</span>
        </a>
        <nav aria-label="Main navigation">
          {["about", "experience", "projects", "contact"].map((id) => (
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
              <span>{id}</span>
            </a>
          ))}
        </nav>
        <a className="contact-pill" href={email}>
          Get in touch <ArrowUpRight size={17} />
        </a>
      </header>
      <main>
        <HeroFrame>
          <section className="hero" id="home">
            <div className="hero-copy">
              <Reveal>
                <div className="eyebrow">
                  <span className="status-dot" />
                  <Scramble text="HELLO WORLD, I'M" />
                </div>
              </Reveal>
              <h1 aria-label={profile.name}>
                {["Aditya", "Malviya."].map((name, row) => (
                  <span className="name-line" aria-hidden="true" key={name}>
                    {name.split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        className="name-letter"
                        initial={
                          reduced ? false : { y: 130, rotate: 12, opacity: 0 }
                        }
                        animate={{ y: 0, rotate: 0, opacity: 1 }}
                        transition={{
                          delay: 0.1 + row * 0.14 + i * 0.04,
                          duration: 0.85,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
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
                <a className="text-link" href="#experience">
                  Explore my work <ArrowUpRight size={20} />
                </a>
              </Reveal>
            </div>
            <motion.div
              className="hero-scene"
              initial={reduced ? false : { opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt className="desk-parallax seated-scene">
                <img
                  src={asset("assets/workspace-aditya-headless.png")}
                  alt="Seated data engineer at his workspace, with an animated portrait"
                  loading="eager"
                  draggable={false}
                />
                <ScrubVideo />
              </Tilt>
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
          <div className="section-wrap">
            <div className="about-top">
              <Reveal>
                <Tilt>
                  <div className="portrait-card">
                    <div className="portrait-caption">
                      THE HUMAN BEHIND THE CODE ↘
                    </div>
                    <img
                      src={asset(profile.avatar)}
                      alt="Aditya Malviya"
                      loading="lazy"
                    />
                    <div className="photo-bottom">
                      <strong>Aditya.</strong>
                      <span>
                        Mumbai, India <MapPin size={14} />
                      </span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
              <Reveal className="about-copy" delay={0.1}>
                <span className="label-sticker light">
                  <Scramble text="A LITTLE ABOUT ME" />
                </span>
                <h2>
                  Big on data.
                  <br />
                  Bigger on <span>impact.</span>
                </h2>
                <p>{profile.bio}</p>
                <p className="secondary-copy">{profile.bioSecondary}</p>
                <a
                  className="button cream-button"
                  href={asset(profile.resume)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download resume <Download size={17} />
                </a>
                <a className="resume-docx-link" href={asset(profile.resumeDocx)} download>
                  Download DOCX for applications
                </a>
              </Reveal>
            </div>
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
              <Accordion title="Skills & capabilities">
                <div className="detail-content skills-content">
                  {data.skills.categories.map((c) => (
                    <div key={c.name}>
                      <h3>{c.name}</h3>
                      <div className="tags">
                        {c.items.map((i) => (
                          <span key={i}>{i}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {data.capabilities.map((c) => (
                    <div key={c.title}>
                      <h3>{c.title}</h3>
                      <p>{c.summary}</p>
                      <ul>
                        {c.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Accordion>
              <Accordion title="Education & certifications">
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
        <section id="experience" className="experience blue-section">
          <div className="section-wrap">
            <Reveal>
              <span className="label-sticker light">
                <Scramble text="PROFESSIONAL EXPERIENCE" />
              </span>
              <h2>
                Built in production<span className="orange">.</span>
              </h2>
              <div className="employer-heading">
                <img className="employer-logo" src={asset("assets/tcs-logo.jpg")} alt="Tata Consultancy Services logo" />
                <div>
                  <span className="employer-label">EMPLOYER</span>
                  <h3>Tata Consultancy Services</h3>
                  <p>
                    Senior Data Engineer & Scrum Master (Mar 2026–present) · Data Engineer (Dec 2021–Feb 2026)
                  </p>
                </div>
                <span>
                  DEC 2021 — PRESENT
                  <br />
                  Mumbai, India
                </span>
              </div>
              <p className="experience-intro">Rolls-Royce Digital account · Feb 2022 – present</p>
            </Reveal>
            <div className="professional-grid">
              {data.experience[0].projects.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.12}>
                  <article className="professional-card">
                    <div className="experience-account">
                      <div className="account-logo rolls-royce-logo"><img src={asset("assets/rolls-royce-plc.svg")} alt="Rolls-Royce plc logo" /></div>
                      <div><strong>Rolls-Royce Digital</strong><span>TCS client account · Feb 2022 – present</span></div>
                    </div>
                    <div className="assignment-meta">
                      <span>0{i + 1} / TCS · ROLLS-ROYCE DIGITAL</span>
                      <span>{p.period}</span>
                    </div>
                    <h3>{p.name}</h3>
                    <p>
                      {i === 0
                        ? "End-to-end Azure lakehouse engineering, governance, and Spark performance optimization."
                        : "Production FastAPI data services, access control, and reliable cloud deployments."}
                    </p>
                    <ProjectArt type={i === 0 ? "pipeline" : "backend"} />
                    <div className="assignment-impact">
                      {i === 0 ? (
                        <>
                          <strong>52 → 14 min</strong>
                          <span>
                            ~73% shorter Spark runtime · ~40% lower Azure costs
                          </span>
                        </>
                      ) : (
                        <>
                          <strong>~30% faster</strong>
                          <span>
                            Backend performance through caching & optimization
                          </span>
                        </>
                      )}
                    </div>
                    <Accordion title={`View ${p.name} contributions`}>
                      <ul>
                        {p.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </Accordion>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="earlier-experience-heading">
              <span className="label-sticker light">EARLIER EXPERIENCE</span>
              <h3>Earlier experience, in full.</h3>
              <p>Avery Dennison client work at TCS and a separate earlier BYJU’S internship.</p>
            </Reveal>
            <div className="professional-grid earlier-experience-grid">
              <Reveal>
                <article className="professional-card">
                  <div className="experience-account">
                    <div className="account-logo"><img src={asset("assets/avery-dennison-logo.png")} alt="Avery Dennison logo" /></div>
                    <div><strong>Avery Dennison</strong><span>TCS client account · Smartrac RFID division</span></div>
                  </div>
                  <div className="assignment-meta">
                    <span>DATA ENGINEER &amp; BACKEND DEVELOPER</span>
                    <span>DEC 2021 — JAN 2022</span>
                  </div>
                  <h3>Smartrac R&amp;D Data and AI Platform</h3>
                  <p>Prepared RFID research data for an AI-powered tool using Databricks on Google Cloud Platform.</p>
                  <ProjectArt type="smartrac" />
                  <div className="assignment-impact">
                    <strong>GCP + Databricks</strong>
                    <span>Data pipelines, backend services and semantic search</span>
                  </div>
                  <ul className="experience-highlights">
                    <li>Ingested, cleansed and prepared Smartrac RFID R&amp;D datasets used to train machine learning models.</li>
                    <li>Built backend and AI components with Vertex AI (Google pre-trained models), Cloud Functions and a vector database.</li>
                  </ul>
                </article>
              </Reveal>
              <Reveal delay={0.12}>
                <article className="professional-card">
                  <div className="experience-account">
                    <div className="account-logo"><img src={asset("assets/byjus-logo.png")} alt="BYJU’S logo" /></div>
                    <div><strong>BYJU’S</strong><span>Separate internship · GradeUp · Remote from Hyderabad</span></div>
                  </div>
                  <div className="assignment-meta">
                    <span>PYTHON DEVELOPER INTERN</span>
                    <span>JUL — NOV 2021</span>
                  </div>
                  <h3>Python development for GradeUp</h3>
                  <p>Contributed Python development for GradeUp following its acquisition by BYJU’S.</p>
                  <ProjectArt type="byjus" />
                  <div className="assignment-impact">
                    <strong>Python development</strong>
                    <span>BYJU’S · GradeUp · internship</span>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>
        <section id="projects" className="projects freelance-section">
          <div className="section-wrap">
            <Reveal className="section-heading">
              <div>
                <span className="label-sticker">
                  <Scramble text="INDEPENDENT WORK" />
                </span>
                <h2>
                  Freelance<span className="orange">.</span>
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
                Let's work
                <br />
                <span>together</span>
                <span className="orange">!</span>
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
        </section>
      </main>
      <footer>
        <a className="monogram" href="#home" aria-label="Back to top">
          a<span>m.</span>
        </a>
        <span>© {new Date().getFullYear()} Aditya Malviya</span>
        <a href={asset(profile.resume)} target="_blank" rel="noreferrer">
          Resume <ArrowUpRight size={14} />
        </a>
        <a href={`tel:${profile.social.phone.replace(/\s/g, "")}`}>
          Let's talk <ArrowUpRight size={14} />
        </a>
        <a href="#home" className="back-top">
          BACK TO TOP ↑
        </a>
      </footer>
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
