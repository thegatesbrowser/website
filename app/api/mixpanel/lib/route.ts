import { proxyMixpanelAsset } from "@/app/api/mixpanel/cdn/proxy"

const LIB_ASSET_PATH = "libs/mixpanel-2-latest.min.js"

export function GET() {
  return proxyMixpanelAsset(LIB_ASSET_PATH)
}

