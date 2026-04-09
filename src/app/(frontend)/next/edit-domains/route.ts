import { headers } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import { editDomainsFromCSV } from '@/endpoints/edit-domains'

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
    const result = await editDomainsFromCSV({ payload })

    return Response.json({
      success: true,
      message: 'Domains updated successfully.',
      summary: {
        updated: result.updated,
        skipped: result.skipped,
        notFound: result.notFound,
        errors: result.errors,
      },
      details: result.editResults,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    payload.logger.error({ err: error, message: 'Error editing domains' })
    return new Response(`Error editing domains: ${errorMessage}`, { status: 500 })
  }
}
