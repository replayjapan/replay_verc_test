export function yearsSince(dateISO: string): number {
  const start = new Date(dateISO)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  const m = now.getMonth() - start.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) years--
  return Math.max(0, years)
}

export function yearsMonthsSince(dateISO: string): { years: number; months: number } {
  const start = new Date(dateISO)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  if (now.getDate() < start.getDate()) {
    months -= 1
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  return { years: Math.max(0, years), months: Math.max(0, months) }
}

export function formatYearsMonthsSince(dateISO: string): string {
  const { years, months } = yearsMonthsSince(dateISO)
  return `${years}y ${months}m`
}

export function domainExtension(domain: string): string {
  const idx = domain.lastIndexOf('.')
  if (idx === -1 || idx === domain.length - 1) return ''
  return domain.slice(idx)
}

export function domainSLDLength(domain: string): number {
  const parts = domain.split('.')
  return parts[0]?.length || domain.length
}
