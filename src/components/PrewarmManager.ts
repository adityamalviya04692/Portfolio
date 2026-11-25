/**
 * Global Prewarm Coordinator:
 * Lets heavy sections (like the 3D Skills City & landmark atlas, and key section assets)
 * report real preparation progress to the initial loading curtain so everything is decoded,
 * compiled, and baked BEFORE the visitor starts scrolling.
 */

type ProgressListener = (progress: number) => void;

const tasks = new Map<string, number>();
const listeners = new Set<ProgressListener>();
let readyResolvers: Array<() => void> = [];
let allDone = false;

function computeProgress(): number {
  if (tasks.size === 0) return 0;
  let sum = 0;
  for (const v of tasks.values()) sum += v;
  return Math.max(0, Math.min(1, sum / tasks.size));
}

function notify() {
  const p = computeProgress();
  for (const fn of listeners) fn(p);
  if (!allDone && tasks.size > 0 && p >= 0.999) {
    allDone = true;
    const resolvers = readyResolvers;
    readyResolvers = [];
    for (const r of resolvers) r();
  }
}

export function registerPrewarmTask(name: string) {
  if (!tasks.has(name)) {
    tasks.set(name, 0);
    allDone = false;
  }
}

export function updatePrewarmTask(name: string, progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  const prev = tasks.get(name) ?? 0;
  if (clamped > prev || !tasks.has(name)) {
    tasks.set(name, clamped);
    notify();
  }
}

export function completePrewarmTask(name: string) {
  updatePrewarmTask(name, 1);
}

export function subscribePrewarm(listener: ProgressListener): () => void {
  listeners.add(listener);
  listener(computeProgress());
  return () => {
    listeners.delete(listener);
  };
}

export function waitForPrewarm(timeoutMs = 4200): Promise<void> {
  if (allDone && tasks.size > 0) return Promise.resolve();
  return new Promise((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve();
    };
    const timer = window.setTimeout(done, timeoutMs);
    readyResolvers.push(done);
  });
}

/**
 * Decodes an array of image URLs in parallel so they are already rasterized in
 * Chrome's image cache before the visitor scrolls to them.
 */
export async function predecodeImages(urls: string[], onStep?: (fraction: number) => void) {
  if (urls.length === 0) {
    onStep?.(1);
    return;
  }
  let finished = 0;
  await Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.src = url;
          const finish = () => {
            finished += 1;
            onStep?.(finished / urls.length);
            resolve();
          };
          if (img.decode) {
            img.decode().then(finish, finish);
          } else {
            img.onload = finish;
            img.onerror = finish;
          }
        }),
    ),
  );
}
