import type { Visual } from "./types";

export interface GarageEntry {
  id: string;
  make: string;
  model: string;
  /** Generación o año, solo si la foto lo permite identificar con certeza. */
  generation?: string;
  category: "Muscle car" | "Clásico" | "Deportivo" | "Alto desempeño" | "Diario";
  service: "Corrección de pintura" | "Full detailing" | "Lavado premium" | "Cuidado clásico" | "Protección de pintura" | "Interiores";
  story: string;
  visual: Visual;
}

/**
 * EL GARAGE — fotografías de referencia del tipo de vehículos que atiende Crazy Shine.
 * No son trabajos de Crazy Shine: reemplaza cada `visual.src` por fotos reales cuando las tengas.
 */
export const garage: GarageEntry[] = [
  {
    id: "mustang-gt",
    make: "Ford",
    model: "Mustang GT",
    generation: "S550",
    category: "Muscle car",
    service: "Corrección de pintura",
    story: "Músculo americano en tono oscuro. Los colores oscuros lo muestran todo: cada swirl tiene que desaparecer.",
    visual: {
      tone: "graphite",
      src: "/images/garage/mustang-gt-2021.jpg",
      fallbackSrc: "/images/garage/mustang-gt.jpg",
      alt: "Ford Mustang GT gris oscuro, vista frontal",
      focus: "50% 55%",
    },
  },
  {
    id: "renault-12",
    make: "Renault",
    model: "12 TL",
    category: "Clásico",
    service: "Cuidado clásico",
    story: "Un ícono de las calles colombianas. Carácter clásico con estándares de detailing modernos.",
    visual: { tone: "ember", silhouette: "classic", src: "/images/garage/renault-12.jpg", alt: "Renault 12 TL naranja estacionado en la calle", focus: "45% 60%" },
  },
  {
    id: "porsche-911",
    make: "Porsche",
    model: "911 GT3 RS",
    category: "Deportivo",
    service: "Full detailing",
    story: "Líneas icónicas que merecen una superficie impecable, del alerón a la cabina.",
    visual: { tone: "graphite", src: "/images/garage/porsche-911-gt3rs.jpg", alt: "Porsche 911 GT3 RS negro en el puerto", focus: "50% 70%" },
  },
  {
    id: "bmw-m4",
    make: "BMW",
    model: "M4",
    category: "Alto desempeño",
    service: "Lavado premium",
    story: "Desempeño de pista para el día a día. Un lavado seguro que respeta la pintura.",
    visual: { tone: "steel", src: "/images/garage/bmw-m4.jpg", alt: "BMW M4 gris al anochecer", focus: "50% 60%" },
  },
  {
    id: "mercedes-amg",
    make: "Mercedes-AMG",
    model: "C63",
    category: "Alto desempeño",
    service: "Protección de pintura",
    story: "Potencia con elegancia. Protección para que el brillo dure mucho después de salir.",
    visual: { tone: "steel", src: "/images/garage/mercedes-amg-c63.jpg", alt: "Mercedes-AMG C63 gris con franja amarilla", focus: "50% 45%" },
  },
  {
    id: "chevrolet-impala",
    make: "Chevrolet",
    model: "Impala",
    category: "Clásico",
    service: "Cuidado clásico",
    story: "Cromo, curvas y décadas de historia. Los clásicos reciben paciencia, no atajos.",
    visual: { tone: "graphite", src: "/images/garage/chevrolet-impala.jpg", alt: "Chevrolet Impala clásico negro", focus: "50% 60%" },
  },
  {
    id: "vw-polo",
    make: "Volkswagen",
    model: "Polo",
    category: "Diario",
    service: "Interiores",
    story: "No hace falta un superdeportivo. El carro de todos los días recibe la misma obsesión.",
    visual: { tone: "steel", src: "/images/garage/vw-polo.jpg", alt: "Volkswagen Polo azul", focus: "50% 60%" },
  },
  {
    id: "bmw-m2",
    make: "BMW",
    model: "M2",
    category: "Alto desempeño",
    service: "Corrección de pintura",
    story: "Azul profundo bajo el atardecer. La corrección revela el color que la pintura siempre tuvo.",
    visual: { tone: "midnight", src: "/images/garage/bmw-m2.jpg", alt: "BMW M2 azul al atardecer frente al mar", focus: "50% 60%" },
  },
];
