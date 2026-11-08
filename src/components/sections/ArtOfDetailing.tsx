"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { editorialVisual } from "@/content/media";
import { Media } from "../ui/Media";
import { MaskedHeadline, Reveal } from "../ui/Reveal";

export function ArtOfDetailing() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section id="about" className="relative overflow-hidden bg-ink py-28 sm:py-40" aria-labelledby="about-title">
      <div className="container-x">
        <div className="mb-16 flex items-center justify-between sm:mb-24">
          <p className="label text-metal">
            <span className="text-volt">(01)</span> The art of detailing
          </p>
          <p className="label hidden text-metal sm:block">Precision in every detail</p>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <MaskedHeadline
              className="display text-[clamp(3.4rem,11vw,10.5rem)] text-bone"
              lines={[
                "Every",
                <span key="d" className="text-outline">
                  detail
                </span>,
                <>
                  matters<span className="text-volt">.</span>
                </>,
              ]}
            />
            <span id="about-title" className="sr-only">
              Every detail matters
            </span>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:pr-10">
              <Reveal>
                <p className="text-lg leading-relaxed text-bone/85">
                  At Crazy Shine, automotive care is more than cleaning. It&apos;s precision, passion and attention to every
                  single detail.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="leading-relaxed text-metal">
                  From daily drivers to legendary machines, we treat every vehicle like it deserves the spotlight.
                </p>
              </Reveal>
            </div>
          </div>

          <div ref={ref} className="relative lg:col-span-5 lg:-mt-10">
            <motion.div
              className="relative aspect-[4/5] overflow-hidden bg-graphite"
              initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
              whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div className="absolute inset-[-10%]" style={{ y }}>
                <Media visual={editorialVisual} sizes="(min-width: 1024px) 40vw, 100vw" />
              </motion.div>
            </motion.div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <p className="label text-metal">Fig. 01 — Reflection study</p>
              <p className="label text-right text-bone/50">Studio light / Gloss / Depth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
