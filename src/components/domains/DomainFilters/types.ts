import type { DomainStatus } from '@/components/domains/StatusBadge/types'

export type SortOption =
  | 'domain_asc'
  | 'domain_desc'
  | 'age_asc'
  | 'age_desc'
  | 'price_asc'
  | 'price_desc'

export interface DomainFiltersProps {
  categories: string[]
  selectedCategory: string
  selectedStatus: DomainStatus | 'all'
  selectedSort: SortOption
  searchQuery: string
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onStatusChange: (status: DomainStatus | 'all') => void
  onSortChange: (sort: SortOption) => void
  onReset: () => void
}
