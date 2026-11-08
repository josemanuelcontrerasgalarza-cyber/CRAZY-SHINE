"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { MoveHorizontal } from "lucide-react";
import { transformations } from "@/content/transformations";
import { Media } from "../ui/Media";
import { MaskedHeadline, Reveal } from "../ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const t = transformations[active];

  return (
    <section id="experience" className="relative bg-ink py-28 sm:py-40" aria-labelledby="ba-title">
      <div className="container-x">
        <div className="mb-14 grid gap-10 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label mb-8 text-metal">
              <span className="text-volt">(04)</span> Before / After
            </p>
            <MaskedHeadline
              className="display text-[clamp(3.2rem,10vw,9.5rem)] text-bone"
              lines={[
                "See the",
                <>
                  difference<span className="text-volt">.</span>
                </>,
              ]}
            />
            <span id="ba-title" className="sr-only">
              See the difference
            </span>
          </div>
          <Reveal className="lg:col-span-4">
            <div role="tablist" aria-label="Transformations" className="flex flex-wrap gap-2 lg:justify-end">
              {transformations.map((item, i) => (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  aria-selected={active === i}
                  aria-controls="ba-panel"
                  onClick={() => setActive(i)}
                  className={clsx(
                    "border px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-500",
                    active === i ? "border-volt bg-volt text-ink" : "border-bone/15 text-bone/70 hover:border-bone/50 hover:text-bone",
                  )}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div id="ba-panel" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease }}
            >
              <CompareSlider before={t.before} after={t.after} title={t.title} />
              <div className="mt-6 flex flex-col justify-between gap-2 sm:flex-row">
                <p className="text-bone/80">{t.caption}</p>
                <p className="label text-metal">Drag to compare</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CompareSlider({ before, after, title }: { before: (typeof transformations)[number]["before"]; after: (typeof transformations)[number]["after"]; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) update(e.clientX);
  };
  const stop = () => setDragging(false);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      className={clsx("relative aspect-[4/5] w-full select-none overflow-hidden bg-graphite sm:aspect-[16/9]", dragging ? "cursor-grabbing" : "cursor-ew-resize")}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
    >
      {/* After (base layer) */}
      <Media visual={after} sizes="(min-width: 1536px) 1400px, 100vw" />
      {/* Before (clipped layer) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Media visual={before} sizes="(min-width: 1536px) 1400px, 100vw" condition="dull" />
      </div>

      <span className="label pointer-events-none absolute left-4 top-4 bg-ink/70 px-3 py-1.5 text-bone backdrop-blur sm:left-6 sm:top-6">Before</span>
      <span className="label pointer-events-none absolute right-4 top-4 bg-volt px-3 py-1.5 text-ink sm:right-6 sm:top-6">After</span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 border-l border-bone/90 shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${title}: before and after comparison`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-bone/70 bg-ink/60 text-bone backdrop-blur-md transition-transform duration-300 hover:scale-110"
        >
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
