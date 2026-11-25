import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "../data/portfolio.json";
import skillIcons from "../data/skillIcons.json";
import { RippleWords } from "./HeadingRipples";
import { useMotionPreference } from "./MotionSystem";
import { VaultSticker } from "./VaultSectionBadge";
import { drawCityMicroEventsForBand } from "./skills-city/cityEvents";
import type { LandmarkAtlas } from "./skills-city/landmarkAtlas";
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



// Studio Cycles matte-clay & slate-roof miniature palettes (warm sunlit left, cool dove-gray shadow right)
const PALETTES_LIGHT = [
  { top: "#8b8e95", left: "#faf8f3", leftBot: "#e3e0d8", right: "#cfd3dc", rightBot: "#b2b7c2", win: "#ffd49c", lit: "#ffa452" },
  { top: "#7c7f87", left: "#f7f5ee", leftBot: "#dedad0", right: "#c9cdd6", rightBot: "#acb1bc", win: "#ffcf91", lit: "#ff9e4a" },
  { top: "#868991", left: "#f5f4ef", leftBot: "#dcd9d1", right: "#ccd0d9", rightBot: "#afb4bf", win: "#ffd8a6", lit: "#ffa859" },
  { top: "#73767e", left: "#f8f6f1", leftBot: "#e0ddd5", right: "#cbd0da", rightBot: "#aeb3bf", win: "#ffd196", lit: "#ffa04d" },
  { top: "#93959c", left: "#fcfaf5", leftBot: "#e6e3db", right: "#d4d7e0", rightBot: "#b8bcc7", win: "#ffd6a1", lit: "#ffa654" },
  { top: "#7a7e86", left: "#f2f0ea", leftBot: "#d8d5cc", right: "#c6cbd4", rightBot: "#a9aeb9", win: "#ffce8f", lit: "#ff9b45" },
  { top: "#888b92", left: "#f6f4ed", leftBot: "#dedbd2", right: "#cdd1da", rightBot: "#b0b5c0", win: "#ffd399", lit: "#ffa350" },
  { top: "#7f828a", left: "#f4f2ec", leftBot: "#dbd8cf", right: "#c9ced7", rightBot: "#acb1bd", win: "#ffd094", lit: "#ff9f4b" },
];

const PALETTES_DARK = [
  { top: "#4b5163", left: "#343a4c", leftBot: "#222736", right: "#292e3d", rightBot: "#191d29", win: "#ffba73", lit: "#ff9442" },
  { top: "#43495c", left: "#2f3546", leftBot: "#1e2330", right: "#252a38", rightBot: "#161a26", win: "#ffc280", lit: "#ff9b4a" },
  { top: "#505669", left: "#383e52", leftBot: "#252a3a", right: "#2c3242", rightBot: "#1c202e", win: "#ffb66b", lit: "#ff8f3b" },
  { top: "#464c5e", left: "#313748", leftBot: "#202533", right: "#262c3b", rightBot: "#171b27", win: "#ffc685", lit: "#ff9e4f" },
  { top: "#4d5366", left: "#363c4f", leftBot: "#232838", right: "#2a3040", rightBot: "#1a1e2b", win: "#ffbd78", lit: "#ff9645" },
  { top: "#404657", left: "#2d3343", leftBot: "#1c212e", right: "#232836", rightBot: "#151824", win: "#ffb870", lit: "#ff9240" },
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

const FERRIS_POS = { gx: -7.35, gy: 4.86 };

function buildCityStructures(): Struct[] {
  const rand = mulberry32(9721);
  const structures: Struct[] = [
    { kind: "stadium", gx: 0.0, gy: -0.05, w: 1.92, d: 1.46, h: 34, palIdx: 0 },
    { kind: "airport", gx: 4.1, gy: -3.25, w: 2.45, d: 1.22, h: 28, palIdx: 2 },
    { kind: "controlTower", gx: 5.2, gy: -2.5, w: 0.44, d: 0.44, h: 98, palIdx: 0 },
    { kind: "spire", gx: -3.9, gy: -3.1, w: 0.88, d: 0.88, h: 142, palIdx: 3 },
    { kind: "clocktower", gx: -4.1, gy: 2.65, w: 0.56, d: 0.56, h: 86, palIdx: 4 },
    { kind: "pond", gx: 3.85, gy: 2.65, w: 1.38, d: 0.94, h: 3, palIdx: 2 },
    // Cosmopolitan civic & transit landmarks
    { kind: "greenhouse", gx: -3.85, gy: -6.28, w: 1.1, d: 0.84, h: 26, palIdx: 5 },
    { kind: "rotunda", gx: -7.35, gy: -3.02, w: 1.04, d: 1.04, h: 48, palIdx: 0 },
    { kind: "metro_station", gx: -0.25, gy: METRO_Y, w: 1.18, d: 0.42, h: 34, palIdx: 2 },
    { kind: "metro_station", gx: -7.25, gy: METRO_Y, w: 1.18, d: 0.42, h: 34, palIdx: 3 },
    { kind: "ferris_base", gx: FERRIS_POS.gx, gy: FERRIS_POS.gy, w: 0.96, d: 0.62, h: 12, palIdx: 0 },
    // 14 compact, evenly distributed skill-logo architectural landmarks
    { kind: "logo_databricks", gx: -0.35, gy: -2.95, w: 1.14, d: 1.14, h: 106, palIdx: 1 },
    { kind: "logo_python", gx: -3.75, gy: -0.05, w: 1.16, d: 1.1, h: 94, palIdx: 3 },
    { kind: "logo_airflow", gx: 3.65, gy: -0.05, w: 1.14, d: 1.14, h: 72, palIdx: 0 },
    { kind: "logo_fastapi", gx: -7.15, gy: -0.05, w: 1.14, d: 1.04, h: 74, palIdx: 5 },
    { kind: "logo_delta", gx: 0.15, gy: 2.62, w: 1.2, d: 1.06, h: 82, palIdx: 2 },
    { kind: "logo_spark", gx: -3.3, gy: 6.45, w: 1.16, d: 1.12, h: 62, palIdx: 1 },
    { kind: "logo_docker", gx: 0.35, gy: 6.42, w: 1.26, d: 0.96, h: 56, palIdx: 2 },
    { kind: "logo_azure", gx: 7.35, gy: -0.05, w: 1.18, d: 1.04, h: 112, palIdx: 3 },
    { kind: "logo_powerbi", gx: -7.2, gy: 2.66, w: 1.18, d: 0.9, h: 96, palIdx: 4 },
    { kind: "logo_gcp", gx: 7.45, gy: -2.95, w: 1.24, d: 1.0, h: 64, palIdx: 0 },
    { kind: "logo_redis", gx: 3.85, gy: -6.38, w: 1.16, d: 1.04, h: 68, palIdx: 1 },
    { kind: "logo_kafka", gx: 7.32, gy: 2.66, w: 1.16, d: 1.04, h: 84, palIdx: 3 },
    { kind: "logo_gemini", gx: -0.45, gy: -6.48, w: 1.2, d: 1.2, h: 108, palIdx: 3 },
    { kind: "logo_chatgpt", gx: 1.05, gy: -6.48, w: 1.22, d: 1.22, h: 86, palIdx: 5 },
    { kind: "logo_claude", gx: -1.08, gy: 6.42, w: 1.22, d: 1.22, h: 88, palIdx: 1 },
    { kind: "logo_postgres", gx: 3.92, gy: 6.42, w: 1.16, d: 1.04, h: 74, palIdx: 2 },
  ];

  // Footprint-exact placement check: guarantees zero overlap with sidewalks (±0.36), canal water, or neighbors
  const canPlace = (gx: number, gy: number, hw: number, hd: number, allowRiverbank = false) => {
    for (const rx of ROAD_X) if (Math.abs(gx - rx) < 0.36 + hw) return false;
    for (const ry of ROAD_Y) if (Math.abs(gy - ry) < 0.36 + hd) return false;
    const canalPad = allowRiverbank ? 0.03 : 0.34;
    if (gy + hd > CANAL_Y0 - canalPad && gy - hd < CANAL_Y1 + canalPad) return false;
    if (Math.abs(gy - METRO_Y) < 0.24 + hd) return false;
    if (gx > 2.4 && gx < 7.2 && gy > -4.6 && gy < -3.8) return false;
    for (const s of structures) {
      const isLogo = s.kind.startsWith("logo_");
      const pad = isLogo ? 0.14 : 0.08;
      if (Math.abs(gx - s.gx) < s.w * 0.5 + hw + pad && Math.abs(gy - s.gy) < s.d * 0.5 + hd + pad) return false;
    }
    return true;
  };

  // PASS 1: Cosmopolitan Waterfront Quays along BOTH north & south canal embankments
  const bankKinds = ["canal_house", "waterfront_cafe", "boathouse", "canal_house", "river_promenade", "waterfront_cafe"];
  let bankIdx = 0;
  for (let gx = -16.2; gx <= 16.2; gx += 0.64) {
    const banks: Array<{ gy: number; isNorth: boolean }> = [
      { gy: CANAL_Y0 - 0.24, isNorth: true },
      { gy: CANAL_Y1 + 0.28, isNorth: false },
    ];
    for (const b of banks) {
      const u = gx - b.gy;
      const v = gx + b.gy;
      if (Math.abs(u) > 22.5 || v < -18.5 || v > 19.5) continue;
      const jx = gx + (rand() - 0.5) * 0.06;
      const kind = bankKinds[bankIdx % bankKinds.length];
      bankIdx++;
      const w = kind === "boathouse" ? 0.52 : kind === "river_promenade" ? 0.54 : 0.44 + rand() * 0.1;
      const d = 0.36 + rand() * 0.06;
      if (!canPlace(jx, b.gy, w * 0.5, d * 0.5, true)) continue;
      structures.push({
        kind,
        gx: jx,
        gy: b.gy,
        w,
        d,
        h: kind === "river_promenade" ? 3 : kind === "boathouse" ? 16 : kind === "waterfront_cafe" ? 18 + rand() * 6 : 24 + rand() * 14,
        floors: kind === "canal_house" ? 3 : 2,
        cols: 2,
        seed: rand(),
        palIdx: bankIdx + (b.isNorth ? 1 : 3),
      });
    }
  }

  // PASS 2: Dense Primary Metropolitan Block Grid (tighter 0.78 pitch filling up to every avenue & landmark)
  const variants = ["stepped", "gable", "courtyard", "penthouse", "cafe", "slim", "lshape", "terrace", "silo", "tower"];
  let idx = 0;

  for (let gx = -20; gx <= 20; gx += 0.78) {
    for (let gy = -20; gy <= 20; gy += 0.78) {
      const u = gx - gy;
      const v = gx + gy;
      if (Math.abs(u) > 23.5 || v < -19.5 || v > 20.5) continue;

      const jx = gx + (rand() - 0.5) * 0.08;
      const jy = gy + (rand() - 0.5) * 0.08;
      const roll = rand();

      if (roll < 0.065) {
        const w = 0.64;
        const d = 0.64;
        if (canPlace(jx, jy, w * 0.5, d * 0.5)) {
          structures.push({ kind: "park", gx: jx, gy: jy, w, d, h: 2, hasFountain: rand() < 0.5, palIdx: 5 });
        }
        continue;
      }
      if (roll < 0.085) {
        const w = 0.66;
        const d = 0.5;
        if (canPlace(jx, jy, w * 0.5, d * 0.5)) {
          structures.push({ kind: "tennis_court", gx: jx, gy: jy, w, d, h: 2.5, palIdx: 5 });
        }
        continue;
      }

      const kind = variants[(idx * 7 + Math.floor(rand() * 3)) % variants.length];
      idx++;
      const dist = Math.hypot(jx * 0.72, jy * 0.78);
      let scaleH = Math.max(18, (90 - dist * 2.65) * (0.46 + rand() * 0.88));
      // Protect foreground sightlines in front of every skill-logo landmark so nothing hides a logo or brand name
      const blocksLogo = structures.some(
        (ls) => ls.kind.startsWith("logo_") && jx > ls.gx - 0.55 && jx < ls.gx + 1.85 && jy > ls.gy - 0.55 && jy < ls.gy + 1.85,
      );
      if (blocksLogo) scaleH = Math.min(scaleH, 16 + rand() * 7);
      const small = blocksLogo || kind === "gable" || kind === "cafe" || kind === "courtyard";
      const w = 0.44 + rand() * 0.22;
      const d = 0.42 + rand() * 0.22;
      if (!canPlace(jx, jy, w * 0.5, d * 0.5)) continue;

      structures.push({
        kind,
        gx: jx,
        gy: jy,
        w,
        d,
        h: blocksLogo ? 15 + rand() * 7 : small ? 18 + rand() * 14 : scaleH,
        floors: small ? 2 : Math.max(3, Math.floor(scaleH / 8.8)),
        cols: rand() < 0.5 ? 3 : 4,
        hasHvac: rand() < 0.46,
        hasWaterTower: !small && scaleH > 32 && scaleH < 64 && rand() < 0.22,
        hasHelipad: !small && scaleH > 54 && rand() < 0.25,
        hasSpire: !small && scaleH > 62 && rand() < 0.3,
        hasSolar: !small && rand() < 0.34,
        hasBillboard: !small && scaleH > 34 && rand() < 0.16,
        hasRoofGarden: !small && rand() < 0.28,
        trees: rand() < 0.72 ? (rand() < 0.38 ? 2 : 1) : 0,
        seed: rand(),
        palIdx: idx + Math.floor(rand() * 5),
      });
    }
  }

  // PASS 3: Fine Cosmopolitan Pocket Infill & Lush Landscaping (trees, bushes, flower beds, pocket plazas)
  const infillKinds = [
    "bush_cluster",
    "corner_shop",
    "tree_grove",
    "market_stalls",
    "garden_bed",
    "pocket_plaza",
    "bush_cluster",
    "gable",
    "plaza_fountain",
    "tree_grove",
  ];
  let infIdx = 0;
  for (let gx = -18.5; gx <= 18.5; gx += 0.48) {
    for (let gy = -18.5; gy <= 18.5; gy += 0.48) {
      const u = gx - gy;
      const v = gx + gy;
      if (Math.abs(u) > 22.5 || v < -18.5 || v > 19.5) continue;
      const kind = infillKinds[infIdx % infillKinds.length];
      const isGreenery = kind === "bush_cluster" || kind === "garden_bed" || kind === "tree_grove";
      const w = isGreenery ? 0.28 + rand() * 0.08 : 0.34 + rand() * 0.08;
      const d = isGreenery ? 0.28 + rand() * 0.08 : 0.34 + rand() * 0.08;
      if (!canPlace(gx, gy, w * 0.5, d * 0.5)) continue;
      infIdx++;
      structures.push({
        kind,
        gx,
        gy,
        w,
        d,
        h: isGreenery || kind === "pocket_plaza" || kind === "plaza_fountain" ? 2.5 : kind === "market_stalls" ? 10 : 15 + rand() * 11,
        floors: 2,
        cols: 2,
        seed: rand(),
        palIdx: infIdx + Math.floor(rand() * 6),
      });
    }
  }

  // PASS 4: Lush Avenue Street Trees, Benches & Planters lining BOTH sides of every boulevard + canal embankments
  for (let p = -16.0; p <= 16.0; p += 0.84) {
    for (const ry of ROAD_Y) {
      if (ROAD_X.some((rx) => Math.abs(p - rx) < 0.68)) continue;
      structures.push({ kind: "street_foliage", gx: p, gy: ry + 0.36, w: 0.16, d: 0.16, h: 2, seed: rand(), palIdx: 5 });
      structures.push({ kind: "street_foliage", gx: p + 0.42, gy: ry - 0.36, w: 0.16, d: 0.16, h: 2, seed: rand(), palIdx: 5 });
    }
    for (const rx of ROAD_X) {
      if (ROAD_Y.some((ry) => Math.abs(p - ry) < 0.68)) continue;
      if (p > CANAL_Y0 - 0.5 && p < CANAL_Y1 + 0.5) continue;
      structures.push({ kind: "street_foliage", gx: rx - 0.36, gy: p, w: 0.16, d: 0.16, h: 2, seed: rand(), palIdx: 5 });
      structures.push({ kind: "street_foliage", gx: rx + 0.36, gy: p + 0.42, w: 0.16, d: 0.16, h: 2, seed: rand(), palIdx: 5 });
    }
  }
  // Waterfront canal promenade trees & benches + stadium plaza corner trees
  for (let p = -15.5; p <= 15.5; p += 1.05) {
    if (ROAD_X.some((rx) => Math.abs(p - rx) < 0.62)) continue;
    structures.push({ kind: "street_foliage", gx: p, gy: CANAL_Y0 - 0.12, w: 0.14, d: 0.14, h: 2, seed: rand(), palIdx: 5 });
    structures.push({ kind: "street_foliage", gx: p + 0.5, gy: CANAL_Y1 + 0.13, w: 0.14, d: 0.14, h: 2, seed: rand(), palIdx: 5 });
  }
  [[-1.32, -1.12], [1.32, -1.12], [-1.32, 1.02], [1.32, 1.02], [-1.34, 0.0], [1.34, 0.0]].forEach(([sx, sy]) => {
    structures.push({ kind: "street_foliage", gx: sx, gy: sy, w: 0.16, d: 0.16, h: 2, seed: rand() * 0.45, palIdx: 5 });
  });

  // 6 new distinct architectural logo buildings placed in the expanded right & left city districts.
  // Clear any overlapping generic blocks within their plazas so they stand out cleanly.
  const expandedLogos: Struct[] = [
    { kind: "logo_synapse", gx: 9.2, gy: -5.8, w: 1.08, d: 1.08, h: 68, palIdx: 2 },
    { kind: "logo_apim", gx: 12.6, gy: -3.2, w: 1.06, d: 0.48, h: 66, palIdx: 2 },
    { kind: "logo_eventhubs", gx: 11.4, gy: -7.4, w: 1.06, d: 0.48, h: 66, palIdx: 2 },
    { kind: "logo_unity", gx: -6.2, gy: 7.4, w: 1.12, d: 1.12, h: 68, palIdx: 2 },
    { kind: "logo_adls", gx: -9.8, gy: 0.4, w: 0.48, d: 1.04, h: 62, palIdx: 2 },
    { kind: "logo_blob", gx: -7.8, gy: 9.8, w: 0.48, d: 1.04, h: 64, palIdx: 2 },
  ];
  for (let i = structures.length - 1; i >= 0; i--) {
    const st = structures[i];
    if (st.kind.startsWith("logo_")) continue;
    if (
      expandedLogos.some(
        (nl) =>
          Math.abs(st.gx - nl.gx) < (st.w + nl.w) * 0.5 + 0.22 &&
          Math.abs(st.gy - nl.gy) < (st.d + nl.d) * 0.5 + 0.22,
      )
    ) {
      structures.splice(i, 1);
    }
  }

  // Infill sites surveyed after the original structures are placed.
  structures.push(
    ...expandedLogos,
    { kind: "logo_devops", gx: -0.3, gy: 12.4, w: 0.96, d: 0.44, h: 64, palIdx: 2 },
    { kind: "logo_pytest", gx: 1.6, gy: 12.1, w: 0.44, d: 0.96, h: 64, palIdx: 2 },
    { kind: "logo_vault", gx: 11.95, gy: 1, w: 0.92, d: 0.92, h: 62, palIdx: 2 },
    { kind: "logo_mysql", gx: 11.7, gy: -1.1, w: 1.04, d: 0.46, h: 62, palIdx: 2 },
    { kind: "logo_sonar", gx: -10.25, gy: 2.75, w: 0.44, d: 0.96, h: 64, palIdx: 2 },
    { kind: "logo_functions", gx: -3, gy: 10.2, w: 0.92, d: 0.92, h: 62, palIdx: 2 },
    { kind: "logo_adf", gx: 2.8, gy: 8.75, w: 0.415, d: 0.99, h: 54, palIdx: 2 },
    { kind: "logo_copilot", gx: -1.45, gy: -6.5, w: 0.55, d: 1.23, h: 59, palIdx: 5 },
    { kind: "logo_git", gx: 0.375, gy: 1.075, w: 0.55, d: 0.55, h: 48, palIdx: 1 },
    { kind: "logo_vscode", gx: 8.55, gy: -1.1, w: 1.11, d: 0.47, h: 60, palIdx: 3 },
  );
  for (const building of structures) {
    if (building.kind.startsWith("logo_")) building.h *= 1.45;
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

const PEOPLE = Array.from({ length: 168 }, (_, i) => {
  const rand = mulberry32(200 + i * 29);
  const isCanal = i >= 140;
  const horizontal = isCanal ? true : i % 2 === 0;
  const lanesH = ROAD_Y.flatMap((ry) => [ry - 0.275, ry + 0.275]);
  const lanesV = ROAD_X.flatMap((rx) => [rx - 0.275, rx + 0.275]);
  const canalLanes = [CANAL_Y0 - 0.16, CANAL_Y1 + 0.18];
  return {
    horizontal,
    lane: isCanal ? canalLanes[i % 2] : horizontal ? lanesH[i % lanesH.length] : lanesV[i % lanesV.length],
    pos: -14 + rand() * 28,
    speed: (0.006 + rand() * 0.009) * (rand() < 0.5 ? 1 : -1),
    coat: ["#ed8838", "#102b79", "#4b7b8b", "#d9534f", "#569674", "#b78152", "#f5c418", "#7c5cbf"][i % 8],
    hat: rand() < 0.35,
    phase: rand() * Math.PI * 2,
  };
});

// Mingling human gatherings on stadium plaza apron, Ferris wheel plaza, pond, landmark pedestals & pocket plazas
const GATHERINGS = (() => {
  const rand = mulberry32(8191);
  const coats = ["#ed8838", "#102b79", "#4b7b8b", "#d9534f", "#569674", "#f5c418", "#b78152", "#e26d5c"];
  const list: Array<{ gx: number; gy: number; z0: number; coat: string; hat: boolean; phase: number }> = [];
  const hubs: Array<{ gx: number; gy: number; r: number; count: number; z0: number }> = [
    { gx: -1.18, gy: 0.78, r: 0.28, count: 14, z0: 0 },
    { gx: 1.18, gy: 0.76, r: 0.28, count: 14, z0: 0 },
    { gx: 0.0, gy: 0.96, r: 0.42, count: 12, z0: 0 },
    { gx: 0.0, gy: -1.04, r: 0.38, count: 8, z0: 0 },
    { gx: FERRIS_POS.gx, gy: FERRIS_POS.gy + 0.34, r: 0.34, count: 10, z0: 3.2 },
    { gx: 3.85, gy: 3.22, r: 0.38, count: 8, z0: 2.0 },
    { gx: -0.35, gy: -2.35, r: 0.26, count: 6, z0: 2.8 },
    { gx: -3.75, gy: 0.56, r: 0.26, count: 6, z0: 2.8 },
    { gx: 3.65, gy: 0.56, r: 0.26, count: 6, z0: 2.8 },
    { gx: 0.15, gy: 3.22, r: 0.26, count: 6, z0: 2.8 },
  ];
  for (const h of hubs) {
    for (let k = 0; k < h.count; k++) {
      const a = rand() * Math.PI * 2;
      const d = Math.sqrt(rand()) * h.r;
      list.push({
        gx: h.gx + Math.cos(a) * d,
        gy: h.gy + Math.sin(a) * d,
        z0: h.z0,
        coat: coats[Math.floor(rand() * coats.length)],
        hat: rand() < 0.38,
        phase: rand() * Math.PI * 2,
      });
    }
  }
  return list;
})();

// Dynamic night-mode building windows that organically switch ON and OFF across the skyline
interface NightWindowSlot {
  gx: number;
  gy: number;
  z: number;
  hw: number;
  hd: number;
  a: number;
  b: number;
  face: "L" | "R";
  depth: number;
  period: number;
  phase: number;
  warm: string;
}
const NIGHT_WINDOWS: NightWindowSlot[] = (() => {
  const rand = mulberry32(6617);
  const slots: NightWindowSlot[] = [];
  const eligible = new Set(["tower", "stepped", "penthouse", "slim", "terrace", "lshape", "canal_house", "spire"]);
  for (const s of STRUCTURES) {
    if (!eligible.has(s.kind) || s.h < 22) continue;
    if (rand() > 0.58) continue;
    const hw = s.kind === "slim" ? s.w * 0.37 : s.w * 0.5;
    const hd = s.kind === "slim" ? s.d * 0.37 : s.d * 0.5;
    const topZ = s.kind === "terrace" ? s.h * 0.42 : s.kind === "stepped" || s.kind === "penthouse" ? s.h * 0.72 : s.h;
    const rows = Math.max(2, Math.min(6, s.floors || 3));
    const cols = Math.max(2, s.cols || 3);
    const dz = (topZ - 5) / (rows + 1);
    const picks = 2 + Math.floor(rand() * 2);
    for (let p = 0; p < picks; p++) {
      const r = 1 + Math.floor(rand() * rows);
      const c = Math.floor(rand() * cols);
      const face: "L" | "R" = rand() < 0.5 ? "L" : "R";
      const span = face === "L" ? hw : hd;
      const a = -span + ((c + 0.2) / cols) * span * 2;
      const b = -span + ((c + 0.8) / cols) * span * 2;
      slots.push({
        gx: s.gx,
        gy: s.gy,
        z: 3 + r * dz,
        hw,
        hd,
        a,
        b,
        face,
        depth: s.gx + s.gy,
        period: 0.00055 + rand() * 0.00145,
        phase: rand() * Math.PI * 2,
        warm: rand() < 0.5 ? "#ffda94" : "#ff9e4a",
      });
    }
  }
  return slots;
})();

const VEHICLES = Array.from({ length: 36 }, (_, i) => {
  const rand = mulberry32(950 + i * 41);
  const horizontal = i % 2 === 0;
  const lanesH = ROAD_Y.flatMap((ry) => [ry - 0.095, ry + 0.095]);
  const lanesV = ROAD_X.flatMap((rx) => [rx - 0.095, rx + 0.095]);
  const laneIdx = i % 8;
  const dir = laneIdx % 2 === 0 ? 1 : -1;
  const isBus = i % 5 === 0;
  return {
    horizontal,
    lane: horizontal ? lanesH[laneIdx] : lanesV[laneIdx],
    pos: -15 + rand() * 30,
    speed: (isBus ? 0.017 : 0.026 + rand() * 0.022) * dir,
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
for (let p = -15.4; p <= 15.4; p += 1.4) {
  for (const ry of ROAD_Y) {
    if (ROAD_X.every((rx) => Math.abs(p - rx) > 0.62)) {
      LAMPS.push({ gx: p, gy: ry - 0.33 });
      LAMPS.push({ gx: p + 0.7, gy: ry + 0.33 });
    }
  }
  for (const rx of ROAD_X) {
    if (ROAD_Y.every((ry) => Math.abs(p - ry) > 0.62) && (p < CANAL_Y0 - 0.4 || p > CANAL_Y1 + 0.4)) {
      LAMPS.push({ gx: rx + 0.33, gy: p });
      LAMPS.push({ gx: rx - 0.33, gy: p + 0.7 });
    }
  }
  if (ROAD_X.every((rx) => Math.abs(p - rx) > 0.62)) {
    LAMPS.push({ gx: p, gy: CANAL_Y0 - 0.1 });
    LAMPS.push({ gx: p + 0.7, gy: CANAL_Y1 + 0.1 });
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
    yOffset: 30,
    curve: 84,
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
    yOffset: 108,
    curve: 84,
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
    yOffset: 186,
    curve: 84,
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

  const enterY = direction >= 0 ? -260 : 260;
  const vstringVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir >= 0 ? -280 : 280,
      scale: 0.96,
    }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 180, damping: 19, mass: 0.95 },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir >= 0 ? 280 : -320,
      scale: 0.94,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <motion.div
      ref={stageRef}
      className="skills-vstring-stage"
      custom={direction}
      variants={vstringVariants}
      initial={reduced ? false : "enter"}
      animate="center"
      exit="exit"
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

// High-frequency studio clay micro-grain pattern for tactile Blender-Cycles matte stucco finish
let clayGrainPattern: CanvasPattern | null = null;
function getClayGrain(ctx: CanvasRenderingContext2D): CanvasPattern | null {
  if (clayGrainPattern) return clayGrainPattern;
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d");
  if (!g) return null;
  const rand = mulberry32(4049);
  for (let y = 0; y < 64; y += 2) {
    for (let x = 0; x < 64; x += 2) {
      const v = rand();
      const a = 0.018 + rand() * 0.03;
      g.fillStyle = v > 0.5 ? `rgba(255,255,255,${a.toFixed(3)})` : `rgba(20,28,45,${a.toFixed(3)})`;
      g.fillRect(x, y, 2, 2);
    }
  }
  clayGrainPattern = ctx.createPattern(c, "repeat");
  return clayGrainPattern;
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
  const hSpan = z1 - z0;
  const grain = hSpan > 5 ? getClayGrain(ctx) : null;

  // Left sunlit matte-clay wall with diagonal 3-point studio gradient (bright top-left -> bounced bottom-right)
  ctx.beginPath();
  ctx.moveTo(...top[3]); ctx.lineTo(...top[2]); ctx.lineTo(...bot[2]); ctx.lineTo(...bot[3]); ctx.closePath();
  if (lBot && hSpan > 8) {
    const gL = ctx.createLinearGradient(top[3][0], top[3][1], bot[2][0], bot[2][1]);
    gL.addColorStop(0, lCol);
    gL.addColorStop(0.62, lCol);
    gL.addColorStop(1, lBot);
    ctx.fillStyle = gL;
  } else {
    ctx.fillStyle = lCol;
  }
  ctx.fill();
  if (grain) { ctx.fillStyle = grain; ctx.fill(); }
  ctx.strokeStyle = sCol; ctx.lineWidth = 0.35; ctx.stroke();

  // Right shaded matte-clay wall with cool ambient studio falloff
  ctx.beginPath();
  ctx.moveTo(...top[1]); ctx.lineTo(...top[2]); ctx.lineTo(...bot[2]); ctx.lineTo(...bot[1]); ctx.closePath();
  if (rBot && hSpan > 8) {
    const gR = ctx.createLinearGradient(top[2][0], top[2][1], bot[1][0], bot[1][1]);
    gR.addColorStop(0, rCol);
    gR.addColorStop(0.55, rCol);
    gR.addColorStop(1, rBot);
    ctx.fillStyle = gR;
  } else {
    ctx.fillStyle = rCol;
  }
  ctx.fill();
  if (grain) { ctx.fillStyle = grain; ctx.fill(); }
  ctx.stroke();

  // Architectural concrete plinth molding & deep diffused contact ambient occlusion at base
  if (hSpan > 12 && z0 <= 4) {
    const plinthH = Math.min(2.6, hSpan * 0.08);
    const pL = iso(gx - hw, gy + hd, z0 + plinthH);
    const pM = iso(gx + hw, gy + hd, z0 + plinthH);
    const pR = iso(gx + hw, gy - hd, z0 + plinthH);
    ctx.beginPath(); ctx.moveTo(...pL); ctx.lineTo(...pM); ctx.lineTo(...bot[2]); ctx.lineTo(...bot[3]); ctx.closePath();
    ctx.fillStyle = "rgba(30, 38, 52, 0.16)"; ctx.fill();
    ctx.beginPath(); ctx.moveTo(...pM); ctx.lineTo(...pR); ctx.lineTo(...bot[1]); ctx.lineTo(...bot[2]); ctx.closePath();
    ctx.fillStyle = "rgba(20, 28, 42, 0.24)"; ctx.fill();

    const aoH = Math.min(8.5, hSpan * 0.22);
    const aoL = iso(gx - hw, gy + hd, z0 + aoH);
    const aoM = iso(gx + hw, gy + hd, z0 + aoH);
    const aoR = iso(gx + hw, gy - hd, z0 + aoH);
    const gAoL = ctx.createLinearGradient(aoM[0], aoM[1], bot[2][0], bot[2][1]);
    gAoL.addColorStop(0, "rgba(15, 23, 42, 0)");
    gAoL.addColorStop(1, "rgba(15, 23, 42, 0.22)");
    ctx.beginPath(); ctx.moveTo(...aoL); ctx.lineTo(...aoM); ctx.lineTo(...bot[2]); ctx.lineTo(...bot[3]); ctx.closePath();
    ctx.fillStyle = gAoL; ctx.fill();

    const gAoR = ctx.createLinearGradient(aoM[0], aoM[1], bot[2][0], bot[2][1]);
    gAoR.addColorStop(0, "rgba(15, 23, 42, 0)");
    gAoR.addColorStop(1, "rgba(15, 23, 42, 0.32)");
    ctx.beginPath(); ctx.moveTo(...aoM); ctx.lineTo(...aoR); ctx.lineTo(...bot[1]); ctx.lineTo(...bot[2]); ctx.closePath();
    ctx.fillStyle = gAoR; ctx.fill();
  }

  // Soft diffused under-eave shadow cast by roof lip onto upper walls
  if (hSpan > 10) {
    const eaveH = Math.min(4.8, hSpan * 0.15);
    const eL = iso(gx - hw, gy + hd, z1 - eaveH);
    const eM = iso(gx + hw, gy + hd, z1 - eaveH);
    const eR = iso(gx + hw, gy - hd, z1 - eaveH);
    const gEave = ctx.createLinearGradient(top[2][0], top[2][1], eM[0], eM[1]);
    gEave.addColorStop(0, "rgba(15, 23, 42, 0.2)");
    gEave.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.beginPath(); ctx.moveTo(...top[3]); ctx.lineTo(...top[2]); ctx.lineTo(...eM); ctx.lineTo(...eL); ctx.closePath();
    ctx.fillStyle = gEave; ctx.fill();
    ctx.beginPath(); ctx.moveTo(...top[2]); ctx.lineTo(...top[1]); ctx.lineTo(...eR); ctx.lineTo(...eM); ctx.closePath();
    ctx.fillStyle = gEave; ctx.fill();
  }

  // Smooth matte roof with soft studio light falloff + micro-grain
  ctx.beginPath();
  ctx.moveTo(...top[0]); ctx.lineTo(...top[1]); ctx.lineTo(...top[2]); ctx.lineTo(...top[3]); ctx.closePath();
  ctx.fillStyle = tCol; ctx.fill();
  if (hSpan > 8) {
    const gRoof = ctx.createLinearGradient(top[0][0], top[0][1], top[2][0], top[2][1]);
    gRoof.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    gRoof.addColorStop(0.55, "rgba(255, 255, 255, 0.04)");
    gRoof.addColorStop(1, "rgba(15, 23, 42, 0.12)");
    ctx.fillStyle = gRoof; ctx.fill();
  }
  if (grain) { ctx.fillStyle = grain; ctx.fill(); }
  ctx.strokeStyle = sCol; ctx.lineWidth = 0.55; ctx.stroke();

  // Crisp chamfered clay specular highlight along sunlit crest and front edge
  if (hSpan > 12) {
    ctx.beginPath();
    ctx.moveTo(...top[3]); ctx.lineTo(...top[2]); ctx.lineTo(...top[1]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.52)"; ctx.lineWidth = 0.9; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(...top[2]); ctx.lineTo(...bot[2]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.34)"; ctx.lineWidth = 0.75; ctx.stroke();
  }

  // Recessed parapet deck with 3D-embossed standing-seam grooves (shadow + highlight pair)
  if (withParapet && hw > 0.15 && hd > 0.15) {
    const pad = 0.048;
    const p0 = iso(gx - hw + pad, gy - hd + pad, z1);
    const p1 = iso(gx + hw - pad, gy - hd + pad, z1);
    const p2 = iso(gx + hw - pad, gy + hd - pad, z1);
    const p3 = iso(gx - hw + pad, gy + hd - pad, z1);
    ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.lineTo(...p2); ctx.lineTo(...p3); ctx.closePath();
    ctx.fillStyle = "rgba(15, 23, 42, 0.14)"; ctx.fill();
    for (let s = 1; s <= 4; s++) {
      const t = s / 5;
      const sA = iso(gx - hw + pad + t * (hw - pad) * 2, gy - hd + pad, z1);
      const sB = iso(gx - hw + pad + t * (hw - pad) * 2, gy + hd - pad, z1);
      ctx.beginPath(); ctx.moveTo(sA[0], sA[1]); ctx.lineTo(sB[0], sB[1]);
      ctx.strokeStyle = "rgba(15, 23, 42, 0.22)"; ctx.lineWidth = 0.7; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sA[0] + 0.8, sA[1] + 0.4); ctx.lineTo(sB[0] + 0.8, sB[1] + 0.4);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)"; ctx.lineWidth = 0.55; ctx.stroke();
    }
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
  const isWarmGlow = col.startsWith("#ff") || Boolean(litCol && litCol.startsWith("#ff"));
  const frameCol = "#43464f";
  const drawGlowingPane = (p0: [number, number], p1: [number, number], p2: [number, number], p3: [number, number], baseCol: string) => {
    if (isWarmGlow) {
      // Tiny soft under-sill shadow cast onto the matte-clay stucco wall
      ctx.beginPath();
      ctx.moveTo(p3[0], p3[1] + 1.1); ctx.lineTo(p2[0], p2[1] + 1.1);
      ctx.strokeStyle = "rgba(15, 23, 42, 0.22)"; ctx.lineWidth = 1.2; ctx.stroke();
      const gW = ctx.createLinearGradient(p0[0], p0[1], p3[0], p3[1]);
      gW.addColorStop(0, "#f59f56");
      gW.addColorStop(0.55, baseCol);
      gW.addColorStop(1, "#fff2d6");
      ctx.fillStyle = gW;
    } else {
      ctx.fillStyle = baseCol;
    }
    ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.lineTo(...p2); ctx.lineTo(...p3); ctx.closePath();
    ctx.fill();
    if (isWarmGlow) {
      ctx.strokeStyle = frameCol; ctx.lineWidth = 1.05; ctx.stroke();
    }
  };

  for (let r = 1; r <= rows; r++) {
    const z = z0 + r * dz;
    if (ribbon) {
      drawGlowingPane(
        iso(gx - hw * 0.88, gy + hd, z + 1.6),
        iso(gx + hw * 0.88, gy + hd, z + 1.6),
        iso(gx + hw * 0.88, gy + hd, z - 1.6),
        iso(gx - hw * 0.88, gy + hd, z - 1.6),
        col,
      );
      drawGlowingPane(
        iso(gx + hw, gy - hd * 0.88, z + 1.6),
        iso(gx + hw, gy + hd * 0.88, z + 1.6),
        iso(gx + hw, gy + hd * 0.88, z - 1.6),
        iso(gx + hw, gy - hd * 0.88, z - 1.6),
        col,
      );
      continue;
    }

    for (let c = 0; c < cols; c++) {
      const hash = ((r * 13 + c * 7 + Math.floor(seed * 100)) % 11) / 11;
      const fillC = litCol && hash > 0.58 ? litCol : col;
      const a = -hw + ((c + 0.2) / cols) * hw * 2;
      const b = -hw + ((c + 0.8) / cols) * hw * 2;
      drawGlowingPane(
        iso(gx + a, gy + hd, z + 1.85),
        iso(gx + b, gy + hd, z + 1.85),
        iso(gx + b, gy + hd, z - 1.85),
        iso(gx + a, gy + hd, z - 1.85),
        fillC,
      );
    }
    for (let c = 0; c < cols; c++) {
      const hash = ((r * 17 + c * 5 + Math.floor(seed * 100)) % 13) / 13;
      const fillC = litCol && hash > 0.62 ? litCol : col;
      const a = -hd + ((c + 0.2) / cols) * hd * 2;
      const b = -hd + ((c + 0.8) / cols) * hd * 2;
      drawGlowingPane(
        iso(gx + hw, gy + a, z + 1.85),
        iso(gx + hw, gy + b, z + 1.85),
        iso(gx + hw, gy + b, z - 1.85),
        iso(gx + hw, gy + a, z - 1.85),
        fillC,
      );
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

interface LogoBrandMeta {
  file: string;
  label: string;
  textCol: string;
  shadowCol: string;
  accentCol: string;
  roofLogoZFrac: number;
  crownZFrac: number;
  showRoofLogo: boolean;
}

const LOGO_BRAND_META: Record<string, LogoBrandMeta> = {
  logo_synapse: { file: "azure-synapse-analytics.svg", label: "Synapse", textCol: "#effcff", shadowCol: "#104d7a", accentCol: "#38bdf8", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_apim: { file: "azure-api-management.svg", label: "APIM", textCol: "#effcff", shadowCol: "#1c5c7a", accentCol: "#8c62d4", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_eventhubs: { file: "azure-event-hubs.svg", label: "Event Hubs", textCol: "#f4fff0", shadowCol: "#2f6315", accentCol: "#76bc2d", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_unity: { file: "unity-catalog.svg", label: "Unity Catalog", textCol: "#ffffff", shadowCol: "#6e1a4a", accentCol: "#ec388c", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_adls: { file: "adls-gen2.svg", label: "ADLS Gen2", textCol: "#effcff", shadowCol: "#165952", accentCol: "#37c2b1", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_blob: { file: "azure-blob-storage.svg", label: "Blob Storage", textCol: "#effcff", shadowCol: "#1a547a", accentCol: "#f48c20", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_devops: { file: "azure-devops.svg", label: "Azure DevOps", textCol: "#effcff", shadowCol: "#24678a", accentCol: "#268fd8", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_pytest: { file: "pytest.svg", label: "pytest", textCol: "#effcff", shadowCol: "#24678a", accentCol: "#26abd4", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_vault: { file: "azure-key-vault.svg", label: "Azure Key Vault", textCol: "#effcff", shadowCol: "#24678a", accentCol: "#f4bb38", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_mysql: { file: "mysql.svg", label: "MySQL", textCol: "#effcff", shadowCol: "#24678a", accentCol: "#26b5d2", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_sonar: { file: "sonarqube.svg", label: "SonarQube", textCol: "#effcff", shadowCol: "#24678a", accentCol: "#448dcc", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_functions: { file: "google-cloud-functions.svg", label: "Cloud Functions", textCol: "#effcff", shadowCol: "#24678a", accentCol: "#4285f4", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_adf: { file: "azure-data-factory-adf.svg", label: "ADF", textCol: "#effcff", shadowCol: "#24678a", accentCol: "rgba(22,166,211,.78)", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_copilot: { file: "github-copilot.svg", label: "Copilot", textCol: "#f8f3ff", shadowCol: "#563a7e", accentCol: "rgba(148,100,206,.78)", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_git: { file: "git.svg", label: "Git", textCol: "#fff3e7", shadowCol: "#804633", accentCol: "rgba(220,84,54,.78)", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_vscode: { file: "vs-code.svg", label: "VS Code", textCol: "#effaff", shadowCol: "#22577a", accentCol: "rgba(43,157,221,.78)", roofLogoZFrac: 1, crownZFrac: 1, showRoofLogo: false },
  logo_databricks: { file: "azure-databricks.svg", label: "DATABRICKS", textCol: "#ffffff", shadowCol: "rgba(140,20,10,0.9)", accentCol: "rgba(255, 54, 33, 0.7)", roofLogoZFrac: 0.99, crownZFrac: 1.02, showRoofLogo: false },
  logo_azure: { file: "azure-portal.svg", label: "AZURE", textCol: "#ffffff", shadowCol: "rgba(5,42,96,0.92)", accentCol: "rgba(0, 120, 212, 0.75)", roofLogoZFrac: 0.96, crownZFrac: 1.03, showRoofLogo: false },
  logo_python: { file: "python.svg", label: "PYTHON", textCol: "#ffffff", shadowCol: "rgba(18,46,84,0.92)", accentCol: "rgba(43, 125, 233, 0.75)", roofLogoZFrac: 1.0, crownZFrac: 1.03, showRoofLogo: false },
  logo_powerbi: { file: "power-bi.svg", label: "POWER BI", textCol: "#1f1705", shadowCol: "rgba(255,240,160,0.85)", accentCol: "rgba(242, 200, 17, 0.85)", roofLogoZFrac: 1.04, crownZFrac: 1.06, showRoofLogo: false },
  logo_delta: { file: "delta-lake.svg", label: "DELTA", textCol: "#ffffff", shadowCol: "rgba(6,58,82,0.92)", accentCol: "rgba(0, 173, 212, 0.8)", roofLogoZFrac: 0.92, crownZFrac: 1.02, showRoofLogo: false },
  logo_docker: { file: "docker.svg", label: "DOCKER", textCol: "#ffffff", shadowCol: "rgba(10,56,108,0.92)", accentCol: "rgba(36, 150, 237, 0.75)", roofLogoZFrac: 0.98, crownZFrac: 1.05, showRoofLogo: false },
  logo_airflow: { file: "apache-airflow.svg", label: "AIRFLOW", textCol: "#0f172a", shadowCol: "rgba(255,255,255,0.9)", accentCol: "rgba(0, 199, 212, 0.8)", roofLogoZFrac: 1.01, crownZFrac: 1.06, showRoofLogo: false },
  logo_spark: { file: "apache-spark.svg", label: "SPARK", textCol: "#ffffff", shadowCol: "rgba(120,38,8,0.92)", accentCol: "rgba(226, 90, 28, 0.8)", roofLogoZFrac: 0.8, crownZFrac: 0.92, showRoofLogo: false },
  logo_gcp: { file: "google-cloud-platform-gcp.svg", label: "GCP", textCol: "#1e293b", shadowCol: "rgba(255,255,255,0.92)", accentCol: "rgba(66, 133, 244, 0.75)", roofLogoZFrac: 0.86, crownZFrac: 1.02, showRoofLogo: true },
  logo_redis: { file: "redis-cache.svg", label: "REDIS", textCol: "#ffffff", shadowCol: "rgba(110,16,12,0.92)", accentCol: "rgba(220, 56, 45, 0.8)", roofLogoZFrac: 0.99, crownZFrac: 1.04, showRoofLogo: false },
  logo_kafka: { file: "apache-kafka.svg", label: "KAFKA", textCol: "#ffffff", shadowCol: "rgba(10,14,24,0.95)", accentCol: "rgba(103, 243, 255, 0.75)", roofLogoZFrac: 1.0, crownZFrac: 1.05, showRoofLogo: false },
  logo_gemini: { file: "google-gemini.svg", label: "GEMINI", textCol: "#ffffff", shadowCol: "rgba(48,22,110,0.92)", accentCol: "rgba(129, 140, 248, 0.85)", roofLogoZFrac: 1.02, crownZFrac: 1.08, showRoofLogo: false },
  logo_claude: { file: "claude.svg", label: "CLAUDE", textCol: "#ffffff", shadowCol: "rgba(110,38,18,0.92)", accentCol: "rgba(217, 119, 87, 0.8)", roofLogoZFrac: 1.0, crownZFrac: 1.05, showRoofLogo: false },
  logo_chatgpt: { file: "chatgpt.svg", label: "ChatGPT", textCol: "#064e3b", shadowCol: "rgba(255,255,255,0.92)", accentCol: "rgba(16, 163, 127, 0.8)", roofLogoZFrac: 1.0, crownZFrac: 1.05, showRoofLogo: true },
  logo_fastapi: { file: "fastapi.svg", label: "FastAPI", textCol: "#ffffff", shadowCol: "rgba(4,72,62,0.92)", accentCol: "rgba(0, 150, 136, 0.8)", roofLogoZFrac: 1.01, crownZFrac: 1.06, showRoofLogo: false },
  logo_postgres: { file: "postgresql.svg", label: "POSTGRES", textCol: "#ffffff", shadowCol: "rgba(16,44,74,0.92)", accentCol: "rgba(51, 103, 145, 0.8)", roofLogoZFrac: 1.0, crownZFrac: 1.05, showRoofLogo: true },
};

const LOGO_IMG_CACHE: Record<string, HTMLImageElement> = {};
let logoLoadVersion = 0;
let logoPreloadStarted = false;
function ensureLogoImagesLoaded() {
  if (logoPreloadStarted || typeof Image === "undefined") return;
  logoPreloadStarted = true;
  Object.values(LOGO_BRAND_META).forEach(({ file }) => {
    if (LOGO_IMG_CACHE[file]) return;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      logoLoadVersion++;
    };
    img.src = assetUrl(`assets/skills/${file}`);
    LOGO_IMG_CACHE[file] = img;
  });
}

// General-purpose 3D isometric polygon extruder: turns ANY 2D brand logo silhouette into a studio-lit 3D building
function extrudeIsoPoly(
  ctx: CanvasRenderingContext2D,
  iso: IsoFn,
  cx: number,
  cy: number,
  pts: Array<[number, number]>,
  z0: number,
  z1: number,
  litCol: string,
  midCol: string,
  shadeCol: string,
  topCol: string,
  strokeCol: string,
  floorBands = 0,
) {
  const n = pts.length;
  const bot = pts.map(([x, y]) => iso(cx + x, cy + y, z0));
  const top = pts.map(([x, y]) => iso(cx + x, cy + y, z1));
  const grain = z1 - z0 > 6 ? getClayGrain(ctx) : null;

  const faces: Array<{ i: number; j: number; depth: number; sunDot: number }> = [];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const mx = (pts[i][0] + pts[j][0]) * 0.5;
    const my = (pts[i][1] + pts[j][1]) * 0.5;
    const dx = pts[j][0] - pts[i][0];
    const dy = pts[j][1] - pts[i][1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = dy / len;
    const ny = -dx / len;
    const sunDot = nx * -0.55 + ny * 0.83;
    faces.push({ i, j, depth: mx + my, sunDot });
  }
  faces.sort((a, b) => a.depth - b.depth);

  for (const f of faces) {
    ctx.beginPath();
    ctx.moveTo(...top[f.i]);
    ctx.lineTo(...top[f.j]);
    ctx.lineTo(...bot[f.j]);
    ctx.lineTo(...bot[f.i]);
    ctx.closePath();
    ctx.fillStyle = f.sunDot > 0.2 ? litCol : f.sunDot > -0.35 ? midCol : shadeCol;
    ctx.fill();
    if (grain) { ctx.fillStyle = grain; ctx.fill(); }
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 0.45;
    ctx.stroke();

    if (floorBands > 0 && z1 - z0 > 18) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";
      ctx.lineWidth = 0.7;
      for (let b = 1; b <= floorBands; b++) {
        const zf = z0 + (b / (floorBands + 1)) * (z1 - z0);
        const pA = iso(cx + pts[f.i][0], cy + pts[f.i][1], zf);
        const pB = iso(cx + pts[f.j][0], cy + pts[f.j][1], zf);
        ctx.beginPath(); ctx.moveTo(...pA); ctx.lineTo(...pB); ctx.stroke();
      }
    }
  }

  ctx.beginPath();
  top.forEach(([tx, ty], i) => (i === 0 ? ctx.moveTo(tx, ty) : ctx.lineTo(tx, ty)));
  ctx.closePath();
  ctx.fillStyle = topCol;
  ctx.fill();
  if (grain) { ctx.fillStyle = grain; ctx.fill(); }
  ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
  ctx.lineWidth = 0.95;
  ctx.stroke();
}

// Borderless integrated rooftop/crown architectural lettering (Netflix/Stripe/Uber/OpenAI style — NO sign board!)
function drawIntegratedCrownText(
  ctx: CanvasRenderingContext2D,
  iso: IsoFn,
  tile: number,
  gx: number,
  gy: number,
  z: number,
  meta: LogoBrandMeta,
  isColor: boolean,
  isDark: boolean,
) {
  const [px, py] = iso(gx, gy, z);
  ctx.save();
  ctx.transform(1, 0.48, 0, 1, px, py);
  ctx.font = `900 ${Math.max(8.2, tile * 0.175).toFixed(1)}px Inter, system-ui, -apple-system, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (isColor) {
    ctx.fillStyle = meta.shadowCol;
    ctx.fillText(meta.label, 0.9, 1.3);
    ctx.fillText(meta.label, -0.5, 0.9);
    ctx.fillStyle = meta.textCol;
    ctx.fillText(meta.label, 0, 0);
  } else {
    ctx.fillStyle = isDark ? "rgba(203, 213, 225, 0.55)" : "rgba(71, 85, 105, 0.52)";
    ctx.fillText(meta.label, 0, 0);
  }
  ctx.restore();
}

// Flush isometric rooftop SVG emblem inlaid directly onto the building's roof surface (no floating badge)
function drawFlushRoofLogo(
  ctx: CanvasRenderingContext2D,
  iso: IsoFn,
  tile: number,
  gx: number,
  gy: number,
  z: number,
  meta: LogoBrandMeta,
  isColor: boolean,
) {
  const img = LOGO_IMG_CACHE[meta.file];
  if (!img || !img.complete || img.naturalWidth === 0) return;
  const [rx, ry] = iso(gx, gy, z);
  const sz = Math.max(22, tile * 0.5);
  ctx.save();
  ctx.transform(0.88, 0.44, -0.88, 0.44, rx, ry);
  if (!isColor) ctx.filter = "grayscale(1) opacity(0.38)";
  ctx.drawImage(img, -sz * 0.5, -sz * 0.5, sz, sz);
  ctx.restore();
}

function drawStaticStructure(ctx: CanvasRenderingContext2D, iso: IsoFn, tile: number, s: Struct, isColor: boolean, isDark: boolean, landmarks?: LandmarkAtlas, heading?: { left: number; right: number; bottom: number }) {
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
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, 2.2, isColor ? "#2d6352" : lC, isColor ? "#234f41" : rC, isColor ? (isDark ? "#214f43" : "#3c7a67") : tC, sC);
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
    box(ctx, iso, s.gx, s.gy, hw + 0.14, hd + 0.14, 0, 2, isColor ? "#2d6352" : lC, isColor ? "#234f41" : rC, isColor ? (isDark ? "#214f43" : "#3c7a67") : tC, sC);
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

  // Clean architectural concrete plinth with subtle brand accent line
  const drawLandmarkPlaza = (accentCol: string) => {
    const pTop = isColor ? (isDark ? "#24304a" : "#efede7") : tC;
    const pL = isColor ? (isDark ? "#182136" : "#d8d5cd") : lC;
    const pR = isColor ? (isDark ? "#111728" : "#bcb9b0") : rC;
    box(ctx, iso, s.gx, s.gy, hw * 1.08, hd * 1.08, 0, 2.8, pL, pR, pTop, sC);
    if (isColor) {
      ctx.beginPath();
      ctx.moveTo(...iso(s.gx - hw * 1.02, s.gy - hd * 1.02, 3.0));
      ctx.lineTo(...iso(s.gx + hw * 1.02, s.gy - hd * 1.02, 3.0));
      ctx.lineTo(...iso(s.gx + hw * 1.02, s.gy + hd * 1.02, 3.0));
      ctx.lineTo(...iso(s.gx - hw * 1.02, s.gy + hd * 1.02, 3.0));
      ctx.closePath();
      ctx.strokeStyle = accentCol; ctx.lineWidth = 1.25; ctx.stroke();
    }
  };

  if (s.kind.startsWith("logo_")) {
    const meta = LOGO_BRAND_META[s.kind];
    drawLandmarkPlaza(meta.accentCol);
    const model = landmarks?.sprite(s.kind, tile, isColor, isDark);
    if (model) {
      const [x,y] = iso(s.gx,s.gy,2.8);
      const nearHeading = heading && x+tile*.70>heading.left && x-tile*.70<heading.right && y-s.h<heading.bottom+20;
      ctx.save();
      ctx.translate(x,y);
      if (nearHeading) ctx.scale(.94,.80);
      model(ctx,0,0);
      ctx.restore();
      return;
    }
    // Infill lots also have a low-cost, tiered office fallback
    // while their 3D meshes load or when WebGL is unavailable.
    if (["logo_synapse", "logo_apim", "logo_eventhubs", "logo_unity", "logo_adls", "logo_blob", "logo_devops", "logo_pytest", "logo_vault", "logo_mysql", "logo_sonar", "logo_functions", "logo_adf", "logo_copilot", "logo_git", "logo_vscode"].includes(s.kind)) {
      const panes = isColor ? (isDark ? "#82a8b8" : "#a6c5cc") : lC;
      for (let floor = 0; floor < 4; floor++) {
        const z = 2.8 + floor * s.h * .15;
        const inset = .90 - floor * .035;
        box(ctx, iso, s.gx, s.gy, hw * inset, hd * inset, z, z + s.h * .126, panes, rC, tC, sC);
        box(ctx, iso, s.gx, s.gy, hw * (inset+.06), hd * (inset+.06), z+s.h*.126, z+s.h*.15, lC, rC, tC, sC);
      }
      drawFlushRoofLogo(ctx, iso, tile * Math.min(s.w, s.d), s.gx, s.gy, 3 + s.h*.60, meta, isColor);
      return;
    }
    const drawLogoArchitecture = () => {
      if (s.kind === "logo_databricks") {
        // True 3-tier stacked hollow Databricks isometric diamond rings
        const dLit = isColor ? "#ff4d36" : lC;
        const dMid = isColor ? "#e02e19" : rC;
        const dShd = isColor ? "#a61b0b" : rB;
        const dTop = isColor ? "#ff7b69" : tC;
        const tierH = s.h * 0.23;
        const gapH = s.h * 0.12;
        [0, 1, 2].forEach((tier) => {
          const z0 = 2.8 + tier * (tierH + gapH);
          const sc = 1 - tier * 0.02;
          if (tier < 2) {
            box(ctx, iso, s.gx, s.gy, hw * sc * 0.56, hd * sc * 0.56, z0 + tierH - 1, z0 + tierH + gapH + 1, isColor ? "#161b26" : rC, isColor ? "#0d111a" : rB, "#1e2536", sC);
          }
          const dia: Array<[number, number]> = [
            [0, -hd * sc * 1.12],
            [hw * sc * 1.12, 0],
            [0, hd * sc * 1.12],
            [-hw * sc * 1.12, 0],
          ];
          extrudeIsoPoly(ctx, iso, s.gx, s.gy, dia, z0, z0 + tierH, dLit, dMid, dShd, dTop, "rgba(255,255,255,0.65)", 1);
        });
        const topZ = 2.8 + 2 * (tierH + gapH) + tierH;
        const inPts = [
          iso(s.gx, s.gy - hd * 0.58, topZ),
          iso(s.gx + hw * 0.58, s.gy, topZ),
          iso(s.gx, s.gy + hd * 0.58, topZ),
          iso(s.gx - hw * 0.58, s.gy, topZ),
        ];
        ctx.beginPath(); inPts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))); ctx.closePath();
        ctx.fillStyle = isColor ? "#141821" : rB; ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.82)"; ctx.lineWidth = 1.1; ctx.stroke();
        return;
      }

      if (s.kind === "logo_azure") {
        // True Microsoft Azure slanted A twin-ribbon architectural tower
        const z0 = 2.8;
        const zP = s.h;
        const skyL = isColor ? "#38bdf8" : lC;
        const skyR = isColor ? "#0284c7" : rC;
        const bluL = isColor ? "#0078d4" : lC;
        const bluR = isColor ? "#004e96" : rC;
        const l0 = iso(s.gx - hw * 0.96, s.gy + hd * 0.45, z0);
        const l1 = iso(s.gx - hw * 0.34, s.gy + hd * 0.45, z0);
        const l2 = iso(s.gx + hw * 0.08, s.gy + hd * 0.45, zP * 0.96);
        const l3 = iso(s.gx - hw * 0.22, s.gy + hd * 0.45, zP * 0.96);
        const l2b = iso(s.gx + hw * 0.08, s.gy - hd * 0.42, zP * 0.96);
        const l1b = iso(s.gx - hw * 0.34, s.gy - hd * 0.42, z0);
        ctx.beginPath(); ctx.moveTo(...l0); ctx.lineTo(...l1); ctx.lineTo(...l2); ctx.lineTo(...l3); ctx.closePath();
        ctx.fillStyle = skyL; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(...l1); ctx.lineTo(...l1b); ctx.lineTo(...l2b); ctx.lineTo(...l2); ctx.closePath();
        ctx.fillStyle = skyR; ctx.fill(); ctx.stroke();
        const r0 = iso(s.gx + hw * 0.12, s.gy + hd * 0.48, z0);
        const r1 = iso(s.gx + hw * 0.96, s.gy + hd * 0.48, z0);
        const r1b = iso(s.gx + hw * 0.96, s.gy - hd * 0.42, z0);
        const r2 = iso(s.gx + hw * 0.28, s.gy + hd * 0.48, zP);
        const r3 = iso(s.gx - hw * 0.08, s.gy + hd * 0.48, zP);
        const r2b = iso(s.gx + hw * 0.28, s.gy - hd * 0.42, zP);
        ctx.beginPath(); ctx.moveTo(...r0); ctx.lineTo(...r1); ctx.lineTo(...r2); ctx.lineTo(...r3); ctx.closePath();
        ctx.fillStyle = bluL; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.85)"; ctx.lineWidth = 1.1; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(...r1); ctx.lineTo(...r1b); ctx.lineTo(...r2b); ctx.lineTo(...r2); ctx.closePath();
        ctx.fillStyle = bluR; ctx.fill(); ctx.stroke();
        box(ctx, iso, s.gx + hw * 0.14, s.gy + hd * 0.06, hw * 0.58, hd * 0.34, z0 + 12, z0 + 25, skyL, bluR, "#7dd3fc", "rgba(255,255,255,0.8)");
        return;
      }

      if (s.kind === "logo_python") {
        // True interlocked dual-snake Python logo extruded cleanly into 3D twin curved wings
        const z0 = 2.8;
        const bluePoly: Array<[number, number]> = [
          [-hw * 0.36, -hd * 0.92], [hw * 0.48, -hd * 0.92], [hw * 0.54, -hd * 0.08],
          [-hw * 0.24, -hd * 0.08], [-hw * 0.24, hd * 0.34], [-hw * 0.92, hd * 0.34],
          [-hw * 0.92, -hd * 0.42], [-hw * 0.36, -hd * 0.42],
        ];
        extrudeIsoPoly(ctx, iso, s.gx, s.gy, bluePoly, z0, s.h, isColor ? "#3b82f6" : lC, isColor ? "#2563eb" : rC, isColor ? "#1d4ed8" : rB, isColor ? "#60a5fa" : tC, "rgba(255,255,255,0.68)", 4);
        const goldPoly: Array<[number, number]> = [
          [hw * 0.36, hd * 0.92], [-hw * 0.48, hd * 0.92], [-hw * 0.54, hd * 0.08],
          [hw * 0.24, hd * 0.08], [hw * 0.24, -hd * 0.34], [hw * 0.92, -hd * 0.34],
          [hw * 0.92, hd * 0.42], [hw * 0.36, hd * 0.42],
        ];
        extrudeIsoPoly(ctx, iso, s.gx, s.gy, goldPoly, z0, s.h * 0.86, isColor ? "#ffd43b" : lC, isColor ? "#eab308" : rC, isColor ? "#ca8a04" : rB, isColor ? "#fef08a" : tC, "rgba(255,255,255,0.72)", 3);
        [iso(s.gx - hw * 0.1, s.gy - hd * 0.62, s.h + 1), iso(s.gx + hw * 0.1, s.gy + hd * 0.62, s.h * 0.86 + 1)].forEach(([ex, ey]) => {
          ctx.beginPath(); ctx.ellipse(ex, ey, 4.6, 2.6, 0, 0, Math.PI * 2); ctx.fillStyle = "#ffffff"; ctx.fill();
          ctx.strokeStyle = "#1e293b"; ctx.lineWidth = 1.2; ctx.stroke();
        });
        return;
      }

      if (s.kind === "logo_claude") {
        // True 3D extruded 12-ray Anthropic Claude warm terracotta starburst building
        const pts: Array<[number, number]> = [];
        for (let i = 0; i < 24; i++) {
          const a = (i * Math.PI) / 12 + 0.12;
          const r = i % 2 === 0 ? (i % 4 === 0 ? 1.08 : 0.88) : 0.32;
          pts.push([Math.cos(a) * hw * r, Math.sin(a) * hd * r]);
        }
        extrudeIsoPoly(ctx, iso, s.gx, s.gy, pts, 2.8, s.h, isColor ? "#e87d58" : lC, isColor ? "#d46540" : rC, isColor ? "#a64222" : rB, isColor ? "#ffab8c" : tC, "rgba(255,255,255,0.62)", 3);
        const core = iso(s.gx, s.gy, s.h + 0.8);
        ctx.beginPath(); ctx.ellipse(core[0], core[1], 6, 3.4, 0, 0, Math.PI * 2);
        ctx.fillStyle = isColor ? "#fff7ed" : tC; ctx.fill();
        return;
      }

      if (s.kind === "logo_chatgpt") {
        // True OpenAI / ChatGPT 6-petal interlocking white & emerald blossom tower
        const pts: Array<[number, number]> = [];
        for (let i = 0; i < 36; i++) {
          const a = (i * Math.PI * 2) / 36;
          const lobe = 0.78 + 0.28 * Math.pow(Math.abs(Math.cos(a * 3)), 0.7);
          pts.push([Math.cos(a) * hw * lobe, Math.sin(a) * hd * lobe]);
        }
        extrudeIsoPoly(ctx, iso, s.gx, s.gy, pts, 2.8, s.h, isColor ? "#ffffff" : lC, isColor ? "#dff7ef" : rC, isColor ? "#10a37f" : rB, isColor ? "#f8fffc" : tC, "rgba(16, 163, 127, 0.55)", 4);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3 + Math.PI / 6;
          const pt = iso(s.gx + Math.cos(a) * hw * 0.36, s.gy + Math.sin(a) * hd * 0.36, s.h + 0.8);
          if (i === 0) ctx.moveTo(pt[0], pt[1]); else ctx.lineTo(pt[0], pt[1]);
        }
        ctx.closePath();
        ctx.fillStyle = isColor ? "#0d9473" : rB; ctx.fill();
        ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.4; ctx.stroke();
        return;
      }

      if (s.kind === "logo_gemini") {
        // True concave 4-point hyperbola Google Gemini sparkle star building
        const pts: Array<[number, number]> = [];
        for (let i = 0; i < 32; i++) {
          const a = (i * Math.PI * 2) / 32;
          const c = Math.cos(a);
          const sn = Math.sin(a);
          const r = 1.12 / Math.pow(Math.pow(Math.abs(c), 0.72) + Math.pow(Math.abs(sn), 0.72), 1 / 0.72);
          pts.push([c * hw * Math.min(1.16, r), sn * hd * Math.min(1.16, r)]);
        }
        extrudeIsoPoly(ctx, iso, s.gx, s.gy, pts, 2.8, s.h, isColor ? "#6366f1" : lC, isColor ? "#4f46e5" : rC, isColor ? "#312e81" : rB, isColor ? "#a5b4fc" : tC, "rgba(255,255,255,0.75)", 4);
        const apex = iso(s.gx, s.gy, s.h + 12);
        for (let i = 0; i < 4; i++) {
          const a = (i * Math.PI) / 2;
          const tip = iso(s.gx + Math.cos(a) * hw * 1.12, s.gy + Math.sin(a) * hd * 1.12, s.h);
          ctx.beginPath(); ctx.moveTo(...tip); ctx.lineTo(...apex);
          ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 1.2; ctx.stroke();
        }
        return;
      }

      if (s.kind === "logo_powerbi") {
        // True Power BI 3 ascending chamfered golden bar skyscrapers
        const bars = [
          { dx: -hw * 0.62, bh: s.h * 0.48, top: "#fde047", lit: "#eab308", mid: "#ca8a04", shd: "#854d0e" },
          { dx: 0, bh: s.h * 0.76, top: "#fef08a", lit: "#facc15", mid: "#d99b00", shd: "#925f07" },
          { dx: hw * 0.62, bh: s.h * 1.05, top: "#fff7ad", lit: "#ffcf1a", mid: "#e09f00", shd: "#9e6c00" },
        ];
        bars.forEach((b) => {
          box(ctx, iso, s.gx + b.dx, s.gy, hw * 0.28, hd * 0.72, 2.8, b.bh, isColor ? b.lit : lC, isColor ? b.mid : rC, isColor ? b.top : tC, "rgba(255,255,255,0.82)", true, isColor ? b.shd : lB, isColor ? b.shd : rB);
          windows(ctx, iso, s.gx + b.dx, s.gy, hw * 0.28, hd * 0.72, 7, b.bh - 6, Math.max(3, Math.floor(b.bh / 12)), 2, isColor ? "#292008" : wC, true);
        });
        return;
      }

      if (s.kind === "logo_docker") {
        // True curved Docker whale hull extruded in 3D + 8 shipping-container office modules
        const deckZ = 2.8 + s.h * 0.46;
        const hull: Array<[number, number]> = [
          [-hw * 0.96, 0], [-hw * 0.78, -hd * 0.66], [hw * 0.56, -hd * 0.64],
          [hw * 0.98, -hd * 0.14], [hw * 0.74, hd * 0.14], [hw * 0.48, hd * 0.68],
          [-hw * 0.64, hd * 0.72],
        ];
        extrudeIsoPoly(ctx, iso, s.gx, s.gy, hull, 2.8, deckZ, isColor ? "#2496ed" : lC, isColor ? "#197bc7" : rC, isColor ? "#0e5694" : rB, isColor ? "#7cc4ff" : tC, "rgba(255,255,255,0.75)", 2);
        box(ctx, iso, s.gx + hw * 0.9, s.gy - hd * 0.1, hw * 0.22, hd * 0.3, deckZ - 2, deckZ + 16, isColor ? "#2496ed" : lC, isColor ? "#197bc7" : rC, isColor ? "#7cc4ff" : tC, "rgba(255,255,255,0.8)");
        const cPal = isColor ? [["#38bdf8", "#0284c7", "#bae6fd"], ["#f26c4f", "#c7482c", "#ffc4b5"], ["#34a867", "#1e7845", "#a8ebbf"], ["#f5c431", "#c4940e", "#ffeb99"]] : [[lC, rC, tC]];
        const cH = s.h * 0.2;
        [-0.5, -0.18, 0.14, 0.46].forEach((dx, ci) => {
          const c = cPal[ci % cPal.length];
          box(ctx, iso, s.gx + hw * dx, s.gy, hw * 0.14, hd * 0.3, deckZ, deckZ + cH, c[0], c[1], c[2], "rgba(255,255,255,0.75)");
        });
        [-0.34, -0.02, 0.3].forEach((dx, ci) => {
          const c = cPal[(ci + 2) % cPal.length];
          box(ctx, iso, s.gx + hw * dx, s.gy, hw * 0.14, hd * 0.3, deckZ + cH, deckZ + cH * 2, c[0], c[1], c[2], "rgba(255,255,255,0.75)");
        });
        box(ctx, iso, s.gx - hw * 0.02, s.gy, hw * 0.14, hd * 0.3, deckZ + cH * 2, deckZ + cH * 3, cPal[0][0], cPal[0][1], cPal[0][2], "rgba(255,255,255,0.8)");
        return;
      }

      if (s.kind === "logo_delta") {
        // True Delta Lake hollow equilateral cyan-acrylic triangle monument
        const z0 = 2.8;
        const baseL = iso(s.gx - hw * 0.92, s.gy + hd * 0.72, z0);
        const baseF = iso(s.gx + hw * 0.92, s.gy + hd * 0.72, z0);
        const baseR = iso(s.gx + hw * 0.92, s.gy - hd * 0.72, z0);
        const apex = iso(s.gx, s.gy, s.h);
        const gL = ctx.createLinearGradient(apex[0], apex[1], baseF[0], baseF[1]);
        gL.addColorStop(0, isColor ? "#a5f3fc" : tC); gL.addColorStop(0.45, isColor ? "#22d3ee" : lC); gL.addColorStop(1, isColor ? "#0284c7" : rC);
        ctx.beginPath(); ctx.moveTo(...baseL); ctx.lineTo(...baseF); ctx.lineTo(...apex); ctx.closePath();
        ctx.fillStyle = gL; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 1.25; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(...baseF); ctx.lineTo(...baseR); ctx.lineTo(...apex); ctx.closePath();
        ctx.fillStyle = isColor ? "#0369a1" : rB; ctx.fill(); ctx.stroke();
        const inL = iso(s.gx - hw * 0.44, s.gy + hd * 0.72, z0 + 8);
        const inF = iso(s.gx + hw * 0.44, s.gy + hd * 0.72, z0 + 8);
        const inApex = iso(s.gx, s.gy + hd * 0.36, s.h * 0.58);
        ctx.beginPath(); ctx.moveTo(...inL); ctx.lineTo(...inF); ctx.lineTo(...inApex); ctx.closePath();
        ctx.fillStyle = isColor ? "#0c2238" : rB; ctx.fill();
        ctx.strokeStyle = isColor ? "#67f3ff" : sC; ctx.lineWidth = 1.5; ctx.stroke();
        return;
      }

      if (s.kind === "logo_spark") {
        // True 3D extruded 5-point Apache Spark orange star building
        const pts: Array<[number, number]> = [];
        for (let i = 0; i < 10; i++) {
          const r = i % 2 === 0 ? 1.12 : 0.44;
          const a = (i * Math.PI) / 5 - Math.PI / 2;
          pts.push([Math.cos(a) * hw * r, Math.sin(a) * hd * r]);
        }
        extrudeIsoPoly(ctx, iso, s.gx, s.gy, pts, 2.8, s.h * 0.78, isColor ? "#f97316" : lC, isColor ? "#ea580c" : rC, isColor ? "#9a3412" : rB, isColor ? "#fdba74" : tC, "rgba(255,255,255,0.75)", 2);
        return;
      }

      if (s.kind === "logo_airflow") {
        // True 4-blade extruded Apache Airflow pinwheel building
        const bladeCols = isColor
          ? [["#00d4e0", "#0099a3", "#006d75", "#67f3ff"], ["#38bdf8", "#0284c7", "#075985", "#bae6fd"], ["#34d399", "#059669", "#065f46", "#a7f3d0"], ["#fb7185", "#e11d48", "#9f1239", "#fecdd3"]]
          : [[lC, rC, rB, tC]];
        const wings: Array<Array<[number, number]>> = [
          [[0, 0], [hw * 1.08, hd * 0.08], [hw * 0.48, hd * 0.86]],
          [[0, 0], [-hw * 0.08, hd * 1.08], [-hw * 0.86, hd * 0.48]],
          [[0, 0], [-hw * 1.08, -hd * 0.08], [-hw * 0.48, -hd * 0.86]],
          [[0, 0], [hw * 0.08, -hd * 1.08], [hw * 0.86, -hd * 0.48]],
        ];
        wings.forEach((wpts, i) => {
          const c = bladeCols[i % bladeCols.length];
          extrudeIsoPoly(ctx, iso, s.gx, s.gy, wpts, 2.8, s.h, c[0], c[1], c[2], c[3], "rgba(255,255,255,0.8)", 2);
        });
        return;
      }

      if (s.kind === "logo_gcp") {
        // True extruded 3-lobe puffy Google Cloud silhouette building
        const cloud: Array<[number, number]> = [
          [-hw * 0.94, hd * 0.48], [-hw * 0.94, -hd * 0.14], [-hw * 0.56, -hd * 0.58],
          [-hw * 0.05, -hd * 0.9], [hw * 0.56, -hd * 0.56], [hw * 0.94, -hd * 0.08],
          [hw * 0.94, hd * 0.48],
        ];
        extrudeIsoPoly(ctx, iso, s.gx, s.gy, cloud, 2.8, s.h * 0.84, isColor ? "#ffffff" : lC, isColor ? "#e2e8f0" : rC, isColor ? "#cbd5e1" : rB, isColor ? "#ffffff" : tC, "rgba(66,133,244,0.45)", 2);
        return;
      }

      if (s.kind === "logo_redis") {
        // True 3-tier stacked crimson Redis slabs with recessed geometric white skylights
        const tierH = s.h * 0.25;
        const gap = s.h * 0.09;
        [0, 1, 2].forEach((i) => {
          const z0 = 2.8 + i * (tierH + gap);
          if (i < 2) box(ctx, iso, s.gx, s.gy, hw * 0.76, hd * 0.68, z0 + tierH - 1, z0 + tierH + gap + 1, "#1e293b", "#0f172a", "#334155", sC);
          box(ctx, iso, s.gx, s.gy, hw * 0.96, hd * 0.86, z0, z0 + tierH, isColor ? "#e03e38" : lC, isColor ? "#b82520" : rC, isColor ? "#ff7670" : tC, "rgba(255,255,255,0.8)", false, isColor ? "#8f1814" : lB, isColor ? "#6b100d" : rB);
        });
        const topZ = 2.8 + 2 * (tierH + gap) + tierH + 1;
        ctx.fillStyle = "#ffffff";
        const pC = iso(s.gx - hw * 0.34, s.gy - hd * 0.2, topZ);
        const pS = iso(s.gx + hw * 0.32, s.gy + hd * 0.2, topZ);
        const pT = iso(s.gx - hw * 0.3, s.gy + hd * 0.26, topZ);
        ctx.beginPath(); ctx.ellipse(pC[0], pC[1], 3.8, 2.3, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillRect(pS[0] - 3.2, pS[1] - 2.6, 6.4, 5.2);
        ctx.beginPath(); ctx.moveTo(pT[0], pT[1] - 3.8); ctx.lineTo(pT[0] + 4.2, pT[1] + 2.8); ctx.lineTo(pT[0] - 4.2, pT[1] + 2.8); ctx.closePath(); ctx.fill();
        return;
      }

      if (s.kind === "logo_kafka") {
        // True Apache Kafka matte-black connected-node cylindrical graph building
        const drawNode = (ox: number, oy: number, rad: number, zh: number) => {
          const b = iso(s.gx + ox, s.gy + oy, 2.8);
          const t = iso(s.gx + ox, s.gy + oy, zh);
          const rx = tile * rad;
          const ry = tile * rad * 0.52;
          const cg = ctx.createLinearGradient(t[0] - rx, t[1], t[0] + rx, t[1]);
          cg.addColorStop(0, isColor ? "#334155" : lC); cg.addColorStop(1, isColor ? "#0b0f19" : rC);
          ctx.beginPath(); ctx.moveTo(t[0] - rx, t[1]); ctx.lineTo(b[0] - rx, b[1]);
          ctx.ellipse(b[0], b[1], rx, ry, 0, Math.PI, 0, true); ctx.lineTo(t[0] + rx, t[1]); ctx.closePath();
          ctx.fillStyle = cg; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 0.8; ctx.stroke();
          ctx.beginPath(); ctx.ellipse(t[0], t[1], rx, ry, 0, 0, Math.PI * 2);
          ctx.fillStyle = isColor ? "#f1f5f9" : tC; ctx.fill(); ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 1.4; ctx.stroke();
          ctx.beginPath(); ctx.ellipse(t[0], t[1], rx * 0.45, ry * 0.45, 0, 0, Math.PI * 2);
          ctx.fillStyle = isColor ? "#141821" : rB; ctx.fill();
        };
        const sat = [
          { ox: -hw * 0.46, oy: -hd * 0.46, h: s.h * 0.74 },
          { ox: hw * 0.54, oy: -hd * 0.44, h: s.h * 0.86 },
          { ox: hw * 0.54, oy: hd * 0.48, h: s.h * 0.66 },
        ];
        drawNode(sat[0].ox, sat[0].oy, 0.2, sat[0].h);
        drawNode(sat[1].ox, sat[1].oy, 0.2, sat[1].h);
        const cMid = iso(s.gx - hw * 0.14, s.gy + hd * 0.04, s.h * 0.6);
        sat.forEach((n) => {
          const np = iso(s.gx + n.ox, s.gy + n.oy, n.h * 0.8);
          ctx.beginPath(); ctx.moveTo(...cMid); ctx.lineTo(...np);
          ctx.strokeStyle = isColor ? "#94a3b8" : sC; ctx.lineWidth = 3.2; ctx.stroke();
        });
        drawNode(-hw * 0.14, hd * 0.04, 0.3, s.h);
        drawNode(sat[2].ox, sat[2].oy, 0.2, sat[2].h);
        return;
      }

      if (s.kind === "logo_fastapi") {
        // True FastAPI emerald-teal circular drum with full-roof carved white lightning bolt
        const base = iso(s.gx, s.gy, 2.8);
        const top = iso(s.gx, s.gy, s.h);
        const rx = tile * hw * 0.92;
        const ry = tile * hd * 0.49;
        const grad = ctx.createLinearGradient(top[0] - rx, top[1], top[0] + rx, top[1]);
        grad.addColorStop(0, isColor ? "#2dd4bf" : lC); grad.addColorStop(0.5, isColor ? "#0d9488" : lC); grad.addColorStop(1, isColor ? "#065f46" : rC);
        ctx.beginPath(); ctx.moveTo(top[0] - rx, top[1]); ctx.lineTo(base[0] - rx, base[1]);
        ctx.ellipse(base[0], base[1], rx, ry, 0, Math.PI, 0, true); ctx.lineTo(top[0] + rx, top[1]); ctx.closePath();
        ctx.fillStyle = grad; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.65)"; ctx.lineWidth = 0.85; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(top[0], top[1], rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = isColor ? "#14b8a6" : tC; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 1.25; ctx.stroke();
        const bolt = [
          iso(s.gx + hw * 0.22, s.gy - hd * 0.58, s.h + 1.2), iso(s.gx - hw * 0.48, s.gy + hd * 0.08, s.h + 1.2),
          iso(s.gx + hw * 0.04, s.gy + hd * 0.08, s.h + 1.2), iso(s.gx - hw * 0.2, s.gy + hd * 0.6, s.h + 1.2),
          iso(s.gx + hw * 0.48, s.gy - hd * 0.06, s.h + 1.2), iso(s.gx - hw * 0.04, s.gy - hd * 0.06, s.h + 1.2),
        ];
        ctx.beginPath(); bolt.forEach(([bx, by], i) => (i === 0 ? ctx.moveTo(bx, by) : ctx.lineTo(bx, by))); ctx.closePath();
        ctx.fillStyle = "#ffffff"; ctx.fill();
        return;
      }

      if (s.kind === "logo_postgres") {
        // True sculpted royal-blue PostgreSQL Slonik elephant-head architectural pavilion
        const headPoly: Array<[number, number]> = [
          [-hw * 0.88, -hd * 0.36], [-hw * 0.42, -hd * 0.82], [hw * 0.42, -hd * 0.82],
          [hw * 0.88, -hd * 0.36], [hw * 0.78, hd * 0.32], [hw * 0.24, hd * 0.38],
          [hw * 0.18, hd * 0.94], [-hw * 0.18, hd * 0.94], [-hw * 0.24, hd * 0.38],
          [-hw * 0.78, hd * 0.32],
        ];
        extrudeIsoPoly(ctx, iso, s.gx, s.gy, headPoly, 2.8, s.h, isColor ? "#3b73a8" : lC, isColor ? "#2b5882" : rC, isColor ? "#193854" : rB, isColor ? "#7cb5e8" : tC, "rgba(255,255,255,0.75)", 3);
        return;
      }
    };

    drawLogoArchitecture();
    if (meta) {
      if (meta.showRoofLogo) {
        drawFlushRoofLogo(ctx, iso, tile, s.gx, s.gy, s.h * meta.roofLogoZFrac + 1.2, meta, isColor);
      }
      drawIntegratedCrownText(ctx, iso, tile, s.gx, s.gy + hd * 0.22, s.h * meta.crownZFrac + 4, meta, isColor, isDark);
    }
    return;
  }

  if (s.kind === "metro_station") {
    // Sleek elevated glass-and-steel metro station canopy spanning the viaduct
    const zDeck = 22.5;
    box(ctx, iso, s.gx, s.gy, hw, hd, zDeck, zDeck + 3.2, isColor ? "#334155" : lC, isColor ? "#1e293b" : rC, isColor ? "#f4f0e6" : tC, sC);
    const aL = iso(s.gx - hw, s.gy, zDeck + 3.2);
    const aR = iso(s.gx + hw, s.gy, zDeck + 3.2);
    const aM = iso(s.gx, s.gy, zDeck + 17);
    ctx.beginPath();
    ctx.moveTo(aL[0], aL[1]);
    ctx.quadraticCurveTo(aM[0], aM[1] - 10, aR[0], aR[1]);
    ctx.lineTo(aR[0], aR[1] + 7);
    ctx.lineTo(aL[0], aL[1] + 7);
    ctx.closePath();
    ctx.fillStyle = isColor ? (isDark ? "rgba(56, 189, 248, 0.36)" : "rgba(186, 230, 253, 0.62)") : "rgba(244, 240, 230, 0.55)";
    ctx.fill();
    ctx.strokeStyle = isColor ? "#ed8838" : sC;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    return;
  }

  if (s.kind === "ferris_base") {
    // Waterfront observation wheel stone plaza & A-frame steel support legs
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, 3.2, isColor ? "#dfd7c8" : lC, isColor ? "#c4baa7" : rC, isColor ? "#f7f3ea" : tC, sC);
    const hub = iso(s.gx, s.gy, 34);
    [[-hw * 0.52, -hd * 0.3], [hw * 0.52, -hd * 0.3], [-hw * 0.52, hd * 0.3], [hw * 0.52, hd * 0.3]].forEach(([dx, dy]) => {
      const foot = iso(s.gx + dx, s.gy + dy, 3.2);
      ctx.beginPath(); ctx.moveTo(...foot); ctx.lineTo(...hub);
      ctx.strokeStyle = isColor ? (isDark ? "#cbd5e1" : "#475569") : "#94a3b8";
      ctx.lineWidth = 2.2;
      ctx.stroke();
    });
    return;
  }

  if (s.kind === "canal_house") {
    // Narrow European-style stepped-gable canal townhouse
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, s.h * 0.78, lC, rC, tC, sC, false, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 3, s.h * 0.75, Math.max(2, s.floors || 3), 2, wC, false, litC, s.seed || 0.5);
    box(ctx, iso, s.gx, s.gy, hw * 0.76, hd * 0.88, s.h * 0.78, s.h * 0.92, lC, rC, tC, sC);
    box(ctx, iso, s.gx, s.gy, hw * 0.46, hd * 0.76, s.h * 0.92, s.h + 2, lC, rC, isColor ? "#ed8838" : tC, sC);
    return;
  }

  if (s.kind === "waterfront_cafe") {
    // Riverside bistro with timber deck, striped awning & patio umbrellas
    box(ctx, iso, s.gx, s.gy, hw * 1.06, hd * 1.04, 0, 2.4, isColor ? "#9c7454" : lC, isColor ? "#7d5b40" : rC, isColor ? "#d4b494" : tC, sC);
    box(ctx, iso, s.gx, s.gy - hd * 0.14, hw * 0.78, hd * 0.64, 2.4, s.h, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy - hd * 0.14, hw * 0.78, hd * 0.64, 5, s.h - 3, 2, 2, wC, false, litC, s.seed || 0.5);
    // Striped cafe awning
    box(ctx, iso, s.gx, s.gy + hd * 0.52, hw * 0.72, hd * 0.24, 9, 11.2, isColor ? "#ed8838" : lC, isColor ? "#c7681f" : rC, isColor ? "#f6f0e4" : tC, sC);
    [-0.42, 0.42].forEach((dx) => {
      const u = iso(s.gx + hw * dx, s.gy + hd * 0.78, 8.2);
      ctx.beginPath(); ctx.arc(u[0], u[1], 3.8, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? (dx < 0 ? "#ed8838" : "#4b7b8b") : tC; ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.65)"; ctx.lineWidth = 0.7; ctx.stroke();
    });
    return;
  }

  if (s.kind === "boathouse") {
    // Timber-and-glass rowing club boathouse with wooden pier toward canal
    const pierDir = s.gy < CANAL_Y0 ? 1 : -1;
    box(ctx, iso, s.gx, s.gy + pierDir * hd * 0.92, hw * 0.52, hd * 0.46, 0, 1.8, isColor ? "#8c6343" : lC, isColor ? "#6b482e" : rC, isColor ? "#c9a482" : tC, sC);
    box(ctx, iso, s.gx, s.gy, hw * 0.92, hd * 0.84, 0, s.h * 0.7, isColor ? "#4b7b8b" : lC, isColor ? "#325866" : rC, tC, sC, false, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw * 0.92, hd * 0.84, 3, s.h * 0.66, 1, 3, wC, true);
    const peak = iso(s.gx, s.gy, s.h + 5);
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx - hw * 0.96, s.gy + hd * 0.88, s.h * 0.7));
    ctx.lineTo(...iso(s.gx + hw * 0.96, s.gy + hd * 0.88, s.h * 0.7));
    ctx.lineTo(...peak); ctx.closePath();
    ctx.fillStyle = isColor ? "#ed8838" : lC; ctx.fill();
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx + hw * 0.96, s.gy + hd * 0.88, s.h * 0.7));
    ctx.lineTo(...iso(s.gx + hw * 0.96, s.gy - hd * 0.88, s.h * 0.7));
    ctx.lineTo(...peak); ctx.closePath();
    ctx.fillStyle = isColor ? "#c7681f" : rC; ctx.fill();
    return;
  }

  if (s.kind === "street_foliage") {
    const seed = s.seed || 0.5;
    if (seed < 0.68) {
      drawTree(ctx, iso, s.gx, s.gy, isColor, isDark, 0.72 + seed * 0.32, seed > 0.46);
    } else if (seed < 0.84) {
      const bp = iso(s.gx, s.gy, 1.2);
      ctx.beginPath(); ctx.ellipse(bp[0] + 1.5, bp[1] + 1, 4.6, 2.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(0,0,0,0.22)" : "rgba(28,38,54,0.12)"; ctx.fill();
      ctx.beginPath(); ctx.arc(bp[0] - 2.1, bp[1] - 1.2, 2.7, 0, Math.PI * 2);
      ctx.arc(bp[0] + 2.0, bp[1] - 1.0, 2.5, 0, Math.PI * 2);
      ctx.arc(bp[0], bp[1] - 2.5, 3.0, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? (isDark ? "#26684d" : "#3b8f62") : isDark ? "#33405c" : "#cbd5e1"; ctx.fill();
      ctx.beginPath(); ctx.arc(bp[0] - 0.6, bp[1] - 3.3, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? (seed > 0.78 ? "#f2a359" : "#74c69d") : "#e2e8f0"; ctx.fill();
    } else {
      box(ctx, iso, s.gx, s.gy, 0.08, 0.04, 0, 2.6, isColor ? "#9c6b43" : lC, isColor ? "#734c2d" : rC, isColor ? "#c99768" : tC, sC);
    }
    return;
  }

  if (s.kind === "bush_cluster" || s.kind === "garden_bed" || s.kind === "tree_grove") {
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, 1.8, isColor ? "#326e51" : lC, isColor ? "#24543c" : rC, isColor ? (isDark ? "#20523f" : "#5ca879") : tC, sC);
    const seed = s.seed || 0.5;
    if (s.kind === "tree_grove") {
      drawTree(ctx, iso, s.gx - hw * 0.42, s.gy - hd * 0.28, isColor, isDark, 0.86, false);
      drawTree(ctx, iso, s.gx + hw * 0.38, s.gy + hd * 0.25, isColor, isDark, 0.74, true);
    } else if (s.kind === "garden_bed") {
      drawTree(ctx, iso, s.gx, s.gy - hd * 0.12, isColor, isDark, 0.72, seed > 0.5);
      [[-0.45, 0.35], [0.42, -0.32], [0.35, 0.38]].forEach(([dx, dy], bi) => {
        const fp = iso(s.gx + hw * dx, s.gy + hd * dy, 2.6);
        ctx.beginPath(); ctx.arc(fp[0], fp[1], 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isColor ? (bi === 0 ? "#ed8838" : bi === 1 ? "#f4c552" : "#74c69d") : tC;
        ctx.fill();
      });
    } else {
      [[-0.36, -0.24, 3.1], [0.32, -0.16, 2.8], [0.02, 0.3, 3.3]].forEach(([dx, dy, rad]) => {
        const bp = iso(s.gx + hw * dx, s.gy + hd * dy, 2.2);
        ctx.beginPath(); ctx.arc(bp[0], bp[1], rad, 0, Math.PI * 2);
        ctx.fillStyle = isColor ? (isDark ? "#25664b" : "#36875c") : isDark ? "#33405c" : "#cbd5e1"; ctx.fill();
        ctx.beginPath(); ctx.arc(bp[0] - 0.8, bp[1] - 1.1, rad * 0.52, 0, Math.PI * 2);
        ctx.fillStyle = isColor ? (isDark ? "#439671" : "#74c69d") : "#e2e8f0"; ctx.fill();
      });
    }
    return;
  }

  if (s.kind === "river_promenade" || s.kind === "pocket_plaza" || s.kind === "plaza_fountain") {
    // Landscaped cosmopolitan pocket square with trees, stone paving, and fountain/benches
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, 2.2, isColor ? "#d4cbb9" : lC, isColor ? "#bdb39f" : rC, isColor ? (isDark ? "#24324f" : "#f4efe3") : tC, sC);
    if (s.kind === "plaza_fountain") {
      const fp = iso(s.gx, s.gy, 2.8);
      ctx.beginPath(); ctx.ellipse(fp[0], fp[1], tile * 0.16, tile * 0.08, 0, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? "#4b8ea8" : lC; ctx.fill();
      ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.1; ctx.stroke();
    } else {
      box(ctx, iso, s.gx, s.gy, hw * 0.62, hd * 0.52, 2.2, 3.0, isColor ? "#387c54" : lC, isColor ? "#2c6443" : rC, isColor ? (isDark ? "#2a6948" : "#74c68e") : tC, sC);
    }
    drawTree(ctx, iso, s.gx - hw * 0.48, s.gy - hd * 0.35, isColor, isDark, 0.78, false);
    drawTree(ctx, iso, s.gx + hw * 0.45, s.gy + hd * 0.35, isColor, isDark, 0.72, true);
    return;
  }

  if (s.kind === "corner_shop") {
    // Compact 2-story cosmopolitan corner bakery/bookshop with bright awning
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, s.h, lC, rC, tC, sC, true, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 4, s.h - 2, 2, 2, wC, false, litC, s.seed || 0.5);
    box(ctx, iso, s.gx, s.gy + hd * 0.92, hw * 0.88, hd * 0.24, 6.2, 8.2, isColor ? "#ed8838" : lC, isColor ? "#c7681f" : rC, isColor ? "#fff5e6" : tC, sC);
    return;
  }

  if (s.kind === "market_stalls") {
    // Cluster of 4 colorful cosmopolitan open-air street market kiosks
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, 1.8, isColor ? "#d4cbb9" : lC, isColor ? "#bdb39f" : rC, isColor ? "#f2ece0" : tC, sC);
    const stallCols = isColor ? ["#ed8838", "#4b7b8b", "#569674", "#d9a954"] : [lC, rC, tC, lC];
    [[-0.44, -0.4], [0.44, -0.4], [-0.44, 0.42], [0.44, 0.42]].forEach(([dx, dy], si) => {
      box(ctx, iso, s.gx + hw * dx, s.gy + hd * dy, hw * 0.34, hd * 0.3, 1.8, 7.6, stallCols[si], rC, stallCols[si], "rgba(255,255,255,0.65)");
    });
    return;
  }

  if (s.kind === "tennis_court") {
    // Cosmopolitan neighborhood tennis court with white court markings & perimeter trees
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, 2.2, isColor ? "#2d6a4f" : lC, isColor ? "#1f4d39" : rC, isColor ? (isDark ? "#215c4a" : "#3b8c6e") : tC, sC);
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx - hw * 0.72, s.gy - hd * 0.66, 2.5));
    ctx.lineTo(...iso(s.gx + hw * 0.72, s.gy - hd * 0.66, 2.5));
    ctx.lineTo(...iso(s.gx + hw * 0.72, s.gy + hd * 0.66, 2.5));
    ctx.lineTo(...iso(s.gx - hw * 0.72, s.gy + hd * 0.66, 2.5));
    ctx.closePath();
    ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(...iso(s.gx, s.gy - hd * 0.68, 3.8));
    ctx.lineTo(...iso(s.gx, s.gy + hd * 0.68, 3.8));
    ctx.stroke();
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
    // Warm matte-clay stucco walls + dark-framed glowing amber windows + overhanging standing-seam slate roof
    box(ctx, iso, s.gx, s.gy, hw, hd, 0, s.h * 0.68, lC, rC, tC, sC, false, lB, rB);
    windows(ctx, iso, s.gx, s.gy, hw, hd, 3, s.h * 0.65, 2, 2, wC, false, litC, s.seed || 0.5);
    const ov = 1.07;
    const peak = iso(s.gx, s.gy, s.h + 9);
    const eL = iso(s.gx - hw * ov, s.gy + hd * ov, s.h * 0.66);
    const eM = iso(s.gx + hw * ov, s.gy + hd * ov, s.h * 0.66);
    const eR = iso(s.gx + hw * ov, s.gy - hd * ov, s.h * 0.66);
    const gL = ctx.createLinearGradient(peak[0], peak[1], eM[0], eM[1]);
    gL.addColorStop(0, isColor ? (isDark ? "#5e657a" : "#9b9da3") : lC);
    gL.addColorStop(1, isColor ? (isDark ? "#464c5e" : "#7f8188") : lB);
    ctx.beginPath(); ctx.moveTo(...eL); ctx.lineTo(...eM); ctx.lineTo(...peak); ctx.closePath();
    ctx.fillStyle = gL; ctx.fill();
    ctx.beginPath(); ctx.moveTo(...eM); ctx.lineTo(...eR); ctx.lineTo(...peak); ctx.closePath();
    ctx.fillStyle = isColor ? (isDark ? "#393f4f" : "#6c6f76") : rC; ctx.fill();
    // 3D-embossed standing-seam roof ridges (shadow + highlight pair)
    for (let k = 1; k <= 4; k++) {
      const t = k / 5;
      const rx = eL[0] + (eM[0] - eL[0]) * t;
      const ry = eL[1] + (eM[1] - eL[1]) * t;
      ctx.beginPath(); ctx.moveTo(peak[0], peak[1]); ctx.lineTo(rx, ry);
      ctx.strokeStyle = "rgba(15, 23, 42, 0.26)"; ctx.lineWidth = 0.7; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(peak[0] + 0.8, peak[1] + 0.3); ctx.lineTo(rx + 0.8, ry + 0.3);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.24)"; ctx.lineWidth = 0.55; ctx.stroke();
    }
    // Sunlit ridge cap bevel
    ctx.beginPath(); ctx.moveTo(...eL); ctx.lineTo(...eM); ctx.lineTo(...eR);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.38)"; ctx.lineWidth = 0.8; ctx.stroke();
    if (s.kind === "cafe") {
      const umb = iso(s.gx + hw + 0.13, s.gy + hd - 0.12, 7.5);
      ctx.beginPath(); ctx.arc(umb[0], umb[1], 4.8, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? "#ed8838" : tC; ctx.fill();
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
    drawTree(ctx, iso, s.gx + hw + 0.12, s.gy + hd, isColor, isDark, 0.82, (s.seed || 0) > 0.6);
    if (s.trees > 1) {
      drawTree(ctx, iso, s.gx - hw - 0.1, s.gy + hd + 0.08, isColor, isDark, 0.74, (s.seed || 0) < 0.45);
    }
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
  const catActiveRef = useRef(false);
  const orbitResumeAtRef = useRef(0);

  const handleSelectCategory = (idx: number | null) => {
    if (idx === selectedCatIdx) {
      return;
    }
    if (idx === null) {
      setStringDir(-1);
      catActiveRef.current = false;
      orbitResumeAtRef.current = performance.now() + 140;
    } else if (selectedCatIdx !== null) {
      setStringDir(idx > selectedCatIdx ? 1 : -1);
      catActiveRef.current = true;
    } else {
      setStringDir(1);
      catActiveRef.current = true;
    }
    setSelectedCatIdx(idx);
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

    const pan = monoCanvas.closest<HTMLDivElement>(".skills-city-pan");
    const centerMap = () => { if (pan) pan.scrollLeft = (pan.scrollWidth - pan.clientWidth) / 2; };
    const mapSize = new ResizeObserver(centerMap);
    if (pan) mapSize.observe(pan);
    centerMap();
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

    // 48-Band Depth-Sliced Occlusion Cache (ground + 48 fine transparent vertical building slices)
    const DEPTH_BANDS = 48;
    const depthToBand = (d: number) => Math.max(0, Math.min(DEPTH_BANDS - 1, Math.floor(((d + 20) / 40) * DEPTH_BANDS)));
    const groundMono = document.createElement("canvas");
    const groundColor = document.createElement("canvas");
    const slicesMono = Array.from({ length: DEPTH_BANDS }, () => document.createElement("canvas"));
    const slicesColor = Array.from({ length: DEPTH_BANDS }, () => document.createElement("canvas"));
    const sliceTop = new WeakMap<HTMLCanvasElement, number>();
    ensureLogoImagesLoaded();
    let cW = 0;
    let cH = 0;
    let cDpr = 0;
    let cDark = false;
    let cLogoVer = -1;
    let landmarks: LandmarkAtlas | undefined;
    const landmarkRequest = new AbortController();
    const preloadLandmarks = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      preloadLandmarks.disconnect();
      const { signal } = landmarkRequest;
      import("./skills-city/landmarkAtlas").then(async ({ createLandmarkAtlas }) => {
        if (signal.aborted) return;
        const atlas = await createLandmarkAtlas(STRUCTURES.filter(s => s.kind.startsWith("logo_")), signal);
        if (signal.aborted) atlas.dispose();
        else {
          landmarks = atlas;
          cLogoVer = -1;
        }
      }).catch(error => {
        if (!signal.aborted) console.warn("Using the canvas landmark models", error);
      });
    }, { rootMargin: "500px" });
    preloadLandmarks.observe(section);

    const getIso = (W: number, H: number) => {
      const tile = Math.max(40, Math.min(W, H) * 0.062);
      const cx = W * 0.5;
      const cy = H * 0.62;
      const iso: IsoFn = (x, y, z = 0) => [cx + (x - y) * tile * 0.88, cy + (x + y) * tile * 0.44 - z];
      return { tile, cx, cy, iso };
    };

    const buildCityCache = (
      groundCanvas: HTMLCanvasElement,
      sliceCanvases: HTMLCanvasElement[],
      W: number,
      H: number,
      dpr: number,
      isColor: boolean,
      isDark: boolean,
    ) => {
      groundCanvas.width = W * dpr;
      groundCanvas.height = H * dpr;
      const ctx = groundCanvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = isDark ? (isColor ? "#12172b" : "#0e1120") : isColor ? "#ebe2d2" : "#f4f0e6";
      ctx.fillRect(0, 0, W, H);

      const { tile, iso } = getIso(W, H);

      // Subtle architectural urban grid
      ctx.strokeStyle = isDark ? "rgba(148, 163, 184, 0.08)" : isColor ? "rgba(148, 134, 114, 0.14)" : "rgba(140, 132, 118, 0.12)";
      ctx.lineWidth = 1;
      for (let i = -22; i <= 22; i++) {
        ctx.beginPath(); ctx.moveTo(...iso(i, -22)); ctx.lineTo(...iso(i, 22)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(...iso(-22, i)); ctx.lineTo(...iso(22, i)); ctx.stroke();
      }

      // Wide paved waterfront stone promenades along both canal embankments
      ctx.beginPath();
      ctx.moveTo(...iso(-24, CANAL_Y0 - 0.44, 0));
      ctx.lineTo(...iso(24, CANAL_Y0 - 0.44, 0));
      ctx.lineTo(...iso(24, CANAL_Y1 + 0.48, 0));
      ctx.lineTo(...iso(-24, CANAL_Y1 + 0.48, 0));
      ctx.closePath();
      ctx.fillStyle = isDark ? "#1f2842" : isColor ? "#dfd7c8" : "#ebe6dc";
      ctx.fill();

      // Stone quay coping walls right at water edge
      ctx.beginPath();
      ctx.moveTo(...iso(-24, CANAL_Y0 - 0.08, 0));
      ctx.lineTo(...iso(24, CANAL_Y0 - 0.08, 0));
      ctx.lineTo(...iso(24, CANAL_Y1 + 0.08, 0));
      ctx.lineTo(...iso(-24, CANAL_Y1 + 0.08, 0));
      ctx.closePath();
      ctx.fillStyle = isDark ? "#2c3857" : isColor ? "#c4baa7" : "#dad4c7";
      ctx.fill();

      const cA = iso(0, CANAL_Y0, 0);
      const cB = iso(0, CANAL_Y1, 0);
      const waterGrad = ctx.createLinearGradient(cA[0], cA[1], cB[0], cB[1]);
      if (isColor) {
        waterGrad.addColorStop(0, isDark ? "#143752" : "#3b7f9c");
        waterGrad.addColorStop(0.5, isDark ? "#1e5273" : "#5ca3bd");
        waterGrad.addColorStop(1, isDark ? "#113047" : "#35748f");
      } else {
        waterGrad.addColorStop(0, isDark ? "#161e36" : "#dad4c7");
        waterGrad.addColorStop(1, isDark ? "#1c2642" : "#e5e0d5");
      }
      ctx.beginPath();
      ctx.moveTo(...iso(-24, CANAL_Y0, 0));
      ctx.lineTo(...iso(24, CANAL_Y0, 0));
      ctx.lineTo(...iso(24, CANAL_Y1, 0));
      ctx.lineTo(...iso(-24, CANAL_Y1, 0));
      ctx.closePath();
      ctx.fillStyle = waterGrad;
      ctx.fill();

      // Central stadium plaza apron
      ctx.beginPath();
      ctx.moveTo(...iso(-1.45, -1.25, 0));
      ctx.lineTo(...iso(1.45, -1.25, 0));
      ctx.lineTo(...iso(1.45, 1.15, 0));
      ctx.lineTo(...iso(-1.45, 1.15, 0));
      ctx.closePath();
      ctx.fillStyle = isDark ? "#1c233b" : "#f7f3ea";
      ctx.fill();

      // Paved sidewalks + dark asphalt avenues + crisp lane markings
      const drawAvenue = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.beginPath(); ctx.moveTo(...iso(x1, y1)); ctx.lineTo(...iso(x2, y2));
        ctx.strokeStyle = isDark ? "#26314f" : "#f9f6ef";
        ctx.lineWidth = tile * 0.56;
        ctx.stroke();

        ctx.beginPath(); ctx.moveTo(...iso(x1, y1)); ctx.lineTo(...iso(x2, y2));
        ctx.strokeStyle = isDark ? "#121626" : isColor ? "#3f4654" : "#dad5c8";
        ctx.lineWidth = tile * 0.34;
        ctx.stroke();

        ctx.setLineDash([6, 8]);
        ctx.beginPath(); ctx.moveTo(...iso(x1, y1)); ctx.lineTo(...iso(x2, y2));
        ctx.strokeStyle = isColor ? "rgba(237, 136, 56, 0.78)" : isDark ? "rgba(148,163,184,0.35)" : "rgba(255,255,255,0.82)";
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.setLineDash([]);
      };
      // Vertical avenues skip the canal water span (bridges render above boats!)
      for (const rx of ROAD_X) {
        drawAvenue(rx, -22, rx, CANAL_Y0 - 0.04);
        drawAvenue(rx, CANAL_Y1 + 0.04, rx, 22);
      }
      for (const ry of ROAD_Y) drawAvenue(-22, ry, 22, ry);

      // Crisp zebra crosswalks at every avenue intersection
      ctx.strokeStyle = isColor ? "rgba(255, 252, 245, 0.78)" : isDark ? "rgba(148,163,184,0.35)" : "rgba(255,255,255,0.82)";
      ctx.lineWidth = 1.6;
      for (const rx of ROAD_X) {
        for (const ry of ROAD_Y) {
          for (let s = -0.14; s <= 0.14; s += 0.07) {
            ctx.beginPath();
            ctx.moveTo(...iso(rx + s, ry - 0.34)); ctx.lineTo(...iso(rx + s, ry - 0.22));
            ctx.moveTo(...iso(rx + s, ry + 0.22)); ctx.lineTo(...iso(rx + s, ry + 0.34));
            ctx.moveTo(...iso(rx - 0.34, ry + s)); ctx.lineTo(...iso(rx - 0.22, ry + s));
            ctx.moveTo(...iso(rx + 0.22, ry + s)); ctx.lineTo(...iso(rx + 0.34, ry + s));
            ctx.stroke();
          }
        }
      }

      // Soft studio two-layer (penumbra + umbra) contact shadows seating every building cleanly on the ground
      for (const s of STRUCTURES) {
        if (s.h < 4) continue;
        const hw = s.w * 0.5;
        const hd = s.d * 0.5;
        [1.35, 0.78].forEach((mult, pass) => {
          const sx = s.h * 0.0078 * mult;
          const sy = s.h * 0.0038 * mult;
          ctx.beginPath();
          ctx.moveTo(...iso(s.gx - hw, s.gy + hd, 0));
          ctx.lineTo(...iso(s.gx + hw, s.gy + hd, 0));
          ctx.lineTo(...iso(s.gx + hw, s.gy - hd, 0));
          ctx.lineTo(...iso(s.gx + hw + sx, s.gy - hd + sy, 0));
          ctx.lineTo(...iso(s.gx + hw + sx, s.gy + hd + sy, 0));
          ctx.lineTo(...iso(s.gx - hw + sx, s.gy + hd + sy, 0));
          ctx.closePath();
          ctx.fillStyle = isDark
            ? pass === 0 ? "rgba(0, 0, 0, 0.18)" : "rgba(0, 0, 0, 0.28)"
            : isColor
              ? pass === 0 ? "rgba(20, 30, 48, 0.08)" : "rgba(20, 30, 48, 0.14)"
              : pass === 0 ? "rgba(60, 56, 48, 0.045)" : "rgba(60, 56, 48, 0.075)";
          ctx.fill();
        });
      }

      const mz = 24;
      const pillars: Array<{ depth: number; type: "p"; gx: number }> = [];
      for (let x = -18; x <= 18; x += 2.2) pillars.push({ depth: x + METRO_Y, type: "p", gx: x });

      const list = [
        ...STRUCTURES.map((s) => ({ depth: s.gx + s.gy + (s.w + s.d) * 0.28, type: "s" as const, data: s })),
        ...LAMPS.map((l) => ({ depth: l.gx + l.gy, type: "l" as const, data: l })),
        ...pillars,
      ];
      list.sort((a, b) => a.depth - b.depth);
      // Each depth slice covers a narrow strip of the isometric city. Keep the
      // world coordinates and pixel density while omitting transparent rows.
      const bounds = sliceCanvases.map(() => ({ top: H, bottom: 0 }));
      for (const item of list) {
        const range = bounds[depthToBand(item.depth)];
        const building = item.type === "s" ? item.data : undefined;
        const center = building ? iso(building.gx, building.gy)[1] : H * .62 + item.depth * tile * .44;
        const margin = building ? tile * (building.w + building.d) * .44 + 40 : 12;
        const height = building ? Math.max(2 * building.h, 2 * tile) + 32 : mz;
        range.top = Math.min(range.top, center - height - margin);
        range.bottom = Math.max(range.bottom, center + margin);
      }
      const sliceCtxs = sliceCanvases.map((canvas, band) => {
        const top = Math.max(0, Math.floor(bounds[band].top * dpr));
        const bottom = Math.min(groundCanvas.height, Math.ceil(bounds[band].bottom * dpr));
        canvas.width = groundCanvas.width;
        canvas.height = Math.max(0, bottom - top);
        sliceTop.set(canvas, top);
        const context = canvas.getContext("2d")!;
        context.setTransform(dpr, 0, 0, dpr, 0, -top);
        return context;
      });
      const textBounds = Array.from(cityHeaderRef.current?.children ?? []).map(el => {
        const range = document.createRange();
        range.selectNodeContents(el);
        return range.getBoundingClientRect();
      });
      const viewport = monoCanvas.getBoundingClientRect();
      const heading = {
        left: Math.min(...textBounds.map(r => r.left)) - viewport.left,
        right: Math.max(...textBounds.map(r => r.right)) - viewport.left,
        bottom: Math.max(...textBounds.map(r => r.bottom)) - viewport.top,
      };
      for (const item of list) {
        const bCtx = sliceCtxs[depthToBand(item.depth)];
        if (item.type === "s") {
          drawStaticStructure(bCtx, iso, tile, item.data, isColor, isDark, landmarks, heading);
        } else if (item.type === "p") {
          box(bCtx, iso, item.gx, METRO_Y, 0.09, 0.09, 0, mz, isDark ? "#28324d" : "#d8d3c8", isDark ? "#1c243b" : "#c4bdb0", isDark ? "#38466e" : "#f4f0e6", "rgba(255,255,255,0.25)");
        } else {
          const b = iso(item.data.gx, item.data.gy, 0);
          const t = iso(item.data.gx, item.data.gy, 10.5);
          if (isDark && isColor) {
            const pool = bCtx.createRadialGradient(b[0], b[1], 0.5, b[0], b[1], 9.5);
            pool.addColorStop(0, "rgba(255, 204, 128, 0.28)");
            pool.addColorStop(1, "rgba(255, 204, 128, 0)");
            bCtx.beginPath(); bCtx.ellipse(b[0], b[1], 9.5, 4.8, 0, 0, Math.PI * 2);
            bCtx.fillStyle = pool; bCtx.fill();
          }
          bCtx.beginPath(); bCtx.moveTo(...b); bCtx.lineTo(...t);
          bCtx.strokeStyle = isDark ? "#475569" : "#94a3b8";
          bCtx.lineWidth = 1;
          bCtx.stroke();
          if (isDark && isColor) {
            const halo = bCtx.createRadialGradient(t[0], t[1], 0.6, t[0], t[1], 7.2);
            halo.addColorStop(0, "rgba(255, 232, 178, 0.92)");
            halo.addColorStop(0.42, "rgba(255, 190, 102, 0.36)");
            halo.addColorStop(1, "rgba(255, 190, 102, 0)");
            bCtx.beginPath(); bCtx.arc(t[0], t[1], 7.2, 0, Math.PI * 2);
            bCtx.fillStyle = halo; bCtx.fill();
          }
          bCtx.beginPath(); bCtx.arc(t[0], t[1], isDark ? 1.9 : 1.6, 0, Math.PI * 2);
          bCtx.fillStyle = isColor ? (isDark ? "#fff2c6" : "#f2bd83") : "#e2e8f0";
          bCtx.fill();
        }
      }
    };

    const drawCanalBridges = (ctx: CanvasRenderingContext2D, iso: IsoFn, tile: number, isColor: boolean, isDark: boolean) => {
      const bz = 3.6;
      const deckL = isColor ? (isDark ? "#263254" : "#d6cfc0") : isDark ? "#1f2842" : "#e2ddd1";
      const deckR = isColor ? (isDark ? "#1b2440" : "#b8b0a0") : isDark ? "#161d33" : "#cfc9bc";
      const deckT = isDark ? "#151b2e" : isColor ? "#464e5e" : "#ded9cd";
      for (const rx of ROAD_X) {
        // Stone bridge deck spanning canal so boats glide cleanly underneath
        box(ctx, iso, rx, (CANAL_Y0 + CANAL_Y1) * 0.5, 0.34, (CANAL_Y1 - CANAL_Y0) * 0.5 + 0.08, 0, bz, deckL, deckR, deckT, "rgba(255,255,255,0.35)");
        // Sidewalk parapets & steel rails
        [-0.3, 0.3].forEach((dx) => {
          ctx.beginPath();
          ctx.moveTo(...iso(rx + dx, CANAL_Y0 - 0.06, bz + 2.2));
          ctx.lineTo(...iso(rx + dx, CANAL_Y1 + 0.06, bz + 2.2));
          ctx.strokeStyle = isColor ? (isDark ? "#94a3b8" : "#f8f5ee") : "#cbd5e1";
          ctx.lineWidth = 1.6;
          ctx.stroke();
        });
        // Bridge centerline dash
        ctx.setLineDash([4, 5]);
        ctx.beginPath();
        ctx.moveTo(...iso(rx, CANAL_Y0, bz + 0.4));
        ctx.lineTo(...iso(rx, CANAL_Y1, bz + 0.4));
        ctx.strokeStyle = isColor ? "rgba(237, 136, 56, 0.85)" : "rgba(255,255,255,0.75)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.setLineDash([]);
      }
      void tile;
    };

    const drawDepthSortedScene = (
      ctx: CanvasRenderingContext2D,
      groundCanvas: HTMLCanvasElement,
      sliceCanvases: HTMLCanvasElement[],
      W: number,
      H: number,
      isColor: boolean,
      isDark: boolean,
      time: number,
    ) => {
      const { tile, iso } = getIso(W, H);

      // 1. Ground, roads, crosswalks, canal & building shadows
      ctx.drawImage(groundCanvas, 0, 0, W, H);

      // 2. Canal boats glide directly on water underneath the 4 bridges
      for (const b of BOATS) {
        const bx = (((b.pos + time * 0.001 * b.speed * 14) % 28) + 28) % 28 - 14;
        const p = iso(bx, b.y, 1);
        const wake = iso(bx - Math.sign(b.speed) * 0.6, b.y, 0.5);
        ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...wake);
        ctx.strokeStyle = "rgba(244,240,230,0.52)"; ctx.lineWidth = 2; ctx.stroke();
        box(ctx, iso, bx, b.y, b.isBarge ? 0.24 : 0.17, 0.08, 0.5, 4.4, isColor ? b.hull : "#cbd5e1", isColor ? b.trim : "#94a3b8", "#f4f0e6", "rgba(0,0,0,0.16)");
      }

      // 3. Four stone-and-steel canal bridges above boats
      drawCanalBridges(ctx, iso, tile, isColor, isDark);

      // 4. Bucket moving vehicles, pedestrians & plaza gatherings into the 16 isometric depth bands
      type DynamicEntity =
        | { kind: "v"; depth: number; x: number; y: number; z0: number; v: (typeof VEHICLES)[number] }
        | { kind: "p"; depth: number; x: number; y: number; z0: number; coat: string; hat: boolean; phase: number; speedMult: number };
      const buckets: DynamicEntity[][] = Array.from({ length: DEPTH_BANDS }, () => []);

      for (const v of VEHICLES) {
        const pos = (((v.pos + time * 0.001 * v.speed * 18) % 30) + 30) % 30 - 15;
        const vx = v.horizontal ? pos : v.lane;
        const vy = v.horizontal ? v.lane : pos;
        const onBridge = !v.horizontal && vy > CANAL_Y0 - 0.12 && vy < CANAL_Y1 + 0.12;
        const depth = vx + vy;
        buckets[depthToBand(depth)].push({ kind: "v", depth, x: vx, y: vy, z0: onBridge ? 3.8 : 0.6, v });
      }

      for (const ch of PEOPLE) {
        const pos = (((ch.pos + time * 0.001 * ch.speed * 12) % 28) + 28) % 28 - 14;
        const px = ch.horizontal ? pos : ch.lane;
        const py = ch.horizontal ? ch.lane : pos;
        const onBridge = !ch.horizontal && py > CANAL_Y0 - 0.12 && py < CANAL_Y1 + 0.12;
        const depth = px + py;
        buckets[depthToBand(depth)].push({ kind: "p", depth, x: px, y: py, z0: onBridge ? 3.6 : 0, coat: ch.coat, hat: ch.hat, phase: ch.phase, speedMult: 1 });
      }

      for (const g of GATHERINGS) {
        const swayX = Math.sin(time * 0.0014 + g.phase) * 0.025;
        const swayY = Math.cos(time * 0.0012 + g.phase) * 0.025;
        const gx = g.gx + swayX;
        const gy = g.gy + swayY;
        const depth = gx + gy;
        buckets[depthToBand(depth)].push({ kind: "p", depth, x: gx, y: gy, z0: g.z0, coat: g.coat, hat: g.hat, phase: g.phase, speedMult: 0.45 });
      }

      const ferrisBand = depthToBand(FERRIS_POS.gx + FERRIS_POS.gy);
      const stadiumBand = depthToBand(0.0 + -0.05);

      // 5. Composite back-to-front: entities in band b -> static building slice b (true 3D occlusion!)
      for (let b = 0; b < DEPTH_BANDS; b++) {
        const entities = buckets[b];
        if (entities.length > 1) entities.sort((a, c) => a.depth - c.depth);
        for (const e of entities) {
          if (e.kind === "v") {
            const hw = e.v.horizontal ? (e.v.isBus ? 0.15 : 0.095) : 0.062;
            const hd = e.v.horizontal ? 0.062 : e.v.isBus ? 0.15 : 0.095;
            const sh = iso(e.x + 0.02, e.y + 0.02, e.z0);
            ctx.beginPath();
            ctx.ellipse(sh[0], sh[1], e.v.isBus ? 7 : 4.6, e.v.isBus ? 3.4 : 2.3, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(15, 23, 42, 0.24)";
            ctx.fill();
            box(ctx, iso, e.x, e.y, hw, hd, e.z0, e.z0 + (e.v.isBus ? 5.8 : 3.5), isColor ? e.v.color : "#cbd5e1", isColor ? e.v.color : "#94a3b8", isColor ? "#f4f0e6" : "#e2e8f0", "rgba(0,0,0,0.22)");
          } else {
            const bob = Math.abs(Math.sin(time * 0.0095 * e.speedMult + e.phase)) * (e.speedMult < 0.6 ? 1.0 : 1.8);
            const foot = iso(e.x, e.y, e.z0);
            const body = iso(e.x, e.y, e.z0 + 4.4 + bob);
            const head = iso(e.x, e.y, e.z0 + 7.4 + bob);
            ctx.beginPath();
            ctx.ellipse(foot[0] + 1, foot[1] + 0.5, 2.2, 1.1, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(15, 23, 42, 0.22)";
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(foot[0], foot[1]);
            ctx.lineTo(body[0], body[1]);
            ctx.strokeStyle = isColor ? e.coat : isDark ? "#64748b" : "#94a3b8";
            ctx.lineWidth = 2.5;
            ctx.lineCap = "round";
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(head[0], head[1], 1.7, 0, Math.PI * 2);
            ctx.fillStyle = isColor ? (e.hat ? "#102b79" : "#f2bd83") : "#cbd5e1";
            ctx.fill();
          }
        }
        drawCityMicroEventsForBand(ctx, iso, tile, isColor, isDark, time, b, depthToBand);
        const slice = sliceCanvases[b];
        if (slice.height) {
          const pixelHeight = H / groundCanvas.height;
          ctx.drawImage(slice, 0, sliceTop.get(slice)! * pixelHeight, W, slice.height * pixelHeight);
        }

        // Dynamic dark-mode building window lights switching organically ON and OFF in this depth band
        if (isDark && isColor) {
          for (let wi = 0; wi < NIGHT_WINDOWS.length; wi++) {
            const w = NIGHT_WINDOWS[wi];
            if (depthToBand(w.depth) !== b) continue;
            const sig = Math.sin(time * w.period + w.phase);
            const isOn = sig > 0.08;
            const p0 = w.face === "L" ? iso(w.gx + w.a, w.gy + w.hd, w.z + 1.85) : iso(w.gx + w.hw, w.gy + w.a, w.z + 1.85);
            const p1 = w.face === "L" ? iso(w.gx + w.b, w.gy + w.hd, w.z + 1.85) : iso(w.gx + w.hw, w.gy + w.b, w.z + 1.85);
            const p2 = w.face === "L" ? iso(w.gx + w.b, w.gy + w.hd, w.z - 1.85) : iso(w.gx + w.hw, w.gy + w.b, w.z - 1.85);
            const p3 = w.face === "L" ? iso(w.gx + w.a, w.gy + w.hd, w.z - 1.85) : iso(w.gx + w.hw, w.gy + w.a, w.z - 1.85);
            ctx.beginPath();
            ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.lineTo(...p2); ctx.lineTo(...p3);
            ctx.closePath();
            ctx.fillStyle = isOn ? w.warm : "#151b2c";
            ctx.fill();
            if (isOn && sig > 0.65) {
              ctx.strokeStyle = "rgba(255, 232, 170, 0.55)";
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }

        // Live football match, cheering stadium crowd & dark-mode floodlights inside central stadium
        if (b === stadiumBand) {
          const rim = iso(0.0, -0.05, 34);
          const pitchX = rim[0];
          const pitchY = rim[1] + 5;
          const crowdCols = ["#ed8838", "#38bdf8", "#f5c418", "#ffffff", "#e25241", "#4ade80"];
          for (let k = 0; k < 64; k++) {
            const ang = (k / 64) * Math.PI * 2;
            const ring = k % 2 === 0 ? 0.81 : 0.89;
            const cheer = Math.max(0, Math.sin(time * 0.0065 - ang * 2.0)) * 2.0;
            const sx = rim[0] + Math.cos(ang) * tile * ring;
            const sy = rim[1] + 2 + Math.sin(ang) * tile * (ring * 0.5) - cheer;
            ctx.beginPath();
            ctx.arc(sx, sy, 1.55, 0, Math.PI * 2);
            ctx.fillStyle = isColor ? crowdCols[k % crowdCols.length] : isDark ? "#64748b" : "#94a3b8";
            ctx.fill();
          }
          const tMatch = time * 0.0013;
          const teamA: Array<[number, number]> = [
            [-0.48 + Math.sin(tMatch * 1.1) * 0.06, Math.cos(tMatch * 0.9) * 0.08],
            [-0.24 + Math.cos(tMatch * 1.3) * 0.14, -0.14 + Math.sin(tMatch * 1.2) * 0.08],
            [-0.18 + Math.sin(tMatch * 1.5 + 1) * 0.16, 0.14 + Math.cos(tMatch * 1.1) * 0.08],
            [0.06 + Math.cos(tMatch * 1.7 + 2) * 0.18, -0.06 + Math.sin(tMatch * 1.4) * 0.12],
            [0.14 + Math.sin(tMatch * 1.4 + 3) * 0.15, 0.1 + Math.cos(tMatch * 1.3) * 0.1],
          ];
          const teamB: Array<[number, number]> = [
            [0.48 + Math.cos(tMatch * 1.1) * 0.06, Math.sin(tMatch * 0.9) * 0.08],
            [0.24 + Math.sin(tMatch * 1.25) * 0.14, 0.13 + Math.cos(tMatch * 1.1) * 0.08],
            [0.18 + Math.cos(tMatch * 1.45 + 1) * 0.16, -0.14 + Math.sin(tMatch * 1.2) * 0.08],
            [-0.06 + Math.sin(tMatch * 1.6 + 2) * 0.18, 0.08 + Math.cos(tMatch * 1.5) * 0.11],
            [-0.14 + Math.cos(tMatch * 1.35 + 3) * 0.15, -0.1 + Math.sin(tMatch * 1.25) * 0.1],
          ];
          const drawPlayers = (pts: Array<[number, number]>, col: string) => {
            ctx.fillStyle = isColor ? col : "#e2e8f0";
            for (const [ox, oy] of pts) {
              ctx.beginPath();
              ctx.arc(pitchX + ox * tile, pitchY + oy * tile, 1.9, 0, Math.PI * 2);
              ctx.fill();
            }
          };
          drawPlayers(teamA, "#2563eb");
          drawPlayers(teamB, "#ff7b29");
          const allPlayers = [...teamA, ...teamB];
          const passSlot = (tMatch * 0.9) % allPlayers.length;
          const idx0 = Math.floor(passSlot);
          const idx1 = (idx0 + 3) % allPlayers.length;
          const frac = passSlot - idx0;
          const bx = pitchX + (allPlayers[idx0][0] + (allPlayers[idx1][0] - allPlayers[idx0][0]) * frac) * tile;
          const by = pitchY + (allPlayers[idx0][1] + (allPlayers[idx1][1] - allPlayers[idx0][1]) * frac) * tile - Math.sin(frac * Math.PI) * 3.2;
          ctx.beginPath();
          ctx.arc(bx, by, 1.45, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          if (isDark && isColor) {
            ctx.save();
            const pitchGlow = ctx.createRadialGradient(pitchX, pitchY, 2, pitchX, pitchY, tile * 0.85);
            pitchGlow.addColorStop(0, "rgba(255, 246, 214, 0.28)");
            pitchGlow.addColorStop(0.6, "rgba(255, 224, 155, 0.12)");
            pitchGlow.addColorStop(1, "rgba(255, 224, 155, 0)");
            ctx.beginPath();
            ctx.ellipse(pitchX, pitchY, tile * 0.82, tile * 0.4, 0, 0, Math.PI * 2);
            ctx.fillStyle = pitchGlow;
            ctx.fill();

            [[-0.88, -0.56], [0.88, -0.56], [-0.88, 0.56], [0.88, 0.56]].forEach(([dx, dy]) => {
              const top = iso(dx, -0.05 + dy, 34 + 19);
              const beam = ctx.createLinearGradient(top[0], top[1], pitchX, pitchY);
              beam.addColorStop(0, "rgba(255, 248, 220, 0.36)");
              beam.addColorStop(0.55, "rgba(255, 236, 182, 0.13)");
              beam.addColorStop(1, "rgba(255, 236, 182, 0)");
              ctx.beginPath();
              ctx.moveTo(top[0], top[1]);
              ctx.lineTo(pitchX - tile * 0.26, pitchY - tile * 0.1);
              ctx.lineTo(pitchX + tile * 0.26, pitchY + tile * 0.14);
              ctx.closePath();
              ctx.fillStyle = beam;
              ctx.fill();

              const bulb = ctx.createRadialGradient(top[0], top[1], 1, top[0], top[1], 16);
              bulb.addColorStop(0, "rgba(255, 255, 240, 0.98)");
              bulb.addColorStop(0.32, "rgba(255, 230, 165, 0.62)");
              bulb.addColorStop(1, "rgba(255, 210, 120, 0)");
              ctx.beginPath();
              ctx.arc(top[0], top[1], 16, 0, Math.PI * 2);
              ctx.fillStyle = bulb;
              ctx.fill();
            });
            ctx.restore();
          }
        }

        // Animated rotating waterfront Ferris wheel in its exact depth band
        if (b === ferrisBand) {
          const hub = iso(FERRIS_POS.gx, FERRIS_POS.gy, 34);
          const rX = tile * 0.5;
          const rY = tile * 0.54;
          const spin = time * 0.00035;
          ctx.beginPath();
          ctx.ellipse(hub[0], hub[1], rX, rY, -0.18, 0, Math.PI * 2);
          ctx.strokeStyle = isColor ? (isDark ? "#e2e8f0" : "#f8f5ee") : "#cbd5e1";
          ctx.lineWidth = 2.1;
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(hub[0], hub[1], rX * 0.72, rY * 0.72, -0.18, 0, Math.PI * 2);
          ctx.strokeStyle = isColor ? "rgba(237, 136, 56, 0.72)" : "rgba(148,163,184,0.55)";
          ctx.lineWidth = 1;
          ctx.stroke();
          const podCols = ["#ed8838", "#38bdf8", "#f5c418", "#409d6b"];
          for (let k = 0; k < 12; k++) {
            const a = spin + (k * Math.PI * 2) / 12;
            const px = hub[0] + Math.cos(a) * rX;
            const py = hub[1] + Math.sin(a) * rY;
            ctx.beginPath(); ctx.moveTo(hub[0], hub[1]); ctx.lineTo(px, py);
            ctx.strokeStyle = isColor ? "rgba(255,255,255,0.42)" : "rgba(148,163,184,0.35)";
            ctx.lineWidth = 0.85; ctx.stroke();
            ctx.beginPath(); ctx.arc(px, py + 2.4, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = isColor ? podCols[k % podCols.length] : "#e2e8f0";
            ctx.fill();
          }
          ctx.beginPath(); ctx.arc(hub[0], hub[1], 3.2, 0, Math.PI * 2);
          ctx.fillStyle = isColor ? "#ed8838" : "#94a3b8"; ctx.fill();
        }
      }

      // 6. Elevated metro viaduct deck, moving metro trains, cranes, and ascending airplane
      const mz = 24;
      ctx.beginPath();
      ctx.moveTo(...iso(-20, METRO_Y, mz));
      ctx.lineTo(...iso(20, METRO_Y, mz));
      ctx.strokeStyle = isDark ? "#334155" : "#b8b1a3";
      ctx.lineWidth = 9;
      ctx.stroke();

      [
        { dir: 1, offset: 0, accent: "#ed8838" },
        { dir: -1, offset: 14, accent: "#3f63c4" },
      ].forEach((tr) => {
        const headX = (((time * 0.0021 * tr.dir + tr.offset) % 34) + 34) % 34 - 17;
        for (let c = 0; c < 4; c++) {
          box(ctx, iso, headX - c * 0.42 * tr.dir, METRO_Y, 0.17, 0.09, 26, 33, isColor ? "#f4f0e6" : "#cbd5e1", isColor ? tr.accent : "#94a3b8", "#ffffff", "rgba(0,0,0,0.2)");
        }
      });

      for (const cr of CRANES) {
        const base = iso(cr.gx, cr.gy, cr.z);
        const top = iso(cr.gx, cr.gy, cr.z + 28);
        ctx.beginPath(); ctx.moveTo(...base); ctx.lineTo(...top);
        ctx.strokeStyle = isColor ? "#ed8838" : "#94a3b8"; ctx.lineWidth = 2.1; ctx.stroke();
        const ang = cr.phase + time * cr.speed;
        ctx.beginPath();
        ctx.moveTo(top[0] - Math.cos(ang) * 10, top[1] - Math.sin(ang) * 5);
        ctx.lineTo(top[0] + Math.cos(ang) * 28, top[1] + Math.sin(ang) * 14);
        ctx.strokeStyle = isColor ? "#f2bd83" : "#cbd5e1"; ctx.lineWidth = 1.9; ctx.stroke();
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
      if (waveCanvas.width !== Math.floor(W * dpr) || waveCanvas.height !== Math.floor(H * dpr)) {
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
    let orbitReveal = catActiveRef.current ? 0 : 1;
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
        const dpr = Math.min(pan && pan.scrollWidth > pan.clientWidth ? 1 : 1.5, window.devicePixelRatio || 1);
        const W = monoCanvas.clientWidth;
        const H = monoCanvas.clientHeight;
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        if (W > 0 && H > 0) {
          if (monoCanvas.width !== Math.floor(W * dpr) || monoCanvas.height !== Math.floor(H * dpr)) {
            monoCanvas.width = W * dpr;
            monoCanvas.height = H * dpr;
            colorCanvas.width = W * dpr;
            colorCanvas.height = H * dpr;
          }
          if (cW !== W || cH !== H || cDpr !== dpr || cDark !== isDark || cLogoVer !== logoLoadVersion) {
            cW = W;
            cH = H;
            cDpr = dpr;
            cDark = isDark;
            cLogoVer = logoLoadVersion;
            buildCityCache(groundMono, slicesMono, W, H, dpr, false, isDark);
            buildCityCache(groundColor, slicesColor, W, H, dpr, true, isDark);
          }

          const mCtx = monoCanvas.getContext("2d")!;
          mCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          mCtx.globalCompositeOperation = "source-over";
          drawDepthSortedScene(mCtx, groundMono, slicesMono, W, H, false, isDark, now);

          const cCtx = colorCanvas.getContext("2d")!;
          cCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          cCtx.globalCompositeOperation = "source-over";
          drawDepthSortedScene(cCtx, groundColor, slicesColor, W, H, true, isDark, now);

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
        // Let the city be seen unobstructed during the existing colour reveal.
        cityHeaderRef.current.style.opacity = String(1 - clamp((smoothP - .06) / .18));
        cityHeaderRef.current.style.transform = `translate3d(0, ${(-fadeOutCity * 38).toFixed(1)}px, 0)`;
      }

      const headIn = clamp((smoothP - 0.5) / 0.16);
      if (orbitTopRef.current) {
        orbitTopRef.current.style.opacity = String(headIn);
        orbitTopRef.current.style.transform = `translate3d(0, ${((1 - headIn) * 30).toFixed(1)}px, 0)`;
      }

      const arcIn = clamp((smoothP - 0.54) / 0.16);
      const nowActive = catActiveRef.current;
      const targetOrbit = nowActive ? 0 : now >= orbitResumeAtRef.current ? 1 : 0;
      orbitReveal += (targetOrbit - orbitReveal) * (nowActive ? 0.16 : 0.1);
      const arcVis = arcIn * orbitReveal;
      arcStage.style.opacity = arcVis.toFixed(4);
      arcStage.style.transform = `translate3d(0, ${((1 - arcVis) * 32).toFixed(1)}px, 0) scale(${(0.96 + 0.04 * arcVis).toFixed(4)})`;
      arcStage.style.pointerEvents = arcVis > 0.5 ? "auto" : "none";

      const W = arcStage.clientWidth || window.innerWidth;
      // Generous span for big 66px icons so every badge has crisp breathing room
      const span = Math.max(W * 1.38, 1780);

      for (let r = 0; r < ARC_ROWS.length; r++) {
        const dir = ARC_ROWS[r].baseSpeed >= 0 ? 1 : -1;
        const velBoost = smoothScrollVel * 0.000012 * dir;
        rowPhase[r] = (rowPhase[r] + (ARC_ROWS[r].baseSpeed + velBoost) * dt) % 1;
      }

      if (arcVis > 0) for (const n of arcNodes) {
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

    let nearby = false;
    const syncFrames = () => {
      cancelAnimationFrame(rafId);
      if (nearby && !document.hidden) {
        lastFrame = performance.now();
        rafId = requestAnimationFrame(render);
      }
    };
    const cityVisibility = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      syncFrames();
    }, { rootMargin: "220px" });
    cityVisibility.observe(section);
    document.addEventListener("visibilitychange", syncFrames);
    return () => {
      cityVisibility.disconnect();
      document.removeEventListener("visibilitychange", syncFrames);
      cancelAnimationFrame(rafId);
      preloadLandmarks.disconnect();
      mapSize.disconnect();
      landmarkRequest.abort();
      landmarks?.dispose();
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
            <div className="skills-city-pan">
              <div className="skills-city-map">
                <canvas className="skills-city-canvas skills-city-mono" ref={monoRef} aria-hidden="true" />
                <canvas className="skills-city-canvas skills-city-color" ref={colorRef} aria-hidden="true" />
                <canvas className="skills-city-canvas skills-city-wave" ref={waveRef} aria-hidden="true" />
              </div>
            </div>
            <div className="skills-city-mist" />
          </div>

          <div className="skills-city-header" ref={cityHeaderRef}>
            <VaultSticker text="SKILLS & CAPABILITIES" />
            <h2 id="skills-heading" className="skills-city-title">
              <RippleWords text="Data pipelines with" />
              <br />
              <em>zero</em> <RippleWords text="friction" suffix={<span className="orange">.</span>} />
            </h2>
            <p className="skills-city-sub">
              Scroll to sweep through the data systems, cloud lakehouse tools, and streaming stack behind my production work. <span className="skills-pan-hint">Swipe sideways to explore the edges.</span>
            </p>
          </div>
        </div>

        {/* STAGE B: PORTFOLIO NAVY/NIGHT + HEADLINE + RIGHT EXPANDABLE CATEGORY LIST + ORBIT / VERTICAL STRING */}
        <div className="skills-orbit-layer">
          {/* VERTICAL INVISIBLE STRING TIED TO TOP-CENTER OF DESKTOP */}
          <div className="skills-vstring-overlay" aria-label="Selected category vertical skill string">
            <AnimatePresence custom={stringDir}>
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

              <AnimatePresence>
                {selectedCategory && (
                  <motion.div
                    key={selectedCategory.name}
                    className="skills-selected-panel"
                    aria-label={`${selectedCategory.name} skills`}
                    initial={reduced ? false : { opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={reduced ? undefined : { opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="skills-selected-grid">
                      {selectedCategory.items.map((item, i) => (
                        <motion.span
                          key={item}
                          className="skills-selected-chip"
                          initial={reduced ? false : { opacity: 0, y: 8, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.24,
                            delay: Math.min(i, 16) * 0.018,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {iconMap[item] && (
                            <img src={assetUrl(`assets/skills/${iconMap[item]}`)} alt="" loading="lazy" />
                          )}
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                            onClick={() => handleSelectCategory(idx)}
                          >
                            <span>{name}</span>
                            <span className="skills-cat-option-count">{items.length}</span>
                          </button>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 3-ARC ORBIT STAGE */}
          <div className="skills-stream-wrap" aria-label="Skills and capabilities orbital stream">
            <div
              className="skills-arc-stage"
              ref={arcStageRef}
              aria-hidden={Boolean(selectedCategory)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
