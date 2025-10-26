"use client"

import { useEffect, useRef } from "react"
import type mixpanelBrowser from "mixpanel-browser"

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

const MIXPANEL_API_BASE_PATH = withBasePath("/api/mixpanel")

const getDefaultMixpanelApiHost = () => {
  const region = (process.env.NEXT_PUBLIC_MIXPANEL_REGION || "US").toUpperCase()
  return region === "EU" ? "https://api-eu.mixpanel.com" : "https://api-js.mixpanel.com"
}

const getDefaultRecorderSrc = () => "https://cdn.mxpnl.com/libs/mixpanel-recorder.min.js"

const getMixpanelProxyConfig = () => {
  if (typeof window === "undefined") {
    return {
      apiHost: MIXPANEL_API_BASE_PATH,
      recorderSrc: `${MIXPANEL_API_BASE_PATH}/recorder`,
    }
  }

  const hostname = window.location.hostname
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0"

  if (isLocalhost) {
    return {
      apiHost: getDefaultMixpanelApiHost(),
      recorderSrc: getDefaultRecorderSrc(),
    }
  }

  return {
    apiHost: MIXPANEL_API_BASE_PATH,
    recorderSrc: `${MIXPANEL_API_BASE_PATH}/recorder`,
  }
}

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
        const mp: typeof mixpanelBrowser = ("default" in mod ? mod.default : mod) as typeof mixpanelBrowser
        window.mixpanel = mp as Window["mixpanel"]

        const { apiHost, recorderSrc } = getMixpanelProxyConfig()

        mp.init(token, {
          api_host: apiHost,
          autocapture: true,
          track_pageview: true,
          record_sessions_percent: 100,
        })

        const mixpanelInstance = window.mixpanel
        if (mixpanelInstance?.set_config) {
          mixpanelInstance.set_config({
            recorder_src: recorderSrc,
          })
        }

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
