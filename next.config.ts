import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

const basePath = "/export-plugin"

const tokenFilePath = path.join(process.cwd(), "config", "mixpanel-token.txt")
let publicMixpanelToken = ""
try {
  publicMixpanelToken = fs.readFileSync(tokenFilePath, "utf8").trim()
} catch {}

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ASSET_PREFIX: basePath,
    NEXT_PUBLIC_MIXPANEL_TOKEN: publicMixpanelToken,
    NEXT_PUBLIC_MIXPANEL_REGION: "EU",
  },
};

export default nextConfig;
