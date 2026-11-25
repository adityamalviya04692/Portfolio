import type { Lot, BakedAtlas, createLandmarkAtlas } from "./landmarkAtlas";
import { loadProfiles } from "./landmarks";

export async function createLandmarkCache(lots: Lot[], signal: AbortSignal, onReady: () => void) {
  const profiles = await loadProfiles(signal);
  signal.throwIfAborted();
  let worker: Worker | undefined;
  let local: ReturnType<typeof createLandmarkAtlas> | undefined;
  let current: BakedAtlas | undefined;
  let pending: { tile: number; dark: boolean } | undefined;
  let busy = false;
  let failed = false;
  const close = (atlas?: BakedAtlas) => {
    atlas?.colored.close();
    atlas?.clay.close();
  };
  const accept = (frame: BakedAtlas) => {
    busy = false;
    if (!signal.aborted && pending?.tile === frame.tile && pending.dark === frame.dark) {
      close(current);
      current = frame;
      onReady();
    } else close(frame);
    void pump();
  };
  async function pump() {
    if (busy || failed || signal.aborted || !pending ||
        (current?.tile === pending.tile && current.dark === pending.dark)) return;
    busy = true;
    const size = pending;
    if (worker) {
      worker.postMessage(size);
      return;
    }
    try {
      const { createLandmarkAtlas } = await import("./landmarkAtlas");
      if (signal.aborted) return;
      local ??= createLandmarkAtlas(lots, profiles);
      accept(await local.bake(size.tile, size.dark));
    } catch (error) {
      failed = true;
      console.warn("Using canvas landmark models", error);
    }
  }
  const fallback = () => {
    worker?.terminate();
    worker = undefined;
    busy = false;
    void pump();
  };
  if (typeof OffscreenCanvas !== "undefined" && typeof Worker !== "undefined") {
    try {
      worker = new Worker(new URL("./landmark.worker.ts", import.meta.url), { type: "module" });
      worker.onmessage = ({ data }) => { if ("error" in data) fallback(); else accept(data); };
      worker.onerror = fallback;
      worker.postMessage({ lots, profiles });
    } catch { fallback(); }
  }
  signal.addEventListener("abort", () => {
    worker?.terminate();
    local?.dispose();
    close(current);
  }, { once: true });
  return {
    request(tile: number, dark: boolean) {
      if (pending?.tile === tile && pending.dark === dark) return;
      pending = { tile, dark };
      void pump();
    },
    sprite(kind: string, tile: number, isColor: boolean, dark: boolean) {
      if (!current || current.tile !== tile || current.dark !== dark) return;
      const { colored, clay, models, width, height, samples, columns, baseline } = current;
      const index = models.findIndex(model => model.kind === kind);
      if (index < 0) return;
      const sx = (index % columns) * width * samples;
      const sy = Math.floor(index / columns) * height * samples;
      return (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const draw = (sheet: ImageBitmap) => ctx.drawImage(sheet, sx, sy, width * samples,
          height * samples, x - width / 2, y - baseline, width, height);
        draw(isColor ? colored : clay);
        if (!isColor && models[index].raised) {
          ctx.save();
          ctx.globalAlpha *= dark ? .62 : .45;
          draw(colored);
          ctx.restore();
        }
      };
    },
  };
}
export type LandmarkAtlas = Awaited<ReturnType<typeof createLandmarkCache>>;
