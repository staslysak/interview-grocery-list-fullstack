import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ClsService } from 'nestjs-cls'

import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { TAuthContext } from '@/auth/dto/auth.dto'

import { JwtAccessPayload } from './jwt.dto'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { AppConfigType } from '@/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly cls: ClsService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService<AppConfigType>,
  ) {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
      secretOrKey: config.get('auth.jwt.access.secret', { infer: true }),
    })
  }

  async validate(_: Request, payload: JwtAccessPayload): Promise<TAuthContext | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    })

    if (!user) return null

    const context = TAuthContext.fromJwt(payload)

    this.cls.set('user', context)

    return context
  }
}
