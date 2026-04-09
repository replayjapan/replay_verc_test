import { BudouX } from '@/components/BudouX'
import { StatusBadge } from '@/components/domains/StatusBadge/Component'
import { Money } from '@/components/domains/Money/Component'
import type { DomainSummaryCardProps } from './types'

export function DomainSummaryCard({
  domainName,
  status,
  ageText,
  minimumOffer,
  currency = 'jpy',
  facts,
  enablePriceShorthand = false,
}: DomainSummaryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left: name + status + age */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{domainName}</h2>
          <div className="flex items-center gap-3">
            <StatusBadge status={status} size="md" />
            <span className="text-sm text-slate-600">{ageText}</span>
          </div>
        </div>

        {/* Right: price */}
        <div className="text-right">
          <div className="text-xs text-brand-alt tracking-wider mb-1"><BudouX>最低希望価格</BudouX></div>
          <Money amount={minimumOffer} currency={currency} size="xl" className="text-brand-alt" enableShorthand={enablePriceShorthand} />
        </div>
      </div>

      {/* Facts row — inside card, separated by border */}
      {facts && facts.length > 0 && (
        <div className="border-t border-slate-200 mt-6 pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <div className="text-sm text-slate-600 tracking-wider mb-1"><BudouX>{fact.label}</BudouX></div>
                <div className="text-base font-semibold text-slate-900"><BudouX>{fact.value}</BudouX></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
