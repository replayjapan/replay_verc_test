import type { WidgetServerProps } from 'payload'

const checkCollections = [
  { slug: 'pages' as const, label: 'Pages' },
  { slug: 'posts' as const, label: 'Posts' },
  { slug: 'articles' as const, label: 'Articles' },
  { slug: 'services' as const, label: 'Services' },
  { slug: 'domains' as const, label: 'Domains' },
]

export default async function SeoHealthWidget({ req }: WidgetServerProps) {
  const { payload } = req

  let totalDocs = 0
  let missingMeta = 0
  let missingOg = 0
  let missingExcerpt = 0

  await Promise.all(
    checkCollections.map(async ({ slug }) => {
      const result = await payload.find({
        collection: slug,
        limit: 0,
        depth: 0,
      })

      totalDocs += result.totalDocs

      for (const doc of result.docs) {
        const meta = (doc as { meta?: { title?: string; description?: string; image?: unknown } }).meta
        if (!meta?.title || !meta?.description) missingMeta++
        if (!meta?.title) missingOg++
        const excerpt = (doc as { searchExcerpt?: string }).searchExcerpt
        if (slug !== 'domains' && !excerpt) missingExcerpt++
      }
    }),
  )

  const issues = missingMeta + missingOg + missingExcerpt
  const maxIssues = totalDocs * 3
  const score = maxIssues > 0 ? Math.round(((maxIssues - issues) / maxIssues) * 100) : 100

  const scoreColor = score >= 80 ? '#16a34a' : score >= 60 ? '#d97706' : '#dc2626'
  const scoreBg = score >= 80 ? 'rgba(34,197,94,0.12)' : score >= 60 ? 'rgba(251,191,36,0.15)' : 'rgba(239,68,68,0.12)'

  return (
    <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.55 }}>
        SEO Health
      </h4>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: scoreColor,
            lineHeight: 1,
          }}
        >
          {score}%
        </span>
        <span style={{ fontSize: '11px', opacity: 0.45 }}>
          across {totalDocs} docs
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {[
          { label: 'Missing meta title/desc', value: missingMeta },
          { label: 'Missing OG title', value: missingOg },
          { label: 'Missing search excerpt', value: missingExcerpt },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(148,163,184,0.1)' }}>
            <span style={{ fontSize: '12px' }}>{label}</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: value > 0 ? '#d97706' : '#16a34a' }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
