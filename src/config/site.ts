/**
 * Configuración central del negocio.
 * Todo lo específico (WhatsApp, Instagram, ubicación, horarios) viene de variables de entorno.
 */

const env = (value: string | undefined) => (value && value.trim().length > 0 ? value.trim() : undefined);

export const siteConfig = {
  name: "Crazy Shine",
  tagline: "Detailing automotriz",
  description:
    "Crazy Shine — detailing automotriz profesional en Colombia. Lavado premium, full detailing, corrección de pintura, limpieza profunda de interiores, protección de pintura y detailing de motor.",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://crazy-shine-3os4.vercel.app",
  locale: "es_CO",

  whatsapp: {
    /** Formato internacional, solo dígitos. Configúralo con NEXT_PUBLIC_WHATSAPP_NUMBER. */
    number: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, ""),
    defaultMessage: "Hola Crazy Shine, quiero información sobre sus servicios de detailing y lavado profesional.",
  },

  instagram: {
    url: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    handle: env(process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE),
  },

  location: {
    label: env(process.env.NEXT_PUBLIC_LOCATION),
    mapsUrl: env(process.env.NEXT_PUBLIC_MAPS_URL),
  },

  /** Texto libre, p. ej. "Lun – Sáb · 8:00 a. m. – 6:00 p. m." */
  hours: env(process.env.NEXT_PUBLIC_HOURS),
} as const;

export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Garage", href: "#garage" },
  { label: "Esencia", href: "#esencia" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contacto", href: "#contacto" },
] as const;

/**
 * Enlace de WhatsApp. Sin número configurado, wa.me abre el selector de contactos
 * con el mensaje ya escrito, así que el botón sigue funcionando.
 */
export function whatsappLink(message: string = siteConfig.whatsapp.defaultMessage) {
  const text = encodeURIComponent(message);
  const number = siteConfig.whatsapp.number;
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function serviceMessage(service: string) {
  return `Hola Crazy Shine, quiero información y precio del servicio de ${service.toLowerCase()} para mi vehículo.`;
}
