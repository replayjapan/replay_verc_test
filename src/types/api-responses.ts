import type { Domain, DomainCategory, DomainSettings } from './domain-types'

export interface PaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface DomainsApiResponse {
  settings: DomainSettings
  domainsResult: PaginatedResponse<Domain>
  categories: DomainCategory[]
  featuredDomains: Domain[]
}

export interface SearchParams {
  page?: string
  limit?: string
  search?: string
  sort?: string
  direction?: string
  category?: string
  status?: string
}

export interface QueryObject {
  [key: string]: string | undefined
  page?: string
  search?: string
  sort?: string
  direction?: string
  category?: string
  status?: string
}
