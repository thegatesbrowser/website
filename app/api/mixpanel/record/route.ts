import { NextRequest } from "next/server"

import { proxyMixpanelAsset } from "@/app/api/mixpanel/cdn/proxy"

const RECORDER_ASSET_PATH = "libs/mixpanel-recorder.min.js"
const REGION = (process.env.NEXT_PUBLIC_MIXPANEL_REGION || "US").toUpperCase()
const MIXPANEL_RECORD_ENDPOINT = REGION === "EU"
  ? "https://api-eu.mixpanel.com/record/"
  : "https://api-js.mixpanel.com/record/"

export function GET() {
  return proxyMixpanelAsset(RECORDER_ASSET_PATH)
}

export async function POST(request: NextRequest) {
  try {
    const upstreamUrl = new URL(MIXPANEL_RECORD_ENDPOINT)
    upstreamUrl.search = request.nextUrl.search

    const upstreamHeaders = new Headers()
    const contentType = request.headers.get("content-type")
    if (contentType) {
      upstreamHeaders.set("Content-Type", contentType)
    }
    const contentEncoding = request.headers.get("content-encoding")
    if (contentEncoding) {
      upstreamHeaders.set("Content-Encoding", contentEncoding)
    }
    const accept = request.headers.get("accept")
    if (accept) {
      upstreamHeaders.set("Accept", accept)
    }

    // Mixpanel /record endpoint requires Basic Authentication with project token
    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
    if (token) {
      // Basic auth format: "username:password" base64 encoded, where username is token and password is empty
      const credentials = Buffer.from(`${token}:`).toString("base64")
      upstreamHeaders.set("Authorization", `Basic ${credentials}`)

      // Also add token to query for backwards compatibility
      if (!upstreamUrl.searchParams.get("token")) {
        upstreamUrl.searchParams.set("token", token)
      }
    }

    const bodyBuffer = request.body ? await request.arrayBuffer() : undefined
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: upstreamHeaders,
      body: bodyBuffer,
    }

    let upstreamResponse: Response
    try {
      upstreamResponse = await fetch(upstreamUrl.toString(), fetchOptions)
    } catch (err) {
      const error = err as Error & { cause?: { code?: string } }
      const cause = error.cause || error
      // DNS/network fallback: if EU host cannot resolve, retry against US host
      if (
        REGION === "EU" &&
        cause &&
        ("code" in cause && (cause.code === "ENOTFOUND" || cause.code === "EAI_AGAIN"))
      ) {
        const fallbackUrl = new URL("https://api-js.mixpanel.com/record/")
        fallbackUrl.search = upstreamUrl.search
        upstreamResponse = await fetch(fallbackUrl.toString(), fetchOptions)
      } else {
        throw err
      }
    }

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      throw new Error(`Mixpanel record ingest responded with ${upstreamResponse.status}`)
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: {
        "Content-Type": upstreamResponse.headers.get("content-type") ?? "application/json",
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Mixpanel record proxy error", error)
    return Response.json({ error: "Mixpanel record ingest unavailable" }, { status: 502 })
  }
}

