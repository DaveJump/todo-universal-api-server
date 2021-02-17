import TodosController from '@/controllers/todos'
import { controllers } from '@/decorators/controller'

export default controllers.get(TodosController.name)?.routes
