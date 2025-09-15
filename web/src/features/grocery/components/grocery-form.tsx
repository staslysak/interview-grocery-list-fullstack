'use client'

import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Stack, Slider, FormControl, Typography } from '@mui/material'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { NumberInput } from '@/components/inputs/number-input'

type FormValues = z.infer<typeof schema>

type GroceryFormProps = {
  loading: boolean
  defaultValues?: Partial<FormValues>
  onCancel(): void
  onSubmit(v: FormValues): Promise<unknown>
}

const schema = z.object({
  name: z.string().nonempty(),
  priority: z.coerce.number().nonoptional(),
  quantity: z
    .any()
    .transform(v => String(v ?? '').replace(/\s+/g, ''))
    .pipe(z.coerce.number()),
})

function normalizePriority(v?: number) {
  if (!v) return 1
  return 1 + 5 - v
}

export function GroceryForm({ defaultValues, loading, onCancel, onSubmit }: GroceryFormProps) {
  const form = useForm({
    defaultValues: {
      name: defaultValues?.name ?? '',
      quantity: defaultValues?.quantity ?? 0,
      priority: normalizePriority(defaultValues?.priority),
    },
    resolver: zodResolver(schema),
  })

  return (
    <form
      onSubmit={form.handleSubmit(v =>
        onSubmit({
          ...v,
          quantity: v.quantity,
          priority: normalizePriority(v.priority),
        }),
      )}
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            autoFocus
            fullWidth
            margin="dense"
            label="Name"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="quantity"
        control={form.control}
        render={({ field, fieldState }) => (
          <NumberInput
            {...field}
            fullWidth
            margin="dense"
            label="Quantity"
            max={2000}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="priority"
        control={form.control}
        render={({ field }) => (
          <FormControl margin="dense" fullWidth>
            <Typography color="textSecondary">Priority</Typography>
            <Slider max={5} min={1} value={field.value as number} onChange={field.onChange} />
          </FormControl>
        )}
      />
      <Stack direction="row" spacing={2} mt={2}>
        <Button fullWidth onClick={onCancel}>
          Cancel
        </Button>
        <Button
          size="large"
          variant="contained"
          fullWidth
          type="submit"
          loading={loading || form.formState.isSubmitting}
        >
          Save
        </Button>
      </Stack>
    </form>
  )
}
