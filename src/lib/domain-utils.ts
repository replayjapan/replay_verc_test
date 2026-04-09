import type { Domain as PayloadDomain, DomainsSetting, DomainCategory as PayloadDomainCategory, Media } from '@/payload-types'

import type { Domain, DomainCategory, DomainSettings, DomainMedia, PayloadDomainDocument } from '@/types/domain-types'
import { formatCurrency, formatDate } from './format-utils'

export const calculateDomainAge = (registrationDate: string | null | undefined): number | null => {
  if (!registrationDate) {
    return null
  }

  const registered = new Date(registrationDate)
  if (Number.isNaN(registered.valueOf())) {
    return null
  }

  const now = new Date()
  let age = now.getFullYear() - registered.getFullYear()

  const monthDiff = now.getMonth() - registered.getMonth()
  const dayDiff = now.getDate() - registered.getDate()

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1
  }

  return Math.max(age, 0)
}

const mapCategory = (category: PayloadDomainCategory | string | null | undefined): DomainCategory | undefined => {
  if (!category || typeof category === 'string') {
    return undefined
  }

  return {
    id: String(category.id),
    name: category.name || '',
    description: category.description ?? undefined,
    icon: category.icon ?? undefined,
  }
}

const mapMedia = (media: Media | string | null | undefined): DomainMedia | undefined => {
  if (!media || typeof media === 'string') {
    return undefined
  }

  return {
    id: String(media.id),
    url: media.url || '',
    alt: media.alt ?? undefined,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  }
}

const extractBullets = (
  value: PayloadDomain['richSummaryBullets'],
): string[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return undefined
      }

      if ('bullet' in entry && typeof entry.bullet === 'string') {
        return entry.bullet
      }

      return undefined
    })
    .filter((item): item is string => Boolean(item))
}

const extractUseCases = (
  value: PayloadDomain['useCases'],
): string[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return undefined
      }

      if ('useCase' in entry && typeof entry.useCase === 'string') {
        return entry.useCase
      }

      return undefined
    })
    .filter((item): item is string => Boolean(item))
}

export const transformPayloadDomainSettings = (settings: DomainsSetting | null): DomainSettings => {
  const defaultBullets = Array.isArray(settings?.defaultContent?.richSummaryBullets)
    ? settings?.defaultContent?.richSummaryBullets
        .map((item) => (typeof item?.bullet === 'string' ? item.bullet : undefined))
        .filter((b): b is string => Boolean(b))
    : []

  const defaultUseCases = Array.isArray(settings?.defaultContent?.useCases)
    ? settings?.defaultContent?.useCases
        .map((item) => (typeof item?.useCase === 'string' ? item.useCase : undefined))
        .filter((u): u is string => Boolean(u))
    : []

  const display = settings?.display
  const currency = settings?.currency
  const contactForm = settings?.contactForm

  return {
    pageTitle: settings?.pageTitle || 'ドメインポートフォリオ',
    pageDescription: settings?.pageDesc || 'プレミアムドメインをご覧ください。',
    premiumTitle: settings?.premiumTitle || '注目のドメイン',
    premiumSubtitle: settings?.premiumSubtitle || '厳選されたプレミアムドメインをご紹介します',
    heroImage: mapMedia(settings?.heroImage as Media | string | null | undefined) ?? null,
    disclaimer: settings?.disclaimer || '※ 表示金額は最低希望価格です。実際の取引金額はご相談の上で決定します。ドメインの移管には別途手数料がかかる場合があります。',
    display: {
      perPage: display?.perPage && display.perPage > 0 ? display.perPage : 12,
      sortField: (display?.sortField === 'registrationDate' ? 'registrationDate' : 'domainName'),
      sortDir: display?.sortDir === 'desc' ? 'desc' : 'asc',
      showFeatured: Boolean(display?.showFeatured ?? true),
      enablePriceShorthand: Boolean(display?.enablePriceShorthand),
    },
    currency: {
      code: currency?.code === 'USD' ? 'USD' : 'JPY',
      showDecimals: Boolean(currency?.showDecimals),
    },
    defaultContent: {
      richSummaryBullets: defaultBullets,
      useCases: defaultUseCases,
    },
    contactForm: {
      enable: Boolean(contactForm?.enableContactForm ?? true),
      formId: contactForm?.formTemplate ? String(contactForm.formTemplate) : undefined,
      heading: contactForm?.formHeading || 'オーナーに連絡',
      description:
        contactForm?.formDescription || 'ご質問やオファーをお送りください。1営業日以内にご連絡いたします。',
    },
  }
}

export const normalizePayloadDomain = (
  domain: PayloadDomainDocument,
  settings?: DomainSettings,
  _locale = 'ja',
): Domain => {
  const richSummaryBullets = extractBullets(domain.richSummaryBullets)
  const useCases = extractUseCases(domain.useCases)

  const fallbackBullets = settings?.defaultContent.richSummaryBullets ?? []
  const fallbackUseCases = settings?.defaultContent.useCases ?? []

  const normalizedBullets = richSummaryBullets.length ? richSummaryBullets : fallbackBullets
  const normalizedUseCases = useCases.length ? useCases : fallbackUseCases

  return {
    id: String(domain.id),
    domainName: domain.domainName,
    slug: domain.slug || domain.domainName,
    description: domain.description || '',
    richSummaryTitle: domain.richSummaryTitle ?? undefined,
    richSummaryIntro: domain.richSummaryIntro ?? undefined,
    richSummaryBullets: normalizedBullets,
    useCasesTitle: domain.useCasesTitle ?? undefined,
    useCasesSummary: domain.useCasesSummary ?? undefined,
    useCases: normalizedUseCases,
    category: mapCategory(domain.category as PayloadDomainCategory | string | null | undefined),
    extension: domain.extension ?? undefined,
    domainScript: domain.domainScript ?? undefined,
    status: domain.status || 'open',
    minimumOffer: domain.minimumOffer ?? 0,
    registrationDate: domain.registrationDate ?? undefined,
    featured: Boolean(domain.featured),
    featuredImage: mapMedia(domain.featuredImage as Media | string | null | undefined),
    publishedAt: domain.publishedAt ?? undefined,
  }
}

export const presentPrice = (
  domain: Domain,
  settings: DomainSettings,
  locale: string,
): string => {
  return formatCurrency(domain.minimumOffer, settings.currency.code, locale, settings.currency.showDecimals)
}

export const presentRegistrationDate = (domain: Domain, locale: string): string => {
  return formatDate(domain.registrationDate, locale)
}
