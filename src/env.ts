import dotenv from 'dotenv'
import z from 'zod'

dotenv.config()

const schema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),
})

export const env = schema.parse(process.env)
