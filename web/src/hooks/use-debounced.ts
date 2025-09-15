import { useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounced<T extends (...args: any[]) => Promise<any> | any>(fn: T, delay = 300) {
  const timeout = useRef<NodeJS.Timeout>(null)

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    return new Promise(resolve => {
      timeout.current = setTimeout(() => {
        Promise.resolve(fn(...args)).then(resolve)
      }, delay)
    })
  }
}
