"use client"

export type MixpanelCallback = () => void

declare global {
  interface Window {
    mixpanel?: {
      track: (event: string, properties?: Record<string, unknown>) => void
      init: (token: string, config: Record<string, unknown>) => void
      set_config?: (config: Record<string, unknown>) => void
    }
    __mixpanelQueue?: MixpanelCallback[]
    __mixpanelReady?: boolean
  }
}

export function enqueueMixpanelCallback(callback: MixpanelCallback) {
  if (!window.__mixpanelQueue) {
    window.__mixpanelQueue = []
  }

  window.__mixpanelQueue.push(callback)
}

export function flushMixpanelQueue() {
  const queue = window.__mixpanelQueue

  if (!queue?.length) {
    return
  }

  while (queue.length > 0) {
    const callback = queue.shift()

    try {
      callback?.()
    } catch (error) {
      console.error("Mixpanel queued callback error", error)
    }
  }
}

