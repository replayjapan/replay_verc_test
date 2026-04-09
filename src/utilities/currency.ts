export type SiteCurrency = 'usd' | 'jpy'

export function formatMinorUnits(amount: number, currency: SiteCurrency): string {
  const isUSD = currency === 'usd'
  const normalized = isUSD ? amount / 100 : amount
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: isUSD ? 'USD' : 'JPY',
    minimumFractionDigits: isUSD ? 2 : 0,
    maximumFractionDigits: isUSD ? 2 : 0,
  }).format(normalized)
}
