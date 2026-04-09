import type { Header as HeaderPayload, Media } from '@/payload-types'
import { resolveLinkHref } from '@/components/Link/StandardLink'
import type { LinkData } from '@/components/Link/StandardLink'

export interface MediaData {
  id: string | number
  alt: string
  width: number
  height: number
  url: string
}

export interface SubmenuItem {
  id: string
  label: string
  link: string
  icon?: string
  description?: string
}

export interface MegaMenuFeatured {
  title?: string
  subtitle?: string
  description?: string
  image?: MediaData
  link?: string
  linkLabel?: string
}

export interface SubmenuFooter {
  text?: string
  primaryCTA?: {
    label?: string
    link?: string
  }
  secondaryCTA?: {
    label?: string
    link?: string
  }
}

export interface NavItem {
  id: string
  key: string
  label: string
  linkType: 'internal' | 'external'
  link: string
  newTab?: boolean
  noFollow?: boolean
  noReferrer?: boolean
  navGroup?: 'primary' | 'utility'
  icon?: string
  description?: string
  showOnMobile?: boolean
  submenuType?: 'none' | 'simple' | 'multiColumn' | 'mega'
  submenuItems?: SubmenuItem[]
  submenuColumns?: '1' | '2' | '3' | '4'
  megaMenuFeatured?: MegaMenuFeatured
  submenuFooter?: SubmenuFooter
}

export type NavPosition = 'left' | 'center' | 'right'
export type SeparatorStyle = 'none' | 'border'
export type SearchDisplay = 'icon' | 'hidden'

export interface HeaderData {
  navItems: NavItem[]
  navPosition: NavPosition
  separator: SeparatorStyle
  searchDisplay: SearchDisplay
  stickyDesktop: boolean
  stickyMobile: boolean
  mobileSearchOutside: boolean
}

/**
 * Convert Payload CMS Header data to HeaderData interface
 */
export function convertHeaderData(header: HeaderPayload): HeaderData {
  const navItems: NavItem[] = (header?.navItems || []).map((item, index) => {
    // Resolve link from linkFields() format
    const linkData = item.link as LinkData | undefined
    const linkType = (linkData?.type as 'internal' | 'external') || 'internal'
    const resolvedHref = linkData ? (resolveLinkHref(linkData) || '') : ''

    const navItem: NavItem = {
      id: item.key || String(index),
      key: item.key || `nav-${index}`,
      label: item.label || '',
      linkType,
      link: resolvedHref,
      newTab: linkData?.newTab || false,
      noFollow: linkData?.nofollow || false,
      noReferrer: linkData?.noreferrer || false,
      navGroup: (item.navGroup as 'primary' | 'utility') || 'primary',
      icon: item.icon || undefined,
      description: item.description || undefined,
      showOnMobile: item.showOnMobile || false,
      submenuType: (item.submenuType as 'none' | 'simple' | 'multiColumn' | 'mega') || 'none',
      submenuColumns: (item.submenuColumns as '1' | '2' | '3' | '4') || '2',
    }

    // Convert submenu items
    if (item.submenuItems && Array.isArray(item.submenuItems)) {
      navItem.submenuItems = item.submenuItems.map((subItem, subIndex) => ({
        id: `${index}-${subIndex}`,
        label: subItem.label || '',
        link: subItem.link || '',
        icon: subItem.icon || undefined,
        description: subItem.description || undefined,
      }))
    }

    // Convert mega menu featured content
    if (item.megaMenuFeatured) {
      navItem.megaMenuFeatured = {
        title: item.megaMenuFeatured.title || undefined,
        subtitle: item.megaMenuFeatured.subtitle || undefined,
        description: item.megaMenuFeatured.description || undefined,
        link: item.megaMenuFeatured.link || undefined,
        linkLabel: item.megaMenuFeatured.linkLabel || undefined,
      }

      // Convert image if exists
      if (item.megaMenuFeatured.image && typeof item.megaMenuFeatured.image === 'object') {
        const mediaImage = item.megaMenuFeatured.image as Media
        navItem.megaMenuFeatured.image = {
          id: mediaImage.id || '',
          alt: mediaImage.alt || '',
          width: mediaImage.width || 0,
          height: mediaImage.height || 0,
          url: mediaImage.url || '',
        }
      }
    }

    // Convert submenu footer
    if (item.submenuFooter) {
      navItem.submenuFooter = {
        text: item.submenuFooter.text || undefined,
        primaryCTA: item.submenuFooter.primaryCTA
          ? {
              label: item.submenuFooter.primaryCTA.label || undefined,
              link: item.submenuFooter.primaryCTA.link || undefined,
            }
          : undefined,
        secondaryCTA: item.submenuFooter.secondaryCTA
          ? {
              label: item.submenuFooter.secondaryCTA.label || undefined,
              link: item.submenuFooter.secondaryCTA.link || undefined,
            }
          : undefined,
      }
    }

    return navItem
  })

  return {
    navItems,
    navPosition: (header?.navPosition as NavPosition) || 'left',
    separator: (header?.separator as SeparatorStyle) || 'border',
    searchDisplay: (header?.searchDisplay as SearchDisplay) || 'icon',
    stickyDesktop: header?.stickyDesktop !== false,
    stickyMobile: header?.stickyMobile !== false,
    // mobileSearchOutside added in M22 — field exists in Header config but payload-types.ts
    // not yet regenerated. Access via index signature until next type generation.
    mobileSearchOutside: (header as unknown as Record<string, unknown>)?.mobileSearchOutside !== false,
  }
}
