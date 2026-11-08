"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Crosshair, Flame, Gauge, ShieldCheck, type LucideIcon } from "lucide-react";
import { MaskedHeadline } from "../ui/Reveal";

const principles: { n: string; title: string; text: string; Icon: LucideIcon }[] = [
  { n: "01", title: "Precision", text: "Every detail matters.", Icon: Crosshair },
  { n: "02", title: "Passion", text: "We love what we do.", Icon: Flame },
  { n: "03", title: "Quality", text: "Professional care for every vehicle.", Icon: ShieldCheck },
  { n: "04", title: "Experience", text: "Your car deserves the best.", Icon: Gauge },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function WhyCrazyShine() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["10%", "-30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-graphite py-28 sm:py-40" aria-labelledby="why-title">
      <motion.p
        aria-hidden="true"
        style={{ x }}
        className="display text-outline pointer-events-none absolute top-16 whitespace-nowrap text-[22vw] opacity-30"
      >
        No compromise — No compromise
      </motion.p>

      <div className="container-x relative">
        <p className="label mb-8 text-metal">
          <span className="text-volt">(05)</span> Why Crazy Shine
        </p>
        <MaskedHeadline
          className="display text-[clamp(3.2rem,10vw,9.5rem)] text-bone"
          lines={[
            "Detailing",
            <>
              without compromise<span className="text-volt">.</span>
            </>,
          ]}
        />
        <span id="why-title" className="sr-only">
          Detailing without compromise
        </span>

        <ul className="mt-20 grid border-t border-bone/10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {principles.map(({ n, title, text, Icon }, i) => (
            <motion.li
              key={n}
              className="group relative border-b border-bone/10 py-10 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-volt">{n} —</span>
                <Icon
                  className="h-6 w-6 text-bone/60 transition-all duration-700 ease-[var(--ease-cinematic)] group-hover:rotate-90 group-hover:text-volt"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </div>
              <h3 className="display mt-14 text-[clamp(2.6rem,4.2vw,4rem)] text-bone">{title}</h3>
              <p className="mt-4 text-metal">{text}</p>
              <span className="absolute left-0 top-[-1px] h-px w-0 bg-volt transition-[width] duration-700 ease-[var(--ease-cinematic)] group-hover:w-full" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
