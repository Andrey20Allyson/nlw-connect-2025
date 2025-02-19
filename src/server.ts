import { fastifyCors } from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from 'env'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { accessInviteLinkRoute } from 'routes/access-invite-link.route'
import { getRankingRoute } from 'routes/get-ranking.route'
import { getSubscriberInviteClicksRoute } from 'routes/get-subscriber-invite-clicks.route'
import { getSubscriberInviteCountRoute } from 'routes/get-subscriber-invite-count.route'
import { getSubscriberRankingPositionRoute } from 'routes/get-subscriber-ranking-position.route'
import { statusRoute } from 'routes/status.route'
import { subscribeToEventRoute } from 'routes/subscribe-to-event.route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInviteCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)
app.register(statusRoute)

function listen() {
  app
    .listen({ port: env.PORT })
    .then(() => {
      console.log(`HTTP server is running in http://localhost:${env.PORT}`)
    })
    .catch(reason => {
      console.log(reason)
    })
}

listen()
