import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, SiteSetting } from '@/payload-types'

export async function Header() {
  const [headerData, siteSettings] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('site-settings', 2)(),
  ])

  const typedSettings = (siteSettings ?? null) as SiteSetting | null

  return <HeaderClient data={headerData as Header} siteSettings={typedSettings} />
}
