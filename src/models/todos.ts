import { getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { Todo } from '@/types/model'
import { Dictionary } from '@/types'

class Todos extends Todo {
  public static async addNewTodo(this: ReturnModelType<typeof Todos>, data: Todo) {
    return this.create(data)
  }
  public static async getTodoList(
    this: ReturnModelType<typeof Todos>,
    conditions: Dictionary<any>
  ) {
    if (conditions.title) {
      conditions.title = {
        $regex: new RegExp(conditions.title, 'i')
      }
    }
    return this.find(conditions, {}, { sort: { _id: -1 } })
  }
  public static async getTodoDetailById(
    this: ReturnModelType<typeof Todos>,
    id: string
  ) {
    return this.findById(id)
  }
  public static async editTodo(
    this: ReturnModelType<typeof Todos>,
    id: string,
    set: Dictionary<any>
  ) {
    return this.updateOne({ _id: id }, { $set: set })
  }
  public static async deleteTodo(
    this: ReturnModelType<typeof Todos>,
    id: string
  ) {
    return this.deleteOne({ _id: id })
  }
}

export const TodosModel = getModelForClass(Todos)
