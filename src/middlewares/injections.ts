import { Middleware } from 'koa'
import { Dictionary } from '@/types'
import fs from 'fs'
import path from 'path'
import { controllers } from '@/decorators/controller'

const controllerDirPath = path.join(__dirname, '../controllers')
const serviceDirPath = path.join(__dirname, '../services')
const controllerNames = fs.readdirSync(controllerDirPath)
const serviceNames = fs.readdirSync(serviceDirPath)

const Controllers = controllerNames.reduce((ctrls, name) => ({
  ...ctrls,
  [name.replace(/\.ts$/, '')]: controllers[require(path.join(controllerDirPath, name)).default.name]
}), {})

const Services = serviceNames.reduce((ctrls, name) => ({
  ...ctrls,
  [name.replace(/\.ts$/, '')]: new (require(path.join(serviceDirPath, name)).default)
}), {})

export const injectProperties: (options?: Dictionary<any>) => Middleware = (options) => async (ctx, next) => {
  ctx.$controllers = Controllers
  ctx.$services = Services
  await next()
}
