import { env } from 'env'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { accessInviteLink } from 'functions/access-invite-link'
import { z } from 'zod'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        description: 'abcd',
        params: z.object({
          subscriberId: z.string().uuid(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      const redurectUrl = new URL(env.WEB_URL)
      redurectUrl.searchParams.set('referrer', subscriberId)

      reply.redirect(redurectUrl.toString(), 302)
    }
  )
}
