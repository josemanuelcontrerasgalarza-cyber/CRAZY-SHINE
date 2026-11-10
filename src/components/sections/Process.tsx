"use client";

import { motion } from "framer-motion";
import { MaskedHeadline, Reveal } from "../ui/Reveal";
import { Cta } from "../ui/Cta";

const steps = [
  {
    n: "01",
    title: "Agenda",
    text: "Nos escribes por WhatsApp, nos cuentas qué carro tienes y qué necesita. Te damos fecha y cotización.",
  },
  {
    n: "02",
    title: "Diagnóstico",
    text: "Revisamos pintura, interior y detalles contigo. Definimos el alcance antes de tocar el vehículo.",
  },
  {
    n: "03",
    title: "Detailing",
    text: "Trabajamos por etapas, con técnicas seguras para cada superficie. Sin afanes y sin atajos.",
  },
  {
    n: "04",
    title: "Entrega",
    text: "Repasamos el resultado juntos y te dejamos recomendaciones para conservar el brillo.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Process() {
  return (
    <section id="proceso" className="relative bg-ink py-28 sm:py-40" aria-labelledby="proceso-title">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="label mb-8 text-metal">
              <span className="text-crazy">(04)</span> — El proceso
            </p>
            <MaskedHeadline
              id="proceso-title"
              className="display text-[clamp(3.2rem,7.5vw,7.5rem)] text-bone"
              lines={[
                "Así se",
                <span key="o" className="text-outline">
                  trabaja
                </span>,
                <span key="c">
                  un carro<span className="text-crazy">.</span>
                </span>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-sm leading-relaxed text-metal">
                Cuatro pasos claros, de tu primer mensaje a la entrega. Sin sorpresas en el camino.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10">
              <Cta whatsapp={"Hola Crazy Shine, quiero agendar un servicio para mi vehículo."}>Empezar ahora</Cta>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {steps.map((step, i) => (
            <motion.li
              key={step.n}
              className="group relative grid grid-cols-[auto_1fr] items-start gap-x-6 border-t border-bone/10 py-10 last:border-b sm:gap-x-10 sm:py-14"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 1, ease, delay: i * 0.05 }}
            >
              <span className="display text-outline text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.8] transition-all duration-700 ease-[var(--ease-cinematic)] group-hover:text-crazy group-hover:[-webkit-text-stroke:0]">
                {step.n}
              </span>
              <div className="pt-2">
                <h3 className="display text-[clamp(2.2rem,3.6vw,3.4rem)] text-bone">{step.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-metal transition-colors duration-700 group-hover:text-bone/85">{step.text}</p>
              </div>
              <span className="absolute left-0 top-[-1px] h-px w-0 bg-crazy transition-[width] duration-700 ease-[var(--ease-cinematic)] group-hover:w-full" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
