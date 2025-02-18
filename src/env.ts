import dotenv from 'dotenv'
import z from 'zod'

dotenv.config()

const nodeEnvTypeSchema = z.enum(['DEVELOPMENT', 'TEST', 'PRODUCTION'])

const schema = z.object({
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),

  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .string()
    .transform(s => s.toUpperCase())
    .pipe(nodeEnvTypeSchema),
})

export const env = schema.parse(process.env)
