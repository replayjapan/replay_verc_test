'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { BudouXClient } from '@/components/BudouX/client'
import type { PaginationProps } from './types'

const pageSizes = [10, 12, 25, 50]

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  const btnClasses =
    'p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      {/* Results count + page size */}
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <span>
          <BudouXClient>{totalItems > 0 ? `${start}〜${end} / ${totalItems}件` : '0件'}</BudouXClient>
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-slate-300 rounded-lg px-2 py-1 text-sm bg-white"
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}件
            </option>
          ))}
        </select>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          className={btnClasses}
          aria-label="最初のページ"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={btnClasses}
          aria-label="前のページ"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="px-3 py-1 text-sm text-slate-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={btnClasses}
          aria-label="次のページ"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className={btnClasses}
          aria-label="最後のページ"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
