import { GroceryItemStatus, operations } from '@/api/generated'
import { SelectInput } from '@/components/inputs/select-input'
import { Box } from '@mui/material'

type GroceryListFilterProps<
  V = Pick<NonNullable<Partial<operations['GroceryController_filterGroceries']['parameters']['query']>>, 'status'>,
> = {
  value: V
  onChange(v: V): void
}

export function GroceryListFilter({ value, onChange }: GroceryListFilterProps) {
  const statusOptions = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Have',
      value: GroceryItemStatus.Have,
    },
    {
      label: 'Ran out',
      value: GroceryItemStatus.Ranout,
    },
  ]

  return (
    <Box sx={{ mb: 2 }}>
      <SelectInput
        fullWidth
        label="Status"
        options={statusOptions}
        value={value.status ?? 'all'}
        onChange={v =>
          onChange({ status: v.target.value === 'all' ? undefined : (v.target.value as GroceryItemStatus) })
        }
      />
    </Box>
  )
}
