import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Styleguide — Domains',
}

export default async function StyleguideDomainsPage() {
  if (process.env.NODE_ENV === 'production') return notFound()
  const payload = await getPayload({ config })

  const { docs: domains, totalDocs } = await payload.find({
    collection: 'domains',
    limit: 20,
    depth: 0,
    sort: '-featured',
  })

  return (
    <main className="site-container py-12">
      <h1 className="text-3xl font-bold mb-4">Domains</h1>
      <p className="text-muted-foreground mb-8">
        Slug strategy: latin-only, no periods
      </p>

      {totalDocs === 0 ? (
        <p className="text-muted-foreground italic">
          No domains found. Run the seed endpoint to populate sample data.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold">Domain</th>
                <th className="py-2 pr-4 font-semibold">Slug</th>
                <th className="py-2 pr-4 font-semibold">Featured</th>
                <th className="py-2 pr-4 font-semibold">Status</th>
                <th className="py-2 pr-4 font-semibold text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((domain) => (
                <tr key={domain.id} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-medium">{domain.domainName}</td>
                  <td className="py-2 pr-4">
                    <code className="text-xs bg-surface px-1.5 py-0.5 rounded">
                      {domain.slug ?? '—'}
                    </code>
                  </td>
                  <td className="py-2 pr-4">{domain.featured ? 'Yes' : 'No'}</td>
                  <td className="py-2 pr-4">{domain.domainStatus}</td>
                  <td className="py-2 pr-4 text-right tabular-nums">
                    {typeof domain.minimumOffer === 'number'
                      ? `¥${domain.minimumOffer.toLocaleString()}`
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-muted-foreground mt-4">
            Showing {domains.length} of {totalDocs} domains
          </p>
        </div>
      )}
    </main>
  )
}
