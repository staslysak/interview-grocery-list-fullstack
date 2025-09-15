import { ThemeOptions } from '@mui/material'

import { Roboto } from 'next/font/google'

const font = Roboto({
  variable: '--font',
})

const typography: ThemeOptions['typography'] = {
  fontFamily: [
    font.style.fontFamily,
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
}

export default typography
