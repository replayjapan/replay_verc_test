import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCachedGlobal } from '@/utilities/getGlobals'
import type { SiteSetting } from '@/payload-types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Styleguide',
}

export default async function StyleguidePage() {
  if (process.env.NODE_ENV === 'production') return notFound()
  const siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting

  const brandPrimary = siteSettings?.brand?.primary || '#1B243F'
  const brandAlt = siteSettings?.brand?.alt || '#F0A848'

  return (
    <main className="site-container py-12">
      <h1 className="text-3xl font-bold mb-8">Styleguide</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Foundation</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-medium w-40">Brand Primary:</span>
            <div
              className="w-10 h-10 rounded border border-border"
              style={{ backgroundColor: brandPrimary }}
            />
            <code className="text-sm">{brandPrimary}</code>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium w-40">Brand Alt:</span>
            <div
              className="w-10 h-10 rounded border border-border"
              style={{ backgroundColor: brandAlt }}
            />
            <code className="text-sm">{brandAlt}</code>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium w-40">Language:</span>
            <code className="text-sm">ja</code>
          </div>
        </div>
      </section>
    </main>
  )
}
