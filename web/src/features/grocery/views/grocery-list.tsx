'use client'

import { Card, CardContent, CardHeader } from '@mui/material'

import { GroceryList } from '../components/grocery-list'
import { CreateGrocery } from '../modals/create-grocery'

export default function GroceryListView() {
  return (
    <Card sx={{ my: 4 }} variant="outlined">
      <CardHeader
        title="Grocery List"
        action={
          <>
            <CreateGrocery />
          </>
        }
      />
      <CardContent>
        <GroceryList />
      </CardContent>
    </Card>
  )
}
