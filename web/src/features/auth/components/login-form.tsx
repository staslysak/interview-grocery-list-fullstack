'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Container, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

type FormValues = z.infer<typeof schema>

type LoginFormProps = {
  loading: boolean
  onSubmit(v: FormValues): void
}

const schema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
})

export function LoginForm({ loading, onSubmit }: LoginFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <Container
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box component="form" flex={1} maxWidth="sm" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              margin="dense"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              margin="dense"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Button
          sx={{ mt: 2 }}
          size="large"
          variant="contained"
          fullWidth
          type="submit"
          loading={loading || form.formState.isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </Container>
  )
}
