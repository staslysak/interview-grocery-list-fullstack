import { z } from 'zod'

const AppConfigSchema = z.object({
  api: z.object({
    apiPort: z.coerce.number(),
  }),
  auth: z.object({
    sessionTtl: z.coerce.number(),
    jwt: z.object({
      access: z.object({
        expiresIn: z.coerce.string(),
        secret: z.coerce.string(),
      }),
      refresh: z.object({
        expiresIn: z.coerce.string(),
        secret: z.coerce.string(),
      }),
    }),
  }),
  redis: z.object({
    port: z.coerce.number(),
    host: z.coerce.string(),
  }),
})

export type AppConfigType = z.infer<typeof AppConfigSchema>

export default async (): Promise<AppConfigType> => {
  const configObject: AppConfigType = {
    api: {
      apiPort: Number(process.env.PORT),
    },
    auth: {
      sessionTtl: 60 * 60 * 24 * 10,
      jwt: {
        access: {
          expiresIn: '10m',
          secret: process.env.JWT_ACCESS_SECRET,
        },
        refresh: {
          expiresIn: '1d',
          secret: process.env.JWT_REFRESH_SECRET,
        },
      },
    },
    redis: {
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST,
    },
  }

  const result = await AppConfigSchema.parseAsync(configObject)

  return result
}
