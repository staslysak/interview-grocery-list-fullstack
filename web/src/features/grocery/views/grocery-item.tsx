'use client'

import { Card, CardHeader, Checkbox, IconButton } from '@mui/material'
import { useGrocery, useUpdateGroceryStatus } from '../api/hooks'
import { UpdateGrocery } from '../modals/edit-grocery'
import { DeleteGroceryItem } from '../components/delete-grocery-item'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import linking from '@/config/linking'
import { components, GroceryItemStatus } from '@/api/generated'
import { useDebounced } from '@/hooks/use-debounced'
import dayjs from 'dayjs'
import { GroceryItemHistory } from '../components/grocery-item-history'
import { DataTable } from '@/components/data-table'

export default function GroceryItemView({ id }: components['schemas']['IdDto']) {
  const router = useRouter()
  const { data: item, isLoading, isError, error } = useGrocery({ id })
  const updateGroceryStatus = useUpdateGroceryStatus()
  const debouncedUpdateGroceryStatus = useDebounced(updateGroceryStatus.mutate)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!item) return <div>Not found</div>

  const handleGoBack = () => {
    router.push(linking.grocery.index)
  }

  return (
    <>
      <Card sx={{ my: 4 }} variant="outlined">
        <CardHeader
          title="Grocery Item"
          action={
            <>
              <IconButton onClick={handleGoBack}>
                <ArrowBack />
              </IconButton>
              <UpdateGrocery item={item} />
              <DeleteGroceryItem item={item} onDeleted={handleGoBack} />
            </>
          }
        />

        <DataTable
          data={[item]}
          columns={[
            {
              key: 'name',
              label: 'Name',
            },
            {
              key: 'quantity',
              label: 'Quantity',
            },
            {
              key: 'status',
              label: 'Status',
              render: row => (
                <>
                  <Checkbox
                    checked={row.status === GroceryItemStatus.Have}
                    onChange={() =>
                      debouncedUpdateGroceryStatus({
                        id: row.id,
                        status:
                          row.status === GroceryItemStatus.Have ? GroceryItemStatus.Ranout : GroceryItemStatus.Have,
                      })
                    }
                  />
                  <span>{!!row.statusUpdatedAt && dayjs(row.statusUpdatedAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                </>
              ),
            },
          ]}
        />
      </Card>

      {!!item?.id && <GroceryItemHistory id={item.id} />}
    </>
  )
}
