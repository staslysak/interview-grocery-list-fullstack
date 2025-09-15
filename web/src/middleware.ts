import { type NextRequest, NextResponse } from 'next/server'

import linking from '@/config/linking'
import { decode } from '@/lib/crypto'
import { components } from './api/generated'

const PUBLIC_FILE = /\.(.*)$/
const UNAUTHORIZED_PATHS = [linking.auth.login] as string[]

function getSession(req: NextRequest) {
  const value = req.cookies.get('session')?.value
  if (!value) return null
  return decode(value) as components['schemas']['TokensDto']
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/api')
  ) {
    return
  }

  const session = getSession(req)

  const isProtectedRoute = !UNAUTHORIZED_PATHS.includes(pathname)

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL(`${linking.auth.login}${req.nextUrl.search}`, req.url))
  }

  if (!isProtectedRoute && !!session) {
    return NextResponse.redirect(new URL(`${linking.grocery.index}${req.nextUrl.search}`, req.url))
  }

  return NextResponse.next()
}
