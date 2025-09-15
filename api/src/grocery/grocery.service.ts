import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/shared/prisma/prisma.service'
import {
  CreateGroceryDto,
  DeleteGroceryBulkDto,
  PaginatedGroceryDto,
  UpdateGroceryDto,
  FilterGroceryDto,
  UpdateGroceryStatusDto,
  FilterGroceryHistoryDto,
} from './dto/grocery.dto'
import { Exception } from '@/shared/exeptions'
import { IdDto } from '@/shared/dto/id.dto'

@Injectable()
export class GroceryService {
  constructor(private readonly prisma: PrismaService) {}

  async filterGroceries({
    take,
    skip,
    ...filter
  }: FilterGroceryDto): Promise<InstanceType<typeof PaginatedGroceryDto>> {
    const data = await this.prisma.groceryItem.findMany({
      take,
      skip,
      where: filter,
      orderBy: [{ priority: 'asc' }, { name: 'asc' }],
    })
    const total = await this.prisma.groceryItem.count({
      where: filter,
    })

    return {
      data,
      total,
    }
  }

  async findGroceryItem(id: string) {
    const item = await this.prisma.groceryItem.findUnique({
      where: { id },
    })

    if (!item) {
      throw new Exception.NotFoundException('Item not found')
    }

    return item
  }

  async findGroceryItemHistory(id: string, { take, skip }: FilterGroceryHistoryDto) {
    const data = await this.prisma.groceryItemHistory.findMany({
      take,
      skip,
      where: { groceryItemId: id },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const total = await this.prisma.groceryItemHistory.count({
      where: { groceryItemId: id },
    })

    return {
      data,
      total,
    }
  }

  async createGrocery(input: CreateGroceryDto): Promise<IdDto> {
    return await this.prisma.groceryItem.create({ data: input })
  }

  async updateGrocery(id: string, input: UpdateGroceryDto): Promise<IdDto> {
    const item = await this.prisma.groceryItem.findUnique({
      where: { id },
    })

    if (!item) {
      throw new Exception.NotFoundException('Item not found')
    }

    return await this.prisma.groceryItem.update({
      where: { id },
      data: input,
    })
  }

  async updateGroceryStatus(id: string, input: UpdateGroceryStatusDto): Promise<IdDto> {
    const item = await this.prisma.groceryItem.findUnique({
      where: { id },
    })

    if (!item) {
      throw new Exception.NotFoundException('Item not found')
    }

    const now = new Date()

    return await this.prisma.$transaction(async tx => {
      const data = await tx.groceryItem.update({
        where: { id },
        data: { ...input, statusUpdatedAt: now },
      })
      await tx.groceryItemHistory.create({
        data: { status: input.status, groceryItemId: id, createdAt: now },
      })

      return data
    })
  }

  async deleteGrocery(id: string): Promise<IdDto> {
    return await this.prisma.groceryItem.delete({
      where: { id },
    })
  }

  async deleteGroceryBulk({ ids }: DeleteGroceryBulkDto): Promise<void> {
    await this.prisma.groceryItem.deleteMany({
      where: { id: { in: ids } },
    })
  }
}
