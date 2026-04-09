import { formatPriceShorthand } from '@/utilities/formatPrice'
import type { MoneyProps } from './types'

function formatCurrency(amount: number, currency: 'jpy' | 'usd'): string {
  if (currency === 'jpy') {
    return `${new Intl.NumberFormat('ja-JP').format(amount)}円`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 100)
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl font-semibold',
  xl: 'text-3xl font-bold',
}

export function Money({ amount, currency = 'jpy', size = 'md', className = '', enableShorthand = false }: MoneyProps) {
  const formatted = enableShorthand && currency === 'jpy'
    ? formatPriceShorthand(amount)
    : formatCurrency(amount, currency)

  return (
    <span className={`${sizeClasses[size]} ${className}`}>
      {formatted}
    </span>
  )
}
