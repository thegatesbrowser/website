import { proxyMixpanelAsset } from "@/app/api/mixpanel/cdn/proxy"

const RECORDER_ASSET_PATH = "libs/mixpanel-recorder.min.js"

export function GET() {
  return proxyMixpanelAsset(RECORDER_ASSET_PATH)
}

