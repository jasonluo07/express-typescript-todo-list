import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import auth from './auth';
import todos from './todos';
import { ApiResponseStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

const router = Router();

router.get('/', (_req, res) => {
  return respond(res, StatusCodes.OK, ApiResponseStatuses.SUCCESS, 'Hello World!', null);
});

router.use('/api', auth);
router.use('/api/todos', todos);

export default router;
