import UsersController from '@/controllers/users'
import { controllers } from '@/decorators/controller'

export default controllers[UsersController.name].routes
