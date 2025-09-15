import { Components } from '@mui/material'

const components: Components = {
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        '&[type="number"]': {
          MozAppearance: 'textfield',
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
        },
      },
    },
  },
}

export default components
