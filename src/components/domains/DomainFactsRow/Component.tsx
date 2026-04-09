import { BudouX } from '@/components/BudouX'
import type { DomainFactsRowProps } from './types'

export function DomainFactsRow({ facts }: DomainFactsRowProps) {
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
      <div className={`grid grid-cols-2 ${({ 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' } as Record<number, string>)[facts.length] || 'md:grid-cols-4'} gap-4`}>
        {facts.map((fact) => (
          <div key={fact.label} className="text-center">
            <div className="text-sm md:text-xs text-slate-600 tracking-wider mb-1"><BudouX>{fact.label}</BudouX></div>
            <div className="text-base md:text-sm font-semibold text-slate-900"><BudouX>{fact.value}</BudouX></div>
          </div>
        ))}
      </div>
    </div>
  )
}
