import type { Visual } from "./types";

export interface Service {
  id: string;
  number: string;
  name: string;
  /** Palabra de identidad del servicio (aparece gigante en su tile). */
  keyword: string;
  summary: string;
  includes: string[];
  visual: Visual;
}

/** Sin precios publicados: la cotización se hace por WhatsApp. */
export const services: Service[] = [
  {
    id: "lavado-premium",
    number: "01",
    name: "Lavado premium",
    keyword: "Espuma",
    summary: "Lavado exterior e interior con productos de pH neutro y secado sin marcas.",
    includes: ["Prelavado con espuma", "Lavado a mano", "Aspirado interior"],
    visual: { tone: "midnight", src: "/images/services/premium-wash.jpg", alt: "Lavado a presión de la rueda de un deportivo negro", focus: "50% 50%" },
  },
  {
    id: "full-detailing",
    number: "02",
    name: "Full detailing",
    keyword: "Obsesión",
    summary: "Detallado profundo de interiores y exteriores. Cada superficie, cada rincón.",
    includes: ["Descontaminación", "Interior a fondo", "Realce de brillo"],
    visual: { tone: "graphite", src: "/images/hero/detailing-foam.jpg", alt: "Detailer lavando a mano un deportivo negro con espuma", focus: "40% 55%" },
  },
  {
    id: "correccion-de-pintura",
    number: "03",
    name: "Corrección de pintura",
    keyword: "Reflejo",
    summary: "Eliminamos swirls, hologramas y rayones superficiales para devolverle profundidad a la pintura.",
    includes: ["Medición de pintura", "Pulido por etapas", "Acabado espejo"],
    visual: { tone: "steel", src: "/images/services/paint-correction.jpg", alt: "Frontal brillante de un BMW M4", focus: "50% 50%" },
  },
  {
    id: "limpieza-de-interiores",
    number: "04",
    name: "Limpieza profunda de interiores",
    keyword: "Cabina",
    summary: "Tapicería, alfombras, cuero y plásticos. Un habitáculo que se siente nuevo.",
    includes: ["Extracción de tapicería", "Cuidado del cuero", "Ductos y costuras"],
    visual: { tone: "ivory", src: "/images/services/interior.jpg", alt: "Interior limpio con tablero y volante", focus: "50% 50%" },
  },
  {
    id: "proteccion-de-pintura",
    number: "05",
    name: "Protección de pintura",
    keyword: "Escudo",
    summary: "Sellado y protección para conservar el brillo y repeler agua y contaminantes.",
    includes: ["Preparación de superficie", "Sellante o recubrimiento", "Efecto hidrofóbico"],
    visual: { tone: "ember", src: "/images/services/paint-protection.jpg", alt: "Detailer aplicando película protectora en el faro de un Mercedes", focus: "50% 40%" },
  },
  {
    id: "detailing-de-motor",
    number: "06",
    name: "Detailing de motor",
    keyword: "Corazón",
    summary: "Limpieza estética y segura del compartimiento del motor, con acabado de exhibición.",
    includes: ["Desengrase seguro", "Cepillado de detalle", "Acondicionado de plásticos"],
    visual: { tone: "graphite", src: "/images/services/engine-bay.jpg", alt: "Compartimiento del motor de un auto rojo de alto desempeño", focus: "50% 45%" },
  },
];
