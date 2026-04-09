'use client'

import { Layers } from 'lucide-react'
import { BudouXClient } from '@/components/BudouX/client'
import { POLICY_LABELS } from '@/utilities/domainSetsPolicy'
import type { SetsMembershipPanelProps } from './types'

export function SetsMembershipPanel({ sets, isBundleOnly }: SetsMembershipPanelProps) {
  if (sets.length === 0) return null

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 text-brand-primary" />
        <h3 className="text-sm font-semibold text-slate-900">
          <BudouXClient>{`${sets.length}件のセットに所属`}</BudouXClient>
        </h3>
      </div>

      <ul className="space-y-2">
        {sets.map((set) => (
          <li key={set.id} className="flex items-center justify-between text-sm">
            <span className="text-slate-700"><BudouXClient>{set.title}</BudouXClient></span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              <BudouXClient>{POLICY_LABELS[set.policy]}</BudouXClient>
            </span>
          </li>
        ))}
      </ul>

      {isBundleOnly && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
          <BudouXClient>このドメインはセットでのお問い合わせのみとなります。個別のお問い合わせはお受けしておりません。</BudouXClient>
        </div>
      )}
    </div>
  )
}
