import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'

import { Response } from 'express'

import { AppException, ExceptionCode } from './shared/exeptions'

const DEFAULT_MESSAGE = 'Something went wrong'

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly cls: ClsService) {}
  catch(exception: any, host: ArgumentsHost): void {
    const ctxType = host.getType()

    if (ctxType === 'http') {
      const ctx = host.switchToHttp()
      const res = ctx.getResponse<Response>()

      const status = this.getStatus(exception)
      const message = this.getMessage(exception)
      const code = this.getCode(exception)

      this.logError(status, exception)

      const reqId = this.cls.get<string>('request-id') ?? 'unknown'

      res.status(status).json({
        message,
        requestId: reqId,
        code,
        status,
      })
    }
  }

  private getMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse() as string | { message: string }
      return typeof response === 'string' ? response.toString() : response.message
    } else if (exception instanceof Error) {
      return exception.message
    }

    return DEFAULT_MESSAGE
  }

  private getStatus(err: unknown): number {
    return err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
  }

  private getCode(err: unknown): string {
    return err instanceof AppException ? err.extensions?.code : ExceptionCode.INTERNAL_SERVER_ERROR
  }

  private logError(status: number, err: unknown): void {
    const noStackMsg = 'No stack trace available'
    const stack = err instanceof Error && err.stack ? err.stack : noStackMsg
    console.error(`Request failed with status ${status}`, {}, stack)
  }
}
