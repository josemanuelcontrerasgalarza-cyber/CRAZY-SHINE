export type Tone = "graphite" | "ember" | "steel" | "midnight" | "ivory";
export type Silhouette = "muscle" | "coupe" | "classic" | "sedan" | "gt" | "suv" | "hatch";

/**
 * A visual slot. Set `src` to a real photograph (e.g. "/images/garage/mustang.jpg")
 * and it is rendered with next/image. Without `src`, an art-directed studio render
 * is shown instead, so the layout always looks finished.
 */
export interface Visual {
  src?: string;
  alt: string;
  tone: Tone;
  silhouette?: Silhouette;
  /** Used if `src` is missing on disk (e.g. owner photo not uploaded yet). */
  fallbackSrc?: string;
  /** CSS object-position for the photograph, e.g. "50% 60%". */
  focus?: string;
}
