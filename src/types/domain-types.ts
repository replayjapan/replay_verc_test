import type { Domain as PayloadDomain, DomainCategory as PayloadDomainCategory, Media } from '@/payload-types'

export type DomainStatus = Exclude<PayloadDomain['status'], null | undefined>

export interface DomainCategory {
  id: string | number
  name: string
  description?: string | null
  icon?: string | null
}

export interface DomainMedia {
  id: string
  url: string
  alt?: string | null
  width?: number | null
  height?: number | null
}

export interface Domain {
  id: string
  domainName: string
  slug: string
  description: string
  richSummaryTitle?: string | null
  richSummaryIntro?: PayloadDomain['richSummaryIntro']
  richSummaryBullets: string[]
  useCasesTitle?: string | null
  useCasesSummary?: PayloadDomain['useCasesSummary']
  useCases: string[]
  category?: DomainCategory
  extension?: string | null
  domainScript?: string | null
  status: DomainStatus
  minimumOffer: number
  registrationDate?: string | null
  featured?: boolean
  featuredImage?: DomainMedia
  publishedAt?: string | null
}

export interface DomainSettings {
  pageTitle: string
  pageDescription: string
  premiumTitle: string
  premiumSubtitle: string
  heroImage?: DomainMedia | null
  disclaimer: string
  display: {
    perPage: number
    sortField: 'domainName' | 'registrationDate'
    sortDir: 'asc' | 'desc'
    showFeatured: boolean
    enablePriceShorthand: boolean
  }
  currency: {
    code: 'USD' | 'JPY'
    showDecimals: boolean
  }
  defaultContent: {
    richSummaryBullets: string[]
    useCases: string[]
  }
  contactForm: {
    enable: boolean
    formId?: string | number
    heading: string
    description: string
  }
}

export type SimilarDomains = Domain[]

export type PayloadDomainDocument = PayloadDomain & {
  category?: PayloadDomainCategory | string | null
  featuredImage?: Media | string | null
}
