import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './database';
import Todo, { ITodo } from './models/todo';

dotenv.config();

const app = express();
const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT ?? '3000';

// 解析 json 格式的 req.body
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'success', message: 'Hello World!' });
});

app.get('/todos', async (_req, res) => {
  try {
    const todos: ITodo[] = await Todo.find({});
    res.status(200).json({ status: 'success', data: todos });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch todos' });
  }
});

app.post('/todos', async (req, res) => {
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

app.delete('/todos', async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.status(200).json({ status: 'success', message: 'All todos deleted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to delete todos' });
  }
});

async function startApp() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.info(`App listening on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

startApp();
