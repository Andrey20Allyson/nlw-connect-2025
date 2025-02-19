import { redis } from 'infra/redis/client'

export interface GetSubscriberInviteCountParams {
  subscriberId: string
}

export async function getSubscriberInviteCount({
  subscriberId,
}: GetSubscriberInviteCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count != null ? Number.parseInt(count) : 0 }
}
