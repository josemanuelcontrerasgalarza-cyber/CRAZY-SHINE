"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor de firma: sobre cualquier elemento con `data-cursor="Texto"` aparece un sello
 * naranja que sigue al puntero. Solo en equipos con mouse y sin movimiento reducido.
 */
export function CursorLabel() {
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    const onLeave = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[70]" style={{ x: sx, y: sy }}>
      <motion.span
        className="label absolute grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-crazy text-center text-[0.6rem] font-semibold leading-tight text-ink"
        initial={false}
        animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
