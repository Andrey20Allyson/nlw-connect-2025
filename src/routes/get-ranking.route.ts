import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getRanking } from 'functions/get-ranking'
import { z } from 'zod'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        description: 'abcd',
        response: {
          200: z.object({
            ranking: z
              .object({
                id: z.string().uuid(),
                name: z.string(),
                score: z.number(),
              })
              .array(),
          }),
        },
      },
    },
    async request => {
      const { rankWithScore } = await getRanking()

      return { ranking: rankWithScore }
    }
  )
}
