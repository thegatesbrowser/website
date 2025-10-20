import { NextResponse } from "next/server"

import { proxyMixpanelAsset } from "@/app/api/mixpanel/cdn/proxy"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GET(request: Request, { params }: any) {
  const path = params?.path as string[]

  if (!path || path.length === 0) {
    return NextResponse.json({ error: "Missing Mixpanel asset path" }, { status: 400 })
  }

  return proxyMixpanelAsset(path.join("/"))
}

