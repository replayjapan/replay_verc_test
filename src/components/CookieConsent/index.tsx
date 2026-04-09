'use client'

import { loadDefaultJapaneseParser } from 'budoux'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const parser = loadDefaultJapaneseParser()

type CookieConsentProps = {
  gtmContainerId: string
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function loadGTM(containerId: string) {
  if (document.querySelector(`script[src*="gtm.js?id=${containerId}"]`)) return

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`
  script.async = true
  document.head.appendChild(script)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

function BudouXText({ text }: { text: string }) {
  const segments = useMemo(() => parser.parse(text), [text])
  return (
    <p className="text-sm text-gray-700">
      {segments.map((segment, i) => (
        <React.Fragment key={i}>
          {i > 0 && <wbr />}
          {segment}
        </React.Fragment>
      ))}
    </p>
  )
}

const COOKIE_NAME = 'cookie_consent'

export function CookieConsent({ gtmContainerId }: CookieConsentProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME)
    if (consent === 'accepted') {
      loadGTM(gtmContainerId)
    } else if (!consent) {
      setVisible(true)
    }
  }, [gtmContainerId])

  const handleAccept = useCallback(() => {
    setCookie(COOKIE_NAME, 'accepted', 365)
    setVisible(false)
    loadGTM(gtmContainerId)
  }, [gtmContainerId])

  const handleReject = useCallback(() => {
    setCookie(COOKIE_NAME, 'declined', 365)
    setVisible(false)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-4 shadow-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <BudouXText text="このサイトではCookieを使用しています。サイトの利用を続けることで、Cookieの使用に同意いただけます。" />
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleReject}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            拒否する
          </button>
          <button
            onClick={handleAccept}
            className="rounded-md bg-[var(--brand-primary,#1B243F)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            同意する
          </button>
        </div>
      </div>
    </div>
  )
}
