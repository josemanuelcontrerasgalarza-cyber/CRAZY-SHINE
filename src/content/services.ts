import type { Visual } from "./types";

export interface Service {
  id: string;
  number: string;
  name: string;
  summary: string;
  includes: string[];
  visual: Visual;
}

/** Prices are intentionally not listed: quotes are given via WhatsApp. */
export const services: Service[] = [
  {
    id: "premium-car-wash",
    number: "01",
    name: "Premium Car Wash",
    summary: "Lavado profesional exterior e interior, con productos de pH neutro y secado sin marcas.",
    includes: ["Snow foam pre-wash", "Two-bucket hand wash", "Interior vacuum & wipe-down"],
    visual: { tone: "midnight", silhouette: "sedan", alt: "Car covered in snow foam" },
  },
  {
    id: "full-detailing",
    number: "02",
    name: "Full Detailing",
    summary: "Detallado profundo de interiores y exteriores. Cada superficie, cada rincón.",
    includes: ["Decontamination", "Interior deep clean", "Gloss enhancement"],
    visual: { tone: "graphite", silhouette: "muscle", alt: "Fully detailed black muscle car" },
  },
  {
    id: "paint-correction",
    number: "03",
    name: "Paint Correction",
    summary: "Corrección de imperfecciones, swirls y rayones superficiales para recuperar la profundidad de la pintura.",
    includes: ["Paint depth inspection", "Multi-stage machine polish", "Swirl & haze removal"],
    visual: { tone: "steel", silhouette: "coupe", alt: "Paint being machine polished" },
  },
  {
    id: "interior-deep-clean",
    number: "04",
    name: "Interior Deep Clean",
    summary: "Limpieza profunda de tapicería, alfombras, cuero y superficies. Un habitáculo como nuevo.",
    includes: ["Upholstery extraction", "Leather care", "Vents, seams & trims"],
    visual: { tone: "ivory", silhouette: "suv", alt: "Clean premium car interior" },
  },
  {
    id: "paint-protection",
    number: "05",
    name: "Paint Protection",
    summary: "Protección y cuidado de la pintura para mantener el brillo y repeler agua y contaminantes.",
    includes: ["Surface preparation", "Sealant / coating application", "Hydrophobic finish"],
    visual: { tone: "ember", silhouette: "gt", alt: "Water beading on protected paint" },
  },
  {
    id: "engine-bay-detailing",
    number: "06",
    name: "Engine Bay Detailing",
    summary: "Limpieza estética profesional del compartimiento del motor, segura y meticulosa.",
    includes: ["Safe degreasing", "Detail brushing", "Plastics & rubber dressing"],
    visual: { tone: "graphite", silhouette: "hatch", alt: "Detailed engine bay" },
  },
];
