import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { JwtAccessPayload, JwtRefreshPayload } from '@/auth/modules/jwt/jwt.dto'
import { ApiProperty } from '@nestjs/swagger'
import { ResposeDto } from '@/shared/dto/respose.dto'

export class TAuthContext {
  id: string

  static fromJwt(payload: JwtAccessPayload | JwtRefreshPayload): TAuthContext | null {
    if (!payload.sub) return null

    return {
      id: payload.sub,
    }
  }
}

@Exclude()
export class TokensDto {
  @ApiProperty()
  @Expose()
  accessToken: string

  @ApiProperty()
  @Expose()
  refreshToken: string
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string
}

export const TokensResposeDto = ResposeDto(TokensDto)
