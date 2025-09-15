import Delete from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { useDeleteGrocery } from '../api/hooks'
import { components } from '@/api/generated'

type DeleteGroceryItemProps = {
  item: components['schemas']['GroceryDto']
  onDeleted?(): void
}

export function DeleteGroceryItem({ item, onDeleted }: DeleteGroceryItemProps) {
  const deleteGrocery = useDeleteGrocery({
    onSuccess: onDeleted,
  })

  return (
    <IconButton
      loading={deleteGrocery.isPending}
      onClick={() => {
        deleteGrocery.mutate({ id: item.id })
      }}
    >
      <Delete />
    </IconButton>
  )
}
