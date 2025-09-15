import { apiClient } from '@/api/api-client'
import { components, operations } from '@/api/generated'

export const getGroceryList = async (
  input: NonNullable<operations['GroceryController_filterGroceries']['parameters']['query']>,
) => {
  const searchParams = new URLSearchParams(
    Object.fromEntries(Object.entries(input).filter(([_, v]) => v !== undefined)) as Record<string, string>,
  )
  const res = await apiClient.get(`/api/grocery`, { searchParams }).json<components['schemas']['GroceryPaginatedDto']>()
  return res
}

export const getGroceryItem = async ({ id }: components['schemas']['IdDto']) => {
  const res = await apiClient.get(`/api/grocery/${id}`).json<components['schemas']['GroceryResposeDto']>()
  return res.data
}

export const getGroceryItemHistory = async ({
  id,
  ...input
}: NonNullable<
  components['schemas']['IdDto'] & operations['GroceryController_findGroceryItemHistory']['parameters']['query']
>) => {
  const searchParams = new URLSearchParams(
    Object.fromEntries(Object.entries(input as Record<string, string>).filter(([_, v]) => v !== undefined)),
  )
  const res = await apiClient
    .get(`/api/grocery/${id}/history`, { searchParams })
    .json<components['schemas']['GroceryHistoryPaginatedDto']>()
  return res
}

export const createGroceryItem = async (input: components['schemas']['CreateGroceryDto']) => {
  const res = await apiClient.post(`/api/grocery`, { json: input }).json<components['schemas']['IdResposeDto']>()
  return res.data
}

export const updateGroceryItemStatus = async ({
  id,
  ...input
}: components['schemas']['IdDto'] & components['schemas']['UpdateGroceryStatusDto']) => {
  const res = await apiClient
    .put(`/api/grocery/${id}/status`, { json: input })
    .json<components['schemas']['IdResposeDto']>()
  return res.data
}

export const updateGroceryItem = async ({
  id,
  ...input
}: components['schemas']['IdDto'] & components['schemas']['UpdateGroceryDto']) => {
  const res = await apiClient.put(`/api/grocery/${id}`, { json: input }).json<components['schemas']['IdResposeDto']>()
  return res.data
}

export const deleteGroceryItem = async ({ id }: components['schemas']['IdDto']) => {
  const res = await apiClient.delete(`/api/grocery/${id}`).json<components['schemas']['IdResposeDto']>()
  return res.data
}
