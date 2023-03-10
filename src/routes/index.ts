import { Router } from 'express';
import todos from './todos';
import { ApiResponseStatus, respond } from './utils/apiResponse';

const router = Router();

router.get('/', (_req, res) => {
  return respond(res, 200, ApiResponseStatus.Success, 'Hello World!', null);
});

router.use('/api/todos', todos);

export default router;
