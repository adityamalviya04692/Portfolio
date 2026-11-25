import * as T from "three";
import { Building, roundedPlan, spans } from "./building";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import type { LandmarkMaterials } from "./materials";

type Section = { path: number; color: string; depth: number; lift?: number; front?: number };
type Campus = {
  kind: string;
  file: string;
  width: number;
  upright?: boolean;
  elevation?: boolean;
  usePrimitives?: boolean;
  stretch?: number;
  sections: Section[];
};
const part = (path: number, color: string, depth: number, lift = 0, front = 0): Section => ({
  path,
  color,
  depth,
  lift,
  front,
});

// Dimensions are in scene units. Paths are indexed in the portfolio's own SVGs.
// A single shared bounding box keeps the eyes, openings and interlocking parts
// registered, including marks supplied alongside a wider wordmark.
const campuses: Campus[] = [
  // Architectural 3D logo-shaped buildings matching the other 20 iconic landmarks.
  { kind: "logo_devops", file: "azure-devops", width: 13.6, upright: true, sections: [part(0, "#087cd0", 4.6)] },
  { kind: "logo_pytest", file: "pytest", width: 13.2, upright: true, sections: [part(0, "#0a9edc", 4.5)] },
  {
    kind: "logo_vault",
    file: "azure-key-vault",
    width: 13.6,
    usePrimitives: true,
    sections: [
      part(0, "#1c82d8", 4.6),
      part(1, "#eef3f6", 4.2),
      part(2, "#f8b818", 0.24),
      part(3, "#df8208", 0.28),
      part(4, "#df8208", 0.28),
      part(5, "#df8208", 0.28),
    ],
  },
  { kind: "logo_mysql", file: "mysql", width: 13.8, upright: true, sections: [part(0, "#0096b8", 4.6), part(1, "#00758f", 4.6)] },
  { kind: "logo_sonar", file: "sonarqube", width: 13.4, upright: true, sections: [part(1, "#158bc7", 4.6)] },
  {
    kind: "logo_functions",
    file: "google-cloud-functions",
    width: 13.6,
    usePrimitives: true,
    sections: [
      part(1, "#347deb", 4.6),
      part(3, "#f8fafc", 0.24),
      part(4, "#f8fafc", 0.24),
      part(5, "#f8fafc", 0.24),
      part(6, "#f8fafc", 0.24),
      part(7, "#f8fafc", 0.24),
    ],
  },
  // 6 additional distinct architectural logo buildings for the expanded right & left city districts
  {
    kind: "logo_synapse",
    file: "azure-synapse-analytics",
    width: 13.8,
    sections: [part(0, "#0078d4", 4.6), part(1, "#005ba1", 0.22), part(2, "#43d4f0", 0.26)],
  },
  {
    kind: "logo_apim",
    file: "azure-api-management",
    width: 13.8,
    upright: true,
    usePrimitives: true,
    sections: [part(0, "#1ea4cc", 4.6), part(1, "#8c62d4", 4.8, 0, 0.35)],
  },
  {
    kind: "logo_eventhubs",
    file: "azure-event-hubs",
    width: 13.4,
    upright: true,
    sections: [
      part(0, "#6db828", 4.5),
      part(1, "#86d633", 4.6, 0, 0.2),
      part(2, "#5ea620", 4.5, 0, 0.1),
      part(7, "#7f8c9a", 4.2, 0, -0.15),
    ],
  },
  {
    kind: "logo_unity",
    file: "unity-catalog",
    width: 14.4,
    usePrimitives: true,
    sections: [
      part(0, "#38bdf8", 5.2),
      part(1, "#f5b400", 4.2),
      part(2, "#f5b400", 4.2),
      part(3, "#f5b400", 4.2),
      part(4, "#f5b400", 4.2),
      part(5, "#f5b400", 4.2),
      part(6, "#f5b400", 4.2),
      part(7, "#ec388c", 3.6),
      part(8, "#ec388c", 3.6),
      part(9, "#ec388c", 3.6),
      part(10, "#ec388c", 3.6),
      part(11, "#ec388c", 3.6),
      part(12, "#ec388c", 3.6),
    ],
  },
  {
    kind: "logo_adls",
    file: "adls-gen2",
    width: 13.4,
    upright: true,
    sections: [
      part(0, "#cbd2d9", 4.4),
      part(1, "#2db8a8", 4.6, 0, 0.16),
      part(2, "#f4f7f8", 4.5, 0, 0.26),
      part(3, "#37c2b1", 4.5, 0, 0.3),
      part(4, "#217e73", 4.5, 0, 0.34),
    ],
  },
  {
    kind: "logo_blob",
    file: "azure-blob-storage",
    width: 13.4,
    upright: true,
    sections: [
      part(0, "#2eb6d8", 4.5),
      part(1, "#0078d4", 4.6, 0, 0.16),
      part(2, "#f48c20", 4.6, 0, 0.28),
      part(3, "#f5f7f9", 4.5, 0, 0.36),
    ],
  },
  {
    kind: "logo_adf",
    file: "azure-data-factory-adf",
    width: 14.0,
    upright: true,
    sections: [
      part(0, "#1698ce", 4.6),
      part(1, "#38bde8", 4.4, 0, 0.22),
      part(2, "#e3edf0", 4.4, 0, 0.29),
      part(3, "#77def2", 4.4, 0, 0.32),
    ],
  },
  {
    kind: "logo_copilot",
    file: "github-copilot",
    width: 14.3,
    upright: true,
    sections: [part(0, "#b284ed", 4.4)],
  },
  { kind: "logo_git", file: "git", width: 13.4, sections: [part(0, "#ec6542", 4.2)] },
  {
    kind: "logo_vscode",
    file: "vs-code",
    width: 13.5,
    upright: true,
    sections: [part(1, "#2788c9", 4.8), part(2, "#279fdb", 4.8, 0, 0.22), part(3, "#53b9ee", 5.0, 0, 0.35)],
  },
  {
    kind: "logo_python",
    file: "python",
    width: 14.9,
    sections: [part(0, "#3075a8", 5.6), part(1, "#ffca39", 4.4)],
  },
  { kind: "logo_chatgpt", file: "chatgpt", width: 13.1, sections: [part(0, "#eeeae0", 2.85)] },
  { kind: "logo_claude", file: "claude", width: 15.8, sections: [part(0, "#ce6943", 4.65)] },
  { kind: "logo_docker", file: "docker", width: 14.8, upright: true, sections: [part(0, "#168dd2", 5.6)] },
  {
    kind: "logo_azure",
    file: "azure-portal",
    width: 12.1,
    upright: true,
    sections: [part(0, "#127db6", 5.2), part(1, "#289ad5", 4.8, 0, 0.32), part(3, "#249cda", 5.5, 0, 0.36)],
  },
  {
    kind: "logo_powerbi",
    file: "power-bi",
    width: 10.9,
    upright: true,
    sections: [part(0, "#d39709", 4.5, 0, -2.2), part(4, "#f0b416", 4.0), part(5, "#ffcf32", 3.6, 0, 2.15)],
  },
  { kind: "logo_spark", file: "apache-spark", width: 14.7, sections: [part(0, "#df6027", 5.1)] },
  {
    kind: "logo_redis",
    file: "redis-cache",
    width: 15,
    stretch: 1.85,
    sections: [
      part(5, "#9c2b32", 1.32),
      part(5, "#bc3237", 1.32, 2.38),
      part(5, "#d44943", 1.32, 4.76),
      part(6, "#f3e6cd", 0.18, 6.08),
      part(7, "#74292e", 0.18, 6.08),
      part(8, "#a82b2f", 0.18, 6.08),
    ],
  },
  {
    kind: "logo_databricks",
    file: "azure-databricks",
    width: 14.6,
    stretch: 1.65,
    sections: [part(2, "#a63728", 1.25), part(1, "#e15337", 1.25, 2.35), part(2, "#ee694b", 1.25, 4.7)],
  },
  {
    kind: "logo_airflow",
    file: "apache-airflow",
    width: 14,
    sections: [
      part(0, "#037bce", 3.9),
      part(1, "#069452", 4),
      part(3, "#04aeb9", 4.1),
      part(5, "#d84e40", 4.2),
    ],
  },
  {
    kind: "logo_gcp",
    file: "google-cloud-platform-gcp",
    width: 13.5,
    upright: true,
    sections: [
      part(0, "#e65545", 4.25),
      part(1, "#4489da", 4.25),
      part(2, "#31a15c", 4.25),
      part(3, "#f6b742", 4.25),
    ],
  },
  { kind: "logo_delta", file: "delta-lake", width: 12.8, upright: true, sections: [part(1, "#1babc3", 4.2)] },
  { kind: "logo_gemini", file: "google-gemini", width: 14.2, sections: [part(0, "#8595e7", 4.5)] },
  { kind: "logo_fastapi", file: "fastapi", width: 12.7, sections: [part(0, "#139f8d", 4.6)] },
  { kind: "logo_kafka", file: "apache-kafka", width: 10.6, sections: [part(0, "#414b58", 5.2)] },
  {
    kind: "logo_postgres",
    file: "postgresql",
    width: 13.5,
    sections: [part(1, "#3a6b8c", 4.12), part(2, "#e8e1cf", 0.14, 4.12), part(3, "#dedcca", 0.14, 4.12)],
  },
];

export async function loadModels(materials: LandmarkMaterials, signal: AbortSignal) {
  const loader = new SVGLoader();
  const profiles = await Promise.all(
    campuses.map(async (campus) => {
      const response = await fetch(`${import.meta.env.BASE_URL}assets/skills/${campus.file}.svg`, { signal });
      if (!response.ok) throw new Error(`City profile ${campus.file}: ${response.status}`);
      const xml = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
      const paths = xml.querySelectorAll(campus.elevation || campus.usePrimitives ? "path,circle,rect,polygon" : "path");
      const sections = campus.sections.map(({ path }) => {
        const original = paths[path];
        // Extract native outlines only. SVG masks, gradient filters and the text in
        // combined wordmarks have no role in the geometry.
        const node = original.cloneNode(false) as Element;
        node.setAttribute("fill", "#fff");
        
        return loader
          .parse(`<svg xmlns="http://www.w3.org/2000/svg">${new XMLSerializer().serializeToString(node)}</svg>`)
          .paths[0].toShapes();
      });
      return sections;
    }),
  );
  signal.throwIfAborted();
  return campuses.map((campus, i) => makeModel(campus, profiles[i], materials));
}

function makeModel(campus: Campus, groups: T.Shape[][], materials: LandmarkMaterials) {
  const b = new Building(materials);
  const { file, width, upright = false, stretch = 1 } = campus;
  const bounds = new T.Box2();
  groups.flat().forEach((shape) => shape.getPoints(8).forEach((p) => bounds.expandByPoint(p)));
  const centre = bounds.getCenter(new T.Vector2());
  const scale = width / (bounds.max.x - bounds.min.x);
  const halfHeight = 0.5 * (bounds.max.y - bounds.min.y) * scale * stretch;
  if (campus.elevation) {
    // A continuous coloured front skin preserves fine strokes at street-map scale.
    // The deep returns are glazed. Small SVG details sit proud of the front skin.
    if (file === "mysql" || file === "sonarqube") {
      // A recessed glazed hall carries the fine dolphin outline and sonar ribs.
      // Its curved perimeter follows the outermost points of the actual mark.
      const vertices=groups.flat().flatMap(sh=>sh.getPoints(10)).sort((a,b)=>a.x-b.x || a.y-b.y);
      const chain=(points:T.Vector2[])=>{
        const result:T.Vector2[]=[];
        for(const p of points){
          while(result.length>1){
            const a=result[result.length-2], c=result[result.length-1];
            if((c.x-a.x)*(p.y-a.y)-(c.y-a.y)*(p.x-a.x)>0) break;
            result.pop();
          }
          result.push(p);
        }
        return result.slice(0,-1);
      };
      const hull=[...chain(vertices),...chain([...vertices].reverse())];
      const glazing=new T.Shape(hull.map(v=>new T.Vector2((v.x-centre.x)*scale*.91,(v.y-centre.y)*scale*.91)));
      b.facade(glazing,2.1,halfHeight,-.48,"glass","#c8d8da");
    }
    const front = campus.sections[0].depth / 2;
    groups.forEach((shapes, i) => {
      const section=campus.sections[i];
      for (const source of shapes) {
        const points=(p:T.Path)=>p.getPoints(12).map(v=>new T.Vector2((v.x-centre.x)*scale,(v.y-centre.y)*scale));
        const shape=new T.Shape(points(source));
        shape.holes=source.holes.map(h=>new T.Path(points(h)));
        const face=front+i*.065;
        b.facade(shape,section.depth,halfHeight,face,"glass","#89afb9");
        b.facade(shape,.08,halfHeight,face+.085,"cladding",section.color);
      }
    });
    const model=b.finish();
    model.rotation.order="YXZ";
    model.rotation.set(-.26,Math.PI/4-.09,0,"YXZ");
    const envelope=new T.Box3().setFromObject(model,true);
    const c=envelope.getCenter(new T.Vector3());
    model.position.set(-c.x,-envelope.min.y,-c.z);
    const root=new T.Group();root.add(model);
    return {kind:campus.kind,root,size:envelope.getSize(new T.Vector3()),upright:true,elevation:true};
  }
  const stacked = file === "redis-cache" || file === "azure-databricks";
  const terminal = file === "docker";
  const radial = file === "claude" || file === "google-gemini";
  const knot = file === "chatgpt";
  let base = 0;

  if (knot) {
    // Rounded, six-sided office terraces step back around a tall atrium.
    const terrace = new T.Shape();
    const vertices = Array.from(
      { length: 6 },
      (_, i) => new T.Vector2(7.7 * Math.cos((i * Math.PI) / 3), 7.7 * Math.sin((i * Math.PI) / 3)),
    );
    vertices.forEach((a, i) => {
      const v = vertices[(i + 1) % 6],
        next = vertices[(i + 2) % 6];
      const mid = a.clone().lerp(v, 0.5),
        start = a.clone().lerp(v, 0.7),
        end = v.clone().lerp(next, 0.3);
      if (!i) terrace.moveTo(mid.x, mid.y);
      terrace.lineTo(start.x, start.y);
      terrace.quadraticCurveTo(v.x, v.y, end.x, end.y);
    });
    terrace.closePath();
    const atrium = new T.Path();
    atrium.absarc(0, 0, 1.55, 0, Math.PI * 2, true);
    terrace.holes.push(atrium);
    for (let i = 0; i < 5; i++) {
      const size = 1.0 - i * 0.037;
      b.plan(terrace, i * 1.1, 1.1, "glass", "#adc4c1", size - 0.046);
      b.plan(terrace, i * 1.1 + 0.89, 0.21, "stone", "#e7e3d8", size);
    }
    base = 5.5;
  } else if (radial) {
    // Thin coloured spokes are roof cantilevers. Occupied rooms sit inside
    // the glazed rotunda below; the slender outer tips don't become rooms.
    const radius = width * (file === "claude" ? 0.371 : 0.335);
    for (let i = 0; i < 3; i++) {
      b.drum(0, i * 1.1, 0, radius - i * 0.14, 1.1, "glass", file === "claude" ? "#97ada9" : "#a3b6cd");
      b.drum(0, i * 1.1 + 0.89, 0, radius + 0.19 - i * 0.14, 0.21, "stone", "#d4cbb9");
    }
    base = 3.3;
  } else if (upright) {
    // The façade starts at the first occupied floor, on a glazed concourse.
    // Each terminal gets its own length, depth and corner radius.
    const concourse = roundedPlan(
      width * (terminal ? 0.9 : 0.77),
      terminal ? 6.8 : 5.8,
      terminal ? 0.43 : 1.22,
    );
    base = terminal ? 2.15 : 1.64;
    b.plan(concourse, 0, base, "glass", "#8ca7aa", 0.96);
    b.plan(concourse, base - 0.23, 0.23, "stone", "#d0c9bc");
    if (terminal) {
      for (const x of [-3.9, -1.45, 1.0]) {
        b.box(x, 0.12, 3.3, 1.72, 1.43, 0.14, "metal", "#597383");
        for (let j = 0; j < 4; j++) b.box(x, 0.34 + j * 0.28, 3.39, 1.57, 0.055, 0.055, "metal", "#c4cbca");
        b.box(x, 0.1, 3.6, 1.9, 0.16, 0.57, "stone", "#a8a29a");
      }
      // Bearing wall behind the curved hull seats the container offices.
      b.box(-0.85, base, 0, 7.4, 2.05, 4.3, "glass", "#719097");
    }
  }

  groups.forEach((raw, index) => {
    const part = campus.sections[index];
    const color = part.color,
      lift = part.lift ?? 0,
      front = part.front ?? 0;
    const midY =
      file === "azure-databricks"
        ? new T.Box2().setFromPoints(raw.flatMap((s) => s.getPoints(8))).getCenter(new T.Vector2()).y
        : centre.y;
    const outline = (path: T.Path) =>
      path.getPoints(8).map((p) => new T.Vector2((p.x - centre.x) * scale, (p.y - midY) * scale * stretch));

    raw.forEach((source, piece) => {
      const shape = new T.Shape(outline(source));
      shape.holes = source.holes.map((h) => new T.Path(outline(h)));
      const box = new T.Box2().setFromPoints(shape.getPoints());
      const mid = box.getCenter(new T.Vector2());
      const trim = new T.Color(color).lerp(new T.Color("#e2daca"), 0.68);
      const fascia = "#" + trim.getHexString();
      if (part.depth < 0.3) {
        const mainRoof = stacked ? (campus.sections[2].lift ?? 0) * 1.3 + 3.03 : 4 * 1.16 + 0.38;
        b.plan(shape, mainRoof, part.depth, "metal", color);
        return;
      }
      if (upright) {
        const top = base + halfHeight + lift;
        const face = front + part.depth * 0.5;
        const container = terminal && piece > 0;
        b.facade(shape, part.depth, top, face, container ? "metal" : "glazing", color);
        if (container) {
          // The container offices have corrugated end walls, bright corner
          // castings and a visible window. Their beams span the logo's gaps.
          const dx = box.max.x - box.min.x,
            dy = box.max.y - box.min.y;
          for (let j = 1; j <= 5; j++)
            b.box(
              box.min.x + (dx * j) / 6,
              top - box.max.y + 0.1,
              face + 0.025,
              0.055,
              dy - 0.2,
              0.085,
              "metal",
              "#74b8d7",
            );
          b.box(mid.x, top - mid.y - 0.25, face + 0.072, dx * 0.56, 0.48, 0.12, "glass", "#8bb7c5");
          b.box(mid.x, top - box.max.y - 0.29, front, dx * 0.75, 0.32, part.depth * 0.74, "metal", "#3a5f70");
          return;
        }
        // Section the true silhouette at every storey. Slab edges and recessed
        // bands stop at interior voids and follow both sides of the Azure A.
        for (let floor = base + 1.16; floor < top - box.min.y - 0.23; floor += 1.16) {
          for (const [a, c] of spans(shape, top - floor)) {
            if (c - a < 0.36) continue;
            b.box((a + c) / 2, floor, front, c - a - 0.06, 0.14, part.depth + 0.24, "stone", fascia);
          }
        }
        for (const loop of [shape, ...shape.holes]) {
          const points = loop.getPoints();
          if (!points[0].equals(points[points.length - 1])) points.push(points[0].clone());
          const rim = SVGLoader.pointsToStroke(
            points,
            SVGLoader.getStrokeStyle(0.38, "#fff", "round", "round"),
            4,
          );
          if (!rim) continue;
          const indices: number[] = [];
          for (let j = 0; j < rim.getAttribute("position").count; j += 3) indices.push(j + 2, j + 1, j);
          rim.setIndex(indices);
          rim.computeVertexNormals();
          rim.rotateX(Math.PI);
          rim.translate(0, top, face + 0.17);
          b.add(rim, "metal", color);
        }
        if (file === "power-bi") {
          const roof = top - box.min.y;
          b.box(mid.x, roof, front, 1.4, 0.27, 1.1, "stone", "#d5c6a1");
          b.box(mid.x, roof + 0.27, front, 1.13, 0.1, 0.85, "metal", "#73909c");
        }
        return;
      }

      if (stacked) {
        // Every red plate shelters a full glazed storey. The glass is recessed
        // at the perimeter so that the stacked trademark reads in silhouette.
        const level = lift * 1.3;
        b.plan(shape, level, 2.18, "glass", "#839ca2", 0.84, mid);
        b.plan(shape, level + 1.97, 0.18, "stone", "#bba698", 0.92, mid);
        b.plan(shape, level + 2.15, 0.88, "metal", color, 1, mid);
        if (index < 2) b.plan(shape, level + 3.03, 0.15, "stone", "#d4c0b4", 0.96, mid);
        return;
      }

      const levelBase = base + lift;
      const floors = radial ? 1 : knot ? 2 : file === "python" && index === 0 ? 5 : 4;
      const step = radial ? 0.64 : knot ? 0.76 : 1.16;
      const stepped = file === "python" || file === "apache-spark" || file === "postgresql";
      for (let i = 0; i < floors; i++) {
        const setback = stepped ? 1 - i * 0.016 : 1;
        b.plan(shape, levelBase + i * step, step, "glass", "#9caeb3", setback * 0.936, mid);
        b.plan(shape, levelBase + (i + 1) * step - 0.2, 0.2, "stone", fascia, setback, mid);
      }
      const roof = levelBase + floors * step;
      const thickness = radial ? 0.54 : 0.38;
      b.plan(shape, roof, thickness, "cladding", color, 1, mid);
      // Shallow skylights have a frame, tinted panes and a central glazing bar.
      // Test the whole skylight footprint so it cannot bridge an eye or atrium.
      if (!knot && !radial && file !== "postgresql") {
        const rows = [mid.y, mid.y - 0.24 * (box.max.y - box.min.y), mid.y + 0.24 * (box.max.y - box.min.y)];
        for (const y of rows) {
          const run = spans(shape, y).sort((a, c) => c[1] - c[0] - (a[1] - a[0]))[0];
          if (!run || run[1] - run[0] < 2.8) continue;
          const x = run[0] + (run[1] - run[0]) * 0.42;
          if (![y - 0.56, y + 0.56].every((v) => spans(shape, v).some(([a, c]) => x - 0.9 > a && x + 0.9 < c)))
            continue;
          b.box(x, roof + thickness, y, 1.82, 0.19, 1.05, "stone", "#c6c2b3");
          b.box(x, roof + thickness + 0.19, y, 1.62, 0.1, 0.87, "metal", "#567884");
          b.box(x, roof + thickness + 0.29, y, 0.095, 0.045, 0.87, "metal", "#cfcec2");
          break;
        }
      }
    });
  });
  if (radial) {
    b.drum(0, base + 1.18, 0, file === "claude" ? 0.9 : 1.18, 0.17, "metal", "#cbb9a6");
    b.drum(0, base + 1.35, 0, file === "claude" ? 0.74 : 1.0, 0.18, "glass", "#769aa3");
  }
  b.entrance(width);
  const model = b.finish();
  // The three long façades follow the long axis of their infill parcels.
  const frontage: Record<string, number> = { logo_pytest: 1.51, logo_devops: 0, logo_vault: 0.3, logo_mysql: 0.03, logo_sonar: 1.54, logo_functions: 0.25, logo_synapse: 0.28, logo_apim: 0.05, logo_eventhubs: 0.05, logo_unity: 0.26, logo_adls: 1.51, logo_blob: 1.51, logo_adf: 1.51, logo_copilot: 1.49, logo_vscode: 0.06 };
  model.rotation.y = frontage[campus.kind] ?? Math.PI / 4 - 0.46;
  const envelope = new T.Box3().setFromObject(model, true);
  const center3 = envelope.getCenter(new T.Vector3());
  model.position.set(-center3.x, -envelope.min.y, -center3.z);
  const root = new T.Group();
  root.add(model);
  return { kind: campus.kind, root, size: envelope.getSize(new T.Vector3()), upright };
}
