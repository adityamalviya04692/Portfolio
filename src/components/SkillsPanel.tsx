import { useEffect, useState } from "react";
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

  return (
    <div className="detail-content skills-content skills-panel">
      <div>
        <p className="skills-headline">
          I use <span className="skill-logo-slot" title={activeSkill}><img key={activeSkill} src={iconUrl(activeSkill)} alt={activeSkill} /></span>{" "}
          to turn on the pipelines that power better decisions<span className="orange">.</span>
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
        {data.capabilities.map(({ title, summary, points }) => (
          <details key={title} name="portfolio-skill-group">
            <summary>{title}<span aria-hidden="true">+</span></summary>
            <p>{summary}</p>
            <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
          </details>
        ))}
      </div>
    </div>
  );
}
