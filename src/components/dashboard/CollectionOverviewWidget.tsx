import type { WidgetServerProps } from 'payload'

const allCollections = [
  { slug: 'pages' as const, label: 'Pages' },
  { slug: 'posts' as const, label: 'Posts' },
  { slug: 'articles' as const, label: 'Articles' },
  { slug: 'domains' as const, label: 'Domains' },
  { slug: 'domain-inquiries' as const, label: 'Inquiries' },
  { slug: 'services' as const, label: 'Services' },
  { slug: 'videos' as const, label: 'Videos' },
  { slug: 'portfolios' as const, label: 'Portfolio' },
  { slug: 'media' as const, label: 'Media' },
]

export default async function CollectionOverviewWidget({ req }: WidgetServerProps) {
  const { payload } = req

  const results = await Promise.all(
    allCollections.map(async ({ slug, label }) => {
      const result = await payload.count({ collection: slug })
      return { label, count: result.totalDocs }
    }),
  )

  const totalItems = results.reduce((sum, r) => sum + r.count, 0)

  return (
    <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.55 }}>
          Collections
        </h4>
        <span style={{ fontSize: '11px', opacity: 0.45 }}>
          {totalItems} total
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {results.map(({ label, count }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '7px 0',
              borderBottom: '1px solid rgba(148,163,184,0.1)',
            }}
          >
            <span style={{ fontSize: '13px' }}>{label}</span>
            <span style={{ fontSize: '14px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
