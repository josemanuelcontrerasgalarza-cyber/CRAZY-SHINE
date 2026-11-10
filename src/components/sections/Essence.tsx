"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { essenceVisuals } from "@/content/media";
import { Media } from "../ui/Media";
import { MaskedHeadline, Reveal } from "../ui/Reveal";
import { Cta } from "../ui/Cta";

const ease = [0.16, 1, 0.3, 1] as const;

export function Essence() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-22%"]);
  const ySlow = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["6%", "-6%"]);
  const yFast = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["30%", "-30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["15%", "-18%"]);

  const [main, macro, side] = essenceVisuals;

  return (
    <section ref={ref} id="esencia" className="relative overflow-hidden bg-graphite py-28 sm:py-40" aria-labelledby="esencia-title">
      <motion.p
        aria-hidden="true"
        style={{ x: wordX }}
        className="display pointer-events-none absolute top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[28vw] text-bone/[0.035]"
      >
        Crazy Shine
      </motion.p>
      <p
        aria-hidden="true"
        className="label pointer-events-none absolute left-4 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[0.58rem] text-bone/45 lg:left-8 lg:block"
      >
        Desde Colombia — Cuidado automotriz
      </p>

      <div className="container-x relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pt-16">
          <p className="label mb-8 text-metal"><span className="text-crazy">(03)</span> — Nuestra esencia</p>
          <MaskedHeadline
            id="esencia-title"
            className="display text-[clamp(3.4rem,8vw,8rem)] text-bone"
            lines={[
              "Más que",
              <span key="b" className="text-outline">
                un lavado<span className="text-crazy [-webkit-text-stroke:0]">.</span>
              </span>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-bone/85">
              En Crazy Shine creemos que cada vehículo merece algo más que una limpieza. Merece atención, precisión y pasión.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md leading-relaxed text-metal">
              Transformamos el cuidado automotriz en una experiencia donde cada detalle cuenta.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <Cta href="#contacto" variant="ghost">
              Agenda tu servicio
            </Cta>
          </Reveal>

          <dl className="mt-16 grid max-w-md grid-cols-3 border-t border-bone/10 pt-8">
            {[
              ["Precisión", "Cada detalle"],
              ["Pasión", "Por los carros"],
              ["Cuidado", "Para cada uno"],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="display text-2xl text-bone sm:text-3xl">{t}</dt>
                <dd className="label mt-2 text-[0.58rem] text-metal">{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage asimétrico */}
        <div className="relative h-[34rem] sm:h-[44rem] lg:col-span-7 lg:h-[50rem]">
          <motion.div style={{ y: ySlow }} className="absolute right-0 top-0 h-[78%] w-[78%] overflow-hidden bg-ink">
            <motion.div
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)" }}
              whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)" }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1.4, ease }}
            >
              <Media visual={main} sizes="(min-width: 1024px) 45vw, 80vw" />
            </motion.div>
          </motion.div>
          <motion.div style={{ y: yFast }} className="absolute bottom-6 left-0 aspect-[4/5] w-[42%] overflow-hidden border-[6px] border-graphite bg-ink shadow-2xl">
            <Media visual={macro} sizes="(min-width: 1024px) 22vw, 40vw" />
          </motion.div>
          <motion.div style={{ y: yMid }} className="absolute bottom-0 right-0 hidden aspect-[4/3] w-[30%] overflow-hidden border-[6px] border-graphite bg-ink shadow-2xl sm:block">
            <Media visual={side} sizes="(min-width: 1024px) 18vw, 30vw" />
          </motion.div>
          <p className="label absolute left-[46%] top-[81%] hidden max-w-[10rem] text-[0.58rem] leading-relaxed text-metal sm:block">
            Fig. 01 — Reflejo, espuma, carácter
          </p>
        </div>
      </div>
    </section>
  );
}
