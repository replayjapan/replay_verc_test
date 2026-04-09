/**
 * Domain set policy types and the "strictest-set-wins" utility.
 *
 * Priority order (strictest first):
 *   bundle_only > preferred_bundle > allow_individual
 */

export type SetPolicy = 'bundle_only' | 'preferred_bundle' | 'allow_individual'

/** Lower number = stricter policy */
const POLICY_RANK: Record<SetPolicy, number> = {
  bundle_only: 0,
  preferred_bundle: 1,
  allow_individual: 2,
}

export const POLICY_LABELS: Record<SetPolicy, string> = {
  bundle_only: 'セットのみ受付',
  preferred_bundle: 'セット優先',
  allow_individual: '個別受付可',
}

export interface DomainSetInfo {
  id: number | string
  title: string
  slug: string
  policy: SetPolicy
  description?: string | null
}

export interface StrictestPolicyResult {
  /** The strictest policy across all sets */
  strictestPolicy: SetPolicy
  /** All sets sorted by strictness (strictest first) */
  sortedSets: DomainSetInfo[]
  /** Whether any set enforces bundle_only */
  isBundleOnly: boolean
}

/**
 * Given a list of sets that contain a domain, returns the strictest policy
 * and the sets sorted by strictness (strictest first).
 *
 * If no sets are provided, defaults to allow_individual.
 */
export function getStrictestPolicy(sets: DomainSetInfo[]): StrictestPolicyResult {
  if (sets.length === 0) {
    return {
      strictestPolicy: 'allow_individual',
      sortedSets: [],
      isBundleOnly: false,
    }
  }

  const sortedSets = [...sets].sort(
    (a, b) => POLICY_RANK[a.policy] - POLICY_RANK[b.policy],
  )

  const strictestPolicy = sortedSets[0].policy

  return {
    strictestPolicy,
    sortedSets,
    isBundleOnly: strictestPolicy === 'bundle_only',
  }
}
