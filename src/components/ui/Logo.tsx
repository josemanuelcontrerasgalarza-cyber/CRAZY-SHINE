import clsx from "clsx";

/** Original Crazy Shine wordmark: condensed display type + a four-point glint. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5 select-none", className)}>
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden="true">
        <path d="M4 26 L14 6 H28 L18 26 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M21 9 L22.2 13.8 L27 15 L22.2 16.2 L21 21 L19.8 16.2 L15 15 L19.8 13.8 Z" fill="#FF5A1F" />
      </svg>
      {!compact && (
        <span className="font-display text-[1.35rem] font-extrabold uppercase leading-none tracking-[0.02em]">
          Crazy<span className="text-volt">/</span>Shine
        </span>
      )}
    </span>
  );
}
