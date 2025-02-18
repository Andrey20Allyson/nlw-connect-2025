import path from 'node:path'
import { migrate as drizzleMigrate } from 'drizzle-orm/postgres-js/migrator'
import { db } from '../infra/drizzle/client'

export async function migrate() {
  const migrationsFolder = path.resolve(
    process.cwd(),
    'src/infra/drizzle/migrations'
  )

  await drizzleMigrate(db, {
    migrationsFolder,
  })
}
