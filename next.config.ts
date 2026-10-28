import type { NextConfig } from "next";

// Pin the workspace root so Turbopack does not walk up to unrelated lockfiles.
const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
