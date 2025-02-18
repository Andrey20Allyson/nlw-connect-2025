import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const statusRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/status',
    {
      schema: {
        summary: 'Gets application status',
        tags: ['status'],
        response: {
          200: z.object({
            timestamp: z.string().datetime(),
            services: z.object({
              webserver: z.object({
                is_ok: z.boolean(),
              }),
            }),
          }),
        },
      },
    },
    (request, reply) => {
      const timestamp = new Date().toISOString()

      reply.status(200).send({
        timestamp,
        services: {
          webserver: {
            is_ok: true,
          },
        },
      })
    }
  )

  app.get('/hello', () => {
    return 'Hello world'
  })
}
