import { Router } from 'express';

import todosRoutes from './todosRoutes';

const router = Router();

router.use('/todos', todosRoutes);

router.get('/', (_req, res) => res.send('Hello from v1!'));

export default router;
