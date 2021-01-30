import { Middleware } from 'koa'
import { baseFailSchema } from '@/utils'
import { Dictionary } from '@/types'

const errorHandler: (options?: Dictionary<any>) => Middleware = (options) => async (ctx, next) => {
  try {
    await next()
  } catch (reason) {
    ctx.status = reason.status || 500
    let msg
    if (reason instanceof Error) {
      msg = reason.message
    } else {
      msg = reason
    }
    ctx.body = baseFailSchema(msg)
    ctx.app.emit('error', reason, ctx)
  }
}

export default errorHandler