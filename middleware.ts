import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SOURCE_MAP: Record<string, string> = {
  '/t': 'tiktok',
  '/tiktok': 'tiktok',
  '/i': 'instagram',
  '/ig': 'instagram',
  '/instagram': 'instagram',
  '/y': 'youtube',
  '/yt': 'youtube',
  '/youtube': 'youtube',
  '/f': 'facebook',
  '/fb': 'facebook',
  '/facebook': 'facebook',
  '/x': 'twitter',
  '/twitter': 'twitter',
  '/p': 'pinterest',
  '/pin': 'pinterest',
  '/l': 'linkedin',
  '/li': 'linkedin',
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.toLowerCase()
  const source = SOURCE_MAP[path]

  if (source) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('utm_source', source)
    url.searchParams.set('utm_medium', 'linkinbio')
    url.searchParams.set('utm_campaign', 'bio_links')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|images|favicon).*)'],
}
