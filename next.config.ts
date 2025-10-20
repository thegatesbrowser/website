import type { NextConfig } from "next";

const basePath = "/export-plugin"

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ASSET_PREFIX: basePath,
  },
};

export default nextConfig;
