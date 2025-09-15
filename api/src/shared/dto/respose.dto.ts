import { Type as TType } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

import { Exclude, Expose, Type } from 'class-transformer'

export const ResposeDto = <TModel extends TType<any>>(model: TModel) => {
  @Exclude()
  class Class {
    @ApiProperty({ type: model })
    @Expose()
    @Type(() => model)
    data: InstanceType<TModel>
  }

  Object.defineProperty(Class, 'name', {
    value: `${model.name.replace(/dto/i, '')}ResposeDto`,
  })

  return Class
}
