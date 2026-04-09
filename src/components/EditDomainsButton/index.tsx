'use client'

import React, { useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import '../ImportDomainsButton/index.scss'

type EditSummary = {
  updated?: number
  skipped?: number
  notFound?: number
  errors?: number
}

export const EditDomainsButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [summary, setSummary] = useState<EditSummary>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      if (loading) {
        toast.info('Bulk edit already running.')
        return
      }

      if (processed) {
        toast.info('CSV edits already applied this session.')
        return
      }

      if (errorMessage) {
        toast.error('Previous edit failed. Refresh and try again.')
        return
      }

      setLoading(true)

      try {
        const response = await fetch('/next/edit-domains', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          const text = await response.text()
          throw new Error(text || 'Failed to process domain edits.')
        }

        const data: { summary?: EditSummary } = await response.json()
        const editSummary = data.summary ?? {}
        setSummary(editSummary)
        setProcessed(true)
        toast.success(`Updated ${editSummary.updated ?? 0} domains.`)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        setErrorMessage(message)
        toast.error(message)
      } finally {
        setLoading(false)
      }
    },
    [errorMessage, loading, processed],
  )

  let status = ''
  if (loading) status = ' (processing…)'
  if (processed) {
    const { updated = 0, skipped = 0, notFound = 0, errors = 0 } = summary
    status = ` (${updated} updated, ${skipped} skipped, ${notFound} missing, ${errors} errors)`
  }
  if (errorMessage) status = ` (error: ${errorMessage})`

  return (
    <>
      <button
        className="domain-admin-button"
        data-variant="alt"
        onClick={handleClick}
        type="button"
      >
        Apply Domain Edits from CSV
      </button>
      {status}
    </>
  )
}

export default EditDomainsButton
