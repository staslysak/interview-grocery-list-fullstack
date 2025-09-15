import ky from 'ky'
import linking from '@/config/linking'
import * as actions from '@/features/auth/api/actions'
import { createSession, deleteSession, getSession } from '@/lib/session'

let refreshingPromise: Promise<void> | null = null

export const apiClient = ky.create({
  timeout: 10_000,
  hooks: {
    beforeRequest: [
      async request => {
        const session = await getSession()
        if (session?.accessToken) {
          request.headers.set('authorization', `Bearer ${session.accessToken}`)
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return response

        const session = await getSession()
        if (!session?.refreshToken) {
          await deleteSession()
          window.location.href = linking.auth.login
          throw new Error('No refresh token')
        }

        // Only one refresh at a time
        if (!refreshingPromise) {
          refreshingPromise = (async () => {
            try {
              const tokens = await actions.refreshToken({ token: session.refreshToken })
              await createSession(tokens)
            } catch (err) {
              await deleteSession()
              window.location.href = linking.auth.login
              throw err
            } finally {
              refreshingPromise = null
            }
          })()
        }

        // Wait for the refresh to finish
        await refreshingPromise

        const newSession = await getSession()
        if (newSession?.accessToken) {
          request.headers.set('authorization', `Bearer ${newSession.accessToken}`)
        }
        return ky(request, options)
      },
    ],
  },
})
