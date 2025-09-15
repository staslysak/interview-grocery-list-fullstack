'use client'

import { Modal, useModalState } from '@/components/modal'
import { useCreateGrocery } from '../../api/hooks'
import Add from '@mui/icons-material/Add'
import { IconButton } from '@mui/material'
import { GroceryForm } from '../../components/grocery-form'

export function CreateGrocery() {
  const modalState = useModalState()
  const createGrocery = useCreateGrocery()

  return (
    <>
      <IconButton onClick={modalState.triggerOpen}>
        <Add />
      </IconButton>

      <Modal title="Add New Item" open={modalState.open} onClose={modalState.triggeClose}>
        <GroceryForm
          loading={createGrocery.isPending}
          onCancel={modalState.triggeClose}
          onSubmit={async v => {
            await createGrocery.mutateAsync(v)
            modalState.triggeClose()
          }}
        />
      </Modal>
    </>
  )
}
