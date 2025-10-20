import { NextRequest } from "next/server"

import { proxyMixpanelAsset } from "@/app/api/mixpanel/cdn/proxy"

export function GET(request: NextRequest, context: { params: { path: string[] } }) {
  const { path } = context.params

  if (!path || path.length === 0) {
    return Response.json({ error: "Missing Mixpanel asset path" }, { status: 400 })
  }

  return proxyMixpanelAsset(path.join("/"))
}

