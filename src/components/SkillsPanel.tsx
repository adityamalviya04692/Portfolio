import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPreference } from "./MotionSystem";
import data from "../data/portfolio.json";
import skillIcons from "../data/skillIcons.json";

const icons: Record<string, string> = skillIcons;
const names = ["Python", ...Object.keys(icons).filter((name) => name !== "Python")];
const iconUrl = (name: string) => import.meta.env.BASE_URL + "assets/skills/" + icons[name];

export default function SkillsPanel() {
  const { reduced } = useMotionPreference();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((previous) => (previous + 1) % names.length), 1350);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const activeSkill = names[reduced ? 0 : index];

  useEffect(() => {
    if (reduced) return;
    const nextLogo = new Image();
    nextLogo.src = iconUrl(names[(index + 1) % names.length]);
  }, [index, reduced]);

  return (
    <div className="detail-content skills-content skills-panel">
      <div>
        <p className="skills-headline">
          I use{" "}
          <span className="skill-logo-slot" title={activeSkill} role="img" aria-label={activeSkill}>
            <AnimatePresence initial={false}>
              <motion.img
                key={activeSkill}
                src={iconUrl(activeSkill)}
                alt=""
                initial={reduced ? false : { opacity: 0, y: "18%", scale: 0.94 }}
                animate={{ opacity: 1, y: "0%", scale: 1 }}
                exit={{ opacity: 0, y: "-18%", scale: 0.94 }}
                transition={{ duration: reduced ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
              />
            </AnimatePresence>
          </span>{" "}
          to turn raw data into <em>answers</em><span className="orange">.</span>
        </p>
      </div>
      <div className="skill-options">
        {data.skills.categories.map(({ name, items }) => (
          <details key={name} name="portfolio-skill-group">
            <summary>{name}<span aria-hidden="true">+</span></summary>
            <div className="tags">
              {items.map((item) => (
                <span key={item}>
                  {icons[item] && <img src={iconUrl(item)} alt="" loading="lazy" />}
                  {item}
                </span>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
