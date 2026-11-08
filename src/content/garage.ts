import type { Visual } from "./types";

export interface GarageEntry {
  id: string;
  make: string;
  model: string;
  year?: string;
  category: "Muscle" | "Classic" | "Sports" | "Performance" | "Daily";
  service: "Paint Correction" | "Full Detail" | "Premium Wash" | "Classic Care" | "Paint Protection" | "Interior Deep Clean";
  story: string;
  details: string[];
  visual: Visual;
}

/**
 * THE GARAGE — replace each `visual.src` with real photos of jobs done by Crazy Shine.
 * Until then the studio renders are shown and the section is labelled as reference.
 */
export const garage: GarageEntry[] = [
  {
    id: "mustang-gt-2021",
    make: "Ford",
    model: "Mustang GT",
    year: "2021",
    category: "Muscle",
    service: "Paint Correction",
    story: "American muscle, deep black paint. Black shows everything — so every swirl had to go.",
    details: ["Multi-stage correction", "Mirror finish on black", "Wheels & calipers"],
    visual: { tone: "graphite", silhouette: "muscle", alt: "Black Ford Mustang GT 2021" },
  },
  {
    id: "renault-12",
    make: "Renault",
    model: "12",
    category: "Classic",
    service: "Classic Care",
    story: "A Colombian icon in intense orange. Classic character, modern detailing standards.",
    details: ["Gentle paint revival", "Chrome & trim care", "Interior refresh"],
    visual: { tone: "ember", silhouette: "classic", alt: "Orange classic Renault 12" },
  },
  {
    id: "porsche-911",
    make: "Porsche",
    model: "911",
    category: "Sports",
    service: "Full Detail",
    story: "Iconic lines deserve a flawless surface. Studio light, zero compromise.",
    details: ["Decontamination", "Gloss enhancement", "Leather care"],
    visual: { tone: "steel", silhouette: "coupe", alt: "Porsche 911" },
  },
  {
    id: "bmw-m",
    make: "BMW",
    model: "M",
    category: "Performance",
    service: "Premium Wash",
    story: "Track-bred performance, everyday use. A safe wash that respects the paint.",
    details: ["Snow foam pre-wash", "Two-bucket method", "Streak-free glass"],
    visual: { tone: "midnight", silhouette: "sedan", alt: "BMW M sedan" },
  },
  {
    id: "mercedes-amg",
    make: "Mercedes",
    model: "AMG",
    category: "Performance",
    service: "Paint Protection",
    story: "Power with elegance. Protection that keeps the shine long after it leaves the studio.",
    details: ["Paint sealant", "Hydrophobic glass", "Trim protection"],
    visual: { tone: "ivory", silhouette: "gt", alt: "Mercedes-AMG coupe" },
  },
  {
    id: "daily-driver",
    make: "Your",
    model: "Daily Driver",
    category: "Daily",
    service: "Interior Deep Clean",
    story: "No superdeportivo needed. Every car that comes in gets the same obsession.",
    details: ["Upholstery extraction", "Odour treatment", "Dashboard & vents"],
    visual: { tone: "steel", silhouette: "hatch", alt: "Everyday hatchback" },
  },
];
