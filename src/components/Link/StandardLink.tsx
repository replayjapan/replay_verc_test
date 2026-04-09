import NextLink from 'next/link'
import React from 'react'
import { BudouX } from '@/components/BudouX'

/** Collection slug to URL path prefix mapping */
const collectionPaths: Record<string, string> = {
  pages: '',
  posts: '/posts',
  domains: '/domains',
  services: '/services',
  videos: '/videos',
  portfolios: '/portfolio',
  articles: '/articles',
}

type InternalDoc = {
  relationTo: string
  value: { slug?: string } | string | number
}

export type LinkData = {
  label?: string | null
  type?: 'internal' | 'external' | null
  internalDoc?: InternalDoc | null
  externalUrl?: string | null
  newTab?: boolean | null
  anchor?: string | null
  ariaLabel?: string | null
  nofollow?: boolean | null
  noreferrer?: boolean | null
  sponsored?: boolean | null
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  utmContent?: string | null
}

type StandardLinkProps = {
  link: LinkData
  className?: string
  children?: React.ReactNode
}

function resolveInternalHref(doc: InternalDoc): string | null {
  const { relationTo, value } = doc
  const basePath = collectionPaths[relationTo]

  if (basePath === undefined) return null

  if (typeof value === 'string' || typeof value === 'number') {
    return null
  }

  const slug = value?.slug
  if (!slug) return null

  if (relationTo === 'pages') {
    return slug === 'home' ? '/' : `/${slug}`
  }

  return `${basePath}/${slug}`
}

/** Append UTM query parameters to a URL */
function appendUtmParams(
  href: string,
  link: Pick<LinkData, 'utmSource' | 'utmMedium' | 'utmCampaign' | 'utmContent'>,
): string {
  const params = new URLSearchParams()
  if (link.utmSource) params.set('utm_source', link.utmSource)
  if (link.utmMedium) params.set('utm_medium', link.utmMedium)
  if (link.utmCampaign) params.set('utm_campaign', link.utmCampaign)
  if (link.utmContent) params.set('utm_content', link.utmContent)

  const qs = params.toString()
  if (!qs) return href

  const separator = href.includes('?') ? '&' : '?'
  return `${href}${separator}${qs}`
}

/**
 * Standard link component for consistent link handling across the site.
 * Resolves internal document references to URL paths and renders correct
 * href, target, rel, UTM, anchor, and aria attributes.
 * Works with linkFields() factory output.
 */
export function StandardLink({ link, className, children }: StandardLinkProps) {
  const {
    label,
    type,
    internalDoc,
    externalUrl,
    newTab,
    anchor,
    ariaLabel,
    nofollow,
    noreferrer,
    sponsored,
  } = link

  let href: string | null = null

  if (type === 'internal' && internalDoc) {
    href = resolveInternalHref(internalDoc)
  } else if (type === 'external' && externalUrl) {
    href = externalUrl
  }

  if (!href) return null

  // Append UTM parameters
  href = appendUtmParams(href, link)

  // Append anchor hash
  if (anchor) {
    const cleanAnchor = anchor.startsWith('#') ? anchor.slice(1) : anchor
    if (cleanAnchor) {
      href = `${href}#${cleanAnchor}`
    }
  }

  // Build rel attribute
  const relParts: string[] = []
  if (nofollow) relParts.push('nofollow')
  if (noreferrer) relParts.push('noreferrer')
  if (sponsored) relParts.push('sponsored')
  if (newTab) relParts.push('noopener')
  const rel = relParts.length > 0 ? relParts.join(' ') : undefined

  const target = newTab ? '_blank' : undefined
  const displayText = children ?? (typeof label === 'string' ? <BudouX>{label}</BudouX> : label)

  return (
    <NextLink
      href={href}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel || undefined}
    >
      {displayText}
    </NextLink>
  )
}

/**
 * Resolve a link field's href without rendering.
 * Useful for JSON-LD or programmatic link resolution.
 */
export function resolveLinkHref(link: LinkData): string | null {
  if (link.type === 'internal' && link.internalDoc) {
    return resolveInternalHref(link.internalDoc)
  }
  if (link.type === 'external' && link.externalUrl) {
    return link.externalUrl
  }
  return null
}
