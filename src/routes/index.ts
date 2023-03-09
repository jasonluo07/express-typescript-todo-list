import { Router } from 'express';
import todos from './todos';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ status: 'success', message: 'Hello World!' });
});

router.use('/api/todos', todos);

export default router;
