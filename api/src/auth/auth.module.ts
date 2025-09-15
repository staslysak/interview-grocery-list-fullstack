import { Module } from '@nestjs/common'

import { JwtModule } from './modules/jwt/jwt.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  imports: [JwtModule],
  providers: [AuthService],
})
export class AuthModule {}
