'use client'

import { ApiProvider } from './api.provider'
import { UiProvider } from './ui.provider'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ApiProvider>
      <UiProvider>{children}</UiProvider>
    </ApiProvider>
  )
}
