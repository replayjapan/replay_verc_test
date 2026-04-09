'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel<{ name?: string; slug?: string }>()

  return <span>{data?.name || data?.slug || 'Untitled Group'}</span>
}
