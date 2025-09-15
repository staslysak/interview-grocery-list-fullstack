export function parseNumber(value: string, defaultValue: number | null = null) {
  if (value === '' || value === '-') {
    return defaultValue // treat as "not yet a number"
  }

  const num = Number(value)
  return isNaN(num) ? defaultValue : num
}
