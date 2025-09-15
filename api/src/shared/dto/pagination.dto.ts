import { Type as TType } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

import { Exclude, Expose, Transform, Type } from 'class-transformer'
import { IsNumber, IsOptional, Max } from 'class-validator'

const DEFAULT_PAGINATION = {
  take: 10,
}

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @Max(DEFAULT_PAGINATION.take)
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  take?: number = DEFAULT_PAGINATION.take

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  skip?: number = 0
}

export const PaginatedDto = <TModel extends TType<any>>(model: TModel) => {
  @Exclude()
  class Class {
    @ApiProperty({ type: model, isArray: true })
    @Expose()
    @Type(() => model)
    data: InstanceType<TModel>[]

    @ApiProperty()
    @Expose()
    @IsNumber()
    total: number
  }

  Object.defineProperty(Class, 'name', {
    value: `${model.name.replace(/dto/i, '')}PaginatedDto`,
  })

  return Class
}
