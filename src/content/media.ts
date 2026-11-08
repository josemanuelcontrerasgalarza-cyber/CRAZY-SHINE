import type { Visual } from "./types";

/**
 * FOTOGRAFÍA
 * Fotos de referencia (Licencia Unsplash / Wikimedia Commons — ver public/images/CREDITS.md).
 * Para usar fotos propias, súbelas a public/images/** con el mismo nombre.
 */

/** Protagonista del hero. Sube tu foto del Mustang GT 2021 como public/images/hero/mustang-gt-2021.jpg. */
export const heroVisual: Visual & { model: string; detail: string } = {
  model: "Ford Mustang GT",
  detail: "Lavado premium",
  tone: "graphite",
  src: "/images/hero/mustang-gt-2021.jpg",
  fallbackSrc: "/images/hero/mustang-wash.jpg",
  alt: "Ford Mustang GT blanco dentro de una bahía de lavado con vapor",
  focus: "62% 55%",
};

export const essenceVisuals: Visual[] = [
  {
    tone: "graphite",
    src: "/images/editorial/mustang-tunnel.jpg",
    alt: "Ford Mustang blanco con franjas en un túnel oscuro",
    focus: "45% 60%",
  },
  {
    tone: "ember",
    src: "/images/editorial/paint-reflection.jpg",
    alt: "Macro de pintura roja brillante reflejando un patrón de luz junto al faro",
    focus: "40% 50%",
  },
  {
    tone: "steel",
    src: "/images/hero/mercedes-amg-gtr.jpg",
    alt: "Mercedes-AMG GT R gris con calipers amarillos",
    focus: "55% 60%",
  },
];

export const contactVisual: Visual = {
  tone: "graphite",
  src: "/images/editorial/mustang-black.jpg",
  alt: "Ford Mustang negro al atardecer",
  focus: "50% 60%",
};
