"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { contactVisual } from "@/content/media";
import { siteConfig, whatsappLink } from "@/config/site";
import { Media } from "../ui/Media";
import { MaskedHeadline, Reveal } from "../ui/Reveal";
import { Cta } from "../ui/Cta";
import { InstagramIcon, WhatsAppIcon } from "../ui/icons";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.2, 1]);
  const inset = useTransform(scrollYProgress, [0, 0.45], reduce ? [0, 0] : [6, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}%)`);

  const { instagram, location, hours } = siteConfig;
  const items = [
    {
      Icon: WhatsAppIcon,
      label: "WhatsApp",
      value: "Reservas y cotizaciones",
      href: whatsappLink(),
    },
    {
      Icon: MapPin,
      label: "Ubicación",
      value: location.label ?? "Escríbenos y te compartimos la ubicación",
      href: location.mapsUrl ?? (location.label ? undefined : whatsappLink("Hola Crazy Shine, ¿dónde están ubicados?")),
    },
    {
      Icon: InstagramIcon,
      label: "Instagram",
      value: instagram.handle ?? (instagram.url ? "Síguenos" : "Próximamente"),
      href: instagram.url,
    },
    { Icon: Clock, label: "Horario", value: hours ?? "Con cita previa", href: undefined },
  ];

  return (
    <section ref={ref} id="contacto" className="relative overflow-hidden bg-ink" aria-labelledby="contacto-title">
      <div className="relative min-h-[100svh]">
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Media visual={contactVisual} sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/70" />
        </motion.div>

        <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center py-32">
          <p className="label mb-8 text-bone/70">(06) — Contacto</p>
          <MaskedHeadline
            id="contacto-title"
            className="display max-w-[12ch] text-[clamp(3.4rem,10vw,10.5rem)]"
            lines={[
              <span key="a" className="text-fade">
                Tu carro
              </span>,
              <span key="b" className="text-fade">
                merece
              </span>,
              <span key="c" className="text-chrome">
                Crazy Shine.
              </span>,
            ]}
          />
          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-3">
            <Cta whatsapp="Hola Crazy Shine, quiero agendar un servicio para mi vehículo.">Agenda tu servicio</Cta>
            <Cta href="#reserva" variant="ghost">
              Dejar mis datos
            </Cta>
          </Reveal>
        </div>
      </div>

      <ul className="container-x relative z-10 -mt-24 grid border-t border-bone/10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, label, value, href }) => {
          const inner = (
            <>
              <span className="flex items-center justify-between">
                <span className="label flex items-center gap-2.5 text-metal">
                  <Icon className="h-4 w-4 text-silver" aria-hidden="true" />
                  {label}
                </span>
                {href && <ArrowUpRight className="h-4 w-4 text-bone/50 transition-all duration-500 group-hover:rotate-45 group-hover:text-bone" />}
              </span>
              <span className="mt-4 block text-lg text-bone">{value}</span>
            </>
          );
          return (
            <li key={label} className="border-b border-bone/10 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0">
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="group block bg-ink/80 px-0 py-8 transition-colors hover:bg-graphite sm:px-6">
                  {inner}
                </a>
              ) : (
                <div className="bg-ink/80 py-8 sm:px-6">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
