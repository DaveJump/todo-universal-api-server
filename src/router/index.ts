import Router from 'koa-router'
import fs from 'fs'
import path from 'path'
import { Route } from '@/types'

const routesDirPath = path.join(__dirname, 'routes')

const routes: Route[] = []
const routePaths = fs.readdirSync(routesDirPath)

routePaths.forEach(async p => {
  const _routes = require(path.join(routesDirPath, p)).default as Route[]
  routes.push(..._routes)
})

const router = new Router()

routes.forEach(route => {
  router[route.method](route.path, route.action)
})

export default router
