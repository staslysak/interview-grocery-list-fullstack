import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

type Column<T> =
  | {
      key: keyof T
      label: string
      render?: (row: T) => React.ReactNode
    }
  | {
      key: string
      label: string
      render: (row: T) => React.ReactNode // render required if key is not from T
    }

type DataTableProps<T extends { id: string | number }> = {
  columns: Column<T>[]
  data: T[]
  total?: number
  perPage?: number
  page?: number
  onPaginate?(page: number): void
}

export function DataTable<T extends { id: string | number }>({
  data,
  total,
  page,
  perPage,
  columns,
  onPaginate,
}: DataTableProps<T>) {
  const pages = Math.ceil((total ?? 0) / (perPage ?? 0))

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={String(col.key)}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                {columns.map(col => (
                  <TableCell key={String(col.key)}>
                    {col.render ? col.render(row) : (row[col.key as keyof T] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pages > 1 && !!onPaginate && (
        <Pagination sx={{ my: 2 }} count={pages} page={page} onChange={(_, page) => onPaginate(page)} />
      )}
    </>
  )
}
