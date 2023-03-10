import { Router } from 'express';
import Todo, { ITodo } from '../models/todo';
import { ApiResponseStatus, respond } from './utils/apiResponse';

const router = Router();

router.get('', async (_req, res) => {
  try {
    const todos: ITodo[] = await Todo.find({});

    return respond(res, 200, ApiResponseStatus.Success, 'Todos fetched successfully', todos);
  } catch (err) {
    console.error(err);
    return respond(res, 500, ApiResponseStatus.Error, 'Failed to fetch todos', null);
  }
});

router.post('', async (req, res) => {
  try {
    const newTodo: ITodo = new Todo({
      title: req.body.title,
      isDone: req.body.isDone,
    });
    await newTodo.save();

    return respond(res, 201, ApiResponseStatus.Success, 'Todo created successfully', newTodo);
  } catch (err) {
    console.error(err);
    return respond(res, 500, ApiResponseStatus.Error, 'Failed to create todo', null);
  }
});

router.delete('', async (_req, res) => {
  try {
    await Todo.deleteMany({});

    return respond(res, 200, ApiResponseStatus.Success, 'All todos deleted successfully', null);
  } catch (err) {
    console.error(err);
    return respond(res, 500, ApiResponseStatus.Error, 'Failed to delete todos', null);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo: ITodo | null = await Todo.findById(req.params.id);

    if (!todo) {
      return respond(res, 404, ApiResponseStatus.Fail, 'Todo not found', null);
    }
    return respond(res, 200, ApiResponseStatus.Success, 'Todo fetched successfully', todo);
  } catch (err) {
    console.error(err);
    return respond(res, 500, ApiResponseStatus.Error, 'Failed to fetch todo', null);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        isDone: req.body.isDone,
      },
      { new: true }, // 回傳更新後的資料
    );

    if (!updatedTodo) {
      return respond(res, 404, ApiResponseStatus.Fail, 'Todo not found', null);
    }
    return respond(res, 200, ApiResponseStatus.Success, 'Todo updated successfully', updatedTodo);
  } catch (err) {
    console.error(err);
    return respond(res, 500, ApiResponseStatus.Error, 'Failed to update todo', null);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return respond(res, 404, ApiResponseStatus.Fail, 'Todo not found', null);
    }
    return respond(res, 200, ApiResponseStatus.Success, 'Todo deleted successfully', deletedTodo);
  } catch (err) {
    console.error(err);
    return respond(res, 500, ApiResponseStatus.Error, 'Failed to delete todo', null);
  }
});

export default router;
