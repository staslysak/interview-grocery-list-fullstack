'use client'

import { styled } from '@mui/material'
import { MaterialDesignContent, SnackbarProvider } from 'notistack'

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
    '&.notistack-MuiContent-error': {
        backgroundColor: theme.palette.error.main,
    },
    '&.notistack-MuiContent-success': {
        backgroundColor: theme.palette.success.main,
    },
}))

export function ToastProvider() {
    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            Components={{
                error: StyledMaterialDesignContent,
                success: StyledMaterialDesignContent,
            }}
        />
    )
}
