import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import type { Payload } from 'payload'

import type { Domain, DomainCategory } from '@/payload-types'
import { toASCII } from '@/utilities/idn'
import { toLexicalJSON } from '@/utilities/toLexicalJSON'

/**
 * Canonical CSV column names from domain-import.csv
 */
interface CSVRow {
  domain: string
  summary: string
  registrationDate?: string
  availability?: string
  slug?: string
  category?: string
  minOfferPrice?: string
  premium?: string
  domainScript?: string
  richSummaryTitle?: string
  richSummaryIntro?: string
  richSummaryBullets?: string
  useCasesTitle?: string
  useCasesSummary?: string
  useCases?: string
  idnDisplay?: string
  seoTitle?: string
  seoDescription?: string
  ogTitle?: string
  ogDescription?: string
  featuredImage?: string
}

type ImportResults = {
  created: string[]
  updated: string[]
  skipped: string[]
  errors: { domain: string; error: string }[]
}

/** Shape of data built from CSV for create/update calls. */
type DomainImportData = {
  domainName: string
  domainASCII: string
  description: string
  extension?: string
  status: Domain['status']
  minimumOffer: number
  featured: boolean
  registrationDate: string
  _status: 'published'
  slugOverride?: string
  slugLock?: boolean
  domainUnicode?: string
  category?: number
  domainScript?: Domain['domainScript']
  richSummaryTitle?: string
  richSummaryIntro?: ReturnType<typeof toLexicalJSON>
  richSummaryBullets?: { bullet: string }[]
  useCasesTitle?: string
  useCasesSummary?: ReturnType<typeof toLexicalJSON>
  useCases?: { useCase: string }[]
  featuredImage?: number
  meta?: {
    title?: string
    description?: string
    ogTitle?: string
    ogDescription?: string
  }
}

const resolveExtension = (domainName: string): string | undefined => {
  const parts = domainName.split('.')
  if (parts.length < 2) return undefined
  return parts[parts.length - 1]
}

const parsePipeDelimited = (value: string | undefined): string[] => {
  if (!value) return []
  return value
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
}

const parseBoolean = (value?: string): boolean => {
  if (!value) return false
  const normalized = value.trim().toLowerCase()
  return normalized === 'true' || normalized === '1' || normalized === 'yes'
}

const parseCurrency = (value?: string): number => {
  if (!value) return 0
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

/** Category cache: name → id. Avoids repeated lookups within the same import run. */
const categoryCache = new Map<string, number>()

/** Media cache: filename → id. Avoids repeated lookups within the same import run. */
const mediaCache = new Map<string, number | null>()

const resolveCategoryId = async (
  payload: Payload,
  categoryName?: string,
): Promise<number | undefined> => {
  if (!categoryName) return undefined
  const name = categoryName.trim()
  if (!name) return undefined

  const cached = categoryCache.get(name)
  if (cached) return cached

  const existing = await payload.find({
    collection: 'domain-category',
    where: { name: { equals: name } },
    limit: 1,
  })

  if (existing.docs.length) {
    const category = existing.docs[0] as unknown as DomainCategory
    categoryCache.set(name, category.id)
    return category.id
  }

  const created = (await payload.create({
    collection: 'domain-category',
    data: { name },
  })) as unknown as DomainCategory

  payload.logger.info(`Created new category "${name}" during import.`)
  categoryCache.set(name, created.id)
  return created.id
}

const resolveMediaId = async (
  payload: Payload,
  filename?: string,
): Promise<number | undefined> => {
  if (!filename) return undefined
  const name = filename.trim()
  if (!name) return undefined

  if (mediaCache.has(name)) {
    const cached = mediaCache.get(name)
    return cached ?? undefined
  }

  const result = await payload.find({
    collection: 'media',
    where: { filename: { equals: name } },
    limit: 1,
  })

  if (result.docs.length) {
    const id = result.docs[0].id as number
    mediaCache.set(name, id)
    return id
  }

  mediaCache.set(name, null)
  return undefined
}

/**
 * Build the domain data object from a CSV row.
 * Used for both create and update.
 */
const buildDomainData = async (
  payload: Payload,
  row: CSVRow,
): Promise<DomainImportData> => {
  const domainName = row.domain.trim()
  const ascii = toASCII(domainName)
  const extension = resolveExtension(domainName)
  const categoryId = await resolveCategoryId(payload, row.category)

  const bullets = parsePipeDelimited(row.richSummaryBullets)
  const useCases = parsePipeDelimited(row.useCases)

  const data: DomainImportData = {
    domainName,
    domainASCII: ascii,
    description: row.summary,
    extension,
    status: (row.availability as Domain['status']) || 'open',
    minimumOffer: parseCurrency(row.minOfferPrice),
    featured: parseBoolean(row.premium),
    registrationDate: row.registrationDate
      ? new Date(row.registrationDate).toISOString()
      : new Date().toISOString(),
    _status: 'published',
  }

  // Slug override
  if (row.slug) {
    data.slugOverride = row.slug.trim()
    data.slugLock = false
  }

  // IDN display form
  if (row.idnDisplay) {
    data.domainUnicode = row.idnDisplay.trim()
  }

  // Category
  if (categoryId) {
    data.category = categoryId
  }

  // Domain script
  if (row.domainScript === 'latin' || row.domainScript === 'japanese') {
    data.domainScript = row.domainScript
  }

  // Rich summary fields
  if (row.richSummaryTitle) {
    data.richSummaryTitle = row.richSummaryTitle
  }
  if (row.richSummaryIntro) {
    data.richSummaryIntro = toLexicalJSON(row.richSummaryIntro)
  }
  if (bullets.length) {
    data.richSummaryBullets = bullets.map((bullet) => ({ bullet }))
  }

  // Use cases
  if (row.useCasesTitle) {
    data.useCasesTitle = row.useCasesTitle
  }
  if (row.useCasesSummary) {
    data.useCasesSummary = toLexicalJSON(row.useCasesSummary)
  }
  if (useCases.length) {
    data.useCases = useCases.map((useCase) => ({ useCase }))
  }

  // SEO meta fields (injected by seoPlugin as meta tab)
  const meta: DomainImportData['meta'] = {}
  if (row.seoTitle) meta.title = row.seoTitle
  if (row.seoDescription) meta.description = row.seoDescription
  if (row.ogTitle) meta.ogTitle = row.ogTitle
  if (row.ogDescription) meta.ogDescription = row.ogDescription
  if (Object.keys(meta).length) {
    data.meta = meta
  }

  // Featured image lookup by filename
  const mediaId = await resolveMediaId(payload, row.featuredImage)
  if (mediaId) {
    data.featuredImage = mediaId
  }

  return data
}

export async function importDomainsFromCSV({
  payload,
}: {
  payload: Payload
}): Promise<{
  created: number
  updated: number
  skipped: number
  errors: number
  importResults: ImportResults
}> {
  payload.logger.info('Starting CSV domain import (idempotent upsert)...')

  // Clear caches for fresh run
  categoryCache.clear()
  mediaCache.clear()

  const csvFilePath = path.resolve(process.cwd(), 'domain-import.csv')
  if (!fs.existsSync(csvFilePath)) {
    throw new Error(`CSV file not found at ${csvFilePath}`)
  }

  const csvContent = fs.readFileSync(csvFilePath, 'utf8')
  const rows = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as CSVRow[]

  if (!rows.length) {
    payload.logger.warn('CSV file contained no rows to import.')
    return {
      created: 0,
      updated: 0,
      skipped: 0,
      errors: 0,
      importResults: { created: [], updated: [], skipped: [], errors: [] },
    }
  }

  // Validate CSV has the expected canonical header
  const headers = Object.keys(rows[0])
  if (!headers.includes('domain') || !headers.includes('summary')) {
    throw new Error(
      `Unrecognized CSV format. Expected "domain" and "summary" columns. Found: ${headers.join(', ')}`,
    )
  }

  let created = 0
  let updated = 0
  let skipped = 0
  let errors = 0
  const importResults: ImportResults = {
    created: [],
    updated: [],
    skipped: [],
    errors: [],
  }

  for (const row of rows) {
    const domainName = row.domain?.trim() || ''

    try {
      if (!domainName || !row.summary) {
        skipped += 1
        importResults.skipped.push(domainName || 'Unknown domain')
        payload.logger.warn(`Skipping row missing required fields: domain="${domainName}"`)
        continue
      }

      const data = await buildDomainData(payload, row)

      // Check if domain already exists
      const existing = await payload.find({
        collection: 'domains',
        where: { domainName: { equals: domainName } },
        limit: 1,
      })

      if (existing.totalDocs > 0) {
        // Update existing domain
        const existingDoc = existing.docs[0] as Domain
        await payload.update({
          collection: 'domains',
          id: existingDoc.id,
          data,
          context: { disableRevalidate: true },
        })
        updated += 1
        importResults.updated.push(domainName)
        payload.logger.info(`Updated domain: ${domainName}`)
      } else {
        // Create new domain
        await payload.create({
          collection: 'domains',
          data,
          context: { disableRevalidate: true },
        })
        created += 1
        importResults.created.push(domainName)
        payload.logger.info(`Created domain: ${domainName}`)
      }
    } catch (error) {
      errors += 1
      const errorMessage = error instanceof Error ? error.message : String(error)
      importResults.errors.push({ domain: domainName || 'Unknown domain', error: errorMessage })
      payload.logger.error(`Failed to import domain ${domainName}: ${errorMessage}`)
    }
  }

  payload.logger.info(
    `Import complete. Created: ${created}, Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors}`,
  )

  return { created, updated, skipped, errors, importResults }
}
