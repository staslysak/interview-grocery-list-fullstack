'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/api/get-query-client'

export function ApiProvider({ children }: React.PropsWithChildren) {
  const client = getQueryClient()
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
