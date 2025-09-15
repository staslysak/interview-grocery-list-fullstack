import { Injectable } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'

import * as bcrypt from 'bcrypt'

import { TAuthContext, TokensDto, LoginDto, RefreshTokenDto } from '@/auth/dto/auth.dto'
import { JwtService } from '@/auth/modules/jwt/jwt.service'
import { Exception } from '@/shared/exeptions'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { UserDto } from '@/user/dto/user.dto'
import { InjectRedis } from '@nestjs-modules/ioredis'
import Redis from 'ioredis'
import { ConfigService } from '@nestjs/config'
import { AppConfigType } from '@/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly cls: ClsService,
    private readonly config: ConfigService<AppConfigType>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  private async createSession(user: UserDto): Promise<TokensDto> {
    const tokens = await this.jwtService.generateTokens({ userId: user.id })

    await this.redis.set(
      `session:${user.id}`,
      tokens.refreshToken,
      'EX',
      this.config.get('auth.sessionTtl', { infer: true }),
    )

    return tokens
  }

  async login(input: LoginDto): Promise<TokensDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: input.email,
      },
    })

    if (!user) {
      throw new Exception.NotFoundException('User not found')
    }

    const passwordsMatch = await bcrypt.compare(input.password, user.password)

    if (!passwordsMatch) {
      throw new Exception.BadRequestException('Password mismatch')
    }

    return await this.createSession(user)
  }

  async refreshToken(input: RefreshTokenDto): Promise<TokensDto> {
    const userId = this.cls.get<TAuthContext>('user')?.id

    if (!userId) {
      throw new Exception.BadRequestException('Invalid token')
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new Exception.NotFoundException('User not found')
    }

    const session = await this.redis.get(`session:${user.id}`)

    if (session !== input.token) {
      throw new Exception.BadRequestException('SessionId mismatch')
    }

    return await this.createSession(user)
  }
}
