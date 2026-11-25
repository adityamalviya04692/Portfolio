import * as T from "three";
import { loadModels } from "./landmarks";
import { createMaterials } from "./materials";

type Lot = { kind: string; w: number; d: number; h: number };
const FOUNDATION = 2.8;

// Match the existing Canvas2D projection: x = .88t(gx-gy),
// y = .44t(gx+gy)-height. Each mesh is drawn into the same depth slice
// as the landmark it replaces, with its origin on the old plaza.
const elevation = Math.PI / 6;
// A small generated sky/skyline reflection captures the difference between
// reflective office glass, a satin metal roof and diffuse concrete.
function facadeEnvironment(renderer: T.WebGLRenderer) {
  const sky = document.createElement("canvas");
  sky.width = 512;
  sky.height = 256;
  const ctx = sky.getContext("2d")!;
  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  for (const [t, c] of [
    [0, "#81a9c7"],
    [0.38, "#cadfeb"],
    [0.49, "#f4e9d2"],
    [0.54, "#79827d"],
    [1, "#9e9487"],
  ] as const)
    gradient.addColorStop(t, c);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 40; i++) {
    const h = 8 + 7 * Math.sin(i * 7.49) + 4 * Math.cos(i * 3.2);
    ctx.fillStyle = i % 3 ? "#a2b1b0" : "#879aa2";
    ctx.fillRect(i * 13, 134 - h, 10, h);
  }
  const source = new T.CanvasTexture(sky);
  source.mapping = T.EquirectangularReflectionMapping;
  source.colorSpace = T.SRGBColorSpace;
  const pmrem = new T.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(source);
  pmrem.dispose();
  source.dispose();
  return env;
}

function clayPass(canvas: HTMLCanvasElement, dark: boolean) {
  const mono = document.createElement("canvas");
  mono.width = canvas.width;
  mono.height = canvas.height;
  const ctx = mono.getContext("2d")!;
  ctx.drawImage(canvas, 0, 0);
  const pixels = ctx.getImageData(0, 0, mono.width, mono.height);
  for (let i = 0; i < pixels.data.length; i += 4) {
    if (!pixels.data[i + 3]) continue;
    const luma = 0.21 * pixels.data[i] + 0.72 * pixels.data[i + 1] + 0.07 * pixels.data[i + 2];
    if (luma < 4 && pixels.data[i + 3] < 150) continue;
    // The original wave still reveals full colour. A trace of the roof colour
    // and higher night values keep landmarks legible even outside the wave.
    const tint = dark ? 0.28 : 0.2;
    const neutral = dark
      ? [76 + luma * 0.61, 91 + luma * 0.6, 112 + luma * 0.53]
      : [135 + luma * 0.49, 132 + luma * 0.49, 125 + luma * 0.51];
    for (let c = 0; c < 3; c++) pixels.data[i + c] = neutral[c] * (1 - tint) + pixels.data[i + c] * tint;
  }
  ctx.putImageData(pixels, 0, 0);
  return mono;
}

export async function createLandmarkAtlas(lots: Lot[], signal: AbortSignal) {
  const materials = createMaterials();
  const scene = new T.Scene();
  let renderer: T.WebGLRenderer | undefined;
  let environment: T.WebGLRenderTarget | undefined;
  let sun: T.DirectionalLight | undefined;
  const contact = new T.ShadowMaterial({ opacity: 0.22, depthWrite: false });
  function dispose() {
    scene.traverse((object) => {
      if (object instanceof T.Mesh) object.geometry.dispose();
    });
    materials.dispose();
    contact.dispose();
    environment?.dispose();
    sun?.shadow.dispose();
    renderer?.dispose();
    renderer?.forceContextLoss();
  }
  try {
    const models = await loadModels(materials, signal);
    for (const { root } of models) scene.add(root);
    signal.throwIfAborted();
    const surface = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer = surface;
    surface.setClearColor(0, 0);
    surface.toneMapping = T.ACESFilmicToneMapping;
    const sky = new T.HemisphereLight(0xf2f5ff, 0xbba78a, 1.52);
    surface.shadowMap.enabled = true;
    surface.shadowMap.type = T.PCFShadowMap;
    environment = facadeEnvironment(surface);
    scene.environment = environment.texture;
    const key = new T.DirectionalLight(0xffead4, 2.25);
    sun = key;
    key.position.set(-70, 150, 85);
    key.castShadow = true;
    key.shadow.mapSize.set(512, 512);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 450;
    key.shadow.bias = -0.00025;
    key.shadow.normalBias = 0.045;
    const ground = new T.Mesh(new T.PlaneGeometry(1, 1), contact);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    scene.add(sky, sun);
    const camera = new T.OrthographicCamera();
    camera.position.set(1200, 1200 * Math.SQRT2 * Math.tan(elevation), 1200);
    camera.lookAt(0, 0, 0);
    camera.near = 1;
    camera.far = 4200;
    const columns = Math.ceil(Math.sqrt(models.length));
    const rows = Math.ceil(models.length / columns);
    const order = new Map(models.map((m, i) => [m.kind, i]));
    const lotByKind = new Map(lots.map((lot) => [lot.kind, lot]));
    let cachedTile = -1,
      cachedDark = false;
    let width = 0,
      height = 0,
      baseline = 0;
    const color = document.createElement("canvas");
    let mono = document.createElement("canvas");
    const samples = 2;

    function prepare(tile: number, dark: boolean) {
      if (tile === cachedTile && dark === cachedDark) return;
      const unit = Math.SQRT2 * 0.88 * tile;
      const largestLot = Math.max(...lots.map((lot) => lot.w + lot.d));
      const margin = Math.ceil(0.22 * tile * largestLot) + 3;
      width = Math.ceil(0.88 * tile * largestLot) + 6;
      height = Math.ceil(Math.max(...lots.map((lot) => lot.h))) + 2 * margin;
      baseline = height - margin;
      const w = width * columns,
        h = height * rows;
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = baseline;
      camera.bottom = baseline - height;
      camera.updateProjectionMatrix();
      const shadowSpan = Math.max(width, height) * 0.85;
      Object.assign(key.shadow.camera, {
        left: -shadowSpan,
        right: shadowSpan,
        top: shadowSpan,
        bottom: -shadowSpan,
      });
      key.shadow.camera.updateProjectionMatrix();
      materials.night.value = dark ? 1 : 0;
      key.color.setHex(dark ? 0xbad7ff : 0xffe7c8);
      key.intensity = dark ? 2.02 : 2.55;
      sky.intensity = dark ? 1.36 : 1.68;
      scene.environmentIntensity = dark ? 0.57 : 0.91;
      surface.toneMappingExposure = dark ? 1.11 : 1.15;
      surface.setSize(samples * w, samples * h, false);
      surface.setScissorTest(true);
      for (const { root } of models) root.visible = false;
      models.forEach(({ kind, root, size, upright, elevation: raised }, index) => {
        const lot = lotByKind.get(kind);
        root.visible = !!lot;
        if (!lot) return;
        const fitX = unit * lot.w / size.x;
        const fitZ = unit * lot.d / size.z;
        const fit = Math.min(fitX, fitZ);
        const heightLimit = (lot.h - FOUNDATION) / (Math.cos(elevation) * size.y);
        root.scale.set(
          Math.min(fitX, fit * 1.15),
          Math.min(heightLimit, fit * (upright ? 1.65 : 2.45)),
          Math.min(fitZ, fit * 1.15),
        );
        // Upper galleries cantilever over their narrow street-level cores.
        // Keep the original logo aspect ratio instead of stretching it to the lot.
        if (raised) {
          const scale = tile * 1.22 / 13;
          root.scale.setScalar(Math.min(scale, (lot.h - 5) / size.y));
        }
        ground.visible = !raised;
        ground.scale.set(lot.w * unit, lot.d * unit, 1);
        const vx = (index % columns) * width * samples;
        const vy = (rows - 1 - Math.floor(index / columns)) * height * samples;
        surface.setViewport(vx, vy, width * samples, height * samples);
        surface.setScissor(vx, vy, width * samples, height * samples);
        surface.render(scene, camera);
        root.visible = false;
      });
      surface.setScissorTest(false);
      color.width = surface.domElement.width;
      color.height = surface.domElement.height;
      color.getContext("2d")!.drawImage(surface.domElement, 0, 0);
      mono = clayPass(color, dark);
      cachedTile = tile;
      cachedDark = dark;
    }
    return {
      dispose,
      sprite(kind: string, tile: number, isColor: boolean, dark: boolean) {
        const index = order.get(kind);
        if (
          index === undefined ||
          ((cachedTile !== tile || cachedDark !== dark) && surface.getContext().isContextLost())
        )
          return;
        prepare(tile, dark);
        const sx = (index % columns) * width * samples;
        const sy = Math.floor(index / columns) * height * samples;
        return (ctx: CanvasRenderingContext2D, x: number, y: number) => {
          ctx.drawImage(
            isColor ? color : mono,
            sx,
            sy,
            width * samples,
            height * samples,
            x - width / 2,
            y - baseline,
            width,
            height,
          );
          if (!isColor && models[index].elevation) {
            ctx.save();
            ctx.globalAlpha *= dark ? .62 : .45;
            ctx.drawImage(color, sx, sy, width*samples, height*samples, x-width/2, y-baseline, width, height);
            ctx.restore();
          }
        };
      },
    };
  } catch (error) {
    dispose();
    throw error;
  }
}

export type LandmarkAtlas = Awaited<ReturnType<typeof createLandmarkAtlas>>;
