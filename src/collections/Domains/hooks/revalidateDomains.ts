import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateDomains: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context?.disableRevalidate) {
    return doc
  }

  if (doc._status === 'published') {
    const path = `/domains/${doc.slug}`
    payload.logger.info(`Revalidating domain portfolio at path: ${path}`)
    revalidatePath(path)
    revalidateTag('domains-sitemap', 'max')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = `/domains/${previousDoc.slug}`
    payload.logger.info(`Revalidating old domain portfolio at path: ${oldPath}`)
    revalidatePath(oldPath)
    revalidateTag('domains-sitemap', 'max')
  }

  return doc
}

export const revalidateDeleteDomains: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (context?.disableRevalidate) {
    return doc
  }

  if (doc?.slug) {
    const path = `/domains/${doc.slug}`
    revalidatePath(path)
  }

  revalidatePath('/domains')
  revalidateTag('domains-sitemap', 'max')

  return doc
}
