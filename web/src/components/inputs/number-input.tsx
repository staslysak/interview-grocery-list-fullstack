'use client'

import { useIMask } from 'react-imask'

import { TextField, TextFieldProps } from '@mui/material'

export function NumberInput({
  max,
  min = 0,
  ...props
}: TextFieldProps & {
  max?: number
  min?: number
}) {
  const { ref: maskRef } = useIMask(
    {
      min: min,
      max: max,
      mask: Number,
      thousandsSeparator: ' ',
    },
    {
      onAccept: () => {
        const target = maskRef.current
        if (target) {
          props.onChange?.({
            target,
          } as React.ChangeEvent<HTMLInputElement>)
        }
      },
    },
  )

  return (
    <TextField
      inputRef={maskRef}
      {...props}
      slotProps={{
        ...props?.slotProps,
        htmlInput: {
          max,
          inputMode: 'numeric',
          ...props?.slotProps?.htmlInput,
        },
      }}
    />
  )
}
