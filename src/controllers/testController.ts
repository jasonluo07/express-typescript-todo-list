import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiStatuses } from '../types/apiResponse';
import respond from '../utils/apiResponse';

function getHello(req: Request, res: Response, next: NextFunction) {
  try {
    return respond(res, StatusCodes.OK, ApiStatuses.SUCCESS, req.t('HELLO_WORLD'), null);
  } catch (err) {
    return next(err);
  }
}

export default { getHello };
