import { Router } from 'express';

import { authMiddleware } from '../../middlewares';
import authRoutes from './authRoutes';
import todosRoutes from './todosRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/todos', authMiddleware, todosRoutes);

router.get('/', (_req, res) => res.send('Hello from v2!'));

export default router;
