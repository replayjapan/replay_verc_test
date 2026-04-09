import type { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

/**
 * Resolve a display title for the search record based on collection type.
 * Domains use domainName, everything else uses title.
 */
function resolveTitle(originalDoc: Record<string, unknown>, collection: string): string {
  if (collection === 'domains' && originalDoc.domainName) {
    return originalDoc.domainName as string
  }
  return (originalDoc.title as string) || ''
}

/**
 * Resolve a fallback description when searchExcerpt is not set.
 * Uses collection-specific fields before falling back to meta.description.
 */
function resolveDescription(
  originalDoc: Record<string, unknown>,
  meta: Record<string, unknown> | undefined,
): string {
  // searchExcerpt takes priority (already handled in caller)
  // Fall back to collection-specific description fields
  if (originalDoc.description && typeof originalDoc.description === 'string') {
    return originalDoc.description
  }
  if (originalDoc.summary && typeof originalDoc.summary === 'string') {
    return originalDoc.summary
  }
  if (originalDoc.excerpt && typeof originalDoc.excerpt === 'string') {
    return originalDoc.excerpt
  }
  return (meta?.description as string) || ''
}

/**
 * Resolve the primary content image ID from the source document.
 * Each collection stores its hero/featured image in a different field.
 */
function resolveContentImage(originalDoc: Record<string, unknown>, _collection: string): string | number | undefined {
  // Check all known image field names across collections
  const imageFields = ['featuredImage', 'heroImage', 'thumbnail']
  for (const field of imageFields) {
    const value = originalDoc[field]
    if (value) {
      return typeof value === 'object' && value !== null
        ? (value as Record<string, unknown>).id as string
        : value as string
    }
  }
  return undefined
}

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, meta } = originalDoc
  const searchExcerpt = originalDoc.searchExcerpt as string | undefined
  const searchKeywords = originalDoc.searchKeywords as string | undefined
  const docTitle = resolveTitle(originalDoc, collection)
  const contentImageId = resolveContentImage(originalDoc, collection)
  const isFeatured = Boolean(originalDoc.featured)

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    title: docTitle,
    slug,
    searchExcerpt: searchExcerpt || resolveDescription(originalDoc, meta),
    searchKeywords: searchKeywords || '',
    contentImage: contentImageId || null,
    featured: isFeatured,
    meta: {
      ...meta,
      title: meta?.title || docTitle,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push(category)
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      relationTo: 'categories',
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}
