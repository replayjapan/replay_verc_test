import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Looks up the domain from the relationship and sets domainName
 * server-side. Ignores whatever the client sent — the relationship
 * ID is the source of truth.
 */
export const populateDomainName: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if (operation !== 'create') return data

  const domainId = data?.domain
  if (!domainId) return data

  const domainDoc = await req.payload.findByID({
    collection: 'domains',
    id: domainId,
    depth: 0,
    overrideAccess: true,
  })

  if (domainDoc?.domainName) {
    data.domainName = domainDoc.domainName
  }

  return data
}
