import type { NextConfig } from "next";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

/** Lista de fotos en /public/images: permite usar la foto propia si existe y el respaldo si no. */
function imageManifest(dir = join(process.cwd(), "public", "images")): string[] {
  try {
    return readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) return imageManifest(full);
      return /\.(jpe?g|png|webp|avif)$/i.test(name) ? ["/" + relative(join(process.cwd(), "public"), full).split(sep).join("/")] : [];
    });
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: { NEXT_PUBLIC_IMAGE_MANIFEST: imageManifest().join(",") },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default nextConfig;
