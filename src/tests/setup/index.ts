import axios from 'axios'
import { env } from 'env'
import orchestrator from 'tests/orchestrator'
import { beforeEach } from 'vitest'

axios.defaults.baseURL = `http://localhost:${env.PORT}`

beforeEach(async () => {
  await orchestrator.waitForWebserver()
})
