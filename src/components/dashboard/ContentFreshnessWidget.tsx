import type { WidgetServerProps } from 'payload'

const collections = [
  { slug: 'posts' as const, label: 'Posts' },
  { slug: 'articles' as const, label: 'Articles' },
  { slug: 'services' as const, label: 'Services' },
  { slug: 'videos' as const, label: 'Videos' },
  { slug: 'portfolios' as const, label: 'Portfolio' },
  { slug: 'domains' as const, label: 'Domains' },
]

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
}

function freshnessIndicator(days: number): { bg: string; color: string; label: string } {
  if (days <= 30) return { bg: 'rgba(34,197,94,0.12)', color: '#16a34a', label: 'Fresh' }
  if (days <= 60) return { bg: 'rgba(251,191,36,0.15)', color: '#d97706', label: 'Aging' }
  return { bg: 'rgba(239,68,68,0.12)', color: '#dc2626', label: 'Stale' }
}

export default async function ContentFreshnessWidget({ req }: WidgetServerProps) {
  const { payload } = req

  const results = await Promise.all(
    collections.map(async ({ slug, label }) => {
      const result = await payload.find({
        collection: slug,
        limit: 1,
        sort: '-updatedAt',
        depth: 0,
      })
      const latest = result.docs[0]
      const updatedAt = latest?.updatedAt as string | undefined
      return { label, updatedAt, count: result.totalDocs }
    }),
  )

  return (
    <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.55 }}>
        Content Freshness
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {results.map(({ label, updatedAt, count }) => {
          if (!updatedAt || count === 0) {
            return (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
                <span style={{ fontSize: '13px' }}>{label}</span>
                <span style={{ fontSize: '11px', opacity: 0.4 }}>Empty</span>
              </div>
            )
          }

          const days = daysSince(updatedAt)
          const { bg, color, label: freshLabel } = freshnessIndicator(days)

          return (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
              <span style={{ fontSize: '13px' }}>{label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', opacity: 0.5 }}>
                  {days === 0 ? 'Today' : `${days}d`}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '6px',
                    background: bg,
                    color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    minWidth: '36px',
                    textAlign: 'center',
                  }}
                >
                  {freshLabel}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
