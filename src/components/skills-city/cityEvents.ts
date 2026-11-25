/**
 * 27 Living City Micro-Events & Dense Tree-Canopy Pedestal Groves
 * Every event is bucketed by its exact isometric depth (gx + gy) and rendered
 * inside its matching depth band BEFORE foreground building slices — guaranteeing
 * true 3D occlusion so small objects always pass behind taller buildings in front of them!
 */

export type IsoFn = (x: number, y: number, z?: number) => [number, number];
export type BandFn = (depth: number) => number;

// 4 dense multi-tree pedestal groves where walkers visibly stroll UNDERNEATH elevated leafy canopies
const CANOPY_GROVES = [
  { gx: -2.95, gy: 1.02, w: 0.72, d: 0.54, trees: [[-0.24, -0.14], [0.02, -0.18], [0.24, -0.1], [-0.16, 0.14], [0.14, 0.16], [0.0, 0.02], [-0.28, 0.04], [0.26, 0.06]] },
  { gx: 2.95, gy: -1.02, w: 0.72, d: 0.54, trees: [[-0.22, -0.16], [0.05, -0.14], [0.25, -0.08], [-0.18, 0.12], [0.12, 0.16], [-0.02, 0.0], [0.24, 0.12]] },
  { gx: -1.35, gy: 2.88, w: 0.68, d: 0.52, trees: [[-0.22, -0.12], [0.04, -0.15], [0.22, -0.08], [-0.14, 0.14], [0.16, 0.14], [0.0, 0.02]] },
  { gx: 4.95, gy: 2.88, w: 0.68, d: 0.52, trees: [[-0.22, -0.14], [0.02, -0.14], [0.22, -0.06], [-0.15, 0.12], [0.14, 0.14], [0.0, 0.0]] },
];

function drawMiniPerson(
  ctx: CanvasRenderingContext2D,
  iso: IsoFn,
  x: number,
  y: number,
  z0: number,
  coat: string,
  bob: number,
  isColor: boolean,
  isDark: boolean,
  hat = false,
) {
  const foot = iso(x, y, z0);
  const body = iso(x, y, z0 + 4.2 + bob);
  const head = iso(x, y, z0 + 7.1 + bob);
  ctx.beginPath();
  ctx.ellipse(foot[0] + 0.8, foot[1] + 0.4, 2.0, 1.0, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(15, 23, 42, 0.22)";
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(foot[0], foot[1]);
  ctx.lineTo(body[0], body[1]);
  ctx.strokeStyle = isColor ? coat : isDark ? "#64748b" : "#94a3b8";
  ctx.lineWidth = 2.4;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(head[0], head[1], 1.65, 0, Math.PI * 2);
  ctx.fillStyle = isColor ? (hat ? "#102b79" : "#f2bd83") : "#cbd5e1";
  ctx.fill();
}

function drawCanopyCrown(
  ctx: CanvasRenderingContext2D,
  iso: IsoFn,
  x: number,
  y: number,
  zBase: number,
  isColor: boolean,
  isDark: boolean,
  scale = 1.05,
) {
  const trunkTop = iso(x, y, zBase + 9.5 * scale);
  ctx.beginPath();
  ctx.arc(trunkTop[0] + 2.4 * scale, trunkTop[1] - 0.8 * scale, 5.6 * scale, 0, Math.PI * 2);
  ctx.fillStyle = isColor ? (isDark ? "#1c563f" : "#27734d") : isDark ? "#28324a" : "#cbd5e1";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(trunkTop[0] - 2.1 * scale, trunkTop[1] - 2.4 * scale, 5.3 * scale, 0, Math.PI * 2);
  ctx.fillStyle = isColor ? (isDark ? "#2c7a59" : "#3f9c6a") : isDark ? "#33405c" : "#dde3ec";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(trunkTop[0] - 0.8 * scale, trunkTop[1] - 4.4 * scale, 3.6 * scale, 0, Math.PI * 2);
  ctx.fillStyle = isColor ? (isDark ? "#46a379" : "#74c69d") : isDark ? "#425170" : "#eef2f6";
  ctx.fill();
}

/**
 * Draws only the city micro-events whose isometric depth falls into `band`.
 * Called INSIDE the depth-sorted painter loop BEFORE `sliceCanvases[band]`,
 * so every small object is cleanly occluded by taller buildings in front of it!
 */
export function drawCityMicroEventsForBand(
  ctx: CanvasRenderingContext2D,
  iso: IsoFn,
  tile: number,
  isColor: boolean,
  isDark: boolean,
  time: number,
  band: number,
  depthToBand: BandFn,
) {
  const t = time * 0.001;

  // 1 & 26. DENSE TREE-CANOPY PEDESTAL GROVES (walkers pass underneath tree crowns!)
  for (let gi = 0; gi < CANOPY_GROVES.length; gi++) {
    const g = CANOPY_GROVES[gi];
    if (depthToBand(g.gx + g.gy) !== band) continue;

    const p0 = iso(g.gx - g.w * 0.5, g.gy - g.d * 0.5, 0);
    const p1 = iso(g.gx + g.w * 0.5, g.gy - g.d * 0.5, 0);
    const p2 = iso(g.gx + g.w * 0.5, g.gy + g.d * 0.5, 0);
    const p3 = iso(g.gx - g.w * 0.5, g.gy + g.d * 0.5, 0);
    ctx.beginPath();
    ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.lineTo(...p2); ctx.lineTo(...p3); ctx.closePath();
    ctx.fillStyle = isColor ? (isDark ? "#1e4536" : "#4f9a6e") : isDark ? "#1c243a" : "#e5e0d4";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(...iso(g.gx - g.w * 0.48, g.gy + 0.04, 0.4));
    ctx.lineTo(...iso(g.gx + g.w * 0.48, g.gy - 0.04, 0.4));
    ctx.strokeStyle = isColor ? (isDark ? "#2d3a54" : "#ece5d5") : "#d6d0c4";
    ctx.lineWidth = 4.5;
    ctx.stroke();

    for (const [dx, dy] of g.trees) {
      const base = iso(g.gx + dx, g.gy + dy, 0.4);
      const top = iso(g.gx + dx, g.gy + dy, 9.8);
      ctx.beginPath(); ctx.moveTo(...base); ctx.lineTo(...top);
      ctx.strokeStyle = isColor ? "#6b4423" : "#94a3b8";
      ctx.lineWidth = 1.7;
      ctx.stroke();
    }

    if (gi === 0 || gi === 2) {
      const b0 = iso(g.gx - 0.08, g.gy + 0.14, 0.6);
      const b1 = iso(g.gx + 0.12, g.gy + 0.14, 0.6);
      const b2 = iso(g.gx + 0.12, g.gy + 0.24, 0.6);
      const b3 = iso(g.gx - 0.08, g.gy + 0.24, 0.6);
      ctx.beginPath();
      ctx.moveTo(...b0); ctx.lineTo(...b1); ctx.lineTo(...b2); ctx.lineTo(...b3); ctx.closePath();
      ctx.fillStyle = isColor ? "#e85d4a" : "#cbd5e1";
      ctx.fill();
      drawMiniPerson(ctx, iso, g.gx - 0.02, g.gy + 0.18, 0.8, "#102b79", 0, isColor, isDark);
      drawMiniPerson(ctx, iso, g.gx + 0.06, g.gy + 0.19, 0.8, "#f5c418", 0, isColor, isDark);
    }

    const walkCoats = ["#ed8838", "#38bdf8", "#f5c418", "#e25241", "#ffffff"];
    for (let w = 0; w < 4; w++) {
      const frac = ((t * (0.12 + w * 0.03) + w * 0.27 + gi * 0.19) % 1) * 2 - 1;
      const wx = g.gx + frac * (g.w * 0.42);
      const wy = g.gy + Math.sin(frac * 3 + w) * 0.08;
      const bob = Math.abs(Math.sin(t * 7 + w * 2)) * 1.4;
      drawMiniPerson(ctx, iso, wx, wy, 0.5, walkCoats[(w + gi) % walkCoats.length], bob, isColor, isDark, w % 2 === 0);
    }

    for (let ti = 0; ti < g.trees.length; ti++) {
      const [dx, dy] = g.trees[ti];
      drawCanopyCrown(ctx, iso, g.gx + dx, g.gy + dy, 0.4, isColor, isDark, 0.96 + (ti % 3) * 0.12);
    }
  }

  // 2. AVENUE TRAFFIC JAM on ROAD_Y[2] (gy = 1.75) approaching intersection gx = -2.15
  const jamCars = [-4.05, -3.66, -3.28, -2.9, -2.54];
  const jamCols = ["#e0523c", "#f2bd83", "#2d3e70", "#f4f0e6", "#ed8838"];
  const inch = Math.sin(t * 1.4) * 0.035;
  for (let i = 0; i < jamCars.length; i++) {
    const cx = jamCars[i] + inch;
    const cy = 1.75 + 0.095;
    if (depthToBand(cx + cy) !== band) continue;
    const p = iso(cx, cy, 2.2);
    ctx.beginPath();
    ctx.ellipse(p[0], p[1] + 1.5, 5.2, 2.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15,23,42,0.26)";
    ctx.fill();
    ctx.fillStyle = isColor ? jamCols[i] : "#cbd5e1";
    ctx.fillRect(p[0] - 4.2, p[1] - 2.6, 8.4, 4.4);
    if (isColor) {
      const brake = iso(cx - 0.1, cy, 2.2);
      ctx.beginPath();
      ctx.arc(brake[0], brake[1], 1.7, 0, Math.PI * 2);
      ctx.fillStyle = "#ff2e2e";
      ctx.fill();
    }
    if (i === 2) {
      const hornCycle = (t * 0.9) % 2.4;
      if (hornCycle < 0.7 && isColor) {
        const hp = iso(cx, cy, 7.5);
        ctx.beginPath();
        ctx.arc(hp[0], hp[1], 2.5 + hornCycle * 9, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 180, 60, ${(1 - hornCycle / 0.7).toFixed(2)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
  }

  // 3. STREET MUSICIAN / BUSKER & LISTENING CROWD (gx=-3.42, gy=2.86)
  if (depthToBand(-3.42 + 2.86) === band) {
    const bx = -3.42;
    const by = 2.86;
    drawMiniPerson(ctx, iso, bx, by, 0.5, "#e04f3d", Math.abs(Math.sin(t * 6)) * 1.2, isColor, isDark, true);
    if (isColor) {
      const n1 = iso(bx, by, 10 + ((t * 14) % 9));
      ctx.fillStyle = "#f5c418";
      ctx.beginPath(); ctx.arc(n1[0], n1[1], 1.5, 0, Math.PI * 2); ctx.fill();
    }
    [-0.8, -0.35, 0.1, 0.55, 1.0, 1.45].forEach((a, i) => {
      drawMiniPerson(
        ctx,
        iso,
        bx + Math.cos(a) * 0.24,
        by + Math.sin(a) * 0.22,
        0.5,
        ["#102b79", "#ed8838", "#4b7b8b", "#569674", "#b78152", "#7c5cbf"][i],
        Math.abs(Math.sin(t * 4.5 + i)) * 0.9,
        isColor,
        isDark,
      );
    });
  }

  // 4. OUTDOOR ART / TECH EXHIBITION DISPLAYS WITH SPECTATORS VIEWING (gx=1.45, gy=2.85)
  if (depthToBand(1.45 + 2.85) === band) {
    const exX = 1.45;
    const exY = 2.85;
    [-0.22, 0.0, 0.22].forEach((dx, i) => {
      const b0 = iso(exX + dx, exY - 0.12, 0.5);
      const t0 = iso(exX + dx, exY - 0.12, 9.5);
      ctx.beginPath(); ctx.moveTo(...b0); ctx.lineTo(...t0);
      ctx.strokeStyle = isColor ? "#52525b" : "#94a3b8"; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.fillStyle = isColor ? ["#38bdf8", "#ed8838", "#4ade80"][i] : "#e2e8f0";
      ctx.fillRect(t0[0] - 4, t0[1] - 3.5, 8, 5.5);
      ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 0.7; ctx.strokeRect(t0[0] - 4, t0[1] - 3.5, 8, 5.5);
      drawMiniPerson(ctx, iso, exX + dx - 0.06, exY + 0.12, 0.5, ["#102b79", "#d9534f", "#569674"][i], Math.sin(t * 2 + i) * 0.3, isColor, isDark);
      drawMiniPerson(ctx, iso, exX + dx + 0.07, exY + 0.15, 0.5, ["#ed8838", "#4b7b8b", "#f5c418"][i], Math.cos(t * 2 + i) * 0.3, isColor, isDark, true);
    });
  }

  // 5. ANIMATED CONVERSATION CIRCLES (people talking with pulsing speech dots)
  const talkSpots: Array<[number, number]> = [
    [-1.4, -1.25],
    [1.45, -1.2],
    [-4.8, 1.3],
    [4.6, -1.25],
  ];
  talkSpots.forEach(([tx, ty], si) => {
    if (depthToBand(tx + ty) !== band) return;
    drawMiniPerson(ctx, iso, tx - 0.07, ty, 0.2, "#102b79", Math.abs(Math.sin(t * 3.5 + si)) * 0.6, isColor, isDark);
    drawMiniPerson(ctx, iso, tx + 0.07, ty + 0.03, 0.2, "#ed8838", Math.abs(Math.cos(t * 3.5 + si)) * 0.6, isColor, isDark, true);
    if (isColor && Math.sin(t * 2.4 + si * 1.7) > 0.15) {
      const sp = iso(tx, ty, 10.5);
      ctx.fillStyle = "rgba(255, 252, 240, 0.9)";
      ctx.beginPath(); ctx.ellipse(sp[0], sp[1], 3.8, 2.2, 0, 0, Math.PI * 2); ctx.fill();
    }
  });

  // 6 & 7. BUS STOP SHELTER, BOARDING QUEUE & RUSHING COMMUTER SPRINTING FOR THE BUS
  if (depthToBand(1.05 + -1.42) === band) {
    const bsX = 1.05;
    const bsY = -1.42;
    const sh = iso(bsX, bsY, 7.5);
    ctx.fillStyle = isColor ? "rgba(56, 189, 248, 0.55)" : "#cbd5e1";
    ctx.fillRect(sh[0] - 6, sh[1] - 2.5, 12, 3.2);
    for (let q = 0; q < 4; q++) {
      drawMiniPerson(ctx, iso, bsX - 0.16 + q * 0.09, bsY + 0.06, 0.2, ["#4b7b8b", "#102b79", "#ed8838", "#569674"][q], 0.3, isColor, isDark);
    }
  }
  {
    const rushFrac = (t * 0.42) % 1;
    const rx = 1.05 + 0.95 - rushFrac * 0.72;
    const ry = -1.34;
    if (depthToBand(rx + ry) === band) {
      drawMiniPerson(ctx, iso, rx, ry, 0.2, "#e04f3d", Math.abs(Math.sin(t * 15)) * 2.4, isColor, isDark);
    }
  }

  // 8. STREET FOOD MARKET QUEUE & RISING STEAM WISPS (gx=-1.05, gy=4.92)
  if (depthToBand(-1.05 + 4.92) === band) {
    const mx = -1.05;
    const my = 4.92;
    for (let s = 0; s < 3; s++) {
      const st = iso(mx + (s - 1) * 0.24, my - 0.08, 7.5);
      ctx.fillStyle = isColor ? ["#ed8838", "#e25241", "#f5c418"][s] : "#cbd5e1";
      ctx.fillRect(st[0] - 4.5, st[1] - 2, 9, 3.2);
      const steamY = st[1] - 3 - ((t * 9 + s * 4) % 7);
      ctx.beginPath(); ctx.arc(st[0], steamY, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.fill();
      drawMiniPerson(ctx, iso, mx + (s - 1) * 0.24, my + 0.12, 0.3, ["#102b79", "#569674", "#7c5cbf"][s], 0.5, isColor, isDark);
    }
  }

  // 9. RIVERSIDE FERRY DOCK BOARDING & TANDEM KAYAKS / ROWING CREW ON THE CANAL
  if (depthToBand(1.06 + 4.58) === band) {
    for (let k = 0; k < 5; k++) {
      drawMiniPerson(ctx, iso, 0.9 + k * 0.08, 4.58, 0.4, ["#ed8838", "#38bdf8", "#102b79", "#f5c418", "#569674"][k], Math.abs(Math.sin(t * 3 + k)) * 0.5, isColor, isDark);
    }
  }
  [
    { base: -6.0, y: 3.82, speed: 0.58, col: "#f5c418" },
    { base: 3.5, y: 4.18, speed: -0.52, col: "#ff5c4d" },
  ].forEach((ky, ki) => {
    const kx = ((((ky.base + t * ky.speed) + 14) % 28) + 28) % 28 - 14;
    if (depthToBand(kx + ky.y) !== band) return;
    const kp = iso(kx, ky.y, 1.2);
    ctx.beginPath();
    ctx.ellipse(kp[0], kp[1], 6.5, 1.9, -0.42, 0, Math.PI * 2);
    ctx.fillStyle = isColor ? ky.col : "#cbd5e1";
    ctx.fill();
    const oar = Math.sin(t * 6.5 + ki * 2) * 3.2;
    ctx.beginPath();
    ctx.moveTo(kp[0] - 2, kp[1] - 1);
    ctx.lineTo(kp[0] - 5 + oar, kp[1] + 2.5);
    ctx.moveTo(kp[0] + 2, kp[1] - 1);
    ctx.lineTo(kp[0] + 5 - oar, kp[1] - 3.2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.0;
    ctx.stroke();
  });

  // 10. CANAL BRIDGE PHOTOGRAPHERS / SIGHTSEERS WITH OCCASIONAL CAMERA FLASH
  [-2.15, 2.15].forEach((rx, bi) => {
    const px = rx + 0.24;
    const py = 4.02;
    if (depthToBand(px + py) !== band) return;
    drawMiniPerson(ctx, iso, px, py, 3.6, bi === 0 ? "#e25241" : "#38bdf8", 0.2, isColor, isDark, true);
    drawMiniPerson(ctx, iso, px, py + 0.12, 3.6, "#102b79", 0.2, isColor, isDark);
    const flash = (t * 0.7 + bi * 1.4) % 3.5;
    if (flash < 0.14 && isColor) {
      const fp = iso(px, py, 9.5);
      ctx.beginPath(); ctx.arc(fp[0], fp[1], 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.92)"; ctx.fill();
    }
  });

  // 11. RIVERSIDE ANGLERS / FISHERMEN ON THE NORTH CANAL BANK
  [-3.8, -0.7, 3.2].forEach((fx, fi) => {
    if (depthToBand(fx + 3.44) !== band) return;
    drawMiniPerson(ctx, iso, fx, 3.44, 0.4, "#4b7b8b", 0, isColor, isDark, true);
    const rod = iso(fx, 3.44, 6.2);
    const bobber = iso(fx + 0.08, 3.72, 0.8 + Math.sin(t * 4 + fi) * 0.6);
    ctx.beginPath(); ctx.moveTo(...rod); ctx.lineTo(...bobber);
    ctx.strokeStyle = "rgba(255,255,255,0.6)"; ctx.lineWidth = 0.75; ctx.stroke();
    if (isColor) {
      ctx.beginPath(); ctx.arc(bobber[0], bobber[1], 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5c4d"; ctx.fill();
    }
  });

  // 12. WATERFRONT LANTERN STRING ALONG CANAL PROMENADE
  if (isColor) {
    for (let lx = -5.2; lx <= 5.2; lx += 0.65) {
      if (Math.abs(lx - -2.15) < 0.5 || Math.abs(lx - 2.15) < 0.5) continue;
      if (depthToBand(lx + 3.48) !== band) continue;
      const lp = iso(lx, 3.48, 8.2 + Math.sin(lx * 3 + t * 2) * 0.4);
      ctx.beginPath();
      ctx.arc(lp[0], lp[1], isDark ? 2.1 : 1.3, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "#ffcf70" : "#ed8838";
      ctx.fill();
    }
  }

  // 13. OPEN-AIR PLAZA CINEMA / PUBLIC SCREEN WITH SEATED AUDIENCE (gx=-4.45, gy=-1.12)
  if (depthToBand(-4.45 + -1.12) === band) {
    const cx = -4.45;
    const cy = -1.12;
    const sL = iso(cx - 0.24, cy - 0.15, 2.0);
    const sR = iso(cx + 0.24, cy - 0.15, 2.0);
    const sRT = iso(cx + 0.24, cy - 0.15, 14.5);
    const sLT = iso(cx - 0.24, cy - 0.15, 14.5);
    ctx.beginPath();
    ctx.moveTo(...sL); ctx.lineTo(...sR); ctx.lineTo(...sRT); ctx.lineTo(...sLT); ctx.closePath();
    const screenHue = Math.sin(t * 1.6) > 0 ? "#60a5fa" : "#fbbf24";
    ctx.fillStyle = isColor ? (isDark ? screenHue : "#1e293b") : "#cbd5e1";
    ctx.fill();
    ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.0; ctx.stroke();
    for (let r = 0; r < 2; r++) {
      for (let c = -2; c <= 2; c++) {
        drawMiniPerson(ctx, iso, cx + c * 0.1, cy + 0.12 + r * 0.11, 0.2, ["#ed8838", "#38bdf8", "#f5c418", "#4ade80", "#e25241"][(c + 2 + r) % 5], 0, isColor, isDark);
      }
    }
  }

  // 14. PARK YOGA / TAI-CHI SYNCHRONIZED GROUP (gx=4.85, gy=1.08)
  if (depthToBand(4.85 + 1.08) === band) {
    const yx = 4.85;
    const yy = 1.08;
    const stretch = Math.sin(t * 2.2) * 1.4;
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      drawMiniPerson(ctx, iso, yx + Math.cos(a) * 0.22, yy + Math.sin(a) * 0.18, 0.4, "#4ade80", Math.max(0, stretch), isColor, isDark);
    }
  }

  // 15. WATERFRONT JOGGERS / RUNNERS LOOP
  for (let j = 0; j < 4; j++) {
    const jx = ((((j * 6.5 + t * 1.35) + 13) % 26) + 26) % 26 - 13;
    const jy = j % 2 === 0 ? 3.36 : 4.62;
    if (depthToBand(jx + jy) !== band) continue;
    drawMiniPerson(ctx, iso, jx, jy, 0.3, "#ff5c4d", Math.abs(Math.sin(t * 13 + j)) * 2.3, isColor, isDark);
  }

  // 16 & 21. AVENUE CYCLISTS & DELIVERY SCOOTERS
  for (let c = 0; c < 5; c++) {
    const pos = ((((c * 5.8 + t * (1.8 + (c % 2) * 0.9)) + 14) % 28) + 28) % 28 - 14;
    const cy = c % 2 === 0 ? -1.75 + 0.19 : 1.75 - 0.19;
    if (depthToBand(pos + cy) !== band) continue;
    const bp = iso(pos, cy, 1.5);
    ctx.beginPath();
    ctx.arc(bp[0] - 2.2, bp[1] + 1, 1.5, 0, Math.PI * 2);
    ctx.arc(bp[0] + 2.2, bp[1] + 1, 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = isColor ? "#1e293b" : "#94a3b8"; ctx.lineWidth = 1.0; ctx.stroke();
    drawMiniPerson(ctx, iso, pos, cy, 1.2, c % 2 === 0 ? "#ed8838" : "#38bdf8", 0.3, isColor, isDark, true);
  }

  // 17. DOG WALKERS ON CANAL PROMENADE
  [-4.5, 2.8].forEach((dx0, di) => {
    const wx = ((((dx0 + t * 0.42) + 12) % 24) + 24) % 24 - 12;
    const wy = di === 0 ? 3.4 : 4.64;
    if (depthToBand(wx + wy) !== band) return;
    drawMiniPerson(ctx, iso, wx, wy, 0.3, "#569674", Math.abs(Math.sin(t * 6 + di)) * 1.2, isColor, isDark);
    const dog = iso(wx + 0.16, wy, 1.2 + Math.abs(Math.sin(t * 12 + di)) * 1.4);
    const hand = iso(wx, wy, 4.2);
    ctx.beginPath(); ctx.moveTo(...hand); ctx.lineTo(...dog);
    ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 0.7; ctx.stroke();
    ctx.beginPath(); ctx.arc(dog[0], dog[1], 1.4, 0, Math.PI * 2);
    ctx.fillStyle = isColor ? "#b78152" : "#cbd5e1"; ctx.fill();
  });

  // 18. BALLOON & FLOWER STREET CART (gx=-0.95, gy=1.35)
  if (depthToBand(-0.95 + 1.35) === band) {
    const cart = iso(-0.95, 1.35, 3.2);
    ctx.fillStyle = isColor ? "#ed8838" : "#cbd5e1";
    ctx.fillRect(cart[0] - 4, cart[1] - 2.5, 8, 4.5);
    ["#ff5c4d", "#f5c418", "#38bdf8", "#ec4899"].forEach((col, bi) => {
      const bx = cart[0] - 4 + bi * 2.8 + Math.sin(t * 2.4 + bi) * 1.2;
      const by = cart[1] - 11 - (bi % 2) * 3 + Math.cos(t * 2.1 + bi) * 1.0;
      ctx.beginPath(); ctx.moveTo(cart[0], cart[1] - 2); ctx.lineTo(bx, by);
      ctx.strokeStyle = "rgba(255,255,255,0.6)"; ctx.lineWidth = 0.6; ctx.stroke();
      ctx.beginPath(); ctx.arc(bx, by, 2.1, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? col : "#e2e8f0"; ctx.fill();
    });
    drawMiniPerson(ctx, iso, -0.82, 1.42, 0.2, "#7c5cbf", 0.4, isColor, isDark);
  }

  // 19. WATERFRONT CAFE PATIO DINERS (gx=-4.96, gy=3.28)
  if (depthToBand(-4.96 + 3.28) === band) {
    [-5.1, -4.82].forEach((ux, ui) => {
      const u = iso(ux, 3.28, 7.2);
      ctx.beginPath(); ctx.arc(u[0], u[1], 4.2, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? (ui === 0 ? "#ed8838" : "#38bdf8") : "#cbd5e1"; ctx.fill();
      drawMiniPerson(ctx, iso, ux - 0.08, 3.32, 0.4, "#102b79", 0, isColor, isDark);
      drawMiniPerson(ctx, iso, ux + 0.08, 3.34, 0.4, "#d9534f", 0, isColor, isDark);
    });
  }

  // 20. ROADWORK / CONSTRUCTION CREW WITH CONES & FLASHING BEACON (gx=2.42, gy=-4.65)
  if (depthToBand(2.42 + -4.65) === band) {
    const wx = 2.42;
    const wy = -4.65;
    [-0.14, 0.0, 0.14].forEach((dy) => {
      const cp = iso(wx, wy + dy, 0.8);
      ctx.beginPath(); ctx.arc(cp[0], cp[1], 1.7, 0, Math.PI * 2);
      ctx.fillStyle = isColor ? "#ff6b1a" : "#cbd5e1"; ctx.fill();
    });
    drawMiniPerson(ctx, iso, wx + 0.14, wy, 0.3, "#f5c418", Math.abs(Math.sin(t * 5)) * 0.9, isColor, isDark, true);
    if (isColor && Math.sin(t * 8) > 0) {
      const bp = iso(wx, wy - 0.18, 5.0);
      ctx.beginPath(); ctx.arc(bp[0], bp[1], 3.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 174, 38, 0.85)"; ctx.fill();
    }
  }

  // 22. ANIMATED PLAZA FOUNTAIN WATER SPRAY (pond center gx=3.85, gy=2.65)
  if (isColor && depthToBand(3.85 + 2.65) === band) {
    const fp = iso(3.85, 2.65, 3.2);
    for (let d = 0; d < 6; d++) {
      const p = (t * 1.4 + d * 0.17) % 1;
      const ang = (d / 6) * Math.PI * 2;
      const sx = fp[0] + Math.cos(ang) * p * 7;
      const sy = fp[1] - Math.sin(p * Math.PI) * 9 + p * 2;
      ctx.beginPath(); ctx.arc(sx, sy, 1.25, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(224, 247, 255, 0.85)"; ctx.fill();
    }
  }

  // 23. SKATEBOARDERS CARVING ON PLAZA (gx=-1.22, gy=-0.92)
  {
    const skX = -1.22 + Math.sin(t * 2.1) * 0.24;
    const skY = -0.92 + Math.cos(t * 1.4) * 0.12;
    if (depthToBand(skX + skY) === band) {
      drawMiniPerson(ctx, iso, skX, skY, 0.8, "#f5c418", Math.abs(Math.sin(t * 4.2)) * 1.5, isColor, isDark, true);
    }
  }

  // 24. TOUR GUIDE WITH BRIGHT ORANGE FLAG LEADING TOURISTS (gy = -1.75 - 0.28)
  {
    const gx = ((((t * 0.36) + 12) % 24) + 24) % 24 - 12;
    const gy = -1.75 - 0.28;
    if (depthToBand(gx + gy) === band) {
      drawMiniPerson(ctx, iso, gx, gy, 0.2, "#ed8838", Math.abs(Math.sin(t * 6)) * 1.2, isColor, isDark, true);
      const flagBot = iso(gx, gy, 5.5);
      const flagTop = iso(gx, gy, 13.5);
      ctx.beginPath(); ctx.moveTo(...flagBot); ctx.lineTo(...flagTop);
      ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.0; ctx.stroke();
      ctx.fillStyle = isColor ? "#ff6b1a" : "#e2e8f0";
      ctx.fillRect(flagTop[0], flagTop[1], 5.5, 3.2);
      for (let k = 1; k <= 4; k++) {
        drawMiniPerson(ctx, iso, gx - k * 0.14, gy + (k % 2 === 0 ? 0.04 : -0.04), 0.2, ["#38bdf8", "#569674", "#7c5cbf", "#f5c418"][k - 1], Math.abs(Math.sin(t * 6 - k)) * 1.1, isColor, isDark);
      }
    }
  }

  // 25. EMERGENCY AMBULANCE / PATROL VEHICLE WITH FLASHING RED & BLUE LIGHTBAR (cruising gx = 2.15)
  {
    const ey = ((((t * 1.9) + 14) % 28) + 28) % 28 - 14;
    const ex = 2.15 - 0.095;
    if (depthToBand(ex + ey) === band) {
      const ez = ey > 3.45 && ey < 4.55 ? 3.8 : 0.8;
      const ep = iso(ex, ey, ez + 3.2);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(ep[0] - 4.2, ep[1] - 2.6, 8.4, 4.8);
      if (isColor) {
        const redOn = Math.floor(time / 180) % 2 === 0;
        ctx.beginPath();
        ctx.arc(ep[0], ep[1] - 3.6, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = redOn ? "rgba(255, 48, 48, 0.88)" : "rgba(56, 152, 255, 0.88)";
        ctx.fill();
      }
    }
  }

  void tile;
}
