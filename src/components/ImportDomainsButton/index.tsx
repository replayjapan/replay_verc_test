'use client'

import React, { useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC<{ created: number }> = ({ created }) => (
  <div>
    Imported {created} new {created === 1 ? 'domain' : 'domains'}. Refresh the Domains collection to review them.
  </div>
)

export const ImportDomainsButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [imported, setImported] = useState(false)
  const [createdCount, setCreatedCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      if (loading) {
        toast.info('Import already in progress.')
        return
      }

      if (imported) {
        toast.info('Domains already imported this session.')
        return
      }

      if (errorMessage) {
        toast.error('Previous import failed. Refresh the page and try again.')
        return
      }

      setLoading(true)

      try {
        await toast.promise(
          fetch('/next/seed-domains', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(async (response) => {
            if (!response.ok) {
              const text = await response.text()
              throw new Error(text || 'Failed to import domains.')
            }

            const data: {
              summary?: { created?: number }
              success?: boolean
            } = await response.json()

            const created = data.summary?.created ?? 0
            setCreatedCount(created)
            setImported(true)
            return created
          }),
          {
            loading: 'Importing domains from CSV…',
            success: (count: number) => <SuccessMessage created={count} />,
            error: (err) => (err instanceof Error ? err.message : 'Failed to import domains.'),
          },
        )
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        setErrorMessage(message)
      } finally {
        setLoading(false)
      }
    },
    [errorMessage, imported, loading],
  )

  let status = ''
  if (loading) status = ' (importing…)'
  if (imported) status = ` (${createdCount} imported)`
  if (errorMessage) status = ` (error: ${errorMessage})`

  return (
    <>
      <button
        className="domain-admin-button"
        data-variant="primary"
        onClick={handleClick}
        type="button"
      >
        Import Domains from CSV
      </button>
      {status}
    </>
  )
}

export default ImportDomainsButton
