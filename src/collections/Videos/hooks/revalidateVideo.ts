import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Video } from '../../../payload-types'

export const revalidateVideo: CollectionAfterChangeHook<Video> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/videos/${doc.slug}`
      payload.logger.info(`Revalidating video at path: ${path}`)
      revalidatePath(path)
      revalidateTag('videos-sitemap', 'max')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/videos/${previousDoc.slug}`
      payload.logger.info(`Revalidating old video at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag('videos-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDeleteVideo: CollectionAfterDeleteHook<Video> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/videos/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('videos-sitemap', 'max')
  }
  return doc
}
