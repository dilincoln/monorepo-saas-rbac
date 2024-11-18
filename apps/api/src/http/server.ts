import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import { env } from '@saas/env'
import fastifyScalarUI from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from '@/http/error-handler'
import { i18nMiddleware } from '@/http/middlewares/i18n'
import { authenticateWithPassword } from '@/http/routes/auth/authenticate-with-password'
import { createAccount } from '@/http/routes/auth/create-account'
import { getProfile } from '@/http/routes/auth/get-profile'
import { requestPasswordRecover } from '@/http/routes/auth/request-password-recover'
import { resetPassword } from '@/http/routes/auth/reset-password'
import { exportOpenApi } from '@/utils/export-openapi'

const args = process.argv.slice(2)

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS API',
      description: 'Full-stack SaaS app with multi-tenant & RBAC',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifyScalarUI, {
  routePrefix: '/docs',
  configuration: {
    spec: {
      content: () => app.swagger(),
    },
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(i18nMiddleware)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

if (args.includes('--export-openapi')) {
  app.ready(() => {
    exportOpenApi(app.swagger())
  })
} else {
  app.listen({ port: 3333 }).then(() => {
    console.log('Server listening on port 3333')
  })
}
