import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/infra/drizzle/schema/*',
  out: './src/infra/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config
