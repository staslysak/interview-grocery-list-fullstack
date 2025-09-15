import { IsOptional, IsString } from 'class-validator'
import { Exclude, Expose } from 'class-transformer'
import { ResposeDto } from '@/shared/dto/respose.dto'
import { ApiProperty } from '@nestjs/swagger'

export class FilterUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  email?: string
}

@Exclude()
export class UserDto {
  @ApiProperty()
  @Expose()
  id: string

  @ApiProperty()
  @Expose()
  email: string
}

export const UserResposeDto = ResposeDto(UserDto)
