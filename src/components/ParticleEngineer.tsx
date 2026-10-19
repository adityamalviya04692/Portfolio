import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

/*
 * "Meet the engineer" as a particle hologram: the standing photo is sampled into ~14k
 * glowing particles that keep their real colour (with a cyan cast). Scroll drives the
 * story: particles spiral up from the platform and assemble feet-first, the figure
 * breathes and shimmers, the cursor scatters particles that spring back, and scrolling
 * on dissolves it into the platform again. Canvas-drawn; runs only while on screen.
 */

const COLS = 210; // sampling grid over the 2:3 source image
const ROWS = 315;
// Head and hair are sampled twice as densely so the face reads; the extra density fades
// out over FACE.feather so there is no visible box.
const FACE = { u0: 0.385, u1: 0.6, v1: 0.172, feather: 0.035 };
const ASPECT = 2 / 3;

type Particles = {
  n: number;
  u: Float32Array; // home position, 0–1 across/down the figure
  v: Float32Array;
  rgba: Uint32Array; // packed little-endian ABGR colour
  delay: Float32Array; // assembly order: feet first, a little randomness
  theta: Float32Array; // swirl start angle / radius / height
  rad: Float32Array;
  lift: Float32Array;
  phase: Float32Array; // shimmer phase
  ox: Float32Array; // cursor-scatter offset (springs back to 0)
  oy: Float32Array;
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function grid(img: HTMLImageElement, cols: number, rows: number) {
  const c = document.createElement("canvas");
  c.width = cols;
  c.height = rows;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, cols, rows);
  return ctx.getImageData(0, 0, cols, rows).data;
}

function sample(img: HTMLImageElement): Particles {
  // Body grid, plus a 2× grid over the face and hair.
  const cells: [number, number, number, number, number][] = []; // u, v, r, g, b
  const add = (px: Uint8ClampedArray, cols: number, rows: number, keep: (u: number, v: number) => boolean) => {
    for (let i = 0; i < cols * rows; i++) {
      const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
      if (Math.max(r, g, b) <= 10) continue;
      const u = ((i % cols) + 0.5 + (Math.random() - 0.5) * 0.6) / cols;
      const v = (((i / cols) | 0) + 0.5 + (Math.random() - 0.5) * 0.6) / rows;
      if (keep(u, v)) cells.push([u, v, r, g, b]);
    }
  };
  add(grid(img, COLS, ROWS), COLS, ROWS, () => true);
  add(grid(img, COLS * 2, ROWS * 2), COLS * 2, ROWS * 2, (u, v) => {
    const edge = Math.min(u - FACE.u0, FACE.u1 - u, FACE.v1 - v);
    return Math.random() < smooth(0, FACE.feather, edge);
  });

  const n = cells.length;
  const p: Particles = {
    n,
    u: new Float32Array(n),
    v: new Float32Array(n),
    rgba: new Uint32Array(n),
    delay: new Float32Array(n),
    theta: new Float32Array(n),
    rad: new Float32Array(n),
    lift: new Float32Array(n),
    phase: new Float32Array(n),
    ox: new Float32Array(n),
    oy: new Float32Array(n),
  };
  cells.forEach(([u, v, r, g, b], k) => {
    p.u[k] = u;
    p.v[k] = v;
    // Real colour, lifted; a cyan hologram cast mostly in the shadows so skin stays natural.
    const lum = (0.3 * r + 0.59 * g + 0.11 * b) / 255;
    const mix = Math.max(0.06, 0.45 - lum * 0.55);
    const R = Math.min(255, r * 1.15 * (1 - mix) + 90 * mix + 8);
    const G = Math.min(255, g * 1.15 * (1 - mix) + 225 * mix + 10);
    const B = Math.min(255, b * 1.15 * (1 - mix) + 255 * mix + 14);
    p.rgba[k] = ((255 << 24) | (B << 16) | (G << 8) | R) >>> 0;
    p.delay[k] = (1 - v) * 0.7 + Math.random() * 0.3;
    p.theta[k] = Math.random() * Math.PI * 2;
    p.rad[k] = 0.25 + Math.random() * 0.75;
    p.lift[k] = Math.random();
    p.phase[k] = Math.random() * Math.PI * 2;
  });
  return p;
}

export default function ParticleEngineer({
  progress,
  src,
  alt,
  reduced,
}: {
  progress: MotionValue<number>;
  src: string;
  alt: string;
  reduced: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLCanvasElement>(null);
  const glow = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = wrap.current!, cv = main.current!, gl = glow.current!;
    const ctx = cv.getContext("2d")!;
    const gctx = gl.getContext("2d")!;
    let parts: Particles | null = null;
    let visible = false, raf = 0;
    let W = 0, H = 0, dpr = 1, image: ImageData | null = null, buf: Uint32Array | null = null;
    const mouse = { x: -9999, y: -9999 };
    let glitchAt = 0;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(1, Math.round(box.clientWidth * dpr));
      H = Math.max(1, Math.round(box.clientHeight * dpr));
      cv.width = W;
      cv.height = H;
      gl.width = Math.round(W / 2);
      gl.height = Math.round(H / 2);
      image = ctx.createImageData(W, H);
      buf = new Uint32Array(image.data.buffer);
    };

    const draw = (time: number) => {
      if (!parts || !image || !buf) return;
      const t = time / 1000;
      const pr = progress.get();
      // 0 → 1 as the figure assembles, back to 0 as you scroll away.
      const a = reduced ? 1 : smooth(0.14, 0.5, pr) * (1 - smooth(0.86, 1, pr));
      // Figure box: full height, 2:3, centred.
      const fh = H * 0.98, fw = fh * ASPECT, fx = (W - fw) / 2, fy = H - fh;
      const cx = W / 2, base = H * 0.985;
      // Dots as wide as the grid spacing (a touch less) so the figure reads solid but sparkly.
      const dot = Math.max(1, Math.round((fh / ROWS) * 0.8));
      const breathe = reduced ? 0 : Math.sin(t * 1.25) * 0.9 * dpr;
      const spin = t * 0.7;
      // Every few seconds, a brief horizontal glitch band slips across the figure.
      if (!reduced && a > 0.98 && time > glitchAt) glitchAt = time + 3800 + Math.random() * 3500;
      const gBand = !reduced && glitchAt - time > 3600 ? Math.random() : -1;
      const R = 70 * dpr, R2 = R * R;
      buf.fill(0);
      const { n, u, v, rgba, delay, theta, rad, lift, phase, ox, oy } = parts;
      for (let i = 0; i < n; i++) {
        const lp = Math.min(1, Math.max(0, (a - delay[i] * 0.6) / 0.4));
        if (lp <= 0.002) continue;
        const e = lp < 0.5 ? 4 * lp * lp * lp : 1 - Math.pow(-2 * lp + 2, 3) / 2;
        // Home, with breathing above the hips and a faint shimmer.
        const upper = v[i] < 0.56 ? 1 - v[i] / 0.56 : 0;
        const shimmer = reduced ? 0 : 0.35 * dpr;
        let hx = fx + u[i] * fw + Math.sin(t * 2.1 + phase[i]) * shimmer;
        const hy = fy + v[i] * fh - breathe * upper + Math.cos(t * 1.7 + phase[i]) * shimmer;
        if (gBand >= 0 && Math.abs(v[i] - gBand) < 0.025) hx += 7 * dpr;
        // Swirl around the platform, rotating, rising as it nears home.
        const ang = theta[i] + spin + (1 - e) * 2.4;
        const sx = cx + Math.cos(ang) * rad[i] * fw * 0.75;
        const sy = base - lift[i] * fh * 0.12 + Math.sin(ang) * rad[i] * fw * 0.14;
        let x = sx + (hx - sx) * e;
        let y = sy + (hy - sy) * e;
        // Cursor scatter with spring-back.
        const dx = x - mouse.x, dy = y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2), f = (1 - d / R) * 2.6 * dpr;
          ox[i] += (dx / d) * f;
          oy[i] += (dy / d) * f;
        }
        ox[i] *= 0.9;
        oy[i] *= 0.9;
        x += ox[i];
        y += oy[i];
        const ix = x | 0, iy = y | 0;
        if (ix < 0 || iy < 0 || ix >= W - dot || iy >= H - dot) continue;
        // Flying particles glow pure cyan; they take their real colour as they land.
        const col = e > 0.85 ? rgba[i] : 0xffffe08a;
        const alpha = Math.min(255, (0.25 + 0.75 * e) * 255) << 24;
        const c = ((col & 0x00ffffff) | alpha) >>> 0;
        let o = iy * W + ix;
        for (let yy = 0; yy < dot; yy++, o += W) for (let xx = 0; xx < dot; xx++) buf[o + xx] = c;
      }
      ctx.putImageData(image, 0, 0);
      gctx.clearRect(0, 0, gl.width, gl.height);
      gctx.drawImage(cv, 0, 0, gl.width, gl.height);
    };

    const loop = (time: number) => {
      draw(time);
      raf = visible && !reduced ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf && parts && !reduced) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(box);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(box);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const img = new Image();
    img.src = src;
    img
      .decode()
      .then(() => {
        parts = sample(img);
        resize();
        if (reduced) draw(0);
        else start();
      })
      .catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [progress, src, reduced]);

  return (
    <div className="pe-stage" ref={wrap} role="img" aria-label={alt}>
      <canvas className="pe-glow" ref={glow} aria-hidden="true" />
      <canvas className="pe-main" ref={main} aria-hidden="true" />
    </div>
  );
}
