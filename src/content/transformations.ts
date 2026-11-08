import type { Visual } from "./types";

export interface Transformation {
  id: string;
  title: string;
  caption: string;
  /**
   * Sube la foto real del "antes" como `before.src`. Mientras sea la misma foto que `after.src`,
   * el slider aplica una simulación visual y lo indica en pantalla.
   */
  before: Visual;
  after: Visual;
}

const photo = (src: string, alt: string, focus = "50% 50%"): Visual => ({ tone: "graphite", src, alt, focus });

export const transformations: Transformation[] = [
  {
    id: "pintura",
    title: "Pintura",
    caption: "Pintura opaca y sin vida → brillo profundo con reflejo.",
    before: photo("/images/services/paint-correction.jpg", "Pintura antes de la corrección"),
    after: photo("/images/services/paint-correction.jpg", "Pintura después de la corrección"),
  },
  {
    id: "interior",
    title: "Interior",
    caption: "Cabina con polvo y manchas → interior restaurado.",
    before: photo("/images/services/interior.jpg", "Interior antes de la limpieza"),
    after: photo("/images/services/interior.jpg", "Interior después de la limpieza"),
  },
  {
    id: "llantas",
    title: "Llantas",
    caption: "Rines contaminados con polvo de freno → llantas limpias y protegidas.",
    before: photo("/images/services/premium-wash.jpg", "Llanta antes de la limpieza"),
    after: photo("/images/services/premium-wash.jpg", "Llanta después de la limpieza"),
  },
  {
    id: "carro-completo",
    title: "Carro completo",
    caption: "Antes del detailing → después de Crazy Shine.",
    before: photo("/images/editorial/mustang-black.jpg", "Carro antes del detailing", "50% 60%"),
    after: photo("/images/editorial/mustang-black.jpg", "Carro después del detailing", "50% 60%"),
  },
];
