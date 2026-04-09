import { APIError } from 'payload'
import type { CollectionBeforeValidateHook } from 'payload'

/**
 * Server-side honeypot check. Bots skip JavaScript and POST directly
 * to the API — the client-side check does nothing against them.
 *
 * The `website` field is a real schema field (admin: hidden) so Payload
 * preserves it in `data` instead of stripping it. If it has a value,
 * the submission is from a bot — reject with a generic 400.
 */
export const rejectHoneypot: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (operation !== 'create') return data

  if (data?.website && typeof data.website === 'string' && data.website.length > 0) {
    throw new APIError('Bad request', 400)
  }

  return data
}
