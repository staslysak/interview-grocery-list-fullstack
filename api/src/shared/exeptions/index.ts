import { HttpException, HttpStatus } from '@nestjs/common'

export const ExceptionCode = {
  BAD_REQUEST: 'BAD_REQUEST',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
} as const

export class AppException extends HttpException {
  get extensions() {
    return this._extensions
  }
  private _extensions: {
    code: keyof typeof ExceptionCode
    status: number
  }

  constructor(code: keyof typeof ExceptionCode, status: number, message: string) {
    super(message, status)
    this._extensions = {
      code,
      status,
    }
  }
}

class BadRequestException extends AppException {
  constructor(message: string = 'Bad Request') {
    super(ExceptionCode.BAD_REQUEST, HttpStatus.BAD_REQUEST, message)
  }
}

class ForbiddenException extends AppException {
  constructor(message: string = 'Forbidden') {
    super(ExceptionCode.FORBIDDEN, HttpStatus.FORBIDDEN, message)
  }
}

class InternalException extends AppException {
  constructor(message: string = 'Internal Error') {
    super(ExceptionCode.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR, message)
  }
}

class NotFoundException extends AppException {
  constructor(message: string = 'Not Found') {
    super(ExceptionCode.NOT_FOUND, HttpStatus.NOT_FOUND, message)
  }
}

class UnauthorizedException extends AppException {
  constructor(message: string = 'Unauthenticated') {
    super(ExceptionCode.UNAUTHENTICATED, HttpStatus.UNAUTHORIZED, message)
  }
}

export const Exception = {
  BadRequestException,
  ForbiddenException,
  InternalException,
  NotFoundException,
  UnauthorizedException,
}
