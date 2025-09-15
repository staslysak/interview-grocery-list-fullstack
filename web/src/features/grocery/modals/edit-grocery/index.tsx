'use client'

import { Modal, useModalState } from '@/components/modal'
import { useUpdateGrocery } from '../../api/hooks'
import { IconButton } from '@mui/material'
import { GroceryForm } from '../../components/grocery-form'
import Edit from '@mui/icons-material/Edit'
import { components } from '@/api/generated'

export function UpdateGrocery({ item }: { item: components['schemas']['GroceryDto'] }) {
  const modalState = useModalState()
  const UpdateGrocery = useUpdateGrocery()

  return (
    <>
      <IconButton onClick={modalState.triggerOpen}>
        <Edit />
      </IconButton>

      <Modal title="Edit Item" open={modalState.open} onClose={modalState.triggeClose}>
        <GroceryForm
          defaultValues={item}
          loading={UpdateGrocery.isPending}
          onCancel={modalState.triggeClose}
          onSubmit={async v => {
            await UpdateGrocery.mutateAsync({ id: item.id, ...v })
            modalState.triggeClose()
          }}
        />
      </Modal>
    </>
  )
}
