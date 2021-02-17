import { ControllerActionParameters } from '@/types'
import { Controller, Get, Post, Delete } from '@/decorators/controller'
import { Inject } from '@/decorators/injectable'
import TodosService from '@/services/todos'

@Controller
class TodosController {
  @Inject()
  private TodosService!: TodosService

  /**
   * @swagger
   *
   * /todo/list:
   *   get:
   *     description: Get todo list by username
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Ok
   *         schema:
   *           type: 'object'
   *           properties:
   *             status:
   *               type: number
   *               description: Custom status code
   *             success:
   *               type: boolean
   *               description: Successful
   *             result:
   *               type: object
   *               description: Result data
   */
  @Get('/todo/list')
  getTodoList(...[ctx, params]: ControllerActionParameters) {
    return this.TodosService.getTodoList(ctx, params)
  }

  /**
   * @swagger
   *
   * /todo/add:
   *   post:
   *     description: Add new todo
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         in: body
   *         required: true
   *         type: string
   *       - name: title
   *         in: body
   *         required: true
   *         type: string
   *       - name: description
   *         in: body
   *         required: false
   *         type: string
   *       - name: expDate
   *         in: body
   *         required: false
   *         type: string
   */
  @Post('/todo/add')
  addNewTodo(...[ctx, params]: ControllerActionParameters) {
    return this.TodosService.addNewTodo(ctx, params)
  }

  /**
   * @swagger
   *
   * /todo/:id:
   *   get:
   *     description: Get todo detail by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   */
  @Get('/todo/:id')
  getTodoDetail(...[ctx, params]: ControllerActionParameters) {
    return this.TodosService.getTodoDetail(ctx, params)
  }

  /**
   * @swagger
   *
   * /todo/edit/:id:
   *   post:
   *     description: Edit todo by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *       - name: title
   *         in: body
   *         required: true
   *         type: string
   *       - name: description
   *         in: body
   *         required: false
   *         type: string
   *       - name: expDate
   *         in: body
   *         required: false
   *         type: string
   *       - name: done
   *         in: body
   *         required: false
   *         type: boolean
   */
  @Post('/todo/edit/:id')
  editTodo(...[ctx, params]: ControllerActionParameters) {
    return this.TodosService.editTodo(ctx, params)
  }

  /**
   * @swagger
   *
   * /todo/delete/:id:
   *   delete:
   *     description: Delete todo by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   */
  @Delete('/todo/delete/:id')
  deleteTodo(...[ctx, params]: ControllerActionParameters) {
    return this.TodosService.deleteTodo(ctx, params)
  }
}

export default TodosController
