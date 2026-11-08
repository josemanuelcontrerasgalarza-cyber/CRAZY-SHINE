import type { Silhouette } from "@/content/types";

type Pt = [number, number];

interface Spec {
  profile: Pt[];
  glass: Pt[];
  wheels: [number, number];
  r: number;
}

/** Generic, unbranded side profiles drawn on a 1000×360 canvas. Ground line at y = 300. */
const specs: Record<Silhouette, Spec> = {
  muscle: {
    profile: [[72, 282], [66, 240], [86, 212], [200, 199], [400, 187], [520, 133], [640, 129], [780, 158], [880, 180], [922, 190], [932, 236], [926, 282]],
    glass: [[428, 184], [524, 141], [630, 138], [744, 165], [752, 181]],
    wheels: [232, 758],
    r: 50,
  },
  coupe: {
    profile: [[92, 282], [84, 248], [110, 223], [260, 207], [400, 191], [500, 142], [600, 129], [700, 141], [820, 190], [900, 214], [918, 248], [912, 282]],
    glass: [[424, 188], [506, 147], [600, 137], [678, 149], [736, 182]],
    wheels: [245, 770],
    r: 50,
  },
  classic: {
    profile: [[80, 282], [76, 234], [92, 214], [320, 204], [382, 200], [452, 149], [640, 145], [722, 196], [900, 204], [922, 222], [924, 282]],
    glass: [[460, 197], [474, 156], [628, 152], [698, 196]],
    wheels: [235, 765],
    r: 44,
  },
  sedan: {
    profile: [[78, 282], [72, 240], [92, 214], [300, 200], [390, 192], [500, 139], [680, 135], [790, 178], [905, 192], [928, 222], [926, 282]],
    glass: [[412, 190], [506, 145], [674, 141], [768, 179]],
    wheels: [238, 768],
    r: 50,
  },
  gt: {
    profile: [[80, 282], [74, 246], [100, 223], [300, 207], [480, 189], [570, 141], [660, 135], [760, 161], [880, 197], [922, 213], [928, 282]],
    glass: [[497, 186], [579, 147], [660, 141], [744, 167], [758, 184]],
    wheels: [240, 790],
    r: 50,
  },
  suv: {
    profile: [[80, 282], [76, 216], [100, 182], [300, 167], [362, 161], [432, 106], [790, 101], [880, 131], [920, 162], [924, 282]],
    glass: [[384, 158], [442, 114], [780, 109], [858, 150], [860, 160]],
    wheels: [240, 770],
    r: 55,
  },
  hatch: {
    profile: [[100, 282], [96, 228], [120, 205], [300, 193], [342, 189], [442, 129], [740, 125], [850, 161], [880, 201], [884, 282]],
    glass: [[362, 186], [450, 135], [730, 131], [828, 166], [834, 184]],
    wheels: [250, 740],
    r: 46,
  },
};

const f = (n: number) => Math.round(n * 10) / 10;

/** Catmull-Rom → cubic Bézier through the given points (open curve). */
function smooth(points: Pt[], tension = 0.35) {
  let d = "";
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1: Pt = [p1[0] + ((p2[0] - p0[0]) * tension) / 2, p1[1] + ((p2[1] - p0[1]) * tension) / 2];
    const c2: Pt = [p2[0] - ((p3[0] - p1[0]) * tension) / 2, p2[1] - ((p3[1] - p1[1]) * tension) / 2];
    d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

export const GROUND = 300;

export function buildSilhouette(kind: Silhouette) {
  const s = specs[kind];
  const sill = 282;
  const cy = GROUND - s.r;
  const R = s.r + 11;
  const dx = Math.sqrt(R * R - (sill - cy) ** 2);
  const [front, rear] = s.wheels;
  const first = s.profile[0];
  const last = s.profile[s.profile.length - 1];

  const body =
    `M${first[0]},${first[1]}` +
    smooth(s.profile) +
    ` L${f(rear + dx)},${sill} A${R},${R} 0 1 0 ${f(rear - dx)},${sill}` +
    ` L${f(front + dx)},${sill} A${R},${R} 0 1 0 ${f(front - dx)},${sill} Z`;

  const g = s.glass;
  const glass = `M${g[0][0]},${g[0][1]}` + smooth([...g, g[0]], 0.2) + " Z";

  // Shoulder line: follows the profile ~18px below the beltline.
  const beltY = Math.max(...g.map((p) => p[1])) + 16;
  const shoulder = `M${first[0] + 30},${beltY + 10} Q${(first[0] + last[0]) / 2},${beltY - 6} ${last[0] - 24},${beltY + 4}`;

  return { body, glass, shoulder, wheels: [front, rear] as const, r: s.r, cy, beltY, width: last[0] - first[0], left: first[0] };
}
