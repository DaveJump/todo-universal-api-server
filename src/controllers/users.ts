import { ControllerActionParameters } from '@/types'
import { Controller, Get, Post } from '@/decorators/controller'

@Controller
class UsersController {
  /**
   * @swagger
   *
   * /user:
   *   get:
   *     description: Get user by username
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         in: query
   *         required: true
   *         type: string
   */
  @Get('/user')
  getUserByName(...[ctx, params]: ControllerActionParameters) {
    return ctx.$service.users.getUserByName(ctx, params)
  }

  /**
   * @swagger
   *
   * /user/register:
   *   post:
   *     description: Register user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         in: body
   *         required: true
   *         type: string
   */
  @Post('/user/register')
  registerUser(...[ctx, params]: ControllerActionParameters) {
    return ctx.$service.users.registerUser(ctx, params)
  }
}

export default UsersController
