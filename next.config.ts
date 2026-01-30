import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude large SWC binaries from the Netlify server function bundle,
  // but keep @swc/helpers which Next needs at runtime.
  outputFileTracingExcludes: {
    "*": [
      "**/node_modules/@next/swc-*/**",
      "**/node_modules/@swc/core-*/**",
      "**/node_modules/@swc/core/**",
    ],
  },
  outputFileTracingIncludes: {
    "*": ["**/node_modules/@swc/helpers/**"],
  },
};

export default nextConfig;
