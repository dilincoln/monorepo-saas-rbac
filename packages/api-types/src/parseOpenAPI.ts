import openapi from '@saas/api/openapi.json'
import { env } from '@saas/env'
import generate from 'orval'

const baseUrl = env.NEXT_PUBLIC_API_URL

generate({
  input: {
    target: openapi,
  },
  output: {
    client: 'fetch',
    mode: 'tags-split',
    target: './dist/',
    baseUrl,
    clean: true,
  },
  hooks: {
    afterAllFilesWrite: 'eslint --fix',
  },
})
