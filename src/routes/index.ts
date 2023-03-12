import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import auth from './auth';
import todos from './todos';
import { ApiResponseStatus } from '../types/apiResponse';
import respond from '../utils/apiResponse';

const router = Router();

router.get('/', (_req, res) => {
  return respond(res, StatusCodes.OK, ApiResponseStatus.Success, 'Hello World!', null);
});

router.use('/api', auth);
router.use('/api/todos', todos);

export default router;
