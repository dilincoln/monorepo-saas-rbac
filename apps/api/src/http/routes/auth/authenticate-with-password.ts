import { env } from '@saas/env'
import * as m from '@saas/i18n/messages'
import { compare } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with e-mail & password',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          400: z.object({
            message: z.string(),
          }),
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        throw new BadRequestError(m.invalid_credentials())
      }

      if (userFromEmail.passwordHash === null) {
        throw new BadRequestError(
          'User has not set a password, use social login',
        )
      }

      const isPasswordCorrect = await compare(
        password,
        userFromEmail.passwordHash,
      )

      if (!isPasswordCorrect) {
        throw new BadRequestError(m.invalid_credentials())
      }

      const token = await reply.jwtSign(
        {
          sub: userFromEmail.id,
        },
        {
          sign: {
            expiresIn: env.JWT_EXPIRES_IN,
          },
        },
      )
      return reply.status(201).send({ token })
    },
  )
}
