import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useState } from 'react'

type ModalProps = {
  title: React.ReactNode
  open: boolean
  onClose(): void
}

export function useModalState() {
  const [open, setOpen] = useState<boolean>(false)

  const triggerOpen = () => {
    setOpen(true)
  }

  const triggeClose = () => {
    setOpen(false)
  }

  return {
    open,
    triggerOpen,
    triggeClose,
  }
}

export function Modal({ title, open, onClose, children }: React.PropsWithChildren<ModalProps>) {
  return (
    <Dialog disableRestoreFocus maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
