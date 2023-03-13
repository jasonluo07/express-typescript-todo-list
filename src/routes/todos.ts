import { Router } from 'express';
import {
  getAllTodos,
  createNewTodo,
  deleteAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} from '../controllers/todosController';
import authMiddleware from '../middleware/authMiddleware';
import validateTodoData from '../middleware/validateTodoData';

const router = Router();

router.use(authMiddleware);

router.get('', getAllTodos);
router.post('', validateTodoData, createNewTodo);
router.delete('', deleteAllTodos);
router.get('/:id', getTodoById);
router.put('/:id', validateTodoData, updateTodoById);
router.delete('/:id', deleteTodoById);

export default router;
