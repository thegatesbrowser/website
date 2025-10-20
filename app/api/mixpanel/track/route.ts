import { NextResponse } from "next/server"

import { getMixpanelClient } from "@/lib/mixpanel"

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? ""

  let events: Array<{ event: string; properties?: Record<string, unknown> }>

  try {
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const bodyText = await request.text()
      const params = new URLSearchParams(bodyText)
      const dataParam = params.get("data")
      if (!dataParam) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 })
      }

      // Mixpanel sends base64-encoded JSON array in `data` by default
      let decoded = dataParam
      let parsed: unknown
      try {
        parsed = JSON.parse(decoded)
      } catch {
        try {
          decoded = Buffer.from(dataParam, "base64").toString("utf8")
          parsed = JSON.parse(decoded)
        } catch {
          return NextResponse.json({ error: "Invalid data" }, { status: 400 })
        }
      }

      events = Array.isArray(parsed) ? (parsed as typeof events) : [parsed as typeof events[number]]
    } else if (contentType.includes("application/json")) {
      const json = (await request.json()) as unknown
      events = Array.isArray(json) ? (json as typeof events) : [json as typeof events[number]]
    } else {
      // Best-effort fallback: try form then JSON
      const bodyText = await request.text()
      const params = new URLSearchParams(bodyText)
      const dataParam = params.get("data")
      if (dataParam) {
        try {
          const decoded = Buffer.from(dataParam, "base64").toString("utf8")
          const parsed = JSON.parse(decoded)
          events = Array.isArray(parsed) ? (parsed as typeof events) : [parsed as typeof events[number]]
        } catch {
          return NextResponse.json({ error: "Invalid data" }, { status: 400 })
        }
      } else {
        try {
          const parsed = JSON.parse(bodyText)
          events = Array.isArray(parsed) ? (parsed as typeof events) : [parsed as typeof events[number]]
        } catch {
          return NextResponse.json({ error: "Unsupported content" }, { status: 400 })
        }
      }
    }
  } catch (error) {
    console.error("Failed to parse Mixpanel payload", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const mixpanel = getMixpanelClient()

  if (!mixpanel) {
    return NextResponse.json({ error: "Mixpanel unavailable" }, { status: 503 })
  }

  const referer = request.headers.get("referer") ?? undefined
  const userAgent = request.headers.get("user-agent") ?? undefined

  for (const event of events) {
    const properties = { ...(event.properties ?? {}) } as Record<string, unknown>
    // Ensure server-side token is used
    if ("token" in properties) {
      delete (properties as Record<string, unknown>)["token"]
    }

    mixpanel.track(event.event, {
      ...properties,
      referer,
      userAgent,
    })
  }

  return NextResponse.json({ ok: true })
}

