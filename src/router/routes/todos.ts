import TodosController from '@/controllers/todos'
import { controllers } from '@/decorators/controller'

export default controllers[TodosController.name].routes
