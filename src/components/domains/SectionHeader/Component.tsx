import { BudouX } from '@/components/BudouX'
import type { SectionHeaderProps } from './types'

export function SectionHeader({
  title,
  subtitle,
  accentUnderline = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-slate-900"><BudouX>{title}</BudouX></h2>
      {accentUnderline && (
        <div className="mt-2 w-16 h-1 bg-brand-alt rounded-full" />
      )}
      {subtitle && (
        <p className="mt-2 text-slate-600"><BudouX>{subtitle}</BudouX></p>
      )}
    </div>
  )
}
