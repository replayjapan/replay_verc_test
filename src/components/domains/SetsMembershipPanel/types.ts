import type { SetPolicy } from '@/utilities/domainSetsPolicy'

export interface SetInfo {
  id: number | string
  title: string
  slug: string
  policy: SetPolicy
  description?: string | null
}

export interface SetsMembershipPanelProps {
  sets: SetInfo[]
  strictestPolicy: SetPolicy
  isBundleOnly: boolean
}
