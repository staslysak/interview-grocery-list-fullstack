import { ExecutionContext } from '@nestjs/common'

export const getRequest = <T>(context: ExecutionContext): T => {
  if (context.getType() === 'http') {
    const httpContext = context.switchToHttp()
    return httpContext.getRequest()
  }
}
