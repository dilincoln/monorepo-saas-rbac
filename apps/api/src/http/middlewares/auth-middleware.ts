import * as m from '@saas/i18n/messages'
import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'

export const authMiddleware = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new UnauthorizedError(m.invalid_auth_token())
      }
    }
  })
})
