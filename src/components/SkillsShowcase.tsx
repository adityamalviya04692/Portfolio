import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "../data/portfolio.json";
import skillIcons from "../data/skillIcons.json";
import { RippleWords } from "./HeadingRipples";
import { Scramble, useMotionPreference } from "./MotionSystem";
import "./SkillsShowcase.css";

const assetUrl = (p: string) => `${import.meta.env.BASE_URL}${p}`;
const iconMap: Record<string, string> = skillIcons;

const SHORT_LABELS: Record<string, string> = {
  "Azure Portal": "Azure",
  "Azure Databricks": "Databricks",
  "Azure Data Factory (ADF)": "ADF",
  "ADLS Gen2": "ADLS Gen2",
  "Apache Kafka": "Kafka",
  "Azure Event Hubs": "Event Hubs",
  "Delta Lake": "Delta",
  "Unity Catalog": "Unity",
  "Databricks Jobs & Pipelines": "DBX Jobs",
  "Auto Loader": "Auto Loader",
  "Azure Key Vault": "Key Vault",
  "Azure DevOps": "DevOps",
  "Azure Blob Storage": "Blob",
  "Apache Spark": "Spark",
  "Spark Structured Streaming": "Streaming",
  "Spark Performance Tuning": "Tuning",
  "Medallion Architecture": "Medallion",
  "SCD Type 2": "SCD-2",
  "Apache Airflow": "Airflow",
  "Delta Live Tables": "DLT",
  "Data Governance": "Governance",
  "Data Quality Frameworks": "Quality",
  "Data Lineage": "Lineage",
  "Scrum Master": "Scrum",
  "Code Reviews": "Reviews",
  "SQL / T-SQL": "SQL",
  "Data Warehousing": "Warehouse",
  "Dimensional Data Modeling": "Modeling",
  "MS SQL Server": "SQL Server",
  "PostgreSQL": "Postgres",
  "Redis Cache": "Redis",
  "Azure API Management": "APIM",
  "Azure Synapse Analytics": "Synapse",
  "Google Cloud Platform (GCP)": "GCP",
  "Databricks on Google Cloud": "DBX GCP",
  "Google Cloud Functions": "Functions",
  "Vector Databases": "Vector DB",
  "Google Gemini": "Gemini",
  "Google Antigravity": "Antigravity",
  "GitHub Copilot": "Copilot",
  "Microsoft Copilot": "M365 AI",
};
const shortLabel = (name: string) => SHORT_LABELS[name] || name;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}



const PALETTES_LIGHT = [
  { top: "#f6f0e4", left: "#e4d9c5", leftBot: "#c7baa2", right: "#cabda6", rightBot: "#a6977e", win: "#3b5678", lit: "#ed8838" },
  { top: "#f0a366", left: "#ed8838", leftBot: "#c7681f", right: "#d16f24", rightBot: "#9e4d12", win: "#fff5e6", lit: "#fef08a" },
  { top: "#8fb3d1", left: "#4b7b8b", leftBot: "#2e5463", right: "#386375", rightBot: "#22414f", win: "#e6f3fa", lit: "#f5c478" },
  { top: "#7c94c9", left: "#3d5594", leftBot: "#1c3370", right: "#29407d", rightBot: "#102b79", win: "#dce6fa", lit: "#f2bd83" },
  { top: "#f2cf88", left: "#d9a954", leftBot: "#b08230", right: "#ba8b38", rightBot: "#8f651d", win: "#2d3e70", lit: "#fffbeb" },
  { top: "#88bfa1", left: "#569674", leftBot: "#397053", right: "#3f7d5d", rightBot: "#27573f", win: "#e4f7ed", lit: "#fef08a" },
  { top: "#e3c5aa", left: "#c49b7a", leftBot: "#9c7454", right: "#a67e5f", rightBot: "#7d5b40", win: "#292820", lit: "#ed8838" },
  { top: "#d6cebf", left: "#b8ae9c", leftBot: "#948977", right: "#9c9180", rightBot: "#786d5c", win: "#425873", lit: "#f2bd83" },
];

const PALETTES_DARK = [
  { top: "#38466e", left: "#263254", leftBot: "#141c36", right: "#1b2440", rightBot: "#0e1429", win: "#f0a463", lit: "#ed8838" },
  { top: "#c77434", left: "#9c5521", leftBot: "#6b3611", right: "#7d4116", rightBot: "#4d260b", win: "#ffe3ba", lit: "#fde68a" },
  { top: "#426a85", left: "#2b4b63", leftBot: "#193042", right: "#1f394d", rightBot: "#112230", win: "#8dbbe0", lit: "#ed8838" },
  { top: "#4c62a6", left: "#324580", leftBot: "#1c2854", right: "#243466", rightBot: "#121c3d", win: "#b8c9ff", lit: "#f2bd83" },
  { top: "#53607d", left: "#39445e", leftBot: "#222a3d", right: "#2b344a", rightBot: "#171d2e", win: "#f5c478", lit: "#ed8838" },
  { top: "#36695e", left: "#244d44", leftBot: "#15302a", right: "#1a3b34", rightBot: "#0f241f", win: "#9ee3cf", lit: "#f2bd83" },
];

const ROAD_X = [-5.8, -2.15, 2.15, 5.8];
const ROAD_Y = [-5.4, -1.75, 1.75, 5.4];
const CANAL_Y0 = 3.55;
const CANAL_Y1 = 4.45;
const METRO_Y = -3.75;

interface Struct {
  kind: string;
  gx: number;
  gy: number;
  w: number;
  d: number;
  h: number;
  floors?: number;
  cols?: number;
  hasFountain?: boolean;
  hasHvac?: boolean;
  hasWaterTower?: boolean;
  hasHelipad?: boolean;
  hasSpire?: boolean;
  hasSolar?: boolean;
  hasBillboard?: boolean;
  hasRoofGarden?: boolean;
  trees?: number;
  seed?: number;
  palIdx: number;
}

function buildCityStructures(): Struct[] {
  const rand = mulberry32(9721);
  const structures: Struct[] = [
    { kind: "stadium", gx: 0.0, gy: -0.05, w: 1.92, d: 1.46, h: 34, palIdx: 0 },
    { kind: "airport", gx: 4.1, gy: -3.25, w: 2.45, d: 1.22, h: 28, palIdx: 2 },
    { kind: "controlTower", gx: 5.2, gy: -2.5, w: 0.44, d: 0.44, h: 98, palIdx: 0 },
    { kind: "spire", gx: -3.9, gy: -3.1, w: 0.88, d: 0.88, h: 142, palIdx: 3 },
    { kind: "twin", gx: -0.3, gy: -2.9, w: 1.22, d: 0.72, h: 116, palIdx: 1 },
    { kind: "cantilever", gx: -3.65, gy: -0.05, w: 0.92, d: 0.88, h: 96, palIdx: 5 },
    { kind: "rotunda", gx: 3.55, gy: -0.05, w: 1.04, d: 1.04, h: 54, palIdx: 0 },
    { kind: "sawtooth", gx: -7.1, gy: -0.05, w: 1.28, d: 0.96, h: 34, palIdx: 1 },
    { kind: "clocktower", gx: -4.1, gy: 2.65, w: 0.56, d: 0.56, h: 86, palIdx: 4 },
    { kind: "datacenter", gx: 0.15, gy: 2.68, w: 1.24, d: 0.86, h: 32, palIdx: 3 },
    { kind: "greenhouse", gx: -3.2, gy: 6.45, w: 1.12, d: 0.78, h: 26, palIdx: 5 },
    { kind: "pond", gx: 3.85, gy: 2.65, w: 1.38, d: 0.94, h: 3, palIdx: 2 },
    { kind: "spire", gx: 7.2, gy: -0.1, w: 0.84, d: 0.84, h: 122, palIdx: 2 },
    { kind: "twin", gx: -7.1, gy: 2.75, w: 1.15, d: 0.68, h: 100, palIdx: 3 },
  ];

  const isReserved = (gx: number, gy: number) => {
    for (const rx of ROAD_X) if (Math.abs(gx - rx) < 0.44) return true;
    for (const ry of ROAD_Y) if (Math.abs(gy - ry) < 0.44) return true;
    if (gy > CANAL_Y0 - 0.42 && gy < CANAL_Y1 + 0.42) return true;
    if (Math.abs(gy - METRO_Y) < 0.36) return true;
    if (gx > 2.4 && gx < 7.2 && gy > -4.6 && gy < -3.8) return true;
    for (const s of structures) {
      if (Math.abs(gx - s.gx) < s.w * 0.54 + 0.28 && Math.abs(gy - s.gy) < s.d * 0.54 + 0.28) return true;
    }
    return false;
  };

  const variants = ["stepped", "gable", "courtyard", "penthouse", "cafe", "slim", "lshape", "terrace", "silo", "tower"];
  let idx = 0;

  for (let gx = -20; gx <= 20; gx += 0.86) {
    for (let gy = -20; gy <= 20; gy += 0.86) {
      const u = gx - gy;
      const v = gx + gy;
      if (Math.abs(u) > 23.5 || v < -19.5 || v > 20.5) continue;

      const jx = gx + (rand() - 0.5) * 0.12;
      const jy = gy + (rand() - 0.5) * 0.12;
      if (isReserved(jx, jy)) continue;

      if (rand() < 0.085) {
        structures.push({ kind: "park", gx: jx, gy: jy, w: 0.72, d: 0.72, h: 2, hasFountain: rand() < 0.45, palIdx: 5 });
        continue;
      }

      const kind = variants[(idx * 7 + Math.floor(rand() * 3)) % variants.length];
      idx++;
      const dist = Math.hypot(jx * 0.72, jy * 0.78);
      const scaleH = Math.max(18, (90 - dist * 2.65) * (0.46 + rand() * 0.88));
      const small = kind === "gable" || kind === "cafe" || kind === "courtyard";

      structures.push({
        kind,
        gx: jx,
        gy: jy,
        w: 0.5 + rand() * 0.28,
        d: 0.48 + rand() * 0.28,
        h: small ? 18 + rand() * 14 : scaleH,
        floors: small ? 2 : Math.max(3, Math.floor(scaleH / 8.8)),
        cols: rand() < 0.5 ? 3 : 4,
        hasHvac: rand() < 0.46,
        hasWaterTower: !small && scaleH > 32 && scaleH < 64 && rand() < 0.22,
        hasHelipad: !small && scaleH > 54 && rand() < 0.25,
        hasSpire: !small && scaleH > 62 && rand() < 0.3,
        hasSolar: !small && rand() < 0.34,
        hasBillboard: !small && scaleH > 34 && rand() < 0.16,
        hasRoofGarden: !small && rand() < 0.24,
        trees: rand() < 0.44 ? 1 : 0,
        seed: rand(),
        palIdx: idx + Math.floor(rand() * 5),
      });
    }
  }

  structures.sort((a, b) => a.gx + a.gy - (b.gx + b.gy));
  return structures;
}

const STRUCTURES = buildCityStructures();

// 5-pass Gaussian-diffused 3D elevation swell field (fluid silk wave)
const ELEV_N = 120;
const ELEV_MIN = -20;
const ELEV_SPAN = 40;
const ELEV_GRID = new Float32Array(ELEV_N * ELEV_N);

(function bakeSmoothElevationField() {
  let bufA = new Float32Array(ELEV_N * ELEV_N);
  let bufB = new Float32Array(ELEV_N * ELEV_N);
  const toIdx = (v: number) => Math.max(0, Math.min(ELEV_N - 1, Math.floor(((v - ELEV_MIN) / ELEV_SPAN) * ELEV_N)));

  for (const s of STRUCTURES) {
    if (s.h <= 4) continue;
    const x0 = toIdx(s.gx - s.w * 0.65);
    const x1 = toIdx(s.gx + s.w * 0.65);
    const y0 = toIdx(s.gy - s.d * 0.65);
    const y1 = toIdx(s.gy + s.d * 0.65);
    for (let iy = y0; iy <= y1; iy++) {
      for (let ix = x0; ix <= x1; ix++) {
        const k = iy * ELEV_N + ix;
        if (s.h > bufA[k]) bufA[k] = s.h;
      }
    }
  }

  for (let pass = 0; pass < 5; pass++) {
    for (let iy = 1; iy < ELEV_N - 1; iy++) {
      for (let ix = 1; ix < ELEV_N - 1; ix++) {
        const k = iy * ELEV_N + ix;
        bufB[k] =
          bufA[k] * 0.36 +
          (bufA[k - 1] + bufA[k + 1] + bufA[k - ELEV_N] + bufA[k + ELEV_N]) * 0.12 +
          (bufA[k - ELEV_N - 1] + bufA[k - ELEV_N + 1] + bufA[k + ELEV_N - 1] + bufA[k + ELEV_N + 1]) * 0.04;
      }
    }
    const tmp = bufA;
    bufA = bufB;
    bufB = tmp;
  }
  ELEV_GRID.set(bufA);
})();

function sampleSmoothSwell(gx: number, gy: number): number {
  const fx = ((gx - ELEV_MIN) / ELEV_SPAN) * ELEV_N;
  const fy = ((gy - ELEV_MIN) / ELEV_SPAN) * ELEV_N;
  if (fx < 0 || fy < 0 || fx >= ELEV_N - 1 || fy >= ELEV_N - 1) return 0;
  const ix = Math.floor(fx);
  const iy = Math.floor(fy);
  const tx = fx - ix;
  const ty = fy - iy;
  const k = iy * ELEV_N + ix;
  const a = ELEV_GRID[k] * (1 - tx) + ELEV_GRID[k + 1] * tx;
  const b = ELEV_GRID[k + ELEV_N] * (1 - tx) + ELEV_GRID[k + ELEV_N + 1] * tx;
  return Math.min(36, (a * (1 - ty) + b * ty) * 0.36);
}

const CRANES = [
  { gx: -7.1, gy: -3.2, z: 58, speed: 0.00045, phase: 0.4 },
  { gx: 7.4, gy: 2.6, z: 52, speed: -0.00038, phase: 1.9 },
  { gx: -0.4, gy: -6.8, z: 64, speed: 0.00041, phase: 3.1 },
  { gx: 3.9, gy: 6.7, z: 48, speed: -0.00046, phase: 4.7 },
];

const PEOPLE = Array.from({ length: 72 }, (_, i) => {
  const rand = mulberry32(200 + i * 29);
  const horizontal = i % 2 === 0;
  const lanesH = [-5.72, -5.08, -2.07, -1.43, 1.43, 2.07, 5.08, 5.72];
  const lanesV = [-6.12, -5.48, -2.47, -1.83, 1.83, 2.47, 5.48, 6.12];
  return {
    horizontal,
    lane: horizontal ? lanesH[i % lanesH.length] : lanesV[i % lanesV.length],
    pos: -14 + rand() * 28,
    speed: (0.0065 + rand() * 0.0085) * (rand() < 0.5 ? 1 : -1),
    coat: ["#ed8838", "#102b79", "#4b7b8b", "#d9534f", "#569674", "#b78152"][i % 6],
    hat: rand() < 0.35,
    phase: rand() * Math.PI * 2,
  };
});

const VEHICLES = Array.from({ length: 36 }, (_, i) => {
  const rand = mulberry32(950 + i * 41);
  const horizontal = i % 2 === 0;
  const lanesH = [-5.5, -5.3, -1.85, -1.65, 1.65, 1.85, 5.3, 5.5];
  const lanesV = [-5.9, -5.7, -2.25, -2.05, 2.05, 2.25, 5.7, 5.9];
  const isBus = i % 5 === 0;
  return {
    horizontal,
    lane: horizontal ? lanesH[i % lanesH.length] : lanesV[i % lanesV.length],
    pos: -15 + rand() * 30,
    speed: (isBus ? 0.017 : 0.026 + rand() * 0.022) * (i % 4 < 2 ? 1 : -1),
    isBus,
    color: isBus ? "#ed8838" : ["#f2bd83", "#2d3e70", "#4b7b8b", "#f4f0e6", "#d96b43"][i % 5],
  };
});

const BOATS = Array.from({ length: 7 }, (_, i) => {
  const rand = mulberry32(550 + i * 73);
  return {
    pos: -14 + i * 4.2 + rand() * 1.4,
    y: CANAL_Y0 + 0.28 + (i % 2) * 0.34,
    speed: (0.01 + rand() * 0.008) * (i % 2 === 0 ? 1 : -1),
    isBarge: i % 3 === 0,
    hull: i % 2 === 0 ? "#f4f0e6" : "#ed8838",
    trim: i % 2 === 0 ? "#102b79" : "#f2cf88",
  };
});

const LAMPS: Array<{ gx: number; gy: number }> = [];
for (let p = -14; p <= 14; p += 2.0) {
  for (const ry of ROAD_Y) {
    if (ROAD_X.every((rx) => Math.abs(p - rx) > 0.65)) LAMPS.push({ gx: p, gy: ry - 0.33 });
  }
  for (const rx of ROAD_X) {
    if (ROAD_Y.every((ry) => Math.abs(p - ry) > 0.65) && (p < CANAL_Y0 - 0.4 || p > CANAL_Y1 + 0.4)) {
      LAMPS.push({ gx: rx + 0.33, gy: p });
    }
  }
}

const SKILL_ROTATION = [
  { name: "Azure Databricks", file: "azure-databricks.svg" },
  { name: "Apache Spark / PySpark", file: "apache-spark.svg" },
  { name: "Delta Lake", file: "delta-lake.svg" },
  { name: "Unity Catalog", file: "unity-catalog.svg" },
  { name: "Azure Data Factory", file: "azure-data-factory-adf.svg" },
  { name: "Apache Kafka", file: "apache-kafka.svg" },
  { name: "Azure Event Hubs", file: "azure-event-hubs.svg" },
  { name: "ADLS Gen2", file: "adls-gen2.svg" },
  { name: "Python", file: "python.svg" },
  { name: "SQL / T-SQL", file: "sql-t-sql.svg" },
  { name: "FastAPI", file: "fastapi.svg" },
  { name: "Docker", file: "docker.svg" },
  { name: "Redis Cache", file: "redis-cache.svg" },
  { name: "Power BI", file: "power-bi.svg" },
  { name: "Apache Airflow", file: "apache-airflow.svg" },
  { name: "Azure DevOps", file: "azure-devops.svg" },
  { name: "Google Cloud Platform", file: "google-cloud-platform-gcp.svg" },
  { name: "Google Gemini", file: "google-gemini.svg" },
];

// 3 sleek curved orbital rows — frameless monochrome white -> vibrant full-color on hover
const ARC_ROWS = [
  {
    baseSpeed: 0.000017,
    yOffset: 10,
    curve: 78,
    items: [
      { label: "Databricks", icon: "azure-databricks.svg" },
      { label: "PySpark", icon: "apache-spark.svg" },
      { label: "Delta Lake", icon: "delta-lake.svg" },
      { label: "Unity Catalog", icon: "unity-catalog.svg" },
      { label: "Data Factory", icon: "azure-data-factory-adf.svg" },
      { label: "Kafka", icon: "apache-kafka.svg" },
      { label: "Event Hubs", icon: "azure-event-hubs.svg" },
      { label: "ADLS Gen2", icon: "adls-gen2.svg" },
      { label: "Azure", icon: "azure-portal.svg" },
      { label: "Synapse", icon: "azure-synapse-analytics.svg" },
      { label: "Key Vault", icon: "azure-key-vault.svg" },
      { label: "Blob Storage", icon: "azure-blob-storage.svg" },
    ],
  },
  {
    baseSpeed: -0.000015,
    yOffset: 82,
    curve: 86,
    items: [
      { label: "Python", icon: "python.svg" },
      { label: "SQL", icon: "sql-t-sql.svg" },
      { label: "Airflow", icon: "apache-airflow.svg" },
      { label: "FastAPI", icon: "fastapi.svg" },
      { label: "Docker", icon: "docker.svg" },
      { label: "Redis", icon: "redis-cache.svg" },
      { label: "PostgreSQL", icon: "postgresql.svg" },
      { label: "MySQL", icon: "mysql.svg" },
      { label: "SQL Server", icon: "ms-sql-server.svg" },
      { label: "Power BI", icon: "power-bi.svg" },
      { label: "APIM", icon: "azure-api-management.svg" },
      { label: "Medallion", icon: "medallion-architecture.svg" },
    ],
  },
  {
    baseSpeed: 0.000014,
    yOffset: 154,
    curve: 94,
    items: [
      { label: "GCP", icon: "google-cloud-platform-gcp.svg" },
      { label: "Gemini", icon: "google-gemini.svg" },
      { label: "Claude", icon: "claude.svg" },
      { label: "ChatGPT", icon: "chatgpt.svg" },
      { label: "Copilot", icon: "github-copilot.svg" },
      { label: "M365 Copilot", icon: "microsoft-copilot.svg" },
      { label: "Azure DevOps", icon: "azure-devops.svg" },
      { label: "Pytest", icon: "pytest.svg" },
      { label: "SonarQube", icon: "sonarqube.svg" },
      { label: "Git", icon: "git.svg" },
      { label: "VS Code", icon: "vs-code.svg" },
      { label: "Governance", icon: "data-governance.svg" },
    ],
  },
];



type IsoFn = (x: number, y: number, z?: number) => [number, number];

/* ==============================================================
   VERTICAL INVISIBLE STRING TIED TO TOP-CENTER OF DESKTOP
   Icons hang & flow vertically down the middle like beads on an
   invisible thread with pendulum sway + directional pull physics.
   ============================================================== */
function VerticalBeadString({
  items,
  direction,
  reduced,
}: {
  items: string[];
  direction: number;
  reduced: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const beadRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (reduced) return;
    let rafId = 0;
    let phase = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const el = stageRef.current;
      if (el) {
        const H = el.clientHeight || window.innerHeight;
        const count = items.length;
        const spacing = 74; // sleek vertical spacing for frameless logo lockups
        const totalSpan = Math.max(H + 140, count * spacing);
        // Gentle vertical flow along the invisible string tied to top-center
        phase = (phase + dt * 0.038) % totalSpan;

        for (let i = 0; i < count; i++) {
          const node = beadRefs.current[i];
          if (!node) continue;
          const y = ((i * spacing + phase) % totalSpan) - 70;
          const depthRatio = Math.max(0, Math.min(1, y / H));
          // Real pendulum sway: pinned tightly at top (depthRatio≈0), sways gently lower down
          const swayX = Math.sin(now * 0.0017 + i * 0.55) * (5 + depthRatio * 14);
          const tilt = Math.cos(now * 0.0017 + i * 0.55) * (1.2 + depthRatio * 2.8);
          node.style.transform = `translate3d(${swayX.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, 0) rotate(${tilt.toFixed(2)}deg)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [items, reduced]);

  // Directional pull physics:
  // Selecting category BELOW (dir > 0) -> old vertical string pulled DOWN (+260px), new drops from TOP (-260px)
  // Selecting category ABOVE (dir < 0) -> old vertical string pulled UP (-260px), new rises from BELOW (+260px)
  const enterY = direction >= 0 ? -260 : 260;
  const exitY = direction >= 0 ? 280 : -280;

  return (
    <motion.div
      ref={stageRef}
      className="skills-vstring-stage"
      initial={reduced ? false : { opacity: 0, y: enterY }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 180, damping: 19, mass: 0.95 },
      }}
      exit={{
        opacity: 0,
        y: exitY,
        transition: { duration: 0.34, ease: [0.32, 0, 0.67, 0] },
      }}
    >
      {items.map((name, i) => {
        const iconFile = iconMap[name];
        return (
          <div
            key={name}
            ref={(el) => {
              beadRefs.current[i] = el;
            }}
            className="skills-vstring-bead"
            title={name}
          >
            <motion.div
              className="skills-vstring-inner"
              initial={reduced ? false : { scale: 0.78, y: enterY * 0.2 }}
              animate={{
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 240,
                  damping: 17,
                  delay: Math.min(i, 10) * 0.024,
                },
              }}
            >
              <span className="skills-arc-badge">
                {iconFile ? (
                  <img src={assetUrl(`assets/skills/${iconFile}`)} alt="" />
                ) : (
                  <span style={{ color: "#f4f0e6", fontWeight: 800, fontSize: 15 }}>
                    {shortLabel(name).slice(0, 2).toUpperCase()}
                  </span>
                )}
              </span>
              <span>{shortLabel(name)}</span>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

function box(
  ctx: CanvasRenderingContext2D,
  iso: IsoFn,
  gx: number,
  gy: number,
  hw: number,
  hd: number,
  z0: number,
  z1: number,
  lCol: string,
  rCol: string,
  tCol: string,
  sCol: string,
  withParapet = false,
  lBot: string | null = null,
  rBot: string | null = null,
) {
  const top = [
    iso(gx - hw, gy - hd, z1),
    iso(gx + hw, gy - hd, z1),
    iso(gx + hw, gy + hd, z1),
    iso(gx - hw, gy + hd, z1),
  ];
  const bot = [
    iso(gx - hw, gy - hd, z0),
    iso(gx + hw, gy - hd, z0),
    iso(gx + hw, gy + hd, z0),
    iso(gx - hw, gy + hd, z0),
  ];

  ctx.beginPath();
  ctx.moveTo(...top[3]);
  ctx.lineTo(...top[2]);
  ctx.lineTo(...bot[2]);
  ctx.lineTo(...bot[3]);
  ctx.closePath();
  if (lBot && z1 - z0 > 10) {
    const gL = ctx.createLinearGradient(top[2][0], top[2][1], bot[2][0], bot[2][1]);
    gL.addColorStop(0, lCol);
    gL.addColorStop(1, lBot);
    ctx.fillStyle = gL;
  } else {
    ctx.fillStyle = lCol;
  }
  ctx.fill();
  ctx.strokeStyle = sCol;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(...top[1]);
  ctx.lineTo(...top[2]);
  ctx.lineTo(...bot[2]);
  ctx.lineTo(...bot[1]);
  ctx.closePath();
  if (rBot && z1 - z0 > 10) {
    const gR = ctx.createLinearGradient(top[2][0], top[2][1], bot[2][0], bot[2][1]);
    gR.addColorStop(0, rCol);
    gR.addColorStop(1, rBot);
    ctx.fillStyle = gR;
  } else {
    ctx.fillStyle = rCol;
  }
  ctx.fill();
  ctx.stroke();

  if (z1 - z0 > 14 && z0 === 0) {
    const aoL = iso(gx - hw, gy + hd, 4);
    const aoM = iso(gx + hw, gy + hd, 4);
    const aoR = iso(gx + hw, gy - hd, 4);
    ctx.beginPath();
    ctx.moveTo(...aoL);
    ctx.lineTo(...aoM);
    ctx.lineTo(...bot[2]);
    ctx.lineTo(...bot[3]);
    ctx.closePath();
    ctx.fillStyle = "rgba(15, 23, 42, 0.14)";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(...aoM);
    ctx.lineTo(...aoR);
    ctx.lineTo(...bot[1]);
    ctx.lineTo(...bot[2]);
    ctx.closePath();
    ctx.fillStyle = "rgba(15, 23, 42, 0.2)";
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(...top[0]);
  ctx.lineTo(...top[1]);
  ctx.lineTo(...top[2]);
  ctx.lineTo(...top[3]);
  ctx.closePath();
  ctx.fillStyle = tCol;
  ctx.fill();
  ctx.strokeStyle = sCol;
  ctx.lineWidth = 0.72;
  ctx.stroke();

  if (withParapet && hw > 0.16 && hd > 0.16) {
    const pad = 0.05;
    ctx.beginPath();
    ctx.moveTo(...iso(gx - hw + pad, gy - hd + pad, z1));
    ctx.lineTo(...iso(gx + hw - pad, gy - hd + pad, z1));
    ctx.lineTo(...iso(gx + hw - pad, gy + hd - pad, z1));
    ctx.lineTo(...iso(gx - hw + pad, gy + hd - pad, z1));
    ctx.closePath();
    ctx.fillStyle = "rgba(15, 23, 42, 0.08)";
    ctx.fill();
  }
}

function windows(
  ctx: CanvasRenderingContext2D,
  iso: IsoFn,
  gx: number,
  gy: number,
  hw: number,
  hd: number,
  z0: number,
  z1: number,
  rows: number,
  cols: number,
  col: string,
  ribbon = false,
  litCol: string | null = null,
  seed = 0.5,
) {
  const dz = (z1 - z0) / (rows + 1);
  for (let r = 1; r <= rows; r++) {
    const z = z0 + r * dz;
    if (ribbon) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(...iso(gx - hw * 0.88, gy + hd, z + 1.5));
      ctx.lineTo(...iso(gx + hw * 0.88, gy + hd, z + 1.5));
      ctx.lineTo(...iso(gx + hw * 0.88, gy + hd, z - 1.5));
      ctx.lineTo(...iso(gx - hw * 0.88, gy + hd, z - 1.5));
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(...iso(gx + hw, gy - hd * 0.88, z + 1.5));
      ctx.lineTo(...iso(gx + hw, gy + hd * 0.88, z + 1.5));
      ctx.lineTo(...iso(gx + hw, gy + hd * 0.88, z - 1.5));
      ctx.lineTo(...iso(gx + hw, gy - hd * 0.88, z - 1.5));
      ctx.closePath();
      ctx.fill();
      continue;
    }

    for (let c = 0; c < cols; c++) {
      const hash = ((r * 13 + c * 7 + Math.floor(seed * 100)) % 11) / 11;
      ctx.fillStyle = litCol && hash > 0.76 ? litCol : col;
      const a = -hw + ((c + 0.24) / cols) * hw * 2;
      const b = -hw + ((c + 0.74) / cols) * hw * 2;
      ctx.beginPath();
      ctx.moveTo(...iso(gx + a, gy + hd, z + 1.7));
      ctx.lineTo(...iso(gx + b, gy + hd, z + 1.7));
      ctx.lineTo(...iso(gx + b, gy + hd, z - 1.7));
      ctx.lineTo(...iso(gx + a, gy + hd, z - 1.7));
      ctx.closePath();
      ctx.fill();
    }
    for (let c = 0; c < cols; c++) {
      const hash = ((r * 17 + c * 5 + Math.floor(seed * 100)) % 13) / 13;
      ctx.fillStyle = litCol && hash > 0.8 ? litCol : col;
      const a = -hd + ((c + 0.24) / cols) * hd * 2;
      const b = -hd + ((c + 0.74) / cols) * hd * 2;
      ctx.beginPath();
      ctx.moveTo(...iso(gx + hw, gy + a, z + 1.7));
      ctx.lineTo(...iso(gx + hw, gy + b, z + 1.7));
      ctx.lineTo(...iso(gx + hw, gy + b, z - 1.7));
      ctx.lineTo(...iso(gx + hw, gy + a, z - 1.7));
      ctx.closePath();
      ctx.fill();
    }
  }
}

function drawTree(ctx: CanvasRenderingContext2D, iso: IsoFn, x: number, y: number, isColor: boolean, isDark: boolean, scale = 1, cypress = false) {
  const base = iso(x, y, 0);
  ctx.beginPath();
  ctx.ellipse(base[0] + 3 * scale, base[1] + 1 * scale, 5.2 * scale, 2.3 * scale, 0, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.28)" : isColor ? "rgba(28, 38, 54, 0.15)" : "rgba(71, 85, 105, 0.08)";
  ctx.fill();

  const trunkTop = iso(x, y, 7 * scale);
  ctx.beginPath();
  ctx.moveTo(...base);
  ctx.lineTo(...trunkTop);
  ctx.strokeStyle = isColor ? "#6b4423" : isDark ? "#475569" : "#94a3b8";
  ctx.lineWidth = 1.6 * scale;
  ctx.stroke();

  if (cypress) {
    const tip = iso(x, y, 15.5 * scale);
    ctx.beginPath();
    ctx.moveTo(tip[0], tip[1]);
    ctx.lineTo(trunkTop[0] - 3.4 * scale, trunkTop[1] + 2);
    ctx.lineTo(trunkTop[0] + 3.4 * scale, trunkTop[1] + 2);
    ctx.closePath();
    ctx.fillStyle = isColor ? (isDark ? "#255745" : "#2d6a4f") : isDark ? "#2d3852" : "#cbd5e1";
    ctx.fill();
    return;
  }

  ctx.beginPath();
  ctx.arc(trunkTop[0] + 2 * scale, trunkTop[1] - 1 * scale, 5.0 * scale, 0, Math.PI * 2);
  ctx.fillStyle = isColor ? (isDark ? "#1f5941" : "#2b7a53") : isDark ? "#28324a" : "#cbd5e1";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(trunkTop[0] - 2 * scale, trunkTop[1] - 2.3 * scale, 4.8 * scale, 0, Math.PI * 2);
  ctx.fillStyle = isColor ? (isDark ? "#2d7858" : "#409d6b") : isDark ? "#33405c" : "#dde3ec";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(trunkTop[0] - 1 * scale, trunkTop[1] - 4.2 * scale, 3.3 * scale, 0, Math.PI * 2);
  ctx.fillStyle = isColor ? (isDark ? "#469e76" : "#74c69d") : isDark ? "#425170" : "#eef2f6";
  ctx.fill();
}

function drawStaticStructure(ctx: CanvasRenderingContext2D, iso: IsoFn, tile: number, s: Struct, isColor: boolean, isDark: boolean) {
  const hw = s.w * 0.5;
  const hd = s.d * 0.5;
  const pals = isDark ? PALETTES_DARK : PALETTES_LIGHT;
  const pal = pals[s.palIdx % pals.length];

  const lC = isColor ? pal.left : isDark ? "#212a42" : "#e3e0d7";
  const lB = isColor ? pal.leftBot : isDark ? "#151c2e" : "#cfc9bc";
  const rC = isColor ? pal.right : isDark ? "#192036" : "#d1cbc0";
  const rB = isColor ? pal.rightBot : isDark ? "#101626" : "#bab2a2";
  const tC = isColor ? pal.top : isDark ? "#2d3857" : "#f7f4ec";
  const sC = isColor
    ? isDark
      ? "rgba(255,255,255,0.16)"
      : "rgba(255,255,255,0.36)"
    : isDark
      ? "rgba(255,255,255,0.14)"
      : "rgba(255,255,255,0.82)";
  const wC = isColor ? pal.win : isDark ? "rgba(148,163,184,0.22)" : "rgba(148,142,130,0.36)";
  const litC = isColor ? pal.lit : null;

  if (s.kind === "park") {
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, 2.2, isColor ? "#387c54" : lC, isColor ? "#2c6443" : rC, isColor ? (isDark ? "#2a6948" : "#72ba88") : tC, sC);
    if (s.hasFountain) {
      const fp = iso(s.gx, s.gy, 2.5);
      ctx.beginPath();
      ctx.ellipse(fp[0], fp[1], tile * 0.21, tile * 0.1, 0, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? "#4b7b8b" : lC;
      ctx.fill();
      ctx.strokeStyle = isColor ? "#f4f0e6" : "#ffffff";
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    drawTree(ctx, iso, s.gx - 0.2, s.gy - 0.16, isColor, isDark, 0.9, false);
    drawTree(ctx, iso, s.gx + 0.2, s.gy - 0.1, isColor, isDark, 0.82, true);
    drawTree(ctx, iso, s.gx + 0.14, s.gy + 0.2, isColor, isDark, 0.95, false);
    return;
  }

  if (s.kind === "pond") {
    box(ctx, iso, s.gx, s.gy, hw + 0.14, hd + 0.14, 0, 2, isColor ? "#387c54" : lC, isColor ? "#2c6443" : rC, isColor ? (isDark ? "#2a6948" : "#74c68e") : tC, sC);
    const p = iso(s.gx, s.gy, 2.2);
    ctx.beginPath();
    ctx.ellipse(p[0], p[1], tile * 0.74, tile * 0.37, 0, 0, Math.PI * 2);
    ctx.fillStyle = isColor ? (isDark ? "#265a78" : "#4b8ea8") : lC;
    ctx.fill();
    ctx.strokeStyle = isColor ? "#f4f0e6" : sC;
    ctx.lineWidth = 2;
    ctx.stroke();

    const b1 = iso(s.gx - 0.4, s.gy, 5);
    const b2 = iso(s.gx + 0.4, s.gy, 5);
    ctx.beginPath();
    ctx.moveTo(...b1);
    ctx.quadraticCurveTo(p[0], p[1] - 13, b2[0], b2[1]);
    ctx.strokeStyle = isColor ? "#ed8838" : "#94a3b8";
    ctx.lineWidth = 3.2;
    ctx.stroke();

    drawTree(ctx, iso, s.gx - 0.68, s.gy - 0.34, isColor, isDark, 1.0, false);
    drawTree(ctx, iso, s.gx + 0.68, s.gy + 0.32, isColor, isDark, 0.92, false);
    return;
  }

  if (s.kind === "stadium") {
    const base = iso(s.gx, s.gy, 0);
    const mid = iso(s.gx, s.gy, s.h * 0.55);
    const rim = iso(s.gx, s.gy, s.h);

    ctx.beginPath();
    ctx.ellipse(base[0], base[1], tile * 1.18, tile * 0.62, 0, 0, Math.PI * 2);
    ctx.fillStyle = rC;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(mid[0], mid[1], tile * 1.2, tile * 0.63, 0, 0, Math.PI * 2);
    ctx.fillStyle = lC;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(rim[0], rim[1], tile * 1.18, tile * 0.62, 0, 0, Math.PI * 2);
    ctx.fillStyle = tC;
    ctx.fill();
    ctx.strokeStyle = sC;
    ctx.lineWidth = 1.3;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(rim[0], rim[1] + 2, tile * 0.93, tile * 0.47, 0, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "#232c45" : "#d8d2c5";
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(rim[0], rim[1] + 5, tile * 0.74, tile * 0.35, 0, 0, Math.PI * 2);
    ctx.fillStyle = isColor ? (isDark ? "#286e48" : "#449668") : rC;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(rim[0], rim[1] + 5 - tile * 0.33);
    ctx.lineTo(rim[0], rim[1] + 5 + tile * 0.33);
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = 1.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(rim[0], rim[1] + 5, tile * 0.13, tile * 0.065, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(rim[0], rim[1] - 3, tile * 1.12, tile * 0.56, 0, Math.PI * 1.08, Math.PI * 1.92);
    ctx.strokeStyle = isColor ? "#ed8838" : tC;
    ctx.lineWidth = 4.5;
    ctx.stroke();

    [[-0.88, -0.56], [0.88, -0.56], [-0.88, 0.56], [0.88, 0.56]].forEach(([dx, dy]) => {
      const a = iso(s.gx + dx, s.gy + dy, s.h);
      const b = iso(s.gx + dx, s.gy + dy, s.h + 19);
      ctx.beginPath();
      ctx.moveTo(...a);
      ctx.lineTo(...b);
      ctx.strokeStyle = isDark ? "#64748b" : "#94a3b8";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(b[0], b[1], 3, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? "#f2bd83" : tC;
      ctx.fill();
    });
    return;
  }

  if (s.kind === "airport") {
    const rw1 = iso(s.gx - 1.7, s.gy - 0.95, 0);
    const rw2 = iso(s.gx + 2.6, s.gy - 0.95, 0);
    ctx.beginPath();
    ctx.moveTo(...rw1);
    ctx.lineTo(...rw2);
    ctx.strokeStyle = isColor ? "#384152" : rC;
    ctx.lineWidth = tile * 0.46;
    ctx.stroke();
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(...rw1);
    ctx.lineTo(...rw2);
    ctx.strokeStyle = "rgba(244,240,230,0.85)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    box(ctx, iso, s.gx, s.gy, hw, hd * 0.54, 0, s.h, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd * 0.54, 3, s.h - 2, 2, 6, wC, true);
    [-0.68, 0.0, 0.68].forEach((dx) => {
      box(ctx, iso, s.gx + dx, s.gy - hd * 0.64, 0.09, 0.22, 6, 11.5, lC, rC, tC, sC);
    });
    return;
  }

  if (s.kind === "controlTower") {
    box(ctx, iso, s.gx, s.gy, hw * 0.68, hd * 0.68, 0, s.h * 0.74, lC, rC, tC, sC, false, lB, rB);
    box(ctx, iso, s.gx, s.gy, hw * 1.28, hd * 1.28, s.h * 0.74, s.h, isColor ? "#2d3e70" : lC, isColor ? "#102b79" : rC, tC, sC, true);
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx, s.gy, s.h));
    ctx.lineTo(...iso(s.gx, s.gy, s.h + 18));
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    return;
  }

  if (s.kind === "spire") {
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, s.h * 0.44, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 4, s.h * 0.44 - 2, 7, 4, wC, true);
    box(ctx, iso, s.gx, s.gy, hw * 0.74, hd * 0.74, s.h * 0.44, s.h * 0.78, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw * 0.74, hd * 0.74, s.h * 0.44 + 3, s.h * 0.78 - 2, 6, 3, wC, true);
    box(ctx, iso, s.gx, s.gy, hw * 0.46, hd * 0.46, s.h * 0.78, s.h, lC, rC, tC, sC, true, lB, rB);
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx, s.gy, s.h));
    ctx.lineTo(...iso(s.gx, s.gy, s.h + 26));
    ctx.strokeStyle = isColor ? "#f4f0e6" : "#94a3b8";
    ctx.lineWidth = 2;
    ctx.stroke();
    return;
  }

  if (s.kind === "twin") {
    box(ctx, iso, s.gx - 0.34, s.gy, hw * 0.42, hd * 0.8, 0, s.h, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx - 0.34, s.gy, hw * 0.42, hd * 0.8, 4, s.h - 2, 9, 2, wC, true);
    box(ctx, iso, s.gx + 0.34, s.gy, hw * 0.42, hd * 0.8, 0, s.h * 0.88, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx + 0.34, s.gy, hw * 0.42, hd * 0.8, 4, s.h * 0.88 - 2, 8, 2, wC, true);
    box(ctx, iso, s.gx, s.gy, hw * 0.46, hd * 0.36, s.h * 0.56, s.h * 0.67, isColor ? "#4b7b8b" : lC, isColor ? "#2d3e70" : rC, tC, sC);
    return;
  }

  if (s.kind === "cantilever") {
    box(ctx, iso, s.gx, s.gy, hw * 0.74, hd * 0.74, 0, s.h * 0.5, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw * 0.74, hd * 0.74, 4, s.h * 0.5 - 2, 5, 3, wC, true);
    box(ctx, iso, s.gx + 0.16, s.gy - 0.12, hw * 0.94, hd * 0.86, s.h * 0.5, s.h, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx + 0.16, s.gy - 0.12, hw * 0.94, hd * 0.86, s.h * 0.5 + 3, s.h - 2, 4, 3, wC, true);
    return;
  }

  if (s.kind === "rotunda") {
    const base = iso(s.gx, s.gy, 0);
    const top = iso(s.gx, s.gy, s.h * 0.68);
    const radX = tile * hw * 1.04;
    const radY = tile * hd * 0.54;
    ctx.beginPath();
    ctx.moveTo(top[0] - radX, top[1]);
    ctx.lineTo(base[0] - radX, base[1]);
    ctx.ellipse(base[0], base[1], radX, radY, 0, Math.PI, 0, true);
    ctx.lineTo(top[0] + radX, top[1]);
    ctx.closePath();
    ctx.fillStyle = lC;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(top[0], top[1], radX, radY, 0, 0, Math.PI * 2);
    ctx.fillStyle = tC;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(top[0], top[1], radX * 0.82, Math.PI, 0);
    ctx.closePath();
    ctx.fillStyle = isColor ? "#4b7b8b" : rC;
    ctx.fill();
    ctx.strokeStyle = sC;
    ctx.stroke();
    return;
  }

  if (s.kind === "sawtooth") {
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, s.h * 0.72, lC, rC, tC, sC, false, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 3, s.h * 0.72 - 2, 2, 4, wC);
    for (let b = 0; b < 3; b++) {
      const bx0 = s.gx - hw + (b / 3) * s.w;
      const bx1 = s.gx - hw + ((b + 1) / 3) * s.w;
      ctx.beginPath();
      ctx.moveTo(...iso(bx0, s.gy - hd, s.h * 0.72));
      ctx.lineTo(...iso(bx1, s.gy - hd, s.h + 8));
      ctx.lineTo(...iso(bx1, s.gy + hd, s.h + 8));
      ctx.lineTo(...iso(bx0, s.gy + hd, s.h * 0.72));
      ctx.closePath();
      ctx.fillStyle = isColor ? "#8fb3d1" : tC;
      ctx.fill();
      ctx.strokeStyle = sC;
      ctx.stroke();
    }
    return;
  }

  if (s.kind === "clocktower") {
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, s.h * 0.78, lC, rC, tC, sC, false, lB, rB);
    box(ctx, iso, s.gx, s.gy, hw * 1.12, hd * 1.12, s.h * 0.78, s.h * 0.94, lC, rC, tC, sC);
    [iso(s.gx, s.gy + hd * 1.13, s.h * 0.86), iso(s.gx + hw * 1.13, s.gy, s.h * 0.86)].forEach((cf) => {
      ctx.beginPath();
      ctx.arc(cf[0], cf[1], 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#f4f0e6";
      ctx.fill();
      ctx.strokeStyle = "#102b79";
      ctx.lineWidth = 1.1;
      ctx.stroke();
    });
    const peak = iso(s.gx, s.gy, s.h + 24);
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx - hw * 1.12, s.gy + hd * 1.12, s.h * 0.94));
    ctx.lineTo(...iso(s.gx + hw * 1.12, s.gy + hd * 1.12, s.h * 0.94));
    ctx.lineTo(...peak);
    ctx.closePath();
    ctx.fillStyle = isColor ? "#4b7b8b" : lC;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx + hw * 1.12, s.gy + hd * 1.12, s.h * 0.94));
    ctx.lineTo(...iso(s.gx + hw * 1.12, s.gy - hd * 1.12, s.h * 0.94));
    ctx.lineTo(...peak);
    ctx.closePath();
    ctx.fillStyle = isColor ? "#2d3e70" : rC;
    ctx.fill();
    return;
  }

  if (s.kind === "datacenter") {
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, s.h, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 5, s.h - 4, 3, 5, isColor ? "rgba(237, 136, 56, 0.82)" : wC, true);
    [-0.3, 0.05, 0.4].forEach((dx) => {
      box(ctx, iso, s.gx + dx, s.gy - 0.1, 0.13, 0.24, s.h, s.h + 5, "#475569", "#334155", "#cbd5e1", sC);
    });
    return;
  }

  if (s.kind === "greenhouse") {
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, 7, lC, rC, tC, sC);
    drawTree(ctx, iso, s.gx - 0.22, s.gy, isColor, isDark, 0.82, false);
    drawTree(ctx, iso, s.gx + 0.22, s.gy, isColor, isDark, 0.88, false);
    const pL = iso(s.gx - hw, s.gy, 7);
    const pR = iso(s.gx + hw, s.gy, 7);
    const pMid = iso(s.gx, s.gy, s.h + 8);
    ctx.beginPath();
    ctx.moveTo(pL[0], pL[1]);
    ctx.quadraticCurveTo(pMid[0], pMid[1] - 12, pR[0], pR[1]);
    ctx.lineTo(pR[0], pR[1] + 10);
    ctx.lineTo(pL[0], pL[1] + 10);
    ctx.closePath();
    ctx.fillStyle = isColor ? "rgba(186, 236, 224, 0.48)" : "rgba(244, 240, 230, 0.5)";
    ctx.fill();
    ctx.strokeStyle = sC;
    ctx.stroke();
    return;
  }

  if (s.kind === "courtyard") {
    const rim = 0.2;
    box(ctx, iso, s.gx, s.gy - hd + rim * 0.5, hw, rim * 0.5, 0, s.h, lC, rC, tC, sC);
    box(ctx, iso, s.gx - hw + rim * 0.5, s.gy, rim * 0.5, hd, 0, s.h, lC, rC, tC, sC);
    box(ctx, iso, s.gx, s.gy, hw * 0.55, hd * 0.55, 0, 2, isColor ? "#387c54" : lC, isColor ? "#2c6443" : rC, isColor ? "#74c68e" : tC, sC);
    drawTree(ctx, iso, s.gx, s.gy, isColor, isDark, 0.7, false);
    box(ctx, iso, s.gx + hw - rim * 0.5, s.gy, rim * 0.5, hd, 0, s.h, lC, rC, tC, sC);
    box(ctx, iso, s.gx, s.gy + hd - rim * 0.5, hw, rim * 0.5, 0, s.h, lC, rC, tC, sC);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 3, s.h - 2, 2, 3, wC, false, litC, s.seed || 0.5);
    return;
  }

  if (s.kind === "silo") {
    const base = iso(s.gx, s.gy, 0);
    const top = iso(s.gx, s.gy, s.h);
    const radX = tile * hw * 0.94;
    const radY = tile * hd * 0.49;
    ctx.beginPath();
    ctx.moveTo(top[0] - radX, top[1]);
    ctx.lineTo(base[0] - radX, base[1]);
    ctx.ellipse(base[0], base[1], radX, radY, 0, Math.PI, 0, true);
    ctx.lineTo(top[0] + radX, top[1]);
    ctx.closePath();
    ctx.fillStyle = lC;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(top[0], top[1], radX, radY, 0, 0, Math.PI * 2);
    ctx.fillStyle = tC;
    ctx.fill();
    ctx.strokeStyle = sC;
    ctx.stroke();
    return;
  }

  if (s.kind === "gable" || s.kind === "cafe") {
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, s.h * 0.68, isColor ? (isDark ? "#2a3352" : "#f4f0e6") : lC, isColor ? (isDark ? "#1c233b" : "#ded6c5") : rC, tC, sC);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 3, s.h * 0.65, 2, 2, wC, false, litC, s.seed || 0.5);
    const peak = iso(s.gx, s.gy, s.h + 8.5);
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx - hw, s.gy + hd, s.h * 0.68));
    ctx.lineTo(...iso(s.gx + hw, s.gy + hd, s.h * 0.68));
    ctx.lineTo(...peak);
    ctx.closePath();
    ctx.fillStyle = lC;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx + hw, s.gy + hd, s.h * 0.68));
    ctx.lineTo(...iso(s.gx + hw, s.gy - hd, s.h * 0.68));
    ctx.lineTo(...peak);
    ctx.closePath();
    ctx.fillStyle = rC;
    ctx.fill();
    if (s.kind === "cafe") {
      const umb = iso(s.gx + hw + 0.13, s.gy + hd - 0.12, 7.5);
      ctx.beginPath();
      ctx.arc(umb[0], umb[1], 4.8, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? "#ed8838" : tC;
      ctx.fill();
    }
    return;
  }

  if (s.kind === "terrace") {
    const h1 = s.h * 0.42;
    const h2 = s.h * 0.74;
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, h1, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 3, h1 - 2, 2, s.cols || 3, wC, false, litC, s.seed || 0.5);
    box(ctx, iso, s.gx - hw * 0.1, s.gy - hd * 0.1, hw * 0.78, hd * 0.78, h1, h2, lC, rC, tC, sC, true, lB, rB);
    box(ctx, iso, s.gx - hw * 0.2, s.gy - hd * 0.2, hw * 0.54, hd * 0.54, h2, s.h, lC, rC, tC, sC, true);
  } else if (s.kind === "stepped" || s.kind === "penthouse") {
    const h1 = s.h * 0.72;
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, h1, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 3, h1 - 2, Math.max(2, (s.floors || 4) - 1), s.cols || 3, wC, s.kind === "penthouse", litC, s.seed || 0.5);
    box(ctx, iso, s.gx, s.gy, hw * 0.64, hd * 0.64, h1, s.h, lC, rC, tC, sC, true, lB, rB);
  } else if (s.kind === "lshape") {
    box(ctx, iso, s.gx - hw * 0.24, s.gy, hw * 0.56, hd, 0, s.h, lC, rC, tC, sC, true, lB, rB);
    box(ctx, iso, s.gx + hw * 0.26, s.gy + hd * 0.28, hw * 0.54, hd * 0.56, 0, s.h * 0.72, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx - hw * 0.24, s.gy, hw * 0.56, hd, 3, s.h - 2, s.floors || 3, 2, wC, false, litC, s.seed || 0.5);
  } else if (s.kind === "slim") {
    box(ctx, iso, s.gx, s.gy, hw * 0.74, hd * 0.74, 0, s.h, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw * 0.74, hd * 0.74, 4, s.h - 3, Math.max(4, s.floors || 5), 3, wC, true);
  } else {
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, s.h, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 3, s.h - 3, s.floors || 3, s.cols || 3, wC, false, litC, s.seed || 0.5);
  }

  if (s.hasRoofGarden) {
    box(ctx, iso, s.gx, s.gy, hw * 0.62, hd * 0.58, s.h + 0.3, s.h + 2.1, isColor ? "#2d7a50" : lC, isColor ? "#215c3c" : rC, isColor ? "#58b87d" : tC, sC);
  } else if (s.hasHvac) {
    box(ctx, iso, s.gx - hw * 0.18, s.gy - hd * 0.18, hw * 0.22, hd * 0.2, s.h, s.h + 4.2, "#64748b", "#475569", "#cbd5e1", sC);
  }
  if (s.hasSpire) {
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx, s.gy, s.h));
    ctx.lineTo(...iso(s.gx, s.gy, s.h + 17));
    ctx.strokeStyle = isColor ? "#f4f0e6" : "#94a3b8";
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
  if (s.trees) {
    drawTree(ctx, iso, s.gx + hw + 0.13, s.gy + hd, isColor, isDark, 0.8, (s.seed || 0) > 0.6);
  }
}

export default function SkillsShowcase() {
  const { reduced } = useMotionPreference();
  const sectionRef = useRef<HTMLElement>(null);
  const cityLayerRef = useRef<HTMLDivElement>(null);
  const cityWrapRef = useRef<HTMLDivElement>(null);
  const cityHeaderRef = useRef<HTMLDivElement>(null);
  const orbitTopRef = useRef<HTMLDivElement>(null);
  const catWrapRef = useRef<HTMLDivElement>(null);
  const arcStageRef = useRef<HTMLDivElement>(null);
  const monoRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<HTMLCanvasElement>(null);
  const waveRef = useRef<HTMLCanvasElement>(null);

  const [skillIdx, setSkillIdx] = useState(0);
  const [slotState, setSlotState] = useState<"" | "is-leaving" | "is-entering">("");
  const [catMenuOpen, setCatMenuOpen] = useState(false);

  useEffect(() => {
    if (!catMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (catWrapRef.current && !catWrapRef.current.contains(e.target as Node)) {
        setCatMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCatMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [catMenuOpen]);
  // null = 2-arc Orbit; 0..3 = Selected category vertical hanging string + expanded list in right dropdown!
  const [selectedCatIdx, setSelectedCatIdx] = useState<number | null>(null);
  const [stringDir, setStringDir] = useState<number>(1);

  const handleSelectCategory = (idx: number | null) => {
    if (idx === selectedCatIdx) {
      // Clicking the already-selected category keeps dropdown open (or toggles back to orbit if null)
      return;
    }
    if (idx !== null && selectedCatIdx !== null) {
      setStringDir(idx > selectedCatIdx ? 1 : -1);
    } else {
      setStringDir(1);
    }
    setSelectedCatIdx(idx);
    // Keep dropdown open so the user sees the animated skill list on the right side!
  };

  useEffect(() => {
    if (reduced) return;
    let swapTimer = 0;
    const timer = window.setInterval(() => {
      setSlotState("is-leaving");
      swapTimer = window.setTimeout(() => {
        setSkillIdx((p) => (p + 1) % SKILL_ROTATION.length);
        setSlotState("is-entering");
        requestAnimationFrame(() => requestAnimationFrame(() => setSlotState("")));
      }, 200);
    }, 1400);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(swapTimer);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const monoCanvas = monoRef.current;
    const colorCanvas = colorRef.current;
    const waveCanvas = waveRef.current;
    const arcStage = arcStageRef.current;
    if (!section || !monoCanvas || !colorCanvas || !waveCanvas || !arcStage) return;

    arcStage.textContent = "";
    const arcNodes: Array<{ el: HTMLDivElement; row: (typeof ARC_ROWS)[number]; rIdx: number; basePhase: number }> = [];
    ARC_ROWS.forEach((row, rIdx) => {
      const count = row.items.length;
      row.items.forEach((item, i) => {
        const el = document.createElement("div");
        el.className = "skills-arc-item";

        const badge = document.createElement("span");
        badge.className = "skills-arc-badge";
        const img = document.createElement("img");
        img.src = assetUrl(`assets/skills/${item.icon}`);
        img.alt = "";
        img.loading = "lazy";
        badge.appendChild(img);

        const span = document.createElement("span");
        span.textContent = item.label;

        el.append(badge, span);
        arcStage.appendChild(el);
        const basePhase = ((i - 2) / count + 0.5 + 1) % 1;
        arcNodes.push({ el, row, rIdx, basePhase });
      });
    });

    const staticMono = document.createElement("canvas");
    const staticColor = document.createElement("canvas");
    let cW = 0;
    let cH = 0;
    let cDpr = 0;
    let cDark = false;

    const getIso = (W: number, H: number) => {
      const tile = Math.max(40, Math.min(W, H) * 0.062);
      const cx = W * 0.5;
      const cy = H * 0.62;
      const iso: IsoFn = (x, y, z = 0) => [cx + (x - y) * tile * 0.88, cy + (x + y) * tile * 0.44 - z];
      return { tile, cx, cy, iso };
    };

    const buildCache = (canvas: HTMLCanvasElement, W: number, H: number, dpr: number, isColor: boolean, isDark: boolean) => {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = isDark ? (isColor ? "#12172b" : "#0e1120") : isColor ? "#ece4d4" : "#f4f0e6";
      ctx.fillRect(0, 0, W, H);

      const { tile, iso } = getIso(W, H);

      ctx.strokeStyle = isDark ? "rgba(148, 163, 184, 0.09)" : isColor ? "rgba(148, 134, 114, 0.16)" : "rgba(140, 132, 118, 0.14)";
      ctx.lineWidth = 1;
      for (let i = -22; i <= 22; i++) {
        ctx.beginPath();
        ctx.moveTo(...iso(i, -22));
        ctx.lineTo(...iso(i, 22));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(...iso(-22, i));
        ctx.lineTo(...iso(22, i));
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(...iso(-24, CANAL_Y0, 0));
      ctx.lineTo(...iso(24, CANAL_Y0, 0));
      ctx.lineTo(...iso(24, CANAL_Y1, 0));
      ctx.lineTo(...iso(-24, CANAL_Y1, 0));
      ctx.closePath();
      ctx.fillStyle = isColor ? (isDark ? "#1c4966" : "#4b8ea8") : isDark ? "#182038" : "#ded9cc";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(...iso(-1.45, -1.25, 0));
      ctx.lineTo(...iso(1.45, -1.25, 0));
      ctx.lineTo(...iso(1.45, 1.15, 0));
      ctx.lineTo(...iso(-1.45, 1.15, 0));
      ctx.closePath();
      ctx.fillStyle = isDark ? "#1c233b" : "#f7f3ea";
      ctx.fill();

      const drawAvenue = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.beginPath();
        ctx.moveTo(...iso(x1, y1));
        ctx.lineTo(...iso(x2, y2));
        ctx.strokeStyle = isDark ? "#232c47" : "#f8f5ee";
        ctx.lineWidth = tile * 0.54;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(...iso(x1, y1));
        ctx.lineTo(...iso(x2, y2));
        ctx.strokeStyle = isDark ? "#121626" : isColor ? "#464d5c" : "#dbd6ca";
        ctx.lineWidth = tile * 0.34;
        ctx.stroke();

        ctx.setLineDash([6, 8]);
        ctx.beginPath();
        ctx.moveTo(...iso(x1, y1));
        ctx.lineTo(...iso(x2, y2));
        ctx.strokeStyle = isColor ? "rgba(237, 136, 56, 0.72)" : isDark ? "rgba(148,163,184,0.35)" : "rgba(255,255,255,0.78)";
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.setLineDash([]);
      };
      for (const rx of ROAD_X) drawAvenue(rx, -22, rx, 22);
      for (const ry of ROAD_Y) drawAvenue(-22, ry, 22, ry);

      for (const s of STRUCTURES) {
        if (s.h < 4) continue;
        const hw = s.w * 0.5;
        const hd = s.d * 0.5;
        const sx = s.h * 0.0088;
        const sy = s.h * 0.0042;
        ctx.beginPath();
        ctx.moveTo(...iso(s.gx - hw, s.gy + hd, 0));
        ctx.lineTo(...iso(s.gx + hw, s.gy + hd, 0));
        ctx.lineTo(...iso(s.gx + hw, s.gy - hd, 0));
        ctx.lineTo(...iso(s.gx + hw + sx, s.gy - hd + sy, 0));
        ctx.lineTo(...iso(s.gx + hw + sx, s.gy + hd + sy, 0));
        ctx.lineTo(...iso(s.gx - hw + sx, s.gy + hd + sy, 0));
        ctx.closePath();
        ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.32)" : isColor ? "rgba(28, 38, 54, 0.16)" : "rgba(71, 65, 55, 0.09)";
        ctx.fill();
      }

      const mz = 24;
      for (let x = -18; x <= 18; x += 2.2) {
        box(ctx, iso, x, METRO_Y, 0.09, 0.09, 0, mz, isDark ? "#28324d" : "#d8d3c8", isDark ? "#1c243b" : "#c4bdb0", isDark ? "#38466e" : "#f4f0e6", "rgba(255,255,255,0.25)");
      }
      ctx.beginPath();
      ctx.moveTo(...iso(-20, METRO_Y, mz));
      ctx.lineTo(...iso(20, METRO_Y, mz));
      ctx.strokeStyle = isDark ? "#334155" : "#b8b1a3";
      ctx.lineWidth = 9;
      ctx.stroke();

      const list = [
        ...STRUCTURES.map((s) => ({ depth: s.gx + s.gy, type: "s" as const, data: s })),
        ...LAMPS.map((l) => ({ depth: l.gx + l.gy, type: "l" as const, data: l })),
      ];
      list.sort((a, b) => a.depth - b.depth);
      for (const item of list) {
        if (item.type === "s") {
          drawStaticStructure(ctx, iso, tile, item.data, isColor, isDark);
        } else {
          const b = iso(item.data.gx, item.data.gy, 0);
          const t = iso(item.data.gx, item.data.gy, 10.5);
          ctx.beginPath();
          ctx.moveTo(...b);
          ctx.lineTo(...t);
          ctx.strokeStyle = isDark ? "#475569" : "#94a3b8";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(t[0], t[1], 1.6, 0, Math.PI * 2);
          ctx.fillStyle = isColor ? "#f2bd83" : "#e2e8f0";
          ctx.fill();
        }
      }
    };

    const drawLiving = (ctx: CanvasRenderingContext2D, W: number, H: number, isColor: boolean, isDark: boolean, time: number) => {
      const { iso } = getIso(W, H);

      for (const b of BOATS) {
        const bx = (((b.pos + time * 0.001 * b.speed * 14) % 28) + 28) % 28 - 14;
        const p = iso(bx, b.y, 1);
        const wake = iso(bx - Math.sign(b.speed) * 0.55, b.y, 0.5);
        ctx.beginPath();
        ctx.moveTo(...p);
        ctx.lineTo(...wake);
        ctx.strokeStyle = "rgba(244,240,230,0.48)";
        ctx.lineWidth = 2;
        ctx.stroke();
        box(ctx, iso, bx, b.y, b.isBarge ? 0.24 : 0.17, 0.08, 0.5, 4.4, isColor ? b.hull : "#cbd5e1", isColor ? b.trim : "#94a3b8", "#f4f0e6", "rgba(0,0,0,0.16)");
      }

      [
        { dir: 1, offset: 0, accent: "#ed8838" },
        { dir: -1, offset: 14, accent: "#3f63c4" },
      ].forEach((tr) => {
        const headX = (((time * 0.0021 * tr.dir + tr.offset) % 34) + 34) % 34 - 17;
        for (let c = 0; c < 4; c++) {
          box(ctx, iso, headX - c * 0.42 * tr.dir, METRO_Y, 0.17, 0.09, 26, 33, isColor ? "#f4f0e6" : "#cbd5e1", isColor ? tr.accent : "#94a3b8", "#ffffff", "rgba(0,0,0,0.2)");
        }
      });

      for (const v of VEHICLES) {
        const p = (((v.pos + time * 0.001 * v.speed * 18) % 30) + 30) % 30 - 15;
        const vx = v.horizontal ? p : v.lane;
        const vy = v.horizontal ? v.lane : p;
        const hw = v.horizontal ? (v.isBus ? 0.16 : 0.1) : 0.07;
        const hd = v.horizontal ? 0.07 : v.isBus ? 0.16 : 0.1;
        box(ctx, iso, vx, vy, hw, hd, 0.8, v.isBus ? 6.8 : 4.3, isColor ? v.color : "#cbd5e1", isColor ? v.color : "#94a3b8", isColor ? "#f4f0e6" : "#e2e8f0", "rgba(0,0,0,0.2)");
      }

      for (const ch of PEOPLE) {
        const p = (((ch.pos + time * 0.001 * ch.speed * 12) % 28) + 28) % 28 - 14;
        const px = ch.horizontal ? p : ch.lane;
        const py = ch.horizontal ? ch.lane : p;
        const bob = Math.abs(Math.sin(time * 0.0095 + ch.phase)) * 2.0;
        const foot = iso(px, py, 0);
        const body = iso(px, py, 4.8 + bob);
        const head = iso(px, py, 8.0 + bob);
        ctx.beginPath();
        ctx.moveTo(foot[0], foot[1]);
        ctx.lineTo(body[0], body[1]);
        ctx.strokeStyle = isColor ? ch.coat : isDark ? "#64748b" : "#94a3b8";
        ctx.lineWidth = 2.7;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(head[0], head[1], 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isColor ? (ch.hat ? "#102b79" : "#f2bd83") : "#cbd5e1";
        ctx.fill();
      }

      for (const cr of CRANES) {
        const base = iso(cr.gx, cr.gy, cr.z);
        const top = iso(cr.gx, cr.gy, cr.z + 28);
        ctx.beginPath();
        ctx.moveTo(...base);
        ctx.lineTo(...top);
        ctx.strokeStyle = isColor ? "#ed8838" : "#94a3b8";
        ctx.lineWidth = 2.1;
        ctx.stroke();
        const ang = cr.phase + time * cr.speed;
        ctx.beginPath();
        ctx.moveTo(top[0] - Math.cos(ang) * 10, top[1] - Math.sin(ang) * 5);
        ctx.lineTo(top[0] + Math.cos(ang) * 28, top[1] + Math.sin(ang) * 14);
        ctx.strokeStyle = isColor ? "#f2bd83" : "#cbd5e1";
        ctx.lineWidth = 1.9;
        ctx.stroke();
      }

      const u = (time * 0.00016) % 1;
      const alt = u > 0.52 ? Math.pow((u - 0.52) / 0.48, 1.7) * 98 : 2;
      const apt = iso(2.5 + u * 4.4, -4.2, alt);
      ctx.beginPath();
      ctx.moveTo(apt[0] - 11, apt[1] + 5);
      ctx.lineTo(apt[0] + 12, apt[1] - 6);
      ctx.lineTo(apt[0] + 4, apt[1] + 5);
      ctx.closePath();
      ctx.fillStyle = isColor ? "#ffffff" : "#94a3b8";
      ctx.fill();
    };



    const buildFluidWaveRing = (iso: IsoFn, worldR: number, time: number, steps = 96): Array<[number, number]> => {
      const raw: Array<[number, number]> = [];
      const t = time * 0.0012;
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const liquid = Math.sin(a * 3 + t) * 0.35 + Math.cos(a * 5 - t * 0.8) * 0.18;
        const r = Math.max(0.1, worldR + liquid);
        const wx = Math.cos(a) * r;
        const wy = Math.sin(a) * r;
        const z = sampleSmoothSwell(wx, wy);
        raw.push(iso(wx, wy, z));
      }
      let cur = raw;
      for (let pass = 0; pass < 2; pass++) {
        const next: Array<[number, number]> = [];
        for (let i = 0; i < steps; i++) {
          const p0 = cur[(i - 1 + steps) % steps];
          const p1 = cur[i];
          const p2 = cur[(i + 1) % steps];
          next.push([p0[0] * 0.25 + p1[0] * 0.5 + p2[0] * 0.25, p0[1] * 0.25 + p1[1] * 0.5 + p2[1] * 0.25]);
        }
        cur = next;
      }
      return cur;
    };

    const traceSmoothCurve = (ctx: CanvasRenderingContext2D, pts: Array<[number, number]>, reverse = false) => {
      const list = reverse ? [...pts].reverse() : pts;
      const n = list.length;
      const mid0x = (list[n - 1][0] + list[0][0]) * 0.5;
      const mid0y = (list[n - 1][1] + list[0][1]) * 0.5;
      ctx.moveTo(mid0x, mid0y);
      for (let i = 0; i < n; i++) {
        const p = list[i];
        const next = list[(i + 1) % n];
        ctx.quadraticCurveTo(p[0], p[1], (p[0] + next[0]) * 0.5, (p[1] + next[1]) * 0.5);
      }
      ctx.closePath();
    };

    const applyFluidColorWave = (W: number, H: number, dpr: number, isDark: boolean, time: number, irisP: number) => {
      if (waveCanvas.width !== W * dpr || waveCanvas.height !== H * dpr) {
        waveCanvas.width = W * dpr;
        waveCanvas.height = H * dpr;
      }
      const { iso } = getIso(W, H);
      const cCtx = colorCanvas.getContext("2d")!;
      const wCtx = waveCanvas.getContext("2d")!;
      wCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      wCtx.clearRect(0, 0, W, H);

      const maxWorldR = 23;

      cCtx.save();
      cCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cCtx.globalCompositeOperation = "destination-in";

      if (irisP < 0.015) {
        const cycle = (time * 0.000165) % 1;
        const eased = 1 - Math.pow(1 - cycle, 1.45);
        const bandWorldW = 5.4;
        const outerR = Math.max(0.25, eased * (maxWorldR + bandWorldW));
        const innerR = Math.max(0, outerR - bandWorldW);
        const edgeFade = Math.min(1, cycle * 4.5) * Math.min(1, (1 - cycle) * 4.0);

        const outerPts = buildFluidWaveRing(iso, outerR, time);
        const innerPts = innerR > 0.15 ? buildFluidWaveRing(iso, innerR, time) : null;

        cCtx.beginPath();
        traceSmoothCurve(cCtx, outerPts, false);
        if (innerPts) traceSmoothCurve(cCtx, innerPts, true);
        cCtx.fillStyle = `rgba(0, 0, 0, ${edgeFade.toFixed(3)})`;
        cCtx.fill("evenodd");

        if (edgeFade > 0.02) {
          wCtx.save();
          wCtx.beginPath();
          traceSmoothCurve(wCtx, outerPts, false);
          wCtx.lineCap = "round";
          wCtx.lineJoin = "round";
          wCtx.strokeStyle = `rgba(237, 136, 56, ${(0.12 * edgeFade).toFixed(3)})`;
          wCtx.lineWidth = 38;
          wCtx.stroke();
          wCtx.strokeStyle = `rgba(237, 136, 56, ${(0.22 * edgeFade).toFixed(3)})`;
          wCtx.lineWidth = 18;
          wCtx.stroke();
          wCtx.strokeStyle = isDark
            ? `rgba(142, 180, 245, ${(0.36 * edgeFade).toFixed(3)})`
            : `rgba(255, 250, 240, ${(0.52 * edgeFade).toFixed(3)})`;
          wCtx.lineWidth = 6;
          wCtx.stroke();
          wCtx.restore();
        }
      } else {
        const outerR = Math.max(0.5, irisP * (maxWorldR + 3.5));
        const outerPts = buildFluidWaveRing(iso, outerR, time);

        cCtx.beginPath();
        traceSmoothCurve(cCtx, outerPts, false);
        cCtx.fillStyle = "rgba(0, 0, 0, 1)";
        cCtx.fill();

        const fadeOut = 1 - Math.max(0, (irisP - 0.84) / 0.16);
        if (fadeOut > 0.01) {
          wCtx.save();
          wCtx.beginPath();
          traceSmoothCurve(wCtx, outerPts, false);
          wCtx.lineCap = "round";
          wCtx.lineJoin = "round";
          wCtx.strokeStyle = `rgba(237, 136, 56, ${(0.14 * fadeOut).toFixed(3)})`;
          wCtx.lineWidth = 40;
          wCtx.stroke();
          wCtx.strokeStyle = `rgba(237, 136, 56, ${(0.26 * fadeOut).toFixed(3)})`;
          wCtx.lineWidth = 18;
          wCtx.stroke();
          wCtx.strokeStyle = isDark
            ? `rgba(142, 180, 245, ${(0.38 * fadeOut).toFixed(3)})`
            : `rgba(255, 250, 240, ${(0.54 * fadeOut).toFixed(3)})`;
          wCtx.lineWidth = 7;
          wCtx.stroke();
          wCtx.restore();
        }
      }
      cCtx.restore();
    };

    let lastScrollY = window.scrollY;
    let rawScrollVel = 0;
    let smoothScrollVel = 0;
    let smoothP = 0;
    let mouseX = 0;
    let mouseY = 0;
    let smoothMX = 0;
    let smoothMY = 0;
    let lastFrame = performance.now();
    const rowPhase = [0, 0, 0];
    const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

    const onScroll = () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      rawScrollVel = Math.max(-60, Math.min(60, dy));
    };
    const onPointer = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });

    let rafId = 0;
    const render = (now: number) => {
      const dt = Math.min(48, now - lastFrame);
      lastFrame = now;

      const rect = section.getBoundingClientRect();
      if (rect.bottom < -220 || rect.top > window.innerHeight + 220) {
        rafId = requestAnimationFrame(render);
        return;
      }

      smoothScrollVel += (rawScrollVel - smoothScrollVel) * 0.12;
      rawScrollVel *= 0.86;

      const total = rect.height - window.innerHeight;
      const targetP = total > 0 ? clamp(-rect.top / total) : 0;
      smoothP += (targetP - smoothP) * 0.14;

      smoothMX += (mouseX - smoothMX) * 0.06;
      smoothMY += (mouseY - smoothMY) * 0.06;

      const fadeOutCity = clamp((smoothP - 0.38) / 0.22);
      const irisP = clamp((smoothP - 0.03) / 0.36);

      if (fadeOutCity < 0.98) {
        const dpr = Math.min(1.5, window.devicePixelRatio || 1);
        const W = monoCanvas.clientWidth;
        const H = monoCanvas.clientHeight;
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        if (W > 0 && H > 0) {
          if (monoCanvas.width !== W * dpr || monoCanvas.height !== H * dpr) {
            monoCanvas.width = W * dpr;
            monoCanvas.height = H * dpr;
            colorCanvas.width = W * dpr;
            colorCanvas.height = H * dpr;
          }
          if (cW !== W || cH !== H || cDpr !== dpr || cDark !== isDark) {
            cW = W;
            cH = H;
            cDpr = dpr;
            cDark = isDark;
            buildCache(staticMono, W, H, dpr, false, isDark);
            buildCache(staticColor, W, H, dpr, true, isDark);
          }

          const mCtx = monoCanvas.getContext("2d")!;
          mCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          mCtx.globalCompositeOperation = "source-over";
          mCtx.drawImage(staticMono, 0, 0, W, H);
          drawLiving(mCtx, W, H, false, isDark, now);

          const cCtx = colorCanvas.getContext("2d")!;
          cCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          cCtx.globalCompositeOperation = "source-over";
          cCtx.drawImage(staticColor, 0, 0, W, H);
          drawLiving(cCtx, W, H, true, isDark, now);

          applyFluidColorWave(W, H, dpr, isDark, now, irisP);
        }
      }

      if (cityWrapRef.current) {
        const scale = 1 + irisP * 0.065;
        cityWrapRef.current.style.transform = `translate3d(${(-smoothMX * 14).toFixed(1)}px, ${(-smoothMY * 10).toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
      }
      if (cityLayerRef.current) {
        cityLayerRef.current.style.opacity = String(1 - fadeOutCity);
        cityLayerRef.current.style.pointerEvents = fadeOutCity > 0.85 ? "none" : "auto";
      }
      if (cityHeaderRef.current) {
        cityHeaderRef.current.style.transform = `translate3d(0, ${(-fadeOutCity * 38).toFixed(1)}px, 0)`;
      }

      const headIn = clamp((smoothP - 0.5) / 0.16);
      if (orbitTopRef.current) {
        orbitTopRef.current.style.opacity = String(headIn);
        orbitTopRef.current.style.transform = `translate3d(0, ${((1 - headIn) * 30).toFixed(1)}px, 0)`;
      }

      const arcIn = clamp((smoothP - 0.54) / 0.16);
      arcStage.style.opacity = String(arcIn);
      arcStage.style.transform = `translate3d(0, ${((1 - arcIn) * 34).toFixed(1)}px, 0)`;

      const W = arcStage.clientWidth || window.innerWidth;
      // Generous span for big 66px icons so every badge has crisp breathing room
      const span = Math.max(W * 1.38, 1780);

      for (let r = 0; r < ARC_ROWS.length; r++) {
        const dir = ARC_ROWS[r].baseSpeed >= 0 ? 1 : -1;
        const velBoost = smoothScrollVel * 0.000012 * dir;
        rowPhase[r] = (rowPhase[r] + (ARC_ROWS[r].baseSpeed + velBoost) * dt) % 1;
      }

      for (const n of arcNodes) {
        let u = (n.basePhase + rowPhase[n.rIdx]) % 1;
        if (u < 0) u += 1;
        const norm = (u - 0.5) * 2;
        const x = W * 0.5 + norm * (span * 0.5);
        const y = n.row.yOffset + (1 - norm * norm) * n.row.curve;
        const dyDx = (-2 * norm * n.row.curve) / (span * 0.5);
        const deg = Math.atan(dyDx) * (180 / Math.PI) * 0.78;
        n.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${deg.toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reduced]);

  const activeSkill = SKILL_ROTATION[reduced ? 0 : skillIdx];
  const selectedCategory = selectedCatIdx !== null ? data.skills.categories[selectedCatIdx] : null;

  return (
    <section id="skills" className="skills-showcase" ref={sectionRef} data-reduced={reduced} aria-labelledby="skills-heading">
      <div className="skills-showcase-sticky">
        {/* STAGE A: FULL-BLEED PORTFOLIO-THEMED METROPOLIS + FLUID WAVE */}
        <div className="skills-city-layer" ref={cityLayerRef}>
          <div className="skills-city-wrap" ref={cityWrapRef}>
            <canvas className="skills-city-canvas skills-city-mono" ref={monoRef} aria-hidden="true" />
            <canvas className="skills-city-canvas skills-city-color" ref={colorRef} aria-hidden="true" />
            <canvas className="skills-city-canvas skills-city-wave" ref={waveRef} aria-hidden="true" />
            <div className="skills-city-mist" />
          </div>

          <div className="skills-city-header" ref={cityHeaderRef}>
            <Scramble className="label-sticker" text="SKILLS & CAPABILITIES" />
            <h2 id="skills-heading" className="skills-city-title">
              <RippleWords text="Data pipelines with" />
              <br />
              <em>zero</em> <RippleWords text="friction" suffix={<span className="orange">.</span>} />
            </h2>
            <p className="skills-city-sub">
              Scroll to sweep through the data systems, cloud lakehouse tools, and streaming stack behind my production work.
            </p>
          </div>
        </div>

        {/* STAGE B: PORTFOLIO NAVY/NIGHT + HEADLINE + RIGHT EXPANDABLE CATEGORY LIST + ORBIT / VERTICAL STRING */}
        <div className="skills-orbit-layer">
          {/* VERTICAL INVISIBLE STRING TIED TO TOP-CENTER OF DESKTOP */}
          <div className="skills-vstring-overlay" aria-label="Selected category vertical skill string">
            <AnimatePresence mode="popLayout" custom={stringDir}>
              {selectedCategory && (
                <VerticalBeadString
                  key={selectedCategory.name}
                  items={selectedCategory.items}
                  direction={stringDir}
                  reduced={reduced}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="skills-orbit-top" ref={orbitTopRef}>
            <div className="skills-orbit-head">
              <p className="skills-orbit-headline">
                I use{" "}
                <span className={`skills-orbit-slot ${slotState}`} role="img" aria-label={activeSkill.name}>
                  <img src={assetUrl(`assets/skills/${activeSkill.file}`)} alt="" />
                </span>{" "}
                to turn<br />
                raw data into <em>answers</em><span className="orange-dot">.</span>
              </p>
              <div className="skills-orbit-meta-row">
                <motion.span layout className="skills-orbit-pill">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={selectedCategory ? selectedCategory.name : activeSkill.name}
                      className="skills-orbit-pill-text"
                      initial={reduced ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={reduced ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {selectedCategory ? selectedCategory.name : activeSkill.name}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
                {selectedCategory && (
                  <button
                    type="button"
                    className="skills-reset-orbit-btn"
                    onClick={() => handleSelectCategory(null)}
                  >
                    ← All skills
                  </button>
                )}
              </div>
            </div>

            {/* Right-side Animated Dropdown displaying expandable category list */}
            <div className="skills-cat-wrap" ref={catWrapRef}>
              <motion.button
                layout
                type="button"
                className="skills-cat-trigger"
                aria-expanded={catMenuOpen}
                onClick={() => {
                  if (catMenuOpen) {
                    handleSelectCategory(null);
                    setCatMenuOpen(false);
                  } else {
                    setCatMenuOpen(true);
                  }
                }}
              >
                <span className="skills-cat-trigger-label">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={catMenuOpen ? "back" : "browse"}
                      initial={reduced ? false : { opacity: 0, y: 8, filter: "blur(3px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(3px)" }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: "inline-block" }}
                    >
                      {catMenuOpen ? "← Back to all skills" : "Browse by category"}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="skills-cat-chevron" aria-hidden="true">▾</span>
              </motion.button>

              <AnimatePresence>
                {catMenuOpen && (
                  <motion.div
                    className="skills-cat-dropdown"
                    role="region"
                    aria-label="Filter skills by category"
                    initial={reduced ? false : { opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  >
                    {data.skills.categories.map(({ name, items }, idx) => {
                      const isSelected = selectedCatIdx === idx;
                      return (
                        <div key={name} className="skills-cat-item-wrap">
                          <button
                            type="button"
                            className={`skills-cat-option ${isSelected ? "is-active" : ""}`}
                            aria-expanded={isSelected}
                            onClick={() => handleSelectCategory(idx)}
                          >
                            <span>{name}</span>
                            <span className="skills-cat-option-count">{items.length}</span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isSelected && (
                              <motion.div
                                className="skills-cat-list-panel"
                                initial={reduced ? false : { height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              >
                                <div className="skills-cat-tags">
                                  {items.map((item) => (
                                    <span key={item}>
                                      {iconMap[item] && (
                                        <img src={assetUrl(`assets/skills/${iconMap[item]}`)} alt="" loading="lazy" />
                                      )}
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 2-ARC ORBIT STAGE (BIG 66PX ICONS + SMALL 10PX LABELS) */}
          <div className="skills-stream-wrap" aria-label="Skills and capabilities orbital stream">
            <div
              className={`skills-arc-stage ${selectedCategory ? "is-dimmed" : ""}`}
              ref={arcStageRef}
              aria-hidden={Boolean(selectedCategory)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
