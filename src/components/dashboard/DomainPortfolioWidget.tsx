import type { WidgetServerProps } from 'payload'

import type { Domain, DomainInquiry } from '@/payload-types'
import { formatPriceShorthand } from '@/utilities/formatPrice'

const statusLabels: Record<string, string> = {
  open: '受付中',
  sold: '販売済',
  pending: '保留中',
  not_available: '非公開',
}

export default async function DomainPortfolioWidget({ req }: WidgetServerProps) {
  const { payload } = req

  const [domains, inquiries] = await Promise.all([
    payload.find({ collection: 'domains', limit: 0, depth: 0 }),
    payload.find({
      collection: 'domain-inquiries',
      limit: 1,
      sort: '-createdAt',
      depth: 1,
    }),
  ])

  const docs = domains.docs as Domain[]
  const totalDomains = domains.totalDocs

  const statusCounts: Record<string, number> = {}
  let totalValue = 0

  for (const d of docs) {
    const s = d.status
    statusCounts[s] = (statusCounts[s] || 0) + 1
    if (d.minimumOffer && typeof d.minimumOffer === 'number') totalValue += d.minimumOffer
  }

  const latestInquiry = inquiries.docs[0] as DomainInquiry | undefined

  return (
    <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.55 }}>
        Domain Portfolio
      </h4>

      <div style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1 }}>{totalDomains}</div>
      <div style={{ fontSize: '12px', opacity: 0.45, margin: '4px 0 12px' }}>Total Domains</div>

      <div style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.2 }}>
        {totalValue > 0 ? formatPriceShorthand(totalValue) : '-'}
      </div>
      <div style={{ fontSize: '12px', opacity: 0.45, margin: '4px 0 16px' }}>Portfolio Value</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {Object.entries(statusCounts).map(([status, count]) => (
          <span
            key={status}
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '10px',
              background: status === 'open' ? 'rgba(34,197,94,0.12)' : status === 'sold' ? 'rgba(59,130,246,0.12)' : 'rgba(148,163,184,0.12)',
              color: status === 'open' ? '#16a34a' : status === 'sold' ? '#2563eb' : '#64748b',
              fontWeight: 500,
            }}
          >
            {statusLabels[status] || status} {count}
          </span>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(148,163,184,0.15)', paddingTop: '12px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.45, marginBottom: '6px' }}>
          Latest Inquiry
        </div>
        {latestInquiry ? (
          <>
            <div style={{ fontSize: '13px', fontWeight: 500 }}>
              {latestInquiry.name}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.55, marginTop: '2px' }}>
              {latestInquiry.domainName || 'Unknown'} — {latestInquiry.createdAt ? new Date(latestInquiry.createdAt).toLocaleDateString('ja-JP') : ''}
            </div>
          </>
        ) : (
          <div style={{ fontSize: '12px', opacity: 0.45 }}>No inquiries yet</div>
        )}
      </div>
    </div>
  )
}
