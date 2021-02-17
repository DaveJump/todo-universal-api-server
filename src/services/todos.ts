import { Todo } from '@/types/model'
import { ServiceActionParameters } from '@/types'
import { genParamsRequiredErr } from '@/utils'
import { TodosModel } from '@/models/todos'
import { Injectable } from '@/decorators/injectable'

@Injectable()
export default class TodosService {
  async getTodoList(
    ...[ctx, params]: ServiceActionParameters<{ username: string, done: string | number | boolean, title: string }>
  ) {
    const { username: name, done, title } = params || {}
    const username = name || ctx.request.headers.username
    if (!username) {
      return Promise.reject(genParamsRequiredErr())
    }
    const conditions = {
      username
    }
    if (done) {
      if (done >= 0) {
        Object.assign(conditions, { done: +done })
      }
    }
    if (title) {
      Object.assign(conditions, { title })
    }
    const todoList = await TodosModel.getTodoList(conditions)
    return todoList
  }

  async addNewTodo(
    ...[ctx, params]: ServiceActionParameters
  ) {
    const todo: Todo = ctx.request.body
    if (!todo.username) {
      return Promise.reject(genParamsRequiredErr())
    }
    const res = await TodosModel.addNewTodo(todo)
    return res
  }

  async getTodoDetail(
    ...[ctx, params]: ServiceActionParameters<{ id: string }>
  ) {
    const id = params?.id || ctx.params.id
    if (!id) {
      return Promise.reject(genParamsRequiredErr('id is required'))
    }
    const todo = await TodosModel.getTodoDetailById(id)
    return todo
  }

  async editTodo(
    ...[ctx, params]: ServiceActionParameters<{ id: string }>
  ) {
    const id = params?.id || ctx.params.id
    if (!id) {
      return Promise.reject(genParamsRequiredErr('id is required'))
    }
    const set = ctx?.request.body
    const res = await TodosModel.editTodo(id, set)
    return res
  }

  async deleteTodo(
    ...[ctx, params]: ServiceActionParameters<{ id: string }>
  ) {
    const id = params?.id || ctx.params.id
    if (!id) {
      return Promise.reject(genParamsRequiredErr('id is required'))
    }
    const res = await TodosModel.deleteTodo(id)
    return res
  }
}
