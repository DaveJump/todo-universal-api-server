import { prop } from '@typegoose/typegoose'

export class User {
  @prop()
  public name!: string

  @prop()
  public registerDate!: Date
}

export class Todo {
  @prop()
  public username!: string

  @prop()
  public title!: string

  @prop()
  public description?: string

  @prop()
  public expDate?: string

  @prop()
  public done!: boolean
}

export enum FilterItems {
  'Undone' = 0,
  'Done'
}

export interface BaseSuccessSchema<T = any> {
  status: number
  success: boolean
  result: T
}

export interface BaseFailSchema extends Omit<BaseSuccessSchema, 'result'> {
  message: string
}
