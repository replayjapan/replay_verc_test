export type DomainStatus = 'open' | 'not_available' | 'sold' | 'pending'

export interface StatusBadgeProps {
  status: DomainStatus
  size?: 'sm' | 'md'
  className?: string
}
