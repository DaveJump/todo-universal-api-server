import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import router from './router'
import { accessLogger, appLogger } from './utils/logger'
import errorHandler from './middlewares/errorHandler'
import cors from 'koa2-cors'
import chalk from 'chalk'
import connectDB from './config/db'
import baseConfig from './config/base'
import { koaSwagger } from 'koa2-swagger-ui'
import { genDocs } from './config/docs'

const app = new Koa()

async function init() {
  await connectDB()
  app.use(koaSwagger({
    routePrefix: '/_apisDoc',
    swaggerOptions: {
      url: baseConfig.swaggerUrl
    }
  }))
  genDocs(router)
  app.use(accessLogger())
  app.use(logger())
  app.use(errorHandler())
  app.use(bodyParser())
  app.use(cors())
  app.use(router.routes()).use(router.allowedMethods())

  app.on('error', err => {
    appLogger.error(err)
  })

  app.listen(baseConfig._PORT, () => {
    console.log(chalk.green(`\nServer listening on http://localhost:${baseConfig._PORT}`))
  })
}

init()
