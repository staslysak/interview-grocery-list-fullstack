'use server'

import { cookies } from 'next/headers'

import { decode, encode } from '@/lib/crypto'
import { components } from '@/api/generated'

const SESSION_KEY = 'session'

export async function setSessionCookie(value: string) {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_KEY, value, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })
}

export async function getSession(): Promise<components['schemas']['TokensDto'] | null> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_KEY)?.value
    if (!session) throw new Error('No session')
    return decode(session)
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_KEY)
}

export async function createSession(tokens: components['schemas']['TokensDto']) {
  try {
    if (!tokens.accessToken && !tokens.refreshToken) throw new Error('No tokens')
    const session = encode(tokens)
    await setSessionCookie(session)
  } catch {
    return null
  }
}
