import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "*": [
      "**/node_modules/@next/swc-*/**",
      "**/node_modules/next/dist/compiled/@next/swc-*/**",
      "**/node_modules/@swc/**",
      "**/node_modules/@img/**",
    ],
  },
  images: { unoptimized: true },
};

export default nextConfig;

