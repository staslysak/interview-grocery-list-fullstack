import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createGroceryItem,
  deleteGroceryItem,
  getGroceryItem,
  getGroceryItemHistory,
  getGroceryList,
  updateGroceryItem,
  updateGroceryItemStatus,
} from './actions'
import { useToast } from '@/hooks/use-toast'
import { components, operations } from '@/api/generated'

export const useGroceryList = (
  params: NonNullable<operations['GroceryController_filterGroceries']['parameters']['query']>,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['grocery.list', params],
    queryFn: () => getGroceryList(params),
    enabled,
  })
}

export const useGrocery = (params: components['schemas']['IdDto'], enabled = true) => {
  return useQuery({
    queryKey: ['grocery.item', params.id],
    queryFn: () => getGroceryItem(params),
    enabled,
  })
}

export const useGroceryHistory = (
  params: components['schemas']['IdDto'] &
    NonNullable<operations['GroceryController_findGroceryItemHistory']['parameters']['query']>,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['grocery.item-history', params],
    queryFn: () => getGroceryItemHistory(params),
    enabled,
  })
}

export const useUpdateGroceryStatus = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['grocery.update-status'],
    mutationFn: updateGroceryItemStatus,
    onSuccess: (_, variables) => {
      const now = new Date().toISOString()
      toast.success('Grocery Item Status Updated')
      queryClient.setQueryData<components['schemas']['GroceryDto']>(['grocery.item', variables.id], old =>
        old
          ? {
              ...old,
              ...variables,
              statusUpdatedAt: now,
            }
          : old,
      )
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ['grocery.list'], exact: false })
        .forEach(query => {
          queryClient.setQueryData<components['schemas']['GroceryPaginatedDto']>(query.queryKey, old => {
            if (!old) return old
            return {
              ...old,
              data: old.data.map(i => (i.id === variables.id ? { ...i, ...variables, statusUpdatedAt: now } : i)),
            }
          })
        })

      queryClient.invalidateQueries({
        queryKey: ['grocery.item-history', { id: variables.id }],
        exact: false,
      })
    },
    onError: error => {
      toast.error(error)
    },
  })
}

export const useCreateGrocery = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['grocery.create'],
    mutationFn: createGroceryItem,
    onSuccess: () => {
      toast.success('Grocery Item Created')
      queryClient.invalidateQueries({ queryKey: ['grocery.list'] })
    },
    onError: error => {
      toast.error(error)
    },
  })
}

export const useUpdateGrocery = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['grocery.update'],
    mutationFn: updateGroceryItem,
    onSuccess: (_, variables) => {
      toast.success('Grocery Item Updated')

      queryClient.setQueryData<components['schemas']['GroceryDto']>(['grocery.item', variables.id], old =>
        old
          ? {
              ...old,
              ...variables,
            }
          : old,
      )
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ['grocery.list'], exact: false })
        .forEach(query => {
          queryClient.setQueryData<components['schemas']['GroceryPaginatedDto']>(query.queryKey, old => {
            if (!old) return old
            return {
              ...old,
              data: old.data.map(i => (i.id === variables.id ? { ...i, ...variables } : i)),
            }
          })
        })
    },
    onError: error => {
      toast.error(error)
    },
  })
}

export const useDeleteGrocery = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: ['grocery.delete'],
    mutationFn: deleteGroceryItem,
    onSuccess: (_, variables) => {
      toast.success('Grocery Item Deleted')
      queryClient.invalidateQueries({ queryKey: ['grocery.list'] })
      queryClient.removeQueries({ queryKey: ['grocery.item', variables.id] })
      onSuccess?.()
    },
    onError: error => {
      toast.error(error)
    },
  })
}
