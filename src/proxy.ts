import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

const hstsHeader =
  'max-age=63072000; includeSubDomains; preload'

const isDev = process.env.NODE_ENV !== 'production'

const frontendCSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "frame-src https://www.youtube.com https://player.vimeo.com",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

const adminCSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "frame-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value)
  }

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', hstsHeader)
  }

  const isAdmin = pathname.startsWith('/admin')
  response.headers.set('Content-Security-Policy', isAdmin ? adminCSP : frontendCSP)

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|media/).*)',
  ],
}
