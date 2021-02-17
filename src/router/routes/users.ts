import UsersController from '@/controllers/users'
import { controllers } from '@/decorators/controller'

export default controllers.get(UsersController.name)?.routes
