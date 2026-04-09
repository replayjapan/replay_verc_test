'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, SiteSetting } from '@/payload-types'
import { convertHeaderData } from '@/types/header'
import { EnhancedMenu } from './menus/EnhancedMenu'

interface HeaderClientProps {
  data: Header
  siteSettings: SiteSetting | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, siteSettings }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Convert Payload data to HeaderData format
  const headerData = convertHeaderData(data)

  return (
    <div className="sticky top-0 z-50" {...(theme ? { 'data-theme': theme } : {})}>
      <EnhancedMenu headerData={headerData} siteSettings={siteSettings} />
    </div>
  )
}
