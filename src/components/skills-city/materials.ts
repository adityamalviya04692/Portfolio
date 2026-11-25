import * as T from "three";

function seeded(seed: number) {
  return () => {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

// One tile contains twelve floors. The smaller mip levels retain the alternating
// glass and spandrel bands when the camera pulls back from a façade.
function curtainWall() {
  const surface = typeof document === "undefined" ? new OffscreenCanvas(512, 384) : document.createElement("canvas");
  surface.width = 512;
  surface.height = 384;
  const ctx = surface.getContext("2d")!;
  const rand = seeded(407);
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 16; col++) {
      const x = col * 32,
        y = row * 32;
      const v = Math.floor(65 + rand() * 62);
      const pane = ctx.createLinearGradient(x, y, x + 10, y + 27);
      pane.addColorStop(0, `rgb(${v + 15} ${v + 36} ${v + 46})`);
      pane.addColorStop(1, `rgb(${v - 20} ${v - 2} ${v + 2})`);
      ctx.fillStyle = pane;
      ctx.fillRect(x, y, 32, 32);
      if (rand() < 0.32) {
        ctx.fillStyle = rand() < 0.35 ? "#dcb982" : "#b8b6a7";
        ctx.fillRect(x + 2, y + 2, 28, 4 + rand() * 12);
      }
      ctx.fillStyle = "#37454a";
      ctx.fillRect(x, y, 2, 32);
      ctx.fillRect(x, y + 26, 32, 4);
      ctx.fillStyle = "#dbd9ce";
      ctx.fillRect(x, y + 30, 32, 2);
    }
  }
  const tex = new T.CanvasTexture(surface);
  tex.wrapS = tex.wrapT = T.RepeatWrapping;
  tex.colorSpace = T.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export type Finish = "glazing" | "glass" | "cladding" | "metal" | "stone";

export function createMaterials() {
  const glazing = curtainWall();
  const night = { value: 0 };
  const cache = new Map<string, T.MeshStandardMaterial>();
  function get(finish: Finish, color: string) {
    const key = finish + color;
    const cached = cache.get(key);
    if (cached) return cached;
    const material = new T.MeshStandardMaterial({
      color,
      metalness: { glass: 0.36, glazing: 0.24, cladding: 0.33, metal: 0.52, stone: 0.015 }[finish],
      roughness: { glass: 0.17, glazing: 0.28, cladding: 0.39, metal: 0.34, stone: 0.84 }[finish],
    });
    if (finish === "glazing" || finish === "glass" || finish === "cladding") {
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uGlazing = { value: glazing };
        shader.uniforms.uNight = night;
        // Sample in building coordinates. Window spacing stays consistent when
        // the isometric camera and responsive lot dimensions change.
        shader.vertexShader =
          "varying vec3 vBuilding;\n" +
          shader.vertexShader.replace(
            "#include <begin_vertex>",
            "#include <begin_vertex>\n vBuilding = position;",
          );
        shader.fragmentShader =
          "varying vec3 vBuilding; uniform sampler2D uGlazing; uniform float uNight;\n" +
          shader.fragmentShader
            .replace(
              "#include <color_fragment>",
              `
            #include <color_fragment>
            vec3 n = normalize(cross(dFdx(vBuilding), dFdy(vBuilding)));
            float side = 1. - smoothstep(.32,.82,abs(n.y));
            float blend = smoothstep(.34,.84,abs(n.x));
            vec2 windowScale = vec2(13.6,13.92);
            vec3 panes = mix(texture2D(uGlazing, vBuilding.xy/windowScale).rgb,
                             texture2D(uGlazing, vBuilding.zy/windowScale).rgb, blend);
            vec3 wall = panes * (.67 + .77 * sqrt(diffuseColor.rgb)) + vec3(.016,.022,.027);
            wall += uNight * vec3(.45,.21,.055) * smoothstep(.22,.57,panes.r);
            float penumbra = .78 + .22*smoothstep(.0,.32,1.-fract(vBuilding.y/1.16));
            diffuseColor.rgb = mix(diffuseColor.rgb, wall * penumbra, ${finish === "glass" ? ".92" : finish === "cladding" ? ".0" : ".74"}*side);
            vec2 cell = abs(fract(vBuilding.xz/vec2(2.8,3.6)+.5)-.5);
            vec2 aa = max(fwidth(vBuilding.xz/vec2(2.8,3.6)),vec2(.004));
            vec2 seam = 1.-smoothstep(vec2(0.),aa+.012,cell);
            diffuseColor.rgb *= 1.-.18*max(seam.x,seam.y)*(1.-side);
          `,
            )
            .replace(
              "#include <emissivemap_fragment>",
              `
            #include <emissivemap_fragment>
            float litWindow = smoothstep(.27,.51,panes.r) * side;
            totalEmissiveRadiance += uNight * litWindow * vec3(.40,.23,.105);
            totalEmissiveRadiance += uNight * (1.-side) * diffuseColor.rgb * .085;
          `,
            );
      };
      material.customProgramCacheKey = () => "skill-landmark-" + finish;
    }
    cache.set(key, material);
    return material;
  }
  return {
    get,
    night,
    dispose() {
      cache.forEach((m) => m.dispose());
      glazing.dispose();
    },
  };
}

export type LandmarkMaterials = ReturnType<typeof createMaterials>;
