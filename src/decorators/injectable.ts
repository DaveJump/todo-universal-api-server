import { ClassDecorator, PropertyDecorator, ConstructableFunction } from '@/types'
import 'reflect-metadata'

const container = new Map<string | symbol, Object | Function>()

// Init as custom 'id'
export function Injectable<T = any>(id?: string): ClassDecorator<T>
// Init as 'singleton'
export function Injectable<T = any>(singleton?: boolean): ClassDecorator<T>
// Init as custom 'id' and 'singleton'
export function Injectable<T = any>(id?: string, singleton?: boolean): ClassDecorator<T>
export function Injectable<T = any>(idOrSingleton?: string | boolean, singleton?: boolean): ClassDecorator<T> {
  return (target) => {
    let _id
    let _singleton
    let _singleInstance

    if (typeof idOrSingleton === 'undefined') {
      idOrSingleton = true
    }

    if (typeof idOrSingleton === 'boolean') {
      _singleton = idOrSingleton
      _id = Symbol(target.name)
    } else {
      if (idOrSingleton && container.has(idOrSingleton)) {
        throw new Error(`Injectable：The identifier（${idOrSingleton}）has been registered.`)
      }

      _id = idOrSingleton || Symbol(target.name)
      _singleton = singleton
    }

    Reflect.defineMetadata('injectable:id', _id, target)

    if (_singleton) {
      _singleInstance = new target()
    }

    container.set(_id, _singleInstance || target)
  }
}

export function Inject(id?: string): PropertyDecorator {
  return (target, propertyKey) => {
    const dep = Reflect.getMetadata('design:type', target, propertyKey)
    const _id = id || Reflect.getMetadata('injectable:id', dep)
    const _dep = container.get(_id)
    Reflect.defineProperty(target, propertyKey, {
      value: _dep
    })
  }
}
