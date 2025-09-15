import { apiClient } from '@/api/api-client'
import { components } from '@/api/generated'

export const refreshToken = async (input: components['schemas']['RefreshTokenDto']) => {
  const res = await apiClient
    .post(`/api/auth/refresh`, { json: input })
    .json<components['schemas']['TokensResposeDto']>()
  return res.data
}

export const login = async (input: components['schemas']['LoginDto']) => {
  const res = await apiClient.post(`/api/auth/login`, { json: input }).json<components['schemas']['TokensResposeDto']>()
  return res.data
}
