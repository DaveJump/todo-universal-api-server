import { Context } from 'koa'

export type Dictionary<T> = Record<string, T>

export type ControllerAction = (ctx: Context) => void

export type ControllerActionWithParams<T = any> = (
  ctx: Context,
  params?: T
) => any

export type ControllerActionParameters<T = any> = Parameters<ControllerActionWithParams<T>>

export type ServiceActionParameters<T = any> = Parameters<ControllerActionWithParams<T>>

export interface TypedPropertyDescriptor<T> {
  enumerable?: boolean
  configurable?: boolean
  writable?: boolean
  value?: T
  get?: () => T
  set?: (value: T) => void
}
export interface ConstructableFunction<T = any> extends Function {
  new(...args: any[]): T
}
export type ClassDecorator<T = any> = (target: ConstructableFunction<T>) => ConstructableFunction<T> | void
export type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void
export type MethodDecorator<T = any> = (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void
export type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void

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
