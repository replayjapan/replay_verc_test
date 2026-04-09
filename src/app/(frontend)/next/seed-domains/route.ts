import { headers } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import { importDomainsFromCSV } from '@/endpoints/seed-domains'

export const maxDuration = 60

export async function POST(): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not found', { status: 404 })
  }

  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Authentication required.', { status: 403 })
  }

  try {
    const result = await importDomainsFromCSV({ payload })

    return Response.json({
      success: true,
      message: 'Domains imported successfully.',
      summary: {
        created: result.created,
        updated: result.updated,
        skipped: result.skipped,
        errors: result.errors,
      },
      details: result.importResults,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    payload.logger.error({ err: error, message: 'Error importing domains' })
    return new Response(`Error importing domains: ${errorMessage}`, { status: 500 })
  }
}
