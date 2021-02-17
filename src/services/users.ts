import { ServiceActionParameters } from '@/types'
import { UsersModel } from '@/models/users'
import { genParamsRequiredErr } from '@/utils'
import { Injectable } from '@/decorators/injectable'

@Injectable()
export default class UsersService {
  async getUserByName(
    ...[ctx, params]: ServiceActionParameters<{ name: string }>
  ) {
    const name = params?.name || ctx.request.query.name
    if (!name) {
      return Promise.reject(genParamsRequiredErr())
    }
    const user = await UsersModel.getUserByName(name)
    return user
  }

  async registerUser(
    ...[ctx, params]: ServiceActionParameters<{ name: string }>
  ) {
    const name = params?.name || ctx.request.body.name
    if (!name) {
      return Promise.reject(genParamsRequiredErr())
    }
    const user = await UsersModel.registerUser(name)
    return user
  }
}
