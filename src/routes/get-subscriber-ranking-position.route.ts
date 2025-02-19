import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberRankingPosition } from 'functions/get-subscriber-ranking-position'
import { z } from 'zod'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscriptions/:subscriberId/ranking/position',
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
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })

        return { position }
      }
    )
  }
