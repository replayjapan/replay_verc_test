'use client'

import { Search, RotateCcw } from 'lucide-react'
import { BudouXClient } from '@/components/BudouX/client'
import type { DomainFiltersProps, SortOption } from './types'
import type { DomainStatus } from '@/components/domains/StatusBadge/types'

const statusOptions: { value: DomainStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'open', label: '受付中' },
  { value: 'not_available', label: '受付停止' },
  { value: 'sold', label: '売却済' },
  { value: 'pending', label: '商談中' },
]

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'domain_asc', label: 'ドメイン A→Z' },
  { value: 'domain_desc', label: 'ドメイン Z→A' },
  { value: 'age_desc', label: '登録日 新しい順' },
  { value: 'age_asc', label: '登録日 古い順' },
  { value: 'price_asc', label: '価格 安い順' },
  { value: 'price_desc', label: '価格 高い順' },
]

const selectClasses =
  'w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-brand-alt focus:border-brand-alt outline-none'

export function DomainFilters({
  categories,
  selectedCategory,
  selectedStatus,
  selectedSort,
  searchQuery,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onReset,
}: DomainFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
      {/* Search */}
      <div className="relative sm:col-span-2 lg:col-span-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="ドメインを検索..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`${selectClasses} pl-9`}
        />
      </div>

      {/* Category */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={selectClasses}
      >
        <option value="">カテゴリー</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value as DomainStatus | 'all')}
        className={selectClasses}
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className={selectClasses}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Reset */}
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm text-slate-500 hover:text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <BudouXClient>リセット</BudouXClient>
      </button>
    </div>
  )
}
