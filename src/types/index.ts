import { Context } from 'koa'

export type Dictionary<T> = Record<string, T>

export type ControllerAction = (ctx: Context) => void

export type ControllerActionWithParams<T = any> = (
  ctx: Context,
  params?: T
) => any

export type ControllerActionParameters<T = any> = Parameters<ControllerActionWithParams<T>>

export type ServiceActionParameters<T = any> = Parameters<ControllerActionWithParams<T>>

export type MethodDecorator = (
  target: any,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<ControllerActionWithParams>
) => any

export interface ClassFactory<T> extends Function {
  new (...args: any[]): T
}

export type HttpMethods =
  | 'get'
  | 'post'
  | 'options'
  | 'put'
  | 'patch'
  | 'delete'
  | 'head'
  | 'link'
  | 'unlink'
  | 'all'

export interface Route {
  path: string
  method: HttpMethods
  action: ControllerAction
}
