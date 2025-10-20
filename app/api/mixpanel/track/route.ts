import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const getClientIpFromRequest = (req: Request): string | undefined => {
    const headers = req.headers
    const xForwardedFor = headers.get("x-forwarded-for")
    if (xForwardedFor) {
      const forwardedIps = xForwardedFor
        .split(",")
        .map((ip) => ip.trim())
        .filter((ip) => ip.length > 0)
      if (forwardedIps.length > 0) return forwardedIps[0]
    }

    const xRealIp = headers.get("x-real-ip")
    if (xRealIp) return xRealIp

    const cfConnectingIp = headers.get("cf-connecting-ip")
    if (cfConnectingIp) return cfConnectingIp

    const trueClientIp = headers.get("true-client-ip")
    if (trueClientIp) return trueClientIp

    const xClientIp = headers.get("x-client-ip")
    if (xClientIp) return xClientIp

    return undefined
  }

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

  const referer = request.headers.get("referer") ?? undefined
  const userAgent = request.headers.get("user-agent") ?? undefined
  const clientIp = getClientIpFromRequest(request)

  const region = (process.env.NEXT_PUBLIC_MIXPANEL_REGION || "US").toUpperCase()
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
  if (!token) {
    return NextResponse.json({ error: "Mixpanel token missing" }, { status: 500 })
  }

  const trackHost = region === "EU" ? "https://api-eu.mixpanel.com" : "https://api-js.mixpanel.com"
  const trackUrlBase = `${trackHost}/track`

  for (const event of events) {
    const properties = { ...(event.properties ?? {}) } as Record<string, unknown>
    // Ensure server-side token is used
    if ("token" in properties) {
      delete (properties as Record<string, unknown>)["token"]
    }

    // Add token and enrich with headers
    const eventPayload = {
      event: event.event,
      properties: {
        ...properties,
        token,
        referer,
        userAgent,
      },
    }

    if (clientIp && !('ip' in eventPayload.properties)) {
      (eventPayload.properties as Record<string, unknown>)['ip'] = clientIp
    }

    // Build request to Mixpanel track endpoint with explicit IP override
    const endpointUrl = `${trackUrlBase}?ip=0`

    const bodyData = Buffer.from(JSON.stringify(eventPayload)).toString("base64")
    const formBody = `data=${encodeURIComponent(bodyData)}`

    const upstreamResponse = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
      body: formBody,
      // Mixpanel expects short-lived requests; no need for caching
    })

    if (!upstreamResponse.ok) {
      const text = await upstreamResponse.text().catch(() => "")
      console.error("Mixpanel track forward failed", upstreamResponse.status, text)
    }
  }

  return NextResponse.json({ ok: true })
}

