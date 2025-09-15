import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import * as crypto from 'node:crypto'

import { UserModule } from './user/user.module'
import { PrismaModule } from './shared/prisma/prisma.module'
import { GroceryModule } from './grocery/grocery.module'
import config, { AppConfigType } from './config'
import { ClsModule } from 'nestjs-cls'
import { AuthModule } from './auth/auth.module'
import { RedisModule } from '@nestjs-modules/ioredis'

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      guard: {
        mount: true,
        setup(cls) {
          cls.set('request-id', crypto.randomUUID())
        },
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env', `.env.${process.env.NODE_ENV}.local`, '.env.local'],
      isGlobal: true,
      load: [config],
    }),
    RedisModule.forRootAsync({
      useFactory: (config: ConfigService<AppConfigType>) => ({
        type: 'single',
        url: `redis://${config.get('redis.host', { infer: true })}:${config.get('redis.port', { infer: true })}`,
      }), // or use async method
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    GroceryModule,
  ],
})
export class AppModule {}
