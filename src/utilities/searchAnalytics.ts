/**
 * GTM Search Analytics — push search events to dataLayer.
 *
 * Every push checks the cookie_consent cookie FIRST.
 * No global state — reads the cookie each time per CLAUDE.md rule.
 * No events on partial keystrokes — only on submit/click/no-results.
 */

type SearchEventName = 'search_query' | 'search_result_click' | 'search_no_results'

interface SearchQueryData {
  query: string
  resultCount: number
  source: 'header' | 'page'
}

interface SearchResultClickData {
  query: string
  position: number
  resultType: string
  resultTitle: string
}

interface SearchNoResultsData {
  query: string
}

type SearchEventData = SearchQueryData | SearchResultClickData | SearchNoResultsData

/** Read cookie_consent cookie value. Returns 'accepted' | 'rejected' | null */
function getCookieConsent(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)cookie_consent=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

/** Push a search event to GTM dataLayer, gated by cookie consent */
export function pushSearchEvent(eventName: SearchEventName, data: SearchEventData): void {
  const consent = getCookieConsent()
  if (consent !== 'accepted') return

  if (typeof window === 'undefined') return
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({
    event: eventName,
    ...data,
  })
}

/** Convenience: push search_query event */
export function trackSearchQuery(query: string, resultCount: number, source: 'header' | 'page'): void {
  pushSearchEvent('search_query', { query, resultCount, source })
}

/** Convenience: push search_result_click event */
export function trackSearchResultClick(
  query: string,
  position: number,
  resultType: string,
  resultTitle: string,
): void {
  pushSearchEvent('search_result_click', { query, position, resultType, resultTitle })
}

/** Convenience: push search_no_results event */
export function trackSearchNoResults(query: string): void {
  pushSearchEvent('search_no_results', { query })
}
