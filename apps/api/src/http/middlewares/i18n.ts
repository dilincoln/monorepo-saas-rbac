import {
  isAvailableLanguageTag,
  setLanguageTag,
  sourceLanguageTag,
} from '@saas/i18n/runtime'
import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

export const i18nMiddleware = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    const lang = request.headers['accept-language']?.split(',')[0]

    if (!isAvailableLanguageTag(lang)) {
      setLanguageTag(sourceLanguageTag)
    } else {
      setLanguageTag(lang)
    }
  })
})
