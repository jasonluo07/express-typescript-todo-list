import { Router } from 'express';
import Todo, { ITodo } from '../models/todo';

const router = Router();

router.get('', async (_req, res) => {
  try {
    const todos: ITodo[] = await Todo.find({});
    res.status(200).json({ status: 'success', data: todos });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch todos' });
  }
});

router.post('', async (req, res) => {
  try {
    const todo: ITodo = new Todo({
      title: req.body.title,
      isDone: req.body.isDone,
    });
    await todo.save();
    res.status(201).json({ status: 'success', data: todo });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to create todo' });
  }
});

router.delete('', async (_req, res) => {
  try {
    await Todo.deleteMany({});
    res.status(200).json({ status: 'success', message: 'All todos deleted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to delete todos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo: ITodo | null = await Todo.findById(req.params.id);

    if (todo) {
      res.status(200).json({ status: 'success', data: todo });
    } else {
      res.status(404).json({ status: 'fail', message: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch todo' });
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

    if (updatedTodo) {
      res.status(200).json({ status: 'success', data: updatedTodo });
    } else {
      res.status(404).json({ status: 'fail', message: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to update todo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id);
    if (deletedTodo) {
      res.status(200).json({ status: 'success', data: deletedTodo });
    } else {
      res.status(404).json({ status: 'fail', message: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to delete todo' });
  }
});

export default router;
