import type { WidgetServerProps } from 'payload'

import type { DomainInquiry } from '@/payload-types'

const statusStyle: Record<string, { bg: string; color: string }> = {
  new: { bg: 'rgba(251,191,36,0.15)', color: '#d97706' },
  contacted: { bg: 'rgba(59,130,246,0.12)', color: '#2563eb' },
  closed: { bg: 'rgba(148,163,184,0.12)', color: '#64748b' },
}

const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  closed: 'Closed',
}

export default async function InquiryTrackerWidget({ req }: WidgetServerProps) {
  const { payload } = req

  const inquiries = await payload.find({
    collection: 'domain-inquiries',
    limit: 8,
    sort: '-createdAt',
    depth: 0,
  })

  const docs = inquiries.docs as DomainInquiry[]

  return (
    <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.55 }}>
          Inquiry Tracker
        </h4>
        <span style={{ fontSize: '11px', opacity: 0.45 }}>
          {inquiries.totalDocs} total
        </span>
      </div>

      {docs.length === 0 ? (
        <div style={{ fontSize: '13px', opacity: 0.45, padding: '20px 0' }}>
          No inquiries yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {docs.map((inquiry) => {
            const status = inquiry.status
            const style = statusStyle[status] || statusStyle.closed
            return (
              <div
                key={inquiry.id}
                style={{
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(148,163,184,0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>
                    {inquiry.domainName || 'Unknown'}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 500,
                      padding: '2px 7px',
                      borderRadius: '8px',
                      background: style.bg,
                      color: style.color,
                    }}
                  >
                    {statusLabels[status] || status}
                  </span>
                </div>
                <div style={{ fontSize: '11px', opacity: 0.5 }}>
                  {inquiry.name} — {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString('ja-JP') : ''}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
