import type { Lot, BakedAtlas, createLandmarkAtlas } from "./landmarkAtlas";
import { loadProfiles } from "./landmarks";

export async function createLandmarkCache(
  lots: Lot[],
  signal: AbortSignal,
  onReady: (dark: boolean) => void,
) {
  const profiles = await loadProfiles(signal);
  signal.throwIfAborted();
  let worker: Worker | undefined;
  let local: ReturnType<typeof createLandmarkAtlas> | undefined;
  let activeTile = 0;
  const atlases: { light?: BakedAtlas; dark?: BakedAtlas } = {};
  const wanted: { light: boolean; dark: boolean } = { light: false, dark: false };
  let priorityDark = false;
  let busy = false;
  let failed = false;

  const close = (atlas?: BakedAtlas) => {
    atlas?.colored.close();
    atlas?.clay.close();
  };

  const clearAll = () => {
    close(atlases.light);
    close(atlases.dark);
    atlases.light = undefined;
    atlases.dark = undefined;
  };

  const nextTheme = (): boolean | undefined => {
    const first = priorityDark;
    const second = !priorityDark;
    const key1 = first ? "dark" : "light";
    if (wanted[key1] && atlases[key1]?.tile !== activeTile) return first;
    const key2 = second ? "dark" : "light";
    if (wanted[key2] && atlases[key2]?.tile !== activeTile) return second;
    return undefined;
  };

  const accept = (frame: BakedAtlas) => {
    busy = false;
    if (!signal.aborted && frame.tile === activeTile) {
      const key = frame.dark ? "dark" : "light";
      close(atlases[key]);
      atlases[key] = frame;
      onReady(frame.dark);
    } else {
      close(frame);
    }
    void pump();
  };

  async function pump() {
    if (busy || failed || signal.aborted || activeTile <= 0) return;
    const dark = nextTheme();
    if (dark === undefined) return;
    busy = true;
    const size = { tile: activeTile, dark };
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
      busy = false;
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
    clearAll();
  }, { once: true });

  return {
    request(tile: number, dark: boolean, prioritize = true) {
      if (tile <= 0) return;
      if (activeTile !== tile) {
        activeTile = tile;
        clearAll();
      }
      if (prioritize) priorityDark = dark;
      const key = dark ? "dark" : "light";
      wanted[key] = true;
      if (atlases[key]?.tile === tile) return;
      void pump();
    },
    has(tile: number, dark: boolean) {
      const atlas = dark ? atlases.dark : atlases.light;
      return Boolean(atlas && atlas.tile === tile);
    },
    sprite(kind: string, tile: number, isColor: boolean, dark: boolean) {
      const atlas = dark ? atlases.dark : atlases.light;
      if (!atlas || atlas.tile !== tile) return;
      const { colored, clay, models, width, height, samples, columns, baseline } = atlas;
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
