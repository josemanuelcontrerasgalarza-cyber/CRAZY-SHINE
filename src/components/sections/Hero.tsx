"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { heroVisual } from "@/content/media";
import { whatsappLink } from "@/config/site";
import { Media } from "../ui/Media";
import { MaskedHeadline } from "../ui/Reveal";
import { Cta } from "../ui/Cta";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Salida cinematográfica: la foto se acerca y oscurece mientras el texto sube.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);
  const shade = useTransform(scrollYProgress, [0, 0.9], [0, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-28%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="inicio" className="relative h-[100svh] min-h-[700px] w-full overflow-hidden bg-ink" aria-labelledby="hero-title">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ opacity: { duration: 1.4, ease }, scale: { duration: 2.6, ease } }}
        >
          <Media visual={heroVisual} sizes="100vw" priority fit="bleed" />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/5 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0" />
      <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: shade }} />

      <motion.div className="container-x relative z-10 flex h-full flex-col justify-end pb-28 sm:pb-24" style={{ y: textY, opacity: textOpacity }}>
        <motion.p
          className="label mb-6 inline-flex w-fit items-center gap-2.5 border border-bone/15 bg-ink/50 px-3 py-2 text-[0.62rem] text-bone/85"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <span className="h-1.5 w-1.5 rotate-45 bg-crazy" />
          Crazy Shine — Detailing automotriz
        </motion.p>

        <MaskedHeadline
          as="h1"
          immediate
          delay={0.03}
          className="display max-w-[16ch] text-[clamp(2.9rem,8.6vw,10.5rem)]"
          lines={[
            <span key="a" className="text-fade">
              No es solo limpiar.
            </span>,
            <span key="b" className="text-crazy">
              Es hacerlo brillar.
            </span>,
          ]}
        />
        <span id="hero-title" className="sr-only">
          No es solo limpiar. Es hacerlo brillar.
        </span>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-sm text-base leading-relaxed text-bone/75 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
          >
            Detailing profesional. Cuidado obsesivo. Brillo que transforma.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.85 }}
          >
            <Cta whatsapp="Hola Crazy Shine, quiero reservar un servicio para mi vehículo.">Reservar servicio</Cta>
            <Cta href="#esencia" variant="ghost">
              Descubrir Crazy Shine
            </Cta>
          </motion.div>
        </div>
      </motion.div>

      {/* Ficha flotante del protagonista */}
      <motion.a
        href={whatsappLink(`Hola Crazy Shine, quiero información sobre el ${heroVisual.detail.toLowerCase()} para mi vehículo.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute right-4 top-32 z-10 hidden w-72 items-center gap-3 border border-bone/10 bg-ink/60 p-3 transition-colors hover:border-silver/60 sm:right-8 md:flex lg:right-14"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 1 }}
      >
        <span className="min-w-0 flex-1">
          <span className="label block text-[0.58rem] text-metal">Protagonista — {heroVisual.detail}</span>
          <span className="mt-1.5 block font-display text-xl uppercase leading-none text-bone">{heroVisual.model}</span>
        </span>
        <span className="grid h-10 w-10 shrink-0 place-items-center bg-crazy text-ink transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <span className="sr-only">(abre WhatsApp)</span>
      </motion.a>

      <p className="label pointer-events-none absolute right-6 top-1/2 z-10 hidden origin-right -translate-y-1/2 translate-x-[calc(50%-0.75rem)] rotate-90 text-[0.58rem] text-bone/55 xl:block">
        Precisión en cada detalle — Desde Colombia
      </p>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-x flex items-center justify-between border-t border-bone/10 py-5">
          <a href="#servicios" className="label flex items-center gap-3 text-bone/65 transition-colors hover:text-bone">
            <span className="relative block h-8 w-px overflow-hidden bg-bone/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-crazy" />
            </span>
            Desliza para descubrir
          </a>
          <p className="label hidden text-bone/55 sm:block">N.º 01 — Cuidado automotriz</p>
        </div>
      </div>
    </section>
  );
}
