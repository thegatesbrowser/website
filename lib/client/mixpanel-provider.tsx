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

const MIXPANEL_LIB_PATH = withBasePath("/api/mixpanel/lib")
const MIXPANEL_SNIPPET_PATH = withBasePath("/api/mixpanel/snippet")
const MIXPANEL_RECORDER_PATH = withBasePath("/api/mixpanel/recorder")
const MIXPANEL_API_HOST = withBasePath("/api/mixpanel")

declare global {
  interface Window {
    MIXPANEL_CUSTOM_LIB_URL?: string
    __mp_recorder_src?: string
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
    window.MIXPANEL_CUSTOM_LIB_URL = MIXPANEL_LIB_PATH
    window.__mp_recorder_src = MIXPANEL_RECORDER_PATH

    const mixpanelScript = document.createElement("script")
    mixpanelScript.src = MIXPANEL_SNIPPET_PATH
    mixpanelScript.async = true
    mixpanelScript.onload = () => {
      if (!window.mixpanel) {
        console.error("Mixpanel snippet loaded but global object missing")
        return
      }

      const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
      if (!token) {
        console.error("NEXT_PUBLIC_MIXPANEL_TOKEN not found")
        return
      }

      window.mixpanel.init(token, {
        api_host: MIXPANEL_API_HOST,
        autocapture: true,
        track_pageview: true,
        record_sessions_percent: 100,
        recorder_src: MIXPANEL_RECORDER_PATH
      })

      window.__mixpanelReady = true
      flushMixpanelQueue()
    }

    mixpanelScript.onerror = (error) => {
      console.error("Unable to load Mixpanel snippet", error)
    }

    document.head.appendChild(mixpanelScript)

    return () => {
      document.head.removeChild(mixpanelScript)
    }
  }, [])

  return <>{children}</>
}
