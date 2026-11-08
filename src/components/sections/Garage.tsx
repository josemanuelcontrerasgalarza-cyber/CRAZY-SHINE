"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { garage, type GarageEntry } from "@/content/garage";
import { siteConfig, whatsappLink } from "@/config/site";
import { Media } from "../ui/Media";
import { MaskedHeadline } from "../ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Garage() {
  const [featured, ...rest] = garage;
  const instagram = siteConfig.instagram.url;

  return (
    <section id="garage" className="relative overflow-hidden bg-ink py-28 sm:py-36" aria-labelledby="garage-title">
      {/* Palabra gigante de fondo */}
      <p aria-hidden="true" className="display text-outline pointer-events-none absolute -top-6 left-0 select-none whitespace-nowrap text-[24vw] opacity-[0.12]">
        El garage
      </p>

      <div className="container-x relative">
        <div className="mb-12 flex flex-col gap-8 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label mb-6 text-metal"><span className="text-crazy">(02)</span> — Muscle, clásicos, deportivos y diarios</p>
            <MaskedHeadline
              id="garage-title"
              className="display text-[clamp(3.2rem,9vw,8.5rem)] text-bone"
              lines={[
                "Cada carro",
                <span key="o" className="text-outline">
                  tiene historia.
                </span>,
              ]}
            />
          </div>
          {instagram ? (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="label group inline-flex items-center gap-3 text-bone hover:text-silver">
              Ver más en Instagram
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          ) : (
            <p className="label max-w-xs text-metal">Fotografías de referencia del tipo de vehículos que atendemos.</p>
          )}
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4">
          <GarageCard car={featured} index={0} featured />
          {rest.map((car, i) => (
            <GarageCard key={car.id} car={car} index={i + 1} />
          ))}
          <motion.li
            className="col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            <a
              href={whatsappLink("Hola Crazy Shine, quiero agendar un servicio para mi vehículo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="shine group flex aspect-[2/1] h-full flex-col justify-between bg-crazy p-6 text-ink lg:aspect-auto"
            >
              <span className="label">Tu carro</span>
              <span className="display text-5xl sm:text-6xl">
                Es el
                <br />
                siguiente.
              </span>
              <span className="flex items-center justify-between">
                <span className="label">Agenda tu servicio</span>
                <span className="grid h-10 w-10 place-items-center bg-ink text-crazy transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
              <span className="sr-only">(abre WhatsApp)</span>
            </a>
          </motion.li>
        </ul>

        <p className="mt-12 max-w-2xl text-xs leading-relaxed text-metal">
          Imágenes de referencia de cada modelo; no corresponden a trabajos realizados por Crazy Shine. Créditos: Unsplash y
          Wikimedia Commons (Renault 12 TL — Joost J. Bakker, CC BY 2.0).
        </p>
      </div>
    </section>
  );
}

function GarageCard({ car, index, featured = false }: { car: GarageEntry; index: number; featured?: boolean }) {
  return (
    <motion.li
      className={clsx(featured && "col-span-2 lg:row-span-2")}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 1, ease, delay: (index % 4) * 0.07 }}
    >
      <article className="group">
        <div className={clsx("relative overflow-hidden bg-graphite", featured ? "aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[calc(100%-5.5rem)] lg:min-h-[40rem]" : "aspect-[4/5]")}>
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-cinematic)] group-hover:scale-[1.07]">
            <Media visual={car.visual} sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100" />

          <span className="absolute left-3 top-3 bg-bone px-2 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink sm:left-4 sm:top-4">
            {car.category}
          </span>
          <span className="absolute right-3 top-3 font-mono text-[0.62rem] text-bone/70 sm:right-4 sm:top-4">
            {String(index + 1).padStart(2, "0")}
          </span>

          {featured && (
            <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
              <p className="label text-bone/70">Destacado</p>
              <p className="display mt-2 text-[clamp(3rem,7vw,7rem)] text-bone">{car.model}</p>
            </div>
          )}

          <p className="absolute inset-x-3 bottom-3 translate-y-3 text-xs leading-relaxed text-bone/90 opacity-0 transition-all duration-700 ease-[var(--ease-cinematic)] group-hover:translate-y-0 group-hover:opacity-100 sm:inset-x-4 sm:bottom-4 sm:text-sm">
            {!featured && car.story}
          </p>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="label text-[0.6rem] text-metal">
              {car.make}
              {car.generation ? ` · ${car.generation}` : ""}
            </p>
            <h3 className="mt-1.5 truncate text-sm font-semibold uppercase tracking-[0.08em] text-bone sm:text-base">
              {car.make} {car.model}
            </h3>
            {featured && <p className="mt-2 hidden max-w-md text-sm text-metal sm:block">{car.story}</p>}
          </div>
          <span className="shrink-0 border border-bone/15 px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-silver">
            {car.service}
          </span>
        </div>
      </article>
    </motion.li>
  );
}
