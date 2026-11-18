import type { NextConfig } from "next";

// Served from https://vadimfedorovsv.github.io/robotics-portfolio/ in production.
const basePath = process.env.NODE_ENV === "production" ? "/robotics-portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // The Cult UI video player logs every hover; keep the production console clean.
  compiler: { removeConsole: { exclude: ["error", "warn"] } },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
