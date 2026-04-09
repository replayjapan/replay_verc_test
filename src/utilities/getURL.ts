import canUseDOM from './canUseDOM'

const resolvePreferredURL = () => {
  const candidates = [
    process.env.NEXT_PUBLIC_PAYLOAD_URL,
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.PAYLOAD_SERVER_URL,
    process.env.NEXT_PUBLIC_SERVER_URL,
  ]

  for (const candidate of candidates) {
    if (candidate && candidate.trim().length > 0) {
      return candidate
    }
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return 'http://localhost:3000'
}

export const getServerSideURL = () => {
  return resolvePreferredURL()
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return resolvePreferredURL()
}
