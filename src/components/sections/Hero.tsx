"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { heroSlides } from "@/content/media";
import { Media } from "../ui/Media";
import { MaskedHeadline } from "../ui/Reveal";
import { Cta } from "../ui/Cta";

const ease = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 6500;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduce]);

  // Cinematic scroll-out: the frame pushes in and darkens while the type drifts up.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.18]);
  const shade = useTransform(scrollYProgress, [0, 0.9], [0, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const slide = heroSlides[index];

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink" aria-label="Crazy Shine">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6, ease }, scale: { duration: INTERVAL / 1000 + 1.6, ease: "linear" } }}
          >
            <Media visual={slide} sizes="100vw" priority={index === 0} fit="bleed" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Legibility grading */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: shade }} />

      <motion.div className="container-x relative z-10 flex h-full flex-col justify-end pb-28 sm:pb-24" style={{ y: textY, opacity: textOpacity }}>
        <motion.p
          className="label mb-6 flex items-center gap-3 text-bone/70"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <span className="h-px w-10 bg-volt" />
          Automotive Detailing / Est. Crazy Shine
        </motion.p>

        <MaskedHeadline
          as="h1"
          immediate
          delay={0.03}
          className="display text-[clamp(3.6rem,13.5vw,13rem)] text-bone"
          lines={[
            "Your car.",
            <>
              Our <span className="text-volt">obsession.</span>
            </>,
          ]}
        />

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-sm text-base leading-relaxed text-bone/75 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
          >
            We don&apos;t just clean cars.
            <br />
            We bring their shine back.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.85 }}
          >
            <Cta whatsapp>Book your detail</Cta>
            <Cta href="#work" variant="ghost">
              Explore our work
            </Cta>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating slide meta */}
      <div className="absolute right-4 top-28 z-10 hidden text-right sm:right-8 md:block lg:right-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="label text-volt">{slide.label}</p>
            <p className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-bone">{slide.model}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 flex justify-end gap-1.5" role="tablist" aria-label="Featured vehicles">
          {heroSlides.map((s, i) => (
            <button
              key={s.model}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={s.model}
              onClick={() => setIndex(i)}
              className="group relative h-6 w-8"
            >
              <span className="absolute inset-x-0 top-1/2 h-px bg-bone/25" />
              <span
                className={`absolute left-0 top-1/2 h-px bg-bone ${i === index ? "w-full transition-[width] ease-linear" : "w-0"}`}
                style={i === index && !reduce ? { transitionDuration: `${INTERVAL}ms` } : undefined}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-x flex items-center justify-between border-t border-bone/10 py-5">
          <a href="#about" className="label group flex items-center gap-3 text-bone/60 transition-colors hover:text-bone">
            <span className="relative block h-8 w-px overflow-hidden bg-bone/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-volt" />
            </span>
            Scroll to discover
          </a>
          <p className="label hidden text-bone/40 sm:block">
            {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
