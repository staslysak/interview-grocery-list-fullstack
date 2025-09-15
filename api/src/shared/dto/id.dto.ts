import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsUUID } from 'class-validator'
import { ResposeDto } from './respose.dto'

@Exclude()
export class IdDto {
  @ApiProperty()
  @Expose()
  @IsUUID()
  id: string
}

export const IdResposeDto = ResposeDto(IdDto)
