import clsx from "clsx";

const words = ["Detailing profesional", "Brillo extremo", "Cuidado automotriz", "Crazy Shine"];

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={clsx("h-4 w-4 shrink-0 sm:h-5 sm:w-5", className)} aria-hidden="true">
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Franja infinita. `outline` alterna palabras sólidas y contorneadas;
 * `band` es la cinta cromada inclinada.
 */
export function Marquee({ variant = "outline", reverse = false }: { variant?: "outline" | "band"; reverse?: boolean }) {
  const band = variant === "band";
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className={clsx("relative overflow-hidden bg-ink", band ? "py-12" : "border-y border-bone/[0.07] py-7")} role="presentation">
      <p className="sr-only">Detailing profesional, brillo extremo, cuidado automotriz, Crazy Shine.</p>
      <div className={clsx(band && "-mx-6 -rotate-[1.6deg] bg-chrome-gradient py-4 shadow-[0_0_80px_rgba(201,206,212,0.18)]")} aria-hidden="true">
        <div
          className="flex w-max hover:[animation-play-state:paused]"
          style={{ animation: `marquee ${band ? 40 : 55}s linear infinite${reverse ? " reverse" : ""}` }}
        >
          {row.map((w, i) => (
            <span key={i} className={clsx("display flex items-center gap-8 pr-8 text-4xl sm:gap-12 sm:pr-12 sm:text-7xl", band ? "text-ink" : "text-bone")}>
              {band || i % 2 === 0 ? w : <span className="text-outline">{w}</span>}
              <Star className={band ? "text-ink" : "text-silver"} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
