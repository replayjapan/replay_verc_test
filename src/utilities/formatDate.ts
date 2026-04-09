/** Format an ISO date string as 年月日 (e.g. 2012年9月1日).
 *  Parses the date string directly to avoid timezone offset bugs
 *  where new Date('2012-09-01') in UTC- zones returns Aug 31. */
export function formatDate(iso: string): string {
  if (!iso) return '-'

  const datePart = iso.split('T')[0]
  const parts = datePart.split('-')

  if (parts.length < 3) return '-'

  const year = Number(parts[0])
  const month = Number(parts[1])
  const day = Number(parts[2])

  if (!year || !month || !day) return '-'

  return `${year}年${month}月${day}日`
}
