import { Router } from 'express';
import todos from './todos';
import { ApiResponseStatus, respond } from './utils/apiResponse';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_req, res) => {
  return respond(res, StatusCodes.OK, ApiResponseStatus.Success, 'Hello World!', null);
});

router.use('/api/todos', todos);

export default router;
