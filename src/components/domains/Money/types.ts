export interface MoneyProps {
  amount: number
  currency?: 'jpy' | 'usd'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  enableShorthand?: boolean
}
