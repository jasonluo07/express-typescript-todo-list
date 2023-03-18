import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import authRoutes from './authRoutes';
import todosRoutes from './todosRoutes';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

const router = Router();

router.get('/', (req, res) => {
  return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('HELLO_WORLD'), null);
});

router.use('/api', authRoutes);
router.use('/api/todos', todosRoutes);

export default router;
