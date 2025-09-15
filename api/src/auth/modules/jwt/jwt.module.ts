import { Module } from '@nestjs/common'
import { JwtModule as NestJwtModule } from '@nestjs/jwt'

import { JwtService } from './jwt.service'
import { JwtStrategy } from './jwt.strategy'
import { JwtRefreshStrategy } from './jwt-refresh.strategy'

@Module({
  exports: [JwtService],
  imports: [NestJwtModule],
  providers: [JwtStrategy, JwtRefreshStrategy, JwtService],
})
export class JwtModule {}
