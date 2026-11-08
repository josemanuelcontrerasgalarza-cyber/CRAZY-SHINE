import { useId } from "react";
import clsx from "clsx";
import type { Silhouette, Tone } from "@/content/types";
import { buildSilhouette, GROUND } from "./silhouettes";

const palettes: Record<Tone, { deep: string; mid: string; hi: string; bg: string; glow: string }> = {
  graphite: { deep: "#050506", mid: "#1c1c20", hi: "#8b8b95", bg: "#0d0d0f", glow: "rgba(255,255,255,0.10)" },
  ember: { deep: "#4a1405", mid: "#c43d0b", hi: "#ff9a5c", bg: "#140805", glow: "rgba(255,90,31,0.22)" },
  steel: { deep: "#2a2d33", mid: "#7d838c", hi: "#eef1f5", bg: "#0c0d10", glow: "rgba(200,210,225,0.12)" },
  midnight: { deep: "#030812", mid: "#122544", hi: "#6e8fc4", bg: "#05070c", glow: "rgba(90,130,200,0.14)" },
  ivory: { deep: "#5c5952", mid: "#b8b3a8", hi: "#fbf9f4", bg: "#0e0d0c", glow: "rgba(255,245,230,0.10)" },
};

interface Props {
  tone: Tone;
  silhouette?: Silhouette;
  /** "dull" simulates the pre-detail state for before/after comparisons. */
  condition?: "clean" | "dull";
  className?: string;
  /** Show the floor and light rig, or only the car. */
  scene?: boolean;
  label?: string;
  /** "contain" keeps the whole car in frame; "bleed" lets it run past the edges on narrow screens. */
  fit?: "contain" | "bleed";
}

/**
 * Art-directed studio render used wherever authentic photography has not been provided yet.
 * Pure SVG/CSS: zero network weight, crisp at any resolution, and clearly not a photo of a real job.
 */
export function StudioRender({ tone, silhouette = "coupe", condition = "clean", className, scene = true, label, fit = "contain" }: Props) {
  const uid = useId().replace(/:/g, "");
  const p = palettes[tone];
  const s = buildSilhouette(silhouette);
  const dull = condition === "dull";

  return (
    <div
      className={clsx("studio absolute inset-0 overflow-hidden", dull && "studio--dull", className)}
      style={{ backgroundColor: p.bg, containerType: "size" }}
      role="img"
      aria-label={label}
    >
      {scene && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 70% at 50% 72%, ${p.glow} 0%, transparent 60%), radial-gradient(80% 50% at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 70%)`,
            }}
          />
          {/* Overhead light bars */}
          <div className="studio-lightbar absolute left-1/2 top-[9%] h-[3px] w-[62%] -translate-x-1/2 rounded-full bg-white/80 blur-[1px]" />
          <div className="studio-lightbar absolute left-1/2 top-[9%] h-10 w-[70%] -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute left-[6%] top-[16%] h-[46%] w-[2px] bg-gradient-to-b from-white/40 to-transparent blur-[1px]" />
          <div className="absolute right-[6%] top-[16%] h-[46%] w-[2px] bg-gradient-to-b from-white/40 to-transparent blur-[1px]" />
          {/* Floor */}
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-transparent via-black/40 to-black/90" />
        </>
      )}

      <svg
        viewBox="0 0 1000 420"
        preserveAspectRatio="xMidYMid meet"
        className="absolute left-1/2 top-[56%] max-w-none -translate-x-1/2 -translate-y-1/2"
        style={{ width: fit === "bleed" ? "max(min(96cqw, 200cqh), min(150cqw, 120cqh))" : "min(94cqw, 200cqh)" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`paint-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.mid} />
            <stop offset="0.28" stopColor={p.hi} />
            <stop offset="0.36" stopColor={p.mid} />
            <stop offset="0.62" stopColor={p.deep} />
            <stop offset="0.9" stopColor={p.mid} stopOpacity="0.9" />
            <stop offset="1" stopColor={p.deep} />
          </linearGradient>
          <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1d2026" />
            <stop offset="0.45" stopColor="#050607" />
            <stop offset="0.55" stopColor="#2b2f36" />
            <stop offset="1" stopColor="#020203" />
          </linearGradient>
          <radialGradient id={`rim-${uid}`}>
            <stop offset="0" stopColor="#d9dbe0" />
            <stop offset="0.55" stopColor="#6c6f76" />
            <stop offset="0.8" stopColor="#1a1b1e" />
            <stop offset="1" stopColor="#0a0a0b" />
          </radialGradient>
          <linearGradient id={`sweep-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`reflmask-${uid}`}>
            <rect x="0" y={GROUND} width="1000" height="120" fill={`url(#fade-${uid})`} />
          </mask>
          <clipPath id={`clip-${uid}`}>
            <path d={s.body} />
          </clipPath>
          <filter id={`soft-${uid}`} x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Contact shadow */}
        <ellipse cx="500" cy={GROUND + 2} rx={s.width / 2 + 10} ry="10" fill="#000" opacity="0.85" filter={`url(#soft-${uid})`} />

        <g className="studio-car">
          <Car s={s} uid={uid} dull={dull} />
        </g>

        {/* Floor reflection */}
        {!dull && (
          <g mask={`url(#reflmask-${uid})`}>
            <g transform={`translate(0 ${GROUND * 2}) scale(1 -1)`}>
              <Car s={s} uid={uid} dull={false} reflection />
            </g>
          </g>
        )}
      </svg>

      {dull && <div className="studio-dust pointer-events-none absolute inset-0" />}
      <div className="grain pointer-events-none absolute inset-0" />
    </div>
  );
}

function Car({ s, uid, dull, reflection = false }: { s: ReturnType<typeof buildSilhouette>; uid: string; dull: boolean; reflection?: boolean }) {
  return (
    <>
      <path d={s.body} fill={`url(#paint-${uid})`} />
      {!reflection && (
        <g clipPath={`url(#clip-${uid})`}>
          {/* Softbox reflections on the panels */}
          {!dull && (
            <>
              <rect x="0" y={s.beltY - 4} width="1000" height="3" fill="#fff" opacity="0.75" />
              <rect x="0" y={s.beltY + 26} width="1000" height="10" fill="#fff" opacity="0.06" />
              <rect className="studio-sweep" x="-300" y="0" width="260" height="420" fill={`url(#sweep-${uid})`} transform="skewX(-18)" />
            </>
          )}
          <path d={s.shoulder} stroke="#000" strokeOpacity="0.35" strokeWidth="2" fill="none" />
          <rect x="0" y="270" width="1000" height="20" fill="#000" opacity="0.35" />
        </g>
      )}
      <path d={s.glass} fill={`url(#glass-${uid})`} />
      {!reflection && !dull && <path d={s.glass} fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.2" />}
      {s.wheels.map((x) => (
        <g key={x}>
          <circle cx={x} cy={s.cy} r={s.r} fill="#060607" />
          <circle cx={x} cy={s.cy} r={s.r * 0.68} fill={`url(#rim-${uid})`} />
          {Array.from({ length: 5 }).map((_, i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={x + Math.cos(a) * s.r * 0.14}
                y1={s.cy + Math.sin(a) * s.r * 0.14}
                x2={x + Math.cos(a) * s.r * 0.64}
                y2={s.cy + Math.sin(a) * s.r * 0.64}
                stroke="#0b0b0c"
                strokeWidth={s.r * 0.12}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={x} cy={s.cy} r={s.r * 0.12} fill="#2a2b2f" />
          {!dull && !reflection && (
            <path
              d={`M${x - s.r * 0.6},${s.cy - s.r * 0.25} A${s.r * 0.66},${s.r * 0.66} 0 0 1 ${x + s.r * 0.25},${s.cy - s.r * 0.62}`}
              stroke="#fff"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              fill="none"
            />
          )}
        </g>
      ))}
      {/* Head & tail lights */}
      <rect x={s.left + 6} y={s.beltY + 14} width="26" height="6" rx="3" fill={dull ? "#555" : "#f5f5f5"} opacity={dull ? 0.4 : 0.9} />
      <rect x={s.left + s.width - 34} y={s.beltY + 12} width="28" height="6" rx="3" fill={dull ? "#5a2a20" : "#ff3b1f"} opacity={dull ? 0.5 : 0.95} />
    </>
  );
}
