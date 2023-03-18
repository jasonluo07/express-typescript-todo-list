import { Router } from 'express';
import authRoutes from './authRoutes';
import todosRoutes from './todosRoutes';
import testRoutes from './testRoutes';

const router = Router();

router.use('', testRoutes);
router.use('/api', authRoutes);
router.use('/api/todos', todosRoutes);

export default router;
