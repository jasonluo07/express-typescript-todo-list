import { Router } from 'express';
import todosController from '../controllers/todosController';
import authMiddleware from '../middleware/authMiddleware';
import validateTodoData from '../middleware/validateTodoData';

const router = Router();

router.use(authMiddleware);

router.get('', todosController.getAllTodos);
router.post('', validateTodoData, todosController.createNewTodo);
router.delete('', todosController.deleteAllTodos);
router.get('/:id', todosController.getTodoById);
router.put('/:id', validateTodoData, todosController.updateTodoById);
router.delete('/:id', todosController.deleteTodoById);

export default router;
