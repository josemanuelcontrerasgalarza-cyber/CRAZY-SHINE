"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { serviceMessage, whatsappLink } from "@/config/site";
import { Media } from "../ui/Media";
import { MaskedHeadline, Reveal } from "../ui/Reveal";
import { Cta } from "../ui/Cta";

const ease = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="relative bg-graphite py-28 sm:py-40" aria-labelledby="services-title">
      <div className="container-x">
        <div className="mb-16 flex flex-col gap-10 sm:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label mb-8 text-metal">
              <span className="text-volt">(02)</span> Our services
            </p>
            <MaskedHeadline
              className="display text-[clamp(3rem,9vw,8.5rem)] text-bone"
              lines={[
                "The Crazy Shine",
                <>
                  experience<span className="text-volt">.</span>
                </>,
              ]}
            />
            <span id="services-title" className="sr-only">
              The Crazy Shine experience
            </span>
          </div>
          <Reveal className="max-w-sm">
            <p className="leading-relaxed text-metal">
              Six disciplines, one standard. Every quote is tailored to your vehicle&apos;s size and condition — ask us on
              WhatsApp.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Sticky preview — desktop */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[5/4] overflow-hidden bg-ink">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.id}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(0 0 0 100%)" }}
                    animate={{ clipPath: "inset(0 0 0 0%)" }}
                    exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.3 } }}
                    transition={{ duration: 0.9, ease }}
                  >
                    <Media visual={current.visual} sizes="(min-width: 1024px) 45vw, 100vw" />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="display pointer-events-none absolute -bottom-4 right-4 text-[11rem] text-bone/10">{current.number}</span>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="label text-volt">Includes</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {current.includes.map((item) => (
                      <li key={item} className="border border-bone/20 bg-ink/40 px-3 py-1.5 text-xs text-bone/85 backdrop-blur">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Service list */}
          <ol className="lg:col-span-6 lg:pl-6">
            {services.map((service, i) => (
              <motion.li
                key={service.id}
                className="border-t border-bone/10 last:border-b"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.9, ease, delay: i * 0.05 }}
              >
                <article
                  id={service.id}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative py-8 sm:py-10"
                >
                  {/* Mobile visual */}
                  <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-ink lg:hidden">
                    <Media visual={service.visual} sizes="100vw" />
                    <span className="display absolute -bottom-2 right-3 text-7xl text-bone/15">{service.number}</span>
                  </div>

                  <div className="flex items-start gap-5 sm:gap-8">
                    <span
                      className={clsx(
                        "mt-2 font-mono text-xs transition-colors duration-500",
                        active === i ? "text-volt" : "text-metal",
                      )}
                    >
                      {service.number} —
                    </span>
                    <div className="flex-1">
                      <h3
                        className={clsx(
                          "display text-[clamp(2rem,4.4vw,3.6rem)] transition-[color,transform] duration-700 ease-[var(--ease-cinematic)]",
                          active === i ? "text-bone lg:translate-x-2" : "text-bone/45",
                        )}
                      >
                        {service.name}
                      </h3>
                      <p className="mt-4 max-w-md leading-relaxed text-metal">{service.summary}</p>
                      <a
                        href={whatsappLink(serviceMessage(service.name))}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Discover ${service.name} — ask on WhatsApp`}
                        className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-bone transition-colors hover:text-volt"
                      >
                        Discover service
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                      </a>
                    </div>
                  </div>
                  <span
                    className={clsx(
                      "absolute left-0 top-[-1px] h-px bg-volt transition-[width] duration-700 ease-[var(--ease-cinematic)]",
                      active === i ? "w-full" : "w-0",
                    )}
                  />
                </article>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="label text-metal">Prices on request — every car is different.</p>
          <Cta whatsapp="Hola Crazy Shine, quiero una cotización para mi vehículo.">Request a quote</Cta>
        </Reveal>
      </div>
    </section>
  );
}
