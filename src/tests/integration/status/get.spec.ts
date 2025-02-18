import orchestrator from 'tests/orchestrator'
import { beforeEach, test } from 'vitest'

beforeEach(async () => {
  await orchestrator.clearDatabase()
  await orchestrator.runMigrations()
})

test('test tester', () => {
  console.log('test')
})
