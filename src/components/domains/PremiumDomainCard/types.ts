import type { DomainStatus } from '@/components/domains/StatusBadge/types'

export interface PremiumDomainCardProps {
  domainName: string
  category?: string
  status: DomainStatus
  minimumOffer: number
  currency?: 'jpy' | 'usd'
  imageUrl?: string
  href: string
  featured?: boolean
  enablePriceShorthand?: boolean
}
