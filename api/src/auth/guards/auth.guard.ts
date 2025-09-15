import { applyDecorators, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/auth/modules/jwt/jwt.guard'

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard))
}
