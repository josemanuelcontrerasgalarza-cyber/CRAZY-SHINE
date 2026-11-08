import clsx from "clsx";

/** Crazy Shine wordmark: condensed display type over a mono descriptor, with the signature orange glint. */
export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "xl" }) {
  const xl = size === "xl";
  return (
    <span className={clsx("inline-flex select-none flex-col leading-none", className)}>
      <span className={clsx("font-display uppercase tracking-[0.01em]", xl ? "text-6xl sm:text-7xl" : "text-[1.55rem]")}>
        Crazy Shine
      </span>
      <span className={clsx("mt-1 flex items-center gap-1.5 font-mono uppercase text-bone/70", xl ? "text-xs tracking-[0.4em]" : "text-[0.5rem] tracking-[0.32em]")}>
        <svg viewBox="0 0 10 10" className={xl ? "h-3 w-3" : "h-2 w-2"} aria-hidden="true">
          <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#FF5B14" />
        </svg>
        Detailing automotriz
      </span>
    </span>
  );
}
