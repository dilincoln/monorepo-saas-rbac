import type { FastifyInstance } from 'fastify'
import { writeFile } from 'fs'
import path from 'path'

const swaggerSpecFile = './openapi.json'
const specFile = path.join(__dirname, '..', '..', swaggerSpecFile)

export function exportOpenApi(
  swaggerDoc: ReturnType<FastifyInstance['swagger']>,
) {
  const apiSpec = JSON.stringify(swaggerDoc || {}, null, 2)

  writeFile(specFile, apiSpec, () => {
    console.log(`Swagger spec written to ${specFile}`)
  })
}
