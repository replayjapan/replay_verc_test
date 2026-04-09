import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '../../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/services/${doc.slug}`
    payload.logger.info(`Revalidating service at path: ${path}`)
    revalidatePath(path)
    revalidateTag('services-sitemap', 'max')
  }
  return doc
}

export const revalidateDeleteService: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/services/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('services-sitemap', 'max')
  }
  return doc
}
