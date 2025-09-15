import { createTheme } from '@mui/material/styles'

import typography from './typography'
import components from './components'

const theme = () => {
  return createTheme({
    typography,
    components,
  })
}

export default theme
