"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { finalCtaVisual } from "@/content/media";
import { Media } from "../ui/Media";
import { MaskedHeadline, Reveal } from "../ui/Reveal";
import { Cta } from "../ui/Cta";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.2, 1]);
  const inset = useTransform(scrollYProgress, [0, 0.45], reduce ? ["0%", "0%"] : ["6%", "0%"]);
  const clipPath = useTransform(inset, (v) => `inset(${v} ${v} ${v} ${v})`);

  return (
    <section ref={ref} id="contact" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink" aria-labelledby="cta-title">
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Media visual={finalCtaVisual} sizes="100vw" fit="bleed" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      </motion.div>

      <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center">
        <p className="label mb-8 text-bone/70">
          <span className="text-volt">(06)</span> Book your experience
        </p>
        <MaskedHeadline
          className="display text-[clamp(3.2rem,10.5vw,10rem)] text-bone"
          lines={[
            "Your car",
            "deserves",
            <>
              <span className="text-volt">Crazy</span> Shine.
            </>,
          ]}
        />
        <span id="cta-title" className="sr-only">
          Your car deserves Crazy Shine
        </span>
        <Reveal delay={0.2}>
          <p className="mt-8 text-lg text-bone/75">Give your vehicle the care it deserves.</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Cta whatsapp="Hola Crazy Shine, quiero reservar un servicio de detailing para mi vehículo.">Book your experience</Cta>
          <Cta whatsapp variant="ghost" icon="whatsapp">
            Contact us
          </Cta>
        </Reveal>
      </div>
    </section>
  );
}
