import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService as NestJwtService } from '@nestjs/jwt'

import * as crypto from 'node:crypto'

import { TokensDto } from '@/auth/dto/auth.dto'

import { JwtAccessPayload } from './jwt.dto'
import { AppConfigType } from '@/config'

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly config: ConfigService<AppConfigType>,
  ) {}

  async generateTokens(payload: JwtAccessPayload): Promise<TokensDto> {
    if (!payload.userId) {
      throw new Error('Invalid payload: userId is required')
    }

    const accessToken = await this.signAccessToken(payload)
    const refreshToken = await this.signRefreshToken(payload)

    return {
      accessToken,
      refreshToken,
    }
  }

  private async signAccessToken(payload: JwtAccessPayload): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: payload.userId,
      },
      this.config.get('auth.jwt.access', { infer: true }),
    )
  }

  private async signRefreshToken(payload: JwtAccessPayload): Promise<string> {
    const jti = `${payload.userId}:${crypto.randomUUID()}`

    return this.jwtService.signAsync(
      {
        jti,
        sub: payload.userId,
      },
      this.config.get('auth.jwt.refresh', { infer: true }),
    )
  }
}
