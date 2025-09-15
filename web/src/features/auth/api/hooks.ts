import { useMutation } from '@tanstack/react-query'

import { login } from './actions'
import { createSession, deleteSession } from '@/lib/session'
import { useRouter } from 'next/navigation'
import linking from '@/config/linking'
import { useToast } from '@/hooks/use-toast'

export const useLogin = () => {
  const router = useRouter()
  const toast = useToast()

  return useMutation({
    mutationKey: ['auth.login'],
    mutationFn: login,
    onSuccess: async data => {
      await createSession(data)
      router.replace(linking.grocery.index)
    },
    onError: error => {
      toast.error(error)
    },
  })
}

export function useLogout() {
  const router = useRouter()

  return useMutation({
    mutationKey: ['auth.logout'],
    mutationFn: async () => {
      await deleteSession()
      router.replace(linking.auth.login)
      return null
    },
  })
}
