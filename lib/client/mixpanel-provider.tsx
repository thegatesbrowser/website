"use client"

import { useEffect, useRef } from "react"

import { flushMixpanelQueue } from "@/lib/client/mixpanel-shared"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const normalisePrefix = (value: string) => {
  if (!value) return ""
  const trimmed = value.endsWith("/") ? value.slice(0, -1) : value
  return trimmed === "/" ? "" : trimmed
}

const basePath = normalisePrefix(BASE_PATH)

const withBasePath = (path: string) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${basePath}${cleanPath}` || cleanPath
}

const MIXPANEL_RECORDER_PATH = withBasePath("/api/mixpanel/recorder")
const MIXPANEL_API_HOST = withBasePath("/api/mixpanel")

type MixpanelProviderProps = {
  children: React.ReactNode
}

export function MixpanelProvider({ children }: MixpanelProviderProps) {
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) {
      return
    }

    initializedRef.current = true

    window.__mixpanelReady = false

    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
    if (!token) {
      console.error("NEXT_PUBLIC_MIXPANEL_TOKEN not found")
      return
    }

    ;(async () => {
      try {
        const mod = await import("mixpanel-browser")
        // Some bundlers expose default, others the module itself; handle both
        const mp = (mod as unknown as { default?: unknown }).default ?? (mod as unknown)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).mixpanel = mp as any

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mp as any).init(token, {
          api_host: MIXPANEL_API_HOST,
          autocapture: true,
          track_pageview: true,
          record_sessions_percent: 100,
          recorder_src: MIXPANEL_RECORDER_PATH,
        })

        window.__mixpanelReady = true
        flushMixpanelQueue()
      } catch (error) {
        console.error("Failed to load mixpanel-browser", error)
      }
    })()

    return () => {}
  }, [])

  return <>{children}</>
}
