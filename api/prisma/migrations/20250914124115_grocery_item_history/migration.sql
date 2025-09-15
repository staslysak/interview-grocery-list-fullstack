-- AlterTable
ALTER TABLE "GroceryItem" ADD COLUMN     "statusUpdatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "GroceryItemHistory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "groceryItemId" UUID NOT NULL,
    "status" "GroceryItemStatus" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "GroceryItemHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroceryItemHistory" ADD CONSTRAINT "GroceryItemHistory_groceryItemId_fkey" FOREIGN KEY ("groceryItemId") REFERENCES "GroceryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
