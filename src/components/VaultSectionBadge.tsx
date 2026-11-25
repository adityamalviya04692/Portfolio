import { memo } from "react";
import { motion } from "framer-motion";
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
 * Pure GPU-composited transforms (zero per-sticker scroll listeners, zero animated `top` layout thrash).
 */
export const VaultSticker = memo(function VaultSticker({
  text,
  light = false,
  className = "",
}: VaultStickerProps) {
  const { reduced } = useMotionPreference();

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
    <span className={`vault-sticker-stage ${light ? "is-light" : ""} ${className}`.trim()}>
      {/* Tight vertical chronological watermark deck — pure GPU translateY (zero Layout) */}
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
            initial={
              reduced
                ? { opacity: targetOpacity, y: yOffset, scale: targetScale, rotate: targetRotate }
                : { opacity: 0, y: yOffset * 0.4, scale: 0.9, rotate: -3 }
            }
            whileInView={{
              opacity: targetOpacity,
              y: yOffset,
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
        initial={reduced ? false : { opacity: 0, y: 24, scale: 0.92, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: -5 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 138, damping: 19, mass: 0.88, delay: 0.08 }
        }
      >
        <Scramble text={text} />
      </motion.span>
    </span>
  );
});

export function SectionWatermarkCards(_props: {
  section: "about" | "experience" | "projects" | "research" | "freelance" | "contact";
  tone?: "light" | "blue";
}) {
  return null;
}
