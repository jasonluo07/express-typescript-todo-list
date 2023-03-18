import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import auth from './auth';
import todos from './todos';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

const router = Router();

router.get('/', (req, res) => {
  return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('HELLO_WORLD'), null);
});

router.use('/api', auth);
router.use('/api/todos', todos);

export default router;
