import { ReturnModelType, getModelForClass } from '@typegoose/typegoose'
import { User } from '@/types/model'

class Users extends User {
  public static async getUserByName(this: ReturnModelType<typeof Users>, name: string) {
    return this.findOne({ name })
  }
  public static async registerUser(this: ReturnModelType<typeof Users>, name: string) {
    return this.create({ name, registerDate: new Date() })
  }
}

export const UsersModel = getModelForClass(Users)
