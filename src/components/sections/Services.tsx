"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { serviceMessage, whatsappLink } from "@/config/site";
import { Media } from "../ui/Media";
import { MaskedHeadline } from "../ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

// Ritmo editorial asimétrico: ancho/angosto, angosto/ancho, tercio/dos tercios.
const layout = [
  "lg:col-span-7 lg:h-[40rem]",
  "lg:col-span-5 lg:h-[40rem]",
  "lg:col-span-5 lg:h-[34rem]",
  "lg:col-span-7 lg:h-[34rem]",
  "lg:col-span-4 lg:h-[38rem]",
  "lg:col-span-8 lg:h-[38rem]",
  "lg:col-span-12 lg:h-[32rem]",
];

export function Services() {
  return (
    <section id="servicios" className="relative bg-ink py-28 sm:py-36" aria-labelledby="servicios-title">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-8 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label mb-6 text-metal"><span className="text-crazy">(01)</span> — Siete disciplinas, un estándar</p>
            <MaskedHeadline
              as="h2"
              id="servicios-title"
              className="display text-[clamp(3.2rem,9vw,8.5rem)] text-bone"
              lines={[
                "Nuestros",
                <span key="o" className="text-outline">
                  servicios.
                </span>,
              ]}
            />
          </div>
          <div className="w-full max-w-md lg:pb-3">
            <p className="leading-relaxed text-metal">
              Del lavado de mantenimiento a la corrección de pintura y el polarizado: elige lo que tu carro necesita o
              déjanos asesorarte.
            </p>
            <ol className="mt-6 grid grid-cols-2 gap-x-6 border-t border-bone/10 pt-5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="group flex items-baseline gap-2.5 py-1.5 text-sm text-bone/75 transition-colors hover:text-bone">
                    <span className="font-mono text-[0.62rem] text-crazy">{s.number}</span>
                    <span className="border-b border-transparent transition-colors group-hover:border-crazy">{s.name}</span>
                  </a>
                </li>
              ))}
            </ol>
            <a
              href={whatsappLink("Hola Crazy Shine, quiero una cotización para mi vehículo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="label group mt-6 inline-flex items-center gap-3 text-bone transition-colors hover:text-crazy"
            >
              Cotiza por WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {services.map((service, i) => (
            <motion.li
              key={service.id}
              id={service.id}
              className={clsx("scroll-mt-28", layout[i], (i === 0 || i === 5 || i === 6) && "sm:col-span-2")}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 1.1, ease, delay: (i % 2) * 0.1 }}
            >
              <a
                href={whatsappLink(serviceMessage(service.name))}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Cotizar"
                className="group relative block aspect-[4/5] h-full overflow-hidden bg-graphite sm:aspect-[4/3] lg:aspect-auto"
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 1.3, ease }}
                >
                  <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.06]">
                    <Media visual={service.visual} sizes="(min-width: 1024px) 60vw, (min-width: 640px) 50vw, 100vw" />
                  </div>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/35" />

                {/* Palabra de identidad */}
                <span
                  aria-hidden="true"
                  className="display text-outline pointer-events-none absolute -right-2 top-14 select-none text-[clamp(4rem,9vw,9.5rem)] opacity-35 transition-all duration-1000 ease-[var(--ease-cinematic)] group-hover:-translate-x-4 group-hover:opacity-90"
                >
                  {service.keyword}
                </span>

                <span className="absolute left-5 top-5 bg-bone px-2.5 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink sm:left-7 sm:top-7">
                  {service.number} — Servicio
                </span>

                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6 sm:inset-x-7 sm:bottom-7">
                  <div className="min-w-0">
                    <h3 className="display max-w-[14ch] text-[clamp(2.3rem,4.2vw,4.2rem)] text-bone">{service.name}</h3>
                    <div className="grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-cinematic)] [grid-template-rows:1fr] lg:opacity-0 lg:[grid-template-rows:0fr] lg:group-hover:opacity-100 lg:group-hover:[grid-template-rows:1fr] lg:group-focus-visible:opacity-100 lg:group-focus-visible:[grid-template-rows:1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/80">{service.summary}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {service.includes.map((item) => (
                            <li key={item} className="border border-bone/25 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-bone/80">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-bone/30 text-bone transition-all duration-500 group-hover:rotate-45 group-hover:border-crazy group-hover:bg-crazy group-hover:text-ink">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <span className="sr-only">Consultar {service.name} por WhatsApp</span>
              </a>
            </motion.li>
          ))}
        </ul>

        <p className="label mt-8 text-metal">Sin precios publicados: cada vehículo es distinto. La cotización es por WhatsApp.</p>
      </div>
    </section>
  );
}
