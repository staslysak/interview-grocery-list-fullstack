'use client'

import { useLogout } from '@/features/auth/api/hooks'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

export function Header() {
  const logout = useLogout()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Grocery.io
        </Typography>
        <Button color="inherit" onClick={() => logout.mutate()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}
