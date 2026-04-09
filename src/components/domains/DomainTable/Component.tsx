import Link from 'next/link'
import { BudouX } from '@/components/BudouX'
import { ExternalLink } from 'lucide-react'
import { StatusBadge } from '@/components/domains/StatusBadge/Component'
import { Money } from '@/components/domains/Money/Component'
import { formatDate } from '@/utilities/formatDate'
import type { DomainTableProps } from './types'

export function DomainTable({ rows, currency = 'jpy', enablePriceShorthand = false }: DomainTableProps) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-12 text-slate-600">
        <p className="text-lg mb-1"><BudouX>該当するドメインが見つかりません</BudouX></p>
        <p className="text-sm"><BudouX>検索条件を変更してください</BudouX></p>
      </div>
    )
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {rows.map((row) => (
          <Link
            key={row.id}
            href={row.href}
            className="block rounded-lg border border-slate-200 p-4 hover:border-brand-alt transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-slate-900 min-w-0 break-all"><BudouX>{row.domainName}</BudouX></h3>
              <StatusBadge status={row.status} />
            </div>
            <p className="text-sm text-slate-600 mb-3">{row.category && <BudouX>{row.category}</BudouX>}</p>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-slate-600 text-xs">登録日</div>
                <div className="text-slate-800">{formatDate(row.registrationDate)}</div>
              </div>
              <div>
                <div className="text-slate-600 text-xs"><BudouX>年数</BudouX></div>
                <div className="text-slate-800">{row.ageYears}年</div>
              </div>
              <div>
                <div className="text-slate-600 text-xs"><BudouX>最低希望価格</BudouX></div>
                <Money amount={row.minimumOffer} currency={currency} size="sm" className="text-brand-alt font-semibold" enableShorthand={enablePriceShorthand} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-600">
              <th className="py-3 px-4 font-medium"><BudouX>ドメイン</BudouX></th>
              <th className="py-3 px-4 font-medium"><BudouX>カテゴリー</BudouX></th>
              <th className="py-3 px-4 font-medium"><BudouX>登録日</BudouX></th>
              <th className="py-3 px-4 font-medium text-right"><BudouX>年数</BudouX></th>
              <th className="py-3 px-4 font-medium text-right"><BudouX>最低希望価格</BudouX></th>
              <th className="py-3 px-4 font-medium"><BudouX>販売状況</BudouX></th>
              <th className="py-3 px-4 font-medium text-center"><BudouX>詳細</BudouX></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  <Link href={row.href} className="text-[var(--brand-primary)] underline decoration-1 underline-offset-4 hover:text-[var(--brand-alt)] transition-colors duration-200"><BudouX>{row.domainName}</BudouX></Link>
                </td>
                <td className="py-3 px-4 text-slate-600">{row.category && <BudouX>{row.category}</BudouX>}</td>
                <td className="py-3 px-4 text-slate-600">{formatDate(row.registrationDate)}</td>
                <td className="py-3 px-4 text-slate-600 text-right">{row.ageYears}年</td>
                <td className="py-3 px-4 text-right">
                  <Money amount={row.minimumOffer} currency={currency} size="sm" className="text-brand-alt font-semibold" enableShorthand={enablePriceShorthand} />
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-3 px-4 text-center">
                  <Link
                    href={row.href}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-brand-primary text-white rounded-lg hover:bg-brand-alt hover:text-brand-primary transition-colors duration-200"
                  >
                    <BudouX>詳細</BudouX>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
