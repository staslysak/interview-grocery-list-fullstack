import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { getRequest } from '@/auth/guards/get-request'
import { Exception } from '@/shared/exeptions'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  getRequest(context: ExecutionContext) {
    return getRequest(context)
  }

  handleRequest<T>(err: Error, user: T) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new Exception.UnauthorizedException()
    }

    return user
  }
}

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  getRequest(context: ExecutionContext) {
    return getRequest(context)
  }

  handleRequest<T>(err: Error, user: T) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new Exception.UnauthorizedException()
    }

    return user
  }
}
