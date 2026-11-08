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

/** Renders the photograph if one is configured, otherwise the studio render. */
export function Media({ visual, sizes, priority, className, imgClassName, condition, scene, fit }: Props) {
  const [failed, setFailed] = useState(false);
  const usePhoto = Boolean(visual.src) && !failed;

  return (
    <div className={clsx("absolute inset-0", className)}>
      {usePhoto ? (
        <Image
          src={visual.src!}
          alt={visual.alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={clsx("object-cover", condition === "dull" && "saturate-[.3] brightness-75 contrast-75", imgClassName)}
          style={{ objectPosition: visual.focus ?? "50% 50%" }}
        />
      ) : (
        <StudioRender tone={visual.tone} silhouette={visual.silhouette} condition={condition} scene={scene} label={visual.alt} fit={fit} />
      )}
    </div>
  );
}
