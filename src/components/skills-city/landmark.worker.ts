import { createLandmarkAtlas, type Lot } from "./landmarkAtlas";
import type { loadProfiles } from "./landmarks";

type Init = { lots: Lot[]; profiles: Awaited<ReturnType<typeof loadProfiles>> };
type Frame = { tile: number; dark: boolean };
let atlas: ReturnType<typeof createLandmarkAtlas>;

self.onmessage = async ({ data }: MessageEvent<Init | Frame>) => {
  try {
    if ("lots" in data) {
      atlas = createLandmarkAtlas(data.lots, data.profiles);
      return;
    }
    const result = await atlas.bake(data.tile, data.dark);
    self.postMessage(result, { transfer: [result.colored, result.clay] });
  } catch (error) {
    self.postMessage({ error: String(error) });
  }
};
