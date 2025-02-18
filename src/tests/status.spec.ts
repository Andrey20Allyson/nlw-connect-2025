import path from 'node:path'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { beforeEach, test } from 'vitest'
import { db } from '../infra/drizzle/client'

beforeEach(async () => {
  await db.$client.begin(async transaction => {
    await transaction`DROP SCHEMA IF EXISTS public CASCADE`
    await transaction`CREATE SCHEMA IF NOT EXISTS public`

    await transaction`DROP SCHEMA IF EXISTS drizzle CASCADE`
  })

  const migrationsFolder = path.resolve(
    process.cwd(),
    'src/infra/drizzle/migrations'
  )

  await migrate(db, {
    migrationsFolder,
  })
})

test('test tester', () => {
  console.log('test')
})
