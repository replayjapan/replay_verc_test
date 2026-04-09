import clsx from 'clsx'
import React from 'react'

import type { Media } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logo?: Media | number | null
  siteName?: string
}

const FALLBACK_LOGO =
  'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'

const isMediaLogo = (value: Props['logo']): value is Media =>
  typeof value === 'object' && value !== null && 'url' in value

export const Logo: React.FC<Props> = (props) => {
  const { className, loading: loadingFromProps, priority: priorityFromProps, logo, siteName } = props

  const fetchPriority = priorityFromProps || 'auto'
  const loading = loadingFromProps || (fetchPriority === 'high' ? 'eager' : 'lazy')
  const fallbackAlt = siteName ? `${siteName} logo` : 'Brand logo'

  if (isMediaLogo(logo) && logo.url) {
    const altText = logo.alt?.trim() || fallbackAlt
    const width = logo.width ?? 193
    const height = logo.height ?? 34
    const src = getMediaUrl(logo.url, logo.updatedAt)

    return (
      /* eslint-disable @next/next/no-img-element */
      <img
        alt={altText}
        className={clsx('h-auto max-h-8 w-auto', className)}
        decoding="async"
        fetchPriority={fetchPriority}
        height={height}
        loading={loading}
        src={src}
        width={width}
      />
    )
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={fallbackAlt}
      className={clsx('h-auto max-h-8 w-auto', className)}
      decoding="async"
      fetchPriority={fetchPriority}
      height={34}
      loading={loading}
      src={FALLBACK_LOGO}
      width={193}
    />
  )
}
