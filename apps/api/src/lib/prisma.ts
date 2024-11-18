import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
})

prisma.$on('query', (e: Prisma.QueryEvent) => {
  console.log(
    'Query:',
    e.params
      ? e.query.replace(
          /\$(\d+)/g,
          (value, i) => JSON.parse(e.params)[i - 1] || value,
        )
      : e.query,
  )
  console.log('Duration:', e.duration + 'ms')
})
