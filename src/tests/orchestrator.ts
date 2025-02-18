import { migrate } from 'functions/migrate'
import { db } from '../infra/drizzle/client'

async function clearDatabase() {
  await db.$client.begin(async transaction => {
    await transaction`DROP SCHEMA IF EXISTS public CASCADE`
    await transaction`CREATE SCHEMA IF NOT EXISTS public`

    await transaction`DROP SCHEMA IF EXISTS drizzle CASCADE`
  })
}

async function runMigrations() {
  await migrate()
}

const orchestrator = {
  clearDatabase,
  runMigrations,
}

export default orchestrator
