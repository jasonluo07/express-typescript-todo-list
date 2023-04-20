import { Router } from 'express';
import authRoutes from './authRoutes';
import todosRoutes from './todosRoutes';
import testRoutes from './testRoutes';
// import { authMiddleware } from '../middlewares'; TODO: Uncomment this line when you need to use authMiddleware

const router = Router();

router.use('', testRoutes);
router.use('/api', authRoutes);
router.use('/api/todos', todosRoutes);

export default router;
