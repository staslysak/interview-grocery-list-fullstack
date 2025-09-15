import { BaseSelectProps, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

type Option = {
  value: string
  label: string
}

type SelectInputProps = BaseSelectProps & {
  options: Option[]
  error?: boolean
  helperText?: React.ReactNode
  label?: React.ReactNode
}

export function SelectInput({ ref, label, error, options, helperText, ...props }: SelectInputProps) {
  return (
    <FormControl margin="none" error={error} fullWidth={props.fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select ref={ref} {...props} label={label}>
        {options.map(i => (
          <MenuItem key={i.value} value={i.value}>
            {i.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
