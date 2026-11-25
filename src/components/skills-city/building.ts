import * as T from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Finish, LandmarkMaterials } from "./materials";

// Horizontal sections of a logo façade, including the voids. A floor only
// spans occupied space: it cannot cross an eye, a courtyard, or a skybridge.
export function spans(shape: T.Shape, y: number) {
  const cuts: number[] = [];
  for (const loop of [shape, ...shape.holes]) {
    const pts = loop.getPoints();
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i],
        b = pts[(i + 1) % pts.length];
      if (a.y > y === b.y > y) continue;
      cuts.push(a.x + ((b.x - a.x) * (y - a.y)) / (b.y - a.y));
    }
  }
  cuts.sort((a, b) => a - b);
  const intervals: [number, number][] = [];
  for (let i = 1; i < cuts.length; i += 2) intervals.push([cuts[i - 1], cuts[i]]);
  return intervals;
}

export function roundedPlan(w: number, d: number, r: number) {
  const s = new T.Shape(),
    x = w / 2,
    z = d / 2;
  s.moveTo(-x + r, -z);
  s.lineTo(x - r, -z);
  s.quadraticCurveTo(x, -z, x, -z + r);
  s.lineTo(x, z - r);
  s.quadraticCurveTo(x, z, x - r, z);
  s.lineTo(-x + r, z);
  s.quadraticCurveTo(-x, z, -x, z - r);
  s.lineTo(-x, -z + r);
  s.quadraticCurveTo(-x, -z, -x + r, -z);
  return s;
}

export class Building {
  readonly group = new T.Group();
  constructor(private materials: LandmarkMaterials) {}

  add(g: T.BufferGeometry, finish: Finish, color: string) {
    this.group.add(new T.Mesh(g, this.materials.get(finish, color)));
  }

  box(x: number, y: number, z: number, w: number, h: number, d: number, finish: Finish, color: string) {
    const g = new T.BoxGeometry(w, h, d);
    g.translate(x, y + h / 2, z);
    this.add(g, finish, color);
  }

  plan(
    shape: T.Shape,
    base: number,
    height: number,
    finish: Finish,
    color: string,
    scale = 1,
    centre = new T.Vector2(),
  ) {
    const g = new T.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, curveSegments: 7 });
    g.scale(scale, scale, 1);
    g.rotateX(Math.PI / 2);
    g.translate(centre.x * (1 - scale), base + height, centre.y * (1 - scale));
    this.add(g, finish, color);
  }

  facade(shape: T.Shape, depth: number, top: number, front: number, finish: Finish, color: string) {
    const g = new T.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 7 });
    g.rotateX(Math.PI);
    g.translate(0, top, front);
    this.add(g, finish, color);
  }

  drum(x: number, y: number, z: number, r: number, h: number, finish: Finish, color: string) {
    const g = new T.CylinderGeometry(r, r, h, 48);
    g.translate(x, y + h / 2, z);
    this.add(g, finish, color);
  }

  // Locate the actual street-facing wall, then align the door, canopy, stair
  // and two supporting columns to its tangent. Curved wings get a curved-wall
  // entrance too; the porch never floats at the bounding-box edge.
  entrance(width: number) {
    this.group.updateMatrixWorld(true);
    const ray = new T.Raycaster();
    let best: { point: T.Vector3; normal: T.Vector3; score: number } | undefined;
    for (const fraction of [-0.18, 0.08, 0.27, -0.36, 0]) {
      ray.set(new T.Vector3(width * fraction, 0.83, 24), new T.Vector3(0, 0, -1));
      const hit = ray.intersectObjects(this.group.children, false)[0];
      if (!hit?.face) continue;
      const normal = hit.face.normal.clone();
      const score = normal.z - 0.09 * Math.abs(fraction);
      if (normal.z > 0.5 && (!best || score > best.score)) best = { point: hit.point, normal, score };
    }
    if (!best) return;
    const yaw = Math.atan2(best.normal.x, best.normal.z);
    const bay = Math.min(4.4, width * 0.34);
    const element = (
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      d: number,
      finish: Finish,
      color: string,
    ) => {
      const g = new T.BoxGeometry(w, h, d);
      g.translate(x, y + h * 0.5, z);
      g.rotateY(yaw);
      g.translate(best!.point.x, 0, best!.point.z);
      this.add(g, finish, color);
    };
    element(0, 0.02, 0.6, bay + 0.68, 0.12, 1.75, "stone", "#b8b0a0");
    element(0, 0.14, 0.42, bay + 0.45, 0.13, 1.42, "stone", "#d9cebc");
    element(0, 0.27, 0.18, bay, 0.98, 0.65, "glass", "#517487");
    for (const x of [-0.45, 0, 0.45]) element(x * bay, 0.27, 0.52, 0.09, 1.15, 0.08, "metal", "#c8b8a0");
    element(0, 1.44, 0.49, bay + 0.65, 0.18, 1.3, "metal", "#e1d5bd");
    for (const sign of [-1, 1])
      element(sign * (bay / 2 - 0.14), 0.26, 1.01, 0.1, 1.19, 0.12, "metal", "#9c9f98");
  }

  // Draw all repeats of the same finish together when baking the city layers.
  finish() {
    const groups = new Map<T.Material, T.BufferGeometry[]>();
    for (const child of [...this.group.children]) {
      const mesh = child as T.Mesh<T.BufferGeometry, T.Material>;
      let g = mesh.geometry;
      if (g.index) {
        const indexed = g;
        g = indexed.toNonIndexed();
        indexed.dispose();
      }
      g.clearGroups();
      const batch = groups.get(mesh.material) ?? [];
      batch.push(g);
      groups.set(mesh.material, batch);
      this.group.remove(child);
    }
    for (const [m, parts] of groups) {
      const merged = mergeGeometries(parts)!;
      const mesh = new T.Mesh(merged, m);
      mesh.castShadow = mesh.receiveShadow = true;
      this.group.add(mesh);
      parts.forEach((g) => g.dispose());
    }
    return this.group;
  }
}
