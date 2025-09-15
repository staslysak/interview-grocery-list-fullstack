import { NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { NextFunction, Request, Response } from 'express'

import { AppModule } from './app.module'

import type { AppConfigType } from './config'
import { ClsService } from 'nestjs-cls'
import { AppExceptionFilter } from './app.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === 'development' ? ['debug', 'error', 'log', 'verbose', 'warn'] : ['error', 'warn'],
  })

  const cls = app.get(ClsService)

  if (process.env.NODE_ENV === 'development') {
    SwaggerModule.setup(
      'docs',
      app,
      SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('DocumentFlow').setVersion('1.0').build()),
    )
  }

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalFilters(new AppExceptionFilter(cls))
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.setGlobalPrefix('api')

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.removeHeader('x-powered-by')
    res.removeHeader('date')
    next()
  })

  const configService: ConfigService<AppConfigType> = app.get(ConfigService)
  const apiPort = configService.get('api.apiPort', { infer: true })

  app.enableCors({
    origin: '*',
    credentials: true,
    // allows the frontend to access the Authorization and Authorization-Refresh headers
    exposedHeaders: ['Authorization', 'Authorization-Refresh'],
  })

  await app.listen(apiPort, '0.0.0.0')

  logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
