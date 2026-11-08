/**
 * Central business configuration.
 * Every value that is specific to the business lives here or in environment variables,
 * so nothing (phone numbers, addresses, prices) is hardcoded inside components.
 */

const env = (value: string | undefined) => (value && value.trim().length > 0 ? value.trim() : undefined);

export const siteConfig = {
  name: "Crazy Shine",
  tagline: "Automotive Detailing",
  claim: "Make every reflection count.",
  description:
    "Crazy Shine — premium automotive detailing. Professional car wash, full detailing, paint correction, interior deep clean, paint protection and engine bay detailing.",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://crazyshine.example",
  locale: "es_CO",

  whatsapp: {
    /** International format, digits only. Configure with NEXT_PUBLIC_WHATSAPP_NUMBER. */
    number: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, ""),
    defaultMessage:
      "Hola Crazy Shine, quiero información sobre sus servicios de detailing y lavado profesional.",
  },

  instagram: {
    url: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    handle: env(process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE),
  },

  location: {
    label: env(process.env.NEXT_PUBLIC_LOCATION),
    mapsUrl: env(process.env.NEXT_PUBLIC_MAPS_URL),
  },

  /** Free text, e.g. "Mon – Sat · 8:00 – 18:00". */
  hours: env(process.env.NEXT_PUBLIC_HOURS),
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Builds a WhatsApp deep link. When no number is configured, wa.me opens the
 * contact picker with the message prefilled, so the button still works.
 */
export function whatsappLink(message: string = siteConfig.whatsapp.defaultMessage) {
  const text = encodeURIComponent(message);
  const number = siteConfig.whatsapp.number;
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function serviceMessage(service: string) {
  return `Hola Crazy Shine, quiero información y precio del servicio ${service} para mi vehículo.`;
}
