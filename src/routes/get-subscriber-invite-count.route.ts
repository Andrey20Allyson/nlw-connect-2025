import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberInviteCount } from 'functions/get-subscriber-invite-count'
import { z } from 'zod'

export const getSubscriberInviteCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscriptions/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Access invite link and redirects user',
          tags: ['referral'],
          description: 'abcd',
          params: z.object({
            subscriberId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInviteCount({ subscriberId })

        return { count }
      }
    )
  }
