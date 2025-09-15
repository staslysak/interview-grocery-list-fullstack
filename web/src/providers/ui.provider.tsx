import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import createTheme from '@/ui/theme'

import { ToastProvider } from './toast.provider'

export function UiProvider({ children }: React.PropsWithChildren) {
  const theme = createTheme()

  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastProvider />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
