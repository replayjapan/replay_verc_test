import Link from 'next/link'
import type { FC } from 'react'

interface ListingPaginationProps {
  /** Base path for the collection listing, e.g. "/videos" or "/portfolio". No trailing slash. */
  basePath: string
  /** Current page number (1-indexed). */
  page: number
  /** Total number of pages. */
  totalPages: number
  className?: string
}

function pageHref(basePath: string, page: number): string {
  return page === 1 ? basePath : `${basePath}/page/${page}`
}

/**
 * Link-based listing pagination.
 *
 * Renders nothing if totalPages <= 1. Works with force-static pages because
 * it uses real URLs (page 1 = basePath, page N = basePath/page/N), so each
 * numbered page is a statically-generated route.
 *
 * Designed to be shared across collection listings (videos, portfolio, etc.).
 * Layout: Prev — 1 … n-1 n n+1 … last — Next. Shows up to 5 numbered pages.
 */
export const ListingPagination: FC<ListingPaginationProps> = ({
  basePath,
  page,
  totalPages,
  className = '',
}) => {
  if (totalPages <= 1) return null

  const hasPrev = page > 1
  const hasNext = page < totalPages

  // Build the numbered page list: always show 1 and last, plus a window around current.
  const pages = new Set<number>()
  pages.add(1)
  pages.add(totalPages)
  for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
    pages.add(i)
  }
  const sortedPages = Array.from(pages).sort((a, b) => a - b)

  // Insert ellipses where there are gaps.
  const items: Array<number | 'ellipsis'> = []
  sortedPages.forEach((p, i) => {
    if (i > 0 && p - sortedPages[i - 1] > 1) items.push('ellipsis')
    items.push(p)
  })

  return (
    <nav
      aria-label="ページネーション"
      className={`max-w-6xl mx-auto px-6 py-10 ${className}`}
    >
      <ul className="flex items-center justify-center gap-2">
        <li>
          {hasPrev ? (
            <Link
              href={pageHref(basePath, page - 1)}
              className="inline-flex items-center justify-center min-w-11 h-11 px-4 text-sm text-slate-700 border border-slate-200 rounded-lg hover:border-brand-alt hover:text-brand-alt transition-colors duration-200"
              aria-label="前のページ"
            >
              ← 前へ
            </Link>
          ) : (
            <span
              className="inline-flex items-center justify-center min-w-11 h-11 px-4 text-sm text-slate-400 border border-slate-200 rounded-lg cursor-not-allowed"
              aria-disabled="true"
            >
              ← 前へ
            </span>
          )}
        </li>

        {items.map((item, i) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${i}`} className="px-1 text-slate-400 select-none">
              …
            </li>
          ) : item === page ? (
            <li key={item}>
              <span
                aria-current="page"
                className="inline-flex items-center justify-center w-11 h-11 text-sm font-semibold text-white bg-brand-primary rounded-lg"
              >
                {item}
              </span>
            </li>
          ) : (
            <li key={item}>
              <Link
                href={pageHref(basePath, item)}
                className="inline-flex items-center justify-center w-11 h-11 text-sm text-slate-700 border border-slate-200 rounded-lg hover:border-brand-alt hover:text-brand-alt transition-colors duration-200"
              >
                {item}
              </Link>
            </li>
          ),
        )}

        <li>
          {hasNext ? (
            <Link
              href={pageHref(basePath, page + 1)}
              className="inline-flex items-center justify-center min-w-11 h-11 px-4 text-sm text-slate-700 border border-slate-200 rounded-lg hover:border-brand-alt hover:text-brand-alt transition-colors duration-200"
              aria-label="次のページ"
            >
              次へ →
            </Link>
          ) : (
            <span
              className="inline-flex items-center justify-center min-w-11 h-11 px-4 text-sm text-slate-400 border border-slate-200 rounded-lg cursor-not-allowed"
              aria-disabled="true"
            >
              次へ →
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default ListingPagination
