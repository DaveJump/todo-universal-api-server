import Koa from 'koa'

declare module 'koa' {
  interface ExtendableContext {
    $services: {
      [name: string]: any
    },
    $controllers: {
      [name: string]: any
    }
  }
}