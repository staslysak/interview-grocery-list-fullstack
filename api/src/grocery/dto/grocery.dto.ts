import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { Exclude, Expose, Transform } from 'class-transformer'

import { GroceryItemStatus } from '@prisma/client'
import { PaginatedDto, PaginationDto } from '@/shared/dto/pagination.dto'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { ResposeDto } from '@/shared/dto/respose.dto'

export class FilterGroceryDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  priority?: number

  @ApiProperty({ required: false, enumName: 'GroceryItemStatus', enum: GroceryItemStatus })
  @IsEnum(GroceryItemStatus)
  @IsOptional()
  status?: GroceryItemStatus
}

export class FilterGroceryHistoryDto extends PaginationDto {}

export class CreateGroceryDto {
  @ApiProperty({ required: false })
  @IsString()
  name: string

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  priority?: number

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  quantity?: number

  @ApiProperty({ required: false, enumName: 'GroceryItemStatus', enum: GroceryItemStatus })
  @IsEnum(GroceryItemStatus)
  @IsOptional()
  status?: GroceryItemStatus
}

export class UpdateGroceryDto extends PartialType(CreateGroceryDto) {}

export class UpdateGroceryStatusDto {
  @ApiProperty({ enumName: 'GroceryItemStatus', enum: GroceryItemStatus })
  @IsEnum(GroceryItemStatus)
  status: GroceryItemStatus
}

export class DeleteGroceryBulkDto {
  @ApiProperty()
  @IsArray()
  @IsUUID('all', { each: true })
  ids: string[]
}

@Exclude()
export class GroceryDto {
  @ApiProperty()
  @Expose()
  @IsUUID()
  id: string

  @ApiProperty()
  @Expose()
  @IsString()
  name: string

  @ApiProperty()
  @Expose()
  @IsNumber()
  priority: number

  @ApiProperty()
  @Expose()
  @IsNumber()
  quantity: number

  @ApiProperty({ enumName: 'GroceryItemStatus', enum: GroceryItemStatus })
  @Expose()
  @IsEnum(GroceryItemStatus)
  status: GroceryItemStatus

  @ApiProperty({ required: false })
  @Expose()
  statusUpdatedAt?: Date
}

@Expose()
export class GroceryHistoryDto {
  @ApiProperty()
  @Expose()
  @IsUUID()
  id: string

  @ApiProperty({ enumName: 'GroceryItemStatus', enum: GroceryItemStatus })
  @Expose()
  @IsEnum(GroceryItemStatus)
  status: GroceryItemStatus

  @ApiProperty()
  @Expose()
  createdAt: Date
}

export const PaginatedGroceryHistoryDto = PaginatedDto(GroceryHistoryDto)
export const PaginatedGroceryDto = PaginatedDto(GroceryDto)
export const GroceryResposeDto = ResposeDto(GroceryDto)
