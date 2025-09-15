import { Checkbox } from '@mui/material'

import { useGroceryList, useUpdateGroceryStatus } from '../api/hooks'
import { DeleteGroceryItem } from './delete-grocery-item'
import { UpdateGrocery } from '../modals/edit-grocery'
import Link from 'next/link'
import linking from '@/config/linking'
import { GroceryListFilter } from './grocery-list-filter'
import { useState } from 'react'
import { GroceryItemStatus, operations } from '@/api/generated'
import { DEFAULT_PAGINATION } from '@/api/constants'
import { useDebounced } from '@/hooks/use-debounced'
import dayjs from 'dayjs'
import { DataTable } from '@/components/data-table'

export function GroceryList() {
  const [filter, setFilter] =
    useState<
      Pick<
        NonNullable<Partial<operations['GroceryController_filterGroceries']['parameters']['query']>>,
        'status' | 'take' | 'skip'
      >
    >(DEFAULT_PAGINATION)

  const { data, isLoading, isError, error } = useGroceryList(filter)
  const updateGroceryStatus = useUpdateGroceryStatus()
  const debouncedUpdateGroceryStatus = useDebounced(updateGroceryStatus.mutate)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  const page = Math.ceil((filter.skip ?? 0) / DEFAULT_PAGINATION.take) + 1

  const handlePagination = (page: number) => {
    setFilter(p => ({ ...p, skip: (page - 1) * DEFAULT_PAGINATION.take }))
  }

  return (
    <>
      <GroceryListFilter value={filter} onChange={v => setFilter(p => ({ ...p, ...v }))} />

      <DataTable
        data={data?.data ?? []}
        total={data?.total ?? 0}
        perPage={DEFAULT_PAGINATION.take}
        page={page}
        onPaginate={handlePagination}
        columns={[
          {
            key: 'name',
            label: 'Name',
            render: row => <Link href={linking.grocery.id(row.id)}>{row.name}</Link>,
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
                      status: row.status === GroceryItemStatus.Have ? GroceryItemStatus.Ranout : GroceryItemStatus.Have,
                    })
                  }
                />
                <span>{!!row.statusUpdatedAt && dayjs(row.statusUpdatedAt).format('DD.MM.YYYY HH:mm:ss')}</span>
              </>
            ),
          },
          {
            key: 'actions',
            label: 'Actions',
            render: row => (
              <>
                <UpdateGrocery item={row} />
                <DeleteGroceryItem item={row} />
              </>
            ),
          },
        ]}
      />
    </>
  )
}
