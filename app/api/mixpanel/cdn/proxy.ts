import { NextResponse } from "next/server"

const MIXPANEL_CDN_BASE_URL = "https://cdn.mxpnl.com"
const DEFAULT_CACHE_CONTROL = "public, max-age=300, s-maxage=3600"

const normalizePath = (input: string) => input.replace(/^\/+/, "")

export async function proxyMixpanelAsset(path: string) {
  const normalizedPath = normalizePath(path)
  const targetUrl = `${MIXPANEL_CDN_BASE_URL}/${normalizedPath}`

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: "*/*",
      },
    })

    if (!response.ok || !response.body) {
      throw new Error(`Mixpanel CDN responded with ${response.status}`)
    }

    const headers = new Headers()
    const contentType = response.headers.get("content-type")
    if (contentType) {
      headers.set("Content-Type", contentType)
    }
    headers.set("Cache-Control", response.headers.get("cache-control") ?? DEFAULT_CACHE_CONTROL)

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    })
  } catch (error) {
    console.error("Mixpanel CDN proxy error", { path: normalizedPath, error })
    return NextResponse.json({ error: "Mixpanel asset unavailable" }, { status: 502 })
  }
}

