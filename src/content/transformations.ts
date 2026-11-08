import type { Visual } from "./types";

export interface Transformation {
  id: string;
  title: string;
  caption: string;
  /** If `before.src` / `after.src` are missing, the studio render is shown with a simulated dull/clean state. */
  before: Visual;
  after: Visual;
}

export const transformations: Transformation[] = [
  {
    id: "paint",
    title: "Paint",
    caption: "Oxidised, dull paint → deep, reflective gloss.",
    before: { tone: "ember", silhouette: "classic", alt: "Dull, oxidised paint before detailing" },
    after: { tone: "ember", silhouette: "classic", alt: "Glossy paint after detailing" },
  },
  {
    id: "interior",
    title: "Interior",
    caption: "Stained upholstery → restored, clean cabin.",
    before: { tone: "ivory", silhouette: "suv", alt: "Dirty interior before deep clean" },
    after: { tone: "ivory", silhouette: "suv", alt: "Restored interior after deep clean" },
  },
  {
    id: "wheels",
    title: "Wheels",
    caption: "Brake-dust contaminated rims → clean, protected wheels.",
    before: { tone: "steel", silhouette: "coupe", alt: "Contaminated wheels before cleaning" },
    after: { tone: "steel", silhouette: "coupe", alt: "Clean wheels after detailing" },
  },
  {
    id: "full",
    title: "Full Car",
    caption: "Before the detail → after Crazy Shine.",
    before: { tone: "graphite", silhouette: "muscle", alt: "Car before full detailing" },
    after: { tone: "graphite", silhouette: "muscle", alt: "Car after full detailing" },
  },
];
