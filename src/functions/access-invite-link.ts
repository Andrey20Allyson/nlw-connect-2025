import { redis } from 'infra/redis/client'

export interface AccessInviteLinkParams {
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  await redis.hincrby('refferal:access-count', subscriberId, 1)
}
