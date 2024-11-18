import type { NextRequest } from 'next/server'

import { i18nMiddleware } from '@/lib/i18n'

export async function middleware(request: NextRequest) {
  const response = await i18nMiddleware(request)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
