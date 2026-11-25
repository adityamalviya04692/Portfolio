import { motion } from "framer-motion";

interface DeltaLogoEmblemProps {
  /** "hero" during the loading intro, "nav" when docked inside the navbar notch */
  variant?: "hero" | "nav";
  /** Animate the perimeter outline trace during the intro */
  trace?: boolean;
  className?: string;
}

/**
 * Sculpted triangular emblem for Aditya Malviya ("am."), inspired by the
 * iconic Delta Cafés triangle that nests seamlessly between the two
 * diagonally chamfered navigation wings.
 */
export default function DeltaLogoEmblem({
  variant = "nav",
  trace = false,
  className = "",
}: DeltaLogoEmblemProps) {
  const isHero = variant === "hero";
  const gradId = isHero ? "am-tri-grad-hero" : "am-tri-grad-nav";
  const facetId = isHero ? "am-tri-facet-hero" : "am-tri-facet-nav";
  const sheenId = isHero ? "am-tri-sheen-hero" : "am-tri-sheen-nav";

  return (
    <svg
      viewBox="0 0 120 106"
      fill="none"
      aria-hidden="true"
      className={`delta-emblem-svg ${isHero ? "is-hero" : "is-nav"} ${className}`.trim()}
    >
      <defs>
        <linearGradient id={gradId} x1="60" y1="4" x2="60" y2="102" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff9f4a" />
          <stop offset="48%" stopColor="#ed8838" />
          <stop offset="100%" stopColor="#c75215" />
        </linearGradient>
        <linearGradient id={facetId} x1="16" y1="98" x2="72" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={sheenId} x1="0" y1="0" x2="120" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="38%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Main sculpted triangle body with subtly softened architectural corners */}
      <path
        d="M55.6 5.2C57.5 1.9 62.5 1.9 64.4 5.2L115.6 93.8C117.5 97.1 115.1 101.2 111.2 101.2H8.8C4.9 101.2 2.5 97.1 4.4 93.8L55.6 5.2Z"
        fill={`url(#${gradId})`}
      />

      {/* Dimensional light/shadow facet along the left slope */}
      <path
        d="M60 4L112.2 99.2H60V4Z"
        fill="#000000"
        fillOpacity="0.12"
      />
      <path
        d="M55.6 5.2C57.5 1.9 62.5 1.9 64.4 5.2L115.6 93.8C117.5 97.1 115.1 101.2 111.2 101.2H8.8C4.9 101.2 2.5 97.1 4.4 93.8L55.6 5.2Z"
        fill={`url(#${facetId})`}
      />

      {/* Inner beveled hairline border */}
      <path
        d="M57.2 8.2C58.4 6.1 61.6 6.1 62.8 8.2L111.2 92.2C112.4 94.3 110.9 97 108.4 97H11.6C9.1 97 7.6 94.3 8.8 92.2L57.2 8.2Z"
        stroke={`url(#${sheenId})`}
        strokeWidth="1.6"
      />

      {/* Animated perimeter laser-trace during the initial intro reveal */}
      {trace && (
        <motion.path
          d="M55.6 5.2C57.5 1.9 62.5 1.9 64.4 5.2L115.6 93.8C117.5 97.1 115.1 101.2 111.2 101.2H8.8C4.9 101.2 2.5 97.1 4.4 93.8L55.6 5.2Z"
          stroke="#fff6e6"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.95 }}
          animate={{ pathLength: 1, opacity: [0.95, 1, 0] }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Bold "am." monogram centered inside the lower-middle visual weight of the triangle */}
      <text
        x="58"
        y="74"
        textAnchor="middle"
        fill="#fffaf0"
        fontFamily="'DM Sans', sans-serif"
        fontWeight="900"
        fontSize="37"
        letterSpacing="-2.8"
      >
        am
        <tspan fill="#102b79">.</tspan>
      </text>

      {/* Crisp micro-caption beneath the monogram echoing Delta's "CAFÉS" sub-mark */}
      <text
        x="60"
        y="90"
        textAnchor="middle"
        fill="#fff7e8"
        fillOpacity="0.86"
        fontFamily="'Space Mono', monospace"
        fontWeight="700"
        fontSize="7.4"
        letterSpacing="2.4"
      >
        DATA ENG
      </text>
    </svg>
  );
}
