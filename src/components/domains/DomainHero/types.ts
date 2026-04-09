import type { DomainStatus } from '@/components/domains/StatusBadge/types'

export interface DomainHeroProps {
  domainName: string
  category?: string
  status: DomainStatus
  imageUrl?: string
}
