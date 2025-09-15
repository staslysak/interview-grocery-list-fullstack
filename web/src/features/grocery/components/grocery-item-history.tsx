import { DEFAULT_PAGINATION } from '@/api/constants'
import { useGroceryHistory } from '../api/hooks'
import { components, operations } from '@/api/generated'
import { Card, CardHeader } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'
import { DataTable } from '@/components/data-table'

export function GroceryItemHistory({ id }: components['schemas']['IdDto']) {
  const [filter, setFilter] =
    useState<
      Pick<
        NonNullable<Partial<operations['GroceryController_filterGroceries']['parameters']['query']>>,
        'take' | 'skip'
      >
    >(DEFAULT_PAGINATION)

  const { data, isLoading, isError, error } = useGroceryHistory({
    id,
    ...filter,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  // const pages = Math.ceil((data?.total ?? 0) / DEFAULT_PAGINATION.take)
  const page = Math.ceil((filter.skip ?? 0) / DEFAULT_PAGINATION.take) + 1

  const handlePagination = (page: number) => {
    setFilter(p => ({ ...p, skip: (page - 1) * DEFAULT_PAGINATION.take }))
  }

  return (
    <Card sx={{ my: 4 }} variant="outlined">
      <CardHeader title="History" />

      <DataTable
        data={data?.data ?? []}
        total={data?.total ?? 0}
        perPage={DEFAULT_PAGINATION.take}
        page={page}
        onPaginate={handlePagination}
        columns={[
          {
            key: 'status',
            label: 'Status',
          },
          {
            key: 'createdAt',
            label: 'Updated At',
            render: row => dayjs(row.createdAt).format('DD.MM.YYYY HH:mm:ss'),
          },
        ]}
      />
    </Card>
  )
}
