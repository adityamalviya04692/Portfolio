import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Scramble, useMotionPreference } from "./MotionSystem";
import "./VaultSectionBadge.css";

interface VaultStickerProps {
  text: string;
  light?: boolean;
  className?: string;
}

/**
 * Chronological portfolio section stickers — passed ones sit tightly stacked
 * above the current sticker as same-sized watermark cards, and upcoming ones
 * sit tightly stacked below it in chronological order.
 */
const CHRONOLOGICAL_SECTIONS = [
  "A LITTLE ABOUT ME",
  "SKILLS & CAPABILITIES",
  "EDUCATION & CERTIFICATIONS",
  "PROFESSIONAL EXPERIENCE",
  "PERSONAL PROJECTS",
  "INDEPENDENT RESEARCH",
  "INDEPENDENT WORK",
  "HAVE SOMETHING IN MIND?",
] as const;

/**
 * The Vault: Card Features inspired section badge.
 * Sits closely above each main section heading while same-sized chronological
 * watermark cards (passed sections above, upcoming sections below) stack
 * tightly behind it and glide smoothly with scroll.
 */
export function VaultSticker({ text, light = false, className = "" }: VaultStickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotionPreference();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 86, damping: 24, mass: 0.72 });
  const floatY = useTransform(smoothScroll, [0, 0.5, 1], [3, 0, -3]);
  const floatRot = useTransform(smoothScroll, [0, 0.5, 1], [-3.2, -5, -5.8]);
  const stackDriftY = useTransform(smoothScroll, [0, 0.5, 1], [8, 0, -8]);

  const normalized = text.trim().toUpperCase();
  const currentIdx = CHRONOLOGICAL_SECTIONS.findIndex((label) => label === normalized);

  const passedCards =
    currentIdx > 0
      ? CHRONOLOGICAL_SECTIONS.slice(Math.max(0, currentIdx - 2), currentIdx).map((label, idx, arr) => ({
          label,
          step: -(arr.length - idx),
        }))
      : [];

  const upcomingCards =
    currentIdx >= 0 && currentIdx < CHRONOLOGICAL_SECTIONS.length - 1
      ? CHRONOLOGICAL_SECTIONS.slice(currentIdx + 1, Math.min(CHRONOLOGICAL_SECTIONS.length, currentIdx + 3)).map(
          (label, idx) => ({
            label,
            step: idx + 1,
          }),
        )
      : [];

  const verticalDeck = [...passedCards, ...upcomingCards];

  return (
    <span ref={ref} className={`vault-sticker-stage ${light ? "is-light" : ""} ${className}`.trim()}>
      {/* Tight vertical chronological watermark deck — exact same size as main card */}
      {verticalDeck.map(({ label, step }) => {
        const absStep = Math.abs(step);
        const yOffset = step * 18;
        const targetOpacity = absStep === 1 ? 0.17 : 0.085;
        const targetScale = absStep === 1 ? 0.97 : 0.92;
        const targetRotate = -5 + step * 0.85;

        return (
          <motion.span
            key={label}
            className={`label-sticker vault-chrono-wm ${light ? "light" : ""}`}
            aria-hidden="true"
            style={reduced ? undefined : { y: stackDriftY }}
            initial={
              reduced
                ? { opacity: targetOpacity, top: yOffset, scale: targetScale, rotate: targetRotate }
                : { opacity: 0, top: yOffset * 0.4, scale: 0.9, rotate: -3 }
            }
            whileInView={{
              opacity: targetOpacity,
              top: yOffset,
              scale: targetScale,
              rotate: targetRotate,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 118,
                    damping: 20,
                    mass: 0.9,
                    delay: 0.05 + absStep * 0.04,
                  }
            }
          >
            {label}
          </motion.span>
        );
      })}

      {/* Primary tilted sticker hugging closely above the section headline */}
      <motion.span
        className={`label-sticker vault-sticker-front ${light ? "light" : ""}`}
        style={reduced ? undefined : { y: floatY, rotate: floatRot }}
        initial={reduced ? false : { opacity: 0, y: 28, scale: 0.9, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: -5 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 138, damping: 19, mass: 0.88, delay: 0.1 }
        }
      >
        <Scramble text={text} />
      </motion.span>
    </span>
  );
}

export function SectionWatermarkCards(_props: {
  section: "about" | "experience" | "projects" | "research" | "freelance" | "contact";
  tone?: "light" | "blue";
}) {
  return null;
}
