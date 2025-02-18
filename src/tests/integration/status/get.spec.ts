import axios from 'axios'
import orchestrator from 'tests/orchestrator'
import { beforeEach, test } from 'vitest'

beforeEach(async () => {
  await orchestrator.clearDatabase()
  await orchestrator.runMigrations()
})

test('request api status', async () => {
  const resp = await axios.get('/status')

  console.log(resp.status)
})
