'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['navItems']>[number]>()

  const linkLabel = data?.data?.link?.label
  const keyLabel = data?.data?.key
  const rowNum = data.rowNumber !== undefined ? data.rowNumber + 1 : ''

  const label = linkLabel
    ? `${rowNum}: ${linkLabel}${keyLabel ? ` (${keyLabel})` : ''}`
    : 'Row'

  return <div>{label}</div>
}
