import GroceryItemView from '@/features/grocery/views/grocery-item'

export default async function Page({ params }: PageProps<'/[itemId]'>) {
  const { itemId } = await params
  return <GroceryItemView id={itemId} />
}
