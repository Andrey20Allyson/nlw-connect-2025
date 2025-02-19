import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberInviteClicks } from 'functions/get-subscriber-invite-clicks'
import { z } from 'zod'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscriptions/:subscriberId/ranking/clicks',
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

        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return { count }
      }
    )
  }
