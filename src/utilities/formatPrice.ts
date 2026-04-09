/**
 * Format a JPY price with Japanese shorthand (万/億).
 *
 * Examples:
 *   formatPriceShorthand(500_000)      → '50万円'
 *   formatPriceShorthand(5_000_000)    → '500万円'
 *   formatPriceShorthand(50_000_000)   → '5,000万円'
 *   formatPriceShorthand(100_000_000)  → '1億円'
 *   formatPriceShorthand(150_000_000)  → '1億5,000万円'
 *   formatPriceShorthand(3_000)        → '3,000円'  (below 万 threshold)
 */
export function formatPriceShorthand(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) return '-'

  const OKU = 100_000_000
  const MAN = 10_000

  if (amount >= OKU) {
    const okuPart = Math.floor(amount / OKU)
    const remainder = amount % OKU
    const manPart = Math.floor(remainder / MAN)

    if (manPart > 0) {
      return `${okuPart.toLocaleString('ja-JP')}億${manPart.toLocaleString('ja-JP')}万円`
    }
    return `${okuPart.toLocaleString('ja-JP')}億円`
  }

  if (amount >= MAN) {
    const manPart = Math.floor(amount / MAN)
    const remainder = amount % MAN

    if (remainder > 0) {
      // Not a clean 万 multiple — fall back to full number
      return `${amount.toLocaleString('ja-JP')}円`
    }
    return `${manPart.toLocaleString('ja-JP')}万円`
  }

  return `${amount.toLocaleString('ja-JP')}円`
}
