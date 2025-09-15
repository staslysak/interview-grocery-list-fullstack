import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ClsService } from 'nestjs-cls'

import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { TAuthContext } from '@/auth/dto/auth.dto'

import { JwtRefreshPayload } from './jwt.dto'
import { AppConfigType } from '@/config'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly cls: ClsService,
    private readonly config: ConfigService<AppConfigType>,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromBodyField('token')]),
      secretOrKey: config.get('auth.jwt.refresh.secret', { infer: true }),
    })
  }

  validate(payload: JwtRefreshPayload): TAuthContext | null {
    const context = TAuthContext.fromJwt(payload)

    this.cls.set('user', context)

    return context
  }
}
