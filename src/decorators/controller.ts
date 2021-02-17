import { Context } from 'koa'
import { MethodDecorator, ConstructableFunction, Route, ControllerActionWithParams } from '@/types'
import { baseSuccessSchema } from '@/utils'
import 'reflect-metadata'

export const ReqPathMetadataKey = Symbol('router:reqPath')
export const ReqMethodMetadataKey = Symbol('router:reqMethod')

export const controllers = new Map<string, { inst: any, routes: Route[] }>()

export const Get = (path?: string) => handler('get', path)

export const Post = (path?: string) => handler('post', path)

export const Delete = (path?: string) => handler('delete', path)

export const Controller = <T>(target: ConstructableFunction<T>) => {
  const inst = new target()
  controllers.set(target.name, {
    inst,
    routes: genRoutesByController(inst)
  })
}

const handler: (method: string, path?: string) => MethodDecorator<ControllerActionWithParams> = (method, path) => (target, propertyKey, descriptor) => {
  path = path || '/'

  Reflect.defineMetadata(ReqMethodMetadataKey, method, target, propertyKey)
  Reflect.defineMetadata(ReqPathMetadataKey, path, target, propertyKey)

  if (!descriptor.value) return

  const originalAction = descriptor.value

  descriptor.value = async function (ctx: Context) {
    const _params = Object.assign(
      {},
      ctx.request.body,
      ctx.request.query,
      ctx.params
    )
    const result = await originalAction.call(this, ctx, _params)
    ctx.body = baseSuccessSchema(result)
  }
}

export function genRoutesByController(inst: any) {
  const __proto__ = Object.getPrototypeOf(inst)
  const actionNames = Object.getOwnPropertyNames(__proto__).filter(key => !['constructor'].includes(key))

  return actionNames.reduce((routes: Route[], actionName) => {
    let action = inst[actionName]
    if (typeof action === 'function') {
      action = action.bind(inst)
      const path = Reflect.getMetadata(ReqPathMetadataKey, inst, actionName)
      const method = Reflect.getMetadata(ReqMethodMetadataKey, inst, actionName)
      return [
        ...routes,
        {
          path,
          method,
          action
        }
      ]
    }
    return [...routes]
  }, [])
}
