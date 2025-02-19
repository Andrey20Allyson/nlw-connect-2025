import { redis } from '../infra/redis/client'

export interface GetSubscriberInviteClicksParams {
  subscriberId: string
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget('refferal:access-count', subscriberId)

  return { count: count != null ? Number.parseInt(count) : 0 }
}
