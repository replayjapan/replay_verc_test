export const formatDate = (dateString: string | null | undefined, locale = 'en-US'): string => {
  if (!dateString) {
    return '-'
  }

  const date = new Date(dateString)

  if (Number.isNaN(date.valueOf())) {
    return '-'
  }

  return Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export const formatCurrency = (
  amount: number,
  currencyCode: 'USD' | 'JPY',
  locale = 'en-US',
  showDecimals = false,
): string => {
  if (!Number.isFinite(amount)) {
    return '-'
  }

  const minimumFractionDigits = currencyCode === 'USD' && showDecimals ? 2 : 0
  const maximumFractionDigits = currencyCode === 'USD' && showDecimals ? 2 : 0

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}
