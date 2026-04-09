'use client'

import React from 'react'

import { EditDomainsButton } from '@/components/EditDomainsButton'
import { ImportDomainsButton } from '@/components/ImportDomainsButton'

const panelStyle: React.CSSProperties = {
  background: '#f8f9fb',
  borderRadius: 12,
  display: 'grid',
  gap: 24,
  padding: 24,
}

const sectionStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e0e7ff',
  borderRadius: 10,
  boxShadow: '0 12px 32px rgba(27, 36, 63, 0.04)',
  padding: 24,
}

const headingStyle: React.CSSProperties = {
  color: '#1B243f',
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 8,
}

const bodyStyle: React.CSSProperties = {
  color: '#4b5563',
  lineHeight: 1.6,
  marginBottom: 16,
}

export const BeforeDomainsDashboard: React.FC = () => {
  return (
    <div style={panelStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ ...headingStyle, margin: 0 }}>Domain Portfolio Toolkit</h2>
        <p style={bodyStyle}>
          Use these CSV utilities to seed fresh domains or apply bulk edits. Files are read from the
          project root, so upload updated CSVs before running the actions.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>Import Domains</h3>
        <p style={bodyStyle}>
          Reads <code>domain-import.csv</code> and creates new published domains. Required columns:
          <code> domainName</code> and <code>description</code>. Optional columns include minimum offer,
          featured flag, category, value points, and potential uses.
        </p>
        <ImportDomainsButton />
      </div>

      <div style={sectionStyle}>
        <h3 style={headingStyle}>Bulk Edit Existing Domains</h3>
        <p style={bodyStyle}>
          Uses <code>domain-edit.csv</code> to update existing domains. Include a{' '}
          <code>domainName</code> column to match records, plus any fields that should be updated.
          Leave cells blank when you do not want to change a value.
        </p>
        <EditDomainsButton />
      </div>
    </div>
  )
}

export default BeforeDomainsDashboard
