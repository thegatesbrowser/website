import { NextRequest } from "next/server"

import { proxyMixpanelAsset } from "@/app/api/mixpanel/cdn/proxy"

export function GET(request: NextRequest) {
  const assetPath = request.nextUrl.searchParams.get("path")

  if (!assetPath) {
    return Response.json({ error: "Missing Mixpanel asset path" }, { status: 400 })
  }

  return proxyMixpanelAsset(assetPath)
}

