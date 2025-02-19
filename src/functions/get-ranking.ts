import { inArray } from 'drizzle-orm'
import { db } from 'infra/drizzle/client'
import { subscriptions } from 'infra/drizzle/schema/subscriptions'
import { redis } from 'infra/redis/client'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const subscriberIdAndScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    const subscriberId = ranking[i]
    const score = Number.parseInt(ranking[i + 1])

    subscriberIdAndScore[subscriberId] = score
  }

  const subscriberKeys = Object.keys(subscriberIdAndScore)

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, subscriberKeys))

  const rankWithScore = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdAndScore[subscriber.id],
      }
    })
    .sort((a, b) => b.score - a.score)

  return { rankWithScore }
}
