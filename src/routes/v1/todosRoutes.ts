import { Router } from 'express';

import { todosController } from '../../controllers';

const router = Router();

router.get('', todosController.getAllTodos);
router.post('', todosController.createNewTodo);
router.delete('', todosController.deleteAllTodos);
router.get('/search', todosController.searchTodoByWord);
router.get('/:id', todosController.getTodoById);
router.put('/:id', todosController.updateTodoById);
router.patch('/:id', todosController.toggleTodoById);
router.delete('/:id', todosController.deleteTodoById);

export default router;
