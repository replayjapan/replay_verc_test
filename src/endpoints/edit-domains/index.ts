import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import type { Payload } from 'payload'

import type { Domain } from '@/payload-types'
import type { Domain as PayloadDomainType } from '@/payload-types'
import { toLexicalJSON } from '@/utilities/toLexicalJSON'

interface CSVEditDomainRow {
  domainName: string
  description?: string
  richSummaryIntro?: string
  richSummaryTitle?: string
  bullet1?: string
  bullet2?: string
  bullet3?: string
  bullet4?: string
  useCasesTitle?: string
  useCasesSummary?: string
  useCase1?: string
  useCase2?: string
  useCase3?: string
  useCase4?: string
  category?: string
  extension?: string
  domainScript?: string
  minimumOffer?: string
  registrationDate?: string
  status?: string
  featured?: string
}

type EditResults = {
  updated: string[]
  skipped: string[]
  notFound: string[]
  errors: { domain: string; error: string }[]
}

type DomainUpdateInput = Omit<PayloadDomainType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'sizes' | 'publishedAt'>

const parseBoolean = (value?: string): boolean | undefined => {
  if (typeof value !== 'string') {
    return undefined
  }

  const normalized = value.trim().toLowerCase()

  if (['true', '1', 'yes'].includes(normalized)) {
    return true
  }

  if (['false', '0', 'no'].includes(normalized)) {
    return false
  }

  return undefined
}

const parseNumber = (value?: string): number | undefined => {
  if (!value) {
    return undefined
  }

  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

const detectFormat = (headers: string[]): 'standard' | 'alternate' | 'unknown' => {
  if (headers.includes('domainName')) {
    return 'standard'
  }

  if (headers.includes('domain')) {
    return 'alternate'
  }

  return 'unknown'
}

export async function editDomainsFromCSV({
  payload,
}: {
  payload: Payload
}): Promise<{
  updated: number
  skipped: number
  notFound: number
  errors: number
  editResults: EditResults
}> {
  payload.logger.info('Starting CSV domain edit...')

  const csvFilePath = path.resolve(process.cwd(), 'domain-edit.csv')
  if (!fs.existsSync(csvFilePath)) {
    throw new Error(`CSV file not found at ${csvFilePath}`)
  }

  const csvContent = fs.readFileSync(csvFilePath, 'utf8')
  const rows = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[]

  if (!rows.length) {
    payload.logger.warn('CSV file contained no rows to process.')
    return {
      updated: 0,
      skipped: 0,
      notFound: 0,
      errors: 0,
      editResults: { updated: [], skipped: [], notFound: [], errors: [] },
    }
  }

  const headers = Object.keys(rows[0])
  const format = detectFormat(headers)

  if (format === 'unknown') {
    throw new Error(
      `Unrecognized CSV format. Headers found: ${headers.join(', ')}. Expected at least domainName/domain column.`,
    )
  }

  let updated = 0
  let skipped = 0
  let notFound = 0
  let errors = 0
  const editResults: EditResults = {
    updated: [],
    skipped: [],
    notFound: [],
    errors: [],
  }

  for (const rawRow of rows) {
    const domainName = (format === 'standard' ? rawRow.domainName : rawRow.domain) || ''

    try {
      if (!domainName) {
        skipped += 1
        editResults.skipped.push('Unknown domain')
        payload.logger.warn(`Skipping row without domainName: ${JSON.stringify(rawRow)}`)
        continue
      }

      const existing = await payload.find({
        collection: 'domains',
        where: {
          domainName: {
            equals: domainName,
          },
        },
        limit: 1,
      })

      if (!existing.totalDocs) {
        notFound += 1
        editResults.notFound.push(domainName)
        payload.logger.info(`Domain ${domainName} not found. Skipping.`)
        continue
      }

      const [domainDoc] = existing.docs as Domain[]

      const normalizedRow: CSVEditDomainRow = {
        domainName,
        description: rawRow.description,
        richSummaryIntro: rawRow.richSummaryIntro,
        richSummaryTitle: rawRow.richSummaryTitle,
        bullet1: rawRow.bullet1,
        bullet2: rawRow.bullet2,
        bullet3: rawRow.bullet3,
        bullet4: rawRow.bullet4,
        useCasesTitle: rawRow.useCasesTitle,
        useCasesSummary: rawRow.useCasesSummary,
        useCase1: rawRow.useCase1,
        useCase2: rawRow.useCase2,
        useCase3: rawRow.useCase3,
        useCase4: rawRow.useCase4,
        category: rawRow.category,
        extension: rawRow.extension,
        domainScript: rawRow.domainScript,
        minimumOffer: rawRow.minimumOffer,
        registrationDate: rawRow.registrationDate,
        status: rawRow.status,
        featured: rawRow.featured,
      }

      const updateData: Partial<DomainUpdateInput> & Record<string, unknown> = {}

      if (normalizedRow.description) {
        updateData.description = normalizedRow.description
      }

      if (normalizedRow.richSummaryTitle) {
        updateData.richSummaryTitle = normalizedRow.richSummaryTitle
      }

      if (normalizedRow.richSummaryIntro) {
        updateData.richSummaryIntro = toLexicalJSON(normalizedRow.richSummaryIntro)
      }

      const richSummaryBullets = [
        normalizedRow.bullet1,
        normalizedRow.bullet2,
        normalizedRow.bullet3,
        normalizedRow.bullet4,
      ]
        .filter((b): b is string => Boolean(b))
        .slice(0, 4)
        .map((bullet) => ({ bullet }))

      if (richSummaryBullets.length) {
        updateData.richSummaryBullets = richSummaryBullets
      }

      if (normalizedRow.useCasesTitle) {
        updateData.useCasesTitle = normalizedRow.useCasesTitle
      }

      if (normalizedRow.useCasesSummary) {
        updateData.useCasesSummary = toLexicalJSON(normalizedRow.useCasesSummary)
      }

      const useCases = [
        normalizedRow.useCase1,
        normalizedRow.useCase2,
        normalizedRow.useCase3,
        normalizedRow.useCase4,
      ]
        .filter((u): u is string => Boolean(u))
        .slice(0, 4)
        .map((useCase) => ({ useCase }))

      if (useCases.length) {
        updateData.useCases = useCases
      }

      if (normalizedRow.category) {
        const categoryLookup = await payload.find({
          collection: 'domain-category',
          where: {
            name: {
              equals: normalizedRow.category,
            },
          },
          limit: 1,
        })

        if (categoryLookup.docs.length) {
          updateData.category = categoryLookup.docs[0].id
        }
      }

      if (normalizedRow.extension) {
        updateData.extension = normalizedRow.extension
      }

      if (normalizedRow.domainScript) {
        updateData.domainScript = normalizedRow.domainScript as Domain['domainScript']
      }

      const minimumOffer = parseNumber(normalizedRow.minimumOffer)
      if (typeof minimumOffer === 'number') {
        updateData.minimumOffer = minimumOffer
      }

      if (normalizedRow.registrationDate) {
        const parsedDate = new Date(normalizedRow.registrationDate)
        if (!Number.isNaN(parsedDate.valueOf())) {
          updateData.registrationDate = parsedDate.toISOString()
        }
      }

      if (normalizedRow.status) {
        updateData.status = normalizedRow.status as Domain['status']
      }

      const featured = parseBoolean(normalizedRow.featured)
      if (typeof featured === 'boolean') {
        updateData.featured = featured
      }

      if (!Object.keys(updateData).length) {
        skipped += 1
        editResults.skipped.push(domainName)
        payload.logger.warn(`No editable fields supplied for ${domainName}. Skipping.`)
        continue
      }

      await payload.update({
        collection: 'domains',
        id: domainDoc.id,
        data: updateData,
        context: {
          disableRevalidate: true,
        },
      })

      updated += 1
      editResults.updated.push(domainName)
      payload.logger.info(`Updated domain: ${domainName}`)
    } catch (error) {
      errors += 1
      const errorMessage = error instanceof Error ? error.message : String(error)
      editResults.errors.push({ domain: domainName || 'Unknown domain', error: errorMessage })
      payload.logger.error(`Failed to edit domain ${domainName}: ${errorMessage}`)
    }
  }

  payload.logger.info(
    `Domain edit complete. Updated: ${updated}, Skipped: ${skipped}, Not found: ${notFound}, Errors: ${errors}`,
  )

  return { updated, skipped, notFound, errors, editResults }
}
