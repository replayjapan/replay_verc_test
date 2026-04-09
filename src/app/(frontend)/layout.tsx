import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { CookieConsent } from '@/components/CookieConsent'
import { FooterComponent } from '@/globals/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  const siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting

  // Inject brand colors as CSS vars on <html> — overrides fallback values in globals.css
  const style: Record<string, string> = {}
  if (siteSettings?.brand?.primary) style['--brand-primary'] = siteSettings.brand.primary
  if (siteSettings?.brand?.alt) style['--brand-alt'] = siteSettings.brand.alt

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang="ja"
      style={style}
      suppressHydrationWarning
    >
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {siteSettings?.googleSearchConsoleCode && (
          <meta
            name="google-site-verification"
            content={siteSettings.googleSearchConsoleCode}
          />
        )}
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main>{children}</main>
          <FooterComponent />
          {siteSettings?.enableCookieConsent !== false && siteSettings?.gtmContainerId && (
            <CookieConsent gtmContainerId={siteSettings.gtmContainerId} />
          )}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
