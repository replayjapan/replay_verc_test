import type { DomainStatus } from '@/components/domains/StatusBadge/types'

export interface DomainTableRow {
  id: string
  domainName: string
  category: string
  registrationDate: string
  ageYears: number
  minimumOffer: number
  status: DomainStatus
  href: string
}

export interface DomainTableProps {
  rows: DomainTableRow[]
  currency?: 'jpy' | 'usd'
  enablePriceShorthand?: boolean
}
