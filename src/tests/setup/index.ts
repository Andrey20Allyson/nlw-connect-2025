import axios from 'axios'
import { env } from 'env'
import orchestrator from 'tests/orchestrator'
import { beforeAll } from 'vitest'

axios.defaults.baseURL = `http://localhost:${env.PORT}`

beforeAll(async () => {
  await orchestrator.waitForWebserver()
})
