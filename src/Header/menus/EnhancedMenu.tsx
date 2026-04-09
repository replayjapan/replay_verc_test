'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import {
  ChevronDownIcon,
  XIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Home,
  Grid,
  Users,
  Folder,
  FileText,
  Mail,
  User as UserIcon,
  ShoppingCart,
  Settings,
  Info,
  ArrowRight,
} from 'lucide-react'

import type { HeaderData, NavItem } from '@/types/header'
import type { SiteSetting, Media } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { BudouXClient } from '@/components/BudouX/client'
import { SearchExpansion } from '../SearchExpansion'

interface EnhancedMenuProps {
  headerData: HeaderData
  siteSettings: SiteSetting | null
}

// Get icon component by name
const getIconByName = (iconName: string, className?: string) => {
  const props = { className, size: 18 }

  switch (iconName) {
    case 'home':
      return <Home {...props} />
    case 'grid':
      return <Grid {...props} />
    case 'users':
      return <Users {...props} />
    case 'folder':
      return <Folder {...props} />
    case 'file-text':
      return <FileText {...props} />
    case 'mail':
      return <Mail {...props} />
    case 'search':
      return <SearchIcon {...props} />
    case 'user':
      return <UserIcon {...props} />
    case 'shopping-cart':
      return <ShoppingCart {...props} />
    case 'settings':
      return <Settings {...props} />
    case 'info':
      return <Info {...props} />
    default:
      return null
  }
}

// Get link props including noFollow attribute
const getLinkProps = (item: NavItem) => {
  const relParts: string[] = []

  if (item.noFollow) {
    relParts.push('nofollow')
  }

  if (item.newTab && item.noReferrer) {
    relParts.push('noopener', 'noreferrer')
  }

  return {
    href: item.link,
    target: item.newTab ? '_blank' : undefined,
    rel: relParts.length > 0 ? relParts.join(' ') : undefined,
  }
}

// Filter nav items to show on mobile outside hamburger menu
const getMobileNavItems = (navItems: NavItem[]) => {
  return navItems.filter((item) => item.showOnMobile).slice(0, 2)
}

// D-1: Inline expanding search for mobile header
function MobileSearchInline({
  expanded,
  query,
  inputRef,
  onToggle,
  onQueryChange,
  onClose,
}: {
  expanded: boolean
  query: string
  inputRef: React.RefObject<HTMLInputElement | null>
  onToggle: () => void
  onQueryChange: (q: string) => void
  onClose: () => void
}) {
  const router = useRouter()

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="text-gray-700 hover:text-brand-alt transition-colors duration-200"
        aria-label="検索"
        data-testid="mobile-search-icon"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    )
  }

  return (
    <form
      className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-200"
      onSubmit={(e) => {
        e.preventDefault()
        if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`)
          onClose()
        }
      }}
    >
      <SearchIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="検索..."
        className="bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none w-32"
      />
      <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
        <XIcon className="h-4 w-4" />
      </button>
    </form>
  )
}

// D-3: Search input bar inside mobile hamburger menu
function MobileNavSearch({ onNavigate }: { onNavigate: () => void }) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  return (
    <form
      className="mb-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`)
          onNavigate()
        }
      }}
    >
      <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-200">
        <SearchIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="サイト内を検索..."
          className="bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none flex-1"
        />
      </div>
    </form>
  )
}

export function EnhancedMenu({ headerData, siteSettings }: EnhancedMenuProps) {
  const { navItems, separator, searchDisplay, mobileSearchOutside } = headerData
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false)
  const [mobileSearchQuery, setMobileSearchQuery] = useState('')
  const mobileSearchInputRef = React.useRef<HTMLInputElement>(null)
  const [servicesOpen, setServicesOpen] = useState(true) // D-2: open by default

  // Get items to show on mobile before hamburger
  const mobileNavItems = getMobileNavItems(navItems)
  const primaryNavItems = navItems.filter((item) => item.navGroup === 'primary')
  const utilityNavItems = navItems.filter((item) => item.navGroup === 'utility')

  // Convert site settings logo to proper format
  const logoMedia = typeof siteSettings?.logo === 'object' ? (siteSettings.logo as Media) : null

  const showSearch = searchDisplay !== 'hidden'
  const headerBorder = separator === 'border' ? 'border-b border-gray-200' : ''

  return (
    <header className={`bg-white ${headerBorder}`}>
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo (Left) */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-alt" data-testid="logo-link">
            <Logo
              className="h-8 w-auto"
              loading="eager"
              logo={logoMedia}
              priority="high"
              siteName={siteSettings?.siteName}
            />
          </Link>
        </div>

        {/* Mobile items outside hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          {mobileNavItems.map((item) => (
            <Link
              key={item.id}
              {...getLinkProps(item)}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-alt transition-colors duration-200"
            >
              {item.icon && item.icon !== 'none' && getIconByName(item.icon, 'h-5 w-5')}
              <span className="sr-only">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu.Root className="relative hidden lg:block">
          <NavigationMenu.List className="flex gap-x-8">
            {primaryNavItems.map((item) => {
              const hasMegaMenu = item.submenuType === 'mega'
              const hasSubmenu =
                item.submenuType === 'simple' || item.submenuType === 'multiColumn'
              const hasNoMenu = !hasMegaMenu && !hasSubmenu

              // Regular link if no submenu
              if (hasNoMenu) {
                return (
                  <NavigationMenu.Item key={item.id}>
                    <Link
                      {...getLinkProps(item)}
                      data-testid={item.key}
                      className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-alt transition-colors duration-200"
                    >
                      {item.icon && item.icon !== 'none' && getIconByName(item.icon, 'h-4 w-4')}
                      {item.label}
                    </Link>
                  </NavigationMenu.Item>
                )
              }

              // Submenu item — label links to page, chevron triggers dropdown
              return (
                <NavigationMenu.Item key={item.id}>
                  <div className="flex items-center gap-0">
                    <NavigationMenu.Link asChild>
                      <Link
                        {...getLinkProps(item)}
                        className="flex items-center gap-1.5 text-base font-medium text-gray-700 hover:text-alt transition-colors duration-200"
                      >
                        {item.icon && item.icon !== 'none' && getIconByName(item.icon, 'h-4 w-4')}
                        {item.label}
                      </Link>
                    </NavigationMenu.Link>
                    <NavigationMenu.Trigger
                      data-testid={item.key}
                      className="group ml-0.5 rounded p-0.5 text-gray-700 hover:text-alt data-[state=open]:text-alt transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-alt"
                    >
                      <ChevronDownIcon
                        className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    </NavigationMenu.Trigger>
                  </div>

                  <NavigationMenu.Content role="region" data-testid={`${item.key}-submenu`} className="absolute top-full left-0 w-auto bg-white border border-gray-100 rounded-lg mt-2">
                    {hasMegaMenu && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        {/* Left Column - Service Items + CTAs */}
                        <div className="p-8">
                          {/* Service Items Grid - EXACT V3 STYLING */}
                          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                            {item.submenuItems?.map((subItem) => (
                              <div
                                key={subItem.id}
                                className="group relative flex items-center gap-x-4 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50"
                              >
                                {/* Icon Container - V3 EXACT STYLING */}
                                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                  {subItem.icon &&
                                    subItem.icon !== 'none' &&
                                    getIconByName(subItem.icon, 'h-6 w-6 text-gray-600 group-hover:text-alt')}
                                </div>
                                {/* Text Content */}
                                <div className="flex-auto">
                                  <Link
                                    href={subItem.link}
                                    className="block font-semibold text-gray-900 hover:text-alt transition-colors duration-200"
                                  >
                                    {subItem.label}
                                    <span className="absolute inset-0" />
                                  </Link>
                                  {subItem.description && (
                                    <p className="mt-1 text-xs text-gray-600"><BudouXClient>{subItem.description}</BudouXClient></p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* CTAs - INSIDE LEFT COLUMN - V3 EXACT STYLING */}
                          {item.submenuFooter &&
                            (item.submenuFooter.primaryCTA?.label ||
                              item.submenuFooter.secondaryCTA?.label) && (
                              <div className="mt-8 flex gap-x-6">
                                {item.submenuFooter.primaryCTA?.label && (
                                  <Link
                                    href={item.submenuFooter.primaryCTA.link || '#'}
                                    className="flex items-center justify-center gap-x-2.5 rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200 hover:text-alt transition-colors duration-200"
                                  >
                                    {item.submenuFooter.primaryCTA.label}
                                    <ArrowRight className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                  </Link>
                                )}
                                {item.submenuFooter.secondaryCTA?.label && (
                                  <Link
                                    href={item.submenuFooter.secondaryCTA.link || '#'}
                                    className="flex items-center justify-center gap-x-2.5 rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200 hover:text-alt transition-colors duration-200"
                                  >
                                    {item.submenuFooter.secondaryCTA.label}
                                    <ArrowRight className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                  </Link>
                                )}
                              </div>
                            )}
                        </div>

                        {/* Right Column - Featured Section - V3 EXACT STYLING */}
                        {item.megaMenuFeatured && item.megaMenuFeatured.image && (
                          <div className="bg-gray-50 p-8">
                            <div className="flex flex-col h-full">
                              {item.megaMenuFeatured.title && (
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                  {item.megaMenuFeatured.title}
                                </h3>
                              )}

                              <div className="rounded-lg overflow-hidden">
                                <Image
                                  src={item.megaMenuFeatured.image.url}
                                  alt={item.megaMenuFeatured.image.alt || item.megaMenuFeatured.title || 'Featured content'}
                                  width={500}
                                  height={300}
                                  className="h-48 w-full object-cover"
                                />
                              </div>

                              {item.megaMenuFeatured.subtitle && (
                                <h4 className="mt-4 text-base font-semibold text-gray-900">
                                  {item.megaMenuFeatured.subtitle}
                                </h4>
                              )}

                              {item.megaMenuFeatured.description && (
                                <p className="mt-1 text-sm text-gray-600 flex-grow">
                                  <BudouXClient>{item.megaMenuFeatured.description}</BudouXClient>
                                </p>
                              )}

                              {item.megaMenuFeatured.link && (
                                <Link
                                  href={item.megaMenuFeatured.link}
                                  className="mt-4 block text-sm font-semibold leading-6 text-[var(--color-primary)] hover:text-alt group transition-colors duration-200"
                                >
                                  <span className="flex items-center gap-x-1">
                                    {item.megaMenuFeatured.linkLabel || 'Learn More'}
                                    <ArrowRight
                                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {hasSubmenu && (
                      <div className="min-w-[400px]">
                        <div
                          className="grid gap-4 p-4"
                          style={{
                            gridTemplateColumns: `repeat(${item.submenuColumns || '2'}, minmax(0, 1fr))`,
                          }}
                        >
                          {item.submenuItems?.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.link}
                              className="group block rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <div className="flex items-center gap-3">
                                {subItem.icon &&
                                  subItem.icon !== 'none' &&
                                  getIconByName(subItem.icon, 'h-5 w-5 text-alt')}
                                <div>
                                  <div className="text-base font-medium text-gray-900 group-hover:text-alt transition-colors duration-200">
                                    {subItem.label}
                                  </div>
                                  {subItem.description && (
                                    <div className="text-sm text-gray-500"><BudouXClient>{subItem.description}</BudouXClient></div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Submenu footer: footer text + CTAs */}
                        {item.submenuFooter &&
                          (item.submenuFooter.text ||
                            item.submenuFooter.primaryCTA?.label ||
                            item.submenuFooter.secondaryCTA?.label) && (
                            <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 rounded-b-lg">
                              {item.submenuFooter.text && (
                                <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500">
                                  {item.submenuFooter.text}
                                </p>
                              )}
                              <div className="flex gap-x-4">
                                {item.submenuFooter.primaryCTA?.label && (
                                  <Link
                                    href={item.submenuFooter.primaryCTA.link || '#'}
                                    className="flex items-center justify-center gap-x-2 rounded-md bg-white border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-alt transition-colors duration-200"
                                  >
                                    {item.submenuFooter.primaryCTA.label}
                                    <ArrowRight className="h-4 w-4 flex-none text-gray-400" aria-hidden="true" />
                                  </Link>
                                )}
                                {item.submenuFooter.secondaryCTA?.label && (
                                  <Link
                                    href={item.submenuFooter.secondaryCTA.link || '#'}
                                    className="flex items-center justify-center gap-x-2 rounded-md bg-white border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-alt transition-colors duration-200"
                                  >
                                    {item.submenuFooter.secondaryCTA.label}
                                    <ArrowRight className="h-4 w-4 flex-none text-gray-400" aria-hidden="true" />
                                  </Link>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              )
            })}
          </NavigationMenu.List>

          <div className="absolute top-full left-0 flex w-full justify-center">
            <NavigationMenu.Viewport className="mt-2" />
          </div>
        </NavigationMenu.Root>

        {/* Utility Navigation + Search */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6 items-center">
          {utilityNavItems.map((item) => (
            <Link
              key={item.id}
              {...getLinkProps(item)}
              data-testid={item.key}
              className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-alt transition-colors duration-200"
            >
              {item.icon && item.icon !== 'none' && getIconByName(item.icon, 'h-4 w-4')}
              {item.label}
            </Link>
          ))}
          {showSearch && (
            <SearchExpansion visible={showSearch} />
          )}
        </div>

        {/* Mobile menu button + search icon */}
        <div className="flex items-center gap-3 lg:hidden">
          {showSearch && mobileSearchOutside && (
            <MobileSearchInline
              expanded={mobileSearchExpanded}
              query={mobileSearchQuery}
              inputRef={mobileSearchInputRef}
              onToggle={() => {
                setMobileSearchExpanded((prev) => !prev)
                if (!mobileSearchExpanded) {
                  setTimeout(() => mobileSearchInputRef.current?.focus(), 100)
                }
              }}
              onQueryChange={setMobileSearchQuery}
              onClose={() => { setMobileSearchExpanded(false); setMobileSearchQuery('') }}
            />
          )}
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="mobile-menu-button"
          >
            <span className="sr-only">メニューを開く</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed right-0 top-0 z-[60] h-full w-full max-w-sm bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
            <VisuallyHidden.Root>
              <Dialog.Title>ナビゲーションメニュー</Dialog.Title>
            </VisuallyHidden.Root>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Logo
                className="h-8 w-auto"
                logo={logoMedia}
                siteName={siteSettings?.siteName}
              />
              <Dialog.Close className="-m-2.5 rounded-md p-2.5 text-gray-700" data-testid="mobile-menu-close">
                <XIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </Dialog.Close>
            </div>

            <div className="overflow-y-auto p-6">
              <div className="space-y-2">
                {/* D-3: Search input in mobile nav — above nav items */}
                {showSearch && (
                  <MobileNavSearch onNavigate={() => setMobileMenuOpen(false)} />
                )}

                {navItems.map((item) => {
                  const hasSubmenu = item.submenuItems && item.submenuItems.length > 0

                  // D-2: Services dropdown as collapsible accordion
                  if (hasSubmenu) {
                    return (
                      <div key={item.id}>
                        <button
                          type="button"
                          onClick={() => setServicesOpen((prev) => !prev)}
                          data-testid={`mobile-${item.key}`}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-lg font-medium text-gray-800 hover:text-alt border-b border-gray-100 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && item.icon !== 'none' && getIconByName(item.icon, 'h-5 w-5')}
                            {item.label}
                          </div>
                          <ChevronDownIcon
                            className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {/* Accordion content — open by default */}
                        <div
                          className={`overflow-hidden transition-all duration-200 ${servicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          {/* Link to main services page */}
                          <Link
                            href={item.link}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block ml-6 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:text-alt hover:bg-slate-50 transition-colors duration-200 mt-2"
                          >
                            すべてのサービス
                          </Link>
                          <div className="ml-6 space-y-1 pb-2">
                            {item.submenuItems!.map((subItem) => (
                              <Link
                                key={subItem.id}
                                href={subItem.link}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:text-alt hover:bg-slate-50 transition-colors duration-200"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div key={item.id}>
                      <Link
                        {...getLinkProps(item)}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`mobile-${item.key}`}
                        className="block rounded-lg px-3 py-3 text-lg font-medium text-gray-800 hover:text-alt border-b border-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2">
                          {item.icon && item.icon !== 'none' && getIconByName(item.icon, 'h-5 w-5')}
                          {item.label}
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  )
}
