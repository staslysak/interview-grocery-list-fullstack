import { HTTPError } from 'ky'
import { enqueueSnackbar } from 'notistack'

export function useToast() {
  const success = (message: string) => {
    enqueueSnackbar({
      message,
      variant: 'success',
    })
  }

  const error = async (error: Error) => {
    console.error(error)

    let message = ''

    if (error instanceof HTTPError) {
      const body = await error.response.json().catch(() => null)

      message = body.message
    } else {
      // @ts-expect-error unknown
      const statusText = error?.response?.statusText

      message = statusText
    }

    enqueueSnackbar({
      message: message ?? 'Unknown error',
      variant: 'error',
    })
  }

  return {
    error,
    success,
  }
}
