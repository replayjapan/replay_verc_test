import type { DomainStatus } from '@/components/domains/StatusBadge/types'

export interface DomainFact {
  label: string
  value: string
}

export interface DomainSummaryCardProps {
  domainName: string
  status: DomainStatus
  ageText: string
  minimumOffer: number
  currency?: 'jpy' | 'usd'
  facts?: DomainFact[]
  enablePriceShorthand?: boolean
}
