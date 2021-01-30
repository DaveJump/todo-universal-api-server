import Router from 'koa-router'
import swaggerJSDoc from 'swagger-jsdoc'
import baseConfig from '@/config/base'

export function genDocs(router: Router) {
  const swaggerDefinition = {
    info: {
      title: 'Todos universal apis',
      version: '1.0.0',
      description: 'Apis documentation for todos app',
    },
    host: `localhost:${baseConfig._PORT}`,
    basePath: '/', // Base path (optional)
    schemes: ['http', 'https']
  }

  const options = {
    swaggerDefinition,
    apis: ['./src/controllers/**/*.ts'], // The paths of the annotated file, relative to current working root dir
  }

  const swaggerSpec = swaggerJSDoc(options)

  router.get(baseConfig.swaggerUrl, async function (ctx) {
    ctx.set('Content-Type', 'application/json')
    ctx.body = swaggerSpec
  })
}