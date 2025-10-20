import { proxyMixpanelAsset } from "@/app/api/mixpanel/cdn/proxy"

const SNIPPET_ASSET_PATH = "site_media/js/api/mixpanel.2.js"

export function GET() {
  return proxyMixpanelAsset(SNIPPET_ASSET_PATH)
}

