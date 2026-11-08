import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add the host here if you serve photography from a CDN instead of /public.
    remotePatterns: [],
  },
};

export default nextConfig;
