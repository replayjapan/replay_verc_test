import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, SiteSetting } from '@/payload-types'

import { StandardLink } from '@/components/Link/StandardLink'
import type { LinkData } from '@/components/Link/StandardLink'
import { Logo } from '@/components/Logo/Logo'

export async function FooterComponent() {
  const [footerData, siteSettings] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('site-settings', 2)(),
  ])

  const typedFooter = (footerData ?? null) as Footer | null
  const navItems = typedFooter?.navItems || []
  const typedSettings = (siteSettings ?? null) as SiteSetting | null

  return (
    <footer className="mt-auto bg-[var(--brand-primary)]" data-testid="footer">
      <div className="site-container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <Link className="flex items-center" href="/" data-testid="footer-logo">
          <Logo
            className="h-9 w-auto brightness-0 invert opacity-90"
            logo={typedSettings?.logo ?? null}
            siteName={typedSettings?.siteName}
          />
        </Link>

        <nav
          className="flex flex-col gap-3 text-sm text-slate-400 md:flex-row md:items-center md:gap-5"
          data-testid="footer-nav"
        >
          {navItems.map(({ link, key }, i) => {
            const linkData = link as LinkData | undefined
            if (!linkData) return null
            return (
              <span key={key || i} data-testid={key || `footer-link-${i}`}>
                <StandardLink className="hover:text-white transition-colors duration-150" link={linkData} />
              </span>
            )
          })}
        </nav>
      </div>
    </footer>
  )
}
