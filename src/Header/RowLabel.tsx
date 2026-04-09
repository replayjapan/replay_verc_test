'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const itemLabel = data?.data?.label || 'Unnamed Item'
  const submenuType = data?.data?.submenuType
  const hasIcon = data?.data?.icon && data?.data?.icon !== 'none'
  const rowNum = data.rowNumber !== undefined ? data.rowNumber + 1 : ''

  const badges = []
  if (submenuType && submenuType !== 'none') {
    const typeLabel = submenuType === 'mega' ? 'Mega Menu' : submenuType === 'multiColumn' ? 'Multi-Column' : 'Dropdown'
    badges.push(typeLabel)
  }
  if (hasIcon) {
    badges.push(`Icon: ${data?.data?.icon}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">
        {rowNum && `${rowNum}. `}{itemLabel}
      </span>
      {badges.length > 0 && (
        <span className="text-xs text-gray-500">
          [{badges.join(', ')}]
        </span>
      )}
    </div>
  )
}
