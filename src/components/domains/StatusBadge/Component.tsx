import { BudouX } from '@/components/BudouX'
import type { StatusBadgeProps, DomainStatus } from './types'

const statusConfig: Record<DomainStatus, { label: string; bg: string; text: string }> = {
  open: { label: '受付中', bg: 'bg-green-100', text: 'text-green-800' },
  not_available: { label: '受付停止', bg: 'bg-slate-200', text: 'text-slate-700' },
  sold: { label: '売却済', bg: 'bg-red-100', text: 'text-red-800' },
  pending: { label: '商談中', bg: 'bg-yellow-100', text: 'text-yellow-800' },
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
}

export function StatusBadge({ status, size = 'sm', className = '' }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${config.bg} ${config.text} ${sizeClasses[size]} ${className}`}
    >
      <BudouX>{config.label}</BudouX>
    </span>
  )
}
