"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import type { Visual } from "@/content/types";
import { StudioRender } from "./StudioRender";

interface Props {
  visual: Visual;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  condition?: "clean" | "dull";
  scene?: boolean;
  fit?: "contain" | "bleed";
}

const manifest = new Set((process.env.NEXT_PUBLIC_IMAGE_MANIFEST ?? "").split(",").filter(Boolean));
/** Local paths not present at build time are skipped (remote URLs are always tried). */
const exists = (src?: string) => Boolean(src) && (!src!.startsWith("/") || manifest.size === 0 || manifest.has(src!));

/** Renders the photograph if one is configured, otherwise the studio render. */
export function Media({ visual, sizes, priority, className, imgClassName, condition, scene, fit }: Props) {
  // 0 = src, 1 = fallbackSrc, 2 = studio render
  const [attempt, setAttempt] = useState(0);
  const src = exists(visual.src) ? visual.src : undefined;
  const fallback = exists(visual.fallbackSrc) ? visual.fallbackSrc : undefined;
  const current = attempt === 0 ? (src ?? fallback) : attempt === 1 ? fallback : undefined;
  const usePhoto = Boolean(current);

  return (
    <div className={clsx("absolute inset-0", className)}>
      {usePhoto ? (
        <Image
          key={current}
          src={current!}
          alt={visual.alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setAttempt((a) => (a === 0 && src && fallback ? 1 : 2))}
          className={clsx("object-cover", condition === "dull" && "photo-dull", imgClassName)}
          style={{ objectPosition: visual.focus ?? "50% 50%" }}
        />
      ) : null}
      {usePhoto && condition === "dull" && <div className="studio-dust pointer-events-none absolute inset-0" />}
      {!usePhoto && (
        <StudioRender tone={visual.tone} silhouette={visual.silhouette} condition={condition} scene={scene} label={visual.alt} fit={fit} />
      )}
    </div>
  );
}
