import { JwtPayload } from 'jsonwebtoken'

export type JwtAccessPayload = JwtPayload & {
  userId: string
}

export type JwtRefreshPayload = JwtAccessPayload & {
  jti: string
}
