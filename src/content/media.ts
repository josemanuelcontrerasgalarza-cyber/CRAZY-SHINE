import type { Visual } from "./types";

/**
 * ─────────────────────────────────────────────────────────────
 *  PHOTOGRAPHY
 * ─────────────────────────────────────────────────────────────
 * Drop authentic Crazy Shine photography into /public/images/** and
 * set the `src` of each slot. Recommended: 2400px wide JPG/WebP,
 * dark & contrasted, no watermarks. Until a `src` is set, a studio
 * render is displayed (it never pretends to be a real job).
 */

export const heroSlides: (Visual & { model: string; label: string })[] = [
  {
    model: "Ford Mustang GT 2021",
    label: "Full Detail",
    tone: "graphite",
    silhouette: "muscle",
    alt: "Black Ford Mustang GT under studio lights after a full detail",
    // src: "/images/hero/mustang-gt-2021.jpg",
  },
  {
    model: "Porsche 911",
    label: "Paint Correction",
    tone: "steel",
    silhouette: "coupe",
    alt: "Porsche 911 with mirror-finish paint under studio lighting",
    // src: "/images/hero/porsche-911.jpg",
  },
  {
    model: "Renault 12",
    label: "Classic Care",
    tone: "ember",
    silhouette: "classic",
    alt: "Orange classic Renault 12 with restored paint shine",
    // src: "/images/hero/renault-12.jpg",
  },
  {
    model: "BMW M",
    label: "Premium Wash",
    tone: "midnight",
    silhouette: "sedan",
    alt: "BMW M sedan covered in snow foam during a premium wash",
    // src: "/images/hero/bmw-m.jpg",
  },
  {
    model: "Mercedes-AMG",
    label: "Paint Protection",
    tone: "ivory",
    silhouette: "gt",
    alt: "Mercedes-AMG coupe with protected, glossy paint",
    // src: "/images/hero/mercedes-amg.jpg",
  },
];

export const editorialVisual: Visual = {
  tone: "ember",
  silhouette: "coupe",
  alt: "Macro of glossy automotive paint reflecting studio light bars",
  // src: "/images/editorial/paint-macro.jpg",
};

export const finalCtaVisual: Visual = {
  tone: "graphite",
  silhouette: "muscle",
  alt: "Black Ford Mustang GT under cinematic lighting",
  // src: "/images/editorial/mustang-cinematic.jpg",
};
