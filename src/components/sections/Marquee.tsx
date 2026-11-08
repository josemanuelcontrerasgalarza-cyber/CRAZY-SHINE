const words = ["Precision", "Passion", "Paint Correction", "Full Detail", "Classic Care", "Premium Wash", "Protection"];

/** Slow editorial ticker between sections. Purely decorative. */
export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-bone/[0.07] bg-ink py-6" aria-hidden="true">
      <div className="flex w-max animate-[marquee_45s_linear_infinite]">
        {row.map((w, i) => (
          <span key={i} className="display flex items-center gap-10 pr-10 text-4xl text-bone/90 sm:text-6xl">
            {i % 2 === 0 ? w : <span className="text-outline">{w}</span>}
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-volt">
              <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
