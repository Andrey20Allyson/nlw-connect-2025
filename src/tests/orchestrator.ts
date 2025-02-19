import axios from 'axios'
import { migrate } from 'functions/migrate'
import sleep from 'helpers/sleep'
import { db } from 'infra/drizzle/client'

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

async function waitForWebserver() {
  let tries = 0

  while (true) {
    tries++

    try {
      const resp = await axios.get('/status')

      if (resp.status === 200) {
        break
      }
    } catch {}

    await sleep(1000)

    if (tries >= 5) {
      throw new Error('Webserver is unavaliable')
    }
  }
}

const orchestrator = {
  clearDatabase,
  runMigrations,
  waitForWebserver,
}

export default orchestrator
