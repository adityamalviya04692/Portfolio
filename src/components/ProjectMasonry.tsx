import type { ReactNode } from "react";

/** Keep projects in paired rows with a shared starting edge. */
export default function ProjectMasonry({ children }: { children: ReactNode }) {
  return <div className="showcase-grid">{children}</div>;
}
